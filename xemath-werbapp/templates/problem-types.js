// Basic math problem types generators

function generatePercentageProblem() {
    const problemTypes = [
        "percentage_increase_decrease",
        "compound_percentage",
        "percentage_of_percentage",
        "reverse_percentage"
    ];
    
    const problemType = problemTypes[Math.floor(Math.random() * problemTypes.length)];
    let question, answer;
    
    if (problemType === "percentage_increase_decrease") {
        // Find the new value after percentage increase/decrease
        const original = randomInt(100, 1000);
        const percentage = randomInt(15, 75);
        const increase = Math.random() > 0.5;
        
        const operation = increase ? "increased" : "decreased";
        if (increase) {
            answer = original * (1 + percentage/100);
        } else {
            answer = original * (1 - percentage/100);
        }
        
        question = `If ${original} is ${operation} by ${percentage}%, what is the new value?`;
        answer = preciseRound(answer, 2);
    } 
    else if (problemType === "compound_percentage") {
        // Compound percentage changes
        const original = randomInt(100, 500);
        const percentage1 = randomInt(10, 30);
        const percentage2 = randomInt(10, 30);
        
        const operations = [Math.random() > 0.5 ? "increase" : "decrease", 
                           Math.random() > 0.5 ? "increase" : "decrease"];
        
        let interim;
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
        
        question = `A value of ${original} is first ${operations[0]}d by ${percentage1}% and then ${operations[1]}d by ${percentage2}%. What is the final value?`;
        answer = preciseRound(answer, 2);
    }
    else if (problemType === "percentage_of_percentage") {
        // Find percentage of a percentage
        const whole = randomInt(500, 2000);
        const percentage1 = randomInt(20, 75);
        const percentage2 = randomInt(15, 65);
        
        const part = whole * (percentage1/100);
        answer = part * (percentage2/100);
        
        question = `${percentage1}% of ${whole} is ${Math.round(part)}. What is ${percentage2}% of that?`;
        answer = preciseRound(answer, 2);
    }
    else {  // reverse_percentage
        // Find original value given the result after percentage change
        const final = randomInt(120, 1000);
        const percentage = randomInt(15, 75);
        const increase = Math.random() > 0.5;
        
        const operation = increase ? "increased" : "decreased";
        
        if (increase) {
            answer = final / (1 + percentage/100);
        } else {
            answer = final / (1 - percentage/100);
        }
        
        question = `A value was ${operation} by ${percentage}% to get ${final}. What was the original value?`;
        answer = preciseRound(answer, 2);
    }
    
    // Generate options
    const options = generateOptions(answer);
    
    return {
        type: "percentage",
        question: question,
        options: options,
        correct_answer: answer
    };
}

function generateRatioProblem() {
    const problemTypes = [
        "find_value_given_ratio",
        "ratio_distribution",
        "ratio_change",
        "equivalent_ratios"
    ];
    
    const problemType = problemTypes[Math.floor(Math.random() * problemTypes.length)];
    let question, answer;
    
    if (problemType === "find_value_given_ratio") {
        // Find a value given a ratio and another value
        let a = randomInt(2, 9);
        let b = randomInt(2, 9);
        
        // Make sure they don't have a common factor
        while (gcd(a, b) !== 1) {
            a = randomInt(2, 9);
            b = randomInt(2, 9);
        }
            
        // Decide which value to provide
        if (Math.random() > 0.5) {
            // Given value of first term
            const multiplier = randomInt(5, 20);
            const value_a = a * multiplier;
            answer = b * multiplier;
            
            question = `If the ratio of a:b is ${a}:${b} and a = ${value_a}, what is b?`;
        } else {
            // Given value of second term
            const multiplier = randomInt(5, 20);
            const value_b = b * multiplier;
            answer = a * multiplier;
            
            question = `If the ratio of a:b is ${a}:${b} and b = ${value_b}, what is a?`;
        }
    }
    else if (problemType === "ratio_distribution") {
        // Distribute a quantity according to a ratio
        const a = randomInt(2, 7);
        const b = randomInt(2, 7);
        const c = randomInt(2, 7);
        
        let total = randomInt(100, 500);
        // Make it divisible by the sum
        total = total - (total % (a + b + c));
        
        const part_value = total / (a + b + c);
        
        const position = randomInt(1, 3);
        if (position === 1) {
            answer = a * part_value;
            question = `A sum of ${total} is divided in the ratio ${a}:${b}:${c}. How much is the first share?`;
        } else if (position === 2) {
            answer = b * part_value;
            question = `A sum of ${total} is divided in the ratio ${a}:${b}:${c}. How much is the second share?`;
        } else {
            answer = c * part_value;
            question = `A sum of ${total} is divided in the ratio ${a}:${b}:${c}. How much is the third share?`;
        }
    }
    else if (problemType === "ratio_change") {
        // How a ratio changes when terms are modified
        const a = randomInt(3, 10);
        const b = randomInt(3, 10);
        
        const operations = [
            `If the ratio is ${a}:${b} and the first term is increased by ${randomInt(2, 5)}, what is the new ratio?`,
            `If the ratio is ${a}:${b} and the second term is decreased by ${randomInt(1, b-2)}, what is the new ratio?`,
            `If the ratio is ${a}:${b} and both terms are multiplied by ${randomInt(2, 4)}, what is the new ratio?`,
            `If the ratio is ${a}:${b} and ${randomInt(2, 5)} is added to both terms, what is the new ratio?`
        ];
        
        question = operations[Math.floor(Math.random() * operations.length)];
        
        // For this type, we'll return the answer as a string since it's a ratio
        if (question.includes("first term is increased")) {
            const increment = parseInt(question.split("increased by ")[1].split(",")[0]);
            const new_a = a + increment;
            answer = `${new_a}:${b}`;
        } else if (question.includes("second term is decreased")) {
            const decrement = parseInt(question.split("decreased by ")[1].split(",")[0]);
            const new_b = b - decrement;
            answer = `${a}:${new_b}`;
        } else if (question.includes("both terms are multiplied")) {
            const multiplier = parseInt(question.split("multiplied by ")[1].split(",")[0]);
            const new_a = a * multiplier;
            const new_b = b * multiplier;
            answer = `${new_a}:${new_b}`;
        } else {  // added to both
            const increment = parseInt(question.split("added to both")[0].split(" ").pop());
            const new_a = a + increment;
            const new_b = b + increment;
            answer = `${new_a}:${new_b}`;
        }
    }
    else {  // equivalent_ratios
        // Find equivalent ratios with missing terms
        const a = randomInt(2, 10);
        const b = randomInt(2, 10);
        
        const multiplier = randomInt(3, 10);
        const new_a = a * multiplier;
        const new_b = b * multiplier;
        
        if (Math.random() > 0.5) {
            question = `If ${a}:${b} = ${new_a}:x, what is x?`;
            answer = new_b;
        } else {
            question = `If ${a}:${b} = y:${new_b}, what is y?`;
            answer = new_a;
        }
    }
    
    // Generate options
    const options = generateOptions(answer);
    
    return {
        type: "ratio",
        question: question,
        options: options,
        correct_answer: answer
    };
}

