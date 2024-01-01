/**
 * global variables
 */
var rowCtr = 256; // row counter/pointer
var acReg; // accumulator register value
var pc = rowCtr; // program counter register
var eFlag = 0; // carry flag
let labelsJson; // json for all the labels
var step = false; // bin val for run program or just one step
var lastIndex; // keep the last index value
var memoryJson; // json for all the memory
var lastIndex; // the last index was execute
var haltIndex; // address of HLT instruction



// default values
$("#org-value")[0].value = dec2hex(rowCtr).slice(1, 4);
$("#pc")[0].innerHTML = $("#org-value")[0].value;
$("#ac-value")[0].value = "0000";
$("#E-value")[0].value = "0";
$("#output-register")[0].value = "00";
$("#input-register")[0].value = "00";
$("#org-value").keyup((e) => listenToOrg(e));


//test, initial program and values
for (let i = 0; i < 26; i++) addCmdRow();
setTimeout(() => {
    $("#row100")[0].getElementsByClassName("label-cmd-input")[0].value = '';
    $("#row100")[0].getElementsByClassName("instruction-cmd-input")[0].value = 'BSA';
    $("#row100")[0].getElementsByClassName("value-input")[0].value = 'INV';
    
    $("#row101")[0].getElementsByClassName("label-cmd-input")[0].value = '';
    $("#row101")[0].getElementsByClassName("instruction-cmd-input")[0].value = 'HEX';
    $("#row101")[0].getElementsByClassName("value-input")[0].value = '200';

    $("#row102")[0].getElementsByClassName("label-cmd-input")[0].value = '';
    $("#row102")[0].getElementsByClassName("instruction-cmd-input")[0].value = 'HEX';
    $("#row102")[0].getElementsByClassName("value-input")[0].value = '10';

    $("#row103")[0].getElementsByClassName("label-cmd-input")[0].value = '';
    $("#row103")[0].getElementsByClassName("instruction-cmd-input")[0].value = 'HLT';
    $("#row103")[0].getElementsByClassName("value-input")[0].value = '';

    $("#row104")[0].getElementsByClassName("label-cmd-input")[0].value = 'INV';
    $("#row104")[0].getElementsByClassName("instruction-cmd-input")[0].value = 'DEC';
    $("#row104")[0].getElementsByClassName("value-input")[0].value = '0';

    $("#row105")[0].getElementsByClassName("label-cmd-input")[0].value = '';
    $("#row105")[0].getElementsByClassName("instruction-cmd-input")[0].value = 'LDA';
    $("#row105")[0].getElementsByClassName("value-input")[0].value = 'INV I';

    $("#row106")[0].getElementsByClassName("label-cmd-input")[0].value = '';
    $("#row106")[0].getElementsByClassName("instruction-cmd-input")[0].value = 'STA';
    $("#row106")[0].getElementsByClassName("value-input")[0].value = 'STR';

    $("#row107")[0].getElementsByClassName("label-cmd-input")[0].value = '';
    $("#row107")[0].getElementsByClassName("instruction-cmd-input")[0].value = 'ISZ';
    $("#row107")[0].getElementsByClassName("value-input")[0].value = 'INV';

    $("#row108")[0].getElementsByClassName("label-cmd-input")[0].value = '';
    $("#row108")[0].getElementsByClassName("instruction-cmd-input")[0].value = 'LDA';
    $("#row108")[0].getElementsByClassName("value-input")[0].value = 'INV I';

    $("#row109")[0].getElementsByClassName("label-cmd-input")[0].value = '';
    $("#row109")[0].getElementsByClassName("instruction-cmd-input")[0].value = 'DEC';
    $("#row109")[0].getElementsByClassName("value-input")[0].value = '0';

    $("#row10A")[0].getElementsByClassName("label-cmd-input")[0].value = '';
    $("#row10A")[0].getElementsByClassName("instruction-cmd-input")[0].value = 'DEC';
    $("#row10A")[0].getElementsByClassName("value-input")[0].value = '0';

    $("#row10B")[0].getElementsByClassName("label-cmd-input")[0].value = '';
    $("#row10B")[0].getElementsByClassName("instruction-cmd-input")[0].value = 'DEC';
    $("#row10B")[0].getElementsByClassName("value-input")[0].value = '0';

    $("#row10C")[0].getElementsByClassName("label-cmd-input")[0].value = '';
    $("#row10C")[0].getElementsByClassName("instruction-cmd-input")[0].value = 'STA';
    $("#row10C")[0].getElementsByClassName("value-input")[0].value = 'CTR';

    $("#row10D")[0].getElementsByClassName("label-cmd-input")[0].value = 'CMP';
    $("#row10D")[0].getElementsByClassName("instruction-cmd-input")[0].value = 'LDA';
    $("#row10D")[0].getElementsByClassName("value-input")[0].value = 'STR I';
    
    $("#row10E")[0].getElementsByClassName("label-cmd-input")[0].value = '';
    $("#row10E")[0].getElementsByClassName("instruction-cmd-input")[0].value = 'CMA';
    $("#row10E")[0].getElementsByClassName("value-input")[0].value = '';
    
    $("#row10F")[0].getElementsByClassName("label-cmd-input")[0].value = '';
    $("#row10F")[0].getElementsByClassName("instruction-cmd-input")[0].value = 'INC';
    $("#row10F")[0].getElementsByClassName("value-input")[0].value = '';
    
    $("#row110")[0].getElementsByClassName("label-cmd-input")[0].value = '';
    $("#row110")[0].getElementsByClassName("instruction-cmd-input")[0].value = 'STA';
    $("#row110")[0].getElementsByClassName("value-input")[0].value = 'STR I';
    
    $("#row111")[0].getElementsByClassName("label-cmd-input")[0].value = '';
    $("#row111")[0].getElementsByClassName("instruction-cmd-input")[0].value = 'ISZ';
    $("#row111")[0].getElementsByClassName("value-input")[0].value = 'STR';

    $("#row112")[0].getElementsByClassName("label-cmd-input")[0].value = '';
    $("#row112")[0].getElementsByClassName("instruction-cmd-input")[0].value = 'ISZ';
    $("#row112")[0].getElementsByClassName("value-input")[0].value = 'CTR';

    $("#row113")[0].getElementsByClassName("label-cmd-input")[0].value = '';
    $("#row113")[0].getElementsByClassName("instruction-cmd-input")[0].value = 'BUN';
    $("#row113")[0].getElementsByClassName("value-input")[0].value = 'CMP';

    $("#row114")[0].getElementsByClassName("label-cmd-input")[0].value = '';
    $("#row114")[0].getElementsByClassName("instruction-cmd-input")[0].value = 'BUN';
    $("#row114")[0].getElementsByClassName("value-input")[0].value = 'INV I';
    
    $("#row115")[0].getElementsByClassName("label-cmd-input")[0].value = 'STR';
    $("#row115")[0].getElementsByClassName("instruction-cmd-input")[0].value = 'DEC';
    $("#row115")[0].getElementsByClassName("value-input")[0].value = '0';
    
    $("#row116")[0].getElementsByClassName("label-cmd-input")[0].value = 'CTR';
    $("#row116")[0].getElementsByClassName("instruction-cmd-input")[0].value = 'DEC';
    $("#row116")[0].getElementsByClassName("value-input")[0].value = '0';
    
    $("#row117")[0].getElementsByClassName("label-cmd-input")[0].value = '';
    $("#row117")[0].getElementsByClassName("instruction-cmd-input")[0].value = 'END';
    $("#row117")[0].getElementsByClassName("value-input")[0].value = '';

    convertToMachineLang();
    createMemoryJson();
    fetchMemory();
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
            <div class="label"><input class="label-cmd-input label-to-collect" maxlength="4"></div>
            <div class="instruction"><input class="instruction-cmd-input" maxlength="3"></div>
            <div class="value"><input class="value-input" maxlength="4"></div>
            <div class="machine-lang"></div>
            `;
    rowCtr++;
    $("#cmd-container")[0].appendChild(newRow);
    //$("#org-value").keyup((e) => listenToOrg(e));
}

/**
 * triggered by 'run the code' btn
 * run all the program
 */
async function runStep() {
    step = true;
    await exe();
}

/**
 * triggered by 'step by step' btn
 * run one line at the program
 */
async function run() {
    step = false;
    await exe();
}

/* by press 'run' this function will start
with check the values and then run the program */
/*async function exe2() {
    if (pc == hex2dec($("#org-value")[0].value)) { // if true its the first run
        if (lookForHLTandEND()) { // stop running if missing HLT ot END
            console("Missing HLT or END");
            return;
        }
        collectLabels(); // creat Json of labels (as key) and addresses (as values)
        fetchMemory(); // fetch the cmd data to the memoryJson
        lastIndex = "@";
    }
    acReg = $("#ac-value")[0].value; //acReg value
    eFlag = $("#E-value")[0].value; //carry flag value
    $("#org-value").keyup((e) => listenToOrg(e)); //change the adresses by changing the org
    let val; //hold the input value without the I
    let indirectValue; //hold the indirect value if exists
    let I;
    let cashStep = false;
    let index = dec2hex(pc).slice(1, 4);
    let rowElem = $(`#row${index}`)[0];
    let currentInstruction = rowElem.getElementsByClassName("instruction-cmd-input")[0].value;
    while (currentInstruction != "HLT") {
        if (currentInstruction == ("DEC" || "HEX" || "BIN")) {
            pc++;
        }
        else {
            val = rowElem.getElementsByClassName("value-input")[0].value;
            I = val.split(" ")[1] == "I" ? true : false; //save true if indirect
            val = val.split(" ")[0]; //value without the 'I'
            indirectValue = val != "" ? getValueByAddress(labelToAddress(val, I)) : null;
            
            console("");
            switch (currentInstruction) {
                // memory instruction
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
                // register instruction
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
                // input/output intructions
                case "INP":
                    INP();
                    break;
                case "OUT":
                    OUT();
                    break;
                case "SKI":
                    console("Waiting for input flag")
                    if (!step && ($(`#row${index}`)[0].getElementsByClassName("label-cmd-input")[0].value ==
                        $(`#row${dec2hex(Number(hex2dec(index)) + 1).slice(1,)}`)[0].getElementsByClassName("value-input")[0].value) &&
                        $(`#row${dec2hex(Number(hex2dec(index)) + 1).slice(1,)}`)[0].getElementsByClassName("instruction-cmd-input")[0].value == "BUN") {
                        while (await runSKI());
                    }
                    else SKI();
                    break;
                case "SKO":
                    console("Waiting for output flag")
                    if (!step && ($(`#row${index}`)[0].getElementsByClassName("label-cmd-input")[0].value ==
                        $(`#row${dec2hex(Number(hex2dec(index)) + 1).slice(1,)}`)[0].getElementsByClassName("value-input")[0].value) &&
                        $(`#row${dec2hex(Number(hex2dec(index)) + 1).slice(1,)}`)[0].getElementsByClassName("instruction-cmd-input")[0].value == "BUN") {
                        while (await runSKO());
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
        }
        lastIndex != "@" ? $(`#row${lastIndex}`)[0].getElementsByClassName("address")[0].style.backgroundColor = "transparent" : null;
        $(`#row${index}`)[0].getElementsByClassName("address")[0].style.backgroundColor = "yellow";
        lastIndex = index;
        index = dec2hex(pc).slice(1, 4); //get the new index after change the pc
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
        fetchMemory();
        return;
    }
    $(`#row${index}`)[0].getElementsByClassName("address")[0].style.backgroundColor = "yellow";
    $(`#row${lastIndex}`)[0].getElementsByClassName("address")[0].style.backgroundColor = "transparent";
    currentInstruction == "HLT" ? console("The program finished by HLT") : null;
    pc = hex2dec($("#org-value")[0].value);
    $("#run-btn")[0].innerHTML = "Run the code";
}
*/

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

/*example to Json pattern

let text = '{"ck":["a"],"kc":["d"]}';

const obj = JSON.parse(text);

a = obj.kc[0]
 */

/** 
 * look for HLT in the program
 * without halt the program shouldnt run and the error message will appear in the console
 */ 
function lookForHLTandEND() {
    let rows = Array.from($(".instruction-cmd-input"));
    let findHLT = false;
    let findEND = false;
    rows.forEach(r => {
        if (r.value == "HLT") {
            r.parentElement.parentElement.getElementsByClassName("address")[0].style.backgroundColor = "transparent";
            findHLT = true;
        }
        if (r.value == "END") {
            r.parentElement.parentElement.getElementsByClassName("address")[0].style.backgroundColor = "transparent";
            findEND = true;
        }
    });
    if (findEND && findHLT) return true;
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
        if (currentInstruction === ("DEC" || "BIN" || "HEX")) {
            /**
             * for value in memory the value need to convert to hex
             * if the value is negetive it should: 1. convert to dec
             *                                     2. 2's complement (back as bin)
             *                                     3. convert to hex
             */
            switch (currentInstruction) {
                case "BIN":
                    machineLang = (val < 0) ? bin2hex(complement(bin2dec(val))) : bin2hex(val); 
                    break;
                case "DEC":
                    machineLang = (val < 0) ? bin2hex(complement(val)) : dec2hex(val);
                    break;
                case "HEX":
                    machineLang = (val < 0) ? bin2hex(complement(hex2dec(val))) : val;
                    break;
            }
        }
        else {
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
        }
        r.getElementsByClassName("machine-lang")[0].innerHTML = machineLang;
        if ($(`#show-machine-lang`)[0].innerHTML.includes("Show"))
            r.getElementsByClassName("machine-lang")[0].style.color = "transparent";
    });  
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
*  get label and direct/indirect
*  returns the label's address
*/
function labelToAddress(lab, I) {
    let address = labelsJson[lab][0];
    if (I) {
        address = bin2hex(getValueByAddress(address));
        while (address.startsWith("0")) {
            address = address.slice(1,);
        }
        return address;
    }
    return address;
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

 // toggle between show and hide machine lang by show/hide btn
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

// print msg to the user
function converterConsole(txt) {
    $("#converterConsole")[0].innerHTML = txt;
}


/** 
* keyword in[""] example a["b"][1]
* key= address, values= (1) label (2) instruction (3) value
* save all the adresses with for loop anf then save the registers value
*/
function createMemoryJson() {
    let memoryString = "";
    let convertedIndex;
    for (let i= 0; i < 4096; i++) {
        convertedIndex = dec2hex(i).slice(1, );
        memoryString += `"${convertedIndex}":["","",""],`;
    }
    //memoryString = memoryString.slice(0, memoryString.length - 1);
    memoryString += `"ac":[""],`;
    memoryString += `"eFlag":[""],`;
    memoryString += `"input":[""],`;
    memoryString += `"output":[""],`;
    memoryString += `"ORG":[""]`;
    memoryString = "{" + memoryString + "}";
    memoryJson = JSON.parse(memoryString); // parse string to Json
}

/**
 * get address and store in the memory Json label instruction and input values
 */
function storeDataInJson(address) {
    r = $(`#row${address}`)[0];
    memoryJson[`${address}`][0] = r.getElementsByClassName("label-to-collect")[0].value;
    memoryJson[`${address}`][1] = r.getElementsByClassName("instruction-cmd-input")[0].value;
    memoryJson[`${address}`][2] = r.getElementsByClassName("value-input")[0].value;
}

/**
 * this function checks every row in the memory
 * and add memory with the row (if data exists for this address)
 */
function showMemory() {
    let convertedIndex;
    let rows = Array.from($(".memory-row"));
    rows.forEach(row => {
        row.innerHTML = "";
    })
    let btn = $("#show-memory-btn")[0];
    if (btn.innerHTML == "Show Memory") {
        for (let i = 0; i < 4096; i++) {
            convertedIndex = dec2hex(i).slice(1, )
            if (memoryJson[convertedIndex][1] != "") {
                addMemoryRow(convertedIndex);
            }
        }
        btn.innerHTML = "Hide Memory";
    } else {
        btn.innerHTML = "Show Memory";
    }
    //$("#memory-container")[0].innerHTML = "";
    
}

/**
 * get address and create div element with all the data
 */
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

/**
 * copy the CMD data to the memory 
 */
function fetchMemory() {
    let cmdRows = Array.from($(".count-address"));
    cmdRows.forEach(r => {
        storeDataInJson(r.innerHTML);
    });
}

/**
 * execute the program
 * looking for HLT and END, restart values and collect label
 * running according to the user choise (run or step by step)
 * and with switch case execute the instructions 
 */
async function exe() {
    if (pc == hex2dec($("#org-value")[0].value) && !lastIndex) { // if true its the first run
        if (!lookForHLTandEND()) { // stop running if missing HLT ot END
            console("Missing HLT or END");
            return;
        }
        lastIndex = "";
        collectLabels(); // creat Json of labels (as key) and addresses (as values)
        fetchMemory(); // fetch the cmd data to the memoryJson
    }
    acReg = $("#ac-value")[0].value; //acReg value
    eFlag = $("#E-value")[0].value; //carry flag value
    //$("#org-value").keyup((e) => listenToOrg(e)); //change the adresses by changing the org
    let val; //hold the input value without the I
    let I;
    let index = dec2hex(pc).slice(1, 4);
    let rowElem = $(`#row${index}`)[0];
    let currentInstruction = rowElem.getElementsByClassName("instruction-cmd-input")[0].value;
    while (currentInstruction != "HLT") {
        val = rowElem.getElementsByClassName("value-input")[0].value;
        I = val.split(" ")[1] == "I" ? true : false; //save true if indirect
        val = val.split(" ")[0]; //value without the 'I'
        console("");
        switch (currentInstruction) {
            // memory instruction
            case "AND":
                AND(getValueByAddress(labelToAddress(val, I)));   //arg- bin value at address (I)
                break;
            case "ADD":
                ADD(getValueByAddress(labelToAddress(val, I)));  //arg- bin value at address (I)
                break;
            case "LDA":
                LDA(getValueByAddress(labelToAddress(val, I)));  //get value from label to ac
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
            // register instruction
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
            // input/output intructions
            case "INP":
                INP();
                break;
            case "OUT":
                OUT();
                break;
            case "SKI":
                console("Waiting for input flag")
                if (!step && ($(`#row${index}`)[0].getElementsByClassName("label-cmd-input")[0].value ==
                    $(`#row${dec2hex(Number(hex2dec(index)) + 1).slice(1,)}`)[0].getElementsByClassName("value-input")[0].value) &&
                    $(`#row${dec2hex(Number(hex2dec(index)) + 1).slice(1,)}`)[0].getElementsByClassName("instruction-cmd-input")[0].value == "BUN") {
                    while (await runSKI());
                }
                else SKI();
                break;
            case "SKO":
                console("Waiting for output flag")
                if (!step && ($(`#row${index}`)[0].getElementsByClassName("label-cmd-input")[0].value ==
                    $(`#row${dec2hex(Number(hex2dec(index)) + 1).slice(1,)}`)[0].getElementsByClassName("value-input")[0].value) &&
                    $(`#row${dec2hex(Number(hex2dec(index)) + 1).slice(1,)}`)[0].getElementsByClassName("instruction-cmd-input")[0].value == "BUN") {
                    while (await runSKO());
                }
                else SKO();
                break;
            case "ION":
                ION();   // R flag
                break;
            case "IOF":
                IOF();   // R flag
                break;
            case "DEC" || "HEX" || "BIN":
                pc++;
                break;
            default:
                console("Missing row in the flow");
                return;
        }
        lastIndex ? $(`#row${lastIndex}`)[0].getElementsByClassName("address")[0].style.backgroundColor = "transparent" : null;
        $(`#row${index}`)[0].getElementsByClassName("address")[0].style.backgroundColor = "yellow";
        lastIndex = index;
        index = dec2hex(pc).slice(1, 4); //get the new index after pc was change 
        rowElem = $(`#row${index}`)[0];
        currentInstruction = rowElem.getElementsByClassName("instruction-cmd-input")[0].value;
        $("#ac-value")[0].value = acReg;
        $("#E-value")[0].value = eFlag;
        $("#pc")[0].innerHTML = dec2hex(pc).slice(1, 4);
        $("#run-btn")[0].innerHTML = "Keep running";
        convertToMachineLang();
        if (step && currentInstruction != "HLT") return;
    }
    $(`#row${index}`)[0].getElementsByClassName("address")[0].style.backgroundColor = "yellow";
    $(`#row${lastIndex}`)[0].getElementsByClassName("address")[0].style.backgroundColor = "transparent";
    currentInstruction == "HLT" ? console("The program finished by HLT") : null;
    pc = hex2dec($("#org-value")[0].value);
    lastIndex = "";
    $("#run-btn")[0].innerHTML = "Run the code";
}
