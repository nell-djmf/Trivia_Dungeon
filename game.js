const DOMAIN = 'https://opentdb.com/api.php?amount=50&type=multiple'

//GET TRIVIA HTML ELEMENTS
const newEncounter = document.querySelector('.new-encounter')
const category = document.querySelector('.category')
const question = document.getElementsByClassName('question')[0]
const progress = document.querySelector('.prog-bar')
const power = document.querySelector('.powers')
const hpAmount = document.querySelector(".HP-amount")


//PLAYER ATTRIBUTES
let powerUse = 0
let health = "10"

//GAME PROGRESS
let gameProgress = "="

//ANSWER HTML ELEMENTS
let answers = document.getElementsByClassName('answer-choice')
const ans1 = document.querySelector('.ans1')
const ans2 = document.querySelector('.ans2')
const ans3 = document.querySelector('.ans3')
const ans4 = document.querySelector('.ans4')


//GET NEW QUESTIONS
newEncounter.addEventListener('click', () => {
    newEnemyAppears()
})


//FETCH QUESTIONS
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

//CHECK ANSWERS
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
        dungeonExit()
    }
    })
}


//GAME CONDITIONS
const dungeonExit = () => {
    if (gameProgress === "==========" && health > 0) {
        alert('You win! Press ok to play again')
        gameProgress = "="
        gameProgress.innerHTML = gameProgress
        health = 10
        hpAmount.innerHTML = health
    } else if (health < 0) {
        alert('You died. Press ok to play again')
        gameProgress = "="
        gameProgress.innerHTML = gameProgress
        health = 10
        hpAmount.innerHTML = health
    }
}



//CLASSES
class Paladin {
    constructor (power) {
        this.health = "10"
        this.power = "Divine Blessing"
        this.powerUse = 0
    }
    
    divineBlessing() {
        document.getElementsByClassName("ans3 ans4").style.display = "none"
        powerUse = powerUse++
        if (powerUse === 3) {
            power.style.display = "none"
        }
    }

}

class Archer {
    constructor (power) {
        this.health = "10"
        this.power = "Lightning Reflexes"
        this.powerUse = 0
    }
    
    lightningReflexes() {
        newEnemyAppears()
        powerUse = powerUse++
        if (powerUse === 2) {
            power.style.display = "none"
        }
    }

}