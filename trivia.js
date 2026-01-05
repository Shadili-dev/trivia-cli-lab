// Import readline-sync for user input
const readline = require('readline-sync');

// Array of trivia questions (meets array requirement)
const triviaQuestions = [
    {
        question: "What is the capital of France?",
        options: ["A) London", "B) Berlin", "C) Paris", "D) Madrid"],
        correctAnswer: "C",
        explanation: "Paris has been the capital of France since 508 AD."
    },
    {
        question: "Which planet is known as the Red Planet?",
        options: ["A) Venus", "B) Mars", "C) Jupiter", "D) Saturn"],
        correctAnswer: "B",
        explanation: "Mars appears red due to iron oxide (rust) on its surface."
    },
    {
        question: "What is the largest mammal in the world?",
        options: ["A) African Elephant", "B) Blue Whale", "C) Giraffe", "D) Polar Bear"],
        correctAnswer: "B",
        explanation: "The Blue Whale can grow up to 100 feet long and weigh 200 tons."
    },
    {
        question: "Who painted the Mona Lisa?",
        options: ["A) Vincent van Gogh", "B) Pablo Picasso", "C) Leonardo da Vinci", "D) Michelangelo"],
        correctAnswer: "C",
        explanation: "Leonardo da Vinci painted the Mona Lisa between 1503 and 1506."
    },
    {
        question: "What is the chemical symbol for gold?",
        options: ["A) Go", "B) Gd", "C) Au", "D) Ag"],
        correctAnswer: "C",
        explanation: "Au comes from the Latin word 'aurum' meaning gold."
    }
];

// Game variables
let score = 0;
let currentQuestionIndex = 0;
let timer;
const TIME_LIMIT = 30; // 30 seconds per question

// Function to display welcome message
function displayWelcome() {
    console.log("=".repeat(50));
    console.log("🎯 WELCOME TO TRIVIA CLI GAME 🎯");
    console.log("=".repeat(50));
    console.log("\nRules:");
    console.log("1. You have " + TIME_LIMIT + " seconds to answer each question");
    console.log("2. Type the letter of your answer (A, B, C, or D)");
    console.log("3. Score points for correct answers");
    console.log("4. Get explanations for each answer");
    console.log("\n" + "=".repeat(50));
}

// Function to display a question
function displayQuestion(questionObj) {
    console.log("\n" + "=".repeat(50));
    console.log(`Question ${currentQuestionIndex + 1} of ${triviaQuestions.length}`);
    console.log("=".repeat(50));
    console.log(`\n${questionObj.question}`);
    console.log("\nOptions:");
    questionObj.options.forEach(option => {
        console.log(`  ${option}`);
    });
    console.log("\nTime limit: " + TIME_LIMIT + " seconds");
    console.log("=".repeat(50));
}

// Function to start timer for a question
function startTimer() {
    let timeLeft = TIME_LIMIT;
    
    timer = setInterval(() => {
        process.stdout.write(`\rTime remaining: ${timeLeft} seconds   `);
        timeLeft--;
        
        if (timeLeft < 0) {
            clearInterval(timer);
            console.log("\n\n⏰ Time's up! Moving to next question...");
            processQuestionResult(false, "Time's up!");
        }
    }, 1000);
}

// Function to stop timer
function stopTimer() {
    if (timer) {
        clearInterval(timer);
        process.stdout.write('\r' + ' '.repeat(30) + '\r'); // Clear timer line
    }
}

// Function to process question result
function processQuestionResult(isCorrect, userAnswer) {
    stopTimer();
    const question = triviaQuestions[currentQuestionIndex];
    
    console.log("\n" + "-".repeat(50));
    
    if (isCorrect) {
        console.log("✅ CORRECT!");
        score += 10;
    } else {
        console.log("❌ INCORRECT!");
        console.log(`Your answer: ${userAnswer}`);
        console.log(`Correct answer: ${question.correctAnswer})`);
    }
    
    console.log(`\n📚 Explanation: ${question.explanation}`);
    console.log(`\nCurrent Score: ${score} points`);
    console.log("-".repeat(50));
    
    // Move to next question
    currentQuestionIndex++;
    
    // Check if game is over
    if (currentQuestionIndex >= triviaQuestions.length) {
        endGame();
    } else {
        // Small delay before next question
        setTimeout(() => {
            askQuestion();
        }, 3000);
    }
}

// Function to ask a question and get user input
function askQuestion() {
    if (currentQuestionIndex >= triviaQuestions.length) {
        endGame();
        return;
    }
    
    const question = triviaQuestions[currentQuestionIndex];
    
    displayQuestion(question);
    startTimer();
    
    // Get user input
    console.log("\nEnter your answer (A/B/C/D):");
    const userAnswer = readline.question("> ").toUpperCase().trim();
    
    // Validate input
    if (["A", "B", "C", "D"].includes(userAnswer)) {
        const isCorrect = userAnswer === question.correctAnswer;
        processQuestionResult(isCorrect, userAnswer);
    } else {
        console.log("\n⚠️  Invalid input! Please enter A, B, C, or D.");
        // Re-ask the same question
        askQuestion();
    }
}

// Function to end the game
function endGame() {
    console.log("\n" + "=".repeat(50));
    console.log("🎮 GAME OVER! 🎮");
    console.log("=".repeat(50));
    console.log(`\nFinal Score: ${score} out of ${triviaQuestions.length * 10}`);
    console.log(`Questions Answered: ${currentQuestionIndex} of ${triviaQuestions.length}`);
    
    // Calculate percentage
    const percentage = (score / (triviaQuestions.length * 10)) * 100;
    console.log(`Percentage: ${percentage.toFixed(1)}%`);
    
    // Provide feedback based on score
    if (percentage >= 80) {
        console.log("\n🏆 EXCELLENT! You're a trivia master!");
    } else if (percentage >= 60) {
        console.log("\n👍 GOOD JOB! You know your stuff!");
    } else if (percentage >= 40) {
        console.log("\n💪 NOT BAD! Keep learning!");
    } else {
        console.log("\n📚 KEEP PRACTICING! You'll do better next time!");
    }
    
    console.log("\n" + "=".repeat(50));
    console.log("Thanks for playing! 👋");
    
    // Ask if user wants to play again
    console.log("\nWould you like to play again? (yes/no)");
    const playAgain = readline.question("> ").toLowerCase().trim();
    
    if (playAgain === 'yes' || playAgain === 'y') {
        resetGame();
        startGame();
    } else {
        console.log("\nGoodbye! 👋");
        process.exit(0);
    }
}

// Function to reset game state
function resetGame() {
    score = 0;
    currentQuestionIndex = 0;
    stopTimer();
}

// Function to start the game
function startGame() {
    displayWelcome();
    
    // Ask if user is ready
    console.log("\nAre you ready to start? (yes/no)");
    const ready = readline.question("> ").toLowerCase().trim();
    
    if (ready === 'yes' || ready === 'y') {
        console.log("\n🎬 Starting game... Good luck!\n");
        setTimeout(() => {
            askQuestion();
        }, 2000);
    } else {
        console.log("\nOkay, maybe next time! 👋");
        process.exit(0);
    }
}

// Main game initialization
console.clear();
startGame();

// Handle CTRL+C to exit gracefully
process.on('SIGINT', () => {
    console.log("\n\n👋 Thanks for playing! Game interrupted.");
    stopTimer();
    process.exit(0);
});
