#!/bin/sh
FILES="$1"
#LOCATION="59.963037, 30.392343"
LOCATION=$2

OLDIFS=$IFS

IFS=,
set $LOCATION
LATTITUDE=$1
LONGITUDE=$2

IFS=$OLDIFS
echo "$LATTITUDE --- $LONGITUDE"

LATT_LETTER=`echo "if ($LATTITUDE > 0) print \"N\" else print \"S\"" | bc`
LONG_LETTER=`echo "if ($LONGITUDE > 0) print \"E\" else print \"W\"" | bc`

TRUNC="define trunc(x) { auto s; s=scale; scale=0; x=x/1; scale=s; return x }; trunc"
ABS="define abs(i) { if (i < 0) return (-i); return (i) }; abs"

LATT_ABS=`echo "$ABS($LATTITUDE)" | bc`
LONG_ABS=`echo "$ABS($LONGITUDE)" | bc`

DENOMINATOR=1000000
LATT_NUMERATOR=`echo "$TRUNC($LATT_ABS * $DENOMINATOR)" | bc`
LONG_NUMERATOR=`echo "$TRUNC($LONG_ABS * $DENOMINATOR)" | bc`

cat $FILES |
while read p
do
  echo "$p"
  exiv2 \
     -M"set Exif.GPSInfo.GPSLatitude $LATT_NUMERATOR/$DENOMINATOR 0/1 0/1" \
     -M"set Exif.GPSInfo.GPSLatitudeRef $LATT_LETTER" \
     -M"set Exif.GPSInfo.GPSLongitude $LONG_NUMERATOR/$DENOMINATOR 0/1 0/1" \
     -M"set Exif.GPSInfo.GPSLongitudeRef $LONG_LETTER" \
     -M"set Exif.GPSInfo.GPSVersionID 2 2 0 0" \
     "$p"
done
