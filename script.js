/* ########################################## REFERENCE TO HTML ELEMENTS ########################################## */

const hamburguerButton = document.getElementById("hamburguer-button");
const calculatorModalElement = document.getElementById("calculator-modal");
const closeModalButton = document.getElementById("close-modal");

// Sessão responsável por exibir o histórico e a memória
const resourceDataStackElement = document.getElementById("middle");

const historyTabElement = document.getElementById("history");
const memoryTabElement = document.getElementById("memory");

const keyboardContainer = document.getElementById("keyboard-container");
const displayEquationElement = document.getElementById("equation");
const displayEquationResultElement = document.getElementById("equation-result");

/* ########################################## REFERENCE TO HTML ELEMENTS ########################################## */

const tabData = {
  history: [
    {
      equation: "579 &#215; 789",
      result: "456.831",
    },
    {
      equation: "579 &#215; 789",
      result: "456.831",
    },
    {
      equation: "579 &#215; 789",
      result: "456.831",
    },
    {
      equation: "579 &#215; 789",
      result: "456.831",
    },
    {
      equation: "579 &#215; 789",
      result: "456.831",
    },
    {
      equation: "579 &#215; 789",
      result: "456.831",
    },
    {
      equation: "579 &#215; 789",
      result: "456.831",
    },
  ],
  memory: [],
};
const equationItems = {
  operand1: "0",
  operationName: "",
  operationSymbol: "",
  operand2: "",
  result: "",
};

function addKeyboardButtonsEvent() {
  const keyboardItems = keyboardContainer.children;

  for (let itemIndex = 1; itemIndex < keyboardItems.length; itemIndex++) {
    const buttonElement = keyboardItems[itemIndex].children[0];
    const buttonOperation = buttonElement.getAttribute("data-op");

    switch (buttonOperation) {
      case "number":
        buttonElement.addEventListener("click", onUserClickOnNumberButton);
        break;
      case "sum":
      case "sub":
      case "div":
      case "mul":
        buttonElement.addEventListener("click", onBasicArithmeticOperation);
        break;
      case "equals":
        buttonElement.addEventListener("click", onEqualsOperation);
        break;
      case "clear":
        buttonElement.addEventListener("click", onClearOperation);
        break;
      case "clear-entry":
        buttonElement.addEventListener("click", onClearEntryOperation);
        break;
      case "backspace":
        buttonElement.addEventListener("click", onBackspaceOperation);
        break;
      case "percent":
        buttonElement.addEventListener("click", onPercentOperation);
        break;
      case "comma":
        buttonElement.addEventListener("click", onCommaOperation);
        break;
      case "number-inverter":
        buttonElement.addEventListener("click", onNumberInverterOperation);
        break;
      case "square":
        buttonElement.addEventListener("click", onSquareOperation);
        break;
      case "square-root":
        buttonElement.addEventListener("click", onSquareRootOperation);
        break;
      default:
        break;
    }
  }
}

function resetEquationItems() {
  console.log("RESETANDO OS ITENS DA EQUAÇÃO");
  equationItems.operand1 = "0";
  equationItems.operand2 = "";
  equationItems.operationName = "";
  equationItems.operationSymbol = "";
  equationItems.result = "";
}

function updateDisplayContent(equation = null, result = null) {
  if (equation != null) {
    console.log("ATUALIZANDO A EQUAÇÃO");
    displayEquationElement.innerHTML = String(equation);
  }

  if (result != null) {
    console.log("ATUALIZANDO O RESULTADO DA EQUAÇÃO");
    displayEquationResultElement.innerHTML = String(result);
  }
}

function addItemToHistory(item) {
  tabData.history.unshift(item);
}

function clearHistory() {
  tabData.history = [];
}

