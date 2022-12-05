let input = document.querySelector(".get-repos input"),
    getbtn = document.querySelector(".get-repos .get-button"),
    data = document.querySelector(".show-data");
window.onload = function(){
    input.focus();
}
getbtn.onclick = function (){
    if (input.value === ''){
        data.innerHTML = "<span>Please Write Github Username.</span>";
        input.focus();
    }else {
        fetch(`https://api.github.com/users/${input.value}/repos`)
        .then((response) => {
                return response.json();
            })
        .then((result)=> {
            data.innerHTML = '';
             result.forEach(el => {
                let div = document.createElement("div");
                div.className = "repo-box";
                div.appendChild(document.createTextNode(el.name));
                let link = document.createElement("a");
                link.appendChild(document.createTextNode(el.clone_url));
                link.style = "width: 15ch; overflow: hidden; white-space: nowrap; text-overflow: ellipsis; cursor:pointer"
                link.href = el.clone_url;
                // Open in a New Window 
                link.setAttribute("target", "_blank");
                div.appendChild(link);
                let sp = document.createElement("span");
                sp.appendChild(document.createTextNode(el.language));
                div.appendChild(sp);
                data.appendChild(div);
                input.value = '';
                input.focus();
             });
        });
        };
};
