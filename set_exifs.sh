#!/bin/sh
FILES="$1"
DATE=$2
TIME=$3

OLDIFS=$IFS

IFS=-
set $DATE
YEAR=$1
MONTH=$2
DAY=$3

IFS=:
set $TIME
HOURS=$1
MINUTES=$2

IFS=$OLDIFS
echo $YEAR $MONTH $DAY $HOURS $MINUTES

M=`echo $MINUTES | bc`


cat $FILES |
while read p
do
  echo "$p"
  exiv2 -M"set Exif.Photo.DateTimeOriginal $YEAR:$MONTH:$DAY $HOURS:$(printf "%02d" $M):00" "$p"
  M=$(($M + 1))
done