// Render the markdowns
const markdowns = document.getElementsByClassName("render-md");
const md = new markdownit();

[...markdowns].forEach(markdown => {
    console.log(markdown.innerHTML)
    const mdres = md.render(markdown.innerHTML.replace(/\&gt\;/g, ">"));
    markdown.innerHTML = mdres;
});