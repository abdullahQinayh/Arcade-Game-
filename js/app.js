
let modal = document.getElementById("popup")
var youScore = 0;
var crashedTimes = 0;
// Enemies our player must avoid
var Enemy = function(Xp, Yp, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.Xp = Xp;
    this.Yp = Yp;
    this.speed = speed;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.Xp += this.speed*dt;
    this.Xp = this.Xp>500?0:this.Xp;
    this.detectCrash();
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.Xp, this.Yp);
};
 // check if the player crashed to the pug 
Enemy.prototype.detectCrash = function() {
    if (player.Yp + 131 >= this.Yp + 90 &&
        player.Yp + 73 <= this.Yp + 135 &&
        player.Xp + 25 <= this.Xp + 88  &&
        player.Xp + 76 >= this.Xp + 11) {
        //  count the crashed times
        document.getElementById("crashed").innerHTML = ++crashedTimes;
        restartGame();
    }
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(Xp, Yp, speed) {
    this.Xp = Xp;
    this.Yp = Yp;
    this.speed = speed;
    this.sprite = 'images/char-boy.png';
};
Player.prototype.update = function(XpNew, YpNew) {

};
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.Xp, this.Yp);
};
Player.prototype.reset = function() {
    this.Xp = 200;
    this.Yp = 410;
    this.speed = 90;
};
Player.prototype.handleInput = function(keypressed) {
    if (keypressed == 'left') {
        this.Xp -= this.speed;
        if (this.Xp < 2) {
            this.Xp = 2;
        }
    } 
    else if (keypressed == 'right') {
        this.Xp += this.speed;
        if (this.Xp > 400) {
            this.Xp = 400;
        }
    } 
    else if (keypressed == 'down') {
        this.Yp += this.speed;
        if (this.Yp > 410) { 
            this.Yp = 410;
        }
    }
    else if (keypressed == 'up') {
        this.Yp -= this.speed;
        if (this.Yp <= (25)) { 
           winGame();
            return;
        }
    }
};


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];
var player = new Player(0, 0, 0);// values doesn't matter, change in reset function


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
    function score() {
        youScore = youScore+1;
    // check win or not 
    if(youScore == 3){
        modal.classList.add("show");
        youScore = 0 ;
        crashedTimes = 0 ;
        }
    };
    // to win the game you gave to reach the sea 3 times
function winGame() {
    score();
    // reset the game
    player.reset();
    document.getElementById("score").innerHTML = youScore;
    document.getElementById("crashed").innerHTML = crashedTimes;
     var probability = parseInt(Math.random()*10);
    if (probability < 5 && allEnemies.length < 5) {
        allEnemies.push(new Enemy(0,40 + Math.random()*100,40 + Math.random()*100));
    }
   
}

function restartGame() {
    modal.classList.remove("show");
    allEnemies = [];
    player.reset();
    allEnemies.push(
        new Enemy(0,40 + Math.random()*100,40 + Math.random()*100),
        new Enemy(0,60 + Math.random()*100,60 + Math.random()*100),
        new Enemy(5,50 + Math.random()*130,70 + Math.random()*100)
        );
}
restartGame();
