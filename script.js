const hamburguerButton = document.getElementById("hamburguer-button");
const calculatorModalElement = document.getElementById("calculator-modal");
const closeModalButton = document.getElementById("close-modal");
const keyboardContainer = document.getElementById("keyboard-container");
const resourceDataStackElement = document.getElementById("middle");
const equation = document.getElementById("equation")
const equationResult = document.getElementById("equation-result")
const historyTabElement = document.getElementById("history")
const memoryTabElement = document.getElementById("memory")

const tabData = {
    history: [
        {
            equation: "579 &#215; 789",
            result: "456.831"
        },
        {
            equation: "579 &#215; 789",
            result: "456.831"
        },
        {
            equation: "579 &#215; 789",
            result: "456.831"
        },
        {
            equation: "579 &#215; 789",
            result: "456.831"
        },
        {
            equation: "579 &#215; 789",
            result: "456.831"
        },
        {
            equation: "579 &#215; 789",
            result: "456.831"
        },
        {
            equation: "579 &#215; 789",
            result: "456.831"
        },
    ],
    memory: []
}

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
    handleChangeActiveResource(element)

    const historyData = tabData["history"];

    const historyDataParsedToHTMLString = historyData.reduce((accumulator, historyItem) => {
        return accumulator += `
            <div>
                <p>${historyItem.equation}</p>
                <p>${historyItem.result}</p>
            </div>`
    }, "");

    resourceDataStackElement.innerHTML = historyDataParsedToHTMLString;

});

memoryTabElement.addEventListener("click", (element) => {
    handleChangeActiveResource(element)

    const memoryData = tabData["memory"];

    if (memoryData.length === 0) {
        resourceDataStackElement.innerHTML = "";
    } 

});

let input = ['', '', '']
let aux = 0
const excludedButtons = ["C","CE","1/x","x²","√x","+/-",","]
const operators = ['+', '-', 'x', '÷']

for(let i = 1; i < keyboardContainer.childElementCount; i++){
    let botao = keyboardContainer.children[i].children[0]

    let buttonContent = botao.innerText;
    let op = botao.getAttribute("data-op")

    switch (op) {
        case "clear-entry":
            console.log("Limpando a entrada...");
            break;
        case "sum":
        case "sub":
        case "mul":
        case "div":
        case "number-inverter":
        case "square":
        case "square-root":
            botao.addEventListener("click", () => {
                console.log("O Usuário clicou em uma operação")
                input[1] = op
                console.log(input)
            });
            break;
        case "number":
            botao.addEventListener("click", () => {
            let userInput = botao.innerText
                if (input[1] != '') {
                    input[2] += userInput
                } else {
                    input[0] += userInput
                }
                console.log(input)
            });
            break;
        case "percent":
            break;
        default:
            break;
    }

    // if(!excludedButtons.includes(botao.innerText)){
    //     botao.addEventListener("click", () => {
    //         let userInput = botao.innerText
            
    //         if (userInput == "=") {
    //             runOperation()
    //             // Pegar o resultado e joga na primeira posicao do array
    //             // e espera receber outra operação
    //             // aqui vai tambem a parte do historico dando push no array 
    //         } else {
    //             if (operators.includes(userInput)) {
    //                 input[1] += userInput
    //                 aux = 2
    //             } else {
    //                 input[aux] += userInput
    //             }
    //             displayValue()
    //         }

    //         console.log(input)


    //     })
    // }

}   

function displayValue() {
    equation.innerText = input.join(" ")
}

function clearDisplay(){
    input = []
    displayValue() 
}


function runOperation(operando1, operador, operando2) {
    let result = 0
    //     case "percent":
    //     case "number-inverter":
    //     case "square":
    //     case "square-root":

    switch (operador) {
        case "sum":
            result = operando1 + operando2
            break
        case "sub":
            result = operando1 - operando2
            break
        case "mul":
            result = operando1 * operando2
            break
        case "div":
            result = operando1 / operando2
            break
        case "percent":
            result = op
    }
    return result
} 