/*
    ! REFACTOR TO EXECUTE WITH equationItems OBJECT
*/
function reloadHistory() {
  resourceDataStackElement.innerHTML = "";

  if (tabData.history.length > 0) {
    for (let i = 0; i < tabData.history.length; i++) {
      const divElement = document.createElement("div");
      const equationElement = document.createElement("p");
      const equationResultElement = document.createElement("p");

      equationElement.innerHTML = tabData.history[i].equation;
      equationResultElement.innerHTML = tabData.history[i].result;

      divElement.append(equationElement, equationResultElement);
      resourceDataStackElement.appendChild(divElement);
    }
  }
}

// ############################# FUNÇÕES NÃO DOCUMENTADAS AINDA #############################

// ############################# KEYBOARD EVENTS #############################

function onUserClickOnNumberButton(element) {
  console.clear();
  console.log("O USUÁRIO CLICOU EM UM NÚMERO");
  const buttonNumber = element.target.innerText;

  if (isEquationSolved()) {
    updateDisplayContent("", buttonNumber);
    resetEquationItems();
  }

  if (hasOperator()) {
    if (equationItems.operand2 === "0") {
      equationItems.operand2 = buttonNumber;
    } else {
      equationItems.operand2 += buttonNumber;
    }

    updateDisplayContent(null, equationItems.operand2);
  } else {
    if (equationItems.operand1 === "0") {
      equationItems.operand1 = buttonNumber;
    } else {
      equationItems.operand1 += buttonNumber;
    }

    updateDisplayContent(null, equationItems.operand1);
  }
}

function onBasicArithmeticOperation(element) {
  const arithmeticOperationName = element.target.getAttribute("data-op");
  const arithmeticOperationSymbol = element.target.innerText;

  console.log(equationItems);

  if (equationItems.operand2 !== "") {
    const equationResult = solveEquation();
    resetEquationItems();

    equationItems.operand1 = String(equationResult).replace(".", ",");
    equationItems.operationName = arithmeticOperationName;
    equationItems.operationSymbol = arithmeticOperationSymbol;

    const partialEquationString = `${equationItems.operand1} ${equationItems.operationSymbol}`;
    updateDisplayContent(partialEquationString, equationItems.operand1);
  } else {
    if (equationItems.result !== "") {
      equationItems.operand1 = equationItems.result;
      equationItems.result = "";
    }

    setOperator(arithmeticOperationName, arithmeticOperationSymbol);

    const partialEquation = `${equationItems.operand1} ${equationItems.operationSymbol}`;
    console.log(equationItems);
    updateDisplayContent(partialEquation);
  }
}

function onEqualsOperation(element) {
  console.clear();
  console.log("O USUÁRIO CLICOU NO BOTÃO DE IGUAL");

  if (
    hasOperator() &&
    equationItems.operand2 === "" &&
    equationItems.operand1 !== ""
  ) {
    equationItems.operand2 = equationItems.operand1;
  }

  if (isEquationComplete()) {
    console.log("EQUATION IS COMPLETED! SOLVING THE EQUATION....");

    if (equationItems.result !== "") {
      equationItems.operand1 = equationItems.result;
    }
    console.log(equationItems);

    const equationResult = solveEquation();

    console.log(`equationResult: ${equationResult}`);

    const equationResultString = String(equationResult).replace(".", ",");
    const fullEquationString = `${equationItems.operand1} ${equationItems.operationSymbol} ${equationItems.operand2} =`;

    updateDisplayContent(fullEquationString, equationResultString);
  }
}

function onClearOperation() {
  console.clear();
  resetEquationItems();
  updateDisplayContent("", "0");
}

function onClearEntryOperation() {
  console.clear();
  console.log("DENTRO DO CLEAN ENTRY");

  if (isEquationEmpty()) {
    console.log("EQUAÇÃO VAZIA!");
    return;
  }

  if (isEquationSolved()) {
    resetEquationItems();
    updateDisplayContent("", "0");
  } else {
    const isPartialEquation =
      equationItems.operand1 !== "" && equationItems.operationName !== "";

    if (isPartialEquation) {
      equationItems.operand2 = "0";
    } else {
      equationItems.operand1 = "0";
    }

    updateDisplayContent(null, "0");
  }
}

