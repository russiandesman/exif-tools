eval(new ActiveXObject("Scripting.FileSystemObject").OpenTextFile(new ActiveXObject("Scripting.FileSystemObject").GetParentFolderName(WScript.ScriptFullName) + "\\tools.js", 1).ReadAll());

var file_with_files = WScript.Arguments(0);
var ymd = WScript.Arguments(1);
var hms = WScript.Arguments(2);

var provided_date = date_from_ymd_and_hms(ymd, hms);

var fso = new ActiveXObject('Scripting.FileSystemObject');
stream=fso.OpenTextFile(file_with_files, 1, false);
var first_file=stream.ReadLine();
var first_file_date_string = GetProcessOutput("exiv2 -g Exif.Photo.DateTimeOriginal -Pv \"" + first_file + "\"");
var first_file_date = date_from_exiv2_date_string(first_file_date_string);
// difference will be in milliseconds, so just divide it by 1000 to get one second resolution
var difference = (provided_date - first_file_date) / 1000;
// reopen the filelist to process it from the beginning
stream.Close();
stream=fso.OpenTextFile(file_with_files, 1, false);
while(!stream.AtEndOfStream) 
{
    var line=stream.ReadLine();
    var cmdline = "exiv2 -g Exif.Photo.DateTimeOriginal -Pv \"" + line + "\"";
    var d = date_from_exiv2_date_string(GetProcessOutput(cmdline));
    d.setSeconds(d.getSeconds() + difference);
    cmdline = "exiv2 -M\"set Exif.Photo.DateTimeOriginal " + date_to_exiv2_date_string(d) + "\" \"" + line + "\"";
    GetProcessOutput(cmdline)
}
 
stream.Close();

