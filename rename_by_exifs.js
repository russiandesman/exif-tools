eval(new ActiveXObject("Scripting.FileSystemObject").OpenTextFile(new ActiveXObject("Scripting.FileSystemObject").GetParentFolderName(WScript.ScriptFullName) + "\\tools.js", 1).ReadAll());

var file_with_files = WScript.Arguments(0);
var fso = new ActiveXObject('Scripting.FileSystemObject');
stream=fso.OpenTextFile(file_with_files, 1, false);
while(!stream.AtEndOfStream) 
{
    var line=stream.ReadLine();
    var cmdline = "exiv2 -t rename \"" + line + "\""
    WScript.Echo(cmdline);
    var output = GetProcessOutput(cmdline);
}
 
stream.Close();
