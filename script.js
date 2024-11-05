// Tu configuración de Firebase
var firebaseConfig = {
    databaseURL: "https://hidrocarburos-b5f07-default-rtdb.firebaseio.com/"
};
// Inicializa Firebase
firebase.initializeApp(firebaseConfig);
// Referencia a la base de datos
var database = firebase.database();

var data = {}; // data.name, data.score

data.name = localStorage.getItem("username");

const questions = [
    {
        question: "¿Cuál es la fórmula general de los monosacáridos?",
        options: ["(C₆H₁₂O₆)", "(CH₂O)ₙ", "(C₁₂H₂₂O₁₁)", "(C_nH_(2n))"],
        correct: 1
    },
    {
        question: "¿Cuál de los siguientes es un ejemplo de disacárido?",
        options: ["Glucosa", "Lactosa", "Fructosa", "Galactosa"],
        correct: 1
    },
    {
        question: "Los oligosacáridos están formados por cuántas unidades de monosacáridos?",
        options: ["1 a 2", "3 a 10", "11 a 20", "Más de 20"],
        correct: 1
    },
    {
        question: "¿Qué tipo de enlace se forma entre monosacáridos para formar disacáridos?",
        options: ["Enlace peptídico", "Enlace covalente", "Enlace iónico", "Enlace metálico"],
        correct: 1
    },
    {
        question: "¿Cuál es la función principal de los hidratos de carbono en el organismo?",
        options: ["Almacenamiento de grasas", "Fuente de energía", "Regulación hormonal", "Protección de tejidos"],
        correct: 1
    },
    {
        question: "¿Qué tipo de carbohidrato es la fibra dietética?",
        options: ["Monosacárido", "Disacárido", "Oligosacárido", "Polisacárido"],
        correct: 3
    },
    {
        question: "¿Cuál de los siguientes es un ejemplo de polisacárido?",
        options: ["Sacarosa", "Almidón", "Glucosa", "Galactosa"],
        correct: 1
    },
    {
        question: "¿Qué tipo de carbohidrato no es digerible por los humanos?",
        options: ["Glucosa", "Celulosa", "Fructosa", "Lactosa"],
        correct: 1
    },
    {
        question: "¿Cuál de las siguientes opciones describe mejor los monosacáridos?",
        options: ["Son complejos", "Son compuestos simples", "Son insolubles", "Son sólidos"],
        correct: 1
    },
    {
        question: "¿Cuál de las siguientes funciones NO es desempeñada por los carbohidratos?",
        options: ["Fuente de energía", "Estructura celular", "Regulación del pH", "Reserva de energía"],
        correct: 2
    }
];

let score = 0;
let currentQuestion = 0;

function loadQuestion() {
    const questionElement = document.getElementById("question");
    const optionsElement = document.getElementById("options");
    
    questionElement.innerText = questions[currentQuestion].question;
    optionsElement.innerHTML = '';

    questions[currentQuestion].options.forEach((option, index) => {
        const button = document.createElement("div");
        button.innerText = option;
        button.classList.add("option");
        button.addEventListener("click", () => checkAnswer(index));
        optionsElement.appendChild(button);
    });
}

function checkAnswer(selected) {
    if (selected === questions[currentQuestion].correct) {
        score++;
        document.getElementById("score").innerText = score;
    }
    currentQuestion++;
    if (currentQuestion < questions.length) {
        loadQuestion();
    } else {
        showResults();
    }
}

function showResults() {
    const quizContainer = document.getElementById("quiz-container");
    quizContainer.innerHTML = `
        <h2>Resultados</h2>
        <p>Tu puntuación es: ${score} de ${questions.length}</p>
        <button class="try-again" onclick="restartQuiz()">Intentar de nuevo</button>
    `;
    
    data.score = score;
    // Config
    var updates = {};
    updates[data.name] = data;

    // Enviar los datos a Firebase
    database.ref().update(updates)
    .then(function() {
        console.log(data);
    });
}

function restartQuiz() {
    window.location = "index.html";
}

loadQuestion();
