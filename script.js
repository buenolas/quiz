let dataBase = [
    {"question": "Normalmente, quantos litros de sangue uma pessoa tem? Em média, quantos são retirados numa doação de sangue?",
    "option1": "Tem entre 2 a 4 litros. São retirados 450 mililitros",
    "option2": "Tem entre 4 a 6 litros. São retirados 450 mililitros",
    "option3": "Tem 10 litros. São retirados 2 litros",
    "option4": "Tem 7 litros. São retirados 1,5 litros",
    "correct": "Tem entre 4 a 6 litros. São retirados 450 mililitros"
    },
    {"question": "De quem é a famosa frase “Penso, logo existo”?",
    "option1": "Platão",
    "option2": "Galileu Galilei",
    "option3": "Descartes",
    "option4": "Sócrates",
    "correct": "Descartes"
    },
    {"question": "Qual o nome do presidente do Brasil que ficou conhecido como Jango?",
    "option1": "Jânio Quadros",
    "option2": "João Goulart",
    "option3": "Getúlio Vargas",
    "option4": "João Figueiredo",
    "correct": "João Goulart"
    },
    {"question": "Qual o livro mais vendido no mundo a seguir à Bíblia?",
    "option1": "O Senhor dos Anéis",
    "option2": "Dom Quixote",
    "option3": "O Pequeno Príncipe",
    "option4": "Ela, a Feiticeira",
    "correct": "Dom Quixote"
    },
    {"question": "Quantas casas decimais tem o número pi?",
    "option1": "Duas",
    "option2": "Centenas",
    "option3": "Infinitas",
    "option4": "Milhares",
    "correct": "Infinitas"
    },
    {"question": "Atualmente, quantos elementos químicos a tabela periódica possui?",
    "option1": "113",
    "option2": "109",
    "option3": "108",
    "option4": "118",
    "correct": "118"
    },
    {"question": "Quanto tempo a luz do Sol demora para chegar à Terra?",
    "option1": "12 minutos",
    "option2": "1 dia",
    "option3": "12 horas",
    "option4": "8 minutos",
    "correct": "8 minutos"
    },
    {"question": "Qual a tradução da frase “Fabiano cogió su saco antes de salir”?",
    "option1": "Fabiano coseu seu paletó antes de sair",
    "option2": "Fabiano fechou o saco antes de sair",
    "option3": "Fabiano pegou seu paletó antes de sair",
    "option4": "Fabiano cortou o saco antes de cair",
    "correct": "Fabiano pegou seu paletó antes de sair"
    },
    {"question": "Em que ordem surgiram os modelos atômicos?",
    "option1": "Dalton, Thomson, Rutherford, Rutherford-Bohr",
    "option2": "Rutherford-Bohr, Rutherford, Thomson, Dalton",
    "option3": "Thomson, Dalton, Rutherford, Rutherford-Bohr",
    "option4": "Dalton, Thomson, Rutherford-Bohr, Rutherford",
    "correct": "Dalton, Thomson, Rutherford, Rutherford-Bohr"
    },
    {"question": "Quem foi a primeira mulher a viajar para o espaço?",
    "option1": "Sally Ride",
    "option2": "Valentina Tereshkova",
    "option3": "Kathryn D. Sullivan",
    "option4": "Svetlana Savitskaya", 
    "correct": "Valentina Tereshkova"
    }
]  

const questionText = document.getElementById('question-text');
const button1      = document.getElementById('button1');
const button2      = document.getElementById('button2');
const button3      = document.getElementById('button3');
const button4      = document.getElementById('button4');
const nextBtn      = document.getElementById('next-btn');
const container    = document.getElementById('right-container');
const pointsText   = document.getElementById('points');
// get the ID's

let index = 0;  //set the index for the dataBase elements
let points = 0; //count points
let validation; //validate to change color


const nextIndex = () => {   //get to the next index
    index++;    //increment
    if(index < 10){ //check if its in the range of questions
        changeQuestion();   //change it
    }else{
        alert(`Quiz finalizado.\nSeu total foram ${points} pontos.`)    //when the quiz is finished
    }
}

const createQuestion = (data) => {  //put on the screen the question and the answers on the buttons
    questionText.textContent = data.question;
    button1.textContent = data.option1;    
    button2.textContent = data.option2;    
    button3.textContent = data.option3;    
    button4.textContent = data.option4;
}

const changeQuestion = () =>{   //changes the question
    const data = dataBase[index];   //get the question on the data base
    createQuestion(data);   //send to be create

    button1.classList.remove('btn-right');
    button2.classList.remove('btn-right');
    button3.classList.remove('btn-right');
    button4.classList.remove('btn-right');
    button1.classList.remove('btn-wrong');
    button2.classList.remove('btn-wrong');
    button3.classList.remove('btn-wrong');
    button4.classList.remove('btn-wrong');
    //this resets the background color
}

const sumPoints = () =>{    //sum points
    points+=10;
}
const pointsUpdate = () => {    //update on the screen
    pointsText.textContent = points;
}

const searchRight = () =>{  //search for the right answer to change his color
    switch(dataBase[index].correct){
        case button1.textContent:
            changeBackground(button1.id, validation = true);
            break;
        case button2.textContent:
            changeBackground(button2.id, validation = true);
            break;
        case button3.textContent:
            changeBackground(button3.id, validation = true);
            break;
        case button4.textContent:
            changeBackground(button4.id, validation = true);
            break;
        default:
            break;
    }
}

const changeBackground = (target, validation) => {  //changes the background
    
    const button = document.getElementById(target); //get the button
    
    if(validation == true){
        button.classList.add('btn-right');  //add a class so the css can change its color
    }
    else{
        button.classList.add('btn-wrong');  //same
        searchRight();  //change the color on the right one
    }

}

nextBtn.addEventListener('click', event =>{ //skip to the next question

    event.preventDefault()

    nextIndex();    //update the index
});

container.addEventListener('click', event =>{   //listen when a button is clicked
    
    const target = event.target.id; //get the id of the target
    const targetText = event.target.textContent;    //get the text on the button

    if(targetText === dataBase[index].correct){ //check if the targetText content is the same as the correct one in the data base
        sumPoints();    //sum points
        
        pointsUpdate();    //update points
        
        validation = true;  //set the validate as true so it don't have to verify again qhen changing the background
        
        changeBackground(target, validation);   //change color
    }
    else if (targetText == "Próxima / Pular"){  //error handling
    
    }
    else {
        validation = false;
        changeBackground(target, validation);   //changes color
    }

});

pointsUpdate(); //initialize with 0 points
changeQuestion();   //makes sure it initialize already with the first question
