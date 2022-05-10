#!/bin/sh
#
# Makes a release ZIP of the add-on.
#
# IMPORTANT: This is only useful for building release versions of the add-on.
# For development, please rather follow the guidance in the contributing doc.
#

EXTENSION_NAME="addAccents"


# create zip
cd src || exit
rm "../$EXTENSION_NAME.xpi"
zip -r -FS "../$EXTENSION_NAME.xpi" . -x "*/.DS_Store" -x ".idea/*"
cd ..
