
var orgAddress = 256;
document.getElementById("org-value").value = orgAddress.toString(16);
var rowCtr = orgAddress;
var acReg = "0000";
var pc;
var interuptOn = false;
var inputReg;
var outputReg;
var inputFlag= false;
var outputFlag= false;
var eFlag = 0;
let labelsJson;

$("#org-value").keyup((e) => listenToOrg(e));
$("#ac-value").value = acReg;

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
    collectLabels();
    pc = $("#org-value")[0].value;
    acReg = $("#ac-value").value;
    let val;
    let label;
    let lab;
    let I;
    let rowElem = document.getElementById(`row${pc}`);
    let currentInstruction = rowElem.getElementsByClassName("instruction")[0];
    while (currentInstruction != "HLT") {
        val = rowElem.getElementsByClassName("value-input")[0].value;
        val = hex2bin(val);
        label = rowElem.getElementsByClassName("label")[0].value;
        label = label.split(" ");
        lab = label[0];
        I = label[1] == "I" ? true : false;
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
            case "HLT":
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
        }
        rowElem = document.getElementById(`row${pc}`);
        currentInstruction = rowElem.getElementsByClassName("instruction")[0];
        $("#ac-value").value = acReg;
    }
}

function collectLabels() {
    let rows = Array.from($(".label-input"));
    let rowNumber = e.target.value.toString(16);
    let labels = '';
    rows.forEach(r => {
        rowNumber++;
        r != "" ? labels = `"${rows[0].value}":["${rows[0].parentElement.parentElement.getElementsByClassName("count-address")[0].innerHTML}"],` : null;
        r.innerHTML = dec2hex(rowNumber);
    });
    labels = labels.slice(0, labels.length);
    labels = "{" + labels + "}";
    labelsJson = JSON.parse(labels);

}

/*example Json

let text = '{"ck":["a"],"kc":["d"]}';

const obj = JSON.parse(text);

a = obj.kc[0]
 */



