var firebaseConfig = {
    apiKey: "AIzaSyBZBuJRqZgqhMmf2r8kDh-bbzSqayGZA6g",
    authDomain: "best-learning-tool.firebaseapp.com",
    databaseURL: "https://best-learning-tool.firebaseio.com",
    projectId: "best-learning-tool",
    storageBucket: "best-learning-tool.appspot.com",
    messagingSenderId: "903760527283",
    appId: "1:903760527283:web:43583df24861068f4cd5c6",
    measurementId: "G-8TG7V959DN"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();

var myDataRef = firebase.database().ref();

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