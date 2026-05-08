/**
 * @public
 * @docid
 */
export type BLOCKCHAIN_MAP = {
    /**
     * @docid
     * @public
     */
    bitcoin?: string;
    /**
     * @docid
     * @public
     */
    // eslint-disable-next-line spellcheck/spell-checker
    ethereum?: string;
};

/**
 * @public
 * @docid
 */
export type BLOCKCHAIN_MAP_ONLY_ETHEREUM = Omit<BLOCKCHAIN_MAP, 'bitcoin'>;

/**
 * @public
 * @docid
 */
export type BLOCKCHAIN_MAP_ONLY_BITCOIN = Pick<BLOCKCHAIN_MAP, 'bitcoin'>;

/**
 * @public
 * @docid
 */
export interface ALLCHAINS {
    /**
     * @docid
     * @public
     */
    names?: string[];
    /**
     * @docid
     * @type BLOCKCHAIN_MAP
     * @public
     */
    l1?: BLOCKCHAIN_MAP;
}

/**
 * @public
 * @docid
 */
export interface ETHEREUM {
    /**
     * @docid
     * @public
     */
    name?: string;
    /**
     * @docid
     * @public
     */
    l1?: BLOCKCHAIN_MAP_ONLY_ETHEREUM;
    /**
     * @docid
     * @public
     */
    l2?: Omit<BLOCKCHAIN_MAP, 'bitcoin'>;
}

/**
 * @public
 * @docid
 */
export interface BITCOIN {
    /**
     * @docid
     * @public
     */
    name?: string;
    /**
     * @docid
     * @public
     */
    l1?: BLOCKCHAIN_MAP_ONLY_BITCOIN;
}
