$(document).ready(function() {
  if (window.FileReader) {
    addEventHandler(window, 'load', function() {
      var drop    = document.getElementById('drag-n-drop');
      var browser = $('.browse input')

      function cancel(e) {
        console.log("Cancel")
        if (e.preventDefault) { e.preventDefault(); }
        return false;
      }

      // Tells the browser that we *can* drop on this target
      addEventHandler(drop, 'dragover', cancel);
      addEventHandler(drop, 'dragenter', cancel);
      addEventHandler(drop, 'drop', function(e) {
        console.log("Drop")
        e = e || window.event; // get window.event if e argument missing (in IE)
        if (e.preventDefault) { e.preventDefault(); } // stops the browser from redirecting off to the image.

        var dt = e.dataTransfer;
        var files = dt.files;
        for (var i = 0; i < files.length; i++) {
          var file = files[i];
          var reader = new FileReader();

          addEventHandler(reader, 'loadend', function(e, file) {
            console.log("Loaded")
            var bin           = this.result;
            var newFile       = document.createElement('div');
            newFile.innerHTML = 'Loaded : ' + file.name + ' size ' + file.size + ' B';
            browser.attr("value", file.name)

          }.bindToEventHandler(file));

          reader.readAsDataURL(file);
        }
        return false;
      });
    });
  }
})

function addEventHandler(obj, evt, handler) {
  if (obj.addEventListener) {
    // W3C method
    obj.addEventListener(evt, handler, false);
  } else if(obj.attachEvent) {
    // IE method
    obj.attachEvent('on' + evt, handler);
  } else {
    // Old school method
    obj['on' + evt] = handler;
  }
}

Function.prototype.bindToEventHandler = function bindToEventHandler() {
  var handler = this;
  var boundParameters = Array.prototype.slice.call(arguments);
  //create closure
  return function(e) {
    e = e || window.event; // get window.event if e argument missing (in IE)
    boundParameters.unshift(e);
    handler.apply(this, boundParameters);
  }
}
