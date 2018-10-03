eval(new ActiveXObject("Scripting.FileSystemObject").OpenTextFile(new ActiveXObject("Scripting.FileSystemObject").GetParentFolderName(WScript.ScriptFullName) + "\\tools.js", 1).ReadAll());

var file_with_files = WScript.Arguments(0);
var fso = new ActiveXObject('Scripting.FileSystemObject');
stream=fso.OpenTextFile(file_with_files, 1, false);
while(!stream.AtEndOfStream) 
{
    var line=stream.ReadLine();
    var cmdline1 = "exiv2 -g Exif.Photo.DateTimeOriginal -Pv \"" + line + "\""
    var cmdline2 = "exiv2 -g Exif.Image.DateTime -Pv \"" + line + "\""
    var output1 = GetProcessOutput(cmdline1);
    var output2 = GetProcessOutput(cmdline2);
    WScript.Echo(pad(basename(line), 30) + "->" + output1 + "(" + output2 + ")");
}
 
stream.Close();

