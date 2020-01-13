// Firebase Contact
// Initialize Firebase
var config = {
	apiKey: "AIzaSyAXnEEPMONpMJgmmiwMFAlPW9lFfOhlMSo",
	authDomain: "contactform-fded3.firebaseapp.com",
	databaseURL: "https://contactform-fded3.firebaseio.com",
	projectId: "contactform-fded3",
	storageBucket: "",
	messagingSenderId: "892179679388"
};
firebase.initializeApp(config);

// Reference "messages" collection
var messagesRef = firebase.database().ref('messages');

// Form Submit
document.getElementById('contactForm').addEventListener('submit', submitForm);

// Submit form
function submitForm(e) {
	e.preventDefault();
	var firstName = getInputVal('firstName');
	var lastName = getInputVal('lastName');
	var email = getInputVal('email');
	var phone = getInputVal('phoneNbr');
	var message = getInputVal('message');

	// Save values
	saveMessage(firstName, lastName, email, phone, message);

	// Reset after submit
	document.getElementById('contactForm').reset();
}

// Get form values
function getInputVal(id) {
	return document.getElementById(id).value;
}

// Save messages to FB Database
function saveMessage(firstName, lastName, email, phone, message) {
	var newMessageRef = messagesRef.push();
	newMessageRef.set({
		FirstName: firstName,
		LastName: lastName,
		email: email,
		phone: phone,
		message: message
	});
}