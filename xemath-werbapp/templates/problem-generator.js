function generatePercentageProblem() {
    const problemTypes = [
        "percentage_increase_decrease",
        "compound_percentage",
        "percentage_of_percentage",
        "reverse_percentage"
    ];
    
    const problemType = problemTypes[Math.floor(Math.random() * problemTypes.length)];
    
    if (problemType === "percentage_increase_decrease") {
        const original = randomInt(100, 1000);
        const percentage = randomInt(15, 75);
        const increase = Math.random() > 0.5;
        
        const operation = increase ? "increased" : "decreased";
        const answer = increase ? 
            original * (1 + percentage/100) : 
            original * (1 - percentage/100);
        
        const questionTemplates = [
            `If ${original} is ${operation} by ${percentage}%, what is the new value?`,
            `A value of ${original} is ${operation} by ${percentage}%. What is the result?`,
            `What is the final value when ${original} is ${operation} by ${percentage}%?`,
            `After a ${percentage}% ${operation === "increased" ? "increase" : "decrease"}, what is the new value of ${original}?`
        ];
        
        const question = questionTemplates[Math.floor(Math.random() * questionTemplates.length)];
        
        const explanation = `To find the new value after a percentage ${operation}, we use the formula:\n\n` +
            `New value = Original value × (1 ${increase ? '+' : '-'} percentage/100)\n\n` +
            `New value = ${original} × (1 ${increase ? '+' : '-'} ${percentage}/100)\n` +
            `New value = ${original} × (1 ${increase ? '+' : '-'} ${percentage/100})\n` +
            `New value = ${original} × ${increase ? (1 + percentage/100) : (1 - percentage/100)}\n` +
            `New value = ${answer}\n\n` +
            `Therefore, when ${original} is ${operation} by ${percentage}%, the new value is ${answer}.`;
        
        return {
            type: "percentage",
            question: question,
            options: generateOptions(answer),
            correct_answer: preciseRound(answer, 2),
            explanation: explanation
        };
    }
    else if (problemType === "compound_percentage") {
        const original = randomInt(100, 500);
        const percentage1 = randomInt(10, 30);
        const percentage2 = randomInt(10, 30);
        
        const operationChoices = ["increase", "decrease"];
        const operations = [
            operationChoices[Math.floor(Math.random() * operationChoices.length)],
            operationChoices[Math.floor(Math.random() * operationChoices.length)]
        ];
        
        let interim, answer;
        
        if (operations[0] === "increase") {
            interim = original * (1 + percentage1/100);
        } else {
            interim = original * (1 - percentage1/100);
        }
            
        if (operations[1] === "increase") {
            answer = interim * (1 + percentage2/100);
        } else {
            answer = interim * (1 - percentage2/100);
        }
        
        const questionTemplates = [
            `A value of ${original} is first ${operations[0]}d by ${percentage1}% and then ${operations[1]}d by ${percentage2}%. What is the final value?`,
            `What is the result when ${original} is ${operations[0]}d by ${percentage1}% and then ${operations[1]}d by ${percentage2}%?`,
            `${original} undergoes a ${percentage1}% ${operations[0]} followed by a ${percentage2}% ${operations[1]}. What is the final value?`,
            `After ${operations[0]}ing by ${percentage1}% and then ${operations[1]}ing by ${percentage2}%, what is the new value of ${original}?`
        ];
        
        const question = questionTemplates[Math.floor(Math.random() * questionTemplates.length)];
        
        const explanation = `This is a compound percentage problem involving two successive percentage changes.\n\n` +
            `Step 1: Apply the first percentage change (${percentage1}% ${operations[0]}).\n` +
            `Interim value = ${original} × (1 ${operations[0] === "increase" ? '+' : '-'} ${percentage1}/100)\n` +
            `Interim value = ${original} × ${operations[0] === "increase" ? (1 + percentage1/100) : (1 - percentage1/100)}\n` +
            `Interim value = ${interim.toFixed(2)}\n\n` +
            `Step 2: Apply the second percentage change (${percentage2}% ${operations[1]}).\n` +
            `Final value = ${interim.toFixed(2)} × (1 ${operations[1] === "increase" ? '+' : '-'} ${percentage2}/100)\n` +
            `Final value = ${interim.toFixed(2)} × ${operations[1] === "increase" ? (1 + percentage2/100) : (1 - percentage2/100)}\n` +
            `Final value = ${answer.toFixed(2)}\n\n` +
            `Therefore, the final value is ${answer.toFixed(2)}.`;
        
        return {
            type: "percentage",
            question: question,
            options: generateOptions(answer),
            correct_answer: preciseRound(answer, 2),
            explanation: explanation
        };
    }
    else if (problemType === "percentage_of_percentage") {
        const whole = randomInt(500, 2000);
        const percentage1 = randomInt(20, 75);
        const percentage2 = randomInt(15, 65);
        
        const part = whole * (percentage1/100);
        const answer = part * (percentage2/100);
        
        const questionTemplates = [
            `${percentage1}% of ${whole} is ${Math.round(part)}. What is ${percentage2}% of that?`,
            `If ${percentage1}% of ${whole} equals ${Math.round(part)}, calculate ${percentage2}% of this amount.`,
            `First find ${percentage1}% of ${whole}, which is ${Math.round(part)}. Then calculate ${percentage2}% of that result.`,
            `What is ${percentage2}% of ${Math.round(part)}, where ${Math.round(part)} represents ${percentage1}% of ${whole}?`
        ];
        
        const question = questionTemplates[Math.floor(Math.random() * questionTemplates.length)];
        
        const explanation = `This problem requires finding a percentage of another percentage.\n\n` +
            `Step 1: Find ${percentage1}% of ${whole}.\n` +
            `${percentage1}% of ${whole} = (${percentage1}/100) × ${whole} = ${part}\n\n` +
            `Step 2: Find ${percentage2}% of ${part}.\n` +
            `${percentage2}% of ${part} = (${percentage2}/100) × ${part} = ${answer}\n\n` +
            `Therefore, ${percentage2}% of ${part} is ${answer}.`;
        
        return {
            type: "percentage",
            question: question,
            options: generateOptions(answer),
            correct_answer: preciseRound(answer, 2),
            explanation: explanation
        };
    }
    else {  // reverse_percentage
        const final = randomInt(120, 1000);
        const percentage = randomInt(15, 75);
        const increase = Math.random() > 0.5;
        
        const operation = increase ? "increased" : "decreased";
        
        let original;
        if (increase) {
            original = final / (1 + percentage/100);
        } else {
            original = final / (1 - percentage/100);
        }
        
        const questionTemplates = [
            `A value was ${operation} by ${percentage}% to get ${final}. What was the original value?`,
            `If a number is ${operation} by ${percentage}% to become ${final}, what was the initial value?`,
            `${final} is the result after a ${percentage}% ${increase ? "increase" : "decrease"}. What was the original value?`,
            `After a ${percentage}% ${operation}, the new value is ${final}. What was the value before the change?`
        ];
        
        const question = questionTemplates[Math.floor(Math.random() * questionTemplates.length)];
        
        const explanation = `This is a reverse percentage problem where we need to find the original value before a percentage change.\n\n` +
            `We know that:\n` +
            `Final value = Original value × (1 ${increase ? '+' : '-'} percentage/100)\n\n` +
            `Rearranging to find the original value:\n` +
            `Original value = Final value ÷ (1 ${increase ? '+' : '-'} percentage/100)\n\n` +
            `Original value = ${final} ÷ (1 ${increase ? '+' : '-'} ${percentage}/100)\n` +
            `Original value = ${final} ÷ ${increase ? (1 + percentage/100) : (1 - percentage/100)}\n` +
            `Original value = ${original}\n\n` +
            `Therefore, the original value was ${preciseRound(original, 2)}.`;
        
        return {
            type: "percentage",
            question: question,
            options: generateOptions(original),
            correct_answer: preciseRound(original, 2),
            explanation: explanation
        };
    }
}

