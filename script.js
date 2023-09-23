const ACTIVE_THRESHOLD = 100;

const main = document.querySelector('main');
const header = document.querySelector('header');
const nav = document.querySelector('nav');
const sections = document.querySelectorAll('section');
const navLinks = nav.querySelectorAll('nav > a');

// HACK: This is just hack maybe? Surely there is a better solution than this
let ignoreScroll = false;
let ignoreTimeout;

function navigate() {
	for (let i = sections.length - 1; i >= 0; i--) {
		const section = sections[i];
		const id = section.id;
		const height = section.clientHeight;
		const positionY = header.clientHeight + nav.clientHeight + height * (i - 1) + ACTIVE_THRESHOLD;

		if (main.scrollTop < positionY) {
			continue;
		}

		if (window.location.hash !== section.id) {
			window.location.hash = section.id;
			
			break;
		}
	}
}

main.addEventListener('scroll', () => {
	if (ignoreScroll) {
		return;
	}

	navigate();
});

for (let navLink of navLinks) {
	navLink.addEventListener('click', () => {
		ignoreScroll = true;
		
		clearTimeout(ignoreTimeout);

		ignoreTimeout = setTimeout(() => {
			ignoreScroll = true;
		}, 500);
	});
}
