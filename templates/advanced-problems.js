// Advanced Average Problem Generator

function generateAverageProblem() {
    const problemCategories = [
        "numerical_average",
        "contextual_average",
        "grouped_data_average",
        "weighted_scenarios",
        "rate_and_time_average",
        "comparative_statistics"
    ];

    const selectedCategory = problemCategories[Math.floor(Math.random() * problemCategories.length)];
    let question, answer, explanation;

    function createContextualDataSet(min = 10, max = 100, count = 5) {
        return Array.from({length: count}, () => randomInt(min, max));
    }

    function calculateMean(numbers) {
        const sum = numbers.reduce((acc, num) => acc + num, 0);
        return preciseRound(sum / numbers.length, 2);
    }

    switch(selectedCategory) {
        case "numerical_average":
            // Flexible numerical average problem
            const dataSetSize = randomInt(4, 8);
            const dataRange = {
                min: randomInt(5, 20),
                max: randomInt(30, 100)
            };
            const numbers = createContextualDataSet(dataRange.min, dataRange.max, dataSetSize);
            
            question = `Calculate the average of the following numbers: ${numbers.join(', ')}`;
            answer = calculateMean(numbers);
            
            explanation = `To find the average (mean), follow these steps:
1. Add all numbers together
   ${numbers.join(' + ')} = ${numbers.reduce((acc, num) => acc + num, 0)}
2. Count the total number of values: ${numbers.length}
3. Divide the sum by the number of values
   ${numbers.reduce((acc, num) => acc + num, 0)} ÷ ${numbers.length} = ${answer}`;
            break;

        case "contextual_average":
            // Real-world context average problem
            const contexts = [
                {
                    topic: "student_scores",
                    generateData: () => {
                        const scores = createContextualDataSet(50, 95, 6);
                        return {
                            question: `A class of students received the following test scores: ${scores.join(', ')}. What is the class average?`,
                            data: scores
                        };
                    }
                },
                {
                    topic: "temperature_readings",
                    generateData: () => {
                        const temps = createContextualDataSet(10, 35, 5);
                        return {
                            question: `A meteorologist recorded the following daily temperatures (in °C): ${temps.join(', ')}. What is the average temperature?`,
                            data: temps
                        };
                    }
                },
                {
                    topic: "product_prices",
                    generateData: () => {
                        const prices = createContextualDataSet(50, 500, 4);
                        return {
                            question: `A store manager tracked the prices of different products: $${prices.join(', ')}. What is the average product price?`,
                            data: prices
                        };
                    }
                }
            ];

            const selectedContext = contexts[Math.floor(Math.random() * contexts.length)];
            const contextData = selectedContext.generateData();
            
            question = contextData.question;
            answer = calculateMean(contextData.data);
            
            explanation = `Average (Mean) Calculation for ${selectedContext.topic}:
1. List all values: ${contextData.data.join(', ')}
2. Sum of all values: ${contextData.data.join(' + ')} = ${contextData.data.reduce((acc, num) => acc + num, 0)}
3. Count of values: ${contextData.data.length}
4. Average = Sum ÷ Count = ${contextData.data.reduce((acc, num) => acc + num, 0)} ÷ ${contextData.data.length} = ${answer}`;
            break;

        case "weighted_scenarios":
            // Weighted average with real-world context
            const products = [
                { name: "Product A", value: randomInt(50, 200), weight: randomInt(1, 5) },
                { name: "Product B", value: randomInt(50, 200), weight: randomInt(1, 5) },
                { name: "Product C", value: randomInt(50, 200), weight: randomInt(1, 5) }
            ];

            question = "Calculate the weighted average:\n" + 
                products.map(p => `${p.name}: value $${p.value}, weight ${p.weight}`).join('\n');

            const weightedSum = products.reduce((sum, prod) => sum + (prod.value * prod.weight), 0);
            const totalWeight = products.reduce((sum, prod) => sum + prod.weight, 0);
            
            answer = preciseRound(weightedSum / totalWeight, 2);
            
            explanation = `Weighted Average Calculation:
1. Multiply each value by its weight:
   ${products.map(p => `${p.name}: $${p.value} × ${p.weight} = ${p.value * p.weight}`).join('\n')}
2. Sum of weighted values: ${weightedSum}
3. Sum of weights: ${totalWeight}
4. Weighted Average = Weighted Sum ÷ Total Weight
   = ${weightedSum} ÷ ${totalWeight} = ${answer}`;
            break;

        case "rate_and_time_average":
            // Average rate or speed problems
            const journeys = [
                { distance: randomInt(50, 200), time: randomInt(1, 4) }
            ];

            journeys.push({
                distance: randomInt(50, 200), 
                time: randomInt(1, 4)
            });

            const speeds = journeys.map(j => preciseRound(j.distance / j.time, 2));
            
            question = `A vehicle travels the following journeys:\n` +
                journeys.map((j, i) => 
                    `Journey ${i+1}: ${j.distance} km in ${j.time} hours (Speed: ${speeds[i]} km/h)`
                ).join('\n') + 
                "\nWhat is the average speed across these journeys?";

            answer = calculateMean(speeds);
            
            explanation = `Average Speed Calculation:
1. Calculate speed for each journey:
   ${journeys.map((j, i) => `Journey ${i+1}: ${j.distance} km ÷ ${j.time} hours = ${speeds[i]} km/h`).join('\n')}
2. Find average of speeds:
   (${speeds.join(' + ')}) ÷ ${speeds.length} = ${answer} km/h`;
            break;

        default:
            // Fallback to basic average
            const fallbackNumbers = createContextualDataSet();
            question = `Calculate the average of: ${fallbackNumbers.join(', ')}`;
            answer = calculateMean(fallbackNumbers);
            explanation = `Fallback Average Calculation:
1. List all numbers: ${fallbackNumbers.join(', ')}
2. Sum of numbers: ${fallbackNumbers.join(' + ')} = ${fallbackNumbers.reduce((a,b) => a+b, 0)}
3. Count of numbers: ${fallbackNumbers.length}
4. Average = Sum ÷ Count = ${answer}`
    }

    // Generate multiple choice options
    const options = generateOptions(answer);

    return {
        type: "average",
        question: question,
        options: options,
        correct_answer: answer,
        explanation: explanation
    };
}

// Utility function for generating multiple choice options
function generateOptions(correctAnswer) {
    const options = [correctAnswer];
    const value = parseFloat(correctAnswer);
    
    const variations = [
        value * 0.8,  // 20% less
        value * 1.2,  // 20% more
        value - 2,    // Small subtraction
        value + 2,    // Small addition
        value * 0.5,  // Half
        value * 1.5   // One and a half times
    ];
    
    for (const variation of variations) {
        const roundedVar = preciseRound(variation, 2);
        if (Math.abs(roundedVar - value) > 0.01 && !options.includes(roundedVar)) {
            options.push(roundedVar);
            if (options.length === 4) break;
        }
    }
    
    // If we don't have 4 options, add random variations
    while (options.length < 4) {
        const randomVar = preciseRound(value * (1 + (Math.random() * 0.4 - 0.2)), 2);
        if (!options.includes(randomVar)) {
            options.push(randomVar);
        }
    }
    
    // Shuffle options
    return options.sort(() => Math.random() - 0.5);
}