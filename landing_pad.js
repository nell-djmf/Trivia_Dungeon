const intro = document.querySelector('.intro')
const rules = document.querySelector('.rules')


let toggleRules = () => {
    if (rules.style.display === "none") {
        rules.style.display = "block"
        intro.style.display = "none"
    } else {
        rules.style.display = "none"
        intro.style.display = "block"
    }
    console.log('click')

}

toggleRules()