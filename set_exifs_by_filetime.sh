#!/bin/sh
FILES="$1"

cat $FILES |
while read p
do
  echo "$p"
  FILETIME_EXIF=`date -r "$p" "+%Y:%m:%d %H:%M:%S"`
  FILETIME_TO_RESTORE=`date -r "$p" "+%Y%m%d%H%M.%S"`
  #set exif
  exiv2 -M"set Exif.Photo.DateTimeOriginal $FILETIME_EXIF" "$p"
  #restore time as it was before exif modification
  touch -m -t $FILETIME_TO_RESTORE "$p"
done