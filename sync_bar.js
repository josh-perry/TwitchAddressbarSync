$(function() {
	var dl = document.location;
	var base_url = dl.protocol + "//" + dl.host + dl.pathname;
	var previous_url = null;

	var delete_history = false;
	var interval = 2000;

	chrome.storage.sync.get("delete_history", function(items) {
		if (!chrome.runtime.error) {
			delete_history = items.data;
		} else {
			console.log("ERROR");
		}
	});

	chrome.storage.sync.get("interval", function(items) {
		if (!chrome.runtime.error) {
			var data = items.data;
			
			if(data == "1second") {
				interval = 1000;
			}
			else if(data == "10seconds") {
				interval = 1000 * 10;
			}
			else if(data == "30seconds") {
				interval = 1000 * 30;
			}
			else if(data == "1minute") {
				interval = 1000 * 60;
			}
			else {
				interval = (1000 * 60) * 5;
			}
		} else {
			console.log("ERROR");
		}
	});

	setInterval(function() {
		time_parameter = get_time_parameter();
		update_addressbar(time_parameter);
	}, interval);

	function update_addressbar(title) {
		if (typeof (history.pushState) != "undefined") {
			history.replaceState(undefined, undefined, title);

			if(!delete_history) {
				return;
			}

			if(previous_url) {
				console.log(previous_url);
				chrome.runtime.sendMessage({do_thing: "delete", url: previous_url});
			}

			previous_url = base_url + title;
		}
	}

	function get_time_parameter() {
		var span = $(".player-seek__time.js-seek-currenttime");
		var split_time = span.text().split(":");

		var time_parameter = "?t=";
		time_parameter += (split_time[split_time.length - 3] || "00") + "h";
		time_parameter += (split_time[split_time.length - 2] || "00") + "m";
		time_parameter += (split_time[split_time.length - 1] || "00") + "s";

		return time_parameter;
	}
});