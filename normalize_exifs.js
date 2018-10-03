eval(new ActiveXObject("Scripting.FileSystemObject").OpenTextFile(new ActiveXObject("Scripting.FileSystemObject").GetParentFolderName(WScript.ScriptFullName) + "\\tools.js", 1).ReadAll());

var file_with_files = WScript.Arguments(0);
var fso = new ActiveXObject('Scripting.FileSystemObject');
stream=fso.OpenTextFile(file_with_files, 1, false);
while(!stream.AtEndOfStream) 
{
    var line=stream.ReadLine();
    var cmdline = "exiv2 -g Exif.Photo.DateTimeOriginal -Pv \"" + line + "\"";
    WScript.Echo(line);
    var timestring = GetProcessOutput(cmdline);
    cmdline = "exiv2 -M\"set Exif.Image.DateTime " + timestring + "\" \"" + line + "\"";
    GetProcessOutput(cmdline)
    cmdline = "exiv2 -M\"set Exif.Photo.DateTimeDigitized " + timestring + "\" \"" + line + "\"";
    GetProcessOutput(cmdline)
}
 
stream.Close();

