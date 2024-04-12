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
        fetchCmd2Memory(); // fetch the cmd data to the memoryJson
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
            case "BIN":
                pc++;
                break;
            case "DEC":
                pc++;
                break;
            case "HEX":
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
        if (step) return; //if (step && currentInstruction != "HLT") return;
    }
    $(`#row${index}`)[0].getElementsByClassName("address")[0].style.backgroundColor = "yellow";
    $(`#row${lastIndex}`)[0].getElementsByClassName("address")[0].style.backgroundColor = "transparent";
    currentInstruction == "HLT" ? console("The program finished by HLT") : null;
    pc = hex2dec($("#org-value")[0].value);
    lastIndex = "";
    $("#run-btn")[0].innerHTML = "Run the code";
}

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

// print msg to the user
function console(txt) {
    $("#console")[0].innerHTML = txt;
}

// print msg to the user
function converterConsole(txt) {
    $("#converterConsole")[0].innerHTML = txt;
}




/* MACHINE LANGUAGE                                                      */
 

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
    btn.innerHTML = (btn.innerHTML.includes("Show") ? "Hide" : "Show") + " machine language";
}