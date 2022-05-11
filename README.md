# AddAccents – Extension to add accents

I used the excellent extension https://github.com/rugk/unicodify to help me get started with this as I don't know much about building extensions for firefox and thunderbird

This extension works a bit like abctajpu used to work: it allows you to type "e" followed by "\" to insert "é" .

### SETTINGS
####Trigger character:
In the settings you can select the trigger character ("\\" by default).\
Any character can be used as the trigger but you should use a character that's easy to access on the keyboard, and which you won't need to use often in normal circumstances. \
When you type the trigger character, the extension looks at the character immediately left of it, and if it's in the mapping (see below) that character is replaced by the character(s) found in the mapping.
####Character mapping:
The default is `e:é, w:è, r:ê, a:à, s:â, c:ç, o:ô, u:ù, y:û, i:î, k:ï, n:ñ`. 
As an example, typing "e" followed by the trigger character will insert é. 
The mapping is a comma separated list of original_character:replacement_character(s). 
Note that `e:something else` is perfectly valid but the leading and trailing spaces in the replacement characters will be removed. 
If you press the trigger character after a character that is not in the mapping, you get the trigger character. 
For example, typing "A\\" will leave A unchanged and place \\ next to it.

You can get fancy with the mapping: `e:é,é:è,è:ê,ê:ë,ë:e` makes is so repeatedly pressing the "\" key will cycle through the various accented versions of the character "e" in French.

* Here's a French mapping following this technique:\
`e:é,é:è,è:ê,ê:ë,ë:e,a:à,à:â,c:ç,o:ô,ô:œ,u:ù,ù:û,i:î,î:ï,$:€,d:°` \
* Here's a mapping one could use for typing in Spanish: \
`a:á,o:ó,u:ú,ú:ü,i:í,n:ñ,?:¿,!:¡,$:€,d:°`\
* And one for German:\
`a:ä,o:ö,u:ü,s:ß,$:€,d:°`
* And one for Romanian:\
`a:ă,ă:â,i:î,s:ș,ș:ş,t:ț,ț:ţ,$:€,d:°`
* And one for Czech:\
`A:Á,a:á,C:Č,c:č,D:Ď,d:ď,E:É,e:é,É:Ě,é:ě,I:Í,i:í,N:Ň,n:ň,O:Ó,o:ó,R:Ř,r:ř,S:Š,s:š,T:Ť,t:ť,U:Ú,u:ú,Ú:Ů,ú:ů,Y:Ý,y:ý,Z:Ž,z:ž,$:€`

####Other usage:
You can use the mapping to quickly enter a telephone number you use all the time:\
`7:714 647 8181` \
Or an address: \
`4:45 Rue de la Roquette` \
Note that at this time, the replacement character(s) cannot include a comma or a line return.

### To build:
From the src directory
`zip -r -FS ../addAccents.xpi .` \
Or simply, `make.sh`

### Still to do:
* Implement quick switching between mapping for people who type in multiple languages?
* Replace `e:é,é:è,è:ê,ê:e` with `e:é:è:ê:e` to make it easier to create cycling rules.
