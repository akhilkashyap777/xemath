// Profit and Loss problem types generator

function generateProfitLossProblem() {
    const problemTypes = [
        "basic_profit_loss",
        "profit_loss_percentage",
        "marked_price_discount",
        "cost_price_from_selling",
        "compound_profit_loss"
    ];
    
    const problemType = problemTypes[Math.floor(Math.random() * problemTypes.length)];
    let question, answer;
    
    if (problemType === "basic_profit_loss") {
        // Basic profit and loss calculations
        const costPrice = randomInt(100, 1000);
        const profitLoss = randomInt(-30, 50); // Negative values represent a loss
        
        let sellingPrice;
        if (profitLoss >= 0) {
            // Profit scenario
            sellingPrice = costPrice * (1 + profitLoss/100);
            question = `A merchant buys an item for $${costPrice} and sells it at a profit of ${profitLoss}%. What is the selling price?`;
        } else {
            // Loss scenario
            sellingPrice = costPrice * (1 + profitLoss/100);
            question = `A merchant buys an item for $${costPrice} and sells it at a loss of ${Math.abs(profitLoss)}%. What is the selling price?`;
        }
        
        answer = preciseRound(sellingPrice, 2);
    }
    else if (problemType === "profit_loss_percentage") {
        // Finding profit/loss percentage
        const costPrice = randomInt(100, 1000);
        let sellingPrice;
        
        if (Math.random() > 0.5) {
            // Profit scenario
            const profitPercent = randomInt(5, 50);
            sellingPrice = costPrice * (1 + profitPercent/100);
            question = `If the cost price is $${costPrice} and the selling price is $${preciseRound(sellingPrice, 2)}, what is the profit percentage?`;
            answer = profitPercent;
        } else {
            // Loss scenario
            const lossPercent = randomInt(5, 40);
            sellingPrice = costPrice * (1 - lossPercent/100);
            question = `If the cost price is $${costPrice} and the selling price is $${preciseRound(sellingPrice, 2)}, what is the loss percentage?`;
            answer = lossPercent;
        }
    }
    else if (problemType === "marked_price_discount") {
        // Marked price and discount problems
        const costPrice = randomInt(500, 2000);
        const profitPercent = randomInt(20, 80);
        const discountPercent = randomInt(10, 40);
        
        const markedPrice = costPrice * (1 + profitPercent/100);
        const sellingPrice = markedPrice * (1 - discountPercent/100);
        
        if (Math.random() > 0.5) {
            // Find actual profit/loss percentage
            const actualProfitLoss = ((sellingPrice - costPrice) / costPrice) * 100;
            
            question = `A shopkeeper marks up an item by ${profitPercent}% above the cost price of $${costPrice}, then offers a discount of ${discountPercent}% on the marked price. What is the actual profit or loss percentage?`;
            
            if (actualProfitLoss >= 0) {
                answer = preciseRound(actualProfitLoss, 2); // Profit
            } else {
                answer = preciseRound(Math.abs(actualProfitLoss), 2); // Loss
            }
        } else {
            // Find the selling price
            question = `An item costs $${costPrice}. It is marked up by ${profitPercent}% and then a discount of ${discountPercent}% is applied on the marked price. What is the final selling price?`;
            answer = preciseRound(sellingPrice, 2);
        }
    }
    else if (problemType === "cost_price_from_selling") {
        // Finding cost price from selling price and profit/loss percentage
        const sellingPrice = randomInt(100, 1000);
        let profitLoss = randomInt(-30, 50); // Negative values represent a loss
        
        let costPrice;
        if (profitLoss >= 0) {
            // Profit scenario
            costPrice = sellingPrice / (1 + profitLoss/100);
            question = `If an item is sold for $${sellingPrice} at a profit of ${profitLoss}%, what was the cost price?`;
        } else {
            // Loss scenario
            costPrice = sellingPrice / (1 - Math.abs(profitLoss)/100);
            question = `If an item is sold for $${sellingPrice} at a loss of ${Math.abs(profitLoss)}%, what was the cost price?`;
        }
        
        answer = preciseRound(costPrice, 2);
    }
    else {  // compound_profit_loss
        // Compound profit/loss scenarios (e.g., multiple transactions)
        const scenarios = [
            // Scenario 1: Two successive profit/loss transactions
            function() {
                const initialAmount = randomInt(1000, 5000);
                const firstChange = randomInt(-20, 30);
                const secondChange = randomInt(-20, 30);
                
                let afterFirst = initialAmount * (1 + firstChange/100);
                let final = afterFirst * (1 + secondChange/100);
                
                const firstType = firstChange >= 0 ? "profit" : "loss";
                const secondType = secondChange >= 0 ? "profit" : "loss";
                
                question = `A merchant starts with $${initialAmount}. In the first transaction, there's a ${Math.abs(firstChange)}% ${firstType}. In the second transaction, there's a ${Math.abs(secondChange)}% ${secondType}. What is the final amount?`;
                answer = preciseRound(final, 2);
                
                return { question, answer };
            },
            
            // Scenario 2: Find the overall profit/loss percentage
            function() {
                const initialAmount = randomInt(1000, 5000);
                const firstChange = randomInt(-20, 30);
                const secondChange = randomInt(-20, 30);
                
                let afterFirst = initialAmount * (1 + firstChange/100);
                let final = afterFirst * (1 + secondChange/100);
                
                const overallChange = ((final - initialAmount) / initialAmount) * 100;
                
                const firstType = firstChange >= 0 ? "profit" : "loss";
                const secondType = secondChange >= 0 ? "profit" : "loss";
                
                question = `A merchant faces a ${Math.abs(firstChange)}% ${firstType} followed by a ${Math.abs(secondChange)}% ${secondType}. What is the overall profit or loss percentage?`;
                
                if (overallChange >= 0) {
                    answer = preciseRound(overallChange, 2); // Overall profit
                } else {
                    answer = preciseRound(Math.abs(overallChange), 2); // Overall loss
                }
                
                return { question, answer };
            },
            
            // Scenario 3: Find the second transaction percentage
            function() {
                const initialAmount = randomInt(1000, 5000);
                const firstChange = randomInt(-20, 30);
                const overallChange = randomInt(-25, 35);
                
                let afterFirst = initialAmount * (1 + firstChange/100);
                let final = initialAmount * (1 + overallChange/100);
                
                // Calculate the second change percentage
                const secondChange = ((final / afterFirst) - 1) * 100;
                
                const firstType = firstChange >= 0 ? "profit" : "loss";
                const overallType = overallChange >= 0 ? "profit" : "loss";
                
                question = `A merchant starts with $${initialAmount} and experiences a ${Math.abs(firstChange)}% ${firstType} in the first transaction. If the overall result is a ${Math.abs(overallChange)}% ${overallType}, what percentage profit or loss occurred in the second transaction?`;
                
                if (secondChange >= 0) {
                    answer = preciseRound(secondChange, 2); // Second transaction was a profit
                } else {
                    answer = preciseRound(Math.abs(secondChange), 2); // Second transaction was a loss
                }
                
                return { question, answer };
            }
        ];
        
        // Choose a random scenario
        const scenario = scenarios[Math.floor(Math.random() * scenarios.length)];
        const result = scenario();
        
        question = result.question;
        answer = result.answer;
    }
    
    // Generate multiple choice options
    const options = generateProfitLossOptions(answer, problemType);
    
    return {
        type: "profit_loss",
        question: question,
        options: options,
        correct_answer: answer
    };
}

