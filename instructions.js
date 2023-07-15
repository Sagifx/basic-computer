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
    mar = bin2dec(mar);
    accumulator = accumulator + Number(mar);
    accumulator = String(accumulator);
    accumulator = dec2bin(accumulator);
    if (deviation(accumulator)) {
        eFlag = "1";
        accumulator = accumulator.slice(1, accumulator.length + 1);
    }
    acReg = bin2hex(accumulator);
    pc++;
}

// and between accumulatort and calue in the memory
function AND(mar) {
    let accumulator = "";
    let acArr = hex2bin(acReg);
    mar = padding(mar, 16);
    acArr = padding(acArr);
    for (let i = 0 ; i < 16 ; i++ ) {
        accumulator += ((mar[i] == "1" && acArr[i] == "1") ? "1" : "0");
    }
    acReg = bin2hex(accumulator);
    pc++;
}

// load to accumulator
function LDA(mar) {
    acReg = bin2hex(mar);
    pc++;
}

// store accumulator
function STA(address) {
    $(`#row${address}`)[0].getElementsByClassName("value-input")[0].value = acReg;
    pc++;
}

function BUN(address) {
    pc = address;
}

// the function get address, pc+1 get into the value of the address in the argument
function BSA(address) {
    let backAddress = Number(hex2dec(pc)) + 1;
    backAddress = dec2hex(backAddress);
    $(`#row${address}`)[0].getElementsByClassName("value-input")[0].value = backAddress;
    pc = Number(address) + 1;
}

function ISZ(address) {
    let row = $(`#row${address}`)[0];
    let val = row.getElementsByClassName("value-input")[0].value;
    isHEX = row.getElementsByClassName("instruction-input")[0].value == "HEX";
    isHEX ? val = hex2dec(val) : null;
    val = Number(val) + 1;
    row.getElementsByClassName("value-input")[0].value = isHEX ? dec2hex(val) : val;
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
    $("#interupt-enable").innerHTML = "ON";
    pc++;
}

function IOF() {
    interuptOn = false;
    $("#interupt-enable").innerHTML = "OFF";
    pc++;

}

function SKI() {
    isChecked = $("#input-checkbox")[0].checked;
    if (isChecked) {
        $("#input-checkbox")[0].checked = false;
        pc++;
    }
    pc++;
}

function SKO() {
    isChecked = $("#output-checkbox")[0].checked;
    if (isChecked) {
        $("#output-checkbox")[0].checked = false;
        pc++;
    }
    pc++;
}


