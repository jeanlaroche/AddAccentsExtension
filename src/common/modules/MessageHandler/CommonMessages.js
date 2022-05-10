/**
 * Provides access to the most common message types.
 *
 * @public
 * @module CommonMessages
 */

import { MESSAGE_LEVEL } from "../data/MessageLevel.js";

import * as CustomMessages from "./CustomMessages.js";

// simply forward custom message types
export {hideMessage, showMessage} from "./CustomMessages.js";

/**
 * Hides the error message.
 *
 * @public
 * @param  {Object} [options]
 * @param  {boolean} [options.animate=false] set to true to animate the hiding
 * @returns {void}
 */
export function hideError(...args) {
    args.unshift(MESSAGE_LEVEL.ERROR);
    CustomMessages.hideMessage(...args);
}

/**
 * Hide warning message.
 *
 * @public
 * @param  {Object} [options]
 * @param  {boolean} [options.animate=false] set to true to animate the hiding
 * @returns {void}
 */
export function hideWarning(...args) {
    args.unshift(MESSAGE_LEVEL.WARNING);
    CustomMessages.hideMessage(...args);
}

/**
 * Hide info message.
 *
 * @public
 * @param  {Object} [options]
 * @param  {boolean} [options.animate=false] set to true to animate the hiding
 * @returns {void}
 */
export function hideInfo(...args) {
    args.unshift(MESSAGE_LEVEL.INFO);
    CustomMessages.hideMessage(...args);
}

/**
 * Hide loading message.
 *
 * @public
 * @param  {Object} [options]
 * @param  {boolean} [options.animate=false] set to true to animate the hiding
 * @returns {void}
 */
export function hideLoading(...args) {
    args.unshift(MESSAGE_LEVEL.LOADING);
    CustomMessages.hideMessage(...args);
}

/**
 * Hide success message.
 *
 * @public
 * @param  {Object} [options]
 * @param  {boolean} [options.animate=false] set to true to animate the hiding
 * @returns {void}
 */
export function hideSuccess(...args) {
    args.unshift(MESSAGE_LEVEL.SUCCESS);
    CustomMessages.hideMessage(...args);
}

/**
 * Show a critical error.
 *
 * Note this should only be used to show *short* error messages, which are
 * meaningfull to the user, as the space is limited. So it is mostly only
 * useful to use only one param: a string.
 * Also pay attention to the fact, that it currently can only show one error
 * once.
 *
 * @public
 * @param {string} [message] optional, string to show or to translate if omitted no new text is shown
 * @param {boolean} [isDismissable] optional, set to true, if user should be able to dismiss the message
 * @param {Object} [actionButton] optional to show an action button
 * @param {string} actionButton.text
 * @param {string|function} actionButton.action URL to site to open on link OR function to execute
 * @param {...*} args optional parameters for translation
 * @returns {void}
 */
export function showError(...args) {
    args.unshift(MESSAGE_LEVEL.ERROR);
    CustomMessages.showMessage(...args);
}

/**
 * Show an warning message.
 *
 * @public
 * @param {string} [message] optional, string to show or to translate if omitted no new text is shown
 * @param {boolean} [isDismissable] optional, set to true, if user should be able to dismiss the message
 * @param {Object} [actionButton] optional to show an action button
 * @param {string} actionButton.text
 * @param {string|function} actionButton.action URL to site to open on link OR function to execute
 * @param {...*} args optional parameters for translation
 * @returns {void}
 */
export function showWarning(...args) {
    args.unshift(MESSAGE_LEVEL.WARN);
    CustomMessages.showMessage(...args);
}

/**
 * Show an info message.
 *
 * @public
 * @param {string} [message] optional, string to show or to translate if omitted no new text is shown
 * @param {boolean} [isDismissable] optional, set to true, if user should be able to dismiss the message
 * @param {Object} [actionButton] optional to show an action button
 * @param {string} actionButton.text
 * @param {string} actionButton.link URL to site to open on link
 * @param {...*} args optional parameters for translation
 * @returns {void}
 */
export function showInfo(...args) {
    args.unshift(MESSAGE_LEVEL.INFO);
    CustomMessages.showMessage(...args);
}

/**
 * Shows a loading message.
 *
 * @public
 * @param {string} [message] optional, string to show or to translate if omitted no new text is shown
 * @param {boolean} [isDismissable] optional, set to true, if user should be able to dismiss the message
 * @param {Object} [actionButton] optional to show an action button
 * @param {string} actionButton.text
 * @param {string|function} actionButton.action URL to site to open on link OR function to execute
 * @param {...*} args optional parameters for translation
 * @returns {void}
 */
export function showLoading(...args) {
    args.unshift(MESSAGE_LEVEL.LOADING);
    CustomMessages.showMessage(...args);
}

/**
 * Show a success message.
 *
 * @public
 * @param {string} [message] optional, string to show or to translate if omitted no new text is shown
 * @param {boolean} [isDismissable] optional, set to true, if user should be able to dismiss the message
 * @param {Object} [actionButton] optional to show an action button
 * @param {string} actionButton.text
 * @param {string|function} actionButton.action URL to site to open on link OR function to execute
 * @param {...*} args optional parameters for translation
 * @returns {void}
 */
export function showSuccess(...args) {
    args.unshift(MESSAGE_LEVEL.SUCCESS);
    CustomMessages.showMessage(...args);
}

