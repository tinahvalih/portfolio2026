// header
fetch("header.html")
    .then(response => response.text())
    .then(html => {
        const header = document.createElement("header");
        header.innerHTML = html;
        document.body.insertBefore(header, document.body.firstElementChild);
    });

console.log("Header fetched");
