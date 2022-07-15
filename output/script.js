// Render the markdowns
const markdowns = document.getElementsByClassName("render-md");
const md = new markdownit();

[...markdowns].forEach(markdown => {
    console.log(markdown.innerHTML)
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

const versions = ['v1.0.0'];

for (const version of versions) {
    const downloadTable = document.getElementById('downloads-table-content');
    downloadTable.innerHTML += downloadTemplate
        .replace(/\{0\}/g, version);
}