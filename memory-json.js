/*example to Json pattern

let text = '{"ck":["a"],"kc":["d"]}';

const obj = JSON.parse(text);

a = obj.kc[0]
 */


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
            convertedIndex = dec2hex(i).slice(1,);
            if (memoryJson[convertedIndex][1] != "") {
                addMemoryRow(convertedIndex);
            }
        }
        btn.innerHTML = "Hide Memory";
        setTimeout(() => { // hide memory for any click if shown
            $("html").bind("click", showMemory);
        }, 100);
    } else {
        btn.innerHTML = "Show Memory";
        $("html").unbind("click", showMemory);
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
 * get event as argument
 * delete the event's row- copy the next row to the current one 
 * and put empty bracats at the kast row
 * 
 */
function removeRow(evt) {
    let address;
    if (evt.target.tagName == 'path')
        address = evt.target.parentElement.parentElement.id.split("row")[1];
    else
        address = evt.target.parentElement.id.split("row")[1];
    for (let i = Number(hex2dec(address)); i < 4096 - 1; i++) {
        memoryJson[dec2hex(i).slice(1,)] = memoryJson[dec2hex(Number(i) + 1).slice(1, )];
    }
    memoryJson["FFF"][0] = ``;
    memoryJson["FFF"][1] = ``;
    memoryJson["FFF"][2] = ``;
    fetchMemory2Cmd();
}

/**
 * copy the CMD data to the memory 
 */
function fetchCmd2Memory() {
    let cmdRows = Array.from($(".count-address"));
    cmdRows.forEach(r => {
        storeDataInJson(r.innerHTML);
    });
}

/**
 * delete the cmd rows
 * copy memory data to the cmd 
 */
function fetchMemory2Cmd() {
    let cmdContainer = $("#cmd-container");
    let title = cmdContainer.children()[0];
    let hexAddress;
    cmdContainer[0].innerHTML = ""; 
    cmdContainer[0].appendChild(title); //remove all the cmd rows and stay with the title only
    for (let i = 0; i < 4096; i++) {
        hexAddress = dec2hex(i).slice(1,);
        if (memoryJson[hexAddress][0] != "" || memoryJson[hexAddress][1] != "" ||
            memoryJson[hexAddress][2] != "") {
            addCmdRowFromMemory(hexAddress);
        }
    }
    if ($(`#show-machine-lang`)[0].innerHTML.includes("Hide"))
        showMachineLangToggle();
    convertToMachineLang();
}