

//3. At the top of the game.js file, create a new array called buttonColours and set it to hold the sequence "red", "blue", "green", "yellow" .

var buttonColours = ["red","blue","green","yellow"]

//5. At the top of the game.js file, create a new empty array called gamePattern.

var gamePattern = [];
var userClickedPattern =[];
var started = false;
var level = 0;


$(document).keydown(function(){
    if(!started)
    {
        $("#level-title").text("Level"+level);
        nextSequence();
        started = true;

    }
    
});


$(".btn").click(function() {
    var userChosenColour = $(this).attr('id');
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(currentLevel)
{
    if(gamePattern[currentLevel]===userClickedPattern[currentLevel])
    {
        
        if(userClickedPattern.length===gamePattern.length)
        {
            setTimeout(function (){
                nextSequence();
            },1000);
        }
    }
    else{
        
        playSound("wrong");
        $("body").addClass("game-over");
        $("#level-title").text("Game Over, Press Any Key to Restart");
        setTimeout(function(){
            $("body").removeClass("game-over")
        },200);
       
        startOver()
    }

}



//1. Inside game.js create a new function called nextSequence()
function nextSequence()
{
    userClickedPattern=[];
    level++;
    $("#level-title").text("Level "+level);
    //2. Inside the new function generate a new random number between 0 and 3, and store it in a variable called randomNumber

    var randomnumber = Math.floor(Math.random()*4) ;

    //4. Create a new variable called randomChosenColour and use the randomNumber from step 2 to select a random colour from the buttonColours array.

    var randomChosenColour  = buttonColours[randomnumber];

    //6. Add the new randomChosenColour generated in step 4 to the end of the gamePattern.

    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
   playSound(randomChosenColour);
}
function playSound(name)
{
    var audio = new Audio("sounds/"+name+".mp3");
    audio.play();
}

function animatePress(currentColour)
{
    $("#"+currentColour).addClass("pressed");
    setTimeout(function() {
        $("#"+currentColour).removeClass("pressed");
    },100);
    

}
function startOver()
{
    level = 0;
    gamePattern = [];
    started = false;

}
