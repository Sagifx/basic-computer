
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
    let rowNumber = e.target.value.toString(16);
    rows.forEach(r => {
        rowNumber++;
        r.innerHTML = dec2hex(rowNumber);
    });
}


function addCmdRow() {
    let newRow = `<div id=row${rowCtr.toString(16)} class="cmd-row">
            <div class="address count-address">${rowCtr.toString(16)}</div>
            <div class="label"><input class="label-input"></div>
            <div class="instruction"><input class="instruction-input"></div>
            <div class="value"><input class="value-input"></div>
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
    $("#console")[0].innerHTML = "";
    let val;
    let label;
    let I;
    let rowElem = $(`#row${pc}`)[0];
    let currentInstruction = rowElem.getElementsByClassName("instruction-input")[0].value;
    while (currentInstruction != "HLT") {
        val = rowElem.getElementsByClassName("value-input")[0].value;
        val = hex2bin(val);
        label = rowElem.getElementsByClassName("label-input")[0].value;
        label = label.split(" ");
        I = currentInstruction.split("0")[1] == "I" ? true : false;
        switch (currentInstruction) {
        // memory
            case "AND":
                AND(val);   //ac and bin mar
                break;
            case "ADD":
                ADD(val);  //ac and bin mar
                break;
            case "LDA":
                LDA(getValue(lab, I));  //get value from label to ac
                break;
            case "STA":
                STA(getValue(lab, I));  //store value from ac to label
                break;
            case "BUN":
                BUN(val);  //the val will be address
                break;
            case "BSA":
                BSA(val);  //the val will be address
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
    }
    currentInstruction == "HLT" ? $("#console")[0].innerHTML = "The program finished by HLT" : null;
}

function collectLabels() {
    let rows = Array.from($(".label-input"));
    let rowNumber = rows[0].parentElement.parentElement.getElementsByClassName("count-address")[0].innerHTML;
    let labels = '';
    rows.forEach(r => {
        rowNumber++;
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
    let rowNumber = rows[0].parentElement.parentElement.getElementsByClassName("count-address")[0].innerHTML;
    let findHLT = false;
    rows.forEach(r => {
        rowNumber++;
        r.value == "HLT" ? findHLT = true : null;
    });
    return findHLT;
}

