const questions = [
  { q:"What is 15-3=?", c:["12","9","5"], a:0 },
  { q:"18-12=?", c:["13","6","10"], a:1 },
  { q:"20-5=?", c:["12","15","10"], a:1 },
  { q:"17-2=?", c:["5","12","15"], a:2 },
  { q:"14-10=?", c:["10","4","12"], a:1 },
  { q:"16-6=?", c:["9","10","5"], a:1 },
  { q:"13-3=?", c:["14","12","8"], a:0 },
  { q:"19-5=?", c:["12","17","14"], a:2 },
  { q:"12-1=?", c:["9","12","11"], a:2 },
  { q:"20-20=?", c:["0","10","15"], a:0 }
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
