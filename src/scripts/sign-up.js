"use strict";
// import "../styles/signUp-style.scss";
let imgs = document.querySelectorAll(".lazy-img");

const loadImg = function () {
	this.classList.remove("lazy-img");

	this.removeEventListener("load", loadImg);
};

imgs.forEach((img) => {
	img.src = img.dataset.src;
	img.addEventListener("load", loadImg);
});
