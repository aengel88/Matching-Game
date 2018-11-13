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
	}

	init() {
		this.characters = this._shuffle(this.characters);

		const that = this;

		this.elCharacterImg.each(function(index) {
			const img = $('<img>').attr({
				src: that.characters[index].src,
				alt: that.characters[index].alt
			});
			$(this)
				.parent()
				.data('number', that.characters[index].number);
			$(this).append(img);
		});
	}
	//function to randomize function
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
	//place array after randomoze jquery each loop
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
// door open function
$('.door').click(function() {
	$(this).toggleClass('doorOpen');
});
