
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
      question: "Two dimensional profile of a geological structure is shown<br><img src=\"./images/thick4.png\"\ height='253' width='300' /><br>Determine the angle of dip",
      answers: {
        a: "67.033&deg; to south",
        b: "23.556&deg; to south",
        c: "Irrespective of profile it always remains 0&deg; to south",
        d: "Irrespective of profile it always remains 90&deg; to south"
      },
      correctAnswer: "a"
    },
    {
      question: "If the contour lines are at very large distance to each other, this indicates a ____slope",
      answers: {
        a: "Steep",
        b: "Gentle",
        c: "No significant",
        d: "None of the above"
      },
      correctAnswer: "b"
    },
    {
      question: "The distance measured perpendicular to the upper and lower contact of a tabular unit",
      answers: {
        a: "Outcrop width",
        b: "True thickness",
        c: "Apparent thickness",
        d: "None of the above"
      },
      correctAnswer: "b"
    },
    {
      question: "The distance on the map between the bounding contacts of a tabular unit measured along an azimuth perpendicular to strike",
      answers: {
        a: "Outcrop width",
        b: "True thickness",
        c: "Apparent thickness",
        d: "None of the above"
      },
      correctAnswer: "b"
    },
    {
      question: "Geologic graphics help determination of the geology of an area comprising of the rock formations, their thickness and sequence above or below the ground surface. (Say True or False)",
      answers: {
        a: "True",
        b: "False"
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
