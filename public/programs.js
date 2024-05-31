
function prog1() {
    let cmdContainer = $("#cmd-container");
    cmdContainer[0].innerHTML = "";
    rowCtr = 256;
    cmdContainer[0].appendChild(title);
    for (let i = 0; i < 26; i++) addCmdRow();
    $("#row100")[0].getElementsByClassName("label-cmd-input")[0].value = '';
    $("#row100")[0].getElementsByClassName("instruction-cmd-input")[0].value = 'LDA';
    $("#row100")[0].getElementsByClassName("value-input")[0].value = 'NUM';

    $("#row101")[0].getElementsByClassName("label-cmd-input")[0].value = '';
    $("#row101")[0].getElementsByClassName("instruction-cmd-input")[0].value = 'AND';
    $("#row101")[0].getElementsByClassName("value-input")[0].value = 'MSK';

    $("#row102")[0].getElementsByClassName("label-cmd-input")[0].value = '';
    $("#row102")[0].getElementsByClassName("instruction-cmd-input")[0].value = 'INC';
    $("#row102")[0].getElementsByClassName("value-input")[0].value = '';

    $("#row103")[0].getElementsByClassName("label-cmd-input")[0].value = '';
    $("#row103")[0].getElementsByClassName("instruction-cmd-input")[0].value = 'SPA';
    $("#row103")[0].getElementsByClassName("value-input")[0].value = '';

    $("#row104")[0].getElementsByClassName("label-cmd-input")[0].value = '';
    $("#row104")[0].getElementsByClassName("instruction-cmd-input")[0].value = 'INC';
    $("#row104")[0].getElementsByClassName("value-input")[0].value = '';

    $("#row105")[0].getElementsByClassName("label-cmd-input")[0].value = '';
    $("#row105")[0].getElementsByClassName("instruction-cmd-input")[0].value = 'INC';
    $("#row105")[0].getElementsByClassName("value-input")[0].value = '';

    $("#row106")[0].getElementsByClassName("label-cmd-input")[0].value = '';
    $("#row106")[0].getElementsByClassName("instruction-cmd-input")[0].value = 'SNA';
    $("#row106")[0].getElementsByClassName("value-input")[0].value = '';

    $("#row107")[0].getElementsByClassName("label-cmd-input")[0].value = '';
    $("#row107")[0].getElementsByClassName("instruction-cmd-input")[0].value = 'INC';
    $("#row107")[0].getElementsByClassName("value-input")[0].value = '';

    $("#row108")[0].getElementsByClassName("label-cmd-input")[0].value = '';
    $("#row108")[0].getElementsByClassName("instruction-cmd-input")[0].value = 'SNA';
    $("#row108")[0].getElementsByClassName("value-input")[0].value = '';

    $("#row109")[0].getElementsByClassName("label-cmd-input")[0].value = '';
    $("#row109")[0].getElementsByClassName("instruction-cmd-input")[0].value = 'INC';
    $("#row109")[0].getElementsByClassName("value-input")[0].value = '';

    $("#row10A")[0].getElementsByClassName("label-cmd-input")[0].value = '';
    $("#row10A")[0].getElementsByClassName("instruction-cmd-input")[0].value = 'SZA';
    $("#row10A")[0].getElementsByClassName("value-input")[0].value = '';

    $("#row10B")[0].getElementsByClassName("label-cmd-input")[0].value = '';
    $("#row10B")[0].getElementsByClassName("instruction-cmd-input")[0].value = 'LDA';
    $("#row10B")[0].getElementsByClassName("value-input")[0].value = 'ZER';

    $("#row10C")[0].getElementsByClassName("label-cmd-input")[0].value = '';
    $("#row10C")[0].getElementsByClassName("instruction-cmd-input")[0].value = 'SZA';
    $("#row10C")[0].getElementsByClassName("value-input")[0].value = '';

    $("#row10D")[0].getElementsByClassName("label-cmd-input")[0].value = '';
    $("#row10D")[0].getElementsByClassName("instruction-cmd-input")[0].value = 'INC';
    $("#row10D")[0].getElementsByClassName("value-input")[0].value = '';

    $("#row10E")[0].getElementsByClassName("label-cmd-input")[0].value = '';
    $("#row10E")[0].getElementsByClassName("instruction-cmd-input")[0].value = 'HLT';
    $("#row10E")[0].getElementsByClassName("value-input")[0].value = '';
    
    $("#row115")[0].getElementsByClassName("label-cmd-input")[0].value = 'NUM';
    $("#row115")[0].getElementsByClassName("instruction-cmd-input")[0].value = 'HEX';
    $("#row115")[0].getElementsByClassName("value-input")[0].value = 'F0F';

    $("#row116")[0].getElementsByClassName("label-cmd-input")[0].value = 'MSK';
    $("#row116")[0].getElementsByClassName("instruction-cmd-input")[0].value = 'HEX';
    $("#row116")[0].getElementsByClassName("value-input")[0].value = '00F';

    $("#row117")[0].getElementsByClassName("label-cmd-input")[0].value = 'ZER';
    $("#row117")[0].getElementsByClassName("instruction-cmd-input")[0].value = 'HEX';
    $("#row117")[0].getElementsByClassName("value-input")[0].value = '000';

    $("#row118")[0].getElementsByClassName("label-cmd-input")[0].value = '';
    $("#row118")[0].getElementsByClassName("instruction-cmd-input")[0].value = 'END';
    $("#row118")[0].getElementsByClassName("value-input")[0].value = '';
}


