
var orgAddress = 256;
document.getElementById("org-value").value = orgAddress.toString(16);
var rowCtr = orgAddress;
var acReg;
var pc = orgAddress;
var interuptOn = false;
var inputReg;
var outputReg;
var inputFlag= false;
var outputFlag= false;
var eFlag = 0;
let labelsJson;

$("#org-value").keyup((e) => listenToOrg(e));
$("#ac-value")[0].value = "0000";
$("#E-value")[0].value = "0";
$("#pc")[0].innerHTML = dec2hex(pc);



//test
for (let i = 0; i < 10; i++) addCmdRow();
setTimeout(() => {
    $("#row100")[0].getElementsByClassName("label-cmd-input")[0].value = 'B';
    $("#row100")[0].getElementsByClassName("instruction-input")[0].value = 'BSA';
    $("#row100")[0].getElementsByClassName("value-input")[0].value = 'A';

    $("#row101")[0].getElementsByClassName("instruction-input")[0].value = 'INC';

    $("#row102")[0].getElementsByClassName("label-cmd-input")[0].value = 'A';
    
    $("#row103")[0].getElementsByClassName("instruction-input")[0].value = 'INC';

    $("#row104")[0].getElementsByClassName("instruction-input")[0].value = 'HLT';

}, 100);

//test

/* listener on the valut of the ORG 
by change all the address will change after the ORG value */
function listenToOrg(e) {
    let rows = Array.from($(".count-address"));
    let rowNumber = hex2dec(e.target.value);
    rows.forEach(r => {
        r.innerHTML = dec2hex(rowNumber);
        rowNumber++;
    });
}

/* triggered by "add row" btn
add row to the cmd */
function addCmdRow() {
    let newRow = `<div id=row${rowCtr.toString(16)} class="cmd-row">
            <div class="address count-address">${rowCtr.toString(16)}</div>
            <div class="label"><input class="label-cmd-input" maxlength="4"></div>
            <div class="instruction"><input class="instruction-input" maxlength="3"></div>
            <div class="value"><input class="value-input" maxlength="4"></div>
            <div class="machine-lang"></div>
        </div>`;
    rowCtr++;
    document.getElementById("cmd-container").innerHTML += newRow;
    document.getElementById("org-value").value = orgAddress.toString(16);
    $("#org-value").keyup((e) => listenToOrg(e));
}



/* by press run this function will start
start with check the values and theb run the program */
function run() {
    // need to add check for the program values
    if (!lookForHLT()) { //stop running if missing HLT
        $("#console")[0].innerHTML = "Missing HLT";
        return;
    }
    collectLabels();
    pc = $("#org-value")[0].value;
    acReg = $("#ac-value")[0].value;
    eFlag = $("#E-value")[0].value;
    $("#org-value").keyup((e) => listenToOrg(e));
    $("#console")[0].innerHTML = "";
    let val;
    let indirectValue;
    let I;
    let rowElem = $(`#row${pc}`)[0];
    let currentInstruction = rowElem.getElementsByClassName("instruction-input")[0].value;
    while (currentInstruction != "HLT") {
        val = rowElem.getElementsByClassName("value-input")[0].value;
        I = val.split(" ")[1] == "I" ? true : false; //save true if indirect
        val = val.split(" ")[0]; //value witout the I
        indirectValue = val != "" ? getValueByAddress(labelToAddress(val, I)) : null;
        
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
                SKI();
                break;
            case "SKO":
                SKO();
                break;
            case "ION":
                ION();   //R flag
                break;
            case "IOF":
                IOF();   //R flag
                break;
            default:
                $("#console")[0].innerHTML = "Missing row in the flow";
                return;
        }
        rowElem = $(`#row${pc}`)[0];
        currentInstruction = rowElem.getElementsByClassName("instruction-input")[0].value;
        $("#ac-value")[0].value = acReg;
        $("#E-value")[0].value = eFlag;
        $("#pc")[0].innerHTML = dec2hex(pc);
    }
    currentInstruction == "HLT" ? $("#console")[0].innerHTML = "The program finished by HLT" : null;
}

