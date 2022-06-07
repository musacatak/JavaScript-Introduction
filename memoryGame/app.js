const cardArray = [
    {
        name: 'fries',
        img: 'images/fries.png',
    },
    {
        name: 'cheeseburger',
        img: 'images/cheeseburger.png',
    },
    {
        name: 'hotdog',
        img: 'images/hotdog.png',
    },
    {
        name: 'milkshake',
        img: 'images/milkshake.png',
    },
    {
        name: 'pizza',
        img: 'images/pizza.png',
    },
    {
        name: 'icecream',
        img: 'images/icecream.png',
    },
    {
        name: 'fries',
        img: 'images/fries.png',
    },
    {
        name: 'cheeseburger',
        img: 'images/cheeseburger.png',
    },
    {
        name: 'hotdog',
        img: 'images/hotdog.png',
    },
    {
        name: 'milkshake',
        img: 'images/milkshake.png',
    },
    {
        name: 'pizza',
        img: 'images/pizza.png',
    },
    {
        name: 'icecream',
        img: 'images/icecream.png',
    }
    
]

cardArray.sort(() => 0.5 - Math.random())

const gridDisplay = document.querySelector('#grid')
const resultDisplay = document.querySelector('#result')
let cardChosen = []
let cardsChosenIds = []
const cardsWon = []

function createBoard () {
    for(let i =0; i < 12 ; i++){
        const card = document.createElement('img')
        card.setAttribute('src','images/blank.png')
        card.setAttribute('data-id',i)
        card.addEventListener('click',flipCard)
        gridDisplay.appendChild(card)
        

    }
}

createBoard()

function checkMatch() {
    const cards = document.querySelectorAll('img')

    if(cardChosen[0] == cardChosen[1]){
        alert('Matched')
        cards[cardsChosenIds[0]].setAttribute('src','images/white.png')
        cards[cardsChosenIds[1]].setAttribute('src','images/white.png')
        cards[cardsChosenIds[0]].removeEventListener('click',flipCard)
        cards[cardsChosenIds[1]].removeEventListener('click',flipCard)
        cardsWon.push(cardChosen)

    }
    else{
        alert('Not Matched')
        cards[cardsChosenIds[0]].setAttribute('src','images/blank.png')
        cards[cardsChosenIds[1]].setAttribute('src','images/blank.png')
    }
    cardChosen = []
    cardsChosenIds = []
    resultDisplay.innerHTML = cardsWon.length
    if(cardsWon.length == cardArray.length/2){
        resultDisplay.innerHTML = 'Congratulations you matched them all !'
    }
    
}

function flipCard() {
    let cardId = this.getAttribute('data-id')
    cardChosen.push(cardArray[cardId].name)
    cardsChosenIds.push(cardId)
    this.setAttribute('src',cardArray[cardId].img)
    if(cardChosen.length === 2){
        setTimeout( checkMatch, 500)
    }


}

