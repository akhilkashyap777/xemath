function generateAdvancedProbabilityProblem() {
    const problemTypes = [
        "conditional_probability",
        "bayes_theorem",
        "expected_value",
        "binomial_probability",
        "probability_with_replacement",
        "probability_without_replacement"
    ];
    
    const problemType = problemTypes[Math.floor(Math.random() * problemTypes.length)];
    let question, answer, explanation;
    
    if (problemType === "conditional_probability") {
        const row1_col1 = randomInt(10, 30);
        const row1_col2 = randomInt(10, 30);
        const row2_col1 = randomInt(10, 30);
        const row2_col2 = randomInt(10, 30);
        
        const total = row1_col1 + row1_col2 + row2_col1 + row2_col2;
        
        // Generate dynamic context rather than using hardcoded ones
        const context = generateConditionalProbabilityContext();
        
        // Randomly choose which conditional probability to ask
        if (Math.random() > 0.5) {
            // P(A|B)
            const condition = `${context.row1}`;
            const event = `${context.col1}`;
            
            question = `In a survey of ${total} people, ${row1_col1 + row1_col2} people ${context.row1} and ${row1_col1 + row2_col1} people ${context.col1}. Of the people who ${context.row1}, ${row1_col1} also ${context.col1}. What is the probability that a randomly selected person ${event} given that they ${condition}?`;
            
            answer = row1_col1 / (row1_col1 + row1_col2);
            
            // Create explanation
            explanation = `This is a conditional probability problem, where we need to find P(${event} | ${condition}).\n\n` +
                `Let's organize the data in a 2×2 table:\n\n` +
                `| | ${context.col1} | ${context.col2} | Total |\n` +
                `| ${context.row1} | ${row1_col1} | ${row1_col2} | ${row1_col1 + row1_col2} |\n` +
                `| ${context.row2} | ${row2_col1} | ${row2_col2} | ${row2_col1 + row2_col2} |\n` +
                `| Total | ${row1_col1 + row2_col1} | ${row1_col2 + row2_col2} | ${total} |\n\n` +
                `The conditional probability formula is:\n` +
                `P(A|B) = P(A and B) / P(B)\n\n` +
                `In our case:\n` +
                `P(${event} | ${condition}) = P(${event} and ${condition}) / P(${condition})\n\n` +
                `P(${event} and ${condition}) = ${row1_col1} / ${total} = ${(row1_col1 / total).toFixed(4)}\n` +
                `P(${condition}) = ${row1_col1 + row1_col2} / ${total} = ${((row1_col1 + row1_col2) / total).toFixed(4)}\n\n` +
                `P(${event} | ${condition}) = ${(row1_col1 / total).toFixed(4)} / ${((row1_col1 + row1_col2) / total).toFixed(4)} = ${row1_col1} / ${row1_col1 + row1_col2} = ${answer}\n\n` +
                `Therefore, the probability that a randomly selected person ${event} given that they ${condition} is ${answer} or ${Math.round(answer * 100)}%.`;
        } else {
            // P(B|A)
            const condition = `${context.col1}`;
            const event = `${context.row1}`;
            
            question = `In a survey of ${total} people, ${row1_col1 + row1_col2} people ${context.row1} and ${row1_col1 + row2_col1} people ${context.col1}. Of the people who ${context.col1}, ${row1_col1} also ${context.row1}. What is the probability that a randomly selected person ${event} given that they ${condition}?`;
            
            answer = row1_col1 / (row1_col1 + row2_col1);
            
            // Create explanation
            explanation = `This is a conditional probability problem, where we need to find P(${event} | ${condition}).\n\n` +
                `Let's organize the data in a 2×2 table:\n\n` +
                `| | ${context.col1} | ${context.col2} | Total |\n` +
                `| ${context.row1} | ${row1_col1} | ${row1_col2} | ${row1_col1 + row1_col2} |\n` +
                `| ${context.row2} | ${row2_col1} | ${row2_col2} | ${row2_col1 + row2_col2} |\n` +
                `| Total | ${row1_col1 + row2_col1} | ${row1_col2 + row2_col2} | ${total} |\n\n` +
                `The conditional probability formula is:\n` +
                `P(A|B) = P(A and B) / P(B)\n\n` +
                `In our case:\n` +
                `P(${event} | ${condition}) = P(${event} and ${condition}) / P(${condition})\n\n` +
                `P(${event} and ${condition}) = ${row1_col1} / ${total} = ${(row1_col1 / total).toFixed(4)}\n` +
                `P(${condition}) = ${row1_col1 + row2_col1} / ${total} = ${((row1_col1 + row2_col1) / total).toFixed(4)}\n\n` +
                `P(${event} | ${condition}) = ${(row1_col1 / total).toFixed(4)} / ${((row1_col1 + row2_col1) / total).toFixed(4)} = ${row1_col1} / ${row1_col1 + row2_col1} = ${answer}\n\n` +
                `Therefore, the probability that a randomly selected person ${event} given that they ${condition} is ${answer} or ${Math.round(answer * 100)}%.`;
        }
        
        answer = preciseRound(answer, 3);
    }
    else if (problemType === "bayes_theorem") {
        // Bayes' theorem problems - generate dynamic contexts
        const context = generateBayesContext();
        
        // Calculating P(condition|positive test) using Bayes' theorem
        const pCondition = context.rate;
        const pPositiveGivenCondition = context.sensitivity;
        const pPositiveGivenNoCondition = 1 - context.specificity;
        
        const pPositive = pCondition * pPositiveGivenCondition + (1 - pCondition) * pPositiveGivenNoCondition;
        const pConditionGivenPositive = (pCondition * pPositiveGivenCondition) / pPositive;
        
        question = `A ${context.test} for ${context.condition} has a sensitivity of ${Math.round(context.sensitivity * 100)}% (meaning it correctly identifies ${Math.round(context.sensitivity * 100)}% of people with the ${context.condition}) and a specificity of ${Math.round(context.specificity * 100)}% (meaning it correctly identifies ${Math.round(context.specificity * 100)}% of people without the ${context.condition}). If ${Math.round(context.rate * 100)}% of the population has this ${context.condition}, what is the probability that a person who tests positive actually has the ${context.condition}?`;
        
        answer = preciseRound(pConditionGivenPositive, 3);
        
        // Create explanation
        explanation = `This is a Bayes' theorem problem, which allows us to update probabilities when given new evidence.\n\n` +
            `Let's define our variables:\n` +
            `• P(${context.condition}) = ${pCondition.toFixed(4)} = ${(pCondition * 100).toFixed(2)}% (prior probability, or base rate)\n` +
            `• P(positive test | ${context.condition}) = ${pPositiveGivenCondition} = ${(pPositiveGivenCondition * 100)}% (sensitivity)\n` +
            `• P(positive test | no ${context.condition}) = ${pPositiveGivenNoCondition.toFixed(4)} = ${(pPositiveGivenNoCondition * 100).toFixed(2)}% (false positive rate = 1 - specificity)\n\n` +
            `Bayes' theorem formula:\n` +
            `P(${context.condition} | positive test) = [P(positive test | ${context.condition}) × P(${context.condition})] ÷ P(positive test)\n\n` +
            `We need to calculate P(positive test) using the law of total probability:\n` +
            `P(positive test) = P(positive test | ${context.condition}) × P(${context.condition}) + P(positive test | no ${context.condition}) × P(no ${context.condition})\n` +
            `P(positive test) = ${pPositiveGivenCondition} × ${pCondition.toFixed(4)} + ${pPositiveGivenNoCondition.toFixed(4)} × ${(1 - pCondition).toFixed(4)}\n` +
            `P(positive test) = ${(pPositiveGivenCondition * pCondition).toFixed(6)} + ${(pPositiveGivenNoCondition * (1 - pCondition)).toFixed(6)}\n` +
            `P(positive test) = ${pPositive.toFixed(6)}\n\n` +
            `Now, applying Bayes' theorem:\n` +
            `P(${context.condition} | positive test) = (${pPositiveGivenCondition} × ${pCondition.toFixed(4)}) ÷ ${pPositive.toFixed(6)}\n` +
            `P(${context.condition} | positive test) = ${(pPositiveGivenCondition * pCondition).toFixed(6)} ÷ ${pPositive.toFixed(6)}\n` +
            `P(${context.condition} | positive test) = ${answer}\n\n` +
            `Therefore, the probability that a person who tests positive actually has the ${context.condition} is ${answer} or ${Math.round(answer * 100)}%.\n\n` +
            `Note: This demonstrates why caution is needed when interpreting positive test results for rare conditions, as the probability of actually having the condition may be much lower than expected, even with highly sensitive and specific tests.`;
    }
    else if (problemType === "expected_value") {
        // Expected value problems
        const problemSubtypes = [
            "discrete_random_variable",
            "game_of_chance",
            "investment_decision"
        ];
        
        const subtype = problemSubtypes[Math.floor(Math.random() * problemSubtypes.length)];
        
        if (subtype === "discrete_random_variable") {
            // Creating a discrete random variable with 3-5 outcomes
            const numOutcomes = randomInt(3, 5);
            const outcomes = generateRandomVariableOutcomes(numOutcomes);
            
            // Calculate expected value
            let expectedValue = 0;
            let questionText = "A random variable X has the following probability distribution:\n";
            
            for (const outcome of outcomes) {
                questionText += `P(X = ${outcome.value}) = ${outcome.prob}\n`;
                expectedValue += outcome.value * outcome.prob;
            }
            
            questionText += "What is the expected value of X?";
            question = questionText;
            answer = preciseRound(expectedValue, 2);
            
            // Create explanation
            explanation = `Expected value is the weighted average of all possible values, where each value is weighted by its probability.\n\n` +
                `The formula for expected value is: E(X) = Σ[x₁ × P(x₁) + x₂ × P(x₂) + ... + xₙ × P(xₙ)]\n\n` +
                `For this random variable X with the given probability distribution:\n`;
                
            for (const outcome of outcomes) {
                explanation += `P(X = ${outcome.value}) = ${outcome.prob}\n`;
            }
            
            explanation += `\nCalculating the expected value:\n`;
            
            for (let i = 0; i < outcomes.length; i++) {
                const term = outcomes[i].value * outcomes[i].prob;
                explanation += `${outcomes[i].value} × ${outcomes[i].prob} = ${term.toFixed(2)}`;
                
                if (i < outcomes.length - 1) {
                    explanation += ` + `;
                }
            }
            
            explanation += ` = ${answer}\n\n` +
                `Therefore, the expected value of X is ${answer}.`;
        }
        else if (subtype === "game_of_chance") {
            // Game of chance with cost to play and potential winnings
            const costToPlay = randomInt(1, 10);
            const gameScenario = generateGameOfChanceScenario(costToPlay);
            const outcomes = gameScenario.outcomes;
            
            // Calculate expected value
            let expectedWinning = 0;
            let questionText = `A game costs $${costToPlay} to play. Here are the possible winning amounts and their probabilities:\n`;
            
            for (const outcome of outcomes) {
                if (outcome.win > 0) {
                    questionText += `Win $${outcome.win} with probability ${outcome.prob}\n`;
                } else {
                    questionText += `No winnings with probability ${outcome.prob}\n`;
                }
                expectedWinning += outcome.win * outcome.prob;
            }
            
            // Expected value is winnings minus cost
            const expectedValue = expectedWinning - costToPlay;
            
            questionText += `What is the expected value of this game (winnings minus cost)?`;
            question = questionText;
            answer = preciseRound(expectedValue, 2);
            
            // Create explanation
            explanation = `The expected value of a game of chance is the average amount you can expect to win in the long run.\n\n` +
                `To calculate it, we need to:\n` +
                `1. Find the expected winnings by calculating the weighted average of all possible win amounts\n` +
                `2. Subtract the cost to play\n\n` +
                `Expected winnings = Σ(win amount × probability)\n`;
                
            for (const outcome of outcomes) {
                if (outcome.win > 0) {
                    explanation += `$${outcome.win} × ${outcome.prob} = $${(outcome.win * outcome.prob).toFixed(2)}\n`;
                } else {
                    explanation += `$0 × ${outcome.prob} = $0\n`;
                }
            }
            
            explanation += `\nTotal expected winnings = `;
            
            for (let i = 0; i < outcomes.length; i++) {
                const term = outcomes[i].win * outcomes[i].prob;
                explanation += `$${term.toFixed(2)}`;
                
                if (i < outcomes.length - 1) {
                    explanation += ` + `;
                }
            }
            
            explanation += ` = $${expectedWinning.toFixed(2)}\n\n` +
                `Expected value = Expected winnings - Cost to play\n` +
                `Expected value = $${expectedWinning.toFixed(2)} - $${costToPlay} = $${answer}\n\n` +
                `${answer > 0 ? 
                  'Since the expected value is positive, this game is favorable to the player in the long run.' : 
                  answer < 0 ? 
                  'Since the expected value is negative, this game is unfavorable to the player in the long run.' :
                  'Since the expected value is zero, this game is fair (neither favorable nor unfavorable) in the long run.'}`;
        }
        else { // investment_decision
            // Investment decision with different potential returns
            const investmentAmount = randomInt(1000, 10000);
            const investmentScenario = generateInvestmentScenario(investmentAmount);
            const scenarios = investmentScenario.scenarios;
            
            // Calculate expected value
            let expectedReturn = 0;
            let questionText = `An investment of $${investmentAmount} has the following possible returns and their probabilities:\n`;
            
            for (const scenario of scenarios) {
                const returnAmount = investmentAmount * scenario.returnRate;
                const returnAmountStr = scenario.returnRate >= 0 
                    ? `gain of $${Math.round(returnAmount)}`
                    : `loss of $${Math.round(Math.abs(returnAmount))}`;
                
                questionText += `A ${returnAmountStr} with probability ${scenario.prob}\n`;
                expectedReturn += returnAmount * scenario.prob;
            }
            
            questionText += `What is the expected value of this investment (the expected gain or loss)?`;
            question = questionText;
            answer = preciseRound(expectedReturn, 2);
            
            // Create explanation
            explanation = `The expected value of an investment is the average return you can expect in the long run.\n\n` +
                `To calculate it, we compute the weighted average of all possible returns, where each return is weighted by its probability.\n\n` +
                `For this $${investmentAmount} investment with the given return scenarios:\n`;
                
            for (const scenario of scenarios) {
                const returnAmount = investmentAmount * scenario.returnRate;
                const returnAmountStr = returnAmount >= 0 
                    ? `gain of $${Math.round(returnAmount)}`
                    : `loss of $${Math.round(Math.abs(returnAmount))}`;
                
                explanation += `${returnAmountStr} with probability ${scenario.prob}\n`;
            }
            
            explanation += `\nCalculating the expected value:\n`;
            
            for (let i = 0; i < scenarios.length; i++) {
                const returnAmount = investmentAmount * scenarios[i].returnRate;
                const term = returnAmount * scenarios[i].prob;
                
                explanation += `$${returnAmount.toFixed(2)} × ${scenarios[i].prob} = $${term.toFixed(2)}`;
                
                if (i < scenarios.length - 1) {
                    explanation += ` + `;
                }
            }
            
            explanation += ` = $${answer}\n\n` +
                `Therefore, the expected value of this investment is ${answer > 0 ? 'a gain' : 'a loss'} of $${Math.abs(answer).toFixed(2)}.\n\n` +
                `${answer > 0 ? 
                  'Since the expected value is positive, this investment is favorable in the long run.' : 
                  answer < 0 ? 
                  'Since the expected value is negative, this investment is unfavorable in the long run.' :
                  'Since the expected value is zero, this investment is neutral in the long run.'}`;
        }
    }
    else if (problemType === "binomial_probability") {
        // Binomial probability problems (n trials, k successes)
        const context = generateBinomialContext();
        const numTrials = randomInt(5, 15);
        const numSuccess = randomInt(1, numTrials);
        
        // Create question types
        const questionTypes = [
            { template: "exactly ${k}", formula: exactlyK },
            { template: "at least ${k}", formula: atLeastK },
            { template: "at most ${k}", formula: atMostK }
        ];
        
        const selectedType = questionTypes[Math.floor(Math.random() * questionTypes.length)];
        
        question = `If you ${context.action} ${numTrials} times, what is the probability of getting ${selectedType.template.replace('${k}', numSuccess)} ${context.outcome}?`;
        
        answer = selectedType.formula(numTrials, numSuccess, context.probability);
        answer = preciseRound(answer, 3);
        
        // Create explanation
        explanation = `This is a binomial probability problem where we have ${numTrials} independent trials, each with a probability of ${context.probability} of getting ${context.outcome}.\n\n`;
        
        if (selectedType.template.includes("exactly")) {
            explanation += `To find the probability of exactly ${numSuccess} successes in ${numTrials} trials, we use the binomial probability formula:\n\n` +
                `P(X = k) = C(n,k) × p^k × (1-p)^(n-k)\n\n` +
                `where:\n` +
                `• n = number of trials = ${numTrials}\n` +
                `• k = number of successes = ${numSuccess}\n` +
                `• p = probability of success in a single trial = ${context.probability}\n` +
                `• C(n,k) = binomial coefficient, the number of ways to choose k items from n items\n\n` +
                `First, we calculate the binomial coefficient C(${numTrials},${numSuccess}):\n` +
                `C(${numTrials},${numSuccess}) = ${numTrials}! / (${numSuccess}! × (${numTrials}-${numSuccess})!)\n`;
                
            // Calculate binomial coefficient for explanation
            const binomCoeff = binomialCoefficient(numTrials, numSuccess);
            explanation += `C(${numTrials},${numSuccess}) = ${binomCoeff}\n\n` +
                `Now we can calculate the probability:\n` +
                `P(X = ${numSuccess}) = ${binomCoeff} × (${context.probability})^${numSuccess} × (1-${context.probability})^(${numTrials}-${numSuccess})\n` +
                `P(X = ${numSuccess}) = ${binomCoeff} × ${Math.pow(context.probability, numSuccess).toFixed(6)} × ${Math.pow(1-context.probability, numTrials-numSuccess).toFixed(6)}\n` +
                `P(X = ${numSuccess}) = ${answer}\n\n` +
                `Therefore, the probability of getting exactly ${numSuccess} ${context.outcome} in ${numTrials} trials is ${answer}.`;
        } 
        else if (selectedType.template.includes("at least")) {
            explanation += `To find the probability of at least ${numSuccess} successes in ${numTrials} trials, we can:\n\n` +
                `1. Calculate the probability of each possible number of successes from ${numSuccess} to ${numTrials} and sum them, or\n` +
                `2. Calculate 1 minus the probability of having fewer than ${numSuccess} successes\n\n` +
                `Let's use the first approach. For each possible number of successes k (from ${numSuccess} to ${numTrials}), we use the binomial probability formula:\n\n` +
                `P(X = k) = C(n,k) × p^k × (1-p)^(n-k)\n\n` +
                `where C(n,k) is the binomial coefficient, p = ${context.probability} is the probability of success in each trial.\n\n` +
                `Then we sum these probabilities: P(X ≥ ${numSuccess}) = P(X = ${numSuccess}) + P(X = ${numSuccess+1}) + ... + P(X = ${numTrials})\n\n`;
                
            let sumExplanation = "";
            let sumValue = 0;
            
            for (let k = numSuccess; k <= numTrials; k++) {
                const probability = exactlyK(numTrials, k, context.probability);
                sumValue += probability;
                sumExplanation += `P(X = ${k}) = ${probability.toFixed(6)}${k < numTrials ? " + " : ""}`;
            }
            
            explanation += `${sumExplanation}\n` +
                `P(X ≥ ${numSuccess}) = ${answer}\n\n` +
                `Therefore, the probability of getting at least ${numSuccess} ${context.outcome} in ${numTrials} trials is ${answer}.`;
        }
        else { // at most
            explanation += `To find the probability of at most ${numSuccess} successes in ${numTrials} trials, we calculate the probability of each possible number of successes from 0 to ${numSuccess} and sum them.\n\n` +
                `For each possible number of successes k (from 0 to ${numSuccess}), we use the binomial probability formula:\n\n` +
                `P(X = k) = C(n,k) × p^k × (1-p)^(n-k)\n\n` +
                `where C(n,k) is the binomial coefficient, p = ${context.probability} is the probability of success in each trial.\n\n` +
                `Then we sum these probabilities: P(X ≤ ${numSuccess}) = P(X = 0) + P(X = 1) + ... + P(X = ${numSuccess})\n\n`;
                
            let sumExplanation = "";
            let sumValue = 0;
            
            for (let k = 0; k <= numSuccess; k++) {
                const probability = exactlyK(numTrials, k, context.probability);
                sumValue += probability;
                sumExplanation += `P(X = ${k}) = ${probability.toFixed(6)}${k < numSuccess ? " + " : ""}`;
            }
            
            explanation += `${sumExplanation}\n` +
                `P(X ≤ ${numSuccess}) = ${answer}\n\n` +
                `Therefore, the probability of getting at most ${numSuccess} ${context.outcome} in ${numTrials} trials is ${answer}.`;
        }
        
        // Helper functions for binomial probability
        function binomialCoefficient(n, k) {
            let coefficient = 1;
            for (let i = 1; i <= k; i++) {
                coefficient *= (n - (i - 1)) / i;
            }
            return coefficient;
        }
        
        function exactlyK(n, k, p) {
            return binomialCoefficient(n, k) * Math.pow(p, k) * Math.pow(1 - p, n - k);
        }
        
        function atLeastK(n, k, p) {
            let probability = 0;
            for (let i = k; i <= n; i++) {
                probability += exactlyK(n, i, p);
            }
            return probability;
        }
        
        function atMostK(n, k, p) {
            let probability = 0;
            for (let i = 0; i <= k; i++) {
                probability += exactlyK(n, i, p);
            }
            return probability;
        }
    }
    else if (problemType === "probability_with_replacement") {
        // Probability with replacement problems - generate dynamic item sets
        const itemSet = generateItemSet();
        const numDraws = randomInt(2, 4);
        
        // Randomly select target items for each draw
        const targetItems = [];
        for (let i = 0; i < numDraws; i++) {
            targetItems.push(itemSet.items[Math.floor(Math.random() * itemSet.items.length)]);
        }
        
        // Calculate probability
        let probability = 1;
        for (const item of targetItems) {
            probability *= item.count / itemSet.total;
        }
        
        // Create the question text
        let questionText = `You have ${itemSet.description}. If you draw an item, record it, and put it back `;
        
        if (numDraws > 2) {
            questionText += `${numDraws-1} times (for a total of ${numDraws} draws), what is the probability `;
        } else {
            questionText += `once (for a total of ${numDraws} draws), what is the probability `;
        }
        
        questionText += `of drawing `;
        
        for (let i = 0; i < targetItems.length; i++) {
            if (i === targetItems.length - 1) {
                questionText += `a ${targetItems[i].name}?`;
            } else if (i === targetItems.length - 2) {
                questionText += `a ${targetItems[i].name} and then `;
            } else {
                questionText += `a ${targetItems[i].name}, then `;
            }
        }
        
        question = questionText;
        answer = preciseRound(probability, 3);
        
        // Create explanation
        explanation = `This is a probability problem with replacement, which means the composition of the items doesn't change after each draw.\n\n` +
            `When we sample with replacement, each draw is independent, so we multiply the individual probabilities.\n\n` +
            `For this problem:\n`;
            
        // List the items in the set
        for (const item of itemSet.items) {
            explanation += `• Number of ${item.name}s: ${item.count}\n`;
        }
        explanation += `• Total number of items: ${itemSet.total}\n\n`;
        
        // Calculate probability for each draw
        for (let i = 0; i < targetItems.length; i++) {
            const drawProb = targetItems[i].count / itemSet.total;
            explanation += `Probability of drawing a ${targetItems[i].name} on draw ${i+1}: ${targetItems[i].count} ÷ ${itemSet.total} = ${drawProb.toFixed(4)}\n`;
        }
        
        // Overall probability calculation
        explanation += `\nSince the draws are independent (with replacement), we multiply the probabilities:\n`;
        
        let calcString = "";
        for (let i = 0; i < targetItems.length; i++) {
            calcString += `(${targetItems[i].count} ÷ ${itemSet.total})`;
            if (i < targetItems.length - 1) {
                calcString += ` × `;
            }
        }
        
        explanation += `${calcString} = ${answer}\n\n` +
            `Therefore, the probability of drawing ${targetItems.map(item => `a ${item.name}`).join(', then ')} is ${answer}.`;
    }
    else {  // probability_without_replacement
        // Probability without replacement problems - generate dynamic item sets
        const itemSet = generateItemSet();
        const numDraws = randomInt(2, Math.min(4, itemSet.total - 1));
        
        // Randomly select target items for each draw
        const targetItems = [];
        const availableItems = JSON.parse(JSON.stringify(itemSet.items)); // Deep copy
        let remainingTotal = itemSet.total;
        
        for (let i = 0; i < numDraws; i++) {
            // Filter to only items with counts > 0
            const validItems = availableItems.filter(item => item.count > 0);
            const selectedItemIndex = Math.floor(Math.random() * validItems.length);
            const selectedItem = validItems[selectedItemIndex];
            
            targetItems.push({...selectedItem});
            
            // Reduce the count of the selected item
            const originalItemIndex = availableItems.findIndex(item => item.name === selectedItem.name);
            availableItems[originalItemIndex].count--;
            remainingTotal--;
        }
        
        // Calculate probability
        let probability = 1;
        let originalItems = JSON.parse(JSON.stringify(itemSet.items)); // Deep copy
        let currentTotal = itemSet.total;
        
        for (let i = 0; i < targetItems.length; i++) {
            // Find the original item details
            const originalItem = originalItems.find(item => item.name === targetItems[i].name);
            
            probability *= originalItem.count / currentTotal;
            
            // Update counts for the next draw
            originalItem.count--;
            currentTotal--;
        }
        
        // Create the question text
        let questionText = `You have ${itemSet.description}. If you draw an item, do not put it back, `;
        
        if (numDraws > 2) {
            questionText += `and then draw ${numDraws-1} more times (for a total of ${numDraws} draws), what is the probability `;
        } else {
            questionText += `and then draw once more (for a total of ${numDraws} draws), what is the probability `;
        }
        
        questionText += `of drawing `;
        
        for (let i = 0; i < targetItems.length; i++) {
            if (i === targetItems.length - 1) {
                questionText += `a ${targetItems[i].name}?`;
            } else if (i === targetItems.length - 2) {
                questionText += `a ${targetItems[i].name} and then `;
            } else {
                questionText += `a ${targetItems[i].name}, then `;
            }
        }
        
        question = questionText;
        answer = preciseRound(probability, 3);
        
        // Create explanation
        explanation = `This is a probability problem without replacement, which means the composition of the items changes after each draw.\n\n` +
            `When we sample without replacement, the draws are dependent, so we need to update the probabilities for each subsequent draw.\n\n` +
            `For this problem:\n`;
            
        // Reset for explanation
        originalItems = JSON.parse(JSON.stringify(itemSet.items)); // Deep copy
        currentTotal = itemSet.total;
        
        // List the items in the set
        for (const item of originalItems) {
            explanation += `• Number of ${item.name}s: ${item.count}\n`;
        }
        explanation += `• Total number of items: ${currentTotal}\n\n`;
        
        // Calculate probability for each draw
        for (let i = 0; i < targetItems.length; i++) {
            const targetItem = targetItems[i];
            const originalItem = originalItems.find(item => item.name === targetItem.name);
            const drawProb = originalItem.count / currentTotal;
            
            explanation += `Draw ${i+1}:\n` +
                `• ${originalItem.count} ${targetItem.name}s remaining out of ${currentTotal} total items\n` +
                `• Probability of drawing a ${targetItem.name}: ${originalItem.count} ÷ ${currentTotal} = ${drawProb.toFixed(4)}\n`;
            
            // Update counts for next draw
            originalItem.count--;
            currentTotal--;
            
            if (i < targetItems.length - 1) {
                explanation += `• After this draw, we have ${originalItem.count} ${targetItem.name}s remaining out of ${currentTotal} total items\n\n`;
            }
        }
        
        // Overall probability calculation
        explanation += `\nTo find the overall probability, we multiply the individual probabilities for each draw:\n`;
        
        // Reset for final calculation
        originalItems = JSON.parse(JSON.stringify(itemSet.items)); // Deep copy
        currentTotal = itemSet.total;
        
        let calcString = "";
        for (let i = 0; i < targetItems.length; i++) {
            const targetItem = targetItems[i];
            const originalItem = originalItems.find(item => item.name === targetItem.name);
            
            calcString += `(${originalItem.count} ÷ ${currentTotal})`;
            
            // Update counts for next term
            originalItem.count--;
            currentTotal--;
            
            if (i < targetItems.length - 1) {
                calcString += ` × `;
            }
        }
        
        explanation += `${calcString} = ${answer}\n\n` +
            `Therefore, the probability of drawing ${targetItems.map(item => `a ${item.name}`).join(', then ')} without replacement is ${answer}.`;
    }
    
    const options = generateProbabilityOptions(answer);
    
    return {
        type: "probability",
        question: question,
        options: options,
        correct_answer: answer,
        explanation: explanation
    };
}

