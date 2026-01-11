const questions = [
  { q:"What is 1-0=?", c:["4","1","0"], a:1 },
  { q:"4-2=?", c:["2","4","5"], a:0 },
  { q:"10-3=?", c:["7","8","4"], a:0 },
  { q:"6-6=?", c:["5","6","0"], a:2 },
  { q:"5-1=?", c:["4","10","5"], a:0 },
  { q:"9-4=?", c:["3","9","5"], a:2 },
  { q:"8-5=?", c:["10","3","8"], a:1 },
  { q:"7-3=?", c:["6","7","4"], a:2 },
  { q:"10-6=?", c:["3","2","4"], a:2 },
  { q:"9-7=?", c:["2","8","1"], a:0 }
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
