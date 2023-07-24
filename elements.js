
var rowCtr = 256;
var acReg;
var pc = rowCtr;
var interuptOn = false;
var inputReg;
var outputReg;
var eFlag = 0;
let labelsJson;
var step = false;
var lastIndex;
var memoryJson;



// default values
$("#org-value")[0].value = dec2hex(rowCtr).slice(1, 4);
$("#pc")[0].innerHTML = $("#org-value")[0].value;
$("#ac-value")[0].value = "0000";
$("#E-value")[0].value = "0";
$("#output-register")[0].value = "00";
$("#input-register")[0].value = "00";
$("#org-value").keyup((e) => listenToOrg(e));


//test
for (let i = 0; i < 10; i++) addCmdRow();
setTimeout(() => {
    $("#row100")[0].getElementsByClassName("label-cmd-input")[0].value = '';
    $("#row100")[0].getElementsByClassName("instruction-cmd-input")[0].value = 'INC';
    $("#row100")[0].getElementsByClassName("value-input")[0].value = '';

    $("#row101")[0].getElementsByClassName("label-cmd-input")[0].value = 'A';
    $("#row101")[0].getElementsByClassName("instruction-cmd-input")[0].value = 'SKI';

    $("#row102")[0].getElementsByClassName("instruction-cmd-input")[0].value = 'BUN';
    $("#row102")[0].getElementsByClassName("value-input")[0].value = 'A';
    
    $("#row103")[0].getElementsByClassName("instruction-cmd-input")[0].value = 'INP';

    $("#row104")[0].getElementsByClassName("instruction-cmd-input")[0].value = 'HLT';

    $("#row105")[0].getElementsByClassName("label-cmd-input")[0].value = 'A';
    $("#row105")[0].getElementsByClassName("instruction-cmd-input")[0].value = 'HEX';
    $("#row105")[0].getElementsByClassName("value-input")[0].value = '3';

    $("#row106")[0].getElementsByClassName("label-cmd-input")[0].value = 'B';
    $("#row106")[0].getElementsByClassName("instruction-cmd-input")[0].value = 'HEX';
    $("#row106")[0].getElementsByClassName("value-input")[0].value = 'A';
    convertToMachineLang();
}, 100);

//test

