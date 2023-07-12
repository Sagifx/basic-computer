/**
 * add zeros to complete accumulator to 16 bit
 * @param arg (bin)
 * @returns arg (bin) 16 bit
 */
function padding(arg) {
    while (arg.length < 16) arg = "0" + arg;
    return arg;
}

/*check accumulator deviation
get accumulator future value (16/17 bit) binary base
return true or false
*/
/**
 * get accumulator and check if his value deviation
 * @param arg (bin)
 * @returns boolean
 */
function deviation(arg){
    return ((arg.length == 17 && arg[0] == "1") ? true : false);
}

// increment accumulator
function INC() {
    let arg = parseInt("0x" + (acReg), 16);
    arg++;
    arg = arg.toString(16);
    arg = hex2bin(arg);
    if (deviation(arg)) {
        eFlag = "1";
        arg = arg.slice(1, arg.length + 1);
    }
    acReg = bin2hex(arg);
}

// clear accumulator
function CLA() {
    acReg = "0000";
}

// clear E flag
function CLE() {
    eFlag = "0";
}

// compliment AC
function CMA() {
    let accumulator = "";
    let binAC = hex2bin(acReg);
    binAC = binAC.split("");
    acReg = "";
    binAC.forEach(bit => {
        bit = Number(!Number(bit));
        accumulator += bit;
    });
    acReg = bin2hex(accumulator);
}

// compliment E flag
function CME() {
    let e = Number(eFlag);
    eFlag = Number(!e).toString(2);;
}

// circulate left accumulator
function CIL() {
    let accumulator = hex2bin(acReg);;
    while(accumulator.length !== 16) accumulator = "0" + accumulator;
    accumulator = accumulator + eFlag;
    eFlag = accumulator.slice(0, 1);
    accumulator = accumulator.slice(1, accumulator.length + 1);
    acReg = bin2hex(accumulator);
}

// circulate right accumulator
function CIR() {
    let accumulator = hex2bin(acReg);
    while(accumulator.length !== 16) accumulator = "0" + accumulator;
    accumulator = eFlag + accumulator;
    eFlag = accumulator.slice(15, 16);
    accumulator = accumulator.slice(0, accumulator.length - 1);
    acReg = bin2hex(accumulator);
}

// add between accumulator and value in the memory
function ADD(mar) {
    let arg;
    let accumulator = parseInt("0x" + (acReg), 16);
    mar = parseInt("0x" + mar, 16);
    accumulator += mar;
    arg = hex2bin(accumulator.toString(16));
    if (deviation(arg)) {
        eFlag = "1";
        arg = arg.slice(1, arg.length + 1);
    }
    acReg = bin2hex(arg);
}

// and between accumulatort and calue in the memory
function AND(mar) {
    let accumulator = "";
    let marArr = hex2bin(mar);
    let acArr = hex2bin(acReg);
    marArr = padding(marArr);
    acArr = padding(acArr);
    marArr = mar.split("");
    acArr = acReg.split("");
    for (let i = 0 ; i < 16 ; i++ ) {
        accumulator += ((marArr[i] == "1" && acArr[i] == "1") ? "1" : "0");
    }
    document.getElementById("demo").innerHTML = accumulator;
}


