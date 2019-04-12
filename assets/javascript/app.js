
// GLOBAL VARIABLES
// =================================================================================================
// An array of objects that holds the questions 
var questions = [{
        name: "Sun Distance",
        ques: "What is the distance between Earth and the Sun?",
        answers: ["93,000,000 Miles", "20,000 Miles", "1 Light Year", "50,000,000 Miles"],
        correctAnswer: "93,000,000 Miles",
        gif: "https://media.giphy.com/media/IHS7SECJrH62Q/giphy.gif"
    },
    {
        name: "Universe Age",
        ques: "How old is the Universe in years?",
        answers: ["93 Million", "6,000", "20,000 Light Years", "13.8 Billion"],
        correctAnswer: "13.8 Billion",
        gif: "https://media.giphy.com/media/nBUW1suj9CZaw/giphy.gif"
    },
    {
        name: "Most Common Galaxy",
        ques: "What type of galaxy is most common in the Universe?",
        answers: ["Milky Way Galaxy", "Elliptical Galaxy", "Spiral Galaxy", "Irregular Galaxy"],
        correctAnswer: "Elliptical Galaxy",
        gif: "https://media.giphy.com/media/I7V6Te1Ka0U00/source.gif"
    },
    {
        name: "Event Horizon",
        ques: "What has a gravitational pull so strong that even light cannot escape it?",
        answers: ["Star", "Nebula", "A Black Hole", "Uranus"],
        correctAnswer: "A Black Hole",
        gif: "https://media.giphy.com/media/MTExsM5czIx7W/giphy.gif"
    },
    {
        name: "Our Sun",
        ques: "Which is the most predominant element in the Sun?",
        answers: ["Helium", "Oxygen", "Nitrogen", "Hydrogen"],
        correctAnswer: "Hydrogen",
        gif: "https://media.giphy.com/media/ctGFLebG1AqK4/giphy.gif"
    },
    {
        name: "Largest Planet",
        ques: "Which is the largest planet in our solar system?",
        answers: ["Mercury", "Earth", "Jupiter", "Venus"],
        correctAnswer: "Jupiter",
        gif: "https://media.giphy.com/media/Q3zXBckIqTNbG/giphy.gif"
    },
    {
        name: "Smallest Planet",
        ques: "Which is the smallest planet in our solar system??",
        answers: ["Earth", "Mercury", "Mars", "Saturn"],
        correctAnswer: "Mercury",
        gif: "https://media.giphy.com/media/l0HlO4V8iCRME3i0g/source.gif"
    },
    {
        name: "Solar Eclipse",
        ques: "What is it called when the moon casts a shadow on Earth?",
        answers: ["Lunar Eclipse", "Solar Flare", "Solar Eclipse", "Solar Shadow"],
        correctAnswer: "Solar Eclipse",
        gif: "https://media.giphy.com/media/6xZZOrsGl4vkY/giphy.gif"
    },
    {
        name: "Lightspeed",
        ques: "What is the speed of light?",
        answers: ["93,000,000 mph", "5,000 m/s", "299,792,458 m/s", "250,000 mph"],
        correctAnswer: "299,792,458 m/s",
        gif: "https://media.giphy.com/media/MS9zcAY63RC6I/giphy.gif"
    },
    {
        name: "Light Emission",
        ques: "Which of the following objects emits light?",
        answers: ["Stars", "Moons", "Planets", "Nothing Emits Light"],
        correctAnswer: "Stars",
        gif: "https://media.giphy.com/media/l2Sq61wvnONnxZjWw/source.gif"
    }
]

// Variables to store data for future use
var userChoice = "";
var questionNum = 1;
var maxCount = 10;
var correctCount = 0;
var wrongCount = 0;
var skippedCount = 0;
var selected;
var intervalId;
var timer = 30;
var isRunning = false;
var isDone = false;
var newArray = [];

// FUNCTIONS
// =====================================================================================================
// If timer is not running, start timer
var runTimer = () => {
    if (!isRunning) {
        intervalId = setInterval(countDown, 1000);
        isRunning = true;
    }
}

// Display timer countdown to the HTML
var countDown = () => {
    $("#timeLeft").html("Time remaining <span id=timer>" + timer + "</span> seconds.");
    timer--;

    // If timer hits 0 and there ARE questions remaining, run this logic
    if (timer === -1) {
        skippedCount++;
        stopTimer();
        displayGif();
        $("#answers").html("<div id='skippedText'>Looks like time is up!</div><div>The correct answer is " + selected.correctAnswer + ".</div>")
        answerCheck();
    }
    // If timer hits 0 and there are NO questions remaining, run this logic
    if (timer === -1 && (correctCount + wrongCount + skippedCount) === maxCount) {
        isDone = true;
        displayResults();
        answerCheck();
    }
}

