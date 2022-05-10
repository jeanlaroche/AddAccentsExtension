"use strict";

import * as AddonSettings from "/common/modules/AddonSettings/AddonSettings.js";
import * as BrowserCommunication from "/common/modules/BrowserCommunication/BrowserCommunication.js";

import { COMMUNICATION_MESSAGE_TYPE } from "/common/modules/data/BrowserCommunicationTypes.js";

const settings = {
    triggerChar:  null,
    charMap:  null,
};

// Chrome
// Adapted from: https://github.com/mozilla/webextension-polyfill/blob/master/src/browser-polyfill.js
const IS_CHROME = Object.getPrototypeOf(browser) !== Object.prototype;

/**
 * Apply new insertaccent settings and create regular expressions.
 *
 * @returns {void}
 */
function applySettings() {
    // Escape special characters
    const regExSpecialChars = /[.*+?^${}()|[\]\\]/g;
}

/**
 * On error.
 *
 * @param {string} error
 * @returns {void}
 */
function onError(error) {
    console.error(`Error: ${error}`);
}

/**
 * Set insertaccent settings.
 *
 * @param {Object} insertaccent
 * @returns {void}
 */
function setSettings(insertaccent) {
    settings.triggerChar = insertaccent.triggerChar;
    settings.charMap = insertaccent.charMap;

    console.log("TRIGGER CHAR" + settings.triggerChar)
    applySettings();
}

/**
 * Send insertaccent settings to content scripts.
 *
 * @param {Object} insertaccent
 * @returns {void}
 */
function sendSettings(insertaccent) {
    setSettings(insertaccent);

    browser.tabs.query({}).then((tabs) => {
        for (const tab of tabs) {
            // This requires Thunderbird 78.4: https://bugzilla.mozilla.org/show_bug.cgi?id=1641576
            browser.tabs.sendMessage(
                tab.id,
                {
                    "triggerChar": settings.triggerChar,
                    "charMap": settings.charMap,
                }
            ).catch(onError);
        }
    }).catch(onError);
}

/**
 * Init insertaccent module.
 *
 * @public
 * @returns {void}
 */
export async function init() {
    const insertaccent = await AddonSettings.get("insertaccent");

    setSettings(insertaccent);

    browser.runtime.onMessage.addListener((message) => {
        // console.log(message);
        if (message.type === COMMUNICATION_MESSAGE_TYPE.INSERTACCENT_CONTENT) {
            const response = {
                "type": COMMUNICATION_MESSAGE_TYPE.INSERTACCENT_CONTENT,
                "triggerChar": settings.triggerChar,
                "charMap": settings.charMap,
            };
            // console.log(response);
            return Promise.resolve(response);
        }
    });

    // Thunderbird
    // Remove if part 3 of https://bugzilla.mozilla.org/show_bug.cgi?id=1630786#c4 is ever done
    if (typeof messenger !== "undefined") {
        browser.composeScripts.register({
            js: [
                { file: "/content_scripts/insert_accents.js" },
            ],
        });
    }
}

BrowserCommunication.addListener(COMMUNICATION_MESSAGE_TYPE.INSERTACCENT_BACKGROUND, (request) => {
    // clear cache by reloading all options
    // await AddonSettings.loadOptions();

    return sendSettings(request.optionValue);
});
