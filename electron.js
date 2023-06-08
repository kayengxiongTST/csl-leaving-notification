// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

function sendNotification() {
	let myNotification = new Notification("Computer Science Lab", {
		body: "It's time for you to go back home"
	})

	myNotification.onclick = () => {
		console.log("Notification clicked")
	}
}
window.addEventListener("load", function () {

	document.body.querySelector("#new-notification").addEventListener("click", function () {
		sendNotification()
	})

})