
var orgAddress = Number(document.getElementById("org-value").value);
var rowCtr = 0;
var acReg = "0000";
var pc = orgAddress;
document.getElementById("org-value").innerHTML = orgAddress;

document.getElementById("ac-value").innerHTML = acReg;

function addCmdRow() {
    let newRow = `<div id=row${orgAddress + rowCtr} class="cmd-row">
            <div class="address">${orgAddress + rowCtr}</div>
            <div class="label"><input class="label-input"></div>
            <div class="instruction"><input class="instruction-input"></div>
            <div class="value"><input class="value-input"></div>
        </div>`;
    rowCtr++;
    document.getElementById("cmd-container").innerHTML += newRow;
}

function loadOrgAddress() {
    orgAddress = document.getElementById("org-value").value;
}


