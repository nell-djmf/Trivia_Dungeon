const DOMAIN = 'https://opentdb.com/api.php?amount=50&type=multiple'

const newEncounter = document.querySelector('.new-encounter')
const category = document.querySelector('.category')
const question = document.getElementsByClassName('question')[0]
const progress = document.querySelector('.prog-bar')
const power = document.querySelector('.powers')
const hpAmount = document.querySelector(".HP-amount")

let health = "100"
let gameProgress = "="

let answers = document.getElementsByClassName('answer-choice')

const ans1 = document.querySelector('.ans1')
const ans2 = document.querySelector('.ans2')
const ans3 = document.querySelector('.ans3')
const ans4 = document.querySelector('.ans4')

newEncounter.addEventListener('click', () => {
    newEnemyAppears()
})

const newEnemyAppears = async () => {
    let response = await axios.get(
        `https://opentdb.com/api.php?amount=50&type=multiple`
      )
    let showCategory = response.data.results[0].category

    let showQuestion = response.data.results[0].question

    let showAnswer1 = response.data.results[0].correct_answer
    let showAnswer2 = response.data.results[0].incorrect_answers[0]
    let showAnswer3 = response.data.results[0].incorrect_answers[1]
    let showAnswer4 = response.data.results[0].incorrect_answers[2]

    category.innerHTML = showCategory

    question.innerHTML = showQuestion

    ans1.innerHTML = showAnswer1
    ans2.innerHTML = showAnswer2
    ans3.innerHTML = showAnswer3
    ans4.innerHTML = showAnswer4
    
    

    console.log(showQuestion)
    console.log(showAnswer1)
    console.log(showAnswer2)
    console.log(response)
    
}


for (let i = 0; i < answers.length; i++) {
    answers[i].addEventListener('click', () => {
    if (answers[i].classList.contains('ans1')) {
        gameProgress = gameProgress + "="
        progress.innerHTML = gameProgress
        console.log('correct')
        newEnemyAppears()
        dungeonExit()
    } else {
        newEnemyAppears()
        hpAmount.innerHTML = health--
        console.log('wrong')
    }
    })
}

const dungeonExit = () => {
    if (gameProgress === "==========") {
        console.log('you win')
    }
}

    
