This extension works a bit like abctajpu used to work: it allows you to type "e" followed by "\" to insert "é", "a\" to insert "à" etc.
"\" is the default trigger character, but this can be changed in the settings.

## Settings

### Trigger character
In the settings you can select the trigger character ("\" by default).
Any character can be used as the trigger but you should use a character that's easy to access on the keyboard, and which you won't need to use often in normal circumstances.
When you type the trigger character, the extension looks at the characters immediately left of it, and if they match a key in the mapping (see below) they are replaced by the value found in the mapping.

### Character mapping

An example makes it easy to understand how the mapping works:

With `e:é,a:à` as a character mapping, pressing "e" followed by "\" replaces the inserted "e" with "é".
With `e:é:è` pressing "e" followed by "\" replaces the inserted "e" with "é", pressing "\" again replaces "é" with "è".

The default is `e:é:è:ê:ë:e,a:à:â:a,c:ç,o:ô:œ:o,u:ù:û:u,i:î:ï:i,$:€,d:°`.

The mapping is a comma-separated list of key:replacement pairs.

Note that leading and trailing spaces in replacement values are removed. If you press the trigger after something not in the mapping, you get the trigger character unchanged.

**Automatic uppercase pairing:** mapping a lowercase letter automatically maps the uppercase version too. For example, `e:é` also maps E to É. You can override this with an explicit uppercase entry.

Some ready-to-use mappings:

* French: `e:é:è:ê:ë:e,a:à:â:a,c:ç,o:ô:œ:o,u:ù:û:u,i:î:ï:i,$:€,d:°`
* Spanish: `e:é,a:á,o:ó,u:ú:ü,i:í,n:ñ,?:¿,!:¡,$:€,d:°`
* German: `a:ä,o:ö,u:ü,s:ß,$:€,d:°`
* Romanian: `a:ă:â,i:î,s:ș:ş,t:ț:ţ,$:€,d:°`
* Czech: `A:Á,a:á,C:Č,c:č,D:Ď,d:ď,E:É,e:é,É:Ě,é:ě,I:Í,i:í,N:Ň,n:ň,O:Ó,o:ó,R:Ř,r:ř,S:Š,s:š,T:Ť,t:ť,U:Ú,u:ú,Ú:Ů,ú:ů,Y:Ý,y:ý,Z:Ž,z:ž,$:€`

## Snippets and multi-line expansions

Keys can be more than one character, making the extension useful for expanding abbreviations. For example:

`ph:714 647 8181,ad:45 Rue de la Roquette`

will expand `ph\` to your phone number and `ad\` to your address.

You can include line breaks using `\n`. Combined with multi-character keys this makes it easy to expand an abbreviation into a full multi-line block:

`ad:45 Rue de la Roquette\nParis 75011`

Note that line breaks only take effect in multi-line fields (textarea, rich text editors).

When multiple keys could match (e.g. both "a" and "ad" are mapped), the longest match wins.
