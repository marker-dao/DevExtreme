/* eslint-disable spellcheck/spell-checker */
/**
 * Regression ratchet for the optional-field convention
 * (docs/UNDEFINED_NULL_CONVENTION.md). The convention rules run at `warn`
 * during migration, so they don't fail CI by themselves. This guard fails
 * when the number of warnings for those rules GROWS above a committed
 * baseline — i.e. when a PR adds a NEW violation.
 *
 * It is a thin counter over the ESLint output (single source of truth = the
 * rules); it contains no detection logic of its own.
 *
 *   node build/linters/default-convention-ratchet.js            # --check (default): fail if grown
 *   node build/linters/default-convention-ratchet.js --update   # rewrite baseline to current counts
 */
const fs = require('node:fs');
const path = require('node:path');
const { ESLint } = require('eslint');

const RULES = [
    'devextreme-custom/jsdoc-default-matches-type',
    'devextreme-custom/literal-union-needs-default-doc',
];
const TARGET = ['js/**/*.d.ts'];
const BASELINE_PATH = path.join(__dirname, 'default-convention.baseline.json');

async function countWarnings() {
    const eslint = new ESLint();
    const results = await eslint.lintFiles(TARGET);

    const counts = Object.fromEntries(RULES.map((rule) => [rule, 0]));
    for(const result of results) {
        for(const message of result.messages) {
            if(RULES.includes(message.ruleId)) {
                counts[message.ruleId] += 1;
            }
        }
    }
    return counts;
}

function readBaseline() {
    return JSON.parse(fs.readFileSync(BASELINE_PATH, 'utf8'));
}

async function main() {
    const isUpdate = process.argv.includes('--update');
    const counts = await countWarnings();

    if(isUpdate) {
        fs.writeFileSync(BASELINE_PATH, `${JSON.stringify(counts, null, 2)}\n`);
        console.log('Baseline updated:', counts);
        return;
    }

    const baseline = readBaseline();
    let regressed = false;
    let improved = false;

    for(const rule of RULES) {
        const current = counts[rule] || 0;
        const base = baseline[rule] ?? 0;
        if(current > base) {
            regressed = true;
            console.error(`✖ ${rule}: ${current} (baseline ${base}, +${current - base} new). `
                + 'A new violation was added — fix it (docs/UNDEFINED_NULL_CONVENTION.md) or, if intentional, justify and update the baseline.');
        } else if(current < base) {
            improved = true;
            console.log(`↓ ${rule}: ${current} (baseline ${base}) — improved.`);
        } else {
            console.log(`= ${rule}: ${current} (baseline ${base}).`);
        }
    }

    if(regressed) {
        process.exitCode = 1;
        return;
    }
    if(improved) {
        console.log('No new violations. Run "pnpm run lint-dts-convention:update" to tighten the baseline in this PR.');
    } else {
        console.log('No new violations.');
    }
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
