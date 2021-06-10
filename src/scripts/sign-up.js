"use strict";
// import "../styles/signUp-style.scss";
const imgs = document.querySelectorAll(".lazy-img");

const loadImg = function () {
	this.classList.remove("lazy-img");

	this.removeEventListener("load", loadImg);
};

imgs.forEach((img) => {
	img.src = img.dataset.src;
	img.addEventListener("load", loadImg);
});

function notify(content) {
	alert(content);
}

const form = document.getElementById("form");
const emailRegex =
	/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const usernameEl = document.getElementById("username");
const userEmailEl = document.getElementById("useremail");
const passwordEl = document.getElementById("password");
const checkboxEl = document.getElementById("agree");

const clearInput = () => {
	usernameEl.value = userEmailEl.value = passwordEl.value = "";
	checkboxEl.checked = false;
};

form.addEventListener("submit", (e) => {
	e.preventDefault();
	if (!emailRegex.test(userEmailEl.value)) {
		return notify("Invalid email! Please enter a valid email!");
	}

	if (!checkboxEl.checked) {
		return notify("You need to agree to our policy to create account.");
	}

	if (passwordEl.value.length < 8) {
		return notify("Password must longer than 8 characters.");
	}

	clearInput();
	return notify("Sent data.");
});

let showPassBtn = passwordEl.nextElementSibling;
showPassBtn.addEventListener("click", function () {
	this.classList.toggle("showpass");
	if (this.classList.contains("showpass")) {
		passwordEl.setAttribute("type", "text");
	} else {
		passwordEl.setAttribute("type", "password");
	}
});
