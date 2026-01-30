const questions = [
  { q:"32 – What is the place value of 3?", c:[" Ones","Tens"], a:1 },
  { q:"45 – What is the place value of 5?",  c:[" Ones","Tens"], a:0 },
  { q:"68 – What is the place value of 6?",  c:[" Ones","Tens"], a:1 },
  { q:"79 – What is the place value of 9?",  c:[" Ones","Tens"], a:0 },
  { q:"24 – What is the place value of 2?",  c:[" Ones","Tens"], a:1 },
  { q:"51 – What is the place value of 1?",  c:[" Ones","Tens"], a:0 },
  { q:"83 – What is the place value of 8?",  c:[" Ones","Tens"], a:1 },
  { q:"16 – What is the place value of 6?",  c:[" Ones","Tens"], a:0 },
  { q:"94 – What is the place value of 9?",  c:[" Ones","Tens"], a:1 },
  { q:"27 – What is the place value of 7?",  c:[" Ones","Tens"], a:0 }
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
    document.getElementById("progress").innerText = `${current+1} of 10 question`;
}

//for amidst of quiz function
function selectAnswer(choice){
    const correct = questions[current].a;
    const allChoices = document.querySelectorAll(".choice");

    // disable double clicking
    allChoices.forEach(btn => btn.style.pointerEvents = "none");

    // get click position for emoji pop
    const rect = allChoices[choice].getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top;

    if(choice === correct){
        score++;
        allChoices[choice].classList.add("correct");
        popEmojis("correct", x, y);
    } else {
        allChoices[choice].classList.add("wrong");
        allChoices[correct].classList.add("correct");
        popEmojis("wrong", x, y);
    }

setTimeout(()=>{
        allChoices.forEach(btn=>{
            btn.classList.remove("correct","wrong");
            btn.style.pointerEvents = "auto";
        });

        current++;
        loadQuestion();
    }, 900);
}

//for score functions
function launchConfetti(){
    confetti({
        particleCount:180,
        spread:80,
        origin:{ y:0.6 }
    });
}

loadQuestion();

//visual effects of the right and wrong 
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
