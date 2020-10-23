const answers = document.getElementById("answer").dataset.answer.split(",");

const inputs = document.getElementsByClassName("missing-word");
const answerInputs = document.getElementsByClassName("answer");

let correctAnswer = 0;

const removeInputsStyle = () => {
  for (let i = 0; i < inputs.length; i++) {
    inputs[i].style.border = "";
  }
};

for (let i = 0; i < inputs.length; i++) {
  inputs[i].addEventListener("input", () => removeInputsStyle());

  inputs[i].addEventListener(
    "input",
    () => (inputs[i].style.minWidth = (inputs[i].value.length + 1) * 7 + "px")
  );
}

const disableButtons = () => {
  document.getElementById("finishBtn").disabled = true;
  document.getElementById("checkBtn").disabled = true;
};

const onCheck = () => {
  for (let i = 0; i < inputs.length; i++) {
    inputs[i].value.trim().toLowerCase() === answers[i]
      ? (inputs[i].style.borderBottom = "2px solid green")
      : (inputs[i].style.borderBottom = "2px solid red");
  }
};

const onFinish = () => {
  disableButtons();
  for (let i = 0; i < inputs.length; i++) {
    inputs[i].disabled = true;
    inputs[i].style.backgroundColor = "lightgrey";
    if (inputs[i].value.trim().toLowerCase() === answers[i]) {
      correctAnswer++;
      inputs[i].style.borderBottom = "2px solid green";
    } else {
      !inputs[i].value && (inputs[i].style.display = "none");

      inputs[i].style.borderBottom = "2px solid red";
      inputs[i].style.textDecoration = "line-through";
      answerInputs[i].disabled = true;
      answerInputs[i].value = answers[i];
      answerInputs[i].style.minWidth =
        (answerInputs[i].value.length + 1) * 7 + "px";
      answerInputs[i].style.borderBottom = "2px solid red";
      answerInputs[i].style.display = "inline";
      answerInputs[i].style.fontWeight = "bold";
      answerInputs[i].style.fontStyle = "italic";
    }
  }
  document.getElementById(
    "submit-result"
  ).innerHTML = `${correctAnswer} / ${answers.length}`;
};

document.getElementById("finishBtn").addEventListener("click", onFinish);

document.getElementById("checkBtn").addEventListener("click", onCheck);
