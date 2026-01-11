const questions = [
  { q:"245 – What is the place value of 4?", c:["Ones","Tens","Hundreds"], a:1 },
  { q:"381 – What is the place value of 3?", c:["Ones","Tens","Hundreds"], a:2 },
  { q:"906 – What is the place value of 6?", c:["Ones","Tens","Hundreds"], a:0 },
  { q:"517 – What is the place value of 1?", c:["Ones","Tens","Hundreds"], a:1 },
  { q:"642 – What is the place value of 6?", c:["Ones","Tens","Hundreds"], a:2 },
  { q:"890 – What is the place value of 9?", c:["Ones","Tens","Hundreds"], a:1 },
  { q:"134 – What is the place value of 3?", c:["Ones","Tens","Hundreds"], a:1 },
  { q:"709 – What is the place value of 7?", c:["Ones","Tens","Hundreds"], a:2 },
  { q:"468 – What is the place value of 4?", c:["Ones","Tens","Hundreds"], a:2 },
  { q:"523 – What is the place value of 3?", c:["Ones","Tens","Hundreds"], a:0 }
];

let current = 0;
let score = 0;

function loadQuestion(){
    if(current >= questions.length){
        document.getElementById("quizBox").style.display="none";
        document.getElementById("resultBox").style.display="block";
        document.getElementById("score").innerText = score;
        launchConfetti();
        return;
    }

    document.getElementById("question").innerText = questions[current].q;
    document.getElementById("c0").innerText = questions[current].c[0];
    document.getElementById("c1").innerText = questions[current].c[1];
    document.getElementById("c2").innerText = questions[current].c[2];
    document.getElementById("progress").innerText = `${current+1} of 10 question`;
}

function selectAnswer(choice){
    if(choice === questions[current].a) score++;
    current++;
    loadQuestion();
}

function restart(){
    current = 0;
    score = 0;
    document.getElementById("quizBox").style.display="block";
    document.getElementById("resultBox").style.display="none";
    loadQuestion();
}
function selectAnswer(choice){
    const correct = questions[current].a;
    const allChoices = document.querySelectorAll(".choice");

    // disable double clicking
    allChoices.forEach(btn => btn.style.pointerEvents = "none");
    if(choice === correct){
        score++;
        allChoices[choice].classList.add("correct");
    } else {
        allChoices[choice].classList.add("wrong");
        allChoices[correct].classList.add("correct");
    }

    setTimeout(()=>{
        // clean colors
        allChoices.forEach(btn=>{
            btn.classList.remove("correct","wrong");
            btn.style.pointerEvents = "auto";
        });

        current++;
        loadQuestion();
    }, 900);   // wait before next question
}

function launchConfetti(){
    confetti({
        particleCount:180,
        spread:80,
        origin:{ y:0.6 }
    });
}

loadQuestion();
