  const config = {
    apiKey: "AIzaSyD6ib-N_S2u0mXIcw2l5QpI9gqB3zpHnZ0",
    authDomain: "how-to-cook-rice.firebaseapp.com",
    databaseURL: "https://how-to-cook-rice.firebaseio.com",
    projectId: "how-to-cook-rice",
    storageBucket:  "how-to-cook-rice.appspot.com",
    messagingSenderId: "G-ZL32BP2EN6"
  };
  firebase.initializeApp(config);
  
  var myDataRef = firebase;

  $('#messageInput').keypress(function(e) {
    if (e.keyCode == 13) {
      var name = $('#nameInput').val();
      var text = $('#messageInput').val();
      myDataRef.push({
        name: name,
        text: text
      });
      $('#nameInput').val('');
      $('#messageInput').val('');
    }
  });
  
  myDataRef.on('child_added', function(snapshot) {
    var message = snapshot.val();
    displayChatMessage(message.name, message.text);
  });
  
  function displayChatMessage(name, text) {
    $('<div/>').text(text).prepend($('<b/>').text(name + ': ')).appendTo($('#messagesDiv'));
    $('#messagesDiv')[0].scrollTop = $('#messagesDiv')[0].scrollHeight;
  };