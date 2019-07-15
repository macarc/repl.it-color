// Chrome Extension that allows customisation of the https://www.repl.it color scheme.
// Created by @ArchieMaclean
// July 2019


/*
Span color classes for dark theme:

.mtk1: identifier
.mtk4: html attribute
.mtk5: string
.mtk6: number
.mtk7: comment
.mtk8: keyword (e.g. function, class, return)
.mtk9: operator (=,(,)) in some langs
.mtk22: function/class name, in Node

*/


function setup() {
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
        const sheet = document.createElement('style');
        const style  =`
        .mtk1 {
            color: ${prefs.mtk1}  !important;
        }
        .mtk4 {
            color: ${prefs.mtk4}  !important;
        }
        .mtk5 {
            color: ${prefs.mtk5}  !important;
        }
        .mtk6 {
            color: ${prefs.mtk6}  !important;
        }
        .mtk7 {
            color: ${prefs.mtk7}    !important;
        }
        .mtk8 {
            color: ${prefs.mtk8}  !important;
        }
        .mtk9 {
            color: ${prefs.mtk9}  !important;
        }
        .mtk22 {
            color: ${prefs.mtk1}  !important;
        }
        .view-lines {
            background: ${prefs.bg_col}   !important;
        }
        .margin-view-overlays, .margin-view-overlays ~ * {
            background: ${prefs.bg_col}   !important;
        }
        .current-line-margin {
            background: ${prefs.bg_col}     !important;
        }
        .selected-text {
            background: ${prefs.hi_col}   !important;
            opacity: 0.5    !important;
        }
        .line-numbers {
            color: ${prefs.line_num}    !important;
        }

        /* Deal with Selection */
        .cslr.monaco-editor-background {
            background: ${prefs.bg_col} !important;
            z-index: 2  !important;
        }
        .view-line {
            z-index: 3  !important;
        }
        
        .selected-text {
            z-index: 1   !important;
        }
        `
        sheet.innerHTML = style;
        document.body.appendChild(sheet);
    });
}

setup();
console.log('%c Thank you for using repl.it color!','background: yellow; color: black; padding: .5em; border-radius: 0.2em; font-family: Roboto; font-size: 1.5em;')