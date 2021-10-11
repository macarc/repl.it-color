const defaultOptions = {
    identifier: { color: '#ffffff', bold: false, italic: false },
    htmlTag: { color: '#add8e6', bold: false, italic: false },
    string: { color: '#66bdf2', bold: false, italic: false },
    number: { color: '#4fb918', bold: false, italic: false },
    comment: { color: '#646464', bold: false, italic: false },
    keyword: { color: '#d6f619', bold: false, italic: false },
    operator: { color: '#dfdfdf', bold: false, italic: false },
    function: { color: '#aaccbb', bold: false, italic: false },
    indent: { color: '#0000ff'},
    background: { background: '#000000' },
    highlight: { background: '#8da0f9', opacity: 0.5 },
    lineNumber: { color: '#ffffff', bold: false, italic: false },
}


async function getPrefs() {
    return new Promise((res, _) => chrome.storage.sync.get(defaultOptions, prefs => res(prefs)));
}

async function savePrefs(prefs) {
    return new Promise((res, _) => chrome.storage.sync.set(prefs, () => res()));
}

function toCSS(obj) {
    /* Converts a { color: xxx, opacity: yyy... } object to css */

    return `
    {
        color: ${obj.color || '#ffffff'};
        opacity: ${obj.opacity || 1.0};
        background: ${obj.background || 'transparent'};
        font-style: ${obj.italic ? 'italic' : 'normal'};
        font-weight: ${obj.bold ? 'bold' : 'normal'};
    }`;
}