function generateRatioProblem() {
    const problemTypes = [
        "find_value_given_ratio",
        "ratio_distribution",
        "ratio_change",
        "equivalent_ratios"
    ];
    
    const problemType = problemTypes[Math.floor(Math.random() * problemTypes.length)];
    
    if (problemType === "find_value_given_ratio") {
        let a, b;
        
        do {
            a = randomInt(2, 9);
            b = randomInt(2, 9);
        } while (gcd(a, b) !== 1); // Ensure relatively prime
            
        const findFirst = Math.random() > 0.5;
        const multiplier = randomInt(5, 20);
        
        let value, answer;
        
        if (findFirst) {
            value = b * multiplier;
            answer = a * multiplier;
            
            const questionTemplates = [
                `If the ratio of a:b is ${a}:${b} and b = ${value}, what is a?`,
                `The ratio a:b equals ${a}:${b}. If b is ${value}, find the value of a.`,
                `Given that a:b = ${a}:${b} and b = ${value}, calculate a.`,
                `When a:b = ${a}:${b}, and b = ${value}, what is the value of a?`
            ];
            
            const question = questionTemplates[Math.floor(Math.random() * questionTemplates.length)];
            
            const explanation = `To find the missing value in a ratio, we need to determine what multiplier was used to go from the ratio to the actual values.\n\n` +
                `Given:\n` +
                `• a:b = ${a}:${b}\n` +
                `• b = ${value}\n\n` +
                `Step 1: Find the multiplier by dividing the known value by its corresponding ratio part.\n` +
                `Multiplier = ${value} ÷ ${b} = ${multiplier}\n\n` +
                `Step 2: Multiply the other part of the ratio by this multiplier.\n` +
                `a = ${a} × ${multiplier} = ${answer}\n\n` +
                `Therefore, a = ${answer}.`;
            
            return {
                type: "ratio",
                question: question,
                options: generateOptions(answer),
                correct_answer: answer,
                explanation: explanation
            };
        } 
        else {
            value = a * multiplier;
            answer = b * multiplier;
            
            const questionTemplates = [
                `If the ratio of a:b is ${a}:${b} and a = ${value}, what is b?`,
                `The ratio a:b equals ${a}:${b}. If a is ${value}, find the value of b.`,
                `Given that a:b = ${a}:${b} and a = ${value}, calculate b.`,
                `When a:b = ${a}:${b}, and a = ${value}, what is the value of b?`
            ];
            
            const question = questionTemplates[Math.floor(Math.random() * questionTemplates.length)];
            
            const explanation = `To find the missing value in a ratio, we need to determine what multiplier was used to go from the ratio to the actual values.\n\n` +
                `Given:\n` +
                `• a:b = ${a}:${b}\n` +
                `• a = ${value}\n\n` +
                `Step 1: Find the multiplier by dividing the known value by its corresponding ratio part.\n` +
                `Multiplier = ${value} ÷ ${a} = ${multiplier}\n\n` +
                `Step 2: Multiply the other part of the ratio by this multiplier.\n` +
                `b = ${b} × ${multiplier} = ${answer}\n\n` +
                `Therefore, b = ${answer}.`;
            
            return {
                type: "ratio",
                question: question,
                options: generateOptions(answer),
                correct_answer: answer,
                explanation: explanation
            };
        }
    }
    else if (problemType === "ratio_distribution") {
        const a = randomInt(2, 7);
        const b = randomInt(2, 7);
        const c = randomInt(2, 7);
        
        const total = randomInt(100, 500);
        const adjustedTotal = total - (total % (a + b + c));
        
        const part_value = adjustedTotal / (a + b + c);
        
        const position = randomInt(1, 3);
        let answer;
        
        if (position === 1) {
            answer = a * part_value;
            
            const questionTemplates = [
                `A sum of ${adjustedTotal} is divided in the ratio ${a}:${b}:${c}. How much is the first share?`,
                `${adjustedTotal} is shared in the ratio ${a}:${b}:${c}. What is the first portion?`,
                `When ${adjustedTotal} is split in the ratio ${a}:${b}:${c}, how much is the first part?`,
                `If ${adjustedTotal} is distributed in the ratio ${a}:${b}:${c}, what amount goes to the first recipient?`
            ];
            
            const question = questionTemplates[Math.floor(Math.random() * questionTemplates.length)];
            
            const explanation = `To find a share in a ratio distribution, we follow these steps:\n\n` +
                `Step 1: Find the sum of all ratio parts.\n` +
                `Sum of ratio parts = ${a} + ${b} + ${c} = ${a + b + c}\n\n` +
                `Step 2: Find the value of one ratio part.\n` +
                `Value of one part = Total amount ÷ Sum of ratio parts\n` +
                `Value of one part = ${adjustedTotal} ÷ ${a + b + c} = ${part_value}\n\n` +
                `Step 3: Calculate the first share.\n` +
                `First share = ${a} × ${part_value} = ${answer}\n\n` +
                `Therefore, the first share is ${answer}.`;
            
            return {
                type: "ratio",
                question: question,
                options: generateOptions(answer),
                correct_answer: answer,
                explanation: explanation
            };
        }
        else if (position === 2) {
            answer = b * part_value;
            
            const questionTemplates = [
                `A sum of ${adjustedTotal} is divided in the ratio ${a}:${b}:${c}. How much is the second share?`,
                `${adjustedTotal} is shared in the ratio ${a}:${b}:${c}. What is the second portion?`,
                `When ${adjustedTotal} is split in the ratio ${a}:${b}:${c}, how much is the second part?`,
                `If ${adjustedTotal} is distributed in the ratio ${a}:${b}:${c}, what amount goes to the second recipient?`
            ];
            
            const question = questionTemplates[Math.floor(Math.random() * questionTemplates.length)];
            
            const explanation = `To find a share in a ratio distribution, we follow these steps:\n\n` +
                `Step 1: Find the sum of all ratio parts.\n` +
                `Sum of ratio parts = ${a} + ${b} + ${c} = ${a + b + c}\n\n` +
                `Step 2: Find the value of one ratio part.\n` +
                `Value of one part = Total amount ÷ Sum of ratio parts\n` +
                `Value of one part = ${adjustedTotal} ÷ ${a + b + c} = ${part_value}\n\n` +
                `Step 3: Calculate the second share.\n` +
                `Second share = ${b} × ${part_value} = ${answer}\n\n` +
                `Therefore, the second share is ${answer}.`;
            
            return {
                type: "ratio",
                question: question,
                options: generateOptions(answer),
                correct_answer: answer,
                explanation: explanation
            };
        }
        else {
            answer = c * part_value;
            
            const questionTemplates = [
                `A sum of ${adjustedTotal} is divided in the ratio ${a}:${b}:${c}. How much is the third share?`,
                `${adjustedTotal} is shared in the ratio ${a}:${b}:${c}. What is the third portion?`,
                `When ${adjustedTotal} is split in the ratio ${a}:${b}:${c}, how much is the third part?`,
                `If ${adjustedTotal} is distributed in the ratio ${a}:${b}:${c}, what amount goes to the third recipient?`
            ];
            
            const question = questionTemplates[Math.floor(Math.random() * questionTemplates.length)];
            
            const explanation = `To find a share in a ratio distribution, we follow these steps:\n\n` +
                `Step 1: Find the sum of all ratio parts.\n` +
                `Sum of ratio parts = ${a} + ${b} + ${c} = ${a + b + c}\n\n` +
                `Step 2: Find the value of one ratio part.\n` +
                `Value of one part = Total amount ÷ Sum of ratio parts\n` +
                `Value of one part = ${adjustedTotal} ÷ ${a + b + c} = ${part_value}\n\n` +
                `Step 3: Calculate the third share.\n` +
                `Third share = ${c} × ${part_value} = ${answer}\n\n` +
                `Therefore, the third share is ${answer}.`;
            
            return {
                type: "ratio",
                question: question,
                options: generateOptions(answer),
                correct_answer: answer,
                explanation: explanation
            };
        }
    }
    else if (problemType === "ratio_change") {
        const a = randomInt(3, 10);
        const b = randomInt(3, 10);
        
        const changeTypes = [
            { 
                template: `If the ratio is ${a}:${b} and the first term is increased by {increment}, what is the new ratio?`,
                operation: "first_increase"
            },
            { 
                template: `If the ratio is ${a}:${b} and the second term is decreased by {decrement}, what is the new ratio?`,
                operation: "second_decrease"
            },
            { 
                template: `If the ratio is ${a}:${b} and both terms are multiplied by {multiplier}, what is the new ratio?`,
                operation: "both_multiply"
            },
            { 
                template: `If the ratio is ${a}:${b} and {increment} is added to both terms, what is the new ratio?`,
                operation: "both_add"
            }
        ];
        
        const changeType = changeTypes[Math.floor(Math.random() * changeTypes.length)];
        let question, answer;
        
        if (changeType.operation === "first_increase") {
            const increment = randomInt(2, 5);
            const new_a = a + increment;
            
            question = changeType.template.replace('{increment}', increment);
            answer = `${new_a}:${b}`;
            
            const explanation = `When the first term in a ratio is increased, we need to calculate the new ratio using the new values.\n\n` +
                `Original ratio: ${a}:${b}\n\n` +
                `After increasing the first term by ${increment}:\n` +
                `New first term = ${a} + ${increment} = ${new_a}\n` +
                `Second term remains the same: ${b}\n\n` +
                `The new ratio is ${new_a}:${b}.\n\n` +
                `To check if this can be simplified, we find the GCD of ${new_a} and ${b}:\n` +
                `GCD(${new_a}, ${b}) = ${gcd(new_a, b)}\n\n` +
                `${gcd(new_a, b) === 1 ? 
                  `Since the GCD is 1, the ratio ${new_a}:${b} is already in its simplest form.` : 
                  `Simplifying: ${new_a}:${b} = ${new_a/gcd(new_a, b)}:${b/gcd(new_a, b)}`}`;
        }
        else if (changeType.operation === "second_decrease") {
            const decrement = randomInt(1, b-2);
            const new_b = b - decrement;
            
            question = changeType.template.replace('{decrement}', decrement);
            answer = `${a}:${new_b}`;
            
            const explanation = `When the second term in a ratio is decreased, we need to calculate the new ratio using the new values.\n\n` +
                `Original ratio: ${a}:${b}\n\n` +
                `After decreasing the second term by ${decrement}:\n` +
                `First term remains the same: ${a}\n` +
                `New second term = ${b} - ${decrement} = ${new_b}\n\n` +
                `The new ratio is ${a}:${new_b}.\n\n` +
                `To check if this can be simplified, we find the GCD of ${a} and ${new_b}:\n` +
                `GCD(${a}, ${new_b}) = ${gcd(a, new_b)}\n\n` +
                `${gcd(a, new_b) === 1 ? 
                  `Since the GCD is 1, the ratio ${a}:${new_b} is already in its simplest form.` : 
                  `Simplifying: ${a}:${new_b} = ${a/gcd(a, new_b)}:${new_b/gcd(a, new_b)}`}`;
        }
        else if (changeType.operation === "both_multiply") {
            const multiplier = randomInt(2, 4);
            const new_a = a * multiplier;
            const new_b = b * multiplier;
            
            question = changeType.template.replace('{multiplier}', multiplier);
            answer = `${new_a}:${new_b}`;
            
            const explanation = `When both terms in a ratio are multiplied by the same value, the ratio can be simplified back to the original form.\n\n` +
                `Original ratio: ${a}:${b}\n\n` +
                `After multiplying both terms by ${multiplier}:\n` +
                `New first term = ${a} × ${multiplier} = ${new_a}\n` +
                `New second term = ${b} × ${multiplier} = ${new_b}\n\n` +
                `The new ratio is ${new_a}:${new_b}.\n\n` +
                `Note: This is equivalent to the original ratio because multiplying both terms by the same value maintains the proportional relationship, as:\n` +
                `${new_a}:${new_b} = ${a}:${b} × ${multiplier} = ${a}:${b}`;
        }
        else {  // both_add
            const increment = randomInt(2, 5);
            const new_a = a + increment;
            const new_b = b + increment;
            
            question = changeType.template.replace('{increment}', increment);
            answer = `${new_a}:${new_b}`;
            
            const explanation = `When a value is added to both terms in a ratio, we need to calculate the new ratio.\n\n` +
                `Original ratio: ${a}:${b}\n\n` +
                `After adding ${increment} to both terms:\n` +
                `New first term = ${a} + ${increment} = ${new_a}\n` +
                `New second term = ${b} + ${increment} = ${new_b}\n\n` +
                `The new ratio is ${new_a}:${new_b}.\n\n` +
                `To check if this can be simplified, we find the GCD of ${new_a} and ${new_b}:\n` +
                `GCD(${new_a}, ${new_b}) = ${gcd(new_a, new_b)}\n\n` +
                `${gcd(new_a, new_b) === 1 ? 
                  `Since the GCD is 1, the ratio ${new_a}:${new_b} is already in its simplest form.` : 
                  `Simplifying: ${new_a}:${new_b} = ${new_a/gcd(new_a, new_b)}:${new_b/gcd(new_a, new_b)}`}\n\n` +
                `Note: Unlike multiplication, adding the same value to both terms changes the ratio.`;
        }
        
        return {
            type: "ratio",
            question: question,
            options: generateRatioOptions(answer),
            correct_answer: answer,
            explanation: explanation
        };
    }
    else {  // equivalent_ratios
        const a = randomInt(2, 10);
        const b = randomInt(2, 10);
        
        const multiplier = randomInt(3, 10);
        const new_a = a * multiplier;
        const new_b = b * multiplier;
        
        const findSecond = Math.random() > 0.5;
        let question, answer;
        
        if (findSecond) {
            const questionTemplates = [
                `If ${a}:${b} = ${new_a}:x, what is x?`,
                `Find the value of x in the proportion ${a}:${b} = ${new_a}:x.`,
                `If ${a} is to ${b} as ${new_a} is to x, what is the value of x?`,
                `When ${a}:${b} = ${new_a}:x, calculate x.`
            ];
            
            question = questionTemplates[Math.floor(Math.random() * questionTemplates.length)];
            answer = new_b;
            
            const explanation = `To find the missing value in equivalent ratios, we need to determine the scale factor between the known pairs.\n\n` +
                `Step 1: Find the scale factor from the first term of the first ratio to the first term of the second ratio.\n` +
                `Scale factor = ${new_a} ÷ ${a} = ${multiplier}\n\n` +
                `Step 2: Apply this scale factor to the second term of the first ratio to find x.\n` +
                `x = ${b} × ${multiplier} = ${new_b}\n\n` +
                `Therefore, x = ${new_b}.\n\n` +
                `Verification: ${a}:${b} = ${new_a}:${new_b} because both equal the simplified ratio ${a/gcd(a,b)}:${b/gcd(a,b)}.`;
        }
        else {
            const questionTemplates = [
                `If ${a}:${b} = y:${new_b}, what is y?`,
                `Find the value of y in the proportion ${a}:${b} = y:${new_b}.`,
                `If ${a} is to ${b} as y is to ${new_b}, what is the value of y?`,
                `When ${a}:${b} = y:${new_b}, calculate y.`
            ];
            
            question = questionTemplates[Math.floor(Math.random() * questionTemplates.length)];
            answer = new_a;
            
            const explanation = `To find the missing value in equivalent ratios, we need to determine the scale factor between the known pairs.\n\n` +
                `Step 1: Find the scale factor from the second term of the first ratio to the second term of the second ratio.\n` +
                `Scale factor = ${new_b} ÷ ${b} = ${multiplier}\n\n` +
                `Step 2: Apply this scale factor to the first term of the first ratio to find y.\n` +
                `y = ${a} × ${multiplier} = ${new_a}\n\n` +
                `Therefore, y = ${new_a}.\n\n` +
                `Verification: ${a}:${b} = ${new_a}:${new_b} because both equal the simplified ratio ${a/gcd(a,b)}:${b/gcd(a,b)}.`;
        }
        
        return {
            type: "ratio",
            question: question,
            options: generateOptions(answer),
            correct_answer: answer,
            explanation: explanation
        };
    }
}