/* listener on the valut of the ORG 
by change all the address will change after the ORG value */
function listenToOrg(e) {
    let pattern = new RegExp(/^[0-9a-fA-F]{1,3}$/);
    if (!pattern.test(e.target.value) || e.target.value.length > 3) {
        console("ORG value get 3 chars, 0-9 and A-F");
        return;
    }
    pc = hex2dec($("#org-value")[0].value);
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
add row to the cmd */
function addCmdRow() {
    let newRow = document.createElement("div");
    newRow.setAttribute("id", `row${rowCtr.toString(16)}`);
    newRow.setAttribute("class", "general-row cmd-row");
    newRow.innerHTML= `
            <div class="address count-address">${rowCtr.toString(16).toUpperCase()}</div>
            <div class="label"><input class="label-cmd-input label-to-collect" maxlength="4"></div>
            <div class="instruction"><input class="instruction-cmd-input" maxlength="3"></div>
            <div class="value"><input class="value-input" maxlength="4"></div>
            <div class="machine-lang"></div>
            `;
    rowCtr++;
    $("#cmd-container")[0].appendChild(newRow);
    //$("#org-value").keyup((e) => listenToOrg(e));
}

async function runStep() {
    step = true;
    await exe();
}
async function run() {
    step = false;
    await exe();
}

/* by press run this function will start
with check the values and then run the program */
async function exe() {
    if (pc == hex2dec($("#org-value")[0].value)) {
        if (lookForHLT()) { //stop running if missing HLT
            console("Missing HLT");
            return;
        }
        collectLabels();
        lastIndex = "@";
    }
    acReg = $("#ac-value")[0].value;
    eFlag = $("#E-value")[0].value;
    $("#org-value").keyup((e) => listenToOrg(e));
    let val;
    let indirectValue;
    let I;
    let cashStep = false;
    let index = dec2hex(pc).slice(1, 4);
    let rowElem = $(`#row${index}`)[0];
    let currentInstruction = rowElem.getElementsByClassName("instruction-cmd-input")[0].value;
    while (currentInstruction != "HLT") {
        val = rowElem.getElementsByClassName("value-input")[0].value;
        I = val.split(" ")[1] == "I" ? true : false; //save true if indirect
        val = val.split(" ")[0]; //value without the 'I'
        indirectValue = val != "" ? getValueByAddress(labelToAddress(val, I)) : null;

        console("");
        switch (currentInstruction) {
        // memory
            case "AND":
                AND(indirectValue);   //arg- bin value at address (I)
                break;
            case "ADD":
                ADD(indirectValue);  //arg- bin value at address (I)
                break;
            case "LDA":
                LDA(indirectValue);  //get value from label to ac
                break;
            case "STA":
                STA(labelToAddress(val, I));  //store value from ac to label
                break;
            case "BUN":
                BUN(labelToAddress(val, I));  //the val will be address
                break;
            case "BSA":
                BSA(labelToAddress(val, I));  //the val will be address
                break;
            case "ISZ":
                ISZ(labelToAddress(val, I)); //?
                break;
        // register
            case "CLA":
                CLA();  //ac
                break;
            case "CLE":
                CLE();  //ac
                break;
            case "CMA":
                CMA();  //ac
                break;
            case "CME":
                CME();  //e flag
                break;
            case "CIR":
                CIR();  //ac
                break;
            case "CIL":
                CIL();  //ac
                break;
            case "INC":
                INC();  //ac
                break;
            case "SPA":
                SPA();  //ac
                break;
            case "SNA":
                SNA();  //ac
                break;
            case "SZA":
                SZA();  //ac
                break;
            case "SZE":
                SZE();
                break;
        // input output
            case "INP":
                INP();
                break;
            case "OUT":
                OUT();
                break;
            case "SKI":
                console("Waiting for input flag")
                if (!step && ($(`#row${index}`)[0].getElementsByClassName("label-cmd-input")[0].value ==
                $(`#row${dec2hex(Number(hex2dec(index))+1).slice(1, )}`)[0].getElementsByClassName("value-input")[0].value) &&
                $(`#row${dec2hex(Number(hex2dec(index))+1).slice(1, )}`)[0].getElementsByClassName("instruction-cmd-input")[0].value == "BUN") {
                        while(await runSKI());
                }
                else SKI();
                break;
            case "SKO":
                console("Waiting for output flag")
                if (!step && ($(`#row${index}`)[0].getElementsByClassName("label-cmd-input")[0].value ==
                        $(`#row${dec2hex(Number(hex2dec(index))+1).slice(1, )}`)[0].getElementsByClassName("value-input")[0].value) &&
                    $(`#row${dec2hex(Number(hex2dec(index))+1).slice(1, )}`)[0].getElementsByClassName("instruction-cmd-input")[0].value == "BUN") {
                    while(await runSKO());
                }
                else SKO();
                break;
            case "ION":
                ION();   //R flag
                break;
            case "IOF":
                IOF();   //R flag
                break;
            default:
                console("Missing row in the flow");
                return;
        }
        lastIndex != "@" ? $(`#row${lastIndex}`)[0].getElementsByClassName("address")[0].style.backgroundColor = "transparent" : null;
        $(`#row${index}`)[0].getElementsByClassName("address")[0].style.backgroundColor = "yellow";
        lastIndex = index;
        index = dec2hex(pc).slice(1, 4);
        rowElem = $(`#row${index}`)[0];
        currentInstruction = currentInstruction == "HLT" ? null : rowElem.getElementsByClassName("instruction-cmd-input")[0].value;
        $("#ac-value")[0].value = acReg;
        $("#E-value")[0].value = eFlag;
        $("#pc")[0].innerHTML = dec2hex(pc).slice(1, 4);
        $("#run-btn")[0].innerHTML = "Keep running";
        cashStep = true;
        if (step && currentInstruction != "HLT") return;
    }
    if (cashStep && step) {
        return;
    }
    $(`#row${index}`)[0].getElementsByClassName("address")[0].style.backgroundColor = "yellow";
    $(`#row${lastIndex}`)[0].getElementsByClassName("address")[0].style.backgroundColor = "transparent";
    currentInstruction == "HLT" ? console("The program finished by HLT") : null;
    pc = hex2dec($("#org-value")[0].value);
    $("#run-btn")[0].innerHTML = "Run the code";
}

/* it's the first pass
all the labels saved with their addresses in json as key and value */
function collectLabels() {
    let rows = Array.from($(".label-to-collect"));
    let labels = '';
    rows.forEach(r => {
        r.value != "" ? labels += `"${r.value}":["${r.parentElement.parentElement.getElementsByClassName("count-address")[0].innerHTML}"],` : null; //key (label) value (address)
    });
    labels = labels.slice(0, labels.length - 1);
    labels = "{" + labels + "}";
    labelsJson = JSON.parse(labels);
}

/*example Json

let text = '{"ck":["a"],"kc":["d"]}';

const obj = JSON.parse(text);

a = obj.kc[0]
 */

// look for HLT in the program
function lookForHLT() {
    let rows = Array.from($(".instruction-cmd-input"));
    rows.forEach(r => {
        if (r.value == "HLT") {
            r.parentElement.parentElement.getElementsByClassName("address")[0].style.backgroundColor = "transparent";
            return true;
        }
    });
    return false;
}

// convert the instructions and value to machine lang
function convertToMachineLang() {
    let rows = Array.from($(".general-row"));
    let machineLang;
    let val;
    let I;
    collectLabels();
    rows.forEach(r => {
        currentInstruction = r.getElementsByClassName("instruction-cmd-input")[0].value;
        val = r.getElementsByClassName("value-input")[0].value;
        val = val.split(" ")[0];
        I = val.split(" ")[1];
        switch (currentInstruction) {
            // memory
            case "AND":
                machineLang = (I ? '8' : '0') + padding(labelToAddress(val, I), 3);
                break;
            case "ADD":
                machineLang = (I ? '9' : '1') + padding(labelToAddress(val, I), 3);
                break;
            case "LDA":
                machineLang = (I ? 'A' : '2') + padding(labelToAddress(val, I), 3);
                break;
            case "STA":
                machineLang = (I ? 'B' : '3') + padding(labelToAddress(val, I), 3);
                break;
            case "BUN":
                machineLang = (I ? 'C' : '4') + padding(labelToAddress(val, I), 3);
                break;
            case "BSA":
                machineLang = (I ? 'D' : '5') + padding(labelToAddress(val, I), 3);
                break;
            case "ISZ":
                machineLang = (I ? 'E' : '6') + padding(labelToAddress(val, I), 3);
                break;
            // register
            case "CLA":
                machineLang = "7800";
                break;
            case "CLE":
                machineLang = "7400";
                break;
            case "CMA":
                machineLang = "7200";
                break;
            case "CME":
                machineLang = "7100";
                break;
            case "CIR":
                machineLang = "7080";
                break;
            case "CIL":
                machineLang = "7040"
                break;
            case "INC":
                machineLang = "7020";
                break;
            case "SPA":
                machineLang = "7010";
                break;
            case "SNA":
                machineLang = "7008";
                break;
            case "SZA":
                machineLang = "7004";
                break;
            case "SZE":
                machineLang = "7002";
                break;
            // input output
            case "INP":
                machineLang = "F800";
                break;
            case "OUT":
                machineLang = "F400";
                break;
            case "SKI":
                machineLang = "F200";
                break;
            case "SKO":
                machineLang = "F100";
                break;
            case "ION":
                machineLang = "F080";
                break;
            case "IOF":
                machineLang = "F040";
                break;
            case "HLT":
                machineLang = "7001";
                break;
            default:
                machineLang = "";
                break;
        }
        r.getElementsByClassName("machine-lang")[0].innerHTML = machineLang;
        if ($(`#show-machine-lang`)[0].innerHTML.includes("Show"))
            r.getElementsByClassName("machine-lang")[0].style.color = "transparent";
    });  
}


/*check inputs
* 1. check that used label exist
* 2. check the instruction is allowed
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

/* get label and direct/indirect
*  return  the labels address
*/
function labelToAddress(lab, I) {
    let address = labelsJson[lab][0];
    if (I) {
        address = bin2hex(getValueByAddress(address));
        while (address.startsWith("0")){
            address = address.slice(1, );
        }
        return labelsJson[address][0];
    }
    return address;
}

/* get address
return the binary value of this address
*/
function getValueByAddress(address) {
    let row = $(`#row${address}`)[0];
    let base = row.getElementsByClassName("instruction-cmd-input")[0].value; //HEX || DEC
    let val = row.getElementsByClassName("value-input")[0].value; //original value
    switch (base) {
        case "HEX":
            val = hex2bin(val);
            break;
        case "DEC":
            val = dec2bin(val);
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
$("input").change((e) => listenToInputs(e));
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

 // show ot hide machine lang by show/hide btn
function showMachineLangToggle() {
    let btn = $(`#show-machine-lang`)[0];
    let rows = Array.from($(".machine-lang"));
    rows.forEach(r => {
        if (btn.innerHTML == "Show machine language") {
            r.style.color = "black";
        }
        else {
            r.style.color = "transparent";
        }
    });
    if (btn.innerHTML == "Show machine language") {
        btn.innerHTML = "Hide machine language";
    } else {
        btn.innerHTML = "Show machine language";
    }
}

// print msg to the user
function console(txt) {
    $("#console")[0].innerHTML = txt;
}





// sketch
var num = 1;
function Dlay() {
    $("#console")[0].innerHTML = num;
    num++;
    if (false) {

    } else {
        setTimeout(Dlay, 500);
    }
}

/* keyword in[""] example a["b"][1]
key= address, values= (1) label (2) instruction (3) value

 */
function createMemoryJson() {
    let memoryString = "";
    let convertedIndex;
    for (let i= 0; i < 4096; i++) {
        convertedIndex = dec2hex(i).slice(1, );
        memoryString += `"${convertedIndex}":["","",""],`;
    }
    memoryString = memoryString.slice(0, memoryString.length - 1);
    memoryString = "{" + memoryString + "}";
    memoryJson = JSON.parse(memoryString)
}

function storeDataInJson(address, label, instruction, value) {
    memoryJson[`${address}`][0] = label;
    memoryJson[`${address}`][1] = instruction;
    memoryJson[`${address}`][2] = value;
}

function showMemory() {
    let convertedIndex;
    for (let i = 0; i < 4096; i++) {
        convertedIndex = dec2hex(i).slice(1, )
        if (memoryJson[`${convertedIndex}`][1] != "") {
            addMemoryRow(convertedIndex);
        }
    }
}

function addMemoryRow(address) {
    let newRow = document.createElement("div");
    newRow.setAttribute("class", "memory-row");
    newRow.setAttribute("style", "display: flex");
    newRow.innerHTML= `
            <div class="memory-address">${address}</div>
            <div class="memory-label">${memoryJson[address][0]}</div>
            <div class="memory-instruction">${memoryJson[address][1]}</div>
            <div class="memory-value">${memoryJson[address][2]}</div>
            `;
    $("#memory-container")[0].appendChild(newRow);
}