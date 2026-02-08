// ================= EMOJI EFFECT =================
function popEmojis(type, x, y){
    const emojis = type === "correct"
        ? ["💖", "😄", "✅"]
        : ["💔", "😢", "❌"];

    emojis.forEach((emoji, i)=>{
        const span = document.createElement("span");
        span.className = "emoji-pop";
        span.innerText = emoji;

        span.style.left = (x + (i * 100 - 100)) + "px";
        span.style.top = y + "px";

        document.body.appendChild(span);

        setTimeout(()=> span.remove(), 1200);
    });
}

const questions = [
  { q:"6,432 – What is the place value of 4?", c:["Tens","Hundreds","Thousands","Ten Thousands"], a:1 },
  { q:"9,205 – What is the place value of 9?", c:["Tens","Hundreds","Thousands","Ten Thousands"], a:2 },
  { q:"3,781 – What is the place value of 7?", c:["Tens","Hundreds","Thousands","Ten Thousands"], a:1 },
  { q:"8,064 – What is the place value of 8?", c:["Tens","Hundreds","Thousands","Ten Thousands"], a:2 },
  { q:"4,590 – What is the place value of 5?", c:["Tens","Hundreds","Thousands","Ten Thousands"], a:1 },
  { q:"7,218 – What is the place value of 1?", c:["Tens","Hundreds","Thousands","Ten Thousands"], a:0 },
  { q:"2,046 – What is the place value of 6?", c:["Ones","Tens","Hundreds","Thousands"], a:0 },
  { q:"5,803 – What is the place value of 8?", c:["Tens","Hundreds","Thousands","Ten Thousands"], a:1 },
  { q:"9,410 – What is the place value of 9?", c:["Tens","Hundreds","Thousands","Ten Thousands"], a:2 },
  { q:"10,000 – What is the place value of 1?", cc:["Tens","Hundreds","Thousands","Ten Thousands"], a:3 }
];

let current = 0;
let score = 0;

// ================= ELEMENTS =================
const quizBox = document.getElementById("quizBox");
const resultBox = document.getElementById("resultBox");
const scoreText = document.getElementById("score");
const title = document.getElementById("resultTitle");
const message = document.getElementById("resultMessage");
const retryBtn = document.getElementById("retryBtn");
const backBtn = document.getElementById("backBtn");

// ================= LOAD QUESTION =================
function loadQuestion(){
    if(current === questions.length){
        showResult();
        return;
    }

    document.getElementById("question").innerText = questions[current].q;
    document.getElementById("c0").innerText = questions[current].c[0];
    document.getElementById("c1").innerText = questions[current].c[1];
    document.getElementById("c2").innerText = questions[current].c[2];
    document.getElementById("c3").innerText = questions[current].c[3];
    document.getElementById("progress").innerText =
        `${current+1} of 10 question`;
}

// ================= ANSWER SELECT =================
function selectAnswer(choice){
    const correct = questions[current].a;
    const choices = document.querySelectorAll(".choice");

    choices.forEach(btn => btn.style.pointerEvents = "none");

    // position for emoji animation
    const rect = choices[choice].getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top;

    if(choice === correct){
        score++;
        choices[choice].classList.add("correct");
        popEmojis("correct", x, y);
    } else {
        choices[choice].classList.add("wrong");
        choices[correct].classList.add("correct");
        popEmojis("wrong", x, y);
    }

    setTimeout(()=>{
        choices.forEach(btn=>{
            btn.classList.remove("correct","wrong");
            btn.style.pointerEvents = "auto";
        });

        current++;
        loadQuestion();
    }, 900);
}

// ================= RESULT SCREEN =================
function showResult(){
    quizBox.style.display = "none";
    resultBox.style.display = "block";
    scoreText.innerText = score;

    title.classList.remove("sad-animate");

    if(score <= 4){
        title.innerText = "😢 Better luck next time!";
        message.innerText = "Try again, you can do it!";
        retryBtn.style.display = "inline-block";
        backBtn.style.display = "none";
        title.classList.add("sad-animate");
    } else {
        title.innerText = "🎉 Congratulations!";
        message.innerText = "Great job!";
        retryBtn.style.display = "none";
        backBtn.style.display = "inline-block";
        launchConfetti();
    }
}

// ================= RETRY =================
function retryQuiz(){
    current = 0;
    score = 0;

    resultBox.style.display = "none";
    quizBox.style.display = "block";

    loadQuestion();
}

// ================= CONFETTI =================
function launchConfetti(){
    confetti({
        particleCount:180,
        spread:80,
        origin:{ y:0.6 }
    });
}

// ================= START =================
loadQuestion();
