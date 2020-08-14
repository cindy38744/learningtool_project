function initializeFirebase() {
    // Your web app's Firebase configuration
    var firebaseConfig = {
      apiKey: "AIzaSyBZBuJRqZgqhMmf2r8kDh-bbzSqayGZA6g",
      authDomain: "best-learning-tool.firebaseapp.com",
      databaseURL: "https://best-learning-tool.firebaseio.com",
      projectId: "best-learning-tool",
      storageBucket: "best-learning-tool.appspot.com",
      messagingSenderId: "903760527283",
      appId: "1:903760527283:web:1285b66fd1e08b9e4cd5c6",
      measurementId: "G-6KW4JLX3Y1"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    firebase.analytics();
  }

  // Reference to the recommendations object in your Firebase database
var recommendations = firebase.database().ref("recommendations");

// Save a new recommendation to the database, using the input in the form
var submitRecommendation = function () {

  // Get input values from each of the form elements
  var title = $("#talkTitle").val();
  var presenter = $("#talkPresenter").val();
  var link = $("#talkLink").val();

  // Push a new recommendation to the database using those values
  recommendations.push({
    "title": title,
    "presenter": presenter,
    "link": link
  });
};

// When the window is fully loaded, call this function.
// Note: because we are attaching an event listener to a particular HTML element
// in this function, we can't do that until the HTML element in question has
// been loaded. Otherwise, we're attaching our listener to nothing, and no code
// will run when the submit button is clicked.
$(window).load(function () {

  // Find the HTML element with the id recommendationForm, and when the submit
  // event is triggered on that element, call submitRecommendation.
  $("#recommendationForm").submit(submitRecommendation);

});

// Get the single most recent recommendation from the database and
// update the table with its values. This is called every time the child_added
// event is triggered on the recommendations Firebase reference, which means
// that this will update EVEN IF you don't refresh the page. Magic.
recommendations.limitToLast(1).on('child_added', function(childSnapshot) {
    // Get the recommendation data from the most recent snapshot of data
    // added to the recommendations list in Firebase
    recommendation = childSnapshot.val();
  
    // Update the HTML to display the recommendation text
    $("#title").html(recommendation.title)
    $("#presenter").html(recommendation.presenter)
    $("#link").html(recommendation.link)
  
    // Make the link actually work and direct to the URL provided
    $("#link").attr("href", recommendation.link)
  });