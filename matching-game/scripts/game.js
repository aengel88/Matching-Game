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
		this.losingTurns = 3;
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
			$('.attempts').text(this.turns);
			setTimeout(() => {
				this.openedCharacters.forEach(el => {
					el.removeClass('doorOpen');
				});
				this.openedCharacters = [];
				this.turnTimerIsRunning = false;
			}, 700);
		}
		if (this.matched == this.winningMatches) {
			this.winGame();
		}
		if (this.turns == this.losingTurns) {
			this.loseGame();
		}
	}

	winGame() {
		$('.win-wrapper').toggleClass('win-pop');
	}

	loseGame() {
		$('.lose-wrapper').toggleClass('lose-pop');
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
	game = new Game(characters);
	game.init();
});

$('#lose-button').click(function() {
	$(this)
		.parents('.lose-wrapper')
		.toggleClass('lose-pop');
	game = new Game(characters);
	game.init();
});

$('#win-button').click(function() {
	$(this)
		.parents('.win-wrapper')
		.toggleClass('win-pop');
	game = new Game(characters);
	game.init();
});
// door open function
$('.door').click(function() {
	//$(this).toggleClass('doorOpen');
	game.gameTurn($(this));
});

// const displayCharacter = function() {
// 	this.classList.toggle('disabled');
// };

// //add opened cards to OpenedCards list and check if cards are match or not
// function characterOpen() {
// 	openedCharacters.push(this);
// 	var len = openedCharacters.length;
// 	if (len === 2) {
// 		moveCounter();
// 		if (openedCharacters[0].type === openedCharacters[1].type) {
// 			matched();
// 		} else {
// 			unmatched();
// 		}
// 	}
// }

// // when cards match
// function matched() {
// 	openedCharacters[0].classList.add('match', 'disabled');
// 	openedCharacters[1].classList.add('match', 'disabled');
// 	openedCharacters = [];
// }

// // when cards don't match
// function unmatched() {
// 	openedCharacters[0].classList.add('unmatched');
// 	openedCharacters[1].classList.add('unmatched');
// 	disable();
// 	setTimeout(function() {
// 		openedCharacters[0].classList.remove('.doorOpen', 'unmatched');
// 		openedCharacters[1].classList.remove('.doorOpen', 'unmatched');
// 		enable();
// 		openedCharacters = [];
// 	}, 1100);
// }

// //  disable cards temporarily
// function disable() {
// 	Array.prototype.filter.call(characters, function() {
// 		characters.classList.add('disabled');
// 	});
// }

// //  enable cards and disable matched cards
// function enable() {
// 	Array.prototype.filter.call(characters, function() {
// 		characters.classList.remove('disabled');
// 		for (var i = 0; i < matchedCharacter.length; i++) {
// 			matchedCharacter[i].classList.add('disabled');
// 		}
// 	});
// }
