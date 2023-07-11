var pc = 100;
function siteUp() {

}

function addCmdRow() {
    let newRow = `<div class="cmd-row">
            <div class="address">address label</div>
            <input>
            <input>
            <input>
        </div>`
    document.getElementById("cmd-container").innerHTML += newRow;
    pc++;
}