// Helper function to generate a random contextual scenario for conditional probability
function generateConditionalProbabilityContext() {
    const rowCategories = [
        { positive: "exercises regularly", negative: "doesn't exercise regularly" },
        { positive: "plays sports", negative: "doesn't play sports" },
        { positive: "owns a car", negative: "doesn't own a car" },
        { positive: "likes coffee", negative: "doesn't like coffee" },
        { positive: "is female", negative: "is male" },
        { positive: "voted in the last election", negative: "didn't vote in the last election" },
        { positive: "is a student", negative: "is not a student" },
        { positive: "uses social media daily", negative: "doesn't use social media daily" },
        { positive: "lives in an apartment", negative: "doesn't live in an apartment" },
        { positive: "has pets", negative: "doesn't have pets" }
    ];
    
    const columnCategories = [
        { positive: "eats a balanced diet", negative: "doesn't eat a balanced diet" },
        { positive: "gets A grades", negative: "doesn't get A grades" },
        { positive: "lives in the city", negative: "lives in suburbs" },
        { positive: "works full-time", negative: "works part-time" },
        { positive: "has a college degree", negative: "doesn't have a college degree" },
        { positive: "is over 30 years old", negative: "is under 30 years old" },
        { positive: "reads books regularly", negative: "doesn't read books regularly" },
        { positive: "watches TV daily", negative: "doesn't watch TV daily" },
        { positive: "saves money monthly", negative: "doesn't save money monthly" },
        { positive: "travels internationally", negative: "doesn't travel internationally" }
    ];
    
    // Select a random row and column category
    const rowCategory = rowCategories[Math.floor(Math.random() * rowCategories.length)];
    const columnCategory = columnCategories[Math.floor(Math.random() * columnCategories.length)];
    
    return {
        row1: rowCategory.positive,
        row2: rowCategory.negative,
        col1: columnCategory.positive,
        col2: columnCategory.negative
    };
}