function generateProportionProblem() {
    const problemTypes = [
        "direct_proportion",
        "inverse_proportion",
        "combined_proportion"
    ];
    
    const problemType = problemTypes[Math.floor(Math.random() * problemTypes.length)];
    let question, answer;
    
    if (problemType === "direct_proportion") {
        // Direct proportion problems
        const scenarios = [
            {
                template: "If {a} workers can complete a job in {b} days, how many days will it take {c} workers to complete the same job?",
                is_direct: false,
                formula: (a, b, c) => (a * b) / c
            },
            {
                template: "If {a} machines can produce {b} items in one hour, how many items can {c} machines produce in one hour?",
                is_direct: true,
                formula: (a, b, c) => (b * c) / a
            },
            {
                template: "A car travels {a} miles in {b} hours. At the same speed, how many miles will it travel in {c} hours?",
                is_direct: true,
                formula: (a, b, c) => (a * c) / b
            }
        ];
        
        const scenario = scenarios[Math.floor(Math.random() * scenarios.length)];
        
        let a, b, c;
        if (scenario.is_direct) {
            a = randomInt(2, 10);
            b = randomInt(15, 100);
            c = randomInt(a+1, 20);
        } else {
            a = randomInt(5, 20);
            b = randomInt(3, 15);
            c = randomInt(1, a-1);
        }
            
        question = scenario.template
            .replace("{a}", a)
            .replace("{b}", b)
            .replace("{c}", c);
            
        answer = scenario.formula(a, b, c);
    }
    else if (problemType === "inverse_proportion") {
        // Inverse proportion problems
        const a = randomInt(4, 12);
        const b = randomInt(8, 24);
        const c = randomInt(a+2, 24);
        
        const scenarios = [
            `If ${a} people can paint a house in ${b} hours, how many hours would it take ${c} people to paint the same house?`,
            `A tap flowing at a rate of ${a} liters per minute fills a tank in ${b} minutes. How long would it take if the flow rate was ${c} liters per minute?`,
            `If ${a} machines can complete a task in ${b} hours, how many hours would it take ${c} machines to complete the same task?`
        ];
        
        question = scenarios[Math.floor(Math.random() * scenarios.length)];
        answer = (a * b) / c;
    }
    else {  // combined_proportion
        // Combined direct and inverse proportion
        const a = randomInt(10, 30);
        const b = randomInt(3, 12);
        const c = randomInt(2, 8);
        const d = randomInt(15, 40);
        const e = randomInt(4, 15);
        
        question = `${a} workers, working ${b} hours a day, complete a job in ${c} days. How many days would it take ${d} workers, working ${e} hours a day, to complete the same job?`;
        
        // Formula: workers × hours × days = constant
        const original_work = a * b * c;
        const new_work_per_day = d * e;
        answer = original_work / new_work_per_day;
    }
    
    answer = preciseRound(answer, 2);
    
    // Generate options
    const options = generateOptions(answer);
    
    return {
        type: "proportion",
        question: question,
        options: options,
        correct_answer: answer
    };
}