function generateProfitLossOptions(correctAnswer, problemType) {
    const options = [correctAnswer];
    const value = parseFloat(correctAnswer);
    
    // Generate wrong options based on problem type
    if (problemType === "profit_loss_percentage" || problemType === "marked_price_discount" || 
        (problemType === "compound_profit_loss" && value < 100)) {
        // For percentage values, create common mistakes
        
        // Option 1: Reversed sign (if applicable)
        if (value > 0 && !options.includes(-value)) {
            options.push(preciseRound(-value, 2));
        }
        
        // Option 2: Calculation errors
        const variations = [
            value * 0.8, 
            value * 1.2,
            value + 5,
            value - 5,
            100 - value, // Common mistake: 100% - profit% = loss% (incorrect)
            value / 2,
            value * 2
        ];
        
        for (const var_value of variations) {
            if (var_value > 0 && Math.abs(var_value - value) > 0.01 && !options.includes(preciseRound(var_value, 2))) {
                options.push(preciseRound(var_value, 2));
                if (options.length >= 4) break;
            }
        }
    } else {
        // For monetary values, create common calculation errors
        
        // Option 1: Using the wrong formula
        if (problemType === "basic_profit_loss" || problemType === "cost_price_from_selling") {
            // Adding/subtracting percentage instead of multiplying
            const variations = [
                value * 0.9,
                value * 1.1,
                value * 0.85,
                value * 1.15,
                value * 0.75,
                value * 1.25
            ];
            
            for (const var_value of variations) {
                if (var_value > 0 && Math.abs(var_value - value) > 0.01 && !options.includes(preciseRound(var_value, 2))) {
                    options.push(preciseRound(var_value, 2));
                    if (options.length >= 4) break;
                }
            }
        } else {
            // For general monetary values, create realistic variations
            const variations = [
                value * 0.9,
                value * 1.1,
                value + 50,
                value - 50,
                value * 1.5,
                value * 0.75
            ];
            
            for (const var_value of variations) {
                if (var_value > 0 && Math.abs(var_value - value) > 0.01 && !options.includes(preciseRound(var_value, 2))) {
                    options.push(preciseRound(var_value, 2));
                    if (options.length >= 4) break;
                }
            }
        }
    }
    
    // Ensure we have exactly 4 options
    while (options.length < 4) {
        let newOption;
        
        if (value < 100) {
            // For percentage values
            newOption = randomInt(Math.max(1, Math.floor(value * 0.5)), Math.ceil(value * 1.5) + 5);
        } else {
            // For monetary values
            newOption = value + randomInt(-Math.ceil(value * 0.2), Math.ceil(value * 0.2));
        }
        
        newOption = preciseRound(newOption, 2);
        
        if (newOption > 0 && Math.abs(newOption - value) > 0.01 && !options.includes(newOption)) {
            options.push(newOption);
        }
    }
    
    // Take only the first 4 options and shuffle
    return options.slice(0, 4).sort(() => Math.random() - 0.5);
}