/* its the first pass
all the labels saved with their addresses in json as key and value */
function collectLabels() {
    let rows = Array.from($(".label-cmd-input"));
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
    let rows = Array.from($(".instruction-input"));
    let findHLT = false;
    rows.forEach(r => {
        r.value == "HLT" ? findHLT = true : null;
    });
    return findHLT;
}

// convert the instructions and value to machine lang
function convertToMachineLang() {
    let rows = Array.from($(".cmd-row"));
    let machineLang;
    let val;
    let I;
    collectLabels();
    rows.forEach(r => {
        currentInstruction = r.getElementsByClassName("instruction-input")[0].value;
        val = r.getElementsByClassName("value-input")[0].value;
        val = val.split(" ")[0];
        I = val.split(" ")[1];
        switch (currentInstruction) {
            // memory
            case "AND":
                machineLang = (I ? '8' : '0') + labelToAddress(val, I);
                break;
            case "ADD":
                machineLang = (I ? '9' : '1') + labelToAddress(val, I);
                break;
            case "LDA":
                machineLang = (I ? 'A' : '2') + labelToAddress(val, I);
                break;
            case "STA":
                machineLang = (I ? 'B' : '3') + labelToAddress(val, I);
                break;
            case "BUN":
                machineLang = (I ? 'C' : '4') + labelToAddress(val, I);
                break;
            case "BSA":
                machineLang = (I ? 'D' : '5') + labelToAddress(val, I);
                break;
            case "ISZ":
                machineLang = (I ? 'E' : '6') + labelToAddress(val, I);
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
    });  
}


//check inputs
function checkInputs() {
    let rows = Array.from($(".cmd-row"));
    collectLabels();
    rows.forEach(r => {
        let instruction = r.getElementsByClassName("instruction-input")[0].value;
        let I = instruction.split(" ")[1]; //the value without the I
        instruction = instruction.split(" ")[0];
        let val = r.getElementsByClassName("value-input")[0].value;
        if (instruction == ('ADD' || 'AND' || 'LDA' || 'STA' || 'BUN' || 'BSA' || 'ISZ')) {
            if (typeof labelsJson[val][0] == null) {
                $("#console")[0].innerHTML = `The label ${val} isn't exist`;
                return;
            }
        } else if (instruction != ('STA' || 'BUN' || 'BSA' || 'CLA' || 'CLE' || 'CMA' ||
            'CME' || 'CIR' || 'CIL' || 'INC' || 'SPA' || 'SNA' || 'SZA' || 'SZE' || 'HLT' ||
            'INP' || 'OUT' || 'SKI' || 'SKO' || 'ION' || 'IOF' || 'HEX' || 'DEC')) {
            $("#console")[0].innerHTML = `${val} isn't allowed instruction`;
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
        address = getValueByAddress(address);
        return labelsJson[address][0];
    }
    return address;
}

// get address
//return the binary value of this address
function getValueByAddress(address) {
    let row = $(`#row${address}`)[0];
    let base = row.getElementsByClassName("instruction-input")[0].value; //HEX || DEC
    let val = row.getElementsByClassName("value-input")[0].value; //original value
    switch (base) {
        case "HEX":
            val = hex2bin(val);
            break;
        case "DEC":
            val = dec2bin(val);
            break;
        default:
            $("#console")[0].innerHTML = "The indirect instruction should be HEX or DEC";
            return;
    }
    return val;
}
/* listen to the input
1. padding to hex
2. convert values to upper case
3. dynamic change of the machine language
 */
$("input").change((e) => listenToInputs(e));
 function listenToInputs(e) {
    let elem = e.target;
    let inputType = e.target.classList;
    let currrentInstruction;
    if (inputType.includes("instruction-input")) {
        currrentInstruction = elem.target.value;
        convertToMachineLang(e); //change the function to get
    } else if (currentInsrruction == ('HEX' || 'DEC') &&
                inputType.includes("value-input")) {
        padding(e.target.value, )
    }
 }

function listenToOrg(e) {
    let rows = Array.from($(".count-address"));
    let rowNumber = hex2dec(e.target.value);
    rows.forEach(r => {
        r.innerHTML = dec2hex(rowNumber);
        rowNumber++;
    });
}