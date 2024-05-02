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

// データを取得してHTMLを生成する
function fetchDataAndGenerateHTML() {
  fetch(config.url, config.options)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      data.info.reverse();

      let index = 1;
      for (let entry of data.info) {
        const html = createHTML(entry, index);
        appendHTML(html);
        index += 1;
      }

      hideLoadingScreen();
      applyScrollReveal();
    })
    .catch((error) => {
      console.error("データの取得エラー:", error);
      hideLoadingScreen();
    });
}

// ローディング画面を非表示にする
function hideLoadingScreen() {
  $("#loadingScreen").addClass("hidden").delay(500).remove();
}

// スクロールリベールのアニメーションを適用する
function applyScrollReveal() {
  ScrollReveal().reveal(".bottom", {
    duration: 1600,
    origin: "bottom",
    distance: "50px",
    viewFactor: 0,
    delay: 100,
    reset: false,
  });
}

// ページの読み込み完了時のイベントリスナー
$(document).ready(function() {
  fetchDataAndGenerateHTML();
  console.log("読み込み中");
  try {
    var memo = localStorage.getItem("memo");
    console.log(memo);
  } catch (e) {
    console.error("ローカルストレージのアクセスエラー:", e);
  }
  $(".memo-box").val(memo);

  // 保存ボタンのイベントリスナー
  $(".save").click(function () {
    var memo = $(".memo-box").val();
    localStorage.setItem("memo", memo);
    console.log(memo);
  });
});

// HTML要素を生成する
function createHTML(data, index) {
  const rawContent = data[1].split("\n");
  const [title, content] = [rawContent[0], rawContent.slice(1).join("")];

  const container = $("<div>", {
    class: "option bottom",
    "data-sr-id": index,
    style: {
      visibility: "visible",
      opacity: index,
      transform: "matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)",
      transition:
        "opacity 1.6s cubic-bezier(0.5, 0, 0, 1) 0.1s, transform 1.6s cubic-bezier(0.5, 0, 0, 1) 0.1s",
    },
  });

  const checkbox = $("<input>", {
    type: "checkbox",
    id: `toggle${index}`,
    class: "toggle",
  });

  const label = $("<label>", {
    class: "title",
    for: `toggle${index}`,
  });

  const fromDiv = $("<div>", { class: "from" });
  const faviconImg = $("<img>", {
    class: "favicon",
    src: "https://t3.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://getbootstrap.jp/docs/5.3/components/accordion/&size=16",
  });
  const urlDiv = $("<div>", {
    class: "url",
    text: "https://kokoboard.cloudfree.jp",
  });
  const nameDiv = $("<div>").text(title);
  const contentDiv = $("<div>", { class: "content" });
  const pTag = $("<p>").text(content);

  fromDiv.append(faviconImg, urlDiv);
  label.append(fromDiv, nameDiv);
  contentDiv.append(pTag);
  container.append(checkbox, label, contentDiv);

  return container;
}

// HTMLをページに追加する
function appendHTML(html) {
  $("body > div.info-box").append(html);
}