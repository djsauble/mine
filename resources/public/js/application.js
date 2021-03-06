$(document).ready(function() {
  if (window.FileReader) {
    addEventHandler(window, 'load', function() {
      var drop    = window
      var browser = $('.browse #name')
      var hash = $('.browse #hash')

      function cancel(e) {
        if (e.preventDefault) { e.preventDefault(); }
        var message = $('#drag-n-drop')
        if (!message.hasClass('active')) {
          message.addClass('active')
        }
        return false
      }

      // Tells the browser that we *can* drop on this target
      addEventHandler(drop, 'dragover', cancel)
      addEventHandler(drop, 'dragenter', cancel)
      addEventHandler(drop, 'drop', function(e) {
        e = e || window.event; // get window.event if e argument missing (in IE)
        if (e.preventDefault) { e.preventDefault(); } // stops the browser from redirecting off to the image.

        if (e.dataTransfer.files.length == 0) {
          return false
        }
        var file = e.dataTransfer.files[0]
        var reader = new FileReader()

        addEventHandler(reader, 'loadend', function(e, file) {
          var message = $('#drag-n-drop')
          if (message.hasClass('active')) {
            message.removeClass('active')
          }
          $('button:disabled').prop('disabled', "")
          var bin           = this.result
          var newFile       = document.createElement('div')
          newFile.innerHTML = 'Loaded : ' + file.name + ' size ' + file.size + ' B'
          browser.attr("value", file.name)
          var fileReader = new FileReader
          fileReader.onload = (function(theFile) {
            var obj = new jsSHA(theFile.currentTarget.result, "ASCII")
            hash.attr("value", obj.getHash("SHA-256", "HEX"))
          })
          fileReader.readAsText(file, "ASCII")
        }.bindToEventHandler(file))

        reader.readAsDataURL(file)
        return false
      })
    })
  }
})

function addEventHandler(obj, evt, handler) {
  if (obj.addEventListener) {
    // W3C method
    obj.addEventListener(evt, handler, false)
  } else if(obj.attachEvent) {
    // IE method
    obj.attachEvent('on' + evt, handler)
  } else {
    // Old school method
    obj['on' + evt] = handler
  }
}

Function.prototype.bindToEventHandler = function bindToEventHandler() {
  var handler = this
  var boundParameters = Array.prototype.slice.call(arguments)
  //create closure
  return function(e) {
    e = e || window.event; // get window.event if e argument missing (in IE)
    boundParameters.unshift(e)
    handler.apply(this, boundParameters)
  }
}
