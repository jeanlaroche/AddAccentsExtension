# AddAccents – Extension to add accents

I used the excellent extension https://github.com/rugk/unicodify to help me get start with this as I don't know much about building extension for firefox and thunderbird

This extension works a bit like abctajpu used to work: it allows to type e followed by \ to insert é .

### SETTINGS
* Trigger character:
In the settings you can select the trigger character ("\\" by default) and the character mapping.
Any character can be used as the trigger but you should use a character that's easy to access on the keyboard, and which you won't need to use often in normal circumstances.
* Character mapping:
The default is "e:é, w:è, r:ê, a:à, s:â, c:ç, o:ô, u:ù, y:û, i:î, k:ï, n:ñ". As an example, typing "e" followed by the trigger character will insert é. The mapping is a comma separated list of original_character:replacement_character. If you press the trigger character after a character that is not in the mapping, you get the trigger character. For example, typing "A\\" will insert "A\\"


### To build:
From the src directory
zip -r -FS ../addAccents.xpi .
Or simply, make.sh

### Still to do:
* Sign the extension
