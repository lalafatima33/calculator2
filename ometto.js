const input = document.querySelector('.input')
input.addEventListener('keydown', getInput)

const error = document.querySelector('.error')

const history = document.querySelector('.history')
const mathOperations = document.querySelectorAll('.math-operation')
mathOperations.forEach(button =>{
  button.addEventListener('click', getMathOperation)
})


const result = document.querySelector('.result')
result.addEventListener('click', getResult)

let firstNumber


//2 usages
function getInput(event){
if (event) {
  if(!isNumeric(event)) {
    event.preventDefault()
    input.value = ''
    showError()
    return
  }
}
return input.value
}


//2 usages

function getMathOperation(event){
event.preventDefault()

if(!input.value) {
  showError()
  return
}
const curBtn = event.target

curBtn.classList.add('current-operation')





let first = getInput()
if(!first)return
firstNumber = Number(first)

switch (curBtn.innerText){
  case '+':
    first += ' +'
    break
  case '-':
    first += ' -'
  break
  case 'x':
    first += ' x'
    break
    case '/':
      first +=' /'
      break


}

const calculation = document.createElement('div')
calculation.className = 'calculation'
calculation.innerText = first
history.append(calculation)

input.value=""
input.focus()
}



function getResult(event) {
event.preventDefault()
if(!firstNumber) return

const mathOperations = document.querySelectorAll('.math-operation')
mathOperations.forEach(button => {
  button.classList.remove('current-operation')
})
const calculations = document.querySelectorAll('.calculation')
const lastCalculation = calculations[calculations.length - 1]
let calculation = lastCalculation.innerText

const operation = calculation[calculation.length - 1]

if(!input.value) {
  lastCalculation.remove()
  showError()
  firstNumber = null
  input.focus()
return
}



calculation += `${input.value} = `

const second = Number(input.value)


switch (operation){
case '+':
  calculation += firstNumber + second
break
case '-':
calculation += firstNumber - second
break

case '/':
  calculation += firstNumber / second
  break

  case '*':
    calculation += firstNumber *second


}

lastCalculation.innerText = calculation
input.value = ''
input.focus()
firstNumber = null
}
//1 usages
function isNumeric(keyboardEvent){
  const charCode = keyboardEvent.keyCode
return charCode > 47 && charCode < 58
}

function showError(){
error.style.display = 'block'

setTimeout(()=>{
  error.style.display ='none'
}, 1000)
}

window.addEventListener('beforeunload', ()=>{
  input.removeEventListener('keydown', getInput)
mathOperations.forEach(button=> {
  button.removeEventListener('click', getMathOperation)
})


result.removeEventListener('click', getResult)
})