function prog2() {
    let cmdContainer = $("#cmd-container");
    cmdContainer[0].innerHTML = "";
    rowCtr = 256;
    cmdContainer[0].appendChild(title);
    for (let i = 0; i < 15; i++) addCmdRow();
    $("#row100")[0].getElementsByClassName("label-cmd-input")[0].value = '';
    $("#row100")[0].getElementsByClassName("instruction-cmd-input")[0].value = 'LDA';
    $("#row100")[0].getElementsByClassName("value-input")[0].value = 'NUM';
    
    $("#row101")[0].getElementsByClassName("label-cmd-input")[0].value = '';
    $("#row101")[0].getElementsByClassName("instruction-cmd-input")[0].value = 'BSA';
    $("#row101")[0].getElementsByClassName("value-input")[0].value = 'JMP';

    $("#row102")[0].getElementsByClassName("label-cmd-input")[0].value = '';
    $("#row102")[0].getElementsByClassName("instruction-cmd-input")[0].value = 'INC';
    $("#row102")[0].getElementsByClassName("value-input")[0].value = '';

    $("#row103")[0].getElementsByClassName("label-cmd-input")[0].value = '';
    $("#row103")[0].getElementsByClassName("instruction-cmd-input")[0].value = 'INC';
    $("#row103")[0].getElementsByClassName("value-input")[0].value = '';

    $("#row104")[0].getElementsByClassName("label-cmd-input")[0].value = '';
    $("#row104")[0].getElementsByClassName("instruction-cmd-input")[0].value = 'HLT';
    $("#row104")[0].getElementsByClassName("value-input")[0].value = '';

    $("#row105")[0].getElementsByClassName("label-cmd-input")[0].value = 'NUM';
    $("#row105")[0].getElementsByClassName("instruction-cmd-input")[0].value = 'HEX';
    $("#row105")[0].getElementsByClassName("value-input")[0].value = '000';

    $("#row106")[0].getElementsByClassName("label-cmd-input")[0].value = 'JMP';
    $("#row106")[0].getElementsByClassName("instruction-cmd-input")[0].value = 'HEX';
    $("#row106")[0].getElementsByClassName("value-input")[0].value = '000';

    $("#row107")[0].getElementsByClassName("label-cmd-input")[0].value = '';
    $("#row107")[0].getElementsByClassName("instruction-cmd-input")[0].value = 'INC';
    $("#row107")[0].getElementsByClassName("value-input")[0].value = '';

    $("#row108")[0].getElementsByClassName("label-cmd-input")[0].value = '';
    $("#row108")[0].getElementsByClassName("instruction-cmd-input")[0].value = 'BUN';
    $("#row108")[0].getElementsByClassName("value-input")[0].value = 'JMP I';

    $("#row10C")[0].getElementsByClassName("label-cmd-input")[0].value = '';
    $("#row10C")[0].getElementsByClassName("instruction-cmd-input")[0].value = 'END';
    $("#row10C")[0].getElementsByClassName("value-input")[0].value = '';

}


