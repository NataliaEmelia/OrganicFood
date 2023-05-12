

$(document).ready(function() {
    $('.header__nav__burger').click(function(event) {
        $('.header__nav__burger,.header__nav').toggleClass('active');
    });
});

"use strict";

var imageCache = new function() {
  var me = this;

  var cache = [];
  var root = document.location.href.split("/");

  root.pop();
  root = root.join("/") + "/";

  me.push = function(src, loadEvent) {
    if (!src.match(/^http/)) {
      src = root + src;
    }

    var item = new Image();

    if (cache[src] && loadEvent) {
      loadEvent(src);
    } else {
      if (loadEvent) {
        item.onload = loadEvent;
        item.onerror = loadEvent;
      }
      cache[src] = item;
    }

    item.src = src;
  };

  me.pushArray = function(array, imageLoadEvent, imagesLoadEvent) {
    var numLoaded = 0;
    var arrayLength = array.length;
    for (var i = 0; i < arrayLength; i++) {
      me.push(array[i], function(e) {
        if (imageLoadEvent) {
          imageLoadEvent(e);
        }
        numLoaded++;
        if (numLoaded == arrayLength) {
          setTimeout(function() {
            imagesLoadEvent(e);
          }, 1);
        }
      });
    }
  };
}();

var s = ["https://upload.wikimedia.org/wikipedia/commons/8/88/Half-Life_Black_Mesa_logo.svg", "https://upload.wikimedia.org/wikipedia/commons/5/5d/Clojure_logo.svg", "https://4hands.ru/wp-content/uploads/2018/04/viber-logo-256x256.png"];
imageCache.pushArray(s, () => console.log('when one of all images has been loaded'), () => console.log('when all images have been loaded'));

