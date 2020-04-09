// Firebase Contact Form
// Init Firebase
var config = {
    apiKey: "AIzaSyAXnEEPMONpMJgmmiwMFAlPW9lFfOhlMSo",
    authDomain: "contactform-fded3.firebaseapp.com",
    databaseURL: "https://contactform-fded3.firebaseio.com",
    projectId: "contactform-fded3",
    storageBucket: "",
    messagingSenderId: "892179679388"
};
firebase.initializeApp(config);

// Reference message collection
var refMess = firebase.database().ref("messages");

// Submit Form
document.getElementById("contactForm").addEventListener('submit', submitForm);

// On form Submit
function submitForm(e) {
    e.preventDefault();
    var name = getInputVal("name");
    var email = getInputVal("email");
    var phone = getInputVal("phone");
    var comment = getInputVal("comment");

    // Save message info
    saveMessage(name, email, phone,
        comment);

    // Reset form after submit
    document.getElementById("contactForm").reset();
}

// Get form values
function getInputVal(id) {
    return document.getElementById(id).value;
}

// Save messages to firebase database
function saveMessage(name, email, phone, comment) {
    var newRefMess = refMess.push()
    newRefMess.set({
        Name: name,
        Email: email,
        Phone: phone,
        comment: comment
    });
}