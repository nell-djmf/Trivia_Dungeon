const DOMAIN = 'https://opentdb.com/api.php?amount=50&type=multiple'

//CLASS PICK
const classButton = document.getElementsByClassName('class-button')
const pickPal = document.querySelector('.paladin')
const pickArc = document.querySelector('.archer')
const pickRog = document.querySelector('.rogue')
const pickWiz = document.querySelector('.wizard')



//GET TRIVIA HTML ELEMENTS
const newEncounter = document.querySelector('.new-encounter')
const category = document.querySelector('.category')
const question = document.getElementsByClassName('question')[0]
const progress = document.querySelector('.prog-bar')
const power = document.querySelector('.powers')
const hpAmount = document.querySelector(".HP-amount")
const classTitle = document.querySelector('.power-title')




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
        hpAmount.innerHTML = Player.health.value--
        console.log('wrong')
        dungeonExit()
    }
    })
}


//GAME CONDITIONS
const dungeonExit = () => {
    if (gameProgress === "==========" && Player.health > 0) {
        alert('You win! Press ok to play again')
        gameProgress = "="
        gameProgress.innerHTML = gameProgress
        Player.health = 10
        hpAmount.innerHTML = health
    } else if (Player.health < 0) {
        alert('You died. Press ok to play again')
        gameProgress = "="
        gameProgress.innerHTML = gameProgress
        Player.health = 10
        hpAmount.innerHTML = Player.health
    }
}



//CLASSES

class Player {
    constructor (name, powerUse, health) {
        this.name = name
        this.health = 10
        this.powerUse = 0 
    }
    
    powerGet() {
        power.innerHTML = this.powerName
    }

    getClassTitle() {
        classTitle.innerHTML = this.name

    }

}



class Paladin extends Player {
    constructor (name, powerName) {
        super ()
        this.name = name
        this.powerName = "Divine Blessing"

  
    }
    
    divineBlessing() {
        document.getElementsByClassName("ans3 ans4").style.display = "none"
        powerUse = powerUse++
        if (powerUse === 3) {
            power.style.display = "none"
        }
    }

}

class Archer extends Player {
    constructor (name, powerName) {
        super ()
        this.name = name
        this.powerName = "Lightning Reflexes"

        
    }
    
    lightningReflexes() {
        newEnemyAppears()
        powerUse = powerUse++
        if (powerUse === 2) {
            power.style.display = "none"
        }
    }

}

class Rogue extends Player {
    constructor (name, powerName) {
        super ()
        this.name = name
        this.powerName = "Trap Sense"

        
    }
    
    trapSense() {
        document.getElementsByClassName("trap3 trap4").style.display = "none"
        powerUse = powerUse++
        if (powerUse === 3) {
            power.style.display = "none"
        }
    }

}

class Wizard extends Player {
    constructor (name, powerName) {
        super ()
        this.name = name
        this.powerName = "Chronomancer"

    }
    
    chronomancer() {
        newEnemyAppears()
        powerUse = powerUse++
        if (powerUse === 2) {
            power.style.display = "none"
        }
    }

}


//SET CLASS

for (let i = 0; i < classButton.length; i++) {
    classButton[i].addEventListener('click', () => {
    document.querySelector('.class-picker-container').style.display = "none"
    document.querySelector('.question-wrapper').style.display = "grid"
    document.querySelector('.answers').style.display = "grid"
    document.querySelector('.dungeon-prog').style.display = "grid"

    if (classButton[i].classList.contains('paladin')) {
        const player1 = new Player('Paladin', 0, "10")
        const newPal = new Paladin('Paladin')
        player1.getClassTitle(newPal)
        player1.powerGet(newPal)

        console.log(newPal)

        
    } else if (classButton[i].classList.contains('archer')) {
        const player1 = new Player('Archer', 0, "10")
        const newArc = new Archer('Archer')
        player1.getClassTitle(newArc)
        player1.powerGet(newArc)
        console.log(newArc)

    } else if (classButton[i].classList.contains('rogue')) {
        const player1 = new Player('Rogue', 0, "10")
        const newRog = new Rogue('Rogue')
        player1.getClassTitle(newRog)
        player1.powerGet(newRog)
        console.log(newRog)

    } else if (classButton[i].classList.contains('wizard')) {
        const player1 = new Player('Wizard', 0, "10")
        const newWiz = new Wizard('Wizard')
        player1.getClassTitle(newWiz)
        player1.powerGet(newWiz)
        console.log(newWiz)


    }
    })
}