function generateProportionProblem() {
    const problemTypes = [
        "direct_proportion",
        "inverse_proportion",
        "combined_proportion"
    ];
    
    const problemType = problemTypes[Math.floor(Math.random() * problemTypes.length)];
    
    if (problemType === "direct_proportion") {
        const scenarios = [
            {
                template: "If {a} workers can complete a job in {b} days, how many days will it take {c} workers to complete the same job?",
                is_direct: false,
                formula: (a, b, c) => (a * b) / c,
                explanation_template: `This is an inverse proportion problem because the time taken is inversely proportional to the number of workers.\n\n` +
                    `When the number of workers increases, the time taken decreases proportionally, and vice versa.\n\n` +
                    `We can use the formula: workers × time = constant (total work)\n\n` +
                    `For the first scenario: {a} workers × {b} days = {a*b} worker-days\n\n` +
                    `For the second scenario: {c} workers × x days = {a*b} worker-days\n\n` +
                    `Solving for x: x = {a*b} ÷ {c} = {answer} days\n\n` +
                    `Therefore, it will take {answer} days for {c} workers to complete the job.`
            },
            {
                template: "If {a} machines can produce {b} items in one hour, how many items can {c} machines produce in one hour?",
                is_direct: true,
                formula: (a, b, c) => (b * c) / a,
                explanation_template: `This is a direct proportion problem because the number of items produced is directly proportional to the number of machines.\n\n` +
                    `When the number of machines increases, the number of items produced increases proportionally.\n\n` +
                    `We can use the formula: items ÷ machines = constant (production rate per machine)\n\n` +
                    `For the first scenario: {b} items ÷ {a} machines = {b/a} items per machine\n\n` +
                    `For the second scenario: x items ÷ {c} machines = {b/a} items per machine\n\n` +
                    `Solving for x: x = {c} × {b/a} = {answer} items\n\n` +
                    `Therefore, {c} machines can produce {answer} items in one hour.`
            },
            {
                template: "A car travels {a} miles in {b} hours. At the same speed, how many miles will it travel in {c} hours?",
                is_direct: true,
                formula: (a, b, c) => (a * c) / b,
                explanation_template: `This is a direct proportion problem because the distance is directly proportional to the time when speed is constant.\n\n` +
                    `We can use the formula: distance ÷ time = constant (speed)\n\n` +
                    `For the first scenario: {a} miles ÷ {b} hours = {a/b} miles per hour\n\n` +
                    `For the second scenario: x miles ÷ {c} hours = {a/b} miles per hour\n\n` +
                    `Solving for x: x = {c} × {a/b} = {answer} miles\n\n` +
                    `Therefore, the car will travel {answer} miles in {c} hours.`
            },
            {
                template: "If {a} pounds of apples cost ${b}, how many pounds can you buy for ${c}?",
                is_direct: true,
                formula: (a, b, c) => (a * c) / b,
                explanation_template: `This is a direct proportion problem because the amount of apples is directly proportional to the money spent.\n\n` +
                    `We can use the formula: pounds ÷ cost = constant (pounds per dollar)\n\n` +
                    `For the first scenario: {a} pounds ÷ ${b} = {a/b} pounds per dollar\n\n` +
                    `For the second scenario: x pounds ÷ ${c} = {a/b} pounds per dollar\n\n` +
                    `Solving for x: x = ${c} × {a/b} = {answer} pounds\n\n` +
                    `Therefore, you can buy {answer} pounds of apples for ${c}.`
            },
            {
                template: "If it takes {a} painters {b} days to paint a house, how many days would it take {c} painters?",
                is_direct: false,
                formula: (a, b, c) => (a * b) / c,
                explanation_template: `This is an inverse proportion problem because the time taken is inversely proportional to the number of painters.\n\n` +
                    `When the number of painters increases, the time taken decreases proportionally, and vice versa.\n\n` +
                    `We can use the formula: painters × days = constant (total work)\n\n` +
                    `For the first scenario: {a} painters × {b} days = {a*b} painter-days\n\n` +
                    `For the second scenario: {c} painters × x days = {a*b} painter-days\n\n` +
                    `Solving for x: x = {a*b} ÷ {c} = {answer} days\n\n` +
                    `Therefore, it will take {answer} days for {c} painters to paint the house.`
            }
        ];
        
        const scenario = scenarios[Math.floor(Math.random() * scenarios.length)];
        
        let a, b, c, answer;
        
        if (scenario.is_direct) {
            a = randomInt(2, 10);
            b = randomInt(15, 100);
            c = randomInt(a+1, 20);
        } else {
            a = randomInt(5, 20);
            b = randomInt(3, 15);
            c = randomInt(1, a-1);
        }
            
        const question = scenario.template
            .replace("{a}", a)
            .replace("{b}", b)
            .replace("{c}", c);
            
        answer = scenario.formula(a, b, c);
        
        const explanation = scenario.explanation_template
            .replace(/{a}/g, a)
            .replace(/{b}/g, b)
            .replace(/{c}/g, c)
            .replace(/{a\*b}/g, a*b)
            .replace(/{b\/a}/g, (b/a).toFixed(2))
            .replace(/{a\/b}/g, (a/b).toFixed(2))
            .replace(/{answer}/g, preciseRound(answer, 2));
        
        return {
            type: "proportion",
            question: question,
            options: generateOptions(answer),
            correct_answer: preciseRound(answer, 2),
            explanation: explanation
        };
    }
    else if (problemType === "inverse_proportion") {
        const a = randomInt(4, 12);
        const b = randomInt(8, 24);
        const c = randomInt(a+2, 24);
        
        const scenarioTemplates = [
            `If ${a} people can paint a house in ${b} hours, how many hours would it take ${c} people to paint the same house?`,
            `A tap flowing at a rate of ${a} liters per minute fills a tank in ${b} minutes. How long would it take if the flow rate was ${c} liters per minute?`,
            `If ${a} machines can complete a task in ${b} hours, how many hours would it take ${c} machines to complete the same task?`,
            `When ${a} workers can build a wall in ${b} days, how many days would ${c} workers need to build the same wall?`
        ];
        
        const question = scenarioTemplates[Math.floor(Math.random() * scenarioTemplates.length)];
        answer = (a * b) / c;
        
        const explanation = `This is an inverse proportion problem because the time taken is inversely proportional to the number of workers/machines/flow rate.\n\n` +
            `When the number of workers (or equivalent) increases, the time taken decreases proportionally, and vice versa.\n\n` +
            `We can use the formula: workers × time = constant (total work)\n\n` +
            `For the first scenario: ${a} × ${b} = ${a*b}\n\n` +
            `For the second scenario: ${c} × x = ${a*b}\n\n` +
            `Solving for x: x = ${a*b} ÷ ${c} = ${preciseRound(answer, 2)}\n\n` +
            `Therefore, it will take ${preciseRound(answer, 2)} ${question.includes("hours") ? "hours" : "days"} to complete the task.`;
        
        return {
            type: "proportion",
            question: question,
            options: generateOptions(answer),
            correct_answer: preciseRound(answer, 2),
            explanation: explanation
        };
    }
    else {  // combined_proportion
        const a = randomInt(10, 30);
        const b = randomInt(3, 12);
        const c = randomInt(2, 8);
        const d = randomInt(15, 40);
        const e = randomInt(4, 15);
        
        const scenarioTemplates = [
            `${a} workers, working ${b} hours a day, complete a job in ${c} days. How many days would it take ${d} workers, working ${e} hours a day, to complete the same job?`,
            `${a} printers, working at ${b}% efficiency, take ${c} hours to print a job. How many hours would ${d} printers, working at ${e}% efficiency, take to print the same job?`,
            `${a} machines operating for ${b} hours can produce ${c} units. How many units could ${d} machines operating for ${e} hours produce?`
        ];
        
        const question = scenarioTemplates[Math.floor(Math.random() * scenarioTemplates.length)];
        
        let answer;
        let explanation;
        
        if (question.includes("workers") || question.includes("printers")) {
            const original_work = a * b * c;
            const new_work_per_day = d * e;
            answer = original_work / new_work_per_day;
            
            explanation = `This is a combined proportion problem involving both direct and inverse relationships.\n\n` +
                `For problems involving workers and time, we can use the formula:\n` +
                `workers × hours_per_day × days = constant (total work)\n\n` +
                `For the first scenario: ${a} × ${b} × ${c} = ${original_work}\n\n` +
                `For the second scenario: ${d} × ${e} × x = ${original_work}\n\n` +
                `Solving for x: x = ${original_work} ÷ (${d} × ${e}) = ${original_work} ÷ ${new_work_per_day} = ${preciseRound(answer, 2)}\n\n` +
                `Therefore, it will take ${preciseRound(answer, 2)} ${question.includes("days") ? "days" : "hours"} to complete the job.`;
        } else {
            answer = d * e * c / (a * b);
            
            explanation = `This is a combined proportion problem involving production rates.\n\n` +
                `For problems involving machines and production, we can use the formula:\n` +
                `units ÷ (machines × hours) = constant (production rate per machine-hour)\n\n` +
                `For the first scenario: ${c} ÷ (${a} × ${b}) = ${(c/(a*b)).toFixed(4)} units per machine-hour\n\n` +
                `For the second scenario: x ÷ (${d} × ${e}) = ${(c/(a*b)).toFixed(4)} units per machine-hour\n\n` +
                `Solving for x: x = ${(c/(a*b)).toFixed(4)} × ${d} × ${e} = ${preciseRound(answer, 2)}\n\n` +
                `Therefore, ${d} machines operating for ${e} hours can produce ${preciseRound(answer, 2)} units.`;
        }
        
        return {
            type: "proportion",
            question: question,
            options: generateOptions(answer),
            correct_answer: preciseRound(answer, 2),
            explanation: explanation
        };
    }
}

