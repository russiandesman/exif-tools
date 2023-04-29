# exif-tools

Set of scripts for EXIF timestamps manipulation.

Allows view\set\modify EXIF timestamps from FAR manager.

    Windows:

        https://www.farmanager.com/download.php

    Linux:

        sudo add-apt-repository ppa:far2l-team/ppa -y

        sudo apt install far2l

Just put corresponding FarMenu.ini into folder with images OR put user_menu.ini into .config/far2l/settings

Adjust paths in FarMenu.ini/user_menu.ini if project's root folder is not ~/exif-tools or symlink it there.


Requires exiv2 tool to be installed in system.

    Linux:

        apt install exiv2

    Windows:

        Take the most recent "Windows executable" from http://www.exiv2.org/archive.html

        There is no direct link to Windows executbles from http://www.exiv2.org/download.html by some reason.
