import anime from 'animejs';

function rustMouseOver() {
	anime({
		targets: '.letter-rust',
		translateY: [-20, 0],
		opacity: [0, 1],
		color: ['#000', '#dea584'],
		duration: 1000,
		delay: anime.stagger(100),
		easing: 'easeOutExpo'
	});
}

function rustMouseOut() {
	anime({
		targets: '.letter-rust',
		color: ['#dea584', '#fff'],
		duration: 1000,
		delay: anime.stagger(100),
		easing: 'easeOutExpo'
	});
}

function tsMouseOver() {
	anime({
		targets: '#tsIcon',
		opacity: [0, 0.15],
		duration: 1000,
		easing: 'easeOutExpo'
	});
	anime({
		targets: '.letter-ts',
		color: ['#000', '#3178c6'],
		duration: 500,
		delay: anime.stagger(100),
		easing: 'easeOutExpo'
	});
}

function tsMouseOut() {
	anime({
		targets: '#tsIcon',
		opacity: [0.15, 0],
		duration: 1000,
		easing: 'easeOutExpo'
	});
	anime({
		targets: '.letter-ts',
		color: ['#3178c6', '#fff'],
		duration: 1000,
		delay: anime.stagger(100),
		easing: 'easeOutExpo'
	});
}

function archMouseOver() {
	anime({
		targets: '#archIcon',
		opacity: [0, 0.15],
		duration: 1000,
		easing: 'easeOutExpo'
	});
	anime({
		targets: '.letter-arch',
		color: ['#000', '#1793d1'],
		duration: 500,
		delay: anime.stagger(100),
		easing: 'easeOutExpo'
	});
	anime({
		targets: '#btw',
		opacity: [0, 0.7],
		duration: 1000,
		easing: 'easeOutExpo'
	});
}
function archMouseOut() {
	anime({
		targets: '#archIcon',
		opacity: [0.15, 0],
		duration: 1000,
		easing: 'easeOutExpo'
	});
	anime({
		targets: '.letter-arch',
		color: ['#1793d1', '#fff'],
		duration: 1000,
		delay: anime.stagger(100, { from: 'last' }),
		easing: 'easeOutExpo'
	});
	anime({
		targets: '#btw',
		opacity: [0.7, 0],
		duration: 1000,
		easing: 'easeOutExpo'
	});
}

function doubleBlinkElectric() {
	// Make the text blink twice as if it were electrified with a green light
	anime({
		targets: '#hecksmosis',
		opacity: [0, 1],
		color: ['#000', '#14eba2'],
		duration: 100,
		easing: 'easeOutExpo',
		complete: () => {
			anime({
				targets: '#hecksmosis',
				opacity: [1, 0],
				duration: 100,
				easing: 'easeOutExpo',
				complete: () => {
					anime({
						targets: '#hecksmosis',
						opacity: [0, 1],
						duration: 100,
						easing: 'easeOutExpo',
						complete: () => {
							anime({
								targets: '#hecksmosis',
								opacity: [
									{ value: [1, 0], duration: 100 },
									{ value: [0, 1], duration: 1000 }
								],
								duration: 1000,
								easing: 'easeOutExpo'
							});
						}
					});
				}
			});
		}
	});
}

export {
	rustMouseOver,
	rustMouseOut,
	tsMouseOver,
	tsMouseOut,
	archMouseOver,
	archMouseOut,
	doubleBlinkElectric
};
