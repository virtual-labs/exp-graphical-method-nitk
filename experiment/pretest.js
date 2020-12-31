
// Don't touch the below code

(function() {
  function buildQuiz() {
    // we'll need a place to store the HTML output
    const output = [];

    // for each question...
    myQuestions.forEach((currentQuestion, questionNumber) => {
      // we'll want to store the list of answer choices
      const answers = [];

      // and for each available answer...
      for (letter in currentQuestion.answers) {
        // ...add an HTML radio button
        answers.push(
          `<label>
            <input type="radio" name="question${questionNumber}" value="${letter}">
            ${letter} :
            ${currentQuestion.answers[letter]}
          </label>`
        );
      }

      // add this question and its answers to the output
      output.push(
        `<div class="question"> ${currentQuestion.question} </div>
        <div class="answers"> ${answers.join("")} </div>`
      );
    });

    // finally combine our output list into one string of HTML and put it on the page
    quizContainer.innerHTML = output.join("");
  }

  function showResults() {
    // gather answer containers from our quiz
    const answerContainers = quizContainer.querySelectorAll(".answers");

    // keep track of user's answers
    let numCorrect = 0;

    // for each question...
    myQuestions.forEach((currentQuestion, questionNumber) => {
      // find selected answer
      const answerContainer = answerContainers[questionNumber];
      const selector = `input[name=question${questionNumber}]:checked`;
      const userAnswer = (answerContainer.querySelector(selector) || {}).value;

      // if answer is correct
      if (userAnswer === currentQuestion.correctAnswer) {
        // add to the number of correct answers
        numCorrect++;

        // color the answers green
        //answerContainers[questionNumber].style.color = "lightgreen";
      } else {
        // if answer is wrong or blank
        // color the answers red
        answerContainers[questionNumber].style.color = "red";
      }
    });

    // show number of correct answers out of total
    resultsContainer.innerHTML = `${numCorrect} out of ${myQuestions.length}`;
  }

  const quizContainer = document.getElementById("quiz");
  const resultsContainer = document.getElementById("results");
  const submitButton = document.getElementById("submit");


// Don't touch the above code




// Write your MCQs here --- Start --- --------------------

  const myQuestions = [
    {
      question: "Based on the fact that “Higher the elevation of rock Younger will be the rock and vice versa”. Tell which among the following is the youngest rock and the oldest rock from the given contour map. The rocks are Limestone, Shale, Conglomerate, Sandstone<br><img src=\"./images/thick1.png\"\ height='150' width='300'/>",
      answers: {
        a: "Youngest: Limestone, Oldest: Conglomerate",
        b: "Youngest: Shale, Oldest: Conglomerate",
        c: "Youngest: Limestone, Oldest: Sandstone",
        d: "Youngest: Sandstone, Oldest: Conglomerate"
      },
      correctAnswer: "a"
    },
    {
      question: "Which of the following statement is/are true regarding the following contour map<br><img src=\"./images/thick1.png\"\ height='150' width='300'/>",
      answers: {
        a: "Each of the rock beds are inclined with horizontal at angle of 32.15&deg;",
        b: "Each of the rock beds are parallel to horizontal surface i.e Angle of Dip = 0&deg;",
        c: "Thickness of Shale bed rock is less than 100 m at each and every point of the contour map",
        d: "None of the above"
      },
      correctAnswer: "b"
    },
    {
      question: "What is the possible index of the point “X” shown in the contour map below?<br><img src=\"./images/thick2.png\"\ height='150' width='300'/>",
      answers: {
        a: "1150",
        b: "1250",
        c: "1350",
        d: "1450"
      },
      correctAnswer: "b"
    },
    {
      question: "What is the highest index of the contour lines in the map shown below?<br><img src=\"./images/thick3.png\"\ height='150' width='300'/>",
      answers: {
        a: "1300",
        b: "1400",
        c: "1600",
        d: "1500"
      },
      correctAnswer: "c"
    },
    {
      question: "What can be said about the profile represented by the below contour map?<br><img src=\"./images/thick3.png\"\ height='150' width='300'/>",
      answers: {
        a: "It represents a flat region",
        b: "It represents a hill followed by a valley and then again hill",
        c: "It represents a valley followed by a hill and again a valley",
        d: "None of the above"
      },
      correctAnswer: "b"
    }
  ];



// ---------------------------- End -------------------------------








  // display quiz right away
  buildQuiz();

  // on submit, show results
  submitButton.addEventListener("click", showResults);
})();
