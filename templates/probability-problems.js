// Main Probability Problems Generator
// This file integrates basic and advanced probability problems

function generateProbabilityProblem() {
    // Decide whether to generate a basic or advanced problem
    const useAdvanced = Math.random() > 0.5;
    
    let problem;
    if (useAdvanced) {
        problem = generateAdvancedProbabilityProblem();
    } else {
        problem = generateBasicProbabilityProblem();
    }
    
    // Ensure the problem has the explanation field
    if (!problem.explanation) {
        problem.explanation = generateGenericExplanation(problem);
    }
    
    return problem;
}

// Fallback function to generate a generic explanation if needed
function generateGenericExplanation(problem) {
    const answer = problem.correct_answer;
    
    return `To solve probability problems, we always divide the number of favorable outcomes by the total number of possible outcomes.\n\n` +
           `For this problem, the answer is ${answer}, which means there's a ${Math.round(answer * 100)}% chance of the event occurring.`;
}

// Utility function to generate probability options
function generateProbabilityOptions(correctAnswer) {
    const options = [correctAnswer];
    const value = parseFloat(correctAnswer);
    
    // Create variations around the correct answer, ensuring they stay between 0 and 1
    const variations = [];
    
    // Add some percentage based variations
    for (const factor of [0.7, 0.85, 1.15, 1.3]) {
        const var_value = value * factor;
        if (var_value > 0 && var_value < 1) {
            variations.push(var_value);
        }
    }
    
    // Add some fixed variations
    for (const delta of [0.1, 0.2, 0.05, -0.05, -0.1, -0.2]) {
        const var_value = value + delta;
        if (var_value > 0 && var_value < 1) {
            variations.push(var_value);
        }
    }
    
    // Add some common probability misconceptions if they're different enough
    for (const val of [1/6, 1/4, 1/3, 1/2, 2/3, 3/4, 5/6]) {
        if (Math.abs(val - value) > 0.05) {
            variations.push(val);
        }
    }
    
    // Select 3 different wrong options
    const wrongOptions = [];
    variations.sort(() => Math.random() - 0.5); // Shuffle variations
    
    for (const var_value of variations) {
        // Round to 3 decimal places for probabilities
        const rounded_var = preciseRound(var_value, 3);
        
        if (Math.abs(rounded_var - value) > 0.001 && !wrongOptions.includes(rounded_var)) {
            wrongOptions.push(rounded_var);
            if (wrongOptions.length === 3) break;
        }
    }
    
    // If we couldn't generate enough options, add some defaults
    const defaultOptions = [0.1, 0.25, 0.5, 0.75, 0.9];
    while (wrongOptions.length < 3) {
        for (const opt of defaultOptions) {
            if (Math.abs(opt - value) > 0.1 && !wrongOptions.includes(opt) && !options.includes(opt)) {
                wrongOptions.push(opt);
                if (wrongOptions.length === 3) break;
            }
        }
        
        // If we still need more options, create a random one
        if (wrongOptions.length < 3) {
            const randomOpt = preciseRound(Math.random(), 3);
            if (Math.abs(randomOpt - value) > 0.1 && !wrongOptions.includes(randomOpt) && !options.includes(randomOpt)) {
                wrongOptions.push(randomOpt);
            }
        }
    }
    
    options.push(...wrongOptions.slice(0, 3));
    
    return options.sort(() => Math.random() - 0.5);
}