function prog3() {
    let cmdContainer = $("#cmd-container");
    cmdContainer[0].innerHTML = "";
    rowCtr = 256;
    cmdContainer[0].appendChild(title);
    for (let i = 0; i < 26; i++) addCmdRow();
    $("#row100")[0].getElementsByClassName("label-cmd-input")[0].value = '';
    $("#row100")[0].getElementsByClassName("instruction-cmd-input")[0].value = 'LDA';
    $("#row100")[0].getElementsByClassName("value-input")[0].value = 'NUM';

    $("#row101")[0].getElementsByClassName("label-cmd-input")[0].value = '';
    $("#row101")[0].getElementsByClassName("instruction-cmd-input")[0].value = 'AND';
    $("#row101")[0].getElementsByClassName("value-input")[0].value = 'MSK';

    $("#row102")[0].getElementsByClassName("label-cmd-input")[0].value = '';
    $("#row102")[0].getElementsByClassName("instruction-cmd-input")[0].value = 'INC';
    $("#row102")[0].getElementsByClassName("value-input")[0].value = '';

    $("#row103")[0].getElementsByClassName("label-cmd-input")[0].value = '';
    $("#row103")[0].getElementsByClassName("instruction-cmd-input")[0].value = 'SPA';
    $("#row103")[0].getElementsByClassName("value-input")[0].value = '';

    $("#row104")[0].getElementsByClassName("label-cmd-input")[0].value = '';
    $("#row104")[0].getElementsByClassName("instruction-cmd-input")[0].value = 'INC';
    $("#row104")[0].getElementsByClassName("value-input")[0].value = '';

    $("#row105")[0].getElementsByClassName("label-cmd-input")[0].value = '';
    $("#row105")[0].getElementsByClassName("instruction-cmd-input")[0].value = 'INC';
    $("#row105")[0].getElementsByClassName("value-input")[0].value = '';

    $("#row106")[0].getElementsByClassName("label-cmd-input")[0].value = '';
    $("#row106")[0].getElementsByClassName("instruction-cmd-input")[0].value = 'SNA';
    $("#row106")[0].getElementsByClassName("value-input")[0].value = '';

    $("#row107")[0].getElementsByClassName("label-cmd-input")[0].value = '';
    $("#row107")[0].getElementsByClassName("instruction-cmd-input")[0].value = 'INC';
    $("#row107")[0].getElementsByClassName("value-input")[0].value = '';

    $("#row108")[0].getElementsByClassName("label-cmd-input")[0].value = '';
    $("#row108")[0].getElementsByClassName("instruction-cmd-input")[0].value = 'SNA';
    $("#row108")[0].getElementsByClassName("value-input")[0].value = '';

    $("#row109")[0].getElementsByClassName("label-cmd-input")[0].value = '';
    $("#row109")[0].getElementsByClassName("instruction-cmd-input")[0].value = 'INC';
    $("#row109")[0].getElementsByClassName("value-input")[0].value = '';

    $("#row10A")[0].getElementsByClassName("label-cmd-input")[0].value = '';
    $("#row10A")[0].getElementsByClassName("instruction-cmd-input")[0].value = 'SZA';
    $("#row10A")[0].getElementsByClassName("value-input")[0].value = '';

    $("#row10B")[0].getElementsByClassName("label-cmd-input")[0].value = '';
    $("#row10B")[0].getElementsByClassName("instruction-cmd-input")[0].value = 'LDA';
    $("#row10B")[0].getElementsByClassName("value-input")[0].value = 'ZER';

    $("#row10C")[0].getElementsByClassName("label-cmd-input")[0].value = '';
    $("#row10C")[0].getElementsByClassName("instruction-cmd-input")[0].value = 'SZA';
    $("#row10C")[0].getElementsByClassName("value-input")[0].value = '';

    $("#row10D")[0].getElementsByClassName("label-cmd-input")[0].value = '';
    $("#row10D")[0].getElementsByClassName("instruction-cmd-input")[0].value = 'INC';
    $("#row10D")[0].getElementsByClassName("value-input")[0].value = '';

    $("#row10E")[0].getElementsByClassName("label-cmd-input")[0].value = '';
    $("#row10E")[0].getElementsByClassName("instruction-cmd-input")[0].value = 'HLT';
    $("#row10E")[0].getElementsByClassName("value-input")[0].value = '';
    
    $("#row115")[0].getElementsByClassName("label-cmd-input")[0].value = 'NUM';
    $("#row115")[0].getElementsByClassName("instruction-cmd-input")[0].value = 'HEX';
    $("#row115")[0].getElementsByClassName("value-input")[0].value = 'F0F';

    $("#row116")[0].getElementsByClassName("label-cmd-input")[0].value = 'MSK';
    $("#row116")[0].getElementsByClassName("instruction-cmd-input")[0].value = 'HEX';
    $("#row116")[0].getElementsByClassName("value-input")[0].value = '00F';

    $("#row117")[0].getElementsByClassName("label-cmd-input")[0].value = 'ZER';
    $("#row117")[0].getElementsByClassName("instruction-cmd-input")[0].value = 'HEX';
    $("#row117")[0].getElementsByClassName("value-input")[0].value = '000';

    $("#row118")[0].getElementsByClassName("label-cmd-input")[0].value = '';
    $("#row118")[0].getElementsByClassName("instruction-cmd-input")[0].value = 'END';
    $("#row118")[0].getElementsByClassName("value-input")[0].value = '';
}


