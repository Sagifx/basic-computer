/**
 * global variables
 */
var rowCtr = 256; // row counter/pointer
var acReg; // accumulator register value
var pc = rowCtr; // program counter register
var eFlag = 0; // carry flag
var labelsJson; // json for the labels
var step = false; // bin val for run program or just one step
var lastIndex; // keep the last index value
var memoryJson; // json for all the memory
var lastIndex; // the last index was execute
var haltIndex; // address of HLT instruction
const TRASH = `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-trash-x-filled rmRow" width="17" height="17" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><title>Remove row</title><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M20 6a1 1 0 0 1 .117 1.993l-.117 .007h-.081l-.919 11a3 3 0 0 1 -2.824 2.995l-.176 .005h-8c-1.598 0 -2.904 -1.249 -2.992 -2.75l-.005 -.167l-.923 -11.083h-.08a1 1 0 0 1 -.117 -1.993l.117 -.007h16zm-9.489 5.14a1 1 0 0 0 -1.218 1.567l1.292 1.293l-1.292 1.293l-.083 .094a1 1 0 0 0 1.497 1.32l1.293 -1.292l1.293 1.292l.094 .083a1 1 0 0 0 1.32 -1.497l-1.292 -1.293l1.292 -1.293l.083 -.094a1 1 0 0 0 -1.497 -1.32l-1.293 1.292l-1.293 -1.292l-.094 -.083z" stroke-width="0" fill="currentColor" /><path d="M14 2a2 2 0 0 1 2 2a1 1 0 0 1 -1.993 .117l-.007 -.117h-4l-.007 .117a1 1 0 0 1 -1.993 -.117a2 2 0 0 1 1.85 -1.995l.15 -.005h4z" stroke-width="0" fill="currentColor" /></svg>`;
const FORWARD_ARROW = `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-arrow-forward addRow" width="17" height="17" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><title>Add row below</title><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M15 11l4 4l-4 4m4 -4h-11a4 4 0 0 1 0 -8h1" /></svg>`;

// default values and listeners
$("#org-value")[0].value = dec2hex(rowCtr).slice(1, 4);
$("#pc")[0].innerHTML = $("#org-value")[0].value;
$("#ac-value")[0].value = "0000";
$("#E-value")[0].value = "0";
$("#output-register")[0].value = "00";
$("#input-register")[0].value = "00";
$("#org-value").keyup((e) => listenToOrg(e));
$("input").change((e) => listenToInputs(e));


