const questions = [
  { q:"What is 2x3=?", c:["2","6","10"], a:1 },
  { q:"4x5=?", c:["20","15","25"], a:0 },
  { q:"8x3=?", c:["15","24","20"], a:1 },
  { q:"6x2=?", c:["14","21","12"], a:2 },
  { q:"3x4=?", c:["10","12","11"], a:1 },
  { q:"7x3=?", c:["24","21","30"], a:1 },
  { q:"1x12=?", c:["12","17","20"], a:0 },
  { q:"2x8=?", c:["21","12","16"], a:2 },
  { q:"10x10=?", c:["30","50","100"], a:2 },
  { q:"18x0=?", c:["18","0","20"], a:1 }
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
