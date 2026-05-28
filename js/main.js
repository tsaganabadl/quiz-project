const questions = [
    {
        text: "Какой русский поэт был убит на дуэли?",
        options: ["Гоголь", "Пушкин", "Некрасов", "Маяковский"],
        correct: 1
    },
    {
        text: "Кто такой «маленький человек» в литературе?",
        options: ["Человек маленького роста", "Бедный, незащищённый герой без высокого статуса", "Ребёнок", "Слуга"],
        correct: 1
    },
    {
        text: "В каком городе происходит действие романа Булгакова «Мастер и Маргарита»?",
        options: ["Киев", "Петербург", "Москва", "Воронеж"],
        correct: 2
    },
    {
        text: "Кто автор строк: «Я памятник себе воздвиг нерукотворный»?",
        options: ["Лермонтов", "Пушкин", "Державин", "Блок"],
        correct: 1
    },
    {
        text: "Какой город стал прообразом города Калинова в пьесе Островского «Гроза»?",
        options: ["Москва", "Кострома", "Киев", "Петербург"],
        correct: 1
    },
    {
        text: "Сколько братьев Карамазовых в романе Достоевского «Братья Карамазовы»?",
        options: ["Два", "Три", "Четыре", "Пять"],
        correct: 1
    },
    {
        text: "На какой планете жил Маленький принц до своего путешествия?",
        options: ["Земля", "Астероид Б-612", "Марс", "Венера"],
        correct: 1
    },
    {
        text: "Какой реальный адрес на лондонской Бейкер-стрит считается домом Шерлока Холмса?",
        options: ["221B", "221A", "222B", "221C"],
        correct: 0
    },
    {
        text: "Английский писатель Толкин в «Властелине колец» назвал страну хоббитов Широм. Чьим прообразом послужило это место?",
        options: ["Исландия", "Уэльс", "Англия", "Шотландия"],
        correct: 2
    },
    {
    text: "Что означает число 451 по Фаренгейту в культовом романе Рэя Брэдбери?",
    options: ["Температура кипения воды", "Температура, при которой горит бумага", "Температура тела человека", "Температура плавления стали"],
    correct: 1
    }
];

let currentQuestion = 0;
let answers = new Array(10).fill(null);

const questionText = document.getElementById("questionText");
const optionsDiv = document.getElementById("options");
const progressFill = document.getElementById("progressFill");
const questionCount = document.getElementById("questionCount");
const resultsBtn = document.getElementById("resultsBtn");
const resultsScreen = document.getElementById("resultsScreen");
const scoreSpan = document.getElementById("score");
const restartBtn = document.getElementById("restartBtn");

function showQuestion() {
    const q = questions[currentQuestion];
    questionText.textContent = q.text;
    
    optionsDiv.innerHTML = "";
    q.options.forEach((opt, i) => {
        const btn = document.createElement("button");
        btn.textContent = opt;
        
        
        btn.onclick = () => {
            if (answers[currentQuestion] !== null) return;
            
            answers[currentQuestion] = i;
            
            const btns = optionsDiv.children;
            for (let j = 0; j < btns.length; j++) {
                btns[j].disabled = true;
                if (j === q.correct) btns[j].classList.add("correct");
                if (j === i && j !== q.correct) btns[j].classList.add("wrong");
            }
            
            setTimeout(() => {
                if (currentQuestion + 1 < questions.length) {
                    currentQuestion++;
                    showQuestion();
                    updateProgress();
                }
            }, 700);
        };
        
        optionsDiv.appendChild(btn);
    });
}

function updateProgress() {
    const percent = ((currentQuestion + 1) / questions.length) * 100;
    progressFill.style.width = percent + "%";
    questionCount.textContent = `Вопрос ${currentQuestion + 1} из ${questions.length}`;
}

function getScore() {
    let score = 0;
    for (let i = 0; i < questions.length; i++) {
        if (answers[i] === questions[i].correct) score++;
    }
    return score;
}

resultsBtn.onclick = () => {
    if (answers.every(a => a !== null)) {
        scoreSpan.textContent = `${getScore()} из ${questions.length}`;
        resultsScreen.style.display = "flex";
    } else {
        alert("Ответьте на все вопросы");
    }
};

restartBtn.onclick = () => {
    currentQuestion = 0;
    answers = new Array(10).fill(null);
    resultsScreen.style.display = "none";
    showQuestion();
    updateProgress();
};

showQuestion();
updateProgress();