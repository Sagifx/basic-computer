
var orgAddress = 256;
document.getElementById("org-value").value = orgAddress.toString(16);
var rowCtr = orgAddress;
var acReg;
var pc;
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
$("#pc")[0].innerHTML = pc;



//test
for (let i = 0; i < 10; i++)addCmdRow();
setTimeout(() => {
    $("#row100")[0].getElementsByClassName("label-input")[0].value = 'A';
    $("#row100")[0].getElementsByClassName("instruction-input")[0].value = 'CIR';
 $("#row101")[0].getElementsByClassName("instruction-input")[0].value = 'HLT';

}, 100);

//test


function listenToOrg(e) {
    let rows = Array.from($(".count-address"));
    let rowNumber = hex2dec(e.target.value);
    rows.forEach(r => {
        r.innerHTML = dec2hex(rowNumber);
        rowNumber++;
    });
}


function addCmdRow() {
    let newRow = `<div id=row${rowCtr.toString(16)} class="cmd-row">
            <div class="address count-address">${rowCtr.toString(16)}</div>
            <div class="label"><input class="label-input" maxlength="4"></div>
            <div class="instruction"><input class="instruction-input" maxlength="3"></div>
            <div class="value"><input class="value-input" maxlength="4"></div>
        </div>`;
    rowCtr++;
    document.getElementById("cmd-container").innerHTML += newRow;
    document.getElementById("org-value").value = orgAddress.toString(16);
    $("#org-value").keyup((e) => listenToOrg(e));
}



// start by pressing the run button until the HLT
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
    let label;
    let I;
    let rowElem = $(`#row${pc}`)[0];
    let currentInstruction = rowElem.getElementsByClassName("instruction-input")[0].value;
    while (currentInstruction != "HLT") {
        val = rowElem.getElementsByClassName("value-input")[0].value;
        I = val.split("")[1] == "I" ? true : false;
        val = val.split("")[0];
        val = hex2bin(val);
        label = rowElem.getElementsByClassName("label-input")[0].value;
        label = label.split(" ");
        switch (currentInstruction) {
        // memory
            case "AND":
                AND(hex2bin(val));   //ac and bin mar
                break;
            case "ADD":
                ADD(hex2bin(val));  //ac and bin mar
                break;
            case "LDA":
                LDA(getValue(lab, I));  //get value from label to ac
                break;
            case "STA":
                STA(getValue(lab, I));  //store value from ac to label
                break;
            case "BUN":
                BUN(getValue(lab, I));  //the val will be address
                break;
            case "BSA":
                BSA(getValue(lab, I));  //the val will be address
                break;
            case "ISZ":
                ISZ(val); //?
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
        $("#pc")[0].innerHTML = pc;
    }
    currentInstruction == "HLT" ? $("#console")[0].innerHTML = "The program finished by HLT" : null;
}

function collectLabels() {
    let rows = Array.from($(".label-input"));
    let rowNumber = rows[0].parentElement.parentElement.getElementsByClassName("count-address")[0].innerHTML;
    let labels = '';
    rows.forEach(r => {
        //rowNumber++;
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

function lookForHLT() {
    let rows = Array.from($(".instruction-input"));
    let findHLT = false;
    rows.forEach(r => {
        r.value == "HLT" ? findHLT = true : null;
    });
    return findHLT;
}

function convertToMachineLang() {
    let rows = Array.from($(".instruction-input"));
    let machineLang;
    rows.forEach(r => {
        currentInstruction = r.value;
        switch (currentInstruction) {
            // memory
            case "AND":
                AND(val);
                break;
            case "ADD":
                ADD(val);
                break;
            case "LDA":
                LDA(getValue(lab, I));
                break;
            case "STA":
                STA(getValue(lab, I));
                break;
            case "BUN":
                BUN(val);
                break;
            case "BSA":
                BSA(val);
                break;
            case "ISZ":
                ISZ(val);
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
    machineLang != "" ? r.parentElement.parentElement.innerHTML += `<div>${machineLang}</div>` : null;
    });  
}



function checkInputs() {
    let rows = Array.from($(".cmd-row"));
    let machineLang;
    rows.forEach(r => {
        
        
    r.parentElement.parentElement.innerHTML += `<div>${machineLang}</div>`;
    });
    return true;
}

/* get label and direct/indirect
*  return address
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
//return the value of this address
function getValueByAddress(address) {
    let val = $(`#row${address}`).getElementsByClassName("value-input")[0].value;
    return val;
} 