//test, initial program and values
for (let i = 0; i < 26; i++) addCmdRow();
setTimeout(() => {
    $("#row100")[0].getElementsByClassName("label-cmd-input")[0].value = '';
    $("#row100")[0].getElementsByClassName("instruction-cmd-input")[0].value = 'LDA';
    $("#row100")[0].getElementsByClassName("value-input")[0].value = 'X';
    
    $("#row101")[0].getElementsByClassName("label-cmd-input")[0].value = '';
    $("#row101")[0].getElementsByClassName("instruction-cmd-input")[0].value = 'CMA';
    $("#row101")[0].getElementsByClassName("value-input")[0].value = '';

    $("#row102")[0].getElementsByClassName("label-cmd-input")[0].value = '';
    $("#row102")[0].getElementsByClassName("instruction-cmd-input")[0].value = 'INC';
    $("#row102")[0].getElementsByClassName("value-input")[0].value = '';

    $("#row103")[0].getElementsByClassName("label-cmd-input")[0].value = '';
    $("#row103")[0].getElementsByClassName("instruction-cmd-input")[0].value = 'ADD';
    $("#row103")[0].getElementsByClassName("value-input")[0].value = 'W';

    $("#row104")[0].getElementsByClassName("label-cmd-input")[0].value = '';
    $("#row104")[0].getElementsByClassName("instruction-cmd-input")[0].value = 'STA';
    $("#row104")[0].getElementsByClassName("value-input")[0].value = 'SL';

    $("#row105")[0].getElementsByClassName("label-cmd-input")[0].value = '';
    $("#row105")[0].getElementsByClassName("instruction-cmd-input")[0].value = 'SZE';
    $("#row105")[0].getElementsByClassName("value-input")[0].value = '';

    $("#row106")[0].getElementsByClassName("label-cmd-input")[0].value = '';
    $("#row106")[0].getElementsByClassName("instruction-cmd-input")[0].value = 'BUN';
    $("#row106")[0].getElementsByClassName("value-input")[0].value = 'NXT';

    $("#row107")[0].getElementsByClassName("label-cmd-input")[0].value = '';
    $("#row107")[0].getElementsByClassName("instruction-cmd-input")[0].value = 'CLA';
    $("#row107")[0].getElementsByClassName("value-input")[0].value = '';

    $("#row108")[0].getElementsByClassName("label-cmd-input")[0].value = '';
    $("#row108")[0].getElementsByClassName("instruction-cmd-input")[0].value = 'STA';
    $("#row108")[0].getElementsByClassName("value-input")[0].value = 'BR1';

    $("#row109")[0].getElementsByClassName("label-cmd-input")[0].value = 'NXT';
    $("#row109")[0].getElementsByClassName("instruction-cmd-input")[0].value = 'LDA';
    $("#row109")[0].getElementsByClassName("value-input")[0].value = 'Z';

    $("#row10A")[0].getElementsByClassName("label-cmd-input")[0].value = '';
    $("#row10A")[0].getElementsByClassName("instruction-cmd-input")[0].value = 'CMA';
    $("#row10A")[0].getElementsByClassName("value-input")[0].value = '';

    $("#row10B")[0].getElementsByClassName("label-cmd-input")[0].value = '';
    $("#row10B")[0].getElementsByClassName("instruction-cmd-input")[0].value = 'INC';
    $("#row10B")[0].getElementsByClassName("value-input")[0].value = '';

    $("#row10C")[0].getElementsByClassName("label-cmd-input")[0].value = '';
    $("#row10C")[0].getElementsByClassName("instruction-cmd-input")[0].value = 'ADD';
    $("#row10C")[0].getElementsByClassName("value-input")[0].value = 'Y';

    $("#row10D")[0].getElementsByClassName("label-cmd-input")[0].value = '';
    $("#row10D")[0].getElementsByClassName("instruction-cmd-input")[0].value = 'ADD';
    $("#row10D")[0].getElementsByClassName("value-input")[0].value = 'BR1';
    
    $("#row10E")[0].getElementsByClassName("label-cmd-input")[0].value = '';
    $("#row10E")[0].getElementsByClassName("instruction-cmd-input")[0].value = 'STA';
    $("#row10E")[0].getElementsByClassName("value-input")[0].value = 'SH';
    
    $("#row10F")[0].getElementsByClassName("label-cmd-input")[0].value = '';
    $("#row10F")[0].getElementsByClassName("instruction-cmd-input")[0].value = 'HLT';
    $("#row10F")[0].getElementsByClassName("value-input")[0].value = '';
    
    $("#row110")[0].getElementsByClassName("label-cmd-input")[0].value = 'W';
    $("#row110")[0].getElementsByClassName("instruction-cmd-input")[0].value = 'DEC';
    $("#row110")[0].getElementsByClassName("value-input")[0].value = '2354';
    
    $("#row111")[0].getElementsByClassName("label-cmd-input")[0].value = 'X';
    $("#row111")[0].getElementsByClassName("instruction-cmd-input")[0].value = 'DEC';
    $("#row111")[0].getElementsByClassName("value-input")[0].value = '7645';

    $("#row112")[0].getElementsByClassName("label-cmd-input")[0].value = 'Y';
    $("#row112")[0].getElementsByClassName("instruction-cmd-input")[0].value = 'DEC';
    $("#row112")[0].getElementsByClassName("value-input")[0].value = '2377';

    $("#row113")[0].getElementsByClassName("label-cmd-input")[0].value = 'Z';
    $("#row113")[0].getElementsByClassName("instruction-cmd-input")[0].value = 'DEC';
    $("#row113")[0].getElementsByClassName("value-input")[0].value = '8456';

    $("#row114")[0].getElementsByClassName("label-cmd-input")[0].value = 'SL';
    $("#row114")[0].getElementsByClassName("instruction-cmd-input")[0].value = 'DEC';
    $("#row114")[0].getElementsByClassName("value-input")[0].value = '0000';
    
    $("#row115")[0].getElementsByClassName("label-cmd-input")[0].value = 'SH';
    $("#row115")[0].getElementsByClassName("instruction-cmd-input")[0].value = 'DEC';
    $("#row115")[0].getElementsByClassName("value-input")[0].value = '0000';
    
    $("#row116")[0].getElementsByClassName("label-cmd-input")[0].value = 'BR1';
    $("#row116")[0].getElementsByClassName("instruction-cmd-input")[0].value = 'HEX';
    $("#row116")[0].getElementsByClassName("value-input")[0].value = 'FFFF';
    
    $("#row117")[0].getElementsByClassName("label-cmd-input")[0].value = '';
    $("#row117")[0].getElementsByClassName("instruction-cmd-input")[0].value = 'HLT';
    $("#row117")[0].getElementsByClassName("value-input")[0].value = '';
    
    $("#row118")[0].getElementsByClassName("label-cmd-input")[0].value = '';
    $("#row118")[0].getElementsByClassName("instruction-cmd-input")[0].value = 'END';
    $("#row118")[0].getElementsByClassName("value-input")[0].value = '';

    convertToMachineLang();
    createMemoryJson();
    fetchCmd2Memory();
}, 100);

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
    pc = hex2dec($("#org-value")[0].value); // sync pc to the org
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
    newRow.setAttribute("id", `row${rowCtr.toString(16).toUpperCase()}`);
    newRow.setAttribute("class", "general-row cmd-row");
    // convert the rowCtr to string by argument base
    newRow.innerHTML = `
            <div class="address count-address">${rowCtr.toString(16).toUpperCase()}</div>
            <div class="label">${FORWARD_ARROW}<input class="label-cmd-input label-to-collect" maxlength="4""></div>
            <div class="instruction"><input class="instruction-cmd-input" maxlength="3"></div>
            <div class="value"><input class="value-input" maxlength="4"></div>
            ${TRASH}
            <div class="machine-lang"></div>
            `;
    rowCtr++;
    $("#cmd-container")[0].appendChild(newRow);
    $(".rmRow").off();
    $(".rmRow").on("click", (evt) => {
        $(".rmRow").off();
        removeRow(evt);
    });
    $(".addRow").off();
    $(".addRow").on("click", (evt) => {
        $(".addRow").off();
        addMiddleRow(evt);
    });
}

