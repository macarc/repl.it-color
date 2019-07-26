let editor;
let initial_css;
let first_css;

const colors = {
    'identifier': '#fff',
    'html-attribute': '#add8e6',
    'string': '#66bdf2',
    'number': '#4fb918',
    'comment': '#646464',
    'keyword': '#d6f619',
    'operator': '#dfdfdf',
    'background': '#000',
    'highlight': '#8da0f9',
    'line-number': '#fff'
}

const color_names = {"aliceblue":"#f0f8ff","antiquewhite":"#faebd7","aqua":"#00ffff","aquamarine":"#7fffd4","azure":"#f0ffff",
    "beige":"#f5f5dc","bisque":"#ffe4c4","black":"#000000","blanchedalmond":"#ffebcd","blue":"#0000ff","blueviolet":"#8a2be2","brown":"#a52a2a","burlywood":"#deb887",
    "cadetblue":"#5f9ea0","chartreuse":"#7fff00","chocolate":"#d2691e","coral":"#ff7f50","cornflowerblue":"#6495ed","cornsilk":"#fff8dc","crimson":"#dc143c","cyan":"#00ffff",
    "darkblue":"#00008b","darkcyan":"#008b8b","darkgoldenrod":"#b8860b","darkgray":"#a9a9a9","darkgreen":"#006400","darkkhaki":"#bdb76b","darkmagenta":"#8b008b","darkolivegreen":"#556b2f",
    "darkorange":"#ff8c00","darkorchid":"#9932cc","darkred":"#8b0000","darksalmon":"#e9967a","darkseagreen":"#8fbc8f","darkslateblue":"#483d8b","darkslategray":"#2f4f4f","darkturquoise":"#00ced1",
    "darkviolet":"#9400d3","deeppink":"#ff1493","deepskyblue":"#00bfff","dimgray":"#696969","dodgerblue":"#1e90ff",
    "firebrick":"#b22222","floralwhite":"#fffaf0","forestgreen":"#228b22","fuchsia":"#ff00ff",
    "gainsboro":"#dcdcdc","ghostwhite":"#f8f8ff","gold":"#ffd700","goldenrod":"#daa520","gray":"#808080","green":"#008000","greenyellow":"#adff2f",
    "honeydew":"#f0fff0","hotpink":"#ff69b4",
    "indianred ":"#cd5c5c","indigo":"#4b0082","ivory":"#fffff0","khaki":"#f0e68c",
    "lavender":"#e6e6fa","lavenderblush":"#fff0f5","lawngreen":"#7cfc00","lemonchiffon":"#fffacd","lightblue":"#add8e6","lightcoral":"#f08080","lightcyan":"#e0ffff","lightgoldenrodyellow":"#fafad2",
    "lightgrey":"#d3d3d3","lightgreen":"#90ee90","lightpink":"#ffb6c1","lightsalmon":"#ffa07a","lightseagreen":"#20b2aa","lightskyblue":"#87cefa","lightslategray":"#778899","lightsteelblue":"#b0c4de",
    "lightyellow":"#ffffe0","lime":"#00ff00","limegreen":"#32cd32","linen":"#faf0e6",
    "magenta":"#ff00ff","maroon":"#800000","mediumaquamarine":"#66cdaa","mediumblue":"#0000cd","mediumorchid":"#ba55d3","mediumpurple":"#9370d8","mediumseagreen":"#3cb371","mediumslateblue":"#7b68ee",
    "mediumspringgreen":"#00fa9a","mediumturquoise":"#48d1cc","mediumvioletred":"#c71585","midnightblue":"#191970","mintcream":"#f5fffa","mistyrose":"#ffe4e1","moccasin":"#ffe4b5",
    "navajowhite":"#ffdead","navy":"#000080",
    "oldlace":"#fdf5e6","olive":"#808000","olivedrab":"#6b8e23","orange":"#ffa500","orangered":"#ff4500","orchid":"#da70d6",
    "palegoldenrod":"#eee8aa","palegreen":"#98fb98","paleturquoise":"#afeeee","palevioletred":"#d87093","papayawhip":"#ffefd5","peachpuff":"#ffdab9","peru":"#cd853f","pink":"#ffc0cb","plum":"#dda0dd","powderblue":"#b0e0e6","purple":"#800080",
    "rebeccapurple":"#663399","red":"#ff0000","rosybrown":"#bc8f8f","royalblue":"#4169e1",
    "saddlebrown":"#8b4513","salmon":"#fa8072","sandybrown":"#f4a460","seagreen":"#2e8b57","seashell":"#fff5ee","sienna":"#a0522d","silver":"#c0c0c0","skyblue":"#87ceeb","slateblue":"#6a5acd","slategray":"#708090","snow":"#fffafa","springgreen":"#00ff7f","steelblue":"#4682b4",
    "tan":"#d2b48c","teal":"#008080","thistle":"#d8bfd8","tomato":"#ff6347","turquoise":"#40e0d0",
    "violet":"#ee82ee",
    "wheat":"#f5deb3","white":"#ffffff","whitesmoke":"#f5f5f5",
    "yellow":"#ffff00","yellowgreen":"#9acd32"};

function save_prefs() {
    update_colors_from_ui();
    chrome.storage.sync.set({
        css: editor.getValue(),
    }, _ => {
        initial_css = editor.getValue();
        document.querySelector('#alert').classList.add('alert-fadeout');
        setTimeout(_ => document.querySelector('#alert').classList.remove('alert-fadeout'), 4000);
    });
}

