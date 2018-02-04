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