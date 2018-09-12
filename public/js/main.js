"use strict";

function fetchPost(self) {

  var inputUrl = document.getElementById('post_url').value;
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
  let userIDholder = document.getElementById('userIDholder');
  let postLikesHolder = document.getElementById('postLikesHolder');
  let imageURLholder = document.getElementById('imageURLholder');
  let postDescHolder = document.getElementById('postDescHolder');

  postStatusHolder.textContent = obj.status;

  if (obj.status === "OK") {
    userIDholder.textContent = obj.USERNAME;
    postLikesHolder.textContent = obj.LIKES;
    imageURLholder.href = obj.URL;
    imageURLholder.textContent = "Raw Image URL";
    postDescHolder.textContent = obj.TXT;
  } else {
    userIDholder.textContent = "ERROR.";
    postLikesHolder.textContent = "ERROR.";
    imageURLholder.href = "#";
    imageURLholder.textContent = "No Image URL. Error.";
    postDescHolder.textContent = "ERROR...";
  }
}
