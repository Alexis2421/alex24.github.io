const questions = [
    {
        question: "¿Cuál es mi película favorita?",
        options: ["Matrix", "Rápido y Furioso", "Gladiador", "El señor de los anillos"],
        correct: 3
    },
    {
        question: "¿Cuál es mi comida favorita?",
        options: ["Sancocho de pollo", "Sopa de lentejas", "Garbanzos", "Frijoles sudados"],
        correct: 2
    },
    {
        question: "¿Cuál es mi libro favorito?",
        options: ["Trilogía del señor de los anillos", "Escucharás mi corazón", "100 años de soledad", "Juventud en Éxtasis"],
        correct: 1
    }
];

let currentQuestion = 0;

const questionElement = document.getElementById("question");
const optionsListElement = document.getElementById("options-list");
const modal = document.getElementById("modal");
const modalContent = document.getElementById("modal-content");
const modalMessage = document.getElementById("modal-message");
const modalButton = document.getElementById("modal-button");

function loadQuestion() {
    questionElement.textContent = questions[currentQuestion].question;
    optionsListElement.innerHTML = '';

    questions[currentQuestion].options.forEach((option, index) => {
        const li = document.createElement('li');
        li.textContent = option;
        li.addEventListener('click', () => selectOption(index, li));
        optionsListElement.appendChild(li);
    });
}

function selectOption(index, element) {
    const correctAnswer = questions[currentQuestion].correct;

    document.querySelectorAll('li').forEach(li => {
        li.classList.remove('selected');
    });

    element.classList.add('selected');

    setTimeout(() => {
        if (index === correctAnswer) {
            showModal("¡Respuesta correcta!", true);
            currentQuestion++;
            if (currentQuestion < questions.length) {
                modalButton.onclick = () => {
                    closeModal();
                    loadQuestion();
                };
            } else {
                modalButton.onclick = () => {
                    closeModal();
                    showFinalQuestion();
                };
            }
        } else {
            showModal("Respuesta incorrecta. El cuestionario se reiniciará.", false);
            modalButton.onclick = () => {
                closeModal();
                resetQuiz();
            };
        }
    }, 500);
}

function showModal(message, isCorrect) {
    modalMessage.textContent = message;
    modal.classList.remove('hidden');
    modal.classList.add(isCorrect ? 'correct' : 'incorrect');
}

function closeModal() {
    modal.classList.add('hidden');
    modal.classList.remove('correct', 'incorrect');
}

function showFinalQuestion() {
    questionElement.textContent = "¿Quieres ser mi novia?";
    optionsListElement.innerHTML = '';

    const yesButton = document.createElement('button');
    yesButton.textContent = "Sí";
    yesButton.addEventListener('click', () => {
        showModal("Bienvenida a mi vida llena de locuras y complejos emocionales", true);
        modalButton.onclick = resetQuiz;
    });

    const noButton = document.createElement('button');
    noButton.textContent = "No";
    noButton.addEventListener('click', () => {
        showModal("Gracias por todo lo compartido, seguiré mi camino.", false);
        modalButton.onclick = resetQuiz;
    });

    optionsListElement.appendChild(yesButton);
    optionsListElement.appendChild(noButton);
}

function resetQuiz() {
    currentQuestion = 0;
    closeModal();
    loadQuestion();
}

loadQuestion();