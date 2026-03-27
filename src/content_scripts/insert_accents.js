"use strict";

const INSERTACCENT_CONTENT = "insertaccentContent";

let triggerChar = "\\";
let charMap = {};
let maxKeyLen = 1;

/**
 * Get the string of up to n characters immediately left of the caret.
 *
 * @param {Object} target
 * @param {number} n - maximum number of characters to return
 * @returns {string|null} - string of up to n chars, or null if selection is non-collapsed
 */
function getCaretString(target, n) {
    // ContentEditable elements
    if (target.isContentEditable || document.designMode === "on") {
        target.focus();
        const _range = document.getSelection().getRangeAt(0);
        if (!_range.collapsed) return null;
        const sel = document.getSelection();
        const offset = sel.anchorOffset;
        const text = sel.anchorNode.wholeText;
        if (!text) return null;
        return text.substring(Math.max(0, offset - n), offset);
    }
    // input and textarea fields
    else {
        // selectionStart is null for input types that don't support selection (e.g. email)
        // in that case assume caret is at end of value
        const pos = target.selectionStart !== null ? target.selectionStart : target.value.length;
        if (target.selectionStart !== null && target.selectionStart !== target.selectionEnd) {
            return null;
        }
        return target.value.substring(Math.max(0, pos - n), pos);
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
 * Replace a character at caret in an input or textarea element.
 * Handles React/framework-controlled inputs by falling back to the native
 * prototype value setter when execCommand reports success but makes no change.
 *
 * @param {Object} target - input or textarea element
 * @param {string} charToDelete - the character immediately left of the caret to remove
 * @param {string} textToInsert - the replacement string
 * @returns {void}
 */
function replaceInInputField(target, charToDelete, textToInsert) {
    // selectionStart is null for input types that don't support selection (e.g. email)
    const start = target.selectionStart !== null ? target.selectionStart : target.value.length;
    const deleteLen = charToDelete.length;

    const valueBefore = target.value;

    // Only use execCommand when we can set the selection to include the char to delete.
    // For inputs where selectionStart is null (e.g. type="email"), skip straight to native setter.
    if (target.selectionStart !== null) {
        target.selectionStart = start - deleteLen;
        target.selectionEnd = start;
        if (document.execCommand("insertText", false, textToInsert) && target.value !== valueBefore) {
            return;
        }
    }

    // Fallback: use the native prototype setter so that React/Vue/Angular
    // controlled inputs actually register the change.
    const proto = (target instanceof HTMLTextAreaElement)
        ? HTMLTextAreaElement.prototype
        : HTMLInputElement.prototype;
    const nativeSetter = Object.getOwnPropertyDescriptor(proto, "value").set;

    const newValue = valueBefore.slice(0, start - deleteLen) + textToInsert + valueBefore.slice(start);
    nativeSetter.call(target, newValue);
    if (target.selectionStart !== null) {
        target.selectionStart = target.selectionEnd = start - deleteLen + textToInsert.length;
    }

    // Dispatch a real InputEvent (not UIEvent) so framework state syncs correctly.
    target.dispatchEvent(new InputEvent("input", { bubbles: true, inputType: "insertText", data: textToInsert }));
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
    if (event.data !== triggerChar) return;

    const target = event.target;
    const lookback = getCaretString(target, maxKeyLen);
    if (lookback === null) return;

    // Try longest key first so e.g. "AD" takes priority over "A" if both are mapped.
    let matchedKey = null;
    for (let len = maxKeyLen; len >= 1; len--) {
        const candidate = lookback.substring(lookback.length - len);
        if (candidate in charMap) {
            matchedKey = candidate;
            break;
        }
    }

    if (matchedKey !== null) {
        event.preventDefault();
        const insert = charMap[matchedKey];
        if (!target.isContentEditable && document.designMode !== "on") {
            replaceInInputField(target, matchedKey, insert);
        } else {
            deleteCaret(target, matchedKey);
            insertAtCaret(target, insert);
        }
        console.debug("Insertaccent: replaced '%s' with '%s'.", matchedKey, insert);
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
    // Regexp with look-back to only split on , and not on \,
    const allPairs = message.charMap.split(/(?<!\\),/);
    //console.debug(allPairs);
    charMap = new Map();
    for (var pair of allPairs)
    {
        // Same thing here, lookback to allow using \: in the replacement.
        var pairs=pair.split(/(?<!\\):/)
        for(var i=0;i<pairs.length-1;i++)
        {
            charMap[pairs[i].trim()]=pairs[i+1].trim().replace(/\\,/g, ',').replace(/\\:/g, ':').replace(/\\n/g, '\n');
        }
    }
    // Auto-pair uppercase: if 'e' -> 'é' is mapped and 'E' is not explicitly mapped,
    // automatically add 'E' -> 'É'.
    for (const key of Object.keys(charMap)) {
        const upperKey = key.toUpperCase();
        if (upperKey !== key && !(upperKey in charMap)) {
            charMap[upperKey] = charMap[key].toUpperCase();
        }
    }
    // Track the longest key so insertAccent knows how far back to look.
    maxKeyLen = Math.max(1, ...Object.keys(charMap).map(k => k.length));
//    console.log("This is the char map");
//    console.log(charMap);
}

/**
 * Handle errors from messages and responses.
 *
 * @param {string} error
 * @returns {void}
 */
function handleError(error) {
    console.warn(`Addaccent: background not ready, retrying in 1s (${error})`);
    setTimeout(() => {
        browser.runtime.sendMessage({ "type": INSERTACCENT_CONTENT }).then(handleResponse, (err) => {
            console.error(`Addaccent: failed to get settings: ${err}`);
        });
    }, 1000);
}

browser.runtime.sendMessage({ "type": INSERTACCENT_CONTENT }).then(handleResponse, handleError);
browser.runtime.onMessage.addListener(handleResponse);
document.addEventListener("beforeinput", insertAccent, true);
console.log("Addaccent module loaded.");