function generateOptions(correctAnswer) {
    const options = [correctAnswer];
    
    if (typeof correctAnswer === 'string' && correctAnswer.includes(':')) {
        const [a, b] = correctAnswer.split(':').map(Number);
        
        const wrongOptions = [];
        for (let i = 0; i < 6 && wrongOptions.length < 3; i++) {
            let newA, newB;
            
            if (Math.random() < 0.5) {
                newA = Math.max(1, a + randomInt(-2, 2));
                newB = b;
            } else {
                newA = a;
                newB = Math.max(1, b + randomInt(-2, 2));
            }
            
            if (newA !== a || newB !== b) {
                const newOption = `${newA}:${newB}`;
                if (!wrongOptions.includes(newOption) && newOption !== correctAnswer) {
                    wrongOptions.push(newOption);
                }
            }
        }
        
        options.push(...wrongOptions);
        
        while (options.length < 4) {
            const randomA = Math.max(1, a + randomInt(-3, 3));
            const randomB = Math.max(1, b + randomInt(-3, 3));
            const randomOption = `${randomA}:${randomB}`;
            
            if (!options.includes(randomOption)) {
                options.push(randomOption);
            }
        }
    } else {
        const value = parseFloat(correctAnswer);
        
        const variations = [];
        
        for (const factor of [0.85, 0.9, 0.95, 1.05, 1.1, 1.15]) {
            variations.push(value * factor);
        }
        
        for (const delta of [-1, -2, 1, 2]) {
            variations.push(value + delta);
        }
        
        if (value >= 10) {
            variations.push(value * 0.5, value * 2);
        }
        
        const wrongOptions = [];
        for (const variation of variations) {
            if (variation <= 0) continue;
            
            const rounded = preciseRound(variation, 2);
            if (Math.abs(rounded - value) > 0.01 && !wrongOptions.includes(rounded)) {
                wrongOptions.push(rounded);
                if (wrongOptions.length === 3) break;
            }
        }
        
        options.push(...wrongOptions);
        
        while (options.length < 4) {
            const randomVariation = value * (1 + Math.random() * 0.5 - 0.25);
            const roundedRandom = preciseRound(randomVariation, 2);
            
            if (roundedRandom > 0 && Math.abs(roundedRandom - value) > 0.01 && !options.includes(roundedRandom)) {
                options.push(roundedRandom);
            }
        }
    }
    
    return options.sort(() => Math.random() - 0.5);
}

