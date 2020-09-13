// Chrome Extension that allows customisation of the https://www.repl.it color scheme.
// Created by @ArchieMaclean
// July 2019


async function setup() {
    const prefs = await getPrefs();
    const sheet = document.createElement('style');
    const css = `
.mtk1 ${toCSS(prefs.identifier)}
.mtk22 ${toCSS(prefs.identifier)}
.mtk9 ${toCSS(prefs.htmlTag)}
.mtk5, .string ${toCSS(prefs.string)}
.mtk6, .constant, .numeric ${toCSS(prefs.number)}
.mtk7, .mtk8, .comment ${toCSS(prefs.comment)}
.mtk4, .keyword ${toCSS(prefs.keyword)}
.mtk12, .punctuation, .operator ${toCSS(prefs.operator)}
.function ${toCSS(prefs.function)}

.view-lines, .margin-view-overlays, .margin-view-overlays *, .current-line-margin ${toCSS(prefs.background)}

.selected-text ${toCSS(prefs.highlight)}
.line-numbers ${toCSS(prefs.lineNumber)}

/* Deal with Selection */
.cslr.monaco-editor-background {
    background: transparent;
    z-index: 2;
}
.view-line {
    z-index: 3;
}

.selected-text {
    z-index: 1;
}
.squiggly-error {
    z-index: 5;
}
    `;
    const styles = css.replace(/;/g,' !important;')
    console.log(`repl.it-color is applying the following CSS: 
${styles}`);
    sheet.innerHTML = styles;
    document.body.appendChild(sheet);
}

setup();
console.log('%c Thank you for using repl.it color!','background: yellow; color: black; padding: .5em; border-radius: 0.2em; font-family: Roboto; font-size: 1.5em;')
