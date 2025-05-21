// Global variables
let currentProblem = null;
let score = 0;
let streak = 0;
let problemsCount = 0;
let selectedOption = null;
let timeRemaining = 60; // 60 seconds = 1 minute per question
let timerInterval = null;
let isAnswered = false;

// DOM Elements
const problemText = document.getElementById('problem-text');
const problemType = document.getElementById('problem-type');
const optionsContainer = document.getElementById('options-container');
const nextBtn = document.getElementById('next-btn');
const feedback = document.getElementById('feedback');
const scoreElement = document.getElementById('score');
const streakElement = document.getElementById('streak');
const problemsCountElement = document.getElementById('problems-count');
const streakIndicator = document.getElementById('streak-indicator');
const timerElement = document.getElementById('timer');

// Initialize the game
function init() {
    problemsCount = 0;
    score = 0;
    streak = 0;
    updateStats();
    generateNewProblem();
    
    nextBtn.addEventListener('click', generateNewProblem);
}

function generateNewProblem() {
    const problemTypes = [
        'percentage', 'ratio', 'proportion', 'average', 
        'bodmas', 'probability', 'cryptography', 'profit_loss',
        'kinematics', 'geometry'
    ];
    const problemType = problemTypes[Math.floor(Math.random() * problemTypes.length)];
    
    let problem;
    
    switch(problemType) {
        case 'percentage':
            problem = generatePercentageProblem();
            break;
        case 'ratio':
            problem = generateRatioProblem();
            break;
        case 'proportion':
            problem = generateProportionProblem();
            break;
        case 'average':
            problem = generateAverageProblem();
            break;
        case 'bodmas':
            problem = generateBodmasProblem();
            break;
        case 'probability':
            problem = generateProbabilityProblem();
            break;
        case 'cryptography':
            problem = generateCryptographyProblem();
            break;
        case 'profit_loss':
            problem = generateProfitLossProblem();
            break;
        case 'kinematics':
            problem = generateKinematicProblem();
            break;
        case 'geometry':
            problem = generateGeometryProblem();
            break;
        default:
            problem = generatePercentageProblem();
    }
    
    currentProblem = problem;
    displayProblem(problem);
    resetUI();
    startTimer();
}

function displayProblem(problem) {
    problemText.textContent = problem.question;
    
    problemType.textContent = capitalizeFirstLetter(problem.type);
    
    switch(problem.type) {
        case 'percentage':
            problemType.style.backgroundColor = '#3498db';
            break;
        case 'ratio':
            problemType.style.backgroundColor = '#9b59b6';
            break;
        case 'proportion':
            problemType.style.backgroundColor = '#e67e22';
            break;
        case 'average':
            problemType.style.backgroundColor = '#27ae60';
            break;
        case 'bodmas':
            problemType.style.backgroundColor = '#f39c12';
            break;
        case 'probability':
            problemType.style.backgroundColor = '#c0392b';
            break;
        case 'cryptography':
            problemType.style.backgroundColor = '#1abc9c';
            break;
        case 'profit_loss':
            problemType.style.backgroundColor = '#d35400';
            break;
        case 'kinematics':
            problemType.style.backgroundColor = '#2980b9';
            break;
        case 'geometry':
            problemType.style.backgroundColor = '#16a085';
            break;
    }
    displayOptions(problem.options);
}


function displayOptions(options) {
    optionsContainer.innerHTML = '';
    
    options.forEach((option, index) => {
        const optionElement = document.createElement('div');
        optionElement.className = 'option';
        optionElement.textContent = option;
        optionElement.dataset.value = option;
        optionElement.addEventListener('click', () => selectOption(optionElement, option));
        
        optionsContainer.appendChild(optionElement);
    });
}

function selectOption(optionElement, value) {
    // Don't allow changing answer after it's submitted
    if (isAnswered) return;
    
    // Remove selected class from all options
    document.querySelectorAll('.option').forEach(option => {
        option.classList.remove('selected');
    });
    
    // Add selected class to clicked option
    optionElement.classList.add('selected');
    selectedOption = value;
    
    // Check answer automatically when an option is selected
    checkAnswer();
}

function resetUI() {
    feedback.style.display = 'none';
    nextBtn.style.display = 'none';
    
    const explanationContainer = document.getElementById('explanation-container');
    if (explanationContainer) {
        explanationContainer.style.display = 'none';
    }
    
    isAnswered = false;
    selectedOption = null;
    timeRemaining = 60;
    updateTimerDisplay();
}

function checkAnswer() {
    if (!currentProblem || !selectedOption || isAnswered) return;
    
    isAnswered = true;
    clearInterval(timerInterval);
    
    // Get all option elements
    const options = document.querySelectorAll('.option');
    
    let isCorrect = false;
    
    // Special handling for ratio type answers which might be strings like "3:4"
    if (typeof currentProblem.correct_answer === 'string' && currentProblem.correct_answer.includes(':')) {
        isCorrect = normalizeRatio(selectedOption) === normalizeRatio(currentProblem.correct_answer);
    } else {
        // Precise comparison for numerical answers - use exact matching
        const userAnswer = parseFloat(selectedOption);
        const expectedAnswer = parseFloat(currentProblem.correct_answer);
        
        // Use exact matching with a very small tolerance for floating point errors
        isCorrect = Math.abs(userAnswer - expectedAnswer) < 0.00001;
    }
    
    // Highlight correct and incorrect options
    options.forEach(option => {
        if (option.dataset.value == currentProblem.correct_answer) {
            option.classList.add('correct');
        } else if (option.classList.contains('selected') && !isCorrect) {
            option.classList.add('incorrect');
        }
    });
    
    handleAnswerResult(isCorrect);
}