function generateRatioOptions(correctAnswer) {
    const options = [correctAnswer];
    const [a, b] = correctAnswer.split(':').map(Number);
    
    const wrongOptions = [];
    
    wrongOptions.push(`${b}:${a}`);
    
    if (a > 1 && b > 1) {
        wrongOptions.push(`${a-1}:${b}`);
        wrongOptions.push(`${a}:${b-1}`);
    } else {
        wrongOptions.push(`${a+1}:${b}`);
        wrongOptions.push(`${a}:${b+1}`);
    }
    
    wrongOptions.push(`${a+1}:${b+1}`);
    wrongOptions.push(`${a-1}:${b+1}`);
    wrongOptions.push(`${a+1}:${b-1}`);
    
    const filteredOptions = wrongOptions.filter(opt => {
        const [x, y] = opt.split(':').map(Number);
        return x > 0 && y > 0 && opt !== correctAnswer;
    });
    
    options.push(...filteredOptions.slice(0, 3));
    
    while (options.length < 4) {
        const newA = Math.max(1, a + randomInt(-2, 2));
        const newB = Math.max(1, b + randomInt(-2, 2));
        const newOption = `${newA}:${newB}`;
        
        if (!options.includes(newOption) && newOption !== correctAnswer) {
            options.push(newOption);
        }
    }
    
    return options.slice(0, 4).sort(() => Math.random() - 0.5);
}

function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function preciseRound(num, decimals) {
    const factor = Math.pow(10, decimals);
    return Math.round((num + Number.EPSILON) * factor) / factor;
}

function gcd(a, b) {
    if (!b) return a;
    return gcd(b, a % b);
}