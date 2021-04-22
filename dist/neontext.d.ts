interface options {
    elem: string;
    colors?: Array<string>;
    shadowBlurRadius?: number;
    random?: boolean;
    colorizeText?: boolean;
    shadowOffsetX?: number;
    shadowOffsetY?: number;
}
declare function neonify({ ...options }: options): void;
declare function _createSpanElements(charArr: Array<string>, options: options): void;
declare function _getRandomIntInclusive(min: number, max: number): number;
declare function _splitElementString(elem: string): Array<string>;
declare function _removeChildNodes(parent: string): void;

export { _createSpanElements, _getRandomIntInclusive, _removeChildNodes, _splitElementString, neonify };
