#!/bin/sh
FILES="$1"
DATE=$2
TIME=$3

PROVIDED_DATE=`echo "$DATE $TIME" | sed -e s%-%/%g`

DATE_AS_SEC=`date +%s -d "$PROVIDED_DATE"`

cat $FILES |
while read p
do
  echo "$p"
  DATE_TO_SET=`date +"%Y:%m:%d %H:%M:%S" -d @$DATE_AS_SEC`
  exiv2 -M"set Exif.Photo.DateTimeOriginal $DATE_TO_SET" "$p"
  DATE_AS_SEC=$(($DATE_AS_SEC + 60))
done
