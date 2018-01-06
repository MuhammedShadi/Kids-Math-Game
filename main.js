var playing = false;
var score ;
var action;
var timeremaining;
var correctAnswer;

//if click start/reset button true
document.getElementById("startreset").onclick=function(){
    if( playing == true){
        location.reload();//reload our page 
    }else{
        //change palying to true
        playing = true;

        //set score 0
        score = 0 ;
        //set score 0 
        document.getElementById("scorevalue").innerHTML= score;//set score 0

        //show counter time 
        show("timeremaining");
        timeremaining= 60;
        document.getElementById("timeremainingvalue").innerHTML= timeremaining;

        //hide game over
        hide("gameOver");

        //change start to reset
        document.getElementById("startreset").innerHTML="ResetGame";

        //reduce time to -1 
        startCountdown();

        //genrate question
        genrate();
    }

}

for(i=1; i<5; i++ ){
    document.getElementById("box"+i).onclick=function(){
        if(playing==true){
            if(this.innerHTML == correctAnswer){
                score +=100;
                document.getElementById("scorevalue").innerHTML=score;
                
                //correct answer
                hide("wrong");
                show("correct");
                setTimeout(function(){
                    hide("correct");
                },1000);
                
                //genrate new question
                genrate();
            }else{
                
                //wrong answser
                hide("correct");
                show("wrong");
                setTimeout(function(){
                    hide("wrong");
                },1000);
            }
        }
    };
}

function startCountdown(){
    //reduce time to -1 
    action =setInterval(function(){
        timeremaining -= 1; 
        document.getElementById("timeremainingvalue").innerHTML= timeremaining;

        //if time end true 
        if(timeremaining == 0 ){
            //stop time    
            stopCount();

            //show game over         
            show("gameOver");

            //show score        
            document.getElementById("gameOver").innerHTML = "<p>Game over!</p> <p>Your Score is " + score + ".</p> ";  

            //hide timeremainig
            hide("timeremaining"); 

            //hide correct      
            hide("correct");

            //hide wrong     
            hid("wrong");

            // stop game
            playing =false;    

            //change reset to start
            document.getElementById("startreset").innerHTML="Start Game";
        }
    },1000);
}

//stop count
function stopCount(){
    clearInterval(action);
}

//hide element
function hide(id){
    document.getElementById(id).style.display="none";
}

//show element
function show(id){
    document.getElementById(id).style.display="block";
}

//generate questions and multiple answers
function genrate(){
    //generate question
    var x = 1+ Math.round(9*Math.random());
    var y = 1+ Math.round(9*Math.random());

    //get correct answer
    correctAnswer = x*y ;

    //set question in screen
    document.getElementById("screen").innerHTML= x+ "*" + y; 

    //generate correct choice
    var correctPosition = 1+ Math.round(3*Math.random());

    //set correct choice with random box
    document.getElementById("box"+correctPosition).innerHTML = correctAnswer;

    //fill other boxs with wrong anwsers

    var answers = [correctAnswer];

    for(i=1; i<5; i++){
        if(i != correctPosition){

            var wrongAnswer;
            do{

                wrongAnswer =  (1+ Math.round(9*Math.random()))*(1+ Math.round(9*Math.random()));

            }while(answers.indexOf(wrongAnswer)>-1)

                document.getElementById("box"+i).innerHTML=wrongAnswer;

            answers.push(wrongAnswer);
        }

    }
}
