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
	console.log(newTrain)

	// console.log(name);
	// console.log(destination);
	// console.log(firstTrain.format("HH:mm"));
	// console.log(frequency);

	// Upload new train data to database
	database.ref().push(newTrain);

	// Test console
	console.log(database.ref());

	// Clear text-input boxes
	$("#name-input").val("");
	$("#destination-input").val("");
	$("#train-time-input").val("");
	$("#frequency-input").val("");
});

database.ref().on("child_added", function(childSnapshot) {
 console.log(childSnapshot.val().name);
 console.log(childSnapshot.val().destination);
 console.log(childSnapshot.val().first-train);
 console.log(childSnapshot.val().frequency);

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
},

// function to catch errors
function(errorObject) {
   console.log("Errors handled: " + errorObject.code);
});