function onBackspaceOperation() {
  console.clear();
  console.log("O USUÁRIO CLICOU NO BOTÃO DE BACKSPACE");

  if (isEquationSolved()) {
    const equationResultString = equationItems.result;

    resetEquationItems();

    equationItems.result = equationResultString;
    updateDisplayContent("", equationItems.result);

    return;
  }

  if (hasOperator()) {
    // REMOVE CHARACTERS FROM SECOND OPERATOR
    if (equationItems.operand2 !== "") {
      console.log("REMOVING LAST DIGIT FROM SECOND OPERAND");
      equationItems.operand2 = removeLastDigitFromString(
        equationItems.operand2
      );
      updateDisplayContent(null, equationItems.operand2);
    }
  } else {
    // REMOVE CHARACTERS FROM FIRST OPERATOR
    if (equationItems.operand1 !== "0") {
      console.log("REMOVING LAST DIGIT FROM FIRST OPERAND");
      equationItems.operand1 = removeLastDigitFromString(
        equationItems.operand1
      );
      updateDisplayContent(null, equationItems.operand1);
    }
  }
}

function onPercentOperation() {
  console.clear();
  console.log("O USUÁRIO CLICOU EM PERCENTUAL!");

  if (isEquationComplete()) {
    console.log(equationItems);

    const operand2Percent = Number(equationItems.operand2) / 100;
    equationItems.operand2 = String(operand2Percent);

    const equationString = `${equationItems.operand1} ${equationItems.operationSymbol} ${operand2Percent}`;

    updateDisplayContent(equationString, equationItems.operand2);
    console.log(equationItems);
  } else {
    resetEquationItems();
    updateDisplayContent("0", "0");
  }
}

function onCommaOperation() {
  console.clear();
  console.log("O USUÁRIO CLICOU NA VÍRGULA");

  console.log(equationItems);

  if (isEquationSolved()) {
    resetEquationItems();

    equationItems.operand1 = "0,";
    updateDisplayContent("", equationItems.operand1);

    return;
  }

  if (hasOperator()) {
    // ADD COMMA AT THE END OF SECOND OPERAND

    if (equationItems.operand2 === "") {
      equationItems.operand2 = "0";
    }

    const operandAlreadyHasComma = equationItems.operand2.includes(",");
    console.log(`OPERAND 2 ALREADY HAS A COMMA? ${operandAlreadyHasComma}`);

    if (!operandAlreadyHasComma) {
      equationItems.operand2 = equationItems.operand2.concat(",");
    }

    updateDisplayContent(null, equationItems.operand2);
  } else {
    // ADD COMMA AT THE END OF FIRST OPERAND
    const operandAlreadyHasComma = equationItems.operand1.includes(",");
    console.log(`OPERAND 2 ALREADY HAS A COMMA? ${operandAlreadyHasComma}`);

    if (!operandAlreadyHasComma) {
      equationItems.operand1 = equationItems.operand1.concat(",");
    }

    updateDisplayContent(null, equationItems.operand1);
  }
}

function onNumberInverterOperation() {
  // console.clear()
  console.log("O USUÁRIO CLICOU EM INVERTER NÚMERO");

  if (equationItems.operand1 === "0") {
    resetEquationItems();
    updateDisplayContent("1/(0)", "Não é possível dividir por zero");
    return;
  }

  const invertedNumberResultString = String(
    parseOperand(equationItems.operand1)
  ).replace(".", ",");
  const invertedNumberNotation = `1/(${equationItems.operand1})`;
  equationItems.operand1 = invertedNumberNotation;

  console.log(equationItems);
  updateDisplayContent(invertedNumberNotation, invertedNumberResultString);
}

