  var config = {
    apiKey: "AIzaSyD6ib-N_S2u0mXIcw2l5QpI9gqB3zpHnZ0",
    authDomain: "how-to-cook-rice.firebaseapp.com",
    databaseURL: "https://how-to-cook-rice.firebaseio.com",
    storageBucket: "how-to-cook-rice.appspot.com",
  };
  
  // Initialize your Firebase app
  firebase.initializeApp(config);

  // Listen to the form submit event
$('#myForm').submit(function(evt) {

    // Target the form elements by their ids
    // And build the form object like this using jQuery: 
    var formData = {
      "title": $('#title').val(),
      "description": $('#description).val(),
    }
  
    evt.preventDefault(); //Prevent the default form submit action
    
    // You have formData here and can do this:
    firebase.initializeApp(config); //Initialize your firebase here passing your firebase account config object
    firebase.database().ref('/formDataTree').push( formData ); // Adds the new form data to the list under formDataTree node
  })