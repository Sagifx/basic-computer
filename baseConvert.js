

/* binary to decimal convert
    get string
    return string
    */
function bin2dec(arg) {
    arg = "0b" + arg;
    arg = Number(arg);
    arg = arg.toString(10);
    return arg;
}

/* binary to hexadecimal convert
get string
return string
*/
function bin2hex(arg) {
    arg = "0b" + arg;
    arg = Number(arg);
    arg = arg.toString(16);
    return arg;
}

/* decimal to binary convert
get string
return string
*/
function dec2bin(arg) {
    arg = Number(arg);
    arg = arg.toString(2);
    return arg;
}

/* decimal to hexadecimal convert
get string
return string
*/
function dec2hex(arg) {
    arg = Number(arg);
    arg = arg.toString(16);
    return arg;
}

/* hexadecimal to decimal
get string
return string
*/
function hex2dec(arg) {
    arg = "0x" + arg;
    arg = Number(arg);
    arg = arg.toString(10);
    return arg;
}

/* hexadecimal to binary
get string
return string
*/
function hex2bin(arg) {
    arg = "0x" + arg;
    arg = Number(arg);
    arg = arg.toString(2);
    return arg;
}