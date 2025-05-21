// Advanced BODMAS/Order of Operations Problem Generator

function generateBodmasProblem() {
    const problemTypes = [
        "basic_operations",
        "nested_expressions",
        "mixed_operations",
        "power_and_roots",
        "bracketed_complex",
        "number_manipulation"
    ];
    
    // Utility functions
    function randomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    
    function preciseRound(num, decimals) {
        const factor = Math.pow(10, decimals);
        return Math.round((num + Number.EPSILON) * factor) / factor;
    }
    
    // Dynamic operation generators
    const operationGenerators = {
        basic_operations: function() {
            const operations = ['+', '-', '*', '/'];
            const a = randomInt(2, 50);
            const b = randomInt(2, 20);
            const c = randomInt(2, 20);
            const op1 = operations[Math.floor(Math.random() * operations.length)];
            const op2 = operations[Math.floor(Math.random() * operations.length)];
            
            const expression = `${a} ${op1} ${b} ${op2} ${c}`;
            let answer;
            
            // Custom evaluation logic
            switch (op1) {
                case '+':
                    answer = op2 === '+' ? (a + b + c) : 
                             op2 === '-' ? (a + b - c) : 
                             op2 === '*' ? (a + b * c) : 
                             (a + b / c);
                    break;
                case '-':
                    answer = op2 === '+' ? (a - b + c) : 
                             op2 === '-' ? (a - b - c) : 
                             op2 === '*' ? (a - b * c) : 
                             (a - b / c);
                    break;
                case '*':
                    answer = op2 === '+' ? (a * b + c) : 
                             op2 === '-' ? (a * b - c) : 
                             op2 === '*' ? (a * b * c) : 
                             (a * b / c);
                    break;
                case '/':
                    answer = op2 === '+' ? (a / b + c) : 
                             op2 === '-' ? (a / b - c) : 
                             op2 === '*' ? (a / b * c) : 
                             (a / b / c);
                    break;
            }
            
            const explanation = `Solving the expression ${expression} step by step:
1. Follow the order of operations (BODMAS):
   - Multiplication and division have priority
   - Addition and subtraction follow from left to right

2. Calculating the result:
   ${a} ${op1} ${b} = ${op1 === '+' ? a + b : op1 === '-' ? a - b : op1 === '*' ? a * b : a / b}
   Then ${op2} ${c} gives the final result: ${answer}`;
            
            return { 
                question: `Calculate: ${expression}`, 
                answer: preciseRound(answer, 2),
                explanation: explanation 
            };
        },
        
        nested_expressions: function() {
            const a = randomInt(2, 30);
            const b = randomInt(2, 20);
            const c = randomInt(2, 20);
            const d = randomInt(2, 20);
            
            const templates = [
                `(${a} + ${b}) * ${c} - ${d}`,
                `${a} * (${b} + ${c}) - ${d}`,
                `(${a} - ${b}) / ${c} + ${d}`
            ];
            
            const expression = templates[Math.floor(Math.random() * templates.length)];
            
            // eslint-disable-next-line no-eval
            const answer = parseFloat(eval(expression));
            
            const explanation = `Solving the nested expression ${expression} step by step:
1. Always solve what's inside the brackets FIRST
2. Then apply the remaining operations following BODMAS rules

Step-by-step breakdown:
- Inside the brackets: ${expression.match(/\(([^)]+)\)/)[1]} = ${eval(expression.match(/\(([^)]+)\)/)[1])}
- Complete expression resolves to: ${answer}`;
            
            return { 
                question: `Calculate: ${expression}`, 
                answer: preciseRound(answer, 2),
                explanation: explanation 
            };
        },
        
        mixed_operations: function() {
            const a = randomInt(2, 40);
            const b = randomInt(2, 30);
            const c = randomInt(2, 25);
            const d = randomInt(2, 20);
            
            const templates = [
                `${a} + ${b} * ${c} / ${d}`,
                `${a} * ${b} - ${c} + ${d}`,
                `(${a} + ${b}) / ${c} * ${d}`
            ];
            
            const expression = templates[Math.floor(Math.random() * templates.length)];
            
            // eslint-disable-next-line no-eval
            const answer = parseFloat(eval(expression));
            
            const explanation = `Solving the mixed operations expression ${expression}:
1. Apply BODMAS rules:
   - Prioritize operations inside brackets
   - Then multiplication and division
   - Finally addition and subtraction

Detailed calculation:
- Perform multiplication/division first
- Then complete the remaining operations from left to right`;
            
            return { 
                question: `Calculate: ${expression}`, 
                answer: preciseRound(answer, 2),
                explanation: explanation 
            };
        },
        
        power_and_roots: function() {
            const a = randomInt(2, 10);
            const b = randomInt(2, 5);
            const c = randomInt(2, 15);
            
            const templates = [
                `${a}^${b} + ${c}`,
                `${c} - ${a}^${b}`,
                `${a}^${b} * ${c}`,
                `${c} / ${a}^${b}`
            ];
            
            const expression = templates[Math.floor(Math.random() * templates.length)];
            
            // eslint-disable-next-line no-eval
            const answer = parseFloat(eval(expression.replace(/\^/g, '**')));
            
            const explanation = `Solving the power expression ${expression}:
1. First, calculate the power: ${a}^${b} = ${Math.pow(a, b)}
2. Then complete the remaining operation
3. Follow BODMAS order of operations`;
            
            return { 
                question: `Calculate: ${expression}`, 
                answer: preciseRound(answer, 2),
                explanation: explanation 
            };
        },
        
        bracketed_complex: function() {
            const a = randomInt(10, 50);
            const b = randomInt(5, 25);
            const c = randomInt(2, 15);
            const d = randomInt(2, 15);
            
            const templates = [
                `(${a} + ${b}) * (${c} - ${d})`,
                `(${a} - ${b}) / (${c} + ${d})`,
                `${a} * (${b} + ${c}) - ${d}`
            ];
            
            const expression = templates[Math.floor(Math.random() * templates.length)];
            
            // eslint-disable-next-line no-eval
            const answer = parseFloat(eval(expression));
            
            const explanation = `Solving the complex bracketed expression ${expression}:
1. ALWAYS solve what's inside the brackets FIRST
2. Then apply the remaining operations following BODMAS rules

Detailed breakdown:
- First solve inside first bracket: ${expression.split('(')[1].split(')')[0]} = ${eval(expression.split('(')[1].split(')')[0])}
- Then solve inside second bracket: ${expression.split('(')[2].split(')')[0]} = ${eval(expression.split('(')[2].split(')')[0])}
- Complete the entire calculation step by step`;
            
            return { 
                question: `Calculate: ${expression}`, 
                answer: preciseRound(answer, 2),
                explanation: explanation 
            };
        },
        
        number_manipulation: function() {
            const a = randomInt(2, 40);
            const b = randomInt(2, 30);
            const c = randomInt(2, 25);
            const d = randomInt(2, 20);
            
            const templates = [
                `(${a} + ${b}) % ${c} * ${d}`,
                `${a} + (${b} * ${c}) % ${d}`,
                `(${a} * ${b}) % ${c} + ${d}`
            ];
            
            const expression = templates[Math.floor(Math.random() * templates.length)];
            
            // eslint-disable-next-line no-eval
            const answer = parseFloat(eval(expression));
            
            const explanation = `Solving the number manipulation expression ${expression}:
1. Follow BODMAS rules
2. Pay special attention to modulo (%) operations
3. Solve step by step from inside brackets outward

Modulo (%) gives the remainder after division
Calculate each step carefully following the order of operations`;
            
            return { 
                question: `Calculate: ${expression}`, 
                answer: preciseRound(answer, 2),
                explanation: explanation 
            };
        }
    };
    
    // Select a random problem type
    const problemType = problemTypes[Math.floor(Math.random() * problemTypes.length)];
    
    // Generate the problem using the selected type
    const problemGenerator = operationGenerators[problemType];
    const { question, answer, explanation } = problemGenerator();
    
    // Generate multiple choice options
    const options = generateOptions(answer);
    
    return {
        type: "bodmas",
        question: question,
        options: options,
        correct_answer: answer,
        explanation: explanation
    };
}

// Reuse the existing options generation function
function generateOptions(correctAnswer) {
    const options = [correctAnswer];
    
    const value = parseFloat(correctAnswer);
    
    // Create variations around the correct answer
    const variations = [
        value * 0.85,  // 15% less
        value * 0.95,  // 5% less
        value * 1.05,  // 5% more
        value * 1.15,  // 15% more
        value - 1,     // 1 less
        value + 1,     // 1 more
        value * 0.5,   // half
        value * 2      // double
    ];
    
    // Select 3 different wrong options
    const wrongOptions = [];
    variations.sort(() => Math.random() - 0.5);
    
    for (const variation of variations) {
        // Round to 2 decimal places
        const roundedVar = parseFloat(variation.toFixed(2));
        
        if (Math.abs(roundedVar - value) > 0.01 && !wrongOptions.includes(roundedVar)) {
            wrongOptions.push(roundedVar);
            if (wrongOptions.length === 3) break;
        }
    }
    
    options.push(...wrongOptions);
    
    // Shuffle the options
    return options.sort(() => Math.random() - 0.5);
}