function prog4() {
    let cmdContainer = $("#cmd-container");
    cmdContainer[0].innerHTML = "";
    rowCtr = 256;
    cmdContainer[0].appendChild(title);
    for (let i = 0; i < 26; i++) addCmdRow();
    $("#row100")[0].getElementsByClassName("label-cmd-input")[0].value = '';
    $("#row100")[0].getElementsByClassName("instruction-cmd-input")[0].value = 'LDA';
    $("#row100")[0].getElementsByClassName("value-input")[0].value = 'ZER';
    
    $("#row101")[0].getElementsByClassName("label-cmd-input")[0].value = '';
    $("#row101")[0].getElementsByClassName("instruction-cmd-input")[0].value = 'INC';
    $("#row101")[0].getElementsByClassName("value-input")[0].value = '';

    $("#row102")[0].getElementsByClassName("label-cmd-input")[0].value = '';
    $("#row102")[0].getElementsByClassName("instruction-cmd-input")[0].value = 'INC';
    $("#row102")[0].getElementsByClassName("value-input")[0].value = '';

    $("#row103")[0].getElementsByClassName("label-cmd-input")[0].value = '';
    $("#row103")[0].getElementsByClassName("instruction-cmd-input")[0].value = 'INC';
    $("#row103")[0].getElementsByClassName("value-input")[0].value = '';

    $("#row104")[0].getElementsByClassName("label-cmd-input")[0].value = '';
    $("#row104")[0].getElementsByClassName("instruction-cmd-input")[0].value = 'STA';
    $("#row104")[0].getElementsByClassName("value-input")[0].value = 'SV';

    $("#row105")[0].getElementsByClassName("label-cmd-input")[0].value = '';
    $("#row105")[0].getElementsByClassName("instruction-cmd-input")[0].value = 'BUN';
    $("#row105")[0].getElementsByClassName("value-input")[0].value = 'NXT';

    $("#row106")[0].getElementsByClassName("label-cmd-input")[0].value = '';
    $("#row106")[0].getElementsByClassName("instruction-cmd-input")[0].value = 'HEX';
    $("#row106")[0].getElementsByClassName("value-input")[0].value = '000';

    $("#row107")[0].getElementsByClassName("label-cmd-input")[0].value = '';
    $("#row107")[0].getElementsByClassName("instruction-cmd-input")[0].value = 'HEX';
    $("#row107")[0].getElementsByClassName("value-input")[0].value = '';

    $("#row108")[0].getElementsByClassName("label-cmd-input")[0].value = '';
    $("#row108")[0].getElementsByClassName("instruction-cmd-input")[0].value = 'HEX';
    $("#row108")[0].getElementsByClassName("value-input")[0].value = '';

    $("#row109")[0].getElementsByClassName("label-cmd-input")[0].value = 'NXT';
    $("#row109")[0].getElementsByClassName("instruction-cmd-input")[0].value = 'SZE';
    $("#row109")[0].getElementsByClassName("value-input")[0].value = '';

    $("#row10A")[0].getElementsByClassName("label-cmd-input")[0].value = '';
    $("#row10A")[0].getElementsByClassName("instruction-cmd-input")[0].value = 'CMA';
    $("#row10A")[0].getElementsByClassName("value-input")[0].value = '';

    $("#row10B")[0].getElementsByClassName("label-cmd-input")[0].value = '';
    $("#row10B")[0].getElementsByClassName("instruction-cmd-input")[0].value = 'SZE';
    $("#row10B")[0].getElementsByClassName("value-input")[0].value = '';

    $("#row10C")[0].getElementsByClassName("label-cmd-input")[0].value = '';
    $("#row10C")[0].getElementsByClassName("instruction-cmd-input")[0].value = 'INC';
    $("#row10C")[0].getElementsByClassName("value-input")[0].value = '';

    $("#row10D")[0].getElementsByClassName("label-cmd-input")[0].value = '';
    $("#row10D")[0].getElementsByClassName("instruction-cmd-input")[0].value = 'HLT';
    $("#row10D")[0].getElementsByClassName("value-input")[0].value = '';

    $("#row110")[0].getElementsByClassName("label-cmd-input")[0].value = 'SV';
    $("#row110")[0].getElementsByClassName("instruction-cmd-input")[0].value = 'HEX';
    $("#row110")[0].getElementsByClassName("value-input")[0].value = '000';

    $("#row111")[0].getElementsByClassName("label-cmd-input")[0].value = 'ZER';
    $("#row111")[0].getElementsByClassName("instruction-cmd-input")[0].value = 'HEX';
    $("#row111")[0].getElementsByClassName("value-input")[0].value = '000';

    $("#row115")[0].getElementsByClassName("label-cmd-input")[0].value = '';
    $("#row115")[0].getElementsByClassName("instruction-cmd-input")[0].value = 'END';
    $("#row115")[0].getElementsByClassName("value-input")[0].value = '';

}


