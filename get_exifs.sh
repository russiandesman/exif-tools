#!/bin/sh
FILES="$1"

cat $FILES |
while read p
do
    exif_date=`exiv2 -g Exif.Photo.DateTimeOriginal -Pv "$p"`
    exif_date2=`exiv2 -g Exif.Image.DateTime -Pv "$p"`
    printf '%30s->%s(%s)\n' "$(basename "$p")" "$exif_date" "$exif_date2"
done