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
        css: `.identifier {
    color: #fff;
}
.html-attribute {
    color: #add8e6;
}
.string {
    color: #66bdf2;
}
.number {
    color: #4fb918;
}
.comment {
    color: #646464;
}
.keyword {
    color: #d6f619; 
}
.operator {
    color: #dfdfdf;
}
.line-number {
    color: #fff;
}
.background {
    background: #000;
}
.highlight {
    background: #8da0f9;
    opacity: 0.5;
}`,
    }, prefs => { 
        const sheet = document.createElement('style');
        let css = prefs.css;

        /* Fix the CSS */
        css = css.replace('.identifier','.mtk1');
        css = css.replace('.html-attribute','.mtk4');
        css = css.replace('.string','.mtk5');
        css = css.replace('.number','.mtk6')
        css = css.replace('.comment','.mtk7');
        css = css.replace('.keyword','.mtk8');
        css = css.replace('.operator','.mtk9')
        css = css.replace('.line-number','.line-numbers');
        css = css.concat(/\.mtk1\s*\{((.|\n)*?)\}/.exec(css)[0].replace('.mtk1','.mtk22'));
        css = css.replace('.highlight','.selected-text');
        const bg_css = /\.background\s*\{((.|\n)*?)\}/.exec(css)[1];
        css = css.concat(`
.view-lines {${bg_css}}
.margin-view-overlays, .margin-view-overlays * {${bg_css}}
.current-line-margin {${bg_css}}
        `);
        const bg_col = /background:\s*.*?;/.exec(bg_css);
        css = css.concat(`
/* Deal with Selection */
.cslr.monaco-editor-background {
    ${bg_col}
    z-index: 2;
}
.view-line {
    z-index: 3;
}

.selected-text {
    z-index: 1;
}
        `);
        css = css.replace(/;/g,' !important;')
        console.log(`repl.it-color is applying the following CSS: 
${css}`);
        sheet.innerHTML = css;
        document.body.appendChild(sheet);
    });
}

setup();
console.log('%c Thank you for using repl.it color!','background: yellow; color: black; padding: .5em; border-radius: 0.2em; font-family: Roboto; font-size: 1.5em;')