// Helper function to generate a random Bayes' theorem context
function generateBayesContext() {
    const contexts = [
        {
            test: "medical test",
            condition: "disease",
            min_rate: 1,
            max_rate: 5,
            min_sensitivity: 85,
            max_sensitivity: 99,
            min_specificity: 90,
            max_specificity: 99
        },
        {
            test: "quality control test",
            condition: "defect",
            min_rate: 2,
            max_rate: 8,
            min_sensitivity: 80,
            max_sensitivity: 98,
            min_specificity: 85,
            max_specificity: 98
        },
        {
            test: "drug test",
            condition: "drug use",
            min_rate: 5,
            max_rate: 15,
            min_sensitivity: 80,
            max_sensitivity: 95,
            min_specificity: 85,
            max_specificity: 99
        },
        {
            test: "spam filter",
            condition: "spam email",
            min_rate: 10,
            max_rate: 30,
            min_sensitivity: 75,
            max_sensitivity: 95,
            min_specificity: 80,
            max_specificity: 98
        },
        {
            test: "metal detector",
            condition: "metal object",
            min_rate: 5,
            max_rate: 20,
            min_sensitivity: 80,
            max_sensitivity: 98,
            min_specificity: 75,
            max_specificity: 95
        },
        {
            test: "security alarm",
            condition: "intrusion",
            min_rate: 1,
            max_rate: 10,
            min_sensitivity: 85,
            max_sensitivity: 99,
            min_specificity: 80,
            max_specificity: 95
        }
    ];
    
    const context = contexts[Math.floor(Math.random() * contexts.length)];
    
    return {
        test: context.test,
        condition: context.condition,
        rate: randomInt(context.min_rate, context.max_rate) / 100,
        sensitivity: randomInt(context.min_sensitivity, context.max_sensitivity) / 100,
        specificity: randomInt(context.min_specificity, context.max_specificity) / 100
    };
}

