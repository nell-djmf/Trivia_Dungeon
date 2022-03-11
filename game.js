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
const hpAmount = document.getElementById('HP-amount')
const classTitle = document.querySelector('.power-title')
const combatLog = document.querySelector('.combat-log')

//GET TRAP HTML ELEMENTS
const itemButton = document.getElementsByClassName('item-button')
const pickRock = document.querySelector('.rock')
const pickTonic = document.querySelector('.tonic')
const pickCloak = document.querySelector('.cloak')
const pickGoblet = document.querySelector('.goblet')


//GAME STATUS
let gameProgress = "="
let trapCheck = false

let tonicStatus = false
let cloakStatus = false
let gobletStatus = false
let tonicRoundCount = 0
let cloakRoundCount = 0
let gobletRoundCount = 0

//ANSWER BOX HTML ELEMENTS
let answers = Array.from(document.getElementsByClassName('answer-choice'))
const ans1 = document.querySelector('.ans1')
const ans2 = document.querySelector('.ans2')
const ans3 = document.querySelector('.ans3')
const ans4 = document.querySelector('.ans4')



//FETCH QUESTIONS
const newEnemyAppears = async () => {
    trapCheck = false

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

    progress.innerHTML = gameProgress

    ans1.innerHTML = showAnswer1
    ans2.innerHTML = showAnswer2
    ans3.innerHTML = showAnswer3
    ans4.innerHTML = showAnswer4
    console.log(showAnswer1)
    

    document.querySelector(".ans3").style.display = ""
    document.querySelector(".ans4").style.display = ""
    
    shuffle()
    phaseCheck()
    dungeonExit()
    trapPenalty()
    trapDuration()
}

//Shuffle Answer HTML Elements
const shuffle = () => {
    let shuffleAnswers = document.querySelector('.answers')
    for (let i = shuffleAnswers.children.length; i >= 0; i--) {
        shuffleAnswers.appendChild(shuffleAnswers.children[Math.random() * i | 0])
    }

}

//PHASE CHECK

const phaseCheck = () => {
    if (trapCheck === true) {
        document.querySelector('.trap-container').style.display = "grid"
        document.querySelector('.category').style.display = "none"
        document.querySelector('.answers').style.display = "none"
        document.querySelector('.question').style.display = "none"
        document.querySelector(".cloak-wrapper").style.display = ""
        document.querySelector(".goblet-wrapper").style.display = ""
    } else if (trapCheck === false) {
        document.querySelector('.category').style.display = ""
        document.querySelector('.answers').style.display = "flex"
        document.querySelector('.question').style.display = ""
        document.querySelector('.trap-container').style.display = "none"
        

    }
}

//TRAP PHASE
const trapPhase = () => {
    trapCheck = true 

    pickRock.addEventListener('click', rockTrap = () => {
        alert(`It's just a rock... You're safe.`)
        pickRock.removeEventListener('click', rockTrap)
        pickTonic.removeEventListener('click', tonicTrap)
        pickCloak.removeEventListener('click', cloakTrap)
        pickGoblet.removeEventListener('click', gobletTrap)
        newEnemyAppears()
    })

    pickTonic.addEventListener('click', tonicTrap = () => {
        alert(`The TONIC OF FORGETFULNESS makes your mind hazy. You may have difficulty remembering choices.`)
        tonicStatus = true
        pickRock.removeEventListener('click', rockTrap)
        pickTonic.removeEventListener('click', tonicTrap)
        pickCloak.removeEventListener('click', cloakTrap)
        pickGoblet.removeEventListener('click', gobletTrap)
        newEnemyAppears()
    
    })


    pickCloak.addEventListener('click', cloakTrap = () => {
        alert(`The CLOAK OF ENERGY DAMPENING smothers your senses. Your powers are out of reach, for now.`) 
        cloakStatus = true
        pickRock.removeEventListener('click', rockTrap)
        pickTonic.removeEventListener('click', tonicTrap)
        pickCloak.removeEventListener('click', cloakTrap)
        pickGoblet.removeEventListener('click', gobletTrap)
        newEnemyAppears()
    })


    pickGoblet.addEventListener('click', gobletTrap = () => {
        alert(`Drinking out of the POISONED GOBLET was not a good idea. You feel yourself grow weak.`)
        gobletStatus = true
        pickRock.removeEventListener('click', rockTrap)
        pickTonic.removeEventListener('click', tonicTrap)
        pickCloak.removeEventListener('click', cloakTrap)
        pickGoblet.removeEventListener('click', gobletTrap)
        newEnemyAppears()  
    
    })

}







//TRAP PENALTIES


const trapPenalty = () => {
    if (tonicStatus === true) {
        let hideAnswer = Math.floor(Math.random() * answers.length)
        answers[hideAnswer].style.display = "none"
        tonicRoundCount = tonicRoundCount + 1


    } else if (cloakStatus === true) {
        power.style.display = "none"
        cloakRoundCount = cloakRoundCount + 1


    } else if (gobletStatus === true) {
        Player.health = Player.health - 5
        hpAmount.value = Player.health
        combatLog.innerHTML += ` \n You took 5 damage from poison. HP: ${Player.health}`
        gobletRoundCount = gobletRoundCount + 1


    }
}



