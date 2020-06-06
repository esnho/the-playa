#!/bin/bash

mydir=$1

FILES=""

while read -d $'\0' file; do
    FILES="${FILES} $file"
done < <( find ${mydir} -type f \( ! -iname ".*" ! -iname "*.html" \) -print0 )

audiosprite --path audio --output audio/$2 ${FILES}