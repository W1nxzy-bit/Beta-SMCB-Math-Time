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
