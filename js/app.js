// TODO : 

// change Charachters.(functionality: ✓ , cutomization: ✓ , style: ✓)
// rock enemies.(functionality: ✓, cutomization: ✓, style: ✓)
// earn jewelries.(functionality: ✓, cutomization: ✓, style: ✓)
// score counter.(functionality: ✓, cutomization: ✓, style: ✓)
// lifes.(functionality: ✓, cutomization: ✓, style: ✓)

/*----------------------------------------------------------------*/

// NOT DONE YET:

// background image to body.
// score increasing.

// Up coming features : 

// Storing player's score and show pop up modal if player get the highest score.
// manually restart the game (click button).

/*------------------------------------------------------------------------------------------------*/


const allPlayers = document.querySelector('#allPlayers'); // Seletc all players characters. 
const loseSound = document.querySelector('#fail_effect'); // Sound when player collision happen.
const earnJewelrySound = document.querySelector('#coin_effect'); // Sound when player earn jewelries.

let lifesCounter = 3; // Make player has only three lifes and customize any update(decreasing).

let shuffledallLocations = [];
let jewelriesLoc , rockEnemyLoc = [];

// from https://stackoverflow.com/a/6274398/7997431
function shuffle(array) {
    let counter = array.length;

    // While there are elements in the array
    while (counter > 0) {
        // Pick a random index
        let index = Math.floor(Math.random() * counter);

        // Decrease counter by 1
        counter--;

        // And swap the last element with it
        let temp = array[counter];
        array[counter] = array[index];
        array[index] = temp;
    }

    return array;
}
function shuffleAllArray(){ // shuffle those array, so we can place each of jewelries and rocks randomly every time game has been reset.
    shuffledallLocations = shuffle(allLocations);    
    rockEnemyLoc = shuffledallLocations.slice(0, 4); // Slice 3 location from allRockyRoadLoc array. 
    jewelriesLoc = shuffledallLocations.slice(4, 7); // Slice 3 location from allRockyRoadLoc array.
}
function hideModal(){
    document.querySelector('#lose-modal').style.display = "none";
}
function restart(){ // Restart the game after player lose his lifes.
    player.reset();
    const lifes = document.querySelectorAll('.lifes');
    lifes.forEach(function (item){ // reset lifes(hearts).
        item.style.opacity = "1";  
    });
    
    // Empty the allJewelries array, So we can regenerate it again after game restart.
        allJewelries = [];
    jewelriesLoc = shuffledallLocations.slice(4, 7);
        jewelriesLoc.forEach(function (location) {
            if(location == jewelriesLoc[0]){
                jewelry = new Jewelry(location[0], location[1]);
                jewelry.sprite = 'images/gem-blue.png';
                allJewelries.push(jewelry);
            }  
            if(location == jewelriesLoc[1]){
                jewelry = new Jewelry(location[0], location[1]);
                jewelry.sprite = 'images/gem-green.png';
                allJewelries.push(jewelry);
            }  
            if(location == jewelriesLoc[2]){
                jewelry = new Jewelry(location[0], location[1]);
                jewelry.sprite = 'images/gem-orange.png';
                allJewelries.push(jewelry);
            }
        });
    
    // Pop the last 4 items of allEnemies array, So we can regenerate it again after game restart.
    allEnemies.pop();
    allEnemies.pop();
    allEnemies.pop();
    allEnemies.pop();
    jewelriesLoc = shuffledallLocations.slice(0, 3);
    // For each rock, make it located randomly.
    rockEnemyLoc.forEach(function (location) {
        enemy = new Enemy(location[0], location[1], 0);
        enemy.sprite = 'images/Rock.png';
        allEnemies.push(enemy);
    });
    
    scoreCounter = 0;
    document.querySelector('#score span').innerHTML = scoreCounter;
    lifesCounter = 3;
    
}
// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here.
    this.x = x;
    this.y = y;
    this.speed = speed;

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images.
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // Multiplying any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;
    
    // Return enemy back after it reach the end of rocky road.
    // It will return back with another randomly speed.
    if (this.x > 510) {
        this.x = -50;
        this.speed = 100 + Math.floor(Math.random() * 250);
    };
    
    // Check for collisions between the player and the enemies
    if (player.x < this.x + 70 && player.x + 70 > this.x 
        &&
        player.y < this.y + 70 && player.y + 70 > this.y) {
        player.reset();
        player.fail();
        loseSound.play();
    };
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


// our player class.
var Player = function(x, y){
    this.sprite = 'images/char-boy.png';
    this.x = x;
    this.y = y;
    
    let scoreCounter = 0; // to count player's score 
}

// Update method includes :
    // Changing player's character.
    // Resetting player position after he reach to his destiny.
    // Increase score after every time he win.
Player.prototype.update = function(dt) {
    const chars = document.querySelectorAll('.chars');
    chars.forEach(function(item){
        item.onclick = function(){
            char = item.getAttribute('src');
            player = new Player(202, 405);
            player.sprite = char;
            allPlayers.style.display = "none"; 
        }
    });
    
    if(this.y < 0){
        setTimeout(function(){
            player.reset();
        }, 500);
        
        scoreCounter+=10;
        document.querySelector('#score span').innerHTML = scoreCounter;
    }
    
};

