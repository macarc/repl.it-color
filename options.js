function save_prefs() {
    chrome.storage.sync.set({
        mtk1: document.getElementById('mtk1').value,
        mtk4: document.getElementById('mtk4').value,
        mtk5: document.getElementById('mtk5').value,
        mtk6: document.getElementById('mtk6').value,
        mtk7: document.getElementById('mtk7').value,
        mtk8: document.getElementById('mtk8').value,
        mtk9: document.getElementById('mtk9').value,
        bg_col: document.getElementById('bg-col').value,
        hi_col: document.getElementById('hi-col').value,
        line_num: document.getElementById('line-num').value,
    }, _ => {
        document.querySelector('#alert').classList.add('alert-fadeout');
        setTimeout(_ => document.querySelector('#alert').classList.remove('alert-fadeout'), 4000);
    });
}

function load_prefs() {
    chrome.storage.sync.get({
        mtk1: "#ffffff",
        mtk4: "#add8e6",
        mtk5: "#66bdf2",
        mtk6: "#4fb918",
        mtk7: "#646464",
        mtk8: "#d6f619",
        mtk9: "#dfdfdf",
        bg_col: "#000000",
        hi_col: "#8da0f9",
        line_num: "#ffffff"
    }, prefs => {
        document.getElementById('mtk1').value = prefs.mtk1;
        document.getElementById('mtk4').value = prefs.mtk4;
        document.getElementById('mtk5').value = prefs.mtk5;
        document.getElementById('mtk6').value = prefs.mtk6;
        document.getElementById('mtk7').value = prefs.mtk7;
        document.getElementById('mtk8').value = prefs.mtk8;
        document.getElementById('mtk9').value = prefs.mtk9;
        document.getElementById('bg-col').value = prefs.bg_col;
        document.getElementById('hi-col').value = prefs.hi_col;
        document.getElementById('line-num').value = prefs.line_num;
    });
}
document.addEventListener('DOMContentLoaded', _ => {
    load_prefs();
    document.getElementById('save').addEventListener('click',save_prefs);
});

document.querySelector('#reset').addEventListener('click', _ => {
    document.getElementById('mtk1').value = "#ffffff";
    document.getElementById('mtk4').value = "#add8e6";
    document.getElementById('mtk5').value = "#66bdf2";
    document.getElementById('mtk6').value = "#4fb918";
    document.getElementById('mtk7').value = "#646464";
    document.getElementById('mtk8').value = "#d6f619";
    document.getElementById('mtk9').value = "#dfdfdf";
    document.getElementById('bg-col').value = "#000000";
    document.getElementById('hi-col').value = "#8da0f9";
    document.getElementById('line-num').value = "#ffffff";
    document.querySelector('#save').click();
});