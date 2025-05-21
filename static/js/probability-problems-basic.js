// Basic Probability Problems Generator

function generateBasicProbabilityProblem() {
    const problemTypes = [
        "basic_probability",
        "card_probability",
        "dice_probability"
    ];
    
    const problemType = problemTypes[Math.floor(Math.random() * problemTypes.length)];
    let question, answer, explanation;
    
    if (problemType === "basic_probability") {
        // Generate a basic probability problem with colored items
        // Generate dynamic item type and colors instead of hardcoded ones
        const itemType = generateRandomItemType();
        const colors = generateRandomColors(2, 4); // Generate 2-4 random colors
        
        // Generate counts for each color
        const total_items = randomInt(20, 50);
        const counts = generateRandomDistribution(colors.length, total_items);
        
        // Create item description
        let description = `A bag contains `;
        for (let i = 0; i < colors.length; i++) {
            description += `${counts[i]} ${colors[i]} ${itemType}s`;
            if (i < colors.length - 2) {
                description += ", ";
            } else if (i === colors.length - 2) {
                description += " and ";
            }
        }
        
        // Create variants of the question
        const questionTypes = [
            { template: "If a ${item} is drawn at random, what is the probability of getting a ${color} ${item}?", type: "single" },
            { template: "If a ${item} is drawn at random, what is the probability of getting either a ${color1} or a ${color2} ${item}?", type: "either_or" },
            { template: "If a ${item} is drawn at random, what is the probability of NOT getting a ${color} ${item}?", type: "not" }
        ];
        
        const selectedQuestionType = questionTypes[Math.floor(Math.random() * questionTypes.length)];
        
        if (selectedQuestionType.type === "single") {
            // Select a random color
            const targetColorIndex = Math.floor(Math.random() * colors.length);
            const targetColor = colors[targetColorIndex];
            const targetCount = counts[targetColorIndex];
            
            question = `${description}. ${selectedQuestionType.template
                .replace(/\${item}/g, itemType)
                .replace(/\${color}/g, targetColor)}`;
            
            answer = targetCount / total_items;
            
            // Create explanation
            explanation = `To find probability, we divide the number of favorable outcomes by the total number of possible outcomes.\n\n` +
                `P(${targetColor}) = Number of ${targetColor} ${itemType}s ÷ Total number of ${itemType}s\n\n` +
                `P(${targetColor}) = ${targetCount} ÷ ${total_items} = ${answer}\n\n` +
                `This means there is a ${Math.round(answer * 100)}% chance of drawing a ${targetColor} ${itemType}.`;
        } 
        else if (selectedQuestionType.type === "either_or") {
            // Select two random colors
            const indices = getTwoRandomIndices(colors.length);
            
            const color1 = colors[indices[0]];
            const color2 = colors[indices[1]];
            const count1 = counts[indices[0]];
            const count2 = counts[indices[1]];
            const combinedCount = count1 + count2;
            
            question = `${description}. ${selectedQuestionType.template
                .replace(/\${item}/g, itemType)
                .replace(/\${color1}/g, color1)
                .replace(/\${color2}/g, color2)}`;
            
            answer = combinedCount / total_items;
            
            // Create explanation
            explanation = `To find the probability of getting either a ${color1} or a ${color2} ${itemType}, we add the individual probabilities since these are mutually exclusive events (you can't draw a ${itemType} that is both ${color1} and ${color2}).\n\n` +
                `P(${color1} or ${color2}) = P(${color1}) + P(${color2})\n\n` +
                `P(${color1}) = ${count1} ÷ ${total_items} = ${(count1/total_items).toFixed(3)}\n` +
                `P(${color2}) = ${count2} ÷ ${total_items} = ${(count2/total_items).toFixed(3)}\n\n` +
                `P(${color1} or ${color2}) = ${(count1/total_items).toFixed(3)} + ${(count2/total_items).toFixed(3)} = ${combinedCount} ÷ ${total_items} = ${answer}\n\n` +
                `This means there is a ${Math.round(answer * 100)}% chance of drawing either a ${color1} or a ${color2} ${itemType}.`;
        }
        else {  // "not" type
            // Select a random color
            const targetColorIndex = Math.floor(Math.random() * colors.length);
            const targetColor = colors[targetColorIndex];
            const targetCount = counts[targetColorIndex];
            
            question = `${description}. ${selectedQuestionType.template
                .replace(/\${item}/g, itemType)
                .replace(/\${color}/g, targetColor)}`;
            
            answer = (total_items - targetCount) / total_items;
            
            // Create explanation
            explanation = `To find the probability of NOT getting a ${targetColor} ${itemType}, we can use the complement rule:\n\n` +
                `P(not ${targetColor}) = 1 - P(${targetColor})\n\n` +
                `P(${targetColor}) = ${targetCount} ÷ ${total_items} = ${(targetCount/total_items).toFixed(3)}\n\n` +
                `P(not ${targetColor}) = 1 - ${(targetCount/total_items).toFixed(3)} = ${answer}\n\n` +
                `Alternatively, we can directly calculate:\n` +
                `P(not ${targetColor}) = Number of non-${targetColor} ${itemType}s ÷ Total number of ${itemType}s\n` +
                `P(not ${targetColor}) = ${total_items - targetCount} ÷ ${total_items} = ${answer}\n\n` +
                `This means there is a ${Math.round(answer * 100)}% chance of drawing a ${itemType} that is not ${targetColor}.`;
        }
        
        answer = preciseRound(answer, 3);
    }
    else if (problemType === "card_probability") {
        // Probability problems involving a standard deck of 52 cards
        // These card attributes are kept hardcoded as they represent a standard deck of cards
        const card_attributes = [
            {category: "suit", types: [
                {name: "heart", count: 13},
                {name: "diamond", count: 13},
                {name: "club", count: 13},
                {name: "spade", count: 13}
            ]},
            {category: "color", types: [
                {name: "red card", count: 26},
                {name: "black card", count: 26}
            ]},
            {category: "value", types: [
                {name: "Ace", count: 4},
                {name: "face card (Jack, Queen, or King)", count: 12},
                {name: "card less than 5", count: 16},  // Aces count as 1
                {name: "card greater than 9", count: 16},  // Includes 10, J, Q, K
                {name: "even numbered card (2, 4, 6, 8, 10)", count: 20}
            ]}
        ];
        
        // Randomly select an attribute
        const selectedAttribute = card_attributes[Math.floor(Math.random() * card_attributes.length)];
        const selectedType = selectedAttribute.types[Math.floor(Math.random() * selectedAttribute.types.length)];
        
        // Generate more dynamic question formats
        const questionFormats = [
            `In a standard deck of 52 playing cards, what is the probability of drawing ${selectedType.name}?`,
            `When drawing a single card from a standard deck, what is the probability of getting ${selectedType.name}?`,
            `A standard deck has 52 cards. What is the probability of randomly selecting ${selectedType.name}?`,
            `If you randomly select a card from a complete deck, what is the probability it will be ${selectedType.name}?`
        ];
        
        question = questionFormats[Math.floor(Math.random() * questionFormats.length)];
        answer = selectedType.count / 52;
        
        // Create explanation
        explanation = `To find the probability, we divide the number of favorable outcomes (the number of cards matching our criteria) by the total number of possible outcomes (the total number of cards in the deck).\n\n`;
        
        if (selectedAttribute.category === "suit") {
            explanation += `A standard deck has 4 suits (hearts, diamonds, clubs, spades), each with 13 cards.\n\n`;
        } else if (selectedAttribute.category === "color") {
            explanation += `A standard deck has 2 colors: red (hearts and diamonds) and black (clubs and spades).\n` +
                `Each color has 26 cards (13 cards × 2 suits).\n\n`;
        } else if (selectedAttribute.category === "value") {
            if (selectedType.name.includes("Ace")) {
                explanation += `There are 4 Aces in a standard deck (one in each suit).\n\n`;
            } else if (selectedType.name.includes("face card")) {
                explanation += `Face cards are Jacks, Queens, and Kings. There are 12 face cards in a standard deck (3 face cards × 4 suits).\n\n`;
            } else if (selectedType.name.includes("less than 5")) {
                explanation += `Cards less than 5 are Ace, 2, 3, and 4. There are 16 such cards in a standard deck (4 values × 4 suits).\n\n`;
            } else if (selectedType.name.includes("greater than 9")) {
                explanation += `Cards greater than 9 are 10, Jack, Queen, and King. There are 16 such cards in a standard deck (4 values × 4 suits).\n\n`;
            } else if (selectedType.name.includes("even numbered")) {
                explanation += `Even numbered cards are 2, 4, 6, 8, and 10. There are 20 such cards in a standard deck (5 values × 4 suits).\n\n`;
            }
        }
        
        explanation += `P(${selectedType.name}) = Number of ${selectedType.name}s ÷ Total number of cards\n` +
            `P(${selectedType.name}) = ${selectedType.count} ÷ 52 = ${answer}\n\n` +
            `This means there is a ${Math.round(answer * 100)}% chance of drawing ${selectedType.name}.`;
        
        answer = preciseRound(answer, 3);
    }
    else if (problemType === "dice_probability") {
        // Probability problems involving dice
        const diceTypes = [
            {sides: 6, name: "standard six-sided die"},
            {sides: 6, name: "die"},
            {sides: 6, name: "cube"}
        ];
        
        const selectedDiceType = diceTypes[Math.floor(Math.random() * diceTypes.length)];
        const dice_count = randomInt(1, 3);
        
        if (dice_count === 1) {
            // Single die problems
            const outcomes = [
                {name: "an even number", favorable: 3, sides: 6, values: [2, 4, 6]},
                {name: "an odd number", favorable: 3, sides: 6, values: [1, 3, 5]},
                {name: "a number greater than 4", favorable: 2, sides: 6, values: [5, 6]},
                {name: "a number less than or equal to 3", favorable: 3, sides: 6, values: [1, 2, 3]},
                {name: "a prime number (2, 3, 5)", favorable: 3, sides: 6, values: [2, 3, 5]},
                {name: "a number divisible by 3", favorable: 2, sides: 6, values: [3, 6]}  // 3 and 6
            ];
            
            // Filter outcomes for the selected dice type
            const validOutcomes = outcomes.filter(o => o.sides === selectedDiceType.sides);
            const outcome = validOutcomes[Math.floor(Math.random() * validOutcomes.length)];
            
            // Generate more natural-sounding questions
            const questionFormats = [
                `When rolling a single ${selectedDiceType.name}, what is the probability of getting ${outcome.name}?`,
                `If you roll a ${selectedDiceType.name} once, what is the probability of getting ${outcome.name}?`,
                `What's the probability of rolling ${outcome.name} on a single ${selectedDiceType.name}?`,
                `If a ${selectedDiceType.name} is rolled, what is the probability that the result will be ${outcome.name}?`
            ];
            
            question = questionFormats[Math.floor(Math.random() * questionFormats.length)];
            answer = outcome.favorable / selectedDiceType.sides;
            
            // Create explanation
            explanation = `To find the probability, we divide the number of favorable outcomes by the total number of possible outcomes.\n\n` +
                `Favorable outcomes: ${outcome.values.join(', ')} (${outcome.favorable} outcomes)\n` +
                `Total possible outcomes: 1, 2, 3, 4, 5, 6 (${selectedDiceType.sides} outcomes)\n\n` +
                `P(${outcome.name}) = ${outcome.favorable} ÷ ${selectedDiceType.sides} = ${answer}\n\n` +
                `This means there is a ${Math.round(answer * 100)}% chance of rolling ${outcome.name}.`;
        }
        else if (dice_count === 2) {
            // Two dice problems - these are kept hardcoded as they represent standard dice outcomes
            const outcomes = [
                {name: "a sum of 7", favorable: 6, total: 36, combinations: "1+6, 2+5, 3+4, 4+3, 5+2, 6+1"},
                {name: "a sum of 8", favorable: 5, total: 36, combinations: "2+6, 3+5, 4+4, 5+3, 6+2"},
                {name: "a sum of 9", favorable: 4, total: 36, combinations: "3+6, 4+5, 5+4, 6+3"},
                {name: "a sum of 10", favorable: 3, total: 36, combinations: "4+6, 5+5, 6+4"},
                {name: "a sum of 11", favorable: 2, total: 36, combinations: "5+6, 6+5"},
                {name: "a sum of 12", favorable: 1, total: 36, combinations: "6+6"},
                {name: "a sum less than 5", favorable: 6, total: 36, combinations: "1+1, 1+2, 1+3, 2+1, 2+2, 3+1"}, // 2,3,4
                {name: "a sum greater than 9", favorable: 6, total: 36, combinations: "4+6, 5+5, 5+6, 6+4, 6+5, 6+6"}, // 10,11,12
                {name: "a sum that is even", favorable: 18, total: 36, combinations: "all combinations that add to 2,4,6,8,10,12"},
                {name: "doubles (both dice showing same number)", favorable: 6, total: 36, combinations: "1-1, 2-2, 3-3, 4-4, 5-5, 6-6"} // 1-1, 2-2, ... 6-6
            ];
            
            const outcome = outcomes[Math.floor(Math.random() * outcomes.length)];
            
            // Generate more natural-sounding questions
            const questionFormats = [
                `When rolling two ${selectedDiceType.name}s, what is the probability of getting ${outcome.name}?`,
                `If you roll two ${selectedDiceType.name}s, what is the probability of getting ${outcome.name}?`,
                `What's the probability of rolling ${outcome.name} when rolling a pair of ${selectedDiceType.name}s?`,
                `When two ${selectedDiceType.name}s are rolled together, what is the probability of getting ${outcome.name}?`
            ];
            
            question = questionFormats[Math.floor(Math.random() * questionFormats.length)];
            answer = outcome.favorable / outcome.total; // 6×6 = 36 possibilities with two dice
            
            // Create explanation
            explanation = `When rolling two dice, we need to consider all possible combinations.\n\n` +
                `Total possible outcomes: With two six-sided dice, there are 6 × 6 = 36 different possible combinations.\n\n` +
                `Favorable outcomes: ${outcome.name} can occur in ${outcome.favorable} ways: ${outcome.combinations}\n\n` +
                `P(${outcome.name}) = ${outcome.favorable} ÷ ${outcome.total} = ${answer}\n\n` +
                `This means there is a ${Math.round(answer * 100)}% chance of rolling ${outcome.name} with two dice.`;
        }
        else {  // Three dice
            // Three dice problems - these are kept hardcoded as they represent standard dice outcomes
            const outcomes = [
                {name: "a sum of 10", favorable: 27, total: 216},
                {name: "a sum of 11", favorable: 27, total: 216},
                {name: "a sum of 12", favorable: 25, total: 216},
                {name: "a sum of 13", favorable: 21, total: 216},
                {name: "a sum of 14", favorable: 15, total: 216},
                {name: "a sum of 15", favorable: 10, total: 216},
                {name: "a sum of 16", favorable: 6, total: 216},
                {name: "a sum of 17", favorable: 3, total: 216},
                {name: "a sum of 18", favorable: 1, total: 216},
                {name: "all three dice showing the same number", favorable: 6, total: 216}, // 1-1-1, 2-2-2, ... 6-6-6
                {name: "all even numbers", favorable: 8, total: 216}, // 2-2-2, 2-2-4, 2-4-2, 2-4-4, 4-2-2, 4-2-4, 4-4-2, 4-4-4
                {name: "all odd numbers", favorable: 8, total: 216}, // 1-1-1, 1-1-3, 1-3-1, 1-3-3, 3-1-1, 3-1-3, 3-3-1, 3-3-3
                {name: "a sum less than 6", favorable: 10, total: 216},
                {name: "exactly two dice showing the same number", favorable: 90, total: 216} // C(3,2) * 6 * 5 = 90
            ];
            
            const outcome = outcomes[Math.floor(Math.random() * outcomes.length)];
            
            // Generate more natural-sounding questions
            const questionFormats = [
                `When rolling three ${selectedDiceType.name}s, what is the probability of getting ${outcome.name}?`,
                `If you roll three ${selectedDiceType.name}s, what is the probability of getting ${outcome.name}?`,
                `What's the probability of rolling ${outcome.name} when rolling three ${selectedDiceType.name}s together?`,
                `If three ${selectedDiceType.name}s are rolled at once, what is the probability of getting ${outcome.name}?`
            ];
            
            question = questionFormats[Math.floor(Math.random() * questionFormats.length)];
            answer = outcome.favorable / outcome.total; // 6×6×6 = 216 possibilities with three dice
            
            // Create explanation
            explanation = `When rolling three dice, we need to consider all possible combinations.\n\n` +
                `Total possible outcomes: With three six-sided dice, there are 6 × 6 × 6 = 216 different possible combinations.\n\n` +
                `Favorable outcomes: ${outcome.name} can occur in ${outcome.favorable} different ways.\n\n` +
                `P(${outcome.name}) = ${outcome.favorable} ÷ ${outcome.total} = ${answer}\n\n` +
                `This means there is a ${Math.round(answer * 100)}% chance of rolling ${outcome.name} with three dice.`;
        }
        
        answer = preciseRound(answer, 3);
    }
    
    // Generate probability options
    const options = generateProbabilityOptions(answer);
    
    return {
        type: "probability",
        question: question,
        options: options,
        correct_answer: answer,
        explanation: explanation
    };
}