function onSquareOperation() {
  console.clear();
  console.log("DENTRO DA OPERAÇÃO x²");

  const squareNotation = `sqr(${equationItems.operand1})`;
  const squareResultString = String(squareOperand(squareNotation));

  equationItems.operand1 = squareNotation;
  console.log(equationItems);

  updateDisplayContent(squareNotation, squareResultString);
}

function onSquareRootOperation() {
  console.clear();
  console.log("DENTRO DA OPERAÇÃO DE RAIZ QUADRADA");

  const squareRootNotation = `&#8730;(${equationItems.operand1})`;
  const squareRootResultString = String(squareRootOperand(squareRootNotation)).replace('.', ',');

  equationItems.operand1 = squareRootNotation;

  updateDisplayContent(equationItems.operand1, squareRootResultString);
}

// ############################# KEYBOARD EVENTS #############################

// ############################# UTILITARY FUNCTIONS #############################

function squareOperand(operand) {
  const NUMBER_TO_SQUARE_PATTERN = /\d+/g;
  const numberToSquare = operand.match(NUMBER_TO_SQUARE_PATTERN);

  console.log(`numberToSquare: ${numberToSquare}`);

  if (numberToSquare !== null) {
    const numberToSquareParsed = Number(numberToSquare.join("."));

    if (numberToSquareParsed === 0) {
      return 0;
    }

    if (numberToSquareParsed === 1) {
      return 1;
    }

    let result = numberToSquareParsed;

    const SQR_OCCURRENCIES_PATTERN = /sqr/g;
    const amountOfSquareOperations = operand.match(
      SQR_OCCURRENCIES_PATTERN
    ).length;

    console.log(`amountOfSquareOperations: ${amountOfSquareOperations}`);

    for (let i = 0; i < amountOfSquareOperations; i++) {
      result *= result;
    }

    return result;
  }
}

function squareRootOperand(operand) {
  console.log("DENTRO DA FUNÇÃO squareRootOperand");

  const NUMBER_TO_SQRT_PATTERN = /\((\d)*\,?(\d)*\)/g;
  const numberToSqrtWithParenthesis = operand.match(NUMBER_TO_SQRT_PATTERN);

  console.log(numberToSqrtWithParenthesis);

  if (numberToSqrtWithParenthesis !== null) {

    const numberWithoutParenthesis = numberToSqrtWithParenthesis[0].substring(
      1,
      numberToSqrtWithParenthesis[0].length - 1
    );

    const numberParsed = Number(numberWithoutParenthesis.replace(",", "."));

    let squareRootResult = 0;

    if (numberParsed === 0) {
      squareRootResult = 0;
    } else if (numberParsed === 1) {
      squareRootResult = 1;
    } else {
      squareRootResult = numberParsed;
      console.log(`[BEFORE] squareRootResult: ${squareRootResult}`);
      const SQRT_OCCURRENCIES_PATTERN = /\&\#8730\;/g;
      const amountOfSqrtOperations = operand.match(
        SQRT_OCCURRENCIES_PATTERN
      ).length;

      for (let i = 0; i < amountOfSqrtOperations; i++) {
        squareRootResult = Math.sqrt(squareRootResult);
      }

      return squareRootResult;
    }
  } else {
    return -1;
  }

}

function removeLastDigitFromString(string) {
  let numberWithoutLastDigit = "";

  if (string.length - 1 === 0) {
    numberWithoutLastDigit = "0";
  } else {
    numberWithoutLastDigit = string.substring(0, string.length - 1);
  }

  return numberWithoutLastDigit;
}

function solveEquation() {
  let result = 0;

  const operand1Parsed = parseOperand(equationItems.operand1);
  const operand2Parsed = parseOperand(equationItems.operand2);

  switch (equationItems.operationName) {
    case "sum":
      result = operand1Parsed + operand2Parsed;
      break;
    case "sub":
      result = operand1Parsed - operand2Parsed;
      break;
    case "mul":
      result = operand1Parsed * operand2Parsed;
      break;
    case "div":
      if (operand2Parsed !== 0) {
        result = operand1Parsed / operand2Parsed;
      } else {
        result = 0;
      }
      break;
    default:
      break;
  }

  equationItems.result = String(result).replace(".", ",");

  return result;
}

