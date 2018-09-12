"use strict";

function fetchPost(self) {

  var submitButton = document.querySelector('.submit');
  var inputUrl = document.getElementById('post_url').value;
  if (inputUrl === "") {
    console.log(`You didn't enter a URL.`);
  } else {
    var spinner = document.querySelector('.loading');
    spinner.style.display = "block";
    var idFromInput = inputUrl.substr(inputUrl.indexOf('p/') + 2);
    var xmlhttp;
    console.log(idFromInput);

    var url = "/p/" + idFromInput;

    if (window.XMLHttpRequest) {
      // code for IE7+, Firefox, Chrome, Opera, Safari
      xmlhttp = new XMLHttpRequest();
    } else {
      // code for IE6, IE5
      xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.addEventListener("load", transferComplete);
    xmlhttp.addEventListener("error", transferFailed);
    xmlhttp.addEventListener("abort", transferCanceled);

    xmlhttp.open("get", url, true);
    xmlhttp.send();

    // return xmlhttp.responseText;

    function transferComplete(evt) {
      console.log("The transfer is complete.");
      console.log(JSON.parse(xmlhttp.response));
      buildResult(JSON.parse(xmlhttp.response))
    }

    function transferFailed(evt) {
      console.log("An error occurred while transferring the file.");
    }

    function transferCanceled(evt) {
      console.log("The transfer has been canceled by the user.");
    }

  }

  function buildResult(obj) {
    let postStatusHolder = document.getElementById('postStatusHolder');
    let postMessageHolder = document.getElementById('postMessageHolder');
    let postTypeHolder = document.getElementById('postTypeHolder');
    let userIDholder = document.getElementById('userIDholder');
    let rawURLsholder = document.getElementById('rawURLsholder');
    let postDescHolder = document.getElementById('postDescHolder');
    let postLikesHolder = document.getElementById('postLikesHolder');
    let postVideoLikesHolder = document.getElementById('postVideoLikesHolder');
    let postVideoViewsHolder = document.getElementById('postVideoViewsHolder');

    postStatusHolder.textContent = obj.STATUS;
    postMessageHolder.textContent = obj.MESSAGE

    if (obj.STATUS === "OK") {
      postTypeHolder.textContent = obj.TYPE;
      userIDholder.textContent = obj.USERNAME;
      let urlsDOM = '';
      for (var i = 0; i < obj.URL.length; i++) {
        urlsDOM += `<span><a class="buttonDownload" href="${obj.URL[i]}" target="_blank">Download ${i + 1}</a></span>&nbsp;&nbsp;`
      }
      rawURLsholder.innerHTML = urlsDOM;
      postDescHolder.textContent = obj.DESCRIPTION;
      postLikesHolder.textContent = obj.IMAGE_LIKES;
      postVideoLikesHolder.textContent = obj.VIDEO_LIKES;
      postVideoViewsHolder.textContent = obj.VIDEO_VIEWS;

    } else {
      postTypeHolder.textContent = "No type, not a correct post.";
      userIDholder.textContent = "No username found.";
      rawURLsholder.innerHTML = "No URLs found";
      postDescHolder.textContent = "No description found.";
      postLikesHolder.textContent = "Error.";
      postVideoLikesHolder.textContent = "Error.";
      postVideoViewsHolder.textContent = "Error.";
    }
    spinner.style.display = "none";
  }
}