/**
 * Let's other functions set a hook to be called when a message type is
 * shown or hidden.
 *
 * Set parameters to null or undefined (i.e. do not set) in order to disable
 * the hook.
 * The errorShown function gets one parameter: The arguments passed to the
 * function, as an array.
 *
 * @private
 * @param {MESSAGE_LEVEL|HTMLElement} messageType use string "global" for a global hook
 * @param {function|null} [hookShown]
 * @param {function|null} [hookHidden]
 * @returns {void}
 */
function setHook(messageType, hookShown = null, hookHidden = null) {
    CustomMessages.setHook(messageType, "show", hookShown);
    CustomMessages.setHook(messageType, "hide", hookHidden);
}

/**
 * Let's other functions set a hook to be called when a error message is
 * shown or hidden.
 *
 * Set parameters to null or undefined (i.e. do not set) in order to disable
 * the hook.
 * The errorShown function gets one parameter: The arguments passed to the
 * function, as an array.
 *
 * @public
 * @param {function|null} [hookShown]
 * @param {function|null} [hookHidden]
 * @returns {void}
 */
export function setErrorHook(hookShown = null, hookHidden = null) {
    return setHook(MESSAGE_LEVEL.ERROR, hookShown, hookHidden);
}

/**
 * Let's other functions set a hook to be called when a warning message is
 * shown or hidden.
 *
 * Set parameters to null or undefined (i.e. do not set) in order to disable
 * the hook.
 * The errorShown function gets one parameter: The arguments passed to the
 * function, as an array.
 *
 * @public
 * @param {function|null} [hookShown]
 * @param {function|null} [hookHidden]
 * @returns {void}
 */
export function setWarningHook(hookShown = null, hookHidden = null) {
    return setHook(MESSAGE_LEVEL.WARN, hookShown, hookHidden);
}

/**
 * Let's other functions set a hook to be called when a info message is shown
 * or hidden.
 *
 * Set parameters to null or undefined (i.e. do not set) in order to disable
 * the hook.
 * The errorShown function gets one parameter: The arguments passed to the
 * function, as an array.
 *
 * @public
 * @param {function|null} [hookShown]
 * @param {function|null} [hookHidden]
 * @returns {void}
 */
export function setInfoHook(hookShown = null, hookHidden = null) {
    return setHook(MESSAGE_LEVEL.INFO, hookShown, hookHidden);
}

/**
 * Let's other functions set a hook to be called when a loading message is
 * shown or hidden.
 *
 * Set parameters to null or undefined (i.e. do not set) in order to disable
 * the hook.
 * The errorShown function gets one parameter: The arguments passed to the
 * function, as an array.
 *
 * @public
 * @param {function|null} [hookShown]
 * @param {function|null} [hookHidden]
 * @returns {void}
 */
export function setLoadingHook(hookShown = null, hookHidden = null) {
    return setHook(MESSAGE_LEVEL.LOADING, hookShown, hookHidden);
}

/**
 * Let's other functions set a hook to be called when an success message is
 * shown or hidden.
 *
 * Set parameters to null or undefined (i.e. do not set) in order to disable
 * the hook.
 * The errorShown function gets one parameter: The arguments passed to the
 * function, as an array.
 *
 * @public
 * @param {function|null} [hookShown]
 * @param {function|null} [hookHidden]
 * @returns {void}
 */
export function setSuccessHook(hookShown = null, hookHidden = null) {
    return setHook(MESSAGE_LEVEL.SUCCESS, hookShown, hookHidden);
}

/**
 * Called when a message is dismissed.
 *
 + When called, the function does not know, which message is hidden, but you
 * can determinante it by yourself.
 * The called hook gets an object with two parameters:
 * - {HTMLElement} elMessage – the message element, which was hidden
 * - {event} event – the original click even on the dismiss button
 *
 * @public
 * @param {function|null} [startHook]
 * @param {function|null} [endHook]
 * @returns {void}
 */
export function setDismissHooks(startHook = null, endHook = null) {
    CustomMessages.setGlobalHook("dismissStart", startHook);
    CustomMessages.setGlobalHook("dismissEnd", endHook);
}

/**
 * Only registers the message type, if the HTML element exists.
 *
 * @private
 * @param  {int|string} messageType
 * @param  {HTMLElement} elMessage element to register with it
 * @param  {string} [designClass] the class to apply
 * @param  {string} [ariaLabelType] the "aria-label" for this message type
 * @returns {void}
 */
function registerMessageTypeIfExists(messageType, elMessage, designClass, ariaLabelType) {
    if (!elMessage) {
        console.warn(elMessage, "does not exist. Skip registering message type.");
        return;
    }

    CustomMessages.registerMessageType(messageType, elMessage, designClass, ariaLabelType);
}

/**
 * Initialises the module.
 *
 * @public
 * @returns {void}
 */
export function init() {
    registerMessageTypeIfExists(MESSAGE_LEVEL.ERROR, document.getElementById("messageError"), "error", "error message");
    registerMessageTypeIfExists(MESSAGE_LEVEL.WARN, document.getElementById("messageWarning"), "warning", "warning message");
    registerMessageTypeIfExists(MESSAGE_LEVEL.INFO, document.getElementById("messageInfo"), "info", "info message");
    registerMessageTypeIfExists(MESSAGE_LEVEL.SUCCESS, document.getElementById("messageSuccess"), "success", "success message");
    registerMessageTypeIfExists(MESSAGE_LEVEL.LOADING, document.getElementById("messageLoading"), "info", "loading message");
}

// init module automatically
init();