function parseOperand(operand) {
  console.clear();
  console.log("DENTRO DA FUNÇÃO parseOperand");

  // exemple: 1/(5)
  const INVERTED_NUMBER_PATTERN = /1\/\((\d\)*)/i;
  const COMMA_NUMBER_PATTERN = /(\d)*\,(\d)*/i;
  const SQR_PATTERN = /sqr/g;
  const SQRT_PATTERN = /\&\#8730\;/g;

  const isInvertedNumber = INVERTED_NUMBER_PATTERN.test(operand);
  const haveCommaInNumber = COMMA_NUMBER_PATTERN.test(operand);
  const isQuareOperation = SQR_PATTERN.test(operand);
  const isSqrtOperation = SQRT_PATTERN.test(operand);

  if (isSqrtOperation) {

    return squareRootOperand(operand);

  } else if (isQuareOperation) {

    return squareOperand(operand);

  } else if (isInvertedNumber) {
    const [, denominator] = operand.split("/");
    const denominatorWithoutParenthesis = denominator.substring(
      1,
      denominator.length - 1
    );
    const denominatorHaveComma = COMMA_NUMBER_PATTERN.test(
      denominatorWithoutParenthesis
    );
    let invertedNumberResult = 0;

    if (denominatorHaveComma) {
      invertedNumberResult =
        1 / Number(denominatorWithoutParenthesis.replace(",", "."));
    } else {
      invertedNumberResult = 1 / Number(denominatorWithoutParenthesis);
    }
    console.log(invertedNumberResult);
    return invertedNumberResult;
  } else if (haveCommaInNumber) {
    return Number(operand.replace(",", "."));
  } else {
    return Number(operand);
  }
}

function setOperator(operator, symbol) {
  equationItems.operationName = operator;
  equationItems.operationSymbol = symbol;
}

function hasOperator() {
  return equationItems.operationName !== "";
}

function isEquationComplete() {
  return (
    equationItems.operand1 !== "" &&
    equationItems.operand2 !== "" &&
    equationItems.operationName !== "" &&
    equationItems.operationSymbol !== ""
  );
}

function isEquationEmpty() {
  return (
    equationItems.operand1 === "" &&
    equationItems.operand2 === "" &&
    equationItems.operationName === "" &&
    equationItems.operationSymbol === ""
  );
}

function isEquationSolved() {
  return equationItems.result !== "";
}

// ############################# UTILITARY FUNCTIONS #############################
// ############################# FUNÇÕES NÃO DOCUMENTADAS AINDA #############################
addKeyboardButtonsEvent();

/* ########################################## STYLIZATION PURPOSE ########################################## */
function handleToggleModal() {
  calculatorModalElement.classList.toggle("active");
}

function handleChangeActiveResource(element) {
  const clickedTab = element.target;
  const isResourceActive = clickedTab.className == "active";

  if (!isResourceActive) {
    clickedTab.classList.add("active");

    const hasNextSibling = clickedTab.nextElementSibling;

    if (hasNextSibling) {
      clickedTab.nextElementSibling.classList.remove("active");
    } else {
      clickedTab.previousElementSibling.classList.remove("active");
    }
  }
}

hamburguerButton.addEventListener("click", handleToggleModal);

closeModalButton.addEventListener("click", handleToggleModal);

historyTabElement.addEventListener("click", (element) => {
  handleChangeActiveResource(element);

  // reloadHistory();
});

memoryTabElement.addEventListener("click", (element) => {
  handleChangeActiveResource(element);

  const memoryData = tabData["memory"];

  if (memoryData.length === 0) {
    resourceDataStackElement.innerHTML = "";
  }
});

/* ########################################## STYLIZATION PURPOSE ########################################## */