// Draw the player on the screen, required method for game.
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Control player's moves through provided keyboard keys.
Player.prototype.handleInput = function(input) {
    if(input == 'left' && this.x > 0) {
        this.x -= 102;
//        console.log(`player x is ${this.x} and player y is ${this.y}`); // Debuger.
    }
    if(input == 'right' && this.x < 405) {
        this.x += 102;
//        console.log(`player x is ${this.x} and player y is ${this.y}`); // Debuger.
    }
    if(input == 'up' && this.y > 0) {
        this.y -= 83;
//        console.log(`player x is ${this.x} and player y is ${this.y}`); // Debuger.
    }
    if(input == 'down' && this.y < 405) {
        this.y += 83;
//        console.log(`player x is ${this.x} and player y is ${this.y}`); // Debuger.
    }
    if(input == 'p') {
        allPlayers.style.display = "block"; 
    }
    
};

// Reset method, return player to specific position after he win. And then shuffle arrays.
Player.prototype.reset = function() {
    this.x = 202;
    this.y = 405;
    
    shuffleAllArray();
//    if(allJewelries.length == 1 || allJewelries.length == 2 || allJewelries.length == 3)
//    allJewelries = [];
    jewelriesLoc = shuffledallLocations.slice(4, 7);
    if(allJewelries.length == 0){
        jewelriesLoc.forEach(function (location) {
            if(location == jewelriesLoc[0]){
                jewelry = new Jewelry(location[0], location[1]);
                jewelry.sprite = 'images/gem-blue.png';
                allJewelries.push(jewelry);
            }  
            if(location == jewelriesLoc[1]){
                jewelry = new Jewelry(location[0], location[1]);
                jewelry.sprite = 'images/gem-green.png';
                allJewelries.push(jewelry);
            }  
            if(location == jewelriesLoc[2]){
                jewelry = new Jewelry(location[0], location[1]);
                jewelry.sprite = 'images/gem-orange.png';
                allJewelries.push(jewelry);
            }
        });
    }
    
};

// If player fail to cross the road his lifes will be decrease, untill he lose.
Player.prototype.fail = function() {
    const lifes = document.querySelectorAll('.lifes');
    lifesCounter--;
    
    if(lifesCounter == 2){
       lifes[2].style.opacity = "0.2";
    }
    if(lifesCounter == 1){
       lifes[1].style.opacity = "0.2";
    }
    if(lifesCounter == 0){
       lifes[0].style.opacity = "0.2";
        document.querySelector('#lose-modal').style.display = "block";
        scoreCounter = 0;
    }
    
};

// Setting Jewelry class.
var Jewelry = function(x, y){
    this.sprite = 'images/gem-blue.png';
    this.x = x;
    this.y = y;
}
// Draw the jewelry on the screen, required method for game.
Jewelry.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Update method makes jewlery disapeare if player collect it, and then his score will be increase.
Jewelry.prototype.update = function() {

    if (player.x == this.x && player.y == this.y) {
        
        let index = allJewelries.indexOf(this);
        allJewelries.splice(index, 1);
        earnJewelrySound.play();
        scoreCounter+=100;
        document.querySelector('#score span').innerHTML = scoreCounter;
    };
};


let allLocations = [ // all rocky road position. Will shuffle to locate each of jewelries and rocks randomly.
    [-2, -10], [100, -10], [202, -10], [304, -10], [406, -10],
    [-2, 73], [100, 73], [202, 73], [304, 73], [406, 73],
    [-2, 156], [100, 156], [202, 156], [304, 156], [406, 156],
    [-2, 239], [100, 239], [202, 239], [304, 239], [406, 239],
    [-2, 322], [406, 322], [-2, 405], [406, 405]
];

shuffleAllArray();

// All enemies will placed in this array.
let allEnemies = [];
// All jewelries will placed in this array.
let allJewelries = [];


// Location of the 3 enemies on the y axis located on the stone road
const enemyLocation = [63, 147, 230, 147]; // 4 location to generate 4 enemy.


// For each enemy located on the y axis from 0 on the x axis move at random speed
// Until randomly regenerated in the enemy update function above
enemyLocation.forEach(function (locationY) {
    speed = 100 + Math.floor(Math.random() * 200);
    enemy = new Enemy(0, locationY, speed);
    allEnemies.push(enemy);
});

// For each rock, make it located randomly.
rockEnemyLoc.forEach(function (location) {
    enemy = new Enemy(location[0], location[1], 0);
    enemy.sprite = 'images/Rock.png';
    allEnemies.push(enemy);
});

// For each jewelry, make it located randomly.
jewelriesLoc.forEach(function (location) {
    if(location == jewelriesLoc[0]){
        jewelry = new Jewelry(location[0], location[1]);
        jewelry.sprite = 'images/gem-blue.png';
        allJewelries.push(jewelry);
    }  
    if(location == jewelriesLoc[1]){
        jewelry = new Jewelry(location[0], location[1]);
        jewelry.sprite = 'images/gem-green.png';
        allJewelries.push(jewelry);
    }  
    if(location == jewelriesLoc[2]){
        jewelry = new Jewelry(location[0], location[1]);
        jewelry.sprite = 'images/gem-orange.png';
        allJewelries.push(jewelry);
    }
});

// instantiate player objects.
var player = new Player(202, 405);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down',
        80: 'p'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
