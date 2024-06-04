
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
    $("#row102")[0].getElementsByClassName("instruction-cmd-input")[0].value = 'ADD';
    $("#row102")[0].getElementsByClassName("value-input")[0].value = 'VAL';

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
    $("#row107")[0].getElementsByClassName("instruction-cmd-input")[0].value = 'CMA';
    $("#row107")[0].getElementsByClassName("value-input")[0].value = '';

    $("#row108")[0].getElementsByClassName("label-cmd-input")[0].value = '';
    $("#row108")[0].getElementsByClassName("instruction-cmd-input")[0].value = 'SNA';
    $("#row108")[0].getElementsByClassName("value-input")[0].value = '';

    $("#row109")[0].getElementsByClassName("label-cmd-input")[0].value = '';
    $("#row109")[0].getElementsByClassName("instruction-cmd-input")[0].value = 'INC';
    $("#row109")[0].getElementsByClassName("value-input")[0].value = '';

    $("#row10A")[0].getElementsByClassName("label-cmd-input")[0].value = '';
    $("#row10A")[0].getElementsByClassName("instruction-cmd-input")[0].value = 'LDA';
    $("#row10A")[0].getElementsByClassName("value-input")[0].value = 'NUM';

    $("#row10B")[0].getElementsByClassName("label-cmd-input")[0].value = '';
    $("#row10B")[0].getElementsByClassName("instruction-cmd-input")[0].value = 'CIL';
    $("#row10B")[0].getElementsByClassName("value-input")[0].value = '';

    $("#row10C")[0].getElementsByClassName("label-cmd-input")[0].value = '';
    $("#row10C")[0].getElementsByClassName("instruction-cmd-input")[0].value = 'AND';
    $("#row10C")[0].getElementsByClassName("value-input")[0].value = 'MSK';

    $("#row10D")[0].getElementsByClassName("label-cmd-input")[0].value = '';
    $("#row10D")[0].getElementsByClassName("instruction-cmd-input")[0].value = 'STA';
    $("#row10D")[0].getElementsByClassName("value-input")[0].value = 'STR';

    $("#row10E")[0].getElementsByClassName("label-cmd-input")[0].value = '';
    $("#row10E")[0].getElementsByClassName("instruction-cmd-input")[0].value = 'HLT';
    $("#row10E")[0].getElementsByClassName("value-input")[0].value = '';
    
    $("#row112")[0].getElementsByClassName("label-cmd-input")[0].value = 'STR';
    $("#row112")[0].getElementsByClassName("instruction-cmd-input")[0].value = 'HEX';
    $("#row112")[0].getElementsByClassName("value-input")[0].value = '0';

    $("#row115")[0].getElementsByClassName("label-cmd-input")[0].value = 'NUM';
    $("#row115")[0].getElementsByClassName("instruction-cmd-input")[0].value = 'HEX';
    $("#row115")[0].getElementsByClassName("value-input")[0].value = '1234';

    $("#row116")[0].getElementsByClassName("label-cmd-input")[0].value = 'MSK';
    $("#row116")[0].getElementsByClassName("instruction-cmd-input")[0].value = 'HEX';
    $("#row116")[0].getElementsByClassName("value-input")[0].value = '00FF';

    $("#row117")[0].getElementsByClassName("label-cmd-input")[0].value = 'VAL';
    $("#row117")[0].getElementsByClassName("instruction-cmd-input")[0].value = 'HEX';
    $("#row117")[0].getElementsByClassName("value-input")[0].value = '23';

    $("#row118")[0].getElementsByClassName("label-cmd-input")[0].value = '';
    $("#row118")[0].getElementsByClassName("instruction-cmd-input")[0].value = 'END';
    $("#row118")[0].getElementsByClassName("value-input")[0].value = '';
}


