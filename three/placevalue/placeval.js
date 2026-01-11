const questions = [
  { q:"6,432 – What is the place value of 4?", c:["Tens","Hundreds","Thousands","Ten Thousands"], a:1 },
  { q:"9,205 – What is the place value of 9?", c:["Tens","Hundreds","Thousands","Ten Thousands"], a:2 },
  { q:"3,781 – What is the place value of 7?", c:["Tens","Hundreds","Thousands","Ten Thousands"], a:0 },
  { q:"8,064 – What is the place value of 8?", c:["Tens","Hundreds","Thousands","Ten Thousands"], a:2 },
  { q:"4,590 – What is the place value of 5?", c:["Tens","Hundreds","Thousands","Ten Thousands"], a:2 },
  { q:"7,218 – What is the place value of 1?", c:["Tens","Hundreds","Thousands","Ten Thousands"], a:0 },
  { q:"2,046 – What is the place value of 6?", c:["Ones","Tens","Hundreds","Thousands"], a:0 },
  { q:"5,803 – What is the place value of 8?", c:["Tens","Hundreds","Thousands","Ten Thousands"], a:1 },
  { q:"9,410 – What is the place value of 9?", c:["Tens","Hundreds","Thousands","Ten Thousands"], a:2 },
  { q:"10,000 – What is the place value of 1?", cc:["Tens","Hundreds","Thousands","Ten Thousands"], a:3 }
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
    document.getElementById("c3").innerText = questions[current].c[3];
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
