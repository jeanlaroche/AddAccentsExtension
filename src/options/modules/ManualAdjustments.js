import { getBrowserValue } from "/common/modules/BrowserCompat.js";

/**
 * Initializes module.
 *
 * Applies the adjustments.
 *
 * @returns {Promise}
 */
export function init() {
    getBrowserValue({
        firefox: "https://addons.mozilla.org/firefox/addon/awesome-emoji-picker/?utm_source=addAccent-addon&utm_medium=addon&utm_content=addAccent-addon-settings-inline&utm_campaign=addAccent-addon-settings-inline",
        thunderbird: "https://addons.thunderbird.net/thunderbird/addon/awesome-emoji-picker/reviews/?utm_source=addAccent-addon&utm_medium=addon&utm_content=addAccent-addon-settings-inline&utm_campaign=addAccent-addon-settings-inline",
        chrome: "https://chrome.google.com/webstore/detail/awesome-emoji-picker/",
    }).then((browserUrl) => {
        document.getElementById("link-awesome-emoji").href = browserUrl;
    });
}
