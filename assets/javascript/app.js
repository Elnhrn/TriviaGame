$(document).ready(function () {

    // if incorrect, show correct answer
    // show related meme/gif
    // if time is up, go to next question
    // game over
    // timer stops
    // show results: correct, incorrect, unanswered
    // reset button (with new q?)

    // vars
    var triviaGame = {
        1: {
            trivia: "Between what years are millenials born?",
            choices: ["1971-1987", "1981-1997", "1991-2007"],
            answer: "1981-1997",
            img: "assets/images/baby.gif"
        },
        2: {
            trivia: "Which member of the boy band One Direction left the band in March 2015?",
            choices: ["Harry Styles", "Liam Payne", "Zayn Malik"],
            answer: "Zayn Malik",
            img: "assets/images/zayn.gif"
        },
        3: {
            trivia: "Who held Billboard's number-one song for March of 2018 with 'God's Plan?'",
            choices: ["Kanye West", "Drake", "Chris Brown"],
            answer: "Drake",
            img: "assets/images/drake.gif"
        },
        4: {
            trivia: "'Sliding into DMs' means..",
            choices: ["Doing the electric slide in Des Moines", "A specific trick on the Slip-N-Slide", "Stalking someone on social media and messaging them an eggplant"],
            answer: "Stalking someone on social media and messaging them an eggplant",
            img: "assets/images/slide.jpg"
        },
        5: {
            trivia: "What percentage of millenials have a tattoo?",
            choices: ["15%", "40%", "60%"],
            answer: "40%",
            img: "assets/images/tattoo.gif"
        },
        6: {
            trivia: "Who is Queen B?",
            choices: ["Queen Bertha of Kent", "The oldest queen bee in the history of beekeeping", "Beyonce"],
            answer: "Beyonce",
            img: "assets/images/beyonce.gif"
        },
        7: {
            trivia: "Where did the popular saying 'Bye Felicia' come from?",
            choices: ["Friday", "Saturday", "Sunday"],
            answer: "Friday",
            img: "assets/images/felicia.jpg"
        },
        8: {
            trivia: "What do millenials like to eat instead of saving for a house?",
            choices: ["Avocado toast", "Goat cheese", "Free-range chicken"],
            answer: "Avocado toast",
            img: "assets/images/avocado.JPG"
        },
        9: {
            trivia: "What is the new way to 'ghost' someone on dating apps?",
            choices: ["Slaying", "Benching", "Chilling"],
            answer: "Benching",
            img: "assets/images/benching.png"
        },
        10: {
            trivia: "For what movie did Leonardo DiCaprio finally win an Oscar?",
            choices: ["Inception", "The Wolf of Wall Street", "The Revenant"],
            answer: "The Revenant",
            img: "assets/images/leo.png"
        }
    };
    var timeLeft = 20;
    var correct = 0;
    var wrong = 0;
    var unanswered = 0;
    var intervalId;
    var key = 1;

    // functions

    // time remaining: 20s
    function countDown() {
        timeLeft--;
        if (timeLeft > 9) {
            $("#timer").css("display", "block").html("TIME<br>REMAINING<br><div id='timernum'>:" + timeLeft + "</div>");
        } else if (timeLeft < 10 && timeLeft > -1) {
            $("#timer").css("display", "block").html("TIME<br>REMAINING<br><div id='timernum'>:0" + timeLeft + "</div>");
        } else {
            timesUp();
        }
    }

    function showQuestion() {
        timeLeft = 20;
        $(".btn").remove();
        $("#trivia-section").css("display", "block");
        $("#timer #qa-here").empty();
        $("#timer").css("display", "block").html("TIME<br>REMAINING<br><div id='timernum'>:" + timeLeft + "</div>");
        intervalId = setInterval(countDown, 1000);
        showMeTrivia();
    }

    // show trivia question and answers
    function showMeTrivia() {
        $("#qa-here").html("<div class='questions'></div>");
        $("#qa-here").append("<div class='answers'></div>");
        $(".questions").append("<h3>" + triviaGame[key].trivia + "</h3>");
        $(".answers").append("<ul class='list-group'></ul>");
        for (var i = 0; i < Object.keys(triviaGame[key].choices).length; i++) {
            $(".list-group").append("<li class='list-group-item'>" + triviaGame[key].choices[i] + "</li>");
        }
    }

    // when 30s is up (they don't choose an answer) or they choose answer (correct or incorrect) show result with meme 
    function timesUp() {
        clearInterval(intervalId);
        $("#qa-here").empty();
        var msg = $("<h3 id='time'>TIME'S UP!</h3>");
        var correctAnswer = $("<p>The correct answer is <strong>" + triviaGame[key].answer + "</strong>.</p>");
        var addImg = $("<p><img class='meme' src='" + triviaGame[key].img + "'></p>");
        $("#qa-here").append(msg, correctAnswer, addImg);
        unanswered++;
        if (key === 10) {
            clearInterval(intervalId);
            setTimeout(resultPg, 5000);
            return;
        } else {
            clearInterval(intervalId);
            key++;
            setTimeout(showQuestion, 5000);
        }
    }

    function resultPg() {
        var col1 = "<div class='result'><h3 id='right'>CORRECT</H3><h3>" + correct + "</h3></div>";
        var col2 = "<div class='result'><h3 id='wrong'>INCORRECT</H3><h3>" + wrong + "</h3></div>";
        var col3 = "<div class='result'><h3>UNANSWERED</h3><h3>" + unanswered + "</h3></div>";
        var reset = $("<div>").addClass("reset");
        clearInterval(intervalId);
        $("#qa-here").html("<h1>RESULTS</H1>");
        $("#qa-here").append(col1, col2, col3);
        $("#qa-here").append(reset);
        $(".reset").html("START OVER");
    }

    // on click events

    // press start
    $(".start").on("click", function () {
        $(".startlogo").addClass("moveLogo");
        $(".logo").append("<p id='timer'></p>")
        showQuestion();
    });

    $(document).on("click", "li", function () {
        if ($(this).html() === triviaGame[key].answer) {
            $("#qa-here").html("<h3 id='right'>CORRECT!</h3><p>The answer is <strong>" + triviaGame[key].answer + "</strong>.</p><p><img class='meme' src='" + triviaGame[key].img + "'></p>");
            correct++;
        } else {
            $("#qa-here").html("<h3 id='wrong'>WRONG!</h3><p>The correct answer is <strong>" + triviaGame[key].answer + "</strong>. Here's a participation ribbon.</p><p><img class='meme' src='" + triviaGame[key].img + "'></p>");
            wrong++;
        }
        if (key === 10) {
            clearInterval(intervalId);
            setTimeout(resultPg, 5000);
            return;
        } else {
            key++;
        }
        clearInterval(intervalId);
        setTimeout(showQuestion, 5000);
    });

    $(document).on("click", ".reset", function () {
        timeLeft = 20;
        correct = 0;
        wrong = 0;
        unanswered = 0;
        key = 1;
        showQuestion();
    });

});