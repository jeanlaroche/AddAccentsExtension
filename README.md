# AddAccents – Extension to add accents

I used the excellent extension https://github.com/rugk/unicodify to help me get started with this as I don't know much about building extensions for firefox and thunderbird

This extension works a bit like abctajpu used to work: it allows you to type "e" followed by "\" to insert "é" .

### SETTINGS
* Trigger character:
In the settings you can select the trigger character ("\\" by default). Any character can be used as the trigger but you should use a character that's easy to access on the keyboard, and which you won't need to use often in normal circumstances. When you type the trigger character, the extension looks at the character immediately left of it, and if it's in the mapping (see below) that character is replaced by the character found in the mapping.
* Character mapping:
The default is "e:é, w:è, r:ê, a:à, s:â, c:ç, o:ô, u:ù, y:û, i:î, k:ï, n:ñ". As an example, typing "e" followed by the trigger character will insert é. The mapping is a comma separated list of original_character:replacement_character. If you press the trigger character after a character that is not in the mapping, you get the trigger character. For example, typing "A\\" will leave A unchanged and place \\ next to it.


### To build:
From the src directory
zip -r -FS ../addAccents.xpi .
Or simply, make.sh

### Still to do:
* Sign the extension
