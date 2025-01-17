// Timer
window.addEventListener("DOMContentLoaded", () => {
	const TIMER = document.querySelector(".countdown__heading");
	const TIMER_CONTAINERS = document.querySelectorAll(".countdown-timer--container");
	const TIMER_WRAPPER = document.querySelector(".countdown");

	let mainHeight = window.innerHeight;
	TIMER_WRAPPER.style.height = mainHeight + "px";

	// Timer Load
	const target = new Date("2025-01-17T12:00:00+09:00"); // 한국 표준시(KST)

	const updateTimer = setInterval(updateDom, 1000);
	updateDom();

	function timer(target) {
		const now = new Date();
		const diff = target - now;
		const message = updateContent();

		if (diff <= 0) {
			clearInterval(updateTimer);
			return { message: message };
		} else {
			// const day = Math.floor(diff / (1000 * 60 * 60 * 24));
			const hour = Math.floor(diff / (1000 * 60 * 60));
			const min = Math.floor((diff / (1000 * 60)) % 60);
			const sec = Math.floor((diff / 1000) % 60);

			const formattedHour = hour.toString().padStart(2, 0);
			const formattedMin = min.toString().padStart(2, 0);
			const formattedSec = sec.toString().padStart(2, 0);

			return {
				// day: day,
				hour: formattedHour,
				min: formattedMin,
				sec: formattedSec,
			};
		}
	}

	function updateDom() {
		const data = timer(target);
		if (data.message) {
			TIMER_WRAPPER.append(data.message);
			TIMER_WRAPPER.classList.add("is-popped");
			TIMER.innerHTML = "";
		} else {
			TIMER_CONTAINERS[0].textContent = data.hour;
			TIMER_CONTAINERS[1].textContent = data.min;
			TIMER_CONTAINERS[2].textContent = data.sec;
		}
	}

	function updateContent() {
		const container = document.createElement("div");
		const img = document.createElement("img");
		const text = document.createElement("h2");
		text.textContent = `여행이 시작됐어요!`;
		img.setAttribute("src", "src/rabbit_main.webp");

		container.className = "countdown__content";
		img.className = "countdown__img";
		container.append(img, text);
		return container;
	}
});

// Carousel
window.addEventListener("DOMContentLoaded", () => {
	const carousel = document.querySelector(".carousel__container");
	const transitionClass = "carousel__container--transition";
	const carouselBtnContainer = document.querySelector(".carousel__headings");
	const carouselBtns = carouselBtnContainer.children;
	const firstClone = carousel.firstElementChild.cloneNode(true);
	const lastClone = carousel.lastElementChild.cloneNode(true);
	const date = new Date();
	carousel.append(firstClone);
	carousel.prepend(lastClone);
	let curIndex = 0;
	let lastIndex = carousel.children.length - 1;

	// 슬라이드를 하면
	let startPos = 0;
	let endPos = 0;

	if (Number(date.getDate()) === 17) curIndex = 0;
	if (Number(date.getDate()) === 18) curIndex = 1;
	if (Number(date.getDate()) === 19) curIndex = 2;

	updateBtn(curIndex);

	// initial
	carousel.style.transform = `translateX(${-(curIndex + 1) * 100}%)`;
	carousel.addEventListener("touchstart", (e) => {
		startPos = e.touches[0].clientX;
	});

	carousel.addEventListener("touchend", (e) => {
		let dist = 0;
		let threshold = 100;

		e.preventDefault();
		endPos = e.changedTouches[0].clientX;
		dist = startPos - endPos;

		if (dist >= Number(threshold)) {
			curIndex++;
			slideTo(curIndex);
		} else if (dist <= Number(threshold * -1)) {
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

	carousel.addEventListener("mousedown", (e) => {
		startPos = e.clientX;
	});

	carousel.addEventListener("mouseup", (e) => {
		let dist = 0;
		let threshold = 80;

		e.preventDefault();
		endPos = e.clientX;
		dist = Number(startPos - endPos);

		if (dist >= Number(threshold)) {
			curIndex++;
			slideTo(curIndex);
		} else if (dist <= Number(threshold * -1)) {
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

	carouselBtnContainer.addEventListener("pointerup", (e) => {
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
					// setTimeout(() => {
					// 	entry.target.classList.remove("is-uncovered");
					// }, 500);
				}
			});
		},
		{
			threshold: 0.3,
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

	window.addEventListener("pointerup", (e) => {
		if (e.target !== navContent && e.target !== navBtn) {
			navContent.classList.remove("navigation__content--unwrapped");
			navBtn.classList.add("is-wiggle");
		}
	});

	//button Event
	navBtn.addEventListener("pointerup", () => {
		navContent.classList.toggle("navigation__content--unwrapped");
		navBtn.classList.toggle("is-wiggle");
	});
});

window.addEventListener("DOMContentLoaded", () => {
	const activityNumbers = document.querySelectorAll(".activity__text--caption");

	let count = 1;
	activityNumbers.forEach((number) => {
		formattedCount = count.toString().padStart(2, 0);
		number.textContent = formattedCount;
		count++;
	});
});
window.addEventListener("DOMContentLoaded", () => {
	if (document.documentElement.scrollTop < 1100) {
		var count = 350;
		var defaults = {
			origin: { y: -0.5 },
			gravity: 0.5,
			startVelocity: -55,
			tick: 450,
			colors: ["#faa2af", "#ff637f"],
		};

		function fire(particleRatio, opts) {
			confetti({
				...defaults,
				...opts,
				particleCount: Math.floor(count * particleRatio),
			});
		}

		fire(0.55, {
			spread: 26,
			startVelocity: 55,
		});

		fire(0.45, {
			spread: 100,
			decay: 0.91,
			scalar: 0.8,
		});
	}
});
