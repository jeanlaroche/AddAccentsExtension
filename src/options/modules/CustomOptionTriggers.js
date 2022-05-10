/**
 * This modules contains the custom triggers for some options that are added.
 *
 * @module modules/CustomOptionTriggers
 */

import * as AutomaticSettings from "/common/modules/AutomaticSettings/AutomaticSettings.js";
import { COMMUNICATION_MESSAGE_TYPE } from "/common/modules/data/BrowserCommunicationTypes.js";


/**
 * Apply the new insertaccent settings.
 *
 * @private
 * @param  {Object} optionValue
 * @param  {string} [option]
 * @param  {Object} [event]
 * @returns {Promise}
 */
function applyInsertaccentPermissions(optionValue) {
    // trigger update for current session
    browser.runtime.sendMessage({
        "type": COMMUNICATION_MESSAGE_TYPE.INSERTACCENT_BACKGROUND,
        "optionValue": optionValue
    });
}

/**
 * Apply the new Unicode font settings.
 *
 * @private
 * @param  {Object} optionValue
 * @param  {string} [option]
 * @param  {Object} [event]
 * @returns {Promise}
 */
function applyUnicodeFontSettings(optionValue) {
    // trigger update for current session
    browser.runtime.sendMessage({
        "type": COMMUNICATION_MESSAGE_TYPE.UNICODE_FONT,
        "optionValue": optionValue
    });
}

/**
 * Binds the triggers.
 *
 * This is basically the "init" method.
 *
 * @returns {Promise}
 */
export function registerTrigger() {
    // update slider status
    AutomaticSettings.Trigger.registerSave("insertaccent", applyInsertaccentPermissions);
    AutomaticSettings.Trigger.registerSave("unicodeFont", applyUnicodeFontSettings);
}
