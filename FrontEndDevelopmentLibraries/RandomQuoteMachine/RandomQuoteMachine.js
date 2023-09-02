randomColors = ["#FF5733", "#4287F5", "#8B4513", "#E53BFF"];

randomQuote = [
  "The only way to do great work is to love what you do.",
  "In three words I can sum up everything I've learned about life: it goes on.",
  "Success is not final, failure is not fatal: It is the courage to continue that counts.",
  "The only thing we have to fear is fear itself."
];

quoteAuthors = [
  "Steve Jobs",
  "Robert Frost",
  "Winston Churchill",
  "Franklin D. Roosevelt"
];

function generateQuote() {
  console.log("hello");
  let randomNumber;
  do {
    randomNumber = Math.floor(Math.random() * randomColors.length);
  } while (randomNumber === previousRandomNumber);

  previousRandomNumber = randomNumber;

  document.body.style.backgroundColor = randomColors[randomNumber];
  document.getElementById("new-quote").style.backgroundColor =
    randomColors[randomNumber];
  document.getElementById("tumblr-button").style.backgroundColor =
    randomColors[randomNumber];
  document.getElementById("twitter-button").style.backgroundColor =
    randomColors[randomNumber];
  document.getElementById("text").innerHTML =
    '"' + randomQuote[randomNumber] + '"';
  document.getElementById("author").innerHTML =
    "- " + quoteAuthors[randomNumber];
}

let previousRandomNumber = -1;

$(document).ready(function () {
  let randomNumber = Math.floor(Math.random() * randomColors.length);

  generateQuote();

  $("#new-quote").click(function () {
    generateQuote();
  });
});
