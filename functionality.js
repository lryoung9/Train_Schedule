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
var firstTrain;
var frequency;

// Collect form input from user and store as variables:
$("#add-train-btn").on("click", function(event){
	event.preventDefault();

	var newTrain = {
		name: $("#name-input").val().trim(),
		destination: $("#destination-input").val().trim(),
		firstTrain: moment($("#train-time-input").val().trim(), "HH:mm").format("HH:mm"),
		frequency: parseInt($("#frequency-input").val().trim())
	};
	// Test console
	console.log(newTrain)

	// Upload new train data to database
	database.ref().push(newTrain);

	// Clear text-input boxes
	$("#name-input").val("");
	$("#destination-input").val("");
	$("#train-time-input").val("");
	$("#frequency-input").val("");
});

database.ref().on("child_added", function(childSnapshot) {
	console.log(childSnapshot.val().name);
	console.log(childSnapshot.val().destination);
	console.log(childSnapshot.val().firstTrain);
	console.log(childSnapshot.val().frequency);
	firstTrain = childSnapshot.val().firstTrain;
	frequency = childSnapshot.val().frequency

	// temporary variable for where to add new train info
	var addTrain = $("#add-train");
	// temporary variable to store added train info
	var trainData = "<tr>";
	// name
	trainData += "<td>" + childSnapshot.val().name + "</td>";
	// destination
	trainData += "<td>" + childSnapshot.val().destination + "</td>";
	// frequency
	trainData += "<td>" + childSnapshot.val().frequency + "</td>";
	// push time back 24hrs to make sure it comes before current time
	var timeConverted = moment(firstTrain, "HH:mm").subtract(1, "day");
	// current time grab
	var currentTime = moment();
	// difference between the times in minutes
	var timeDifference = moment().diff(timeConverted, "minutes");
	// time remaining until next train
	var timeRemaining = parseInt(frequency - (timeDifference % frequency));
	// add time remaining to current time
	var nextTrain = moment().add(timeRemaining, "minutes");
	// format next arrival time in hh:mm
	trainData += "<td>" + moment(nextTrain).format("hh:mm a") + "</td>";
	// min away
	trainData += "<td>" + timeRemaining + "</td>";

	addTrain.append(trainData);
},

// function to catch errors
function(errorObject) {
   console.log("Errors handled: " + errorObject.code);
});