/**
 * global variables
 */
var rowCtr = 256; // row counter/pointer
var acReg; // accumulator register value
var pc = rowCtr; // program counter register
var eFlag = 0; // carry flag
var labelsJson; // json for the labels
var step = false; // bin val for run program or just one step
var lastIndex; // hold the last address that execute
var memoryJson; // json for all the memory
var haltIndex; // address of HLT instruction
var endFlag; // the address of the the END "instruction"
const title = $("#cmd-container").children()[0];
const TRASH = `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-trash-x-filled rmRow" width="17" height="17" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><title>Remove row</title><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M20 6a1 1 0 0 1 .117 1.993l-.117 .007h-.081l-.919 11a3 3 0 0 1 -2.824 2.995l-.176 .005h-8c-1.598 0 -2.904 -1.249 -2.992 -2.75l-.005 -.167l-.923 -11.083h-.08a1 1 0 0 1 -.117 -1.993l.117 -.007h16zm-9.489 5.14a1 1 0 0 0 -1.218 1.567l1.292 1.293l-1.292 1.293l-.083 .094a1 1 0 0 0 1.497 1.32l1.293 -1.292l1.293 1.292l.094 .083a1 1 0 0 0 1.32 -1.497l-1.292 -1.293l1.292 -1.293l.083 -.094a1 1 0 0 0 -1.497 -1.32l-1.293 1.292l-1.293 -1.292l-.094 -.083z" stroke-width="0" fill="currentColor" /><path d="M14 2a2 2 0 0 1 2 2a1 1 0 0 1 -1.993 .117l-.007 -.117h-4l-.007 .117a1 1 0 0 1 -1.993 -.117a2 2 0 0 1 1.85 -1.995l.15 -.005h4z" stroke-width="0" fill="currentColor" /></svg>`;
const FORWARD_ARROW = `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-arrow-forward addRow" width="17" height="17" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><title>Add row below</title><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M15 11l4 4l-4 4m4 -4h-11a4 4 0 0 1 0 -8h1" /></svg>`;
const instructionsWithLabel = ['ADD', 'AND', 'LDA' , 'STA', 'BUN', 'BSA', 'ISZ'];
const instructionsWithoutLabel = ['STA', 'BUN', 'BSA', 'CLA', 'CLE', 'CMA',
    'CME', 'CIR', 'CIL', 'INC', 'SPA', 'SNA', 'SZA', 'SZE', 'HLT',
    'INP', 'OUT', 'SKI', 'SKO', 'ION', 'IOF', 'HEX', 'DEC'];

// default values and listeners
$(document).ready(initialValuesAndListeners("1"));

function initialValuesAndListenersOverload() {
    let progNum = $("#select-program")[0].value;
    initialValuesAndListeners(progNum);
}

function initialValuesAndListeners(progNum) {
    $("#org-value")[0].innerHTML = "100"; //dec2hex(rowCtr).slice(1, 4);
    $("#pc")[0].innerHTML = $("#org-value")[0].innerHTML;
    $("#ac-value")[0].value = "0000";
    $("#E-value")[0].value = "0";
    $("#output-register")[0].value = "00";
    $("#input-register")[0].value = "00";
    //$("input").change((e) => listenToInputs(e));
    initialProgram(progNum);
}

function initialProgram(progNum) {
    switch (progNum) {
        case "1":
            prog1();
            break;
        case "2":
            prog2();
            break;
        case "3":
            prog3();
            break;
        case "4":
            prog4();
            break;
        case "5":
            prog5();
            break;
        default:
            prog1();
            break;
    }
    convertToMachineLang();
    createMemoryJson();
    fetchCmd2Memory();
    restartInputsListener()
    restartAddAndRemoveListeners();
    $("#row100")[0].getElementsByClassName("address")[0].setAttribute("style", "background-color:yellow")
}


//test

/* listener on the value of the ORG 
*  by change ORG all the addresses will change 
*/
function listenToOrg(e) {
    let pattern = new RegExp(/^[0-9a-fA-F]{1,3}$/);
    if (!pattern.test(e.target.value) || e.target.value.length > 3) {
        console("ORG value get 3 hexadecimal chars");
        return;
    }
    pc = hex2dec($("#org-value")[0].innerHTML); // sync pc to the org
    let rows = Array.from($(".count-address"));
    let rowNumber = hex2dec(e.target.value);
    let newAddress;
    rows.forEach(r => {
        newAddress = dec2hex(rowNumber).toUpperCase();
        newAddress = newAddress.slice(1, 4);
        r.innerHTML = newAddress;
        rowNumber++;
    });
    rowCtr = rowNumber;
    $("#pc")[0].innerHTML = dec2hex(pc).slice(1, 4);
}

