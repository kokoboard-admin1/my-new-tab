// URLとオプションの設定
const config = {
  url: "https://script.google.com/macros/s/AKfycbz-lBlGKJ0cg0vfIVEW4VGvaQBflwOqkFQ2CPYgr_ij4isD9FZDNRTvXxQSCp9V5mPROw/exec",
  options: {
    method: "POST",
    body: JSON.stringify({
      method: "get_info",
      user: "test",
    }),
    followAllRedirects: true,
  },
};

// HTML要素を生成する関数
function createElement(tag, attributes, ...children) {
  const element = document.createElement(tag);
  for (let key in attributes) {
    element[key] = attributes[key];
  }
  for (let child of children) {
    element.appendChild(child);
  }
  return element;
}

// データからHTMLを生成する関数
function createHTML(data, i) {
  const [title, content] = data[1].split("\n");
  const container = createElement("div", {
    className: "option bottom",
    dataset: { srId: i },
    style: {
      visibility: "visible",
      opacity: i,
      transform: "matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)",
      transition: "opacity 1.6s cubic-bezier(0.5, 0, 0, 1) 0.1s, transform 1.6s cubic-bezier(0.5, 0, 0, 1) 0.1s",
    },
  });
  const checkbox = createElement("input", { type: "checkbox", id: `toggle${i}`, className: "toggle" });
  const label = createElement("label", { className: "title", htmlFor: `toggle${i}` });
  const fromDiv = createElement("div", { className: "from" });
  const faviconImg = createElement("img", {
    className: "favicon",
    src: "https://t3.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://getbootstrap.jp/docs/5.3/components/accordion/&size=16",
  });
  const urlDiv = createElement("div", { className: "url", textContent: "https://kokoboard.cloudfree.jp" });
  const nameDiv = createElement("div", { textContent: title });
  const contentDiv = createElement("div", { className: "content" });
  const pTag = createElement("p", { textContent: content });

  fromDiv.append(faviconImg, urlDiv);
  label.append(fromDiv, nameDiv);
  contentDiv.append(pTag);
  container.append(checkbox, label, contentDiv);

  return container;
}

// ページにHTMLを追加する関数
function appendHTML(html) {
  const target = document.querySelector("body > div.info-box");
  target.appendChild(html);
}

// データをフェッチしてHTMLを生成・追加する関数
function fetchDataAndGenerateHTML() {
  fetch(config.url, config.options)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      data.info.reverse();

      let i = 1;
      for (let entry of data.info) {
        const html = createHTML(entry, i);
        appendHTML(html);
        i += 1;
      }

      const loadingScreen = document.getElementById("loadingScreen");
      loadingScreen.classList.add("hidden");
      setTimeout(() => loadingScreen.remove(), 500);

      ScrollReveal().reveal(".bottom", {
        duration: 1600,
        origin: "bottom",
        distance: "50px",
        viewFactor: 0,
        delay: 100,
        reset: false,
      });
    });
}

window.addEventListener("load", fetchDataAndGenerateHTML);
