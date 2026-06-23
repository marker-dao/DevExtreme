/* eslint-disable spellcheck/spell-checker */
const noDirectPreactSignalsCoreImport = require('./no_direct_preact_signals_core_import');
const preferSwitchTrue = require('./prefer_switch_true');
const noDeferred = require('./no_deferred');
const jsdocDefaultMatchesType = require('./jsdoc_default_matches_type');
const literalUnionNeedsDefaultDoc = require('./literal_union_needs_default_doc');

module.exports = {
    rules: {
        'no-direct-preact-signals-core-import': noDirectPreactSignalsCoreImport,
        'prefer-switch-true': preferSwitchTrue,
        'no-deferred': noDeferred,
        'jsdoc-default-matches-type': jsdocDefaultMatchesType,
        'literal-union-needs-default-doc': literalUnionNeedsDefaultDoc,
    },
};
