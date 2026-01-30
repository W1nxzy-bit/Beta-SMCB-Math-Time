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
