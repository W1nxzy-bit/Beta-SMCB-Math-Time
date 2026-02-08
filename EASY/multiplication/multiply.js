const TOTAL = 10;
let questions = [];
let current = 0;
let score = 0;
let timer;
let timeLeft = 10;
let locked = false;

/* ELEMENTS */
const startBox = document.getElementById("startBox");
const quizBox = document.getElementById("quizBox");
const resultBox = document.getElementById("resultBox");
const countdown = document.getElementById("countdown");
const timerEl = document.getElementById("timer");
const backBtn = document.getElementById("backBtn");

/* EMOJI EFFECT */
function popEmojis(type, x, y){
    const emojis = type === "correct"
        ? ["💖","😄","✅"]
        : ["💔","😢","❌"];

    emojis.forEach((emoji,i)=>{
        const span = document.createElement("span");
        span.className = "emoji-pop";
        span.innerText = emoji;
        span.style.left = (x + (i-1)*40) + "px";
        span.style.top = y + "px";
        document.body.appendChild(span);
        setTimeout(()=>span.remove(),1200);
    });
}

/* START COUNTDOWN */
function startCountdown(){
    startBox.style.display = "none";
    countdown.style.display = "block";

    let count = 3;
    countdown.innerText = count;

    const cd = setInterval(()=>{
        count--;
        if(count > 0){
            countdown.innerText = count;
        }else if(count === 0){
            countdown.innerText = "GO!";
        }else{
            clearInterval(cd);
            countdown.style.display = "none";
            startQuiz();
        }
    },1000);
}

/* START QUIZ */
function startQuiz(){
    generateQuestions();
    current = 0;
    score = 0;
    quizBox.style.display = "block";
    timerEl.style.display = "block";
    loadQuestion();
}

/* GENERATE QUESTIONS – MULTIPLICATION (EASY MODE) */
function generateQuestions(){
    questions = [];

    for(let i = 0; i < TOTAL; i++){
        let a, b, product;

        // small numbers only (easy for Grade 1–3)
        do{
            a = Math.floor(Math.random() * 5) + 1; // 1 to 5
            b = Math.floor(Math.random() * 5) + 1; // 1 to 5
            product = a * b;
        }while(product > 20); // keep answers small & easy

        let choices = new Set([product]);
        while(choices.size < 3){
            choices.add(Math.floor(Math.random() * 20) + 1);
        }

        choices = [...choices].sort(() => Math.random() - 0.5);

        questions.push({
            q: `${a} × ${b} = ?`,
            c: choices,
            a: choices.indexOf(product)
        });
    }
}


/* TIMER */
function startTimer(){
    clearInterval(timer);
    timeLeft = 10;
    timerEl.innerText = `⏱ ${timeLeft}`;

    timer = setInterval(()=>{
        timeLeft--;
        timerEl.innerText = `⏱ ${timeLeft}`;

        if(timeLeft === 0){
            clearInterval(timer);
            timeUpShowAnswer();
        }
    },1000);
}

/* LOAD QUESTION */
function loadQuestion(){
    if(current === TOTAL){
        showResult();
        return;
    }

    locked = false;

    document.getElementById("question").innerText = questions[current].q;
    document.getElementById("c0").innerText = questions[current].c[0];
    document.getElementById("c1").innerText = questions[current].c[1];
    document.getElementById("c2").innerText = questions[current].c[2];
    document.getElementById("progress").innerText = `${current+1} of ${TOTAL}`;

    startTimer();
}

/* ANSWER SELECT */
function selectAnswer(choice){
    if(locked) return;
    locked = true;

    clearInterval(timer);

    const buttons = document.querySelectorAll(".choice");
    const correct = questions[current].a;

    buttons.forEach(b=>b.style.pointerEvents="none");

    const rect = buttons[choice].getBoundingClientRect();
    const x = rect.left + rect.width/2;
    const y = rect.top;

    if(choice === correct){
        score++;
        buttons[choice].classList.add("correct");
        popEmojis("correct", x, y);
    }else{
        buttons[choice].classList.add("wrong");
        buttons[correct].classList.add("correct");
        popEmojis("wrong", x, y);
    }

    setTimeout(()=>{
        resetButtons();
        nextQuestion();
    },1000);
}

/* TIME UP — SHOW CORRECT ANSWER */
function timeUpShowAnswer(){
    locked = true;

    const buttons = document.querySelectorAll(".choice");
    const correct = questions[current].a;

    buttons.forEach(b=>b.style.pointerEvents="none");
    buttons[correct].classList.add("correct");

    const rect = buttons[correct].getBoundingClientRect();
    const x = rect.left + rect.width/2;
    const y = rect.top;

    popEmojis("wrong", x, y);

    setTimeout(()=>{
        resetButtons();
        nextQuestion();
    },1200);
}

/* RESET BUTTON STATES */
function resetButtons(){
    const buttons = document.querySelectorAll(".choice");
    buttons.forEach(b=>{
        b.classList.remove("correct","wrong");
        b.style.pointerEvents="auto";
    });
}

/* NEXT QUESTION */
function nextQuestion(){
    current++;
    loadQuestion();
}

/* RESULT */
function showResult(){
    quizBox.style.display = "none";
    resultBox.style.display = "block";
    timerEl.style.display = "none";

    document.getElementById("score").innerText = score;

    const title = document.getElementById("resultTitle");
    const msg = document.getElementById("resultMessage");
    const retryBtn = document.querySelector(".retry-btn");

    retryBtn.style.display = "none";
    backBtn.style.display = "none";

    if(score >= 5){
        title.innerText = "🎉 Congratulations!";
        msg.innerText = "You passed the quiz!";
        backBtn.style.display = "inline-block";
        backBtn.classList.add("pass-show");

        confetti({ particleCount: 150, spread: 70 });
    }else{
        title.innerText = "😢 Try Again!";
        msg.innerText = "You need at least 5 to pass.";
        retryBtn.style.display = "inline-block";
        resultBox.classList.add("fail");
    }
}

/* RETRY */
function retryQuiz(){
    resultBox.style.display = "none";
    startBox.style.display = "flex";
}
