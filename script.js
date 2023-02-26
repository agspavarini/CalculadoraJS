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
    console.log("O OPERANDO 2 NÃO É VAZIO");
    const equationResult = solveEquation();
    resetEquationItems();

    equationItems.operand1 = String(equationResult);
    equationItems.operationName = arithmeticOperationName;
    equationItems.operationSymbol = arithmeticOperationSymbol;

    const partialEquationString = `${equationItems.operand1} ${equationItems.operationSymbol}`;
    updateDisplayContent(partialEquationString, equationItems.operand1);

  } else {
    console.log("O OPERANDO 2 É VAZIO");

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

    if (equationItems.result !== "") {
      equationItems.operand1 = equationItems.result;
    }
    console.log(equationItems);

    const equationResult = solveEquation();

    const equationResultString = String(equationResult);
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

    const isPartialEquation = (equationItems.operand1 !== "" && equationItems.operationName !== "");

    if (isPartialEquation) {
      equationItems.operand2 = "0";
    } else {
      equationItems.operand1 = "0";
    }

    updateDisplayContent(null, "0");

  }

}

function onBackspaceOperation() {
  console.clear()
  console.log("O USUÁRIO CLICOU NO BOTÃO DE BACKSPACE");

  if (isEquationSolved()) {

    const equationResultString = equationItems.result;

    resetEquationItems();

    equationItems.result = equationResultString
    updateDisplayContent("", equationItems.result);
    
    return;
  }

  if (hasOperator()) {

    // REMOVE CHARACTERS FROM SECOND OPERATOR
    if (equationItems.operand2 !== "") {
      console.log("REMOVING LAST DIGIT FROM SECOND OPERAND");
      equationItems.operand2 = removeLastDigitFromString(equationItems.operand2);
      updateDisplayContent(null, equationItems.operand2);
    }

  } else {
    // REMOVE CHARACTERS FROM FIRST OPERATOR
    if (equationItems.operand1 !== "0") {
      console.log("REMOVING LAST DIGIT FROM FIRST OPERAND");
      equationItems.operand1 = removeLastDigitFromString(equationItems.operand1);
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

  if (hasOperator()) {
    // ADD COMMA AT THE END OF SECOND OPERAND

    

  } else {
    // ADD COMMA AT THE END OF FIRST OPERAND
  }

}

// ############################# KEYBOARD EVENTS #############################

// ############################# UTILITARY FUNCTIONS #############################

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

  switch (equationItems.operationName) {
    case "sum":
      result = Number(equationItems.operand1) + Number(equationItems.operand2);
      break;
    case "sub":
      result = Number(equationItems.operand1) - Number(equationItems.operand2);
      break;
    case "mul":
      result = Number(equationItems.operand1) * Number(equationItems.operand2);
      break;
    case "div":
      if (Number(equationItems.operand2) !== 0) {
        result = result =
          Number(equationItems.operand1) / Number(equationItems.operand2);
      } else {
        result = 0;
      }
      break;
    default:
      break;
  }

  equationItems.result = String(result);

  return result;
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
