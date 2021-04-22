/**
 * The interface for the options object
 * @interface options
 */
interface options {
    /** The HTMLElement's id, that contains the text. */
    elem: string,
    /** An array of color strings to be used as textshadow color. */
    colors?: Array<string>,
    /** The blur radius in pixel. */
    blur?: number,
    /** Do the characters randomly get a color assigned. */
    random?: boolean,
    /** Apply color to the text. */
    colorizeText?: boolean
}

/** 
* Splits the innerText of the HTMLElement into spans and applies a different textshadow to each of them, based on the colors provided.
* @function neonify
* @param {options} options - The options object with {elem: string, colors?: string[], blur?: number, random?: boolean}.
*/
function neonify({ ...options }: options) {

    /** If no element was passed via options, or it does not exist log an error and return. */
    if (!options.elem) {
        console.error("No 'elem' property set in options.")
        return
    } else if (!document.getElementById(options.elem)) {
        console.error(`No element with the id "${options.elem}" found.`)
        return
    }

    /** Set defaults if not set via options parameter. */
    options.elem = options.elem
    options.colors = options.colors || ["#ff00ff", "#00ffff", "#ffff00"]
    options.blur = options.blur || 5
    options.random = options.random || false
    options.colorizeText = options.colorizeText || false

    /** @constant {Array<string>} */
    const charArr = _splitElementString(options.elem)

    _removeChildNodes(options.elem);
    _createSpanElements(charArr, options);
}

/** 
* Wraps every character in a span element and applies a textshadow effect to each one of them.
* @function createSpanElements
* @param {Array<string>} charArr - An array containing the split characters.
*/
function _createSpanElements(charArr: Array<string>, options: options) {
    const elem = document.getElementById(options.elem)
    for (let i = 0; i < charArr.length; i++) {
        if (charArr[i] == "\n") {
            elem.appendChild(document.createElement("br"));
        } else {
            let span = document.createElement("span");
            span.setAttribute('class', 'data');
            span.innerText = charArr[i];

            /** randomly apply a color for the textshadow */
            if (options.random) {
                const randomNumber = _getRandomIntInclusive(0, options.colors.length - 1)
                span.style.textShadow = "0px 0px " + options.blur + "px " + options.colors[randomNumber];
                if(options.colorizeText) {
                    span.style.color = options.colors[randomNumber]
                }
            }
            elem.appendChild(span);
        }
    }
    /** repeat the colors if !options.random */
    if (!options.random) {
        for (let y = 0; y < options.colors.length; y++) {
            for (let i = 0; i < elem.querySelectorAll("span:nth-of-type(" + options.colors.length + "n + " + (y + 1) + ")").length; i++) {
                let spanElement = elem.querySelectorAll("span:nth-of-type(" + options.colors.length + "n + " + (y + 1) + ")")[i] as HTMLElement
                spanElement.style.textShadow = "0px 0px " + options.blur + "px " + options.colors[y]
                if(options.colorizeText) {
                    spanElement.style.color = options.colors[y]
                }
            }
        }
    }
}

/** 
* Takes in a min and max number and randmonly returns a number(including min and max).
* @function getRandomIntInclusive
* @param {number} min - Is always 0.
* @param {number} max - Equates to array.length -1.
* @returns {number}
*/
function _getRandomIntInclusive(min: number, max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/** 
* Takes in the id of an element and splits it's innerText into characters.
* @function splitElementString
* @param {string} elem - The id of the text container.
* @returns {Array<string>}
*/
function _splitElementString(elem: string): Array<string> {
    const _elem = document.getElementById(elem)
    return Array.from(_elem.innerText);
}

/** 
* Removes all children from a node..
* @function removeChildNodes
* @param {string} parent - The id of the text container.
*/
function _removeChildNodes(parent: string) {
    const _parent = document.getElementById(parent)
    while (_parent.firstChild) {
        _parent.removeChild(_parent.firstChild);
    }
}


export { neonify, _getRandomIntInclusive, _splitElementString, _removeChildNodes, _createSpanElements }
