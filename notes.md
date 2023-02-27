# Anotações da calculadora

Cada botão possui um atributo ```data-op```, que pode ser um dos seguintes valores:
* memory-clear (MC)
* memory-recall (MR)
* memory-add (M+)
* memory-add (M-)
* memory-save (MS)
* ~~percent (%)~~
* ~~clear-entry (CE)~~
* ~~clear (C)~~
* ~~backspace~~
* ~~number-inverter (1/x)~~
* square
* square-root
* ~~div~~
* ~~mul~~
* ~~sub~~
* ~~sum~~
* sign-inverter
* ~~comma (,)~~
* ~~equals (=)~~
* ~~number~~

Para armazenar o input do usuário, nós iremos criar um vetor chamado ```equationItems```, que possuirá três posições. Cada posição irá representar uma parte da equação:
<br><br>
**equationItems[0]:** Operando 1 <br>
**equationItems[1]:** Operador (+, -, *, etc.) <br>
**equationItems[2]:** Operando 2 <br>
<br>
de modo que, ao juntar os itens contidos dentro de cada posição de ```equationItems```, teremos uma string que representará  uma equação, como, por exemplo:

Se equationItems = ["10", '+', "2"]
então a equação seria 10 + 2

As seguintes funções serão criadas:

* ```function resetEquationItems()```<br>
Essa função será usada para resetar todos os itens contidos em ```equationItems```. Um exemplo de uso dessa função pode ser visto abaixo:<br>
    **equationItems** = ["10", '+', "2"]<br>
    resetEquationItems();<br>
    **equationItems** = ["", '', ""]<br><br>

* ```function updateDisplayContent(equation = null, result = null)```<br>
Essa função será usada para atualizar o display da calculadora. Poderá receber dois parâmetros: equation e result. O valor padrão de ambos os parâmetros será ```null```. Caso algum valos seja ```null```, a função não irá realizar nenhuma atualização no display. Somente se uma string for informada como argumento, a função irá atualizar o display. Essa função irá abrangir os seguintes usos:<br>
    **updateDisplayContent(null, null):** Neste caso, a função não realizará nada, pois o valor ```null``` indica que não devemos exibir nada no display.<br>
    **updateDisplayContent("2 + 2"):** Neste caso, a função irá atualizar apenas a equação para 2 + 2.<br>
    **updateDisplayContent(null, "4"):** Neste caso, a função irá atualizar apenas o resultado da equação para 4.<br>
    **updateDisplayContent("", "0"):** Neste caso, a função irá limpar a equação do display, pois estamos passando uma string vazia, e irá atualizar o resultado para o valor 0.<br>

* ```function addItemToHistory({ equation: String, result: String })```<br>
Essa função irá receber um objeto com o seguinte formato por parâmetro:
```typescript 
{ 
    equation: String, 
    result: String 
}
```
e irá adicionar esse objeto no início da lista do histórico, atuando em um formato de pilha FIFO (first-in first-out).<br><br>

* ```function clearHistory()```<br>
Essa função irá limpar todos os dados do objeto de histórico (```tabData.history```).<br><br>

* ```function reloadHistory()```<br>
Essa função irá recarregar o histórico de modo a refletir o estado do objeto ```tabData.history```. Portanto, essa função será utilizada, por exemplo, após a chamada da função ```clearHistory()```, que irá apenas limpar o objeto que contém os dados do histórico. Além disso, poderá ser utilizada quando o usuário realizar uma função que adicione um item no histórico. Exemplos de uso:<br>
```javascript
    reloadHistory();
    tabData.history.push({
        equation: "90 + 1",
        result: "91"
    });
    reloadHistory();
```
* ```function handleCalculatorOperation(button)```<br>
Essa função irá encapsular todas  as funções que podem ser desempenhadas pela calculadora. Como parâmetro, espera um botão.<br>

* ```function onUserClickOnNumberButton(button)```<br>
* ```function setOperator(operator)```<br>
* ```function hasOperator(operator)```<br>

## Comportamento de cada botão do teclado

* **number**<br>
Sempre que o usuário clicar em um botão com o ```data-op``` com o valor "number", o programa deverá interpretar como um valor numérico do teclado. Portanto, acessando a propriedade ```button.innerText```, teremos o número que o usuário clicou. Antes de registrar propriamente o número que o usuário digitou, devemos fazer algumas validações:
    * Precisamos saber se o usuário está digitando o valor do primeiro ou do segundo operando, ```equationItems[0]``` e ```equationItems[2]``` respectivamente. Para isso, podemos usar a função ```hasOperator()```.<br>