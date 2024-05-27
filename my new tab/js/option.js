function set() {
	var url = document.getElementById("url").value
	let element = document.getElementById('selecter');
	var top_or_blank = element.value
	var Custom1 = [url,top_or_blank]
	var option = {
	 	"Custom1" : Custom1
	}
	chrome.storage.local.set(option, function () {
	});
}
function set2() {
	var url = document.getElementById("url2").value
	let element = document.getElementById('selecter2');
	var top_or_blank = element.value
	var Custom2 = [url,top_or_blank]
	var option = {
	 	"Custom2" : Custom2
	}
	chrome.storage.local.set(option, function () {
	});
}
window.onload = function Lord() {
			chrome.storage.local.get(["Custom1","Custom2"], function (value) {
		  console.log(value)
		  document.getElementById("url").value = value.Custom1[0]
		  if (value.Custom1[1] == "_top"){
		  	var i = 0
		  }else {
		  	var i = 1;
		  }
		  document.getElementById("selecter").options[i].selected = true
		  
		  document.getElementById("url2").value = value.Custom2[0]
		  if (value.Custom2[1] == "_top"){
		  	var i = 0
		  }else {
		  	var i = 1;
		  }
		  document.getElementById("selecter2").options[i].selected = true
		});
}

document.getElementById("save").onclick = set
document.getElementById("save2").onclick = set2