# AddAccents – Firefox/Thunderbird extension to add accents

I used the excellent extension https://github.com/rugk/unicodify to help me get started with this as I don't know much about building extensions for firefox and thunderbird

This Firefox/Thunderbird extension works a bit like abctajpu used to work: it allows you to type "e" followed by "\\" to insert "é" .

## SETTINGS
### Trigger character:
In the settings you can select the trigger character ("\\" by default).\
Any character can be used as the trigger but you should use a character that's easy to access on the keyboard, and which you won't need to use often in normal circumstances. \
When you type the trigger character, the extension looks at the character immediately left of it, and if it's in the mapping (see below) that character is replaced by the character(s) found in the mapping.
### Character mapping:
An example makes it easy to understand how the mapping works:

With `e:é,a:à` pressing "e" followed by "\\" replaces the inserted "e" with "é" \
With `e:é:è` pressing "e" followed by "\\" replaces the inserted "e" with "é", pressing "\\" again replaces "é" with "è".

The default is `e:é:è:ê:ë:e,a:à:â:a,c:ç,o:ô:œ:o,u:ù:û:u,i:î:ï:i,$:€,d:°`.

The mapping is a comma separated list of original_character:replacement_character(s). 

Note that `e:  something else   ` is perfectly valid but the leading and trailing spaces in the replacement characters will be removed. 
You can use ":" and "," in your replacement string, provided you escape them.  
For example `e:this\,then\:that` is valid, and the replacement string will be "this,then:that"

If you press the trigger character after a character that is not in the mapping, you get the trigger character. 
For example, typing "A\\" will leave A unchanged and place \\ next to it.

* Here's a French mapping:\
`e:é:è:ê:ë:e,a:à:â:a,c:ç,o:ô:œ:o,u:ù:û:u,i:î:ï:i,$:€,d:°` 
* Here's a mapping one could use for typing in Spanish: \
`e:é,a:á,o:ó,u:ú:ü,i:í,n:ñ,?:¿,!:¡,$:€,d:°`
* And one for German:\
`a:ä,o:ö,u:ü,s:ß,$:€,d:°`
* And one for Romanian:\
`a:ă:â,i:î,s:ș:ş,t:ț:ţ,$:€,d:°`
* And one for Czech:\
`A:Á,a:á,C:Č,c:č,D:Ď,d:ď,E:É,e:é,É:Ě,é:ě,I:Í,i:í,N:Ň,n:ň,O:Ó,o:ó,R:Ř,r:ř,S:Š,s:š,T:Ť,t:ť,U:Ú,u:ú,Ú:Ů,ú:ů,Y:Ý,y:ý,Z:Ž,z:ž,$:€`

### Other usage:
You can use the mapping to quickly enter a telephone number you use all the time:\
`7:714 647 8181` \
Or an address: \
`4:45 Rue de la Roquette` \
Note that at this time, the replacement character(s) cannot include a comma or a line return.

## To build:
From the src directory
`zip -r -FS ../addAccents.xpi .` \
Or simply, `make.sh`

## Still to do:
* Implement quick switching between mappings for people who type in multiple languages?

## Version history:
* 0.1 Initial version
* 0.2 Add support for simpler mapping: `e:é:è:e` is now equivalent to `e:é,é:è,è:e`.
