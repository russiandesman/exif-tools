#!/bin/sh
FILES="$1"

cat $FILES |
while read p
do
  echo "$p"
  T=`exiv2 -g Exif.Photo.DateTimeOriginal -Pv "$p"`
  exiv2 -M"set Exif.Image.DateTime $T" "$p"
  exiv2 -M"set Exif.Photo.DateTimeDigitized $T" "$p"
done