/* it's the first pass
all the labels saved with their addresses in json as key and value */
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
        if (instruction == ('ADD' || 'AND' || 'LDA' || 'STA' || 'BUN' || 'BSA' || 'ISZ')) {
            if (typeof labelsJson[val][0] == null) {
                console(`The label ${val} isn't exist`);
                return;
            }
        } else if (instruction != ('STA' || 'BUN' || 'BSA' || 'CLA' || 'CLE' || 'CMA' ||
            'CME' || 'CIR' || 'CIL' || 'INC' || 'SPA' || 'SNA' || 'SZA' || 'SZE' || 'HLT' ||
            'INP' || 'OUT' || 'SKI' || 'SKO' || 'ION' || 'IOF' || 'HEX' || 'DEC')) {
            console(`${val} isn't allowed instruction`);
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
    if (elem.id =="org-value") return;
    elem.value = elem.value.toUpperCase();
    let val = elem.value; //inputs value
    try {
        let address = elem.parentElement.parentElement.getElementsByClassName("count-address")[0].innerHTML;
        let instruction = $(`#row${address}`)[0].getElementsByClassName("count-address")[0].innerHTML;
        let inputType = elem.className; //inputs type
        if (inputType.includes("value-input") && instruction == ('HEX' || 'DEC')) {
            elem.value.length > 3 ? console(`The value at row ${address} is too long`) : null;
            elem.value = padding(val, 3);
        }
        convertToMachineLang();
    }
    catch (error) {
        return;
    }
 }




