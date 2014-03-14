(function(){

  // Listen for the ready event for any vimeo video players on the page
  var vimeoPlayers = document.querySelectorAll('iframe'),
      player;

  for (var i = 0, length = vimeoPlayers.length; i < length; i++) {
      player = vimeoPlayers[i];
      $f(player).addEvent('ready', ready);
  }

  /**
   * Utility function for adding an event. Handles the inconsistencies
   * between the W3C method for adding events (addEventListener) and
   * IE's (attachEvent).
   */
  function addEvent(element, eventName, callback) {
      if (element.addEventListener) {
          element.addEventListener(eventName, callback, false);
      }
      else {
          element.attachEvent(eventName, callback, false);
      }
  }

  /**
   * Called once a vimeo player is loaded and ready to receive
   * commands. You can add events and make api calls only after this
   * function has been called.
   */
  function ready(player_id) {
    // Keep a reference to Froogaloop for this player
    var container = document.getElementById(player_id).parentNode.parentNode,
        froogaloop = $f(player_id),
        apiConsole = container.querySelector('.console .output');

    /**
     * Prepends log messages to the example console for you to see.
     */
    function apiLog(message) {
        apiConsole.innerHTML = message + '\n' + apiConsole.innerHTML;
    }

    /**
     * Adds listeners for the events that are checked. Adding an event
     * through Froogaloop requires the event name and the callback method
     * that is called once the event fires.
     */
    function setupEventListeners() {
        

      function onLoadProgress() {
          if (loadProgressChk.checked) {
              froogaloop.addEvent('loadProgress', function(data) {
                  apiLog('loadProgress event : ' + data.percent + ' : ' + data.bytesLoaded + ' : ' + data.bytesTotal + ' : ' + data.duration);
              });
          }
          else {
              froogaloop.removeEvent('loadProgress');
          }
      }

      function onPlayProgress() {
          
        froogaloop.addEvent('playProgress', function(data) {

          if(data.seconds > 20.4 && data.seconds < 20.6){
            //apiLog('playProgress event : ' + data.seconds + ' : ' + data.percent + ' : ' + data.duration);
            $('#myModal').modal();
            froogaloop.api('pause');
            $('#myModal').on('hidden.bs.modal', function (e) {
              // do something...
              froogaloop.api('play');
            })
          }  
        });
         
      }

      function onPlay() {
          if (playChk.checked) {
              froogaloop.addEvent('play', function(data) {
                  apiLog('play event');
              });
          }
          else {
              froogaloop.removeEvent('play');
          }
      }

      function onPause() {
          if (pauseChk.checked) {
              froogaloop.addEvent('pause', function(data) {
                  apiLog('pause event');
              });
          }
          else {
              froogaloop.removeEvent('pause');
          }
      }

      function onFinish() {
          if (finishChk.checked) {
              froogaloop.addEvent('finish', function(data) {
                  apiLog('finish');
              });
          }
          else {
              froogaloop.removeEvent('finish');
          }
      }

      function onSeek() {
          froogaloop.addEvent('seek', function(data) {
              apiLog('seek event : ' + data.seconds + ' : ' + data.percent + ' : ' + data.duration);
          });
      }

      // Calls the change event if the option is checked
      // (this makes sure the checked events get attached on page load as well as on changed)
      //onLoadProgress();
      onPlayProgress();
      //onPlay();
      //onPause();
      //onFinish();
      onSeek();
    }


    //setupSimpleButtons();
    setupEventListeners();

    // Setup clear console button
    var clearBtn = container.querySelector('.console button');
    addEvent(clearBtn, 'click', function(e) {
        apiConsole.innerHTML = '';
    }, false);

    //apiLog(player_id + ' ready!');
  }




})();


