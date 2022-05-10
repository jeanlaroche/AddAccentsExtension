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
        insertaccentUnicodeFracts: true,
        triggerChar: "\\",
        charMap: 'e:é, w:è, r:ê, a:à, s:â, c:ç, o:ô, u:ù, y:û, i:î, k:ï, n:ñ',
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
