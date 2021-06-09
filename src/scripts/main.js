// import "../styles/style.scss";
"use strict";

let imgs = document.querySelectorAll(".lazy-img");

let options = {
	root: null,
	rootMargin: "15%",
	threshold: 0.1,
};

let obsFn = (entries, observer) => {
	let [entry] = entries;
	if (!entry.isIntersecting) {
		return;
	}

	entry.target.src = entry.target.dataset.src;
	entry.target.addEventListener("load", loadImg);

	observer.unobserve(entry.target);
};

const loadImg = function () {
	this.classList.remove("lazy-img");

	this.removeEventListener("load", loadImg);
};

let observer = new IntersectionObserver(obsFn, options);

imgs.forEach((img) => {
	observer.observe(img);
});
