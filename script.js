const hamburguerButton = document.getElementById("hamburguer-button");
const calculatorModalElement = document.getElementById("calculator-modal");
const closeModalButton = document.getElementById("close-modal");

const resourceDataStackElement = document.getElementById("middle");

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