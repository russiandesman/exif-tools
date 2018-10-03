# exif-tools
Set of scripts for EXIF timestamps manipulation.
Allows view\set\modify EXIF timestamps from FAR manager.
    Windows:
        https://www.farmanager.com/download.php
    Linux:
        git clone git://github.com/elfmz/far2l (see https://russiandesman.livejournal.com/2624.html)

Just put corresponding FarMenu.ini into appropriate folder (I'd recommend either of profile dir or top level dir of image archive)

Requires exiv2 tool to be installed in system.
    Linux:
        apt install exiv2
    Windows:
        Take the most recent "Windows executable" from http://www.exiv2.org/archive.html
        There is no direct link to Windows executbles from http://www.exiv2.org/download.html by some reason.

Known issues:
    Linux version of set_exifs.sh script does not handle minutes wraparound correctly, so it can set time as 18:72:00
    workaround: use it on <60 items selections OR rewrite date arithmetic the same way as offset_exif.sh.