// Helper function to generate random variable outcomes
function generateRandomVariableOutcomes(numOutcomes) {
    const outcomes = [];
    let remainingProbability = 1.0;
    
    for (let i = 0; i < numOutcomes - 1; i++) {
        const value = randomInt(-10, 20) * 5; // Values like -10, -5, 0, 5, 10, 15, etc.
        let prob;
        
        if (i === numOutcomes - 2) {
            // Second to last outcome
            prob = preciseRound(remainingProbability * randomInt(40, 80) / 100, 2);
        } else {
            // Earlier outcomes
            prob = preciseRound(remainingProbability * randomInt(10, 60) / 100, 2);
        }
        
        outcomes.push({ value, prob });
        remainingProbability -= prob;
    }
    
    // Last outcome
    outcomes.push({ 
        value: randomInt(-10, 20) * 5,
        prob: preciseRound(remainingProbability, 2)
    });
    
    return outcomes;
}

// Helper function to generate a game of chance scenario
function generateGameOfChanceScenario(costToPlay) {
    const numOutcomes = randomInt(2, 4);
    const outcomes = [];
    let remainingProbability = 1.0;
    
    // Create win scenarios
    for (let i = 0; i < numOutcomes - 1; i++) {
        const winAmount = randomInt(costToPlay, costToPlay * 10);
        let prob;
        
        if (i === numOutcomes - 2) {
            // Second to last outcome
            prob = preciseRound(remainingProbability * randomInt(10, 30) / 100, 3);
        } else {
            // Earlier outcomes
            prob = preciseRound(remainingProbability * randomInt(5, 20) / 100, 3);
        }
        
        outcomes.push({ win: winAmount, prob });
        remainingProbability -= prob;
    }
    
    // Last outcome is losing (no win)
    outcomes.push({ win: 0, prob: preciseRound(remainingProbability, 3) });
    
    return { outcomes };
}

