/**
 * This file include thebackend base converts and 
 * the users option to convert between bases (the switch case function)
 * The argument gets as string and converts to number and then back to string
 *  
 */

/* binary to decimal convert
    get string
    return string
    */
function bin2dec(arg) {
    arg = "0b" + arg;
    arg = Number(arg);
    arg = arg.toString(10);
    return arg.toUpperCase();
}

/* binary to hexadecimal convert
get string
return string
*/
function bin2hex(arg) {
    arg = "0b" + arg;
    arg = Number(arg);
    arg = arg.toString(16);
    return padding(arg.toUpperCase(), 4);
}

/* decimal to binary convert
get string
return string
*/
function dec2bin(arg) {
    arg = Number(arg);
    arg = arg.toString(2);
    return padding(arg.toUpperCase(), 16);
}

/* decimal to hexadecimal convert
get string
return string
*/
function dec2hex(arg) {
    arg = Number(arg);
    arg = arg.toString(16);
    return padding(arg.toUpperCase(), 4);
}

/* hexadecimal to decimal
get string
return string
*/
function hex2dec(arg) {
    arg = "0x" + arg;
    arg = Number(arg);
    arg = arg.toString(10);
    return arg.toUpperCase();
}

/* hexadecimal to binary
get string
return string
*/
function hex2bin(arg) {
    arg = "0x" + arg;
    arg = Number(arg);
    arg = arg.toString(2);
    return padding(arg.toUpperCase(), 16);
}


/**
 * the function gets negetive decimal value and return 
 * the binary compliment for sub (padding 16)
 */
function compliment(arg) {
    arg = Math.abs(arg);
    arg = arg - 1;
    let binAC = dec2bin(arg);
    arg = "";
    binAC = binAC.split("");
    binAC.forEach(bit => {
        bit = Number(!Number(bit)); // compliment every bit
        arg += bit; // add the compliment bit to the new value of the ac
    });
    return arg;
}


/* use for the user converter 
  take the convert that the user chose
   and return the number in new base 
 */
function convert() {
    let val = $("#number-to-convert")[0].value;
    let from = $("#base-option-from")[0].value.toLowerCase();
    let to = $("#base-option-to")[0].value.toLowerCase();
    funcName = `${from}2${to}`;
    switch (funcName){
        case "bin2hex":
            val = bin2hex(val);
            break;
        case "dec2hex":
            val = dec2hex(val);
            break;
        case "bin2dec":
            val = bin2dec(val);
            break;
        case "hex2dec":
            val = hex2dec(val);
            break;
        case "dec2bin":
            val = dec2bin(val);
            break;
        case "hex2bin":
            val = hex2bin(val);
            break;
        default:
            break;
    }
    $("#number-after-convert")[0].innerHTML = val.toUpperCase();
}