function load_prefs() {
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
        editor.setValue(prefs.css);
        editor.session.setValue(prefs.css);
        initial_css = prefs.css;
        first_css = initial_css;
        document.getElementById('mtk1').value = /color\s*:\s*(.*?);/.exec(/\.identifier\s*\{(\n|.)*?\}/.exec(prefs.css))[1];
        document.getElementById('mtk4').value = /color\s*:\s*(.*?);/.exec(/\.html-attribute\s*\{(\n|.)*?\}/.exec(prefs.css))[1];
        document.getElementById('mtk5').value = /color\s*:\s*(.*?);/.exec(/\.string\s*\{(\n|.)*?\}/.exec(prefs.css))[1];
        document.getElementById('mtk6').value = /color\s*:\s*(.*?);/.exec(/\.number\s*\{(\n|.)*?\}/.exec(prefs.css))[1];
        document.getElementById('mtk7').value = /color\s*:\s*(.*?);/.exec(/\.comment\s*\{(\n|.)*?\}/.exec(prefs.css))[1];
        document.getElementById('mtk8').value = /color\s*:\s*(.*?);/.exec(/\.keyword\s*\{(\n|.)*?\}/.exec(prefs.css))[1];
        document.getElementById('mtk9').value = /color\s*:\s*(.*?);/.exec(/\.operator\s*\{(\n|.)*?\}/.exec(prefs.css))[1];
        document.getElementById('bg-col').value = /background\s*:\s*(.*?);/.exec(/\.background\s*\{(\n|.)*?\}/.exec(prefs.css))[1];
        document.getElementById('hi-col').value = /background\s*:\s*(.*?);/.exec(/\.highlight\s*\{(\n|.)*?\}/.exec(prefs.css))[1];
        document.getElementById('line-num').value = /color\s*:\s*(.*?);/.exec(/\.line-number\s*\{(\n|.)*?\}/.exec(prefs.css))[1];
        update_colors_from_ui();
    });
}
document.addEventListener('DOMContentLoaded', _ => {
    editor = ace.edit('css-editor');
    editor.setTheme('ace/theme/solarized_dark');
    editor.session.setMode('ace/mode/css');
    editor.setOptions({
        fontSize: '1.5rem'
    });
    document.querySelector('#editor-container').style.display = 'none';
    load_prefs();
    document.getElementById('save').addEventListener('click',save_prefs);
    document.querySelector('#toggle-editor').addEventListener('click', _ => document.querySelector('#editor-container').style.display = 'block');
    document.querySelector('#discard').addEventListener('click', _ => {
        document.querySelector('#editor-container').style.display = 'none';
        editor.setValue(initial_css);
    });
    document.querySelector('#close-save').addEventListener('click', _ => {
        document.querySelector('#editor-container').style.display = 'none';
        document.querySelector('#save').click();
        initial_css = editor.getValue();
        update_colors_from_text_editor();
    });
    [...document.querySelectorAll('input')].forEach(input => input.addEventListener('change',update_colors_from_ui));

    document.querySelector('#reset').addEventListener('click', _ => {
        initial_css = first_css;
        editor.setValue(initial_css);
        update_colors_from_text_editor();
    })
});

const update_colors_from_text_editor = () => {
    for (const col in colors) {
        if (colors.hasOwnProperty(col)) {
            const css = new RegExp(`\\.${col}\\s*\\{((.|\\n)*?)\\}`);
            let color;
            if (!(['background','highlight'].includes(col))) color = /color\s*:\s*(.*?);/.exec(css.exec(initial_css)[1]);
            else color = /background\s*:\s*(.*?);/.exec(css.exec(initial_css)[1]);
            if (color != null) {
                color = color[1];
                if (color_names[color] != null) {
                    color = color_names[color];
                } else if (color.length != 7) {
                    color = `#${color[1]}0${color[2]}0${color[3]}0`;
                }
                colors[col] = color;
            }
        }
    }
    document.getElementById('mtk1').value = colors['identifier'];
    document.getElementById('mtk4').value = colors['html-attribute'];
    document.getElementById('mtk5').value = colors['string'];
    document.getElementById('mtk6').value = colors['number'];
    document.getElementById('mtk7').value = colors['comment'];
    document.getElementById('mtk8').value = colors['keyword'];
    document.getElementById('mtk9').value = colors['operator'];
    document.getElementById('bg-col').value = colors['background'];
    document.getElementById('hi-col').value = colors['highlight'];
    document.getElementById('line-num').value = colors['line-number'];
}

const update_colors_from_ui = () => {
    initial_css = editor.getValue();
    colors['identifier'] = document.getElementById('mtk1').value;
    colors['html-attribute'] = document.getElementById('mtk4').value;
    colors['string'] = document.getElementById('mtk5').value;
    colors['number'] = document.getElementById('mtk6').value;
    colors['comment'] = document.getElementById('mtk7').value;
    colors['keyword'] = document.getElementById('mtk8').value;
    colors['operator'] = document.getElementById('mtk9').value;
    colors['background'] = document.getElementById('bg-col').value;
    colors['highlight'] = document.getElementById('hi-col').value;
    colors['line-number'] = document.getElementById('line-num').value;
    for (const col in colors) {
        if (colors.hasOwnProperty(col)) {
            const regex = new RegExp(`\\.${col}\\s*\\{((.|\\n)*?)\\}`);
            const old_css = regex.exec(initial_css)[0];
            let css = old_css;
            if (!(['background','highlight'].includes(col))) {
                css = css.replace(/color\s*:\s*(.*?);/,`color: ${colors[col]};`);
            } else {
                css = css.replace(/background\s*:\s*(.*?);/,`background: ${colors[col]};`);
            }
            initial_css = initial_css.replace(old_css,css);
        }
    }
    editor.setValue(initial_css);
}