// Stop timer and clear interval
var stopTimer = () => {
    isRunning = false;
    clearInterval(intervalId);
}

// Display one question and answer to the screen at a time
var displayQuestion = () => {
    if(!isDone) {
        // Set timer back to 30 seconds
        timer = 30;
        // Hide message from previous round
        $("#answers").empty();
        // Hide gif from previous question
        $("#gifWrap").css("display", "none");

        // Randomize the questions
        index = Math.floor(Math.random() * questions.length);
        selected = questions[index];
        // Display randomly selected question to HTML
        $("#question").html("Question " + questionNum + ": " + selected.ques)
        questionNum++;

        // Removes question from array after is has been selected
        for( var i = 0; i < questions.length; i++){ 
            if (questions[i] === selected) {
                questions.splice(i, 1);
            } 
        }

        // Iterate through selected question's answers and display them to HTML
        for (i=0; i<selected.answers.length; i++) {
            var selectedAnswers = $("<div>");
            selectedAnswers.addClass("answerChoices");
            selectedAnswers.html(selected.answers[i]);
            $("#answers").append(selectedAnswers);
        }
        runTimer();
        countDown();
        answerCheck();
    }
}

// Capture the users choice and compare answer to correct answer
var answerCheck = () => {
    $(".answerChoices").on("click", function (e) {
        countDown();
        var clickedItem = e.target;
        userChoice = clickedItem.innerText
        // Compare user choice to correct answer
        if (userChoice === selected.correctAnswer) {
            stopTimer();
            displayGif();
            correctCount++;
            $("#answers").html("<div id='correctText'>That's correct!</div><div>The answer is <strong>" + selected.correctAnswer + "</strong>.</div>");
        } else {
            stopTimer();
            displayGif();
            wrongCount++;
            $("#answers").html("<div id='wrongText'>Not quite...</div><div>The correct answer is <strong>" + selected.correctAnswer + "</strong>.</div>");
        }
        // If there are no more questions then this logic runs 
        if ((correctCount + wrongCount + skippedCount) === maxCount) {
            isDone = true;
            stopTimer();
            $("#gifWrap").css("display", "block");
            $("#gif").attr("src" , selected.gif);
            setTimeout(displayResults, 5*1000);
        }
        // Test / Debug
        // console.log("Correct Answer: " + selected.correctAnswer);
        // console.log("Your Answer: " + userChoice);
        // console.log("# Correct: " + correctCount);
        // console.log("# Wrong: " + wrongCount);
        // console.log(" # Skipped: " + skippedCount);
    });
}

var displayGif = () => {
    $("#gifWrap").css("display", "block");
    $("#gif").attr("src" , selected.gif);
    setTimeout(displayQuestion, 5*1000);
}

var displayResults = () => {
    stopTimer();
    $(".gameWrap").css("display", "none");
    $(".resultsWrap").css("display", "grid");
    $("#results").html("<h2>Game Over!</h2>");
    $("#results").append("<h3>Check Out Your Score Below: </h3>");
    $("#results").append("<p>Correct Answers: <span id='correctCount'>" + correctCount + "</span></p>")
    $("#results").append("<p>Wrong Answers: <span id='wrongCount'>" + wrongCount + "</span></p>")
    $("#results").append("<p>Skipped: <span id='skippedCount'>" + skippedCount + "</span></p>")
}

// CLICK EVENTS TO START LOGIC
// ==========================================================================================================
// Display the game when user clicks startBtn
$("#startBtn").on("click", function () { 
    // Reset variables
    newArray = [];
    questionNum = 1;
    correctCount = 0;
    wrongCount = 0;
    skippedCount = 0; 
    // Hide intro and display game
    $(".introWrap").css("display", "none");
    $(".gameWrap").css("display", "grid");
    for(var i = 0; i < questions.length; i++) {
        newArray.push(questions[i]);
    }
    displayQuestion();
});

$("#retryBtn").on("click", function () {
    // Hide results and display intro  
    $(".resultsWrap").css("display", "none");
    $(".introWrap").css("display", "grid");
    // Push the stored array back into "questions" to restart the game
    for(var i = 0; i < newArray.length; i++) {
        questions.push(newArray[i]);
    };
    isDone = false;
});
