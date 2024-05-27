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

  //Altキー+エンター
  $(window).keydown(function(e){
    if (event.altKey){
    if(!event.shiftKey){
        if(e.keyCode === 13){
      let out_w1 = window.outerWidth;
      let out_h1 = window.outerHeight;
      //クラスルームを別windowで開く Alt+Enter
      window.open('https://classroom.google.com/', "_blank", `width=${out_w1},height=${out_h1}`);
           return false;
        }else if (e.keyCode === 65){
      let out_w1 = window.outerWidth;
      let out_h1 = window.outerHeight;
      //e-libraryを別windowで開く Alt+a
      window.open('https://accounts.google.com/o/saml2/initsso?idpid=C00y5vesz&spid=95685780693&forceauthn=false', "_blank", `width=${out_w1},height=${out_h1}`);
           return false;
        }else if (e.keyCode === 191){
      let out_w = window.outerWidth;
      let out_h = window.outerHeight;
      //更新内容を別windowで開く alt + /
      window.open("https://script.google.com/macros/s/AKfycbzinxm7hpPxuTtxlWpXjBHPVA2fO1CTU36_0B5_WZ4dq-g1j_k0NX8BrUdqJ4HlYfgyxg/exec?page=更新内容&title=CSK 更新内容", "_blank", `width=${out_w},height=${out_h}`);
           return false;
        }else if (e.keyCode === 72){
      let out_w = window.outerWidth;
      let out_h = window.outerHeight;
      //使い化を別windowで開く alt + h
      window.open("https://script.google.com/macros/s/AKfycbzinxm7hpPxuTtxlWpXjBHPVA2fO1CTU36_0B5_WZ4dq-g1j_k0NX8BrUdqJ4HlYfgyxg/exec?page=使い方&title=CSK 使い方", "_blank", `width=${out_w},height=${out_h}`);
           return false;
        }else if (e.keyCode === 80){
      if (e.keyCode === 81){
      setTimeout(function() {
        if (e.keyCode === 80){
        if (e.keyCode === 81){
          alert("Success")
        }
        }
      }, 1000)
        }
        }
     }
     }
    });
    //Shiftキー+エンター ←今回のやりたかったこと
    $(window).keydown(function(e){
    if (!event.altKey){
      if(event.shiftKey){
        if(e.keyCode === 8){
      let out_w = window.outerWidth;
      let out_h = window.outerHeight;
      //ミライシードを別windowで開く Shift + ⌫
      window.open('https://miraiseed6.benesse.ne.jp/seed/vw020101/displayLogin/j3MRkmdr', "_blank", `width=${out_w},height=${out_h}`);
           return false;
        }
      }
     }
    });
    //Ctrlキー+矢印
    $(window).keydown(function(e){
      if(event.ctrlKey){
        if(e.keyCode === 37){
      //クラスルームを別タブで開く Ctrl + ←
      window.open('https://classroom.google.com/', "_blank");
           return false;
        }else if (e.keyCode === 38){
      //e-libraryを別タブで開く Ctrl + ↑
      window.open('https://accounts.google.com/o/saml2/initsso?idpid=C00y5vesz&spid=95685780693&forceauthn=false', "_blank");
           return false;
        }else if (e.keyCode === 39){
      //ミライシードを別タブで開く Ctrl + →
      window.open('https://miraiseed6.benesse.ne.jp/seed/vw020101/displayLogin/j3MRkmdr', "_blank");
           return false;
        }else if (e.keyCode === 40){
      //Google Apps Scriptを別タブで開く Ctrl + ↓
      window.open('https://script.google.com/home?pli=1', "_blank");
           return false;
        }else if (e.keyCode === 13){
      window.close();
           return false;
        }
      }
    });
    
    //Alt + Shift + Enter
    $(window).keydown(function(e){
      if(event.altKey){
     if(event.shiftKey){
        if(e.keyCode === 13){
      let out_w = window.outerWidth;
      let out_h = window.outerHeight;
      //Googleの新しいタブを開く Alt + Shift + Enter
      window.open('https://www.google.com/?safe=active&ssui=on', "_blank", `width=${out_w},height=${out_h}`);
           return false;
        }else if(e.keyCode === 37){
      //Documentを開く Alt + Shift + ←
      window.open('https://docs.google.com/document/?usp=docs_ald&authuser=0', "_blank");
           return false;
        }else if(e.keyCode === 38){
      //Spreadsheetを開く Alt + Shift + ↑
      window.open('https://docs.google.com/spreadsheets/?usp=sheets_ald&authuser=0', "_blank");
           return false;
        }else if(e.keyCode === 39){
      //Slideを開く Alt + Shift + →
      window.open('https://docs.google.com/presentation/?usp=slides_ald&authuser=0', "_blank");
           return false;
        }else if(e.keyCode === 40){
      //Formsを開く Alt + Shift + ↓
      window.open('https://docs.google.com/forms/?authuser=0', "_blank");
           return false;
        }else if (e.keyCode === 84){
      //新しいタブを同じタブで開く Shift + t
      window.open('https://www.google.com/?safe=active&ssui=on', "_top");
           return false;
        }
      }
     }
    });
  
    $(window).keydown(function(e){
      if(event.altKey) {
    if(!event.shiftKey){
      if (e.keyCode === 77) {
      window.open('https://www.google.com/search?q=%E8%A8%88%E7%AE%97%E6%A9%9F&rlz=1CAJEUV_enJP1000&oq=%E8%A8%88%E7%AE%97%E6%A9%9F&aqs=chrome..69i57j0i131i433l2j0i512l6.3974j0j7&sourceid=chrome&ie=UTF-8&safe=active&ssui=on', "_blank")
      }else if (e.keyCode === 84) {
      window.open('https://translate.google.com/?lfhs=2', "_blank")
      }else if (e.keyCode === 67) {
      chrome.storage.local.get("Custom1", function (value) {
      console.log("Success")
        var url = value.Custom1[0]
        var option = value.Custom1[1]
      window.open(url, option)
        })
      }else if (e.keyCode === 75) {
      chrome.storage.local.get("Custom2", function (value) {
      console.log("Success")
        var url = value.Custom2[0]
        var option = value.Custom2[1]
      window.open(url, option)
        })
      }
    }
    }
    });
  
  