function handleTimeout() {
    if (isAnswered) return;
    
    isAnswered = true;
    
    // Highlight the correct answer
    const options = document.querySelectorAll('.option');
    options.forEach(option => {
        if (option.dataset.value == currentProblem.correct_answer) {
            option.classList.add('correct');
        }
    });
    
    showFeedback(`Time's up! The correct answer is ${currentProblem.correct_answer}`, 'incorrect');
    
    // Display explanation if available
    if (currentProblem.explanation) {
        displayExplanation(currentProblem.explanation);
    }
    
    streak = 0;
    updateStats();
    nextBtn.style.display = 'block';
}

function displayExplanation(explanation) {
    // Create explanation container if it doesn't exist
    let explanationContainer = document.getElementById('explanation-container');
    if (!explanationContainer) {
        explanationContainer = document.createElement('div');
        explanationContainer.id = 'explanation-container';
        explanationContainer.className = 'explanation-container';
        
        // Add a title
        const explanationTitle = document.createElement('h3');
        explanationTitle.textContent = 'Solution Explanation:';
        explanationContainer.appendChild(explanationTitle);
        
        // Add content area
        const explanationContent = document.createElement('div');
        explanationContent.id = 'explanation-content';
        explanationContainer.appendChild(explanationContent);
        
        // Insert after feedback
        const feedbackElement = document.getElementById('feedback');
        feedbackElement.parentNode.insertBefore(explanationContainer, feedbackElement.nextSibling);
    }
    
    // Update explanation content
    const explanationContent = document.getElementById('explanation-content');
    explanationContent.innerHTML = explanation.replace(/\n/g, '<br>');
    
    // Show the explanation
    explanationContainer.style.display = 'block';
}

// Handle answer result
function handleAnswerResult(isCorrect) {
    problemsCount++;
    
    if (isCorrect) {
        showFeedback('Correct! Great job!', 'correct');
        score++;
        streak++;
    } else {
        showFeedback(`Incorrect. The correct answer is ${currentProblem.correct_answer}`, 'incorrect');
        streak = 0;
    }
    
    // Display explanation if available
    if (currentProblem.explanation) {
        displayExplanation(currentProblem.explanation);
    }
    
    updateStats();
    nextBtn.style.display = 'block';
}

// Start timer
function startTimer() {
    clearInterval(timerInterval);
    timeRemaining = 60; // 60 seconds = 1 minute
    updateTimerDisplay();
    
    timerInterval = setInterval(() => {
        timeRemaining--;
        updateTimerDisplay();
        
        if (timeRemaining <= 0) {
            clearInterval(timerInterval);
            handleTimeout();
        }
    }, 1000);
}

// Update timer display
function updateTimerDisplay() {
    const minutes = Math.floor(timeRemaining / 60);
    const seconds = timeRemaining % 60;
    
    timerElement.textContent = `Time remaining: ${padZero(minutes)}:${padZero(seconds)}`;
    
    // Change color when time is running low
    if (timeRemaining <= 10) {
        timerElement.style.color = '#e74c3c';
    } else if (timeRemaining <= 20) {
        timerElement.style.color = '#e67e22';
    } else {
        timerElement.style.color = 'var(--text-color)';
    }
}

// Update statistics
function updateStats() {
    scoreElement.textContent = score;
    streakElement.textContent = streak;
    problemsCountElement.textContent = problemsCount;
    
    // Update streak indicator
    streakIndicator.textContent = `Current streak: ${streak}`;
    
    // Change color based on streak
    if (streak >= 5) {
        streakIndicator.style.backgroundColor = '#d5f5e3'; // Light green
        streakIndicator.style.color = '#27ae60';
    } else if (streak >= 3) {
        streakIndicator.style.backgroundColor = '#e8f8f5'; // Light teal
        streakIndicator.style.color = '#16a085';
    } else {
        streakIndicator.style.backgroundColor = '#f8f9fa'; // Light gray
        streakIndicator.style.color = '#7f8c8d';
    }
}

// Show feedback message
function showFeedback(message, type) {
    feedback.textContent = message;
    feedback.className = 'feedback ' + type;
    feedback.style.display = 'block';
}

// Helper functions
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function padZero(num) {
    return num < 10 ? '0' + num : num;
}

function normalizeRatio(ratioStr) {
    // Convert ratios to a normalized form for comparison
    const parts = ratioStr.split(':').map(n => parseInt(n.trim()));
    const gcd = calculateGCD(parts[0], parts[1]);
    return `${parts[0]/gcd}:${parts[1]/gcd}`;
}

function calculateGCD(a, b) {
    while (b) {
        const temp = b;
        b = a % b;
        a = temp;
    }
    return a;
}

// Start the game when the page loads
window.addEventListener('load', init);