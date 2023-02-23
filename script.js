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

function addBehaviour(){}

let input = ['', '', '']
let aux = 0
const excludedButtons = ["C","CE","1/x","x²","√x","+/-",","]
const operators = ['+', '-', 'x', '÷']

for(let i = 1; i < keyboardContainer.childElementCount; i++){
    let botao = keyboardContainer.children[i].children[0]

    if(!excludedButtons.includes(botao.innerText)){
        botao.addEventListener("click", () => {
            let userInput = botao.innerText
            
            if (userInput == "=") {
                runOperation()
                // Pegar o resultado e joga na primeira posicao do array
                // e espera receber outra operação
                // aqui vai tambem a parte do historico dando push no array 
            } else {
                if (operators.includes(userInput)) {
                    input[1] += userInput
                    aux = 2
                } else {
                    input[aux] += userInput
                }
                displayValue()
            }

            console.log(input)


        })
    }

}   

function displayValue() {
    equation.innerText = input.join(" ")
}

function clearDisplay(){
    input = []
    displayValue() 
}


function runOperation() {
    let operando1 = Number(input[0])

    let operador = input[1]

    let operando2 = Number(input[2])

    switch (operador) {
        case "+":
            equationResult.innerText = operando1 + operando2
            break
        case "-":
            equationResult.innerText = operando1 - operando2
            break
        case "x":
            equationResult.innerText = operando1 * operando2
            break
        case "÷":
            equationResult.innerText = operando1 / operando2
            break
    }
} 