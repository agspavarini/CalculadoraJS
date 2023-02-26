const hamburguerButton = document.getElementById("hamburguer-button");
const calculatorModalElement = document.getElementById("calculator-modal");
const closeModalButton = document.getElementById("close-modal");
const keyboardContainer = document.getElementById("keyboard-container");
const resourceDataStackElement = document.getElementById("middle");
const equation = document.getElementById("equation");
const equationResult = document.getElementById("equation-result");
const historyTabElement = document.getElementById("history");
const memoryTabElement = document.getElementById("memory");

const tabData = {
  history: [],
  memory: [],
};

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

  const historyData = tabData["history"];

  const historyDataParsedToHTMLString = historyData.reduce(
    (accumulator, historyItem) => {
      return (accumulator += `
            <div>
                <p>${historyItem.equation}</p>
                <p>${historyItem.result}</p>
            </div>`);
    },
    ""
  );

  resourceDataStackElement.innerHTML = historyDataParsedToHTMLString;
});

memoryTabElement.addEventListener("click", (element) => {
  handleChangeActiveResource(element);

  const memoryData = tabData["memory"];

  if (memoryData.length === 0) {
    resourceDataStackElement.innerHTML = "";
  }
});

let input = ["", "", "", ""];
let aux = 0;
const excludedButtons = ["C", "CE", "1/x", "x²", "√x", "+/-", ","];
const operators = ["+", "-", "x", "÷"];

const operations = {
  sum: "+",
  sub: "-",
  mul: "x",
  div: "÷",
  square: "x²",
  "square-root": ",/",
};

for (let i = 1; i < keyboardContainer.childElementCount; i++) {
  let botao = keyboardContainer.children[i].children[0];

  let buttonContent = botao.innerText;
  let op = botao.getAttribute("data-op");

  switch (op) {
    case "clear-entry":
      // o resultado da tela volta pra 0
      // verifica onde o usuario ta digitando (antes ou apos o sinal)
      // define essa posição no array pra vazio
      botao.addEventListener("click", () => {
        // caso a conta ja esteja completa ele precisa zerar tudo
        if (input[0] != "" && input[1] != "" && input[2] != "") {
          equation.innerText = "";
          equationResult.innerText = "0";
          input = ["", "", ""];
        }
        equationResult.innerText = "0";
        if (input[1] != "") {
          input[2] = "";
        } else {
          input[0] = "";
        }
        console.log(input);
        console.log("Limpando a entrada...");
      });
      break;
    case "clear":
      // Redefine tudo ao padrao, sendo o array e suas posições pra vazio
      // e os displays pra o padrao
      botao.addEventListener("click", () => {
        input = ["", "", ""];
        equation.innerText = "";
        equationResult.innerText = "0";
        console.log("Limpando a entrada...");
      });
      break;
    case "sum":
    case "sub":
    case "mul":
    case "div":
      botao.addEventListener("click", () => {
        // cada vez que clica num sinal
        // coloca o primeiro numero e o sinal pra equacao toda na tela

        // Verificando o usuario digitou um sinal
        // sem digitar o primeiro valor
        // SÓ DEUS SABE O QUE ISSO FAZ
        if (input[0] == "") {
          input[0] = "0";
        }

        if (input[2]) {
          input[2] = "";
        }

        input[1] = op;
        console.log(input);
        equation.innerText = `${input[0]} ${operations[op]}`;
      });
      break;
    case "sign-inverter":
      botao.addEventListener("click", () => {
        if (input[1] != "") {
          // inserindo na segunda posicao
          if (input[2] != "0") {
            let invertedSign = Number(input[2]) * -1;
            input[2] = invertedSign;
            equationResult.innerText = `${invertedSign}`;
          }
        } else {
          // inserindo na primeira posicao
          if (input[0] != "0") {
            let invertedSign = Number(input[0]) * -1;
            input[0] = invertedSign;
            equationResult.innerText = `${invertedSign}`;
          }
        }
      });
      break;
    case "square":
      botao.addEventListener("click", () => {
        // Verifica se o usuário digitou um número
        if (input[0] != "") {
          const number = Number(input[0]);
          const numberSquared = number * number;

          equation.innerText = `sqr(${currentEquation})`;
          equationResult.innerText = String(numberSquared);

          input[0] = numberSquared;
        }
      });

      break;
    case "square-root":
      botao.addEventListener("click", () => {
        // verificaçao se existeu um número
        if (input[0] != "") {
          const number = Number(input[0]);
          let sqrroot = Math.sqrt(number);

          equation.innerText = `sqrt(${number})`;
          equationResult.innerText = String(sqrroot);
          input[0] = sqrroot;
        }
      });

      break;
    case "number":
      botao.addEventListener("click", () => {
        let userInput = botao.innerText;

        if (input[3] != "") {
          console.log("DENTRO DA CONDIÇÃO CABELUDA");
          console.log(input);
          input = [userInput, "", "", ""];
          equation.innerText = "";
          equationResult.innerText = userInput;
        } else if (input[1] != "") {
          input[2] += userInput;
          equationResult.innerText = input[2];
        } else {
          input[0] += userInput;
          equationResult.innerText = input[0];
        }

      });
      break;
    case "percent":
      break;
    case "equals":
      botao.addEventListener("click", () => {
        if (input[0] != "" && input[1] != "" && input[2] != "") {
          const result = runOperation(
            Number(input[0]),
            input[1],
            Number(input[2])
          );
          equation.innerText = `${input[0]} ${operations[input[1]]} ${
            input[2]
          } =`;

          let historyItem = {
            equation: equation.innerText,
            result,
          };
          tabData.history.push(historyItem);

          const historyData = tabData["history"];

          const historyDataParsedToHTMLString = historyData.reduce(
            (accumulator, historyItem) => {
              return (accumulator += `
                            <div>
                                <p>${historyItem.equation}</p>
                                <p>${historyItem.result}</p>
                            </div>`);
            },
            ""
          );

          resourceDataStackElement.innerHTML = historyDataParsedToHTMLString;
          equationResult.innerText = result;
          input[0] = `${result}`;
          input[3] = `${result}`;
        }
        console.log(input);
      });
      break;
    case "backspace":
        botao.addEventListener("click", () => {
        // Aqui

        if (input[1] != '') {
            if (input[2].length - 1 == 0) {
                input[2] = '0';
                equationResult.innerText = input[2];
            } else {
                input[2] = input[2].substring(0, input[2].length - 1);
                equationResult.innerText = input[2];
            }
        } else {
            if (input[0].length - 1 == 0) {
                input[0] = '0';
                equationResult.innerText = input[0];
            } else {
                input[0] = input[0].substring(0, input[0].length - 1);
                equationResult.innerText = input[0];
            }
        }
        
      });

      break;
      default:
      break;
  }
}

function displayValue() {
  equation.innerText = input.join(" ");
}

function clearDisplay() {
  input = [];
  displayValue();
}

function runOperation(operando1, operador, operando2) {
  let result = "0";
  //     case "percent":
  //     case "number-inverter":
  //     case "square":

  switch (operador) {
    case "sum":
      result = operando1 + operando2;
      break;
    case "sub":
      result = operando1 - operando2;
      break;
    case "mul":
      result = operando1 * operando2;
      break;
    case "div":
      result = operando1 / operando2;
      break;
    case "percent":
      result = op;
    case "square-root":

    case "square":
      result = math.square(equationResult.innerText);
  }
  console.log(result);
  return result;
}
