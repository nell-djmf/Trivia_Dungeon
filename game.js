const DOMAIN = 'https://opentdb.com/api.php?amount=50'

const start = document.querySelector('.start')
const question = document.getElementsByClassName('question')
const answers = document.getElementsByClassName('answers')
const progress = document.querySelector('.prog-bar')
const power = document.querySelector('.powers')


start.addEventListener('click', async () => {
    let response = await axios.get(
        `https://opentdb.com/api.php?amount=50`
      )
    let showQuestion = response.data.results[0].question
    let showAnswer = response.data.results[0].correct_answer
    
    console.log(showQuestion)
    console.log(showAnswer)
    
  

})