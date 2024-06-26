/**
 * add zeros to complete accumulator to 16 bit
 * @param arg (bin)
 * @returns padding arg
 */
function padding(arg, paddingTo) {
    if (arg || arg == "")
        while (arg.length < paddingTo) arg = "0" + arg;
    return arg;
}

/**check accumulator deviation
 * get accumulator future value (16/17 bit) binary base
 * @param arg (bin)
 * @returns boolean
 */
function deviation(arg) {
    //return ((arg.length == 17 && arg[0] == "1") ? true : false);
    return arg.length > 16; //true or false
}

// increment accumulator
/**
 * convert to dec and add 1 to the val
 * convert to bin and add padding
 * slice first char if reconize diviation
 * placement binary new val at acReg (global variable)
 */
function INC() {
    let arg = parseInt("0x" + (acReg), 16); // parse string to int from 0x hex
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
    let binAC = hex2bin(acReg); // bin and padding to 16
    //binAC = padding(binAC, 16);
    binAC = binAC.split("");
    binAC.forEach(bit => {
        bit = Number(!Number(bit)); // compliment every bit
        accumulator += bit; // add the compliment bit to the new value of the ac
    });
    acReg = bin2hex(accumulator); // placement the new value at the ac reg
    pc++;
}

// compliment E flag
function CME() {
    let e = Number(eFlag);
    eFlag = Number(!e).toString(2); // place the compliment value at the eFlag
    pc++;
}

// circulate left accumulator
function CIL() {
    let accumulator = hex2bin(acReg);
    accumulator = padding(accumulator);
    accumulator = accumulator + eFlag; // 17 chars string
    eFlag = accumulator.slice(0, 1); // took the first char tot he eFlag (after circulate)
    accumulator = accumulator.slice(1, accumulator.length); // took the rest of the chars tot he ac
    acReg = bin2hex(accumulator); // placement the new ac val into the acReg global var
    pc++;
}

// circulate right accumulator, as same logic as the CIL instruction
function CIR() {
    let accumulator = hex2bin(acReg);
    accumulator = padding(accumulator);
    accumulator = eFlag + accumulator;
    eFlag = accumulator.slice(accumulator.length - 1, accumulator.length);
    accumulator = accumulator.slice(0, accumulator.length - 1);
    acReg = bin2hex(accumulator);
    pc++;
}

/**
 * add between accumulator and value in the memory
 * get the memory value as argument
 */ 
function ADD(mar) {
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

/** 
 * and between accumulator and value in the memory
 * get the memory value 
 */
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

/* load to accumulator
   get memory value */
function LDA(mar) {
    acReg = bin2hex(mar);
    pc++;
}

/* store accumulator in the memory
   get the address to store at */
function STAa(address) {
    let base = $(`#row${address}`)[0].getElementsByClassName("instruction-cmd-input")[0].value;
    let val = acReg;
    if (base == "DEC")
        val = hex2dec(acReg);
    else if (base == "BIN")
        val = hex2bin(acReg);
    $(`#row${address}`)[0].getElementsByClassName("value-input")[0].value = val;
    //$(`#row${address}`)[0].getElementsByClassName("label-cmd-input")[0].value = "HEX";
    storeDataInJson(address);
    pc++;
}

function STA(address) {
    let val = acReg;
    address = padding(address, 3);
    hardStoreDataInJson(address, val);
    let firstFlag = hex2dec($("#org-value")[0].innerHTML);
    let lastFlag = hex2dec(document.getElementById("cmd-container").lastChild.getElementsByClassName("count-address")[0].innerHTML); //get the address of the last row
    //$(`#row${address}`)[0].getElementsByClassName("value-input")[0].value = val;
    //fetchCmd2Memory();
    fetchMemory2Cmd(firstFlag, lastFlag);
    pc++;
}

/* branch unconditionally 
get the address */
function BUN(address) {
    pc = hex2dec(address);
}

/* branch and save address
get the address and store there the address to back */
function BSA(address) {
    let backAddress = dec2hex(Number(pc) + 1);
    let subAddress = $(`#row${address}`)[0]; // subrutin address
    if (subAddress.getElementsByClassName("instruction-cmd-input")[0].value == "DEC")
        backAddress = Number(pc) + 1;
    subAddress.getElementsByClassName("value-input")[0].value = backAddress;
    storeDataInJson(address);
    pc = (Number(hex2dec(address)) + 1);
}

/* increment and skip if zero
get address */
function ISZ(address) {
    let row = $(`#row${address}`)[0];
    let val = row.getElementsByClassName("value-input")[0].value;
    let isHEX;
    isHEX = row.getElementsByClassName("instruction-cmd-input")[0].value == "HEX";
    if (isHEX) val = hex2dec(val);
    val = Number(val) + 1;
    if (val == 65536) val = 0;
    row.getElementsByClassName("value-input")[0].value = isHEX ? dec2hex(val) : val;
    storeDataInJson(address);
    if (val == 0) pc++;
    pc++;
}

// skip if accumulator positive (or zero)
function SPA() {
    let binAC = hex2bin(acReg).split("");
    if (binAC[0] == 0) pc++;
    pc++;
}

// skip if accumulator negetive
function SNA() {
    let binAC = hex2bin(acReg).split("");
    if (binAC[0] == 1) pc++;
    pc++;
}
 // skip if accumulators value is 0
function SZA() {
    if (acReg == 0) pc++;
    pc++;
}

// skip if the E flag is 0
function SZE() {
    if (eFlag == 0) pc++;
    pc++;
}

// if the interupt on the input accumulator get the input register value (8 bit)
function INP() {
    //if ($("#interupt-enable")[0].innerHTML == "ON") {
        let val = document.getElementById("input-register").value;
        acReg = acReg.slice(0, 2) + val;
    //} else {
    //    console("Interupt disable");
    //}
    pc++;
}

// if the interupt off the output register get the accumulator value (8 bit)
function OUT() {
    let val = acReg.slice(2,4);
    $("#output-register")[0].innerHTML = val;
    pc++;
}

// interupt on
function ION() {
    $("#interupt-enable")[0].innerHTML = "ON";
    pc++;
}

// interupt off
function IOF() {
    $("#interupt-enable")[0].innerHTML = "OFF";
    pc++;

}

// skip if the input flag on
function SKI() {
    let isChecked = $("#input-checkbox")[0].checked;
    if (isChecked) {
        $("#input-checkbox")[0].checked = false;
        pc++;
    }
    pc++;
}

async function runSKI() {
    if ($("#input-checkbox")[0].checked) {
        $("#input-checkbox")[0].checked = false;
        pc = Number(pc) + 2;
        return false;
    } else {
       await sleep(500);
    }
}

// skip if the output flag on
function SKO() {
    isChecked = $("#output-checkbox")[0].checked;
    if (isChecked) {
        $("#output-checkbox")[0].checked = false;
        pc++;
    }
    pc++;
}

async function runSKO() {
    if ($("#output-checkbox")[0].checked) {
        $("#output-checkbox")[0].checked = false;
        pc += 2;
        return false;
    } else {
        await sleep(500);
    }
}


// solution for waiting for interrupt
function sleep(time) {
    return new Promise((resolve) => setTimeout(resolve, time));
}