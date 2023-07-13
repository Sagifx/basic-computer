/**
 * add zeros to complete accumulator to 16 bit
 * @param arg (bin)
 * @returns arg (bin) 16 bit
 */
function padding(arg, paddingTo) {
    while (arg.length < paddingTo) arg = "0" + arg;
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
    arg = dec2bin(arg);
    arg = padding(arg, 16);
    if (deviation(arg)) {
        eFlag = "1";
        arg = arg.slice(1, arg.length + 1);
    }
    acReg = bin2hex(arg);
    pc++;
}

// clear accumulator
function CLA() {
    acReg = "0000";
    pc++;
}

// clear E flag
function CLE() {
    eFlag = "0";
    pc++;
}

// compliment AC
function CMA() {
    let accumulator = "";
    let binAC = hex2bin(acReg);
    binAC = padding(binAC, 16);
    binAC = binAC.split("");
    binAC.forEach(bit => {
        bit = Number(!Number(bit));
        accumulator += bit;
    });
    acReg = bin2hex(accumulator);
    pc++;
}

// compliment E flag
function CME() {
    let e = Number(eFlag);
    eFlag = Number(!e).toString(2);
    pc++;
}

// circulate left accumulator
function CIL() {
    let accumulator = hex2bin(acReg);
    accumulator = padding(accumulator);
    accumulator = accumulator + eFlag;
    eFlag = accumulator.slice(0, 1);
    accumulator = accumulator.slice(1, accumulator.length);
    acReg = bin2hex(accumulator);
    pc++;
}

// circulate right accumulator
function CIR() {
    let accumulator = hex2bin(acReg);
    accumulator = padding(accumulator);
    accumulator = eFlag + accumulator;
    eFlag = accumulator.slice(accumulator.length - 1, accumulator.length);
    accumulator = accumulator.slice(0, accumulator.length - 1);
    acReg = bin2hex(accumulator);
    pc++;
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
    pc++;
}

// and between accumulatort and calue in the memory
function AND(mar) {
    let accumulator = "";
    let acArr = hex2bin(acReg);
    mar = padding(mar, 16);
    acArr = padding(acArr);
    // marArr = mar.split("");
    // acArr = acReg.split("");
    for (let i = 0 ; i < 16 ; i++ ) {
        accumulator += ((mar[i] == "1" && acArr[i] == "1") ? "1" : "0");
    }
    document.getElementById("demo").innerHTML = accumulator;
    pc++;
}

// load to accumulator
function LDA(address) {
    acReg = address;
    pc++;
}

// store accumulator
function STA(address) {
    address = acReg;
    pc++;
}

function BUN(address) {
    pc = address;
}

// the function get address, pc+1 get into the value of the address in the argument
function BSA(address) {
    let addressToBack = pc + 1;
    pc = address;
    let rowElem = $(`#row${pc}`);
    rowElem.getElementsByClassName("value-input")[0].value = addressToBack;
}

function ISZ(address) {
    let mar = document.getElementById(pc).getElementsByClassName("address")[0].value;
    mar++;
    mar == 0 ? pc++ : null;
    pc++;
}

function SPA() {
    let binAC = hex2bin(acReg).split("");
    binAC[0] == 0 ? pc++ : null;
    pc++;
}

function SNA() {
    let binAC = hex2bin(acReg).split("");
    binAC[0] == 1 ? pc++ : null;
    pc++;
}

function SZA() {
    acReg == 0 ? pc++ : null;
    pc++;
}

function SZE() {
    eFlag == 0 ? pc++ : null;
    pc++;
}

function INP() {
    if (interuptOn) {
        let val = document.getElementById("input-register");
        val = val.split("");
        for (let i = 0; i < 8; i++) {
            acReg[i] = val[i];
        }
    }
    pc++;
}

function OUT() {
    if (interuptOn) {;
        for (let i = 0; i < 8; i++) {
            acReg[i] = output(i);
        }
    }
    pc++;
}


function ION() {
    interuptOn = true;
    pc++;
}

function IOF() {
    interuptOn = false;
    pc++;

}

function SKI() {
    if (inputFlag) {
        inputFlag = false;
    }
    pc++;
}

function SKO() {
    if (outputFlag) {
        outputFlag = false;
    }
    pc++;
}

// get label and direct/indirect
function getValue(lab, I) {

}
