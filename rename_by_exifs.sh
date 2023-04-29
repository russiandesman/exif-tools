#!/bin/sh
FILES="$1"

cat $FILES |
while read p
do
  echo "$p"
  exiv2 -t rename "$p"
done