function prog5() {
    let cmdContainer = $("#cmd-container");
    cmdContainer[0].innerHTML = "";
    rowCtr = 256;
    cmdContainer[0].appendChild(title);
    for (let i = 0; i < 26; i++) addCmdRow();
    $("#row100")[0].getElementsByClassName("label-cmd-input")[0].value = '';
    $("#row100")[0].getElementsByClassName("instruction-cmd-input")[0].value = 'LDA';
    $("#row100")[0].getElementsByClassName("value-input")[0].value = 'FFE';
    
    $("#row101")[0].getElementsByClassName("label-cmd-input")[0].value = '';
    $("#row101")[0].getElementsByClassName("instruction-cmd-input")[0].value = 'ISZ';
    $("#row101")[0].getElementsByClassName("value-input")[0].value = 'FFE';

    $("#row102")[0].getElementsByClassName("label-cmd-input")[0].value = '';
    $("#row102")[0].getElementsByClassName("instruction-cmd-input")[0].value = 'INC';
    $("#row102")[0].getElementsByClassName("value-input")[0].value = '';

    $("#row103")[0].getElementsByClassName("label-cmd-input")[0].value = '';
    $("#row103")[0].getElementsByClassName("instruction-cmd-input")[0].value = 'INC';
    $("#row103")[0].getElementsByClassName("value-input")[0].value = '';

    $("#row104")[0].getElementsByClassName("label-cmd-input")[0].value = '';
    $("#row104")[0].getElementsByClassName("instruction-cmd-input")[0].value = 'ISZ';
    $("#row104")[0].getElementsByClassName("value-input")[0].value = 'FFE';

    $("#row105")[0].getElementsByClassName("label-cmd-input")[0].value = '';
    $("#row105")[0].getElementsByClassName("instruction-cmd-input")[0].value = 'CIL';
    $("#row105")[0].getElementsByClassName("value-input")[0].value = '';

    $("#row106")[0].getElementsByClassName("label-cmd-input")[0].value = '';
    $("#row106")[0].getElementsByClassName("instruction-cmd-input")[0].value = 'CIL';
    $("#row106")[0].getElementsByClassName("value-input")[0].value = '';

    $("#row107")[0].getElementsByClassName("label-cmd-input")[0].value = '';
    $("#row107")[0].getElementsByClassName("instruction-cmd-input")[0].value = 'CIR';
    $("#row107")[0].getElementsByClassName("value-input")[0].value = '';

    $("#row108")[0].getElementsByClassName("label-cmd-input")[0].value = '';
    $("#row108")[0].getElementsByClassName("instruction-cmd-input")[0].value = 'CME';
    $("#row108")[0].getElementsByClassName("value-input")[0].value = '';

    $("#row109")[0].getElementsByClassName("label-cmd-input")[0].value = '';
    $("#row109")[0].getElementsByClassName("instruction-cmd-input")[0].value = 'CLE';
    $("#row109")[0].getElementsByClassName("value-input")[0].value = '';

    $("#row10A")[0].getElementsByClassName("label-cmd-input")[0].value = '';
    $("#row10A")[0].getElementsByClassName("instruction-cmd-input")[0].value = 'INC';
    $("#row10A")[0].getElementsByClassName("value-input")[0].value = '';

    $("#row10B")[0].getElementsByClassName("label-cmd-input")[0].value = '';
    $("#row10B")[0].getElementsByClassName("instruction-cmd-input")[0].value = 'CMA';
    $("#row10B")[0].getElementsByClassName("value-input")[0].value = '';

    $("#row10C")[0].getElementsByClassName("label-cmd-input")[0].value = '';
    $("#row10C")[0].getElementsByClassName("instruction-cmd-input")[0].value = 'CLA';
    $("#row10C")[0].getElementsByClassName("value-input")[0].value = '';

    $("#row10D")[0].getElementsByClassName("label-cmd-input")[0].value = '';
    $("#row10D")[0].getElementsByClassName("instruction-cmd-input")[0].value = 'HLT';
    $("#row10D")[0].getElementsByClassName("value-input")[0].value = '';

    $("#row111")[0].getElementsByClassName("label-cmd-input")[0].value = 'FFE';
    $("#row111")[0].getElementsByClassName("instruction-cmd-input")[0].value = 'HEX';
    $("#row111")[0].getElementsByClassName("value-input")[0].value = 'FFE';

    $("#row115")[0].getElementsByClassName("label-cmd-input")[0].value = '';
    $("#row115")[0].getElementsByClassName("instruction-cmd-input")[0].value = 'END';
    $("#row115")[0].getElementsByClassName("value-input")[0].value = '';

}