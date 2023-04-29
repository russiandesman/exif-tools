#!/bin/sh
FILES="$1"
DATE=$2
TIME=$3
FIRSTFILE=`head -n1 $FILES`
FIRSTFILE_DATE=`exiv2 -g Exif.Photo.DateTimeOriginal -Pv "$FIRSTFILE" | sed -e s%:%/%1 -e s%:%/%1`
PROVIDED_DATE=`echo "$DATE $TIME" | sed -e s%-%/%g`

echo $FIRSTFILE_DATE
echo $PROVIDED_DATE

SEC_NEW=`date +%s -d "$PROVIDED_DATE"`
SEC_OLD=`date +%s -d "$FIRSTFILE_DATE"`

DIFF=`echo "$SEC_NEW - $SEC_OLD" | bc`

cat $FILES |
while read p
do
  echo "$p"
  T=`exiv2 -g Exif.Photo.DateTimeOriginal -Pv "$p" | sed -e s%:%/%1 -e s%:%/%1`
  SEC_CUR=`date +%s -d "$T"`
  SEC_NEW=`echo "$SEC_CUR + ($DIFF)" | bc`
  DATE_NEW=`date +"%Y:%m:%d %H:%M:%S" -d @$SEC_NEW`
  exiv2 -M"set Exif.Photo.DateTimeOriginal $DATE_NEW" "$p"
done
