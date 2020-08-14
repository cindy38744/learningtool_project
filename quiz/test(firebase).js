var chatDatabase;
$(init);

var firebase = require('firebase/app');
require('firebase/auth');
require('firebase/database');

function init() {
  
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBZBuJRqZgqhMmf2r8kDh-bbzSqayGZA6g",
    authDomain: "best-learning-tool.firebaseapp.com",
    databaseURL: "https://best-learning-tool.firebaseio.com",
    projectId: "best-learning-tool",
    storageBucket: "best-learning-tool.appspot.com",
    messagingSenderId: "903760527283",
    appId: "1:903760527283:web:43583df24861068f4cd5c6",
    measurementId: "G-8TG7V959DN"
  };
  firebase.initializeApp(config);

  var chatDatabase = firebase.database().ref("chat");
  
  // When the user presses enter on the message input, write the message to firebase.
  $("#messageInput").keypress(function (e) {
    
    var name = $("#nameInput").val();
    var msg = $("#messageInput").val();
    
    if (e.keyCode == 13 && name != "" && msg != "") {
      
      chatDatabase.push( {name:name, message:msg} );
      $("#messageInput").val("");
      
    }
    
  });

  // Add a callback that is triggered for each chat message.
  chatDatabase.on("child_added", function (newData) {
    
    console.log( newData ); //not much to see here, compressed information
    var message = newData.val();
    
    $("<li>")
      .addClass("message")
      .text(message.message)
      .prepend($("<em>")
      .text(message.name + ": "))
      .appendTo($("#messages"));
    
    $("#messages")[0].scrollTop = $("#messagesDiv")[0].scrollHeight;
  });
   
}

