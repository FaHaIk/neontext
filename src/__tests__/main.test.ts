import { _getRandomIntInclusive, _splitElementString, _removeChildNodes, _createSpanElements, neonify } from '../neontext'

let startHTML = '<div id="btn">Add</div><div id="btn2">Sub A</div> <div id="parent"><p><span>Hall</span></p><span></span>o</div>'

document.body.innerHTML = startHTML;

describe('character array from element text', () => {

    beforeAll(() => {
        Object.defineProperty(HTMLElement.prototype, 'innerText', {
            get() {
                return this.textContent;
            }
        });
    });

    afterEach(() => {
        document.getElementsByTagName('html')[0].innerHTML = startHTML;
    });

    test('"Add" -> ["A", "d", "d"]', () => {
        expect(_splitElementString("btn")).toEqual(["A", "d", "d"])
    });

    test('"Sub A" -> ["S", "u", "b", " ", "A"]', () => {
        expect(_splitElementString("btn2")).toEqual(["S", "u", "b", " ", "A"])
    });

    test('"Add" != ["A", "d"]', () => {
        expect(_splitElementString("btn")).not.toEqual(["A", "d"])
    });

});

describe('random int between 2 numbers(inclusive)', () => {

    afterEach(() => {
        document.getElementsByTagName('html')[0].innerHTML = startHTML;
    });

    test('...(0, 3) is number between 0 and 3', () => {
        expect([0, 1, 2, 3]).toContain(_getRandomIntInclusive(0, 3))
    });

    test('...(4, 6) is number between 4 and 6', () => {
        expect([4, 5, 6]).toContain(_getRandomIntInclusive(4, 6))
    });

    test('...(12, 15) is not included in [5, 6, 7, 8]', () => {
        expect([12, 13, 14, 15]).not.toContain(_getRandomIntInclusive(5, 8))
    });

});

describe('remove children from element', () => {

    test('#parent has no children', () => {
        _removeChildNodes("parent")
        expect(document.getElementById("parent").childNodes.length).toBeFalsy()
    });

});

describe('create span elements for each char', () => {

    beforeAll(() => {
        Object.defineProperty(HTMLSpanElement.prototype, 'innerText', {
            enumerable: true,
            configurable: true,
            get: function () {
                return this.getAttribute('textContent')
            },
            set: function (newval) {
                this.setAttribute('textContent', newval);
            }
        });
    });

    afterEach(() => {
        document.getElementsByTagName('html')[0].innerHTML = startHTML;
    });

    test('creates 3 span elements', () => {
        _createSpanElements(["A", "d", "d"], { elem: "btn", colors: ["#ff00ff", "#f0f0f0"] })
        expect(document.getElementById("btn").getElementsByTagName("span").length).toBe(3)
    });

    test('creates 5 instead of 4 -> false', () => {
        _createSpanElements(["S", "u", "b", " ", "A"], { elem: "btn2", colors: ["#ff00ff", "#f0f0f0"] })
        expect(document.getElementById("btn").getElementsByTagName("span").length).not.toBe(4)
    });

    test('span has text-shadow', () => {
        _createSpanElements(["A", "d", "d"], { elem: "btn", colors: ["#ff00ff", "#f0f0f0"] })
        expect(document.getElementById("btn").getElementsByTagName("span")[0].style.textShadow).toContain("0px")
    });

});


describe('main function', () => {

    afterEach(() => {
        document.getElementsByTagName('html')[0].innerHTML = startHTML;
    });

    test('neonify({elem: "btn", blur: 5, colors:["red"]})', () => {
        neonify({elem: "btn", blur: 5, colors:["red"]})
        expect(document.getElementById("btn").querySelector("span").style.textShadow).toBe("0px 0px 5px red")
        expect(document.getElementById("btn").getElementsByTagName("span").length).toBe(3)
    });

    test('neonify({elem: "btn2", colors: ["#ff00ff", "#00ffff"]})', () => {
        neonify({ elem: "btn2", colors: ["#ff00ff", "#00ffff"] })
        const textShadowString = document.getElementById("btn2").querySelector("span").style.textShadow
        expect(["#ff00ff","#00ffff"]).toContain(textShadowString.substring(textShadowString.length - 7))
        expect(document.getElementById("btn2").getElementsByTagName("span").length).toBe(5)
    });

});