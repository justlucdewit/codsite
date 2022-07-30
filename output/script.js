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
    <td>
        <button onclick="window.open('https://github.com/justlucdewit/cod/releases/download/{0}/cod','_blank')">Download</button>
    </td>
    <td class="disabled">
        <button>Download</button>
    </td>
</tr>`

const goToDocs = () => {
    window.location = "./docs.html";
}

const versions = ['v1.1.0', 'v1.0.0'];

const downloadTable = document.getElementById('downloads-table-content');

if (downloadTable !== null) {
    for (const version of versions) {
        downloadTable.innerHTML += downloadTemplate
            .replace(/\{0\}/g, version);
    }
}

const APIURL = "https://api.codlang.com/compile.php"

const compile = async () => {
    // Do post request ot /compile.php
    const code = document.getElementById("editor").value;
    const output = document.getElementById("output");
    const data = new FormData();
    data.append("code", code);
    const response = await (await (fetch(APIURL, {
        method: "POST",
        body: data
    }))).json();

    if (response.success) {
        const codeXResponse = await fetch("https://codlang-api.herokuapp.com/", {
            "credentials": "omit",
            "headers": {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:102.0) Gecko/20100101 Firefox/102.0",
                "Accept": "application/json, text/plain, */*",
                "Accept-Language": "en-US,en;q=0.5",
                "Content-Type": "application/json",
                "Sec-Fetch-Dest": "empty",
                "Sec-Fetch-Mode": "cors",
                "Sec-Fetch-Site": "cross-site",
                "Sec-GPC": "1"
            },
            "referrer": "https://codex.jaagrav.in/",
            "body": JSON.stringify({
                "code": response.compilerOutput,
                "language": "c",
                "input": ""
            }),
            "method": "POST",
            "mode": "cors"
        });

        const codeXResponseJson = await codeXResponse.json();

        output.innerHTML  = `<span>${codeXResponseJson.output.replace(/\n/g, '<br />')}</span>`;
    } else {
        // Display error in red
        output.innerHTML = `<span style="color: red">Compilation error</span>`;
    }
}