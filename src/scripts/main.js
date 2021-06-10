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

function initSlide() {
	let reviews = document.querySelectorAll(".reviews__review");
	let maxSlide = reviews.length - 1,
		curSlide = 0;
	const dotsContainer = document.querySelector(".dots");
	const goToSlide = (pos) => {
		reviews.forEach((s, index) => {
			s.style.transform = `translateX(${(index - pos) * 105}%)`;
		});
	};

	const createDots = () => {
		dotsContainer.innerHTML = "";
		reviews.forEach((_, i) => {
			dotsContainer.insertAdjacentHTML(
				"beforeend",
				`<button class="dots__dot" data-slide="${i}"> </button>`
			);
		});
	};

	const activeDot = function (pos) {
		dotsContainer
			.querySelectorAll(".dots__dot")
			.forEach((dot) => dot.classList.remove("dots__dot--active"));
		document
			.querySelector(`.dots__dot[data-slide="${pos}"]`)
			.classList.add("dots__dot--active");
	};

	const nextSlide = () => {
		if (curSlide === maxSlide) {
			curSlide = 0;
		} else {
			curSlide++;
		}

		activeDot(curSlide);
		goToSlide(curSlide);
	};

	initSlide.init = () => {
		createDots();
		activeDot(0);
		goToSlide(0);
	};

	initSlide.init();

	let interTimer = setInterval(() => {
		nextSlide(curSlide);
	}, 2000);

	initSlide.isIntervalling = () => !!interTimer;

	initSlide.clearInterval = () => {
		clearInterval(interTimer);
	};

	let timeOutTimer;

	function clearTimer() {
		clearTimeout(timeOutTimer);
		timeOutTimer = null;
	}

	initSlide.pause = (seconds) => {
		timeOutTimer && clearTimer();
		clearInterval(interTimer);
		timeOutTimer = setTimeout(() => {
			interTimer = setInterval(() => {
				nextSlide(curSlide);
			}, 2000);
		}, seconds * 1000);
	};

	dotsContainer.addEventListener("click", (e) => {
		if (e.target.classList.contains("dots__dot")) {
			const slide = e.target.dataset.slide;
			curSlide = Number(slide);
			goToSlide(slide);
			activeDot(curSlide);
			initSlide.pause(5);
		}
	});
}

let reviewSection = document.querySelector(".reviews");

let reviewHandler = (entries, observer) => {
	let [entry] = entries;
	if (!entry.isIntersecting) {
		if (!initSlide.isIntervalling()) {
			return;
		}
		initSlide.clearInterval();
		return;
	}

	initSlide();
};
let sectionObserver = new IntersectionObserver(reviewHandler, {
	root: null,
	threshold: 0.1,
	rootMargin: "30%",
});

sectionObserver.observe(reviewSection);
