/**
 * Specifies the default settings of the add-on.
 *
 * @module data/DefaultSettings
 */

/**
 * An object of all default settings.
 *
 * @private
 * @const
 * @type {Object}
 */
const defaultSettings = {
    insertaccent: {
        triggerChar: "\\",
        charMap: 'e:é:è:ê:ë:e,a:à:â:a,c:ç,o:ô:œ:o,u:ù:û:u,i:î:ï:i,$:€,d:°',
    },
    unicodeFont: {
        changeFont: true,
        changeCase: true,
        showReadableText: false,
        livePreview: false
    }
};

// freeze the inner objects, this is strongly recommend
Object.values(defaultSettings).map(Object.freeze);

/**
 * Export the default settings to be used.
 *
 * @public
 * @const
 * @type {Object}
 */
export const DEFAULT_SETTINGS = Object.freeze(defaultSettings);
