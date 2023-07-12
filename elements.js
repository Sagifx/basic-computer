
var nextAddress = "100";
var acReg = "0000";
var pc = nextAddress


function addCmdRow() {
    let newRow = `<div name=${nextAddress} class="cmd-row">
            <div class="address">${nextAddress}</div>
            <div class="label"><input class="label-input"></div>
            <div class="instruction"><input class="instruction-input"></div>
            <div class="value"><input class="value-input"></div>
        </div>`;
    nextAddress++;
    document.getElementById("cmd-container").innerHTML += newRow;
}