const trapDuration = () => {
    if (tonicRoundCount === 3) {
        trapClear()
    }

    if (cloakRoundCount === 3) {
        trapClear()
    }

    if (gobletRoundCount === 3) {
        trapClear()
    }
}
    
const trapClear = () => {
    tonicStatus = false
    cloakStatus = false
    gobletStatus = false
    ans1.style.display = ""
    ans2.style.display = ""
    ans3.style.display = ""
    ans4.style.display = ""
    power.style.display = ""
    roundCount = 0

}


//CHECK ANSWERS
for (let i = 0; i < answers.length; i++) {
    answers[i].addEventListener('click', () => {
    if (answers[i].classList.contains('ans1')) {
        gameProgress = gameProgress + "="
        progress.innerHTML = gameProgress
        newEnemyAppears()
        dungeonExit()
    
    } else {
        progress.innerHTML = gameProgress
        newEnemyAppears()
        damageTaken()
        hpAmount.value = Player.health
        dungeonExit()
        trapPhase()
    }
    })
}

//INCORRECT ANSWER PENALTY
const damageTaken = () => {
    Player.health = Player.health - 10
    combatLog.innerHTML += ` \n You took 10 damage from the trap. HP: ${Player.health}`
}



//GAME CONDITIONS
const dungeonExit = () => {
    if (gameProgress === "==========" && Player.health > 0) {
        alert('You win! Press ok to play again')
        gameProgress = "="
        gameProgress.innerHTML = gameProgress
        Player.health = 100
        hpAmount.value = Player.health
        combatLog.innerHTML = ""
        trapClear()
    } else if (Player.health < 0) {
        alert('You died. Press ok to play again')
        gameProgress = "="
        gameProgress.innerHTML = gameProgress
        Player.health = 100
        hpAmount.value = Player.health
        combatLog.innerHTML = ""
        trapClear()

    }
}



//CLASSES

class Player {
    constructor (name, powerUse, health, powerName, powerColor) {
        this.name = name
        this.health = 100
        this.powerUse = 0
        this.powerName = powerName
        this.powerColor = powerColor
    }
    
    powerGet() {
        power.innerHTML = this.powerName
        power.style.backgroundColor = this.powerColor

    }

    getClassTitle() {
        classTitle.innerHTML = this.name

    }

}

Player.health = 100



class Paladin extends Player {
    constructor (name, powerName, powerUse, powerColor) {
        super ()
        this.name = name
        this.powerName = "Divine Blessing"
        this.powerUse = 0
        this.powerColor = "rgba(130, 15, 13, 0.75)"
  
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
    constructor (name, powerName, powerUse, powerColor) {
        super ()
        this.name = name
        this.powerName = "Lightning Reflexes"
        this.powerUse = 0
        this.powerColor = "rgba(15, 70, 30, 0.75)"

        
    }
    
    lightningReflexes() {
        newEnemyAppears()
        phaseCheck()
        this.powerUse = this.powerUse + 1
        if (this.powerUse === 2) {
            power.style.display = "none"
        }
    }

}

class Rogue extends Player {
    constructor (name, powerName, powerUse, powerColor) {
        super ()
        this.name = name
        this.powerName = "Trap Sense"
        this.powerUse = 0
        this.powerColor = "rgba(28, 39, 131, 0.75"

        
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
    constructor (name, powerName, powerUse, powerColor) {
        super ()
        this.name = name
        this.powerName = "Chronomancer"
        this.powerUse = 0
        this.powerColor = "rgba(93, 25, 145, 0.75)"

    }
    
    chronomancer() {
        newEnemyAppears()
        phaseCheck()
        this.powerUse = this.powerUse + 1
        if (this.powerUse === 2) {
            power.style.display = "none"
        }
    }

}
//CLASS CONSTANTS
const player1 = new Player('PALADIN', 0, 10, 'Divine Blessing', "rgba(130, 15, 13, 0.75)")
const newPal = new Paladin('PALADIN')

const player2 = new Player('ARCHER', 0, 10, 'Lightning Reflexes', "rgba(15, 70, 30, 0.75)")
const newArc = new Archer('ARCHER')

const player3 = new Player('ROGUE', 0, 10, 'Trap Sense', "rgba(28, 39, 131, 0.75")
const newRog = new Rogue('ROGUE')

const player4 = new Player('WIZARD', 0, 10, 'Chronomancer', "rgba(93, 25, 145, 0.75)")
const newWiz = new Wizard('WIZARD')

//SET CLASS

Array.from(classButton).forEach((cButton) => {
    cButton.addEventListener('click', () => {
    document.querySelector('.class-picker-container').style.display = "none"
    document.querySelector('.question-wrapper').style.display = "grid"
    document.querySelector('.answers').style.display = "flex"
    document.querySelector('.dungeon-prog').style.display = "grid"
    document.querySelector('.combat-log-wrapper').style.display = "grid"

    if (cButton.classList.contains('paladin')) {
        player1.getClassTitle(newPal)
        player1.powerGet(newPal)


        
    } else if (cButton.classList.contains('archer')) {
        player2.getClassTitle(newArc)
        player2.powerGet(newArc)


    } else if (cButton.classList.contains('rogue')) {
        player3.getClassTitle(newRog)
        player3.powerGet(newRog)


    } else if (cButton.classList.contains('wizard')) {
        player4.getClassTitle(newWiz)
        player4.powerGet(newWiz)



    }
    })
})



// USE POWER
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