// Helper function to generate an investment scenario
function generateInvestmentScenario(investmentAmount) {
    const numScenarios = randomInt(3, 4);
    const scenarios = [];
    let remainingProbability = 1.0;
    
    // Create return scenarios
    for (let i = 0; i < numScenarios - 1; i++) {
        const returnRate = randomInt(-30, 50) / 100; // -30% to +50% return
        let prob;
        
        if (i === numScenarios - 2) {
            // Second to last scenario
            prob = preciseRound(remainingProbability * randomInt(20, 40) / 100, 2);
        } else {
            // Earlier scenarios
            prob = preciseRound(remainingProbability * randomInt(15, 35) / 100, 2);
        }
        
        scenarios.push({ returnRate, prob });
        remainingProbability -= prob;
    }
    
    // Last scenario
    scenarios.push({ 
        returnRate: randomInt(-30, 50) / 100,
        prob: preciseRound(remainingProbability, 2)
    });
    
    return { scenarios };
}

// Helper function to generate a binomial context
function generateBinomialContext() {
    const contexts = [
        { action: "flip a fair coin", outcome: "heads", probability: 0.5 },
        { action: "roll a die", outcome: "a six", probability: 1/6 },
        { action: "select a card from a deck", outcome: "a heart", probability: 13/52 },
        { action: "answer a multiple-choice question with 4 options randomly", outcome: "the correct answer", probability: 1/4 },
        { action: "shoot a basketball", outcome: "a basket", probability: randomInt(30, 70)/100 },
        { action: "take a true/false quiz question", outcome: "a correct answer", probability: 0.5 },
        { action: "roll a number greater than 4 on a die", outcome: "a success", probability: 2/6 },
        { action: "draw a red marble from a jar with equal red and blue marbles", outcome: "a red marble", probability: 0.5 },
        { action: "get a defective product from a production line", outcome: "a defective item", probability: randomInt(5, 20)/100 },
        { action: "win a game with evenly matched players", outcome: "a win", probability: 0.5 }
    ];
    
    return contexts[Math.floor(Math.random() * contexts.length)];
}

