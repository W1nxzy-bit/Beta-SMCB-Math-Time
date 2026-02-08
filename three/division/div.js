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
  { q:"What is 6÷2=?", c:["2","3","4"], a:1 },
  { q:"10÷2=?", c:["5","4","2"], a:0 },
  { q:"12÷3=?", c:["2","4","6"], a:1 },
  { q:"8÷4=?", c:["1","4","2"], a:2 },
  { q:"15÷5=?", c:["5","3","2"], a:1 },
  { q:"14÷7=?", c:["1","2","3"], a:1 },
  { q:"10÷10=?", c:["1","4","0"], a:0 },
  { q:"20÷4=?", c:["4","7","5"], a:2 },
  { q:"12÷2=?", c:["5","2","6"], a:2 },
  { q:"16÷8=?", c:["3","2","4"], a:1 }
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
