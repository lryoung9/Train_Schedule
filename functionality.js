// Initialize Firebase
var config = {
	apiKey: "AIzaSyAd6D-WiMycjXeJuKWIJZMBK5dTnLwx3GY",
    authDomain: "train-schedule-c6354.firebaseapp.com",
    databaseURL: "https://train-schedule-c6354.firebaseio.com",
    projectId: "train-schedule-c6354",
    storageBucket: "train-schedule-c6354.appspot.com",
    messagingSenderId: "10612507847"
};

firebase.initializeApp(config);

// Variables
var database = firebase.database();
var name;
var destination;
var first-train;
var frequency;

// Collect form input from user:
$("#form-group").val("");
$("#add-employee").on("click", function(){
	event.preventDefault()
	name = $("#name-input").val().trim();
	destination = $("#destination-input").val().trim();
	first-train = $("#train-tim-input").val().trim();
	frequency = $("#frequency-input").val().trim();

	database.ref().push({
		name: name,
		destination: destination,
		first-train: first-train,
		frequency: frequency,
		dataAdded: firebase.database.ServerValue.TIMESTAMP
	});
});

// Need to look into this functionality
// database.ref().on("value", function(snapshot) {
//  var sv = snapshot.val();
//  var svArr = Object.keys(sv);
//  var lastIndex = svArr.length - 1;
//  var lastKey = svArr[lastIndex];
//  var lastObj = sv[lastKey];
// });

// database.ref().on("child_added", function(childSnapshot) {
//  console.log(childSnapshot.val().name);
//  console.log(childSnapshot.val().destination);
//  console.log(childSnapshot.val().first-train);
//  console.log(childSnapshot.val().frequency);

// temporary variable for where to add new train info
var addTrain = $("#add-train");
// temporary variable to store added train info
var trainData = "<tr>";
trainData += "<td>" + childSnapshot.val().name + "</td>";
trainData += "<td>" + childSnapshot.val().destination + "</td>";
trainData += "<td>" + childSnapshot.val().first-train + "</td>";
trainData += "<td>" + moment().diff(first-train, "minutes") + "</td>";
trainData += "<td>" + childSnapshot.val().frequency + "</td>";
trainData += "<td></td>";
trainData += "</tr>";
addTrain.append(trainData);
};

// function to catch errors
function(errorObject) {
   console.log("Errors handled: " + errorObject.code);
});

