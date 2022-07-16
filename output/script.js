// Render the markdowns
const markdowns = document.getElementsByClassName("render-md");
const md = new markdownit();

[...markdowns].forEach(markdown => {
    const mdres = md.render(markdown.innerHTML.replace(/\&gt\;/g, ">"));
    markdown.innerHTML = mdres;
});

const downloadTemplate = `
<tr>
    <td>Version {0}</td>
    <td>
        <button onclick="window.open('https://github.com/justlucdewit/cod/archive/refs/tags/{0}.zip','_blank')">Download</button>
    </td>
    <td>
        <button onclick="window.open('https://github.com/justlucdewit/cod/releases/download/{0}/cod.exe','_blank')">Download</button>
    </td>
    <td class="disabled">
        <button>Download</button>
    </td>
    <td class="disabled">
        <button>Download</button>
    </td>
</tr>`

const goToDocs = () => {
    window.location = "./docs.html";
}

const versions = ['v1.0.0'];

const downloadTable = document.getElementById('downloads-table-content');

if (downloadTable !== null) {
    for (const version of versions) {
        downloadTable.innerHTML += downloadTemplate
            .replace(/\{0\}/g, version);
    }
}

const compile = () => {
    alert('Compilation does not work yet');
}