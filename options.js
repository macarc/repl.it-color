function updateUI(prefs) {
    for (const category in prefs) {
        if (! (prefs.hasOwnProperty(category))) continue;
        for (const attribute in prefs[category]) {
            if (! (prefs[category].hasOwnProperty(attribute))) continue;

            const element = document.getElementById(category).getElementsByClassName(attribute)[0];
            (element.type === 'checkbox') ? element.checked = prefs[category][attribute] : element.value = prefs[category][attribute];

            element.addEventListener('change', function() {
                let newPrefs = JSON.parse(JSON.stringify(prefs));
                newPrefs[category][attribute] = (this.type === 'checkbox') ? this.checked : this.value;
                savePrefs(newPrefs);
                updateUI(newPrefs);
            });
        }
    }
}

document.addEventListener('DOMContentLoaded', async () => {
    const initialCSS = await getPrefs();
    updateUI(initialCSS);

    document.querySelector('#reset').addEventListener('click', () => {
        savePrefs(initialCSS);
        updateUI(initialCSS);
    });
});
