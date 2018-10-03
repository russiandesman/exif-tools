function GetProcessOutput(command_line)
{
    var WshShell = new ActiveXObject("WScript.Shell");
    var WshExec = WshShell.Exec(command_line);
    var OutStream = WshExec.StdOut;
    var Str = "";
    while (!OutStream.atEndOfStream)
    {
        Str = Str + OutStream.readAll();
    }
    return Str.replace(/[\r\n]/g, '');
}

function basename(path)
{
    return path.split(/[\\/]/).pop();
}

function pad(str, len)
{
    var pad = Array(len).join(' ')
    return (pad + str).slice(-pad.length)
}

function date_to_exiv2_date_string(d)
{
    var datestring = 
        d.getFullYear() + 
        ":" +
        ("0"+(d.getMonth()+1)).slice(-2) + 
        ":" +
        ("0" + d.getDate()).slice(-2) + 
        " " + 
        ("0" + d.getHours()).slice(-2) + 
        ":" + 
        ("0" + d.getMinutes()).slice(-2) +
        ":" + 
        ("0" + d.getSeconds()).slice(-2);
    
    return datestring;
}

function date_from_ymd_and_hms(ymd, hms)
{
    /* ymd assumed to be YYYY-MM-DD, hms assumed to be HH:MM:SS*/
    /* no error checking */
    var tmp = ymd.split('-');
    if ( tmp.length != 3)
    {
        tmp = ymd.split(':');
    }
    if ( tmp.length != 3)
    {
        return;
    }
    var y = parseInt(tmp[0], 10);
    var m = parseInt(tmp[1], 10) - 1;
    var d = parseInt(tmp[2], 10);
    tmp = hms.split(':');
    var H = parseInt(tmp[0], 10);
    var M = parseInt(tmp[1], 10);
    var S = parseInt(tmp[2], 10);
    if ( tmp.length != 3)
    {
        return;
    }
    return new Date(y, m, d, H, M, S);
}

function date_from_exiv2_date_string(datestring)
{
    var tmp = datestring.split(' ');
    return date_from_ymd_and_hms(tmp[0], tmp[1]);
}

