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

//GET TRAP HTML ELEMENTS
const itemButton = document.getElementsByClassName('item-button')
const pickRock = document.querySelector('.rock')
const pickTonic = document.querySelector('.tonic')
const pickCloak = document.querySelector('.cloak')
const pickGoblet = document.querySelector('.goblet')





//GAME PROGRESS
let gameProgress = "="
let roundCount = 0
let trapCheck = false

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

    
    document.querySelector(".ans3").style.display = ""
    document.querySelector(".ans4").style.display = ""
    
    

    // console.log(showQuestion)
    // console.log(showAnswer1)
    // console.log(showAnswer2)
    // console.log(response)
    
}

//TRAP PHASE
const trapPhase = () => {
    trapCheck = true
    document.querySelector('.trap-container').style.display = "grid"
    document.querySelector('.category').style.display = "none"
    document.querySelector('.answers').style.display = "none"
    document.querySelector('.question').style.display = "none"
    document.querySelector('.new-encounter').style.display = "none"
    document.querySelector(".cloak-wrapper").style.display = ""
    document.querySelector(".goblet-wrapper").style.display = ""

    for (let i = 0; i < itemButton.length; i++) {
        itemButton[i].addEventListener('click', () => {
        if (itemButton[i].classList.contains('rock')) {
            document.querySelector('.category').style.display = ""
            document.querySelector('.answers').style.display = "grid"
            document.querySelector('.question').style.display = ""
            document.querySelector('.new-encounter').style.display = ""
            document.querySelector('.trap-container').style.display = "none"
            trapCheck = false
            newEnemyAppears()
    
            
        } else if (itemButton[i].classList.contains('tonic')) {

    
        } else if (itemButton[i].classList.contains('cloak')) {
    
    
        } else if (itemButton[i].classList.contains('goblet')) {
  
    
    
        }
        })
    }


    
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
        hpAmount.innerHTML = Player.health--
        console.log('wrong')
        dungeonExit()
        trapPhase()
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
        hpAmount.innerHTML = Player.health
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
    constructor (name, powerUse, health, powerName) {
        this.name = name
        this.health = 10
        this.powerUse = 0
        this.powerName = powerName
    }
    
    powerGet() {
        power.innerHTML = this.powerName
    }

    getClassTitle() {
        classTitle.innerHTML = this.name

    }

}

Player.health = 10



class Paladin extends Player {
    constructor (name, powerName, powerUse) {
        super ()
        this.name = name
        this.powerName = "Divine Blessing"
        this.powerUse = 0
  
    }
    
    divineBlessing() {
        document.querySelector(".ans3").style.display = "none"
        document.querySelector(".ans4").style.display = "none"
        this.powerUse = this.powerUse + 1
        if (this.powerUse === 3) {
            power.style.display = "none"
        }
    }

}

class Archer extends Player {
    constructor (name, powerName, powerUse) {
        super ()
        this.name = name
        this.powerName = "Lightning Reflexes"
        this.powerUse = 0

        
    }
    
    lightningReflexes() {
        newEnemyAppears()
        this.powerUse = this.powerUse + 1
        if (this.powerUse === 2) {
            power.style.display = "none"
        }
    }

}

class Rogue extends Player {
    constructor (name, powerName, powerUse) {
        super ()
        this.name = name
        this.powerName = "Trap Sense"
        this.powerUse = 0

        
    }
    
    trapSense() {
        document.querySelector(".cloak-wrapper").style.display = "none"
        document.querySelector(".goblet-wrapper").style.display = "none"
        this.powerUse = this.powerUse + 1
        if (this.powerUse === 3) {
            power.style.display = "none"
        }
    }

}

class Wizard extends Player {
    constructor (name, powerName, powerUse) {
        super ()
        this.name = name
        this.powerName = "Chronomancer"
        this.powerUse = 0

    }
    
    chronomancer() {
        document.querySelector('.category').style.display = ""
        document.querySelector('.answers').style.display = "grid"
        document.querySelector('.question').style.display = ""
        document.querySelector('.new-encounter').style.display = ""
        document.querySelector('.trap-container').style.display = "none"
        trapCheck = false
        newEnemyAppears()
        this.powerUse = this.powerUse + 1
        if (this.powerUse === 2) {
            power.style.display = "none"
        }
    }

}
//CLASS CONSTANTS
const player1 = new Player('Paladin', 0, 10, 'Divine Blessing')
const newPal = new Paladin('Paladin')

const player2 = new Player('Archer', 0, 10, 'Lightning Reflexes')
const newArc = new Archer('Archer')

const player3 = new Player('Rogue', 0, 10, 'Trap Sense')
const newRog = new Rogue('Rogue')

const player4 = new Player('Wizard', 0, 10, 'Chronomancer')
const newWiz = new Wizard('Wizard')

//SET CLASS

for (let i = 0; i < classButton.length; i++) {
    classButton[i].addEventListener('click', () => {
    document.querySelector('.class-picker-container').style.display = "none"
    document.querySelector('.question-wrapper').style.display = "grid"
    document.querySelector('.answers').style.display = "grid"
    document.querySelector('.dungeon-prog').style.display = "grid"

    if (classButton[i].classList.contains('paladin')) {
        player1.getClassTitle(newPal)
        player1.powerGet(newPal)

        console.log(newPal)

        
    } else if (classButton[i].classList.contains('archer')) {
        player2.getClassTitle(newArc)
        player2.powerGet(newArc)
        console.log(newArc)

    } else if (classButton[i].classList.contains('rogue')) {
        player3.getClassTitle(newRog)
        player3.powerGet(newRog)
        console.log(newRog)

    } else if (classButton[i].classList.contains('wizard')) {
        player4.getClassTitle(newWiz)
        player4.powerGet(newWiz)
        console.log(newWiz)


    }
    })
}



//USE POWER
power.addEventListener('click', () => {
    if (trapCheck === false) {
        if (power.innerHTML === 'Divine Blessing') {
            newPal.divineBlessing()
    
        } else if (power.innerHTML === 'Lightning Reflexes') {
            newArc.lightningReflexes()
    
        } else if (power.innerHTML === 'Trap Sense') {
            alert('This ability can only be used in the trap phase')
        } else if (power.innerHTML === 'Chronomancer') {
            alert('This ability can only be used in the trap phase')
        }

    } else if (trapCheck === true) {
        if (power.innerHTML === 'Divine Blessing') {
            alert('This ability can only be used in the question phase')
    
        } else if (power.innerHTML === 'Lightning Reflexes') {
            alert('This ability can only be used in the question phase')
    
        } else if (power.innerHTML === 'Trap Sense') {
            newRog.trapSense()
            
        } else if (power.innerHTML === 'Chronomancer') {
            newWiz.chronomancer()
            
        }
    }
})