// Helper function to generate an item set
function generateItemSet() {
    // Dynamically generate item types, colors, and counts
    const itemTypes = [
        "ball", "marble", "card", "chip", "token", "cube", "bead", "pebble", 
        "block", "piece", "gem", "coin", "tile", "disc", "stone", "figure"
    ];
    
    const colors = [
        "red", "blue", "green", "yellow", "orange", "purple", "pink", "white", 
        "black", "brown", "gray", "teal", "gold", "silver", "violet", "indigo"
    ];
    
    // Randomly select an item type and 3-5 colors
    const itemType = itemTypes[Math.floor(Math.random() * itemTypes.length)];
    const numColors = randomInt(3, 5);
    
    // Shuffle colors and take the first numColors
    const shuffledColors = [...colors].sort(() => 0.5 - Math.random());
    const selectedColors = shuffledColors.slice(0, numColors);
    
    // Generate random counts for each color (3-10 items per color)
    const items = selectedColors.map(color => {
        return {
            name: `${color} ${itemType}`,
            count: randomInt(3, 10)
        };
    });
    
    // Calculate total
    const total = items.reduce((sum, item) => sum + item.count, 0);
    
    // Create description
    let description = `a collection with `;
    for (let i = 0; i < items.length; i++) {
        description += `${items[i].count} ${items[i].name}s`;
        if (i < items.length - 2) {
            description += ", ";
        } else if (i === items.length - 2) {
            description += " and ";
        }
    }
    
    return {
        items,
        total,
        description
    };
}

function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function preciseRound(num, decimals) {
    const factor = Math.pow(10, decimals);
    return Math.round((num + Number.EPSILON) * factor) / factor;
}