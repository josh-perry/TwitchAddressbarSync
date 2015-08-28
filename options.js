function save_options() {
	var interval = document.getElementById("interval").value;
	var delete_history = document.getElementById("delete_history").checked;

	chrome.storage.sync.set({
		"interval": interval,
		"delete_history": delete_history
	}, function() {
		var status = document.getElementById("status");
		status.textContent = "Saved successfully!";

		setTimeout(function() {
			status.textContent = '';
		}, 1000);
	});
}

function restore_options() {
	chrome.storage.sync.get({
		interval: "1second",
		delete_history: false
	}, function(items) {
		document.getElementById("interval").value = items.interval;
		document.getElementById("delete_history").checked = items.delete_history;
	});
}

document.addEventListener("DOMContentLoaded", restore_options);
document.getElementById("save").addEventListener("click", save_options);