// Function to generate a random item type
function generateRandomItemType() {
    const itemTypes = [
        "ball", "marble", "card", "chip", "token", "cube", "bead", "pebble", 
        "block", "piece", "gem", "coin", "tile", "disc", "stone", "figure"
    ];
    return itemTypes[Math.floor(Math.random() * itemTypes.length)];
}

// Function to generate random colors
function generateRandomColors(minCount, maxCount) {
    const allColors = [
        "red", "blue", "green", "yellow", "white", "black", "purple", "orange",
        "pink", "brown", "gray", "teal", "gold", "silver", "violet", "indigo"
    ];
    
    // Shuffle colors
    const shuffled = [...allColors].sort(() => 0.5 - Math.random());
    
    // Select a random number of colors between min and max
    const count = randomInt(minCount, maxCount);
    return shuffled.slice(0, count);
}

// Function to generate a random distribution that sums to a total
function generateRandomDistribution(numItems, total) {
    if (numItems <= 0) return [];
    if (numItems === 1) return [total];
    
    const distribution = [];
    let remaining = total;
    
    // Generate random values for all but the last item
    for (let i = 0; i < numItems - 1; i++) {
        // Make sure each item gets at least 1, and leave enough for remaining items
        const max = remaining - (numItems - i - 1);
        const min = Math.max(1, Math.floor(remaining * 0.1)); // At least 10% of remaining
        const value = randomInt(min, Math.max(min, max));
        
        distribution.push(value);
        remaining -= value;
    }
    
    // Add the remaining value to the last item
    distribution.push(remaining);
    
    return distribution;
}

// Function to get two different random indices
function getTwoRandomIndices(length) {
    const index1 = Math.floor(Math.random() * length);
    let index2;
    
    do {
        index2 = Math.floor(Math.random() * length);
    } while (index2 === index1);
    
    return [index1, index2];
}

// Utility functions for random number generation and rounding
function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function preciseRound(num, decimals) {
    const factor = Math.pow(10, decimals);
    return Math.round((num + Number.EPSILON) * factor) / factor;
}

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