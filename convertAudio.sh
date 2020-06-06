#!/bin/bash

mydir=./SAMPLESWAP

FILES=""

while read -d $'\0' file; do
    FILES="${FILES} $file"
    echo "ProcessingTwo $file $FILES"
done < <( find ${mydir} -type f \( ! -iname ".*" ! -iname "*.html" \) -print0 )

audiosprite --output theplayainput${FILES}