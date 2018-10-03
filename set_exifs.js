eval(new ActiveXObject("Scripting.FileSystemObject").OpenTextFile(new ActiveXObject("Scripting.FileSystemObject").GetParentFolderName(WScript.ScriptFullName) + "\\tools.js", 1).ReadAll());

var file_with_files = WScript.Arguments(0);
var ymd = WScript.Arguments(1);
var hms = WScript.Arguments(2) + ":00";

var start_date = date_from_ymd_and_hms(ymd, hms);

WScript.Echo(start_date);

var fso = new ActiveXObject('Scripting.FileSystemObject');

stream=fso.OpenTextFile(file_with_files, 1, false);
d = start_date;
while(!stream.AtEndOfStream) 
{
    var line=stream.ReadLine();
    var cmdline = "exiv2 -M\"set Exif.Photo.DateTimeOriginal " + date_to_exiv2_date_string(d) + "\" \"" + line + "\""
    var output = GetProcessOutput(cmdline);
    // process indication
    WScript.Echo(cmdline);
    d.setMinutes(d.getMinutes() + 1);
}
 
stream.Close();
