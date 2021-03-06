//create card contructor and array
class Character {
	constructor(imgPath, alt, number) {
		this.src = imgPath;
		this.alt = alt;
		this.number = number;
	}
}

const characters = [];
characters[0] = new Character('images/michael.jpg', 'Michael', 1);
characters[1] = new Character('images/michael.jpg', 'Michael', 1);
characters[2] = new Character('images/dwight.jpg', 'Dwight', 2);
characters[3] = new Character('images/dwight.jpg', 'Dwight', 2);
characters[4] = new Character('images/jim.jpg', 'Jim', 3);
characters[5] = new Character('images/jim.jpg', 'Jim', 3);
characters[6] = new Character('images/pam.jpg', 'Pam', 4);
characters[7] = new Character('images/pam.jpg', 'Pam', 4);
characters[8] = new Character('images/stanley.jpg', 'Stanley', 5);
characters[9] = new Character('images/stanley.jpg', 'Stanley', 5);
characters[10] = new Character('images/creed.jpg', 'Creed', 6);
characters[11] = new Character('images/creed.jpg', 'Creed', 6);

const awesome = $('.awesome');
const bad = $('.bad');
const hero = $('.hero');
const beach = $('.beach');
const waste = $('.waste');

//create master game class

class Game {
	//create constructors
	constructor(characters) {
		this.characters = characters;
		this.numOfCharacters = characters.length;
		this.winningMatches = characters.length / 2;
		this.elCharacters = $('.character');
		this.elCharacterImg = $('.character-image');
		this.openedCharacters = [];
		this.matchedCharacter = $('.match');
		this.num1 = null;
		this.num2 = null;
		this.turnTimerIsRunning = false;
		this.matched = 0;
		this.turns = 0;
		this.losingTurns = 5;
	}

	init() {
		this.characters = this._shuffle(this.characters);

		const that = this;
		//place array after randomoze jquery each loop
		this.elCharacterImg.each(function(index) {
			const img = $('<img>').attr({
				src: that.characters[index].src,
				alt: that.characters[index].alt
			});
			$(this)
				.parent()
				.prev()
				.data('number', that.characters[index].number);
			$(this).append(img);
		});
	}
	//function to randomize characters
	_shuffle(array) {
		var currentIndex = array.length,
			temporaryValue,
			randomIndex;

		// While there remain elements to shuffle...
		while (0 !== currentIndex) {
			// Pick a remaining element...
			randomIndex = Math.floor(Math.random() * currentIndex);
			currentIndex -= 1;

			// And swap it with the current element.
			temporaryValue = array[currentIndex];
			array[currentIndex] = array[randomIndex];
			array[randomIndex] = temporaryValue;
		}

		return array;
	}

	gameTurn(door) {
		if (this.turnTimerIsRunning === true) {
			return;
		}

		if (door.hasClass('doorOpen')) {
			return;
		}

		this.openedCharacters.push(door);
		door.addClass('doorOpen');

		if (this.num1 === null) {
			this.num1 = door.data('number');
		} else {
			this.num2 = door.data('number');
		}

		if (this.num2 === null) {
			return;
		}

		if (this.num1 === this.num2) {
			this.turnTimerIsRunning = true;
			this.num1 = null;
			this.num2 = null;
			this.matched++;
			awesome[0].play();
			$('.matches').text(this.matched);
			setTimeout(() => {
				this.openedCharacters.forEach(el => {
					el.addClass('match');
				});
				this.openedCharacters = [];
				this.turnTimerIsRunning = false;
			}, 700);
		} else {
			this.num1 = null;
			this.num2 = null;
			this.turns++;
			waste[0].play();
			$('.attempts').text(this.turns);
			setTimeout(() => {
				this.openedCharacters.forEach(el => {
					el.removeClass('doorOpen');
				});
				this.openedCharacters = [];
				this.turnTimerIsRunning = false;
			}, 700);
		}
		if (this.matched == this.winningMatches)
			setTimeout(() => {
				this.winGame();
			}, 700);
		if (this.turns == this.losingTurns)
			setTimeout(() => {
				this.loseGame();
			}, 700);
	}

	winGame() {
		$('.win-wrapper').toggleClass('win-pop');
		hero[0].play();
	}

	loseGame() {
		$('.lose-wrapper').toggleClass('lose-pop');
		bad[0].play();
		$('video')[0].play();
	}

	//only allow two doors open at a time

	//check to see if cards are matching

	//if matching add an open class

	//add matches to score counter

	//play match track

	//close if not a match
}

let game;

// call method out side/
// start button function
$('#start-button').click(function() {
	$(this)
		.parents('.start-wrapper')
		.toggleClass('close');
	beach[0].play();
	game = new Game(characters);
	game.init();
});

$('#lose-button').click(function() {
	$(this)
		.parents('.lose-wrapper')
		.toggleClass('lose-pop');
	window.location.reload();
	game = new Game(characters);
	game.init();
});

$('#win-button').click(function() {
	$(this)
		.parents('.win-wrapper')
		.toggleClass('win-pop');
	window.location.reload();
	game = new Game(characters);
	game.init();
});
// door open function
$('.door').click(function() {
	//$(this).toggleClass('doorOpen');
	game.gameTurn($(this));
});
