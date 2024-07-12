import { dataBase } from "./data.js";

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
let processedIndexs = [];

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

container.addEventListener('click', event =>{   //listen when a button is clicked
    
    event.preventDefault();

    const target = event.target.id; //get the id of the target
    const targetText = event.target.textContent;    //get the text on the button

    if(processedIndexs.includes(index)){    //verify if the current index was already processed
        return;
    }
    
    if(targetText === dataBase[index].correct){ //check if the targetText content is the same as the correct one in the data base
        
        sumPoints();    //sum points
        
        pointsUpdate();    //update points

        validation = true;  //set the validate as true so it don't have to verify again qhen changing the background
        
        changeBackground(target, validation);   //change color

        processedIndexs.push(index);    //push the index on the array

        setTimeout(nextIndex, 2000)  //change question automatic
    }
    else {
        validation = false;
        changeBackground(target, validation);   //changes color
        
        processedIndexs.push(index);    //push the index on the array

        setTimeout(nextIndex, 2000)  //change question automatic
    }

});

pointsUpdate(); //initialize with 0 points
changeQuestion();   //makes sure it initialize already with the first question
