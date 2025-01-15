// Timer
window.addEventListener("DOMContentLoaded", () => {
	const TIMER_LARGE = document.getElementById("countdown-timer--large");
	const TIMER_SMALL = document.getElementById("countdown-timer--small");
	const TIMER_WRAPPER = document.querySelector(".countdown");

	let mainHeight = window.innerHeight;
	TIMER_WRAPPER.style.height = mainHeight + "px";

	// Timer Load
	const target = new Date("2025-01-17T00:00:00+09:00"); // 한국 표준시(KST)

	function timer(target) {
		const now = new Date();
		const diff = target - now;
		const message = "Journey Start";

		if (diff < 0) {
			return { message: message };
		} else {
			const day = Math.floor(diff / (1000 * 60 * 60 * 24));
			const hour = Math.floor((diff / (1000 * 60 * 60)) % 24);
			const min = Math.floor((diff / (1000 * 60)) % 60);
			const sec = Math.floor((diff / 1000) % 60);

			const formattedMin = min.toString().padStart(2, 0);
			const formattedSec = sec.toString().padStart(2, 0);

			return {
				day: day,
				hour: hour,
				min: formattedMin,
				sec: formattedSec,
			};
		}
	}

	function updateDom() {
		const data = timer(target);
		if (data.message) {
			TIMER_LARGE.textContent = 0;
			TIMER_SMALL.textContent = data.message;
		} else {
			TIMER_LARGE.textContent = data.day;
			TIMER_SMALL.textContent = `${data.hour}: ${data.min}: ${data.sec}`;
		}
	}

	updateDom();
	setInterval(updateDom, 1000);
});

// Carousel
window.addEventListener("DOMContentLoaded", () => {
	const carousel = document.querySelector(".carousel__container");
	const transitionClass = "carousel__container--transition";
	const carouselBtnContainer = document.querySelector(".carousel__headings");
	const carouselBtns = carouselBtnContainer.children;
	const firstClone = carousel.firstElementChild.cloneNode(true);
	const lastClone = carousel.lastElementChild.cloneNode(true);
	carousel.append(firstClone);
	carousel.prepend(lastClone);
	let curIndex = 0;
	let lastIndex = carousel.children.length - 1;

	// 슬라이드를 하면
	let startPos = 0;
	let endPos = 0;

	updateBtn(curIndex);

	// initial
	carousel.style.transform = `translateX(${-(curIndex + 1) * 100}%)`;
	carousel.addEventListener("mousedown", (e) => {
		startPos = e.clientX;
	});

	carousel.addEventListener("mouseup", (e) => {
		let dist = 0;
		let threshold = 30;

		e.preventDefault();
		endPos = e.clientX;
		dist = startPos - endPos;

		if (dist >= threshold) {
			curIndex++;
			slideTo(curIndex);
		} else if (dist <= threshold * -1) {
			curIndex--;
			slideTo(curIndex);
		}

		if (curIndex < 0) {
			curIndex = lastIndex - 2;
			resetSlide();
		} else if (curIndex >= lastIndex - 1) {
			curIndex = 0;
			resetSlide();
		}
		updateBtn(curIndex);
		console.log(dist);
	});

	function updateBtn(index) {
		for (el of carouselBtns) {
			el.classList.remove("carousel__btn--preseed");
		}
		carouselBtns[index].classList.add("carousel__btn--preseed");
	}

	function slideTo(index) {
		carousel.style.transform = `translateX(${-(index + 1) * 100}%)`;
	}

	function resetSlide() {
		setTimeout(function () {
			carousel.classList.remove(transitionClass);
			carousel.style.transform = `translateX(${-(curIndex + 1) * 100}%)`;
		}, 300);

		setTimeout(function () {
			carousel.classList.add(transitionClass);
		}, 500);
	}

	carouselBtnContainer.addEventListener("click", (e) => {
		targetIndex = Number(e.target.getAttribute("data-index"));
		if (targetIndex !== null) {
			updateBtn(targetIndex);
			slideTo(targetIndex);
			curIndex = targetIndex;
		}
	});
});

// scrollEvent
window.addEventListener("DOMContentLoaded", () => {
	const headerCaption = document.querySelector(".header__caption");
	const dimmerTop = document.querySelector(".dimmer__top");
	const animatedAssets = document.querySelectorAll(".content");

	const observer = new IntersectionObserver((entries) => {
		entries.forEach(
			(entry) => {
				if (entry.isIntersecting) {
					entry.target.classList.add("is-visible");
				} else {
					entry.target.classList.remove("is-visible");
				}
			},
			{
				threshold: 0.3,
			}
		);
	});

	animatedAssets.forEach((asset) => observer.observe(asset));

	window.addEventListener("scroll", (e) => {
		if (window.scrollY >= window.innerHeight || window.scrollY >= 812) {
			headerCaption.classList.add("header__caption--wrapped");
			dimmerTop.classList.add("dimmer--unwrapped");
		} else {
			headerCaption.classList.remove("header__caption--wrapped");
			dimmerTop.classList.remove("dimmer--unwrapped");
		}
	});
});

window.addEventListener("DOMContentLoaded", () => {
	const list = document.querySelectorAll(".list__container");
	const activities = document.querySelectorAll(".activity");
	const animatedAssets = [...list, ...activities];

	const observer = new IntersectionObserver(
		(entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					entry.target.classList.add("is-uncovered");
				} else {
					entry.target.classList.remove("is-uncovered");
				}
			});
		},
		{
			threshold: 0.5,
		}
	);

	animatedAssets.forEach((tag) => {
		observer.observe(tag);
	});
});

window.addEventListener("DOMContentLoaded", () => {
	updateChip();

	function updateChip() {
		const imgChip = document.querySelectorAll(".list__chip--link");

		imgChip.forEach((element) => {
			const img = document.createElement("img");
			img.className = "symbol__link";
			if (element.classList.contains("list__chip--head")) img.setAttribute("src", "src/link_red.svg");
			else img.setAttribute("src", "src/link_wht.svg");
			element.appendChild(img);
		});
	}
});

window.addEventListener("DOMContentLoaded", () => {
	const navContent = document.querySelector(".navigation__content");
	const navBtn = document.querySelector(".navigation__button");

	//initial show
	setTimeout(() => {
		navContent.classList.remove("navigation__content--unwrapped");
		navBtn.classList.add("is-wiggle");
	}, 2000);

	window.addEventListener("click", (e) => {
		if (e.target !== navContent && e.target !== navBtn) {
			navContent.classList.remove("navigation__content--unwrapped");
			navBtn.classList.add("is-wiggle");
		}
	});

	//button Event
	navBtn.addEventListener("click", () => {
		navContent.classList.toggle("navigation__content--unwrapped");
		navBtn.classList.toggle("is-wiggle");
	});
});

window.addEventListener("DOMContentLoaded", () => {
	const activityNumbers = document.querySelectorAll(".activity__text--caption");
	console.log(activityNumbers);

	let count = 1;
	activityNumbers.forEach((number) => {
		number.textContent = `0${count}`;
		count++;
	});
});