/* triggered by "add row" btn
*  create row div, add the to the inner html the inner divs and then
*  append it the cmd-container
*/
function addCmdRow() {
    let newRow = document.createElement("div");
    //let address = getLastAddress();
    newRow.setAttribute("id", `row${rowCtr.toString(16).toUpperCase()}`);
    newRow.setAttribute("class", "general-row cmd-row");
    // convert the rowCtr to string by argument base
    newRow.innerHTML = `
            <div class="address count-address">${rowCtr.toString(16).toUpperCase()}</div>
            <div class="label">${FORWARD_ARROW}<input class="label-cmd-input label-to-collect" maxlength="4""></div>
            <div class="instruction"><input class="instruction-cmd-input" maxlength="3"></div>
            <div class="value"><input class="value-input" maxlength="5"></div>
            ${TRASH}
            <div class="machine-lang"></div>
            `;
    rowCtr++;
    $("#cmd-container")[0].appendChild(newRow);
    restartAddAndRemoveListeners();
}

function getLastAddress() {
    let rows = Array.from($(".count-address"));
    let lastRow = 0;
    rows.forEach((row) => {
        if (lastRow < row.value)
            lastRow = row.value;
    });
    return lastRow;
}

/**
 * its the first pass
 * all the labels saved with their addresses in json as key and value
 */
function collectLabels() {
    let rows = Array.from($(".label-to-collect"));
    let labels = '';
    rows.forEach(r => {
        r.value != "" ? labels += `"${r.value}":["${r.parentElement.parentElement.getElementsByClassName("count-address")[0].innerHTML}"],` :  [null]; //key (label) value (address)
    });
    labels = labels.slice(0, labels.length - 1);
    labels = "{" + labels + "}";
    labelsJson = JSON.parse(labels);
}

function labelsValidation() {

}

/*check inputs
* 1. check that the used label exist
* 2. check that the instruction allowed
* */
function checkInputs() {
    let rows = Array.from($(".cmd-row"));
    collectLabels();
    rows.forEach(r => {
        let instruction = r.getElementsByClassName("instruction-cmd-input")[0].value;
        //let I = instruction.split(" ")[1]; //indirect- true/false
        instruction = instruction.split(" ")[0];
        let val = r.getElementsByClassName("value-input")[0].value;
        // if the instruction use label check its exist
        if (instructionsWithLabel.includes(instruction)) {
            if (labelsJson[val] == undefined) {
                console(`The label ${val} isn't exist`);
                return;
            }
            // if true the instruction isnt legal
        } else if (!instructionsWithoutLabel.includes(instruction)) {
            console(`"${instruction}" isn't legal instruction`);
            return;
        }
    });
    return true;
}

/**
*  get address
*  return the binary value of this address
*/
function getValueByAddress(address) {
    if (!address) {
        console("The label couldn't convert to address");
        return;
    }
    let row = $(`#row${address}`)[0];
    let base = row.getElementsByClassName("instruction-cmd-input")[0].value; //HEX || DEC
    let val = row.getElementsByClassName("value-input")[0].value; //original value
    if (val < 0) return complement(val);
    switch (base) {
        case "HEX":
            val = hex2bin(val);
            break;
        case "DEC":
            val = dec2bin(val);
            break;
        case "BIN":
            val = padding(val, 16);
            break;
        default: // it's probably just for BSA

            //console("The indirect instruction should be HEX or DEC");
            return;
    }
    return val;
}

/* listen to the inputs
1. padding to hex
2. convert values to upper case
3. dynamic change of the machine language
 */

function listenToInputs(e) {
    let elem = e.target; 
    if (elem.id == "org-value") return;
    elem.value = elem.value.toUpperCase();
    let val = elem.value; //inputs value
    fetchCmd2Memory();
    convertToMachineLang();
    try {
        let address = elem.parentElement.parentElement.getElementsByClassName("count-address")[0].innerHTML;
        let instruction = $(`#row${address}`)[0].getElementsByClassName("count-address")[0].innerHTML;
        let inputType = elem.className; //inputs type
        if (inputType.includes("value-input") && instruction == ('HEX' || 'DEC')) {
            elem.value.length > 3 ? console(`The value at row ${address} is too long`) : null;
            elem.value = padding(val, 3);
        }
    }
    catch (error) {
        return;
    }
    restartInputsListener();
}




