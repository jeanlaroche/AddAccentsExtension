"use strict";

const INSERTACCENT_CONTENT = "insertaccentContent";

let triggerChar = "\\";
let charMap = {};

/**
 * Get character left of caret.
 *
 * @param {Object} target
 * @returns {number}
 */
function getCaretChar(target) {
    // ContentEditable elements
    if (target.isContentEditable || document.designMode === "on") {
        target.focus();
        const _range = document.getSelection().getRangeAt(0);
        if (!_range.collapsed) {
            return null;
        }
        var sel = document.getSelection()
        var offset = sel.anchorOffset;
        var text = sel.anchorNode.wholeText
        if(!text) return null;
        console.debug("getSelection.anchorOffset:  ", offset, text, text[offset-1]);
        return text[offset-1];
    }
    // input and textarea fields
    else {
        if (target.selectionStart !== target.selectionEnd) {
            return null;
        }
//        console.debug("TARGET:",target);
//        console.debug("TARGET VALUE:",target.value);
//        console.debug("target.selectionStart:",target.selectionStart);
//
        return target.value[target.selectionStart-1];
    }
}

/**
 * Insert at caret in the given element.
 * Adapted from: https://www.everythingfrontend.com/posts/insert-text-into-textarea-at-cursor-position.html
 *
 * @param {Object} target
 * @param {string} atext
 * @throws {Error} if nothing is selected
 * @returns {void}
 */
function insertAtCaret(target, atext) {
    // document.execCommand is deprecated, although there is not yet an alternative: https://developer.mozilla.org/en-US/docs/Web/API/Document/execCommand
    // insertReplacementText
    if(document.execCommand("insertText", false, atext)) {
        return;
    }

    // Firefox input and textarea fields: https://bugzilla.mozilla.org/show_bug.cgi?id=1220696
    if (typeof target.setRangeText === "function") {
        const start = target.selectionStart;
        const end = target.selectionEnd;

        if (start !== undefined && end !== undefined) {
            target.setRangeText(atext);

            target.selectionStart = target.selectionEnd = start + atext.length;

            // Notify any possible listeners of the change
            const event = document.createEvent("UIEvent");
            event.initEvent("input", true, false);
            target.dispatchEvent(event);

            return;
        }
    }

    throw new Error("nothing selected");
}

/**
 * Insert into page.
 *
 * @param {string} atext
 * @returns {void}
 */
function insertIntoPage(atext) {
    return insertAtCaret(document.activeElement, atext);
}

/**
 * Count Unicode characters.
 * Adapted from: https://blog.jonnew.com/posts/poo-dot-length-equals-two
 *
 * @param {string} str
 * @returns {number}
 */
function countChars(str) {
    // removing the joiners
    const split = str.split("\u{200D}");
    let count = 0;

    for (const s of split) {
        // removing the variation selectors
        count += Array.from(s.split(/[\ufe00-\ufe0f]/).join("")).length;
    }

    return count;
}

/**
 * Delete at caret.
 *
 * @param {Object} target
 * @param {string} atext
 * @returns {void}
 */
function deleteCaret(target, atext) {
    const count = countChars(atext);
    if (count > 0) {
        // document.execCommand is deprecated, although there is not yet an alternative: https://developer.mozilla.org/en-US/docs/Web/API/Document/execCommand
        if (document.execCommand("delete", false)) {
            for (let i = 0; i < count - 1; ++i) {
                document.execCommand("delete", false);
            }
        }
        // Firefox input and textarea fields: https://bugzilla.mozilla.org/show_bug.cgi?id=1220696
        else if (typeof target.setRangeText === "function") {
            const start = target.selectionStart;

            target.selectionStart = start - atext.length;
            target.selectionEnd = start;
            target.setRangeText("");

            // Notify any possible listeners of the change
            const e = document.createEvent("UIEvent");
            e.initEvent("input", true, false);
            target.dispatchEvent(e);
        }
    }
}

/**
 * Insertaccent on text input even by evaluating the keys and replacing the characters/string.
 *
 * @param {Object} event
 * @returns {void}
 */
function insertAccent(event) {
//    console.log('beforeinput', event.inputType, event.data);
    if (!(event.inputType === "insertText" || event.inputType === "insertCompositionText" || event.inputType === "insertParagraph" || event.inputType === "insertLineBreak")) {
        return;
    }
    const target = event.target;
    let previousChar = getCaretChar(target);
    let doReplace = (event.data == triggerChar && previousChar in charMap);
    if (doReplace) {
        event.preventDefault();
        deleteCaret(target, previousChar);
        let insert = charMap[previousChar];
        insertAtCaret(target, insert);
        console.debug("Insertaccent: “%s” was replaced with “%s”.", previousChar, insert);
    }
}


/**
 * Handle response from the insertaccent module.
 *
 * @param {Object} message
 * @param {Object} sender
 * @returns {void}
 */
function handleResponse(message, sender) {
//    console.log("HANDLE RESPONSE")
    if (message.type !== INSERTACCENT_CONTENT) {
        return;
    }
    triggerChar = message.triggerChar;
//    console.log("Trigger char " + triggerChar);
//    console.log("charMap " + message.charMap);
    // Create the chacter mapping associative array from the string.
    const allPairs = message.charMap.split(",");
    charMap = new Map();
    for (var pair of allPairs)
    {
        var pairs=pair.split(':')
        for(var i=0;i<pairs.length-1;i++)
        {
            charMap[pairs[i].trim()]=pairs[i+1].trim();
        }
    }
    console.log(charMap)
}

/**
 * Handle errors from messages and responses.
 *
 * @param {string} error
 * @returns {void}
 */
function handleError(error) {
    console.error(`Error: ${error}`);
}

browser.runtime.sendMessage({ "type": INSERTACCENT_CONTENT }).then(handleResponse, handleError);
browser.runtime.onMessage.addListener(handleResponse);
window.addEventListener("beforeinput", insertAccent, true);
console.log("Addaccent module loaded.");
