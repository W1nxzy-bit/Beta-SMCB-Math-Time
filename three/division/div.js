const questions = [
  { q:"What is 6÷2=?", c:["2","3","4"], a:1 },
  { q:"10÷2=?", c:["5","4","2"], a:0 },
  { q:"12÷3=?", c:["2","4","6"], a:1 },
  { q:"8÷4=?", c:["1","4","2"], a:2 },
  { q:"15÷5=?", c:["5","3","2"], a:1 },
  { q:"14÷7=?", c:["1","2","3"], a:1 },
  { q:"10÷10=?", c:["1","4","0"], a:0 },
  { q:"20÷4=?", c:["4","7","6"], a:2 },
  { q:"12÷2=?", c:["5","2","6"], a:2 },
  { q:"16÷8=?", c:["3","2","4"], a:0 }
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
