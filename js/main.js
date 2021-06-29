let titleHeader = document.getElementById("title-header");
let titleInput = document.getElementById("title");
let subtitleInput = document.getElementById("subtitle");
let post = document.getElementById("post");
let texts = document.querySelectorAll(".text-editable");

let editableDiv = [];
let text = [];

function uploadLines(targetedDiv) {
  let lastText = texts[texts.length - 1];

  text.push(lastText.innerText);
  appendDiv(targetedDiv);
}

function insertAfter(referenceNode, newNode) {
  referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

function appendDiv(divTarget) {
  setTimeout(() => {
    let div = document.createElement("div");
    let lastDiv = document.getElementById(divTarget);

    div.className = `text-editable `;
    div.setAttribute("contenteditable", "true");
    div.setAttribute("data-placeholder", "Edit me");
    div.id = md5(Math.random());

    if (lastDiv) {
      lastDiv.parentNode.insertBefore(div, lastDiv.nextSibling);
      console.log("LastDiv:", lastDiv);
      console.log("NextSibling:", lastDiv.nextSibling);
    } else {
      post.appendChild(div);
    }

    editableDiv.push(div);

    div.addEventListener("keydown", (ev) => {
      if (ev.key === " ") {
        let regex = /\/h[1-6]/gm;
        if (regex.test(ev.target.innerText)) {
          switch (ev.target.innerText) {
            case "/h1":
              div.className = "heading1";
              ev.preventDefault();
              div.innerText = "";
              break;

            case "/h2":
              div.className = "heading2";
              ev.preventDefault();
              div.innerText = "";
              break;

            case "/h3":
              div.className = "heading3";
              ev.preventDefault();
              div.innerText = "";
              break;

            case "/h4":
              div.className = "heading4";
              ev.preventDefault();
              div.innerText = "";
              break;

            default:
              break;
          }
        }
      }

      let regexTest = /[a-z]/gm;

      if (regexTest.test(ev.key)) {
        let regex = /\/h[1-6]/gm;
        if (regex.test(ev.target.innerText)) {
          switch (ev.target.innerText) {
            case "/h1":
              div.className = "heading1";
              div.innerText = "";
              break;

            case "/h2":
              div.className = "heading2";
              div.innerText = "";
              break;

            case "/h3":
              div.className = "heading3";
              div.innerText = "";
              break;

            case "/h4":
              div.className = "heading4";
              div.innerText = "";
              break;

            default:
          }
        }
        if (ev.key === "Enter") {
          uploadLines(ev.target.id);
          ev.preventDefault();
        }
      }
    });

    div.focus();
    texts = document.querySelectorAll(".text-editable");
  }, 100);
}

titleInput.addEventListener("keydown", (ev) => {
  if (ev.key === "Enter") {
    ev.preventDefault();
    subtitleInput.focus();
  }
});

subtitleInput.addEventListener("keydown", (ev) => {
  if (ev.key === "Enter") {
    ev.preventDefault();
    appendDiv();
  }
});