function prog2() {
    let cmdContainer = $("#cmd-container");
    cmdContainer[0].innerHTML = "";
    rowCtr = 256;
    cmdContainer[0].appendChild(title);
    for (let i = 0; i < 18; i++) addCmdRow();
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

    $("#row107")[0].getElementsByClassName("label-cmd-input")[0].value = 'NUM';
    $("#row107")[0].getElementsByClassName("instruction-cmd-input")[0].value = 'HEX';
    $("#row107")[0].getElementsByClassName("value-input")[0].value = 'FFFA';

    $("#row109")[0].getElementsByClassName("label-cmd-input")[0].value = 'JMP';
    $("#row109")[0].getElementsByClassName("instruction-cmd-input")[0].value = 'HEX';
    $("#row109")[0].getElementsByClassName("value-input")[0].value = '0000';

    $("#row10A")[0].getElementsByClassName("label-cmd-input")[0].value = '';
    $("#row10A")[0].getElementsByClassName("instruction-cmd-input")[0].value = 'ISZ';
    $("#row10A")[0].getElementsByClassName("value-input")[0].value = 'NUM';

    $("#row10B")[0].getElementsByClassName("label-cmd-input")[0].value = '';
    $("#row10B")[0].getElementsByClassName("instruction-cmd-input")[0].value = 'BUN';
    $("#row10B")[0].getElementsByClassName("value-input")[0].value = 'JMP';

    $("#row10C")[0].getElementsByClassName("label-cmd-input")[0].value = '';
    $("#row10C")[0].getElementsByClassName("instruction-cmd-input")[0].value = 'BUN';
    $("#row10C")[0].getElementsByClassName("value-input")[0].value = 'JMP I';

    $("#row111")[0].getElementsByClassName("label-cmd-input")[0].value = '';
    $("#row111")[0].getElementsByClassName("instruction-cmd-input")[0].value = 'END';
    $("#row111")[0].getElementsByClassName("value-input")[0].value = '';

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
    $("#row10B")[0].getElementsByClassName("value-input")[0].value = 'ZER I';

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
    $("#row117")[0].getElementsByClassName("value-input")[0].value = '116';

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
    $("#row102")[0].getElementsByClassName("instruction-cmd-input")[0].value = 'CME';
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
    $("#row107")[0].getElementsByClassName("value-input")[0].value = '000';

    $("#row108")[0].getElementsByClassName("label-cmd-input")[0].value = '';
    $("#row108")[0].getElementsByClassName("instruction-cmd-input")[0].value = 'HEX';
    $("#row108")[0].getElementsByClassName("value-input")[0].value = '000';

    $("#row109")[0].getElementsByClassName("label-cmd-input")[0].value = 'NXT';
    $("#row109")[0].getElementsByClassName("instruction-cmd-input")[0].value = 'SZE';
    $("#row109")[0].getElementsByClassName("value-input")[0].value = '';

    $("#row10A")[0].getElementsByClassName("label-cmd-input")[0].value = '';
    $("#row10A")[0].getElementsByClassName("instruction-cmd-input")[0].value = 'CMA';
    $("#row10A")[0].getElementsByClassName("value-input")[0].value = '';

    $("#row10B")[0].getElementsByClassName("label-cmd-input")[0].value = '';
    $("#row10B")[0].getElementsByClassName("instruction-cmd-input")[0].value = 'STA';
    $("#row10B")[0].getElementsByClassName("value-input")[0].value = 'SV I';

    $("#row10C")[0].getElementsByClassName("label-cmd-input")[0].value = '';
    $("#row10C")[0].getElementsByClassName("instruction-cmd-input")[0].value = 'CLA';
    $("#row10C")[0].getElementsByClassName("value-input")[0].value = '';

    $("#row10D")[0].getElementsByClassName("label-cmd-input")[0].value = '';
    $("#row10D")[0].getElementsByClassName("instruction-cmd-input")[0].value = 'HLT';
    $("#row10D")[0].getElementsByClassName("value-input")[0].value = '';

    $("#row110")[0].getElementsByClassName("label-cmd-input")[0].value = 'SV';
    $("#row110")[0].getElementsByClassName("instruction-cmd-input")[0].value = 'HEX';
    $("#row110")[0].getElementsByClassName("value-input")[0].value = '000';

    $("#row111")[0].getElementsByClassName("label-cmd-input")[0].value = 'ZER';
    $("#row111")[0].getElementsByClassName("instruction-cmd-input")[0].value = 'HEX';
    $("#row111")[0].getElementsByClassName("value-input")[0].value = '105';

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
    $("#row100")[0].getElementsByClassName("value-input")[0].value = 'NUM';
    
    $("#row101")[0].getElementsByClassName("label-cmd-input")[0].value = 'CIF';
    $("#row101")[0].getElementsByClassName("instruction-cmd-input")[0].value = 'SKI';
    $("#row101")[0].getElementsByClassName("value-input")[0].value = '';

    $("#row102")[0].getElementsByClassName("label-cmd-input")[0].value = '';
    $("#row102")[0].getElementsByClassName("instruction-cmd-input")[0].value = 'BUN';
    $("#row102")[0].getElementsByClassName("value-input")[0].value = 'CIF';

    $("#row103")[0].getElementsByClassName("label-cmd-input")[0].value = '';
    $("#row103")[0].getElementsByClassName("instruction-cmd-input")[0].value = 'INP';
    $("#row103")[0].getElementsByClassName("value-input")[0].value = '';

    $("#row104")[0].getElementsByClassName("label-cmd-input")[0].value = '';
    $("#row104")[0].getElementsByClassName("instruction-cmd-input")[0].value = 'BSA';
    $("#row104")[0].getElementsByClassName("value-input")[0].value = 'STR';

    $("#row105")[0].getElementsByClassName("label-cmd-input")[0].value = 'COF';
    $("#row105")[0].getElementsByClassName("instruction-cmd-input")[0].value = 'SKO';
    $("#row105")[0].getElementsByClassName("value-input")[0].value = '';

    $("#row106")[0].getElementsByClassName("label-cmd-input")[0].value = '';
    $("#row106")[0].getElementsByClassName("instruction-cmd-input")[0].value = 'BUN';
    $("#row106")[0].getElementsByClassName("value-input")[0].value = 'COF';

    $("#row107")[0].getElementsByClassName("label-cmd-input")[0].value = '';
    $("#row107")[0].getElementsByClassName("instruction-cmd-input")[0].value = 'OUT';
    $("#row107")[0].getElementsByClassName("value-input")[0].value = '';

    $("#row108")[0].getElementsByClassName("label-cmd-input")[0].value = '';
    $("#row108")[0].getElementsByClassName("instruction-cmd-input")[0].value = 'HLT';
    $("#row108")[0].getElementsByClassName("value-input")[0].value = '';

    $("#row109")[0].getElementsByClassName("label-cmd-input")[0].value = '';
    $("#row109")[0].getElementsByClassName("instruction-cmd-input")[0].value = '';
    $("#row109")[0].getElementsByClassName("value-input")[0].value = '';

    $("#row10A")[0].getElementsByClassName("label-cmd-input")[0].value = 'ABC';
    $("#row10A")[0].getElementsByClassName("instruction-cmd-input")[0].value = 'HEX';
    $("#row10A")[0].getElementsByClassName("value-input")[0].value = 'FFFF';

    $("#row10B")[0].getElementsByClassName("label-cmd-input")[0].value = 'NUM';
    $("#row10B")[0].getElementsByClassName("instruction-cmd-input")[0].value = 'HEX';
    $("#row10B")[0].getElementsByClassName("value-input")[0].value = '3456';

    $("#row10D")[0].getElementsByClassName("label-cmd-input")[0].value = 'STR';
    $("#row10D")[0].getElementsByClassName("instruction-cmd-input")[0].value = 'HEX';
    $("#row10D")[0].getElementsByClassName("value-input")[0].value = '0';

    $("#row10E")[0].getElementsByClassName("label-cmd-input")[0].value = '';
    $("#row10E")[0].getElementsByClassName("instruction-cmd-input")[0].value = 'LDA';
    $("#row10E")[0].getElementsByClassName("value-input")[0].value = 'ABC';

    $("#row10F")[0].getElementsByClassName("label-cmd-input")[0].value = '';
    $("#row10F")[0].getElementsByClassName("instruction-cmd-input")[0].value = 'INC';
    $("#row10F")[0].getElementsByClassName("value-input")[0].value = '';

    $("#row110")[0].getElementsByClassName("label-cmd-input")[0].value = '';
    $("#row110")[0].getElementsByClassName("instruction-cmd-input")[0].value = 'INC';
    $("#row110")[0].getElementsByClassName("value-input")[0].value = '';

    $("#row111")[0].getElementsByClassName("label-cmd-input")[0].value = '';
    $("#row111")[0].getElementsByClassName("instruction-cmd-input")[0].value = 'CME';
    $("#row111")[0].getElementsByClassName("value-input")[0].value = '';

    $("#row112")[0].getElementsByClassName("label-cmd-input")[0].value = '';
    $("#row112")[0].getElementsByClassName("instruction-cmd-input")[0].value = 'SZE';
    $("#row112")[0].getElementsByClassName("value-input")[0].value = '';

    $("#row113")[0].getElementsByClassName("label-cmd-input")[0].value = '';
    $("#row113")[0].getElementsByClassName("instruction-cmd-input")[0].value = 'INC';
    $("#row113")[0].getElementsByClassName("value-input")[0].value = '';

    $("#row114")[0].getElementsByClassName("label-cmd-input")[0].value = '';
    $("#row114")[0].getElementsByClassName("instruction-cmd-input")[0].value = 'CMA';
    $("#row114")[0].getElementsByClassName("value-input")[0].value = '';

    $("#row115")[0].getElementsByClassName("label-cmd-input")[0].value = '';
    $("#row115")[0].getElementsByClassName("instruction-cmd-input")[0].value = 'LDA';
    $("#row115")[0].getElementsByClassName("value-input")[0].value = 'NUM';

    $("#row116")[0].getElementsByClassName("label-cmd-input")[0].value = '';
    $("#row116")[0].getElementsByClassName("instruction-cmd-input")[0].value = 'BUN';
    $("#row116")[0].getElementsByClassName("value-input")[0].value = 'STR I';

    $("#row118")[0].getElementsByClassName("label-cmd-input")[0].value = '';
    $("#row118")[0].getElementsByClassName("instruction-cmd-input")[0].value = 'END';
    $("#row118")[0].getElementsByClassName("value-input")[0].value = '';

}