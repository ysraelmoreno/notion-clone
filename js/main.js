let titleHeader = document.getElementById('title-header');
let titleInput = document.getElementById('title');
let subtitleInput = document.getElementById('subtitle');
let post = document.getElementById('post')
let texts = document.querySelectorAll('.text-editable');

let editableDiv = [];
let text = [];

function uploadLines(targetedDiv) {
    let lastText = texts[texts.length - 1];

    if(lastText.innerText === "") {
        return;
    }

    text.push(lastText.innerText)
    appendDiv(targetedDiv.id);
}



Array.from(texts).forEach(element => {
    element.addEventListener('keydown', ev => {
        console.log(ev)
        appendDiv(ev.target)
    })
})

function insertAfter(referenceNode, newNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

function appendDiv(divTarget) {
    setTimeout(() => {
            let div = document.createElement('div');
            let lastDiv = document.getElementById(divTarget);

            console.log(lastDiv)

            div.className = `text-editable `;
            div.setAttribute('contenteditable', "true")
            div.setAttribute('data-placeholder', "Edit me");
            div.id = md5(Math.random());

            editableDiv.push(div)

            if(lastDiv) {
                lastDiv.parentNode.insertBefore(div, lastDiv.nextSibling)
                console.log("True")
            } else {
                console.log("False")
                post.appendChild(div)
            }

            div.addEventListener('keydown', ev => {
                let divFocus = Array.from(texts).filter(element => {
                    if(ev.target.id === element.id) {
                        return element;
                    }
                });

                let beforeDiv = document.getElementById(divFocus.map(element => {
                    return element.id
                }));

                if(ev.key === "Enter") {
                    let regex = /\/h[1-6]/gm;
                    if(regex.test(ev.target.innerText)) {
                        console.log(regex.test(ev.target.innerText))
                        switch (ev.target.innerText) {
                            case "/h1":
                                div.className = "heading1"
                                div.innerText =""
                                break;
                            case "/h2":
                                div.className = "heading2"
                                div.innerText =""
                                break;
                            case "/h3":
                                div.className = "heading3"
                                div.innerText =""
                                break;
                            case "/h4":
                                div.className = "heading4"
                                div.innerText =""
                                break;

                            default:
                                break;
                        }
                    }
                    uploadLines(beforeDiv);
                    ev.preventDefault();
                }





            })
            div.focus();
            texts = document.querySelectorAll('.text-editable');



    }, 100)
}


titleInput.addEventListener('keydown', ev => {
    if(ev.key === "Enter") {
        ev.preventDefault();
        subtitleInput.focus();
    }
})

subtitleInput.addEventListener('keydown', ev => {
    if(ev.key === "Enter") {
        ev.preventDefault();
        appendDiv();
    }
})


