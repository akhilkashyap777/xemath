// Pulley System Problems Generator
// This file contains functions for generating more complex pulley-based problems

function generatePulleySystemProblem() {
    const g = 9.8; // acceleration due to gravity in m/s²
    
    const problemTypes = [
        "simple_pulley",
        "atwood_machine",
        "compound_pulley",
        "pulley_with_friction",
        "pulley_on_incline"
    ];
    
    const problemType = problemTypes[Math.floor(Math.random() * problemTypes.length)];
    
    switch(problemType) {
        case "simple_pulley":
            return generateSimplePulleyProblem();
        case "atwood_machine":
            return generateAtwoodMachineProblem();
        case "compound_pulley":
            return generateCompoundPulleyProblem();
        case "pulley_with_friction":
            return generatePulleyWithFrictionProblem();
        case "pulley_on_incline":
            return generatePulleyOnInclineProblem();
        default:
            return generateSimplePulleyProblem();
    }
}

// Generate a problem about a simple pulley system
function generateSimplePulleyProblem() {
    const g = 9.8; // acceleration due to gravity in m/s²
    
    const scenarios = [
        {
            template: "Two blocks of masses {mass_1} kg and {mass_2} kg are connected by a massless string over a frictionless pulley. What is the acceleration of the system in m/s²? (Assume the heavier mass is falling. Use g = 9.8 m/s²)",
            solve: (m1, m2) => {
                // Ensure m1 > m2 for the heavier mass to be falling
                const heavier = Math.max(m1, m2);
                const lighter = Math.min(m1, m2);
                return g * (heavier - lighter) / (heavier + lighter);
            },
            explanation: (m1, m2, answer) => {
                const heavier = Math.max(m1, m2);
                const lighter = Math.min(m1, m2);
                
                return `For a pulley system with two masses connected by a string over a frictionless pulley:\n\n` +
                    `The tension in the string is the same throughout, and both masses have the same magnitude of acceleration.\n\n` +
                    `For the heavier mass (${heavier} kg):\n` +
                    `F_net = m_heavier × g - T = m_heavier × a\n\n` +
                    `For the lighter mass (${lighter} kg):\n` +
                    `F_net = T - m_lighter × g = m_lighter × a\n\n` +
                    `Solving these equations for the acceleration:\n` +
                    `a = g × (m_heavier - m_lighter) ÷ (m_heavier + m_lighter)\n` +
                    `a = 9.8 m/s² × (${heavier} - ${lighter}) ÷ (${heavier} + ${lighter})\n` +
                    `a = 9.8 m/s² × ${heavier - lighter} ÷ ${heavier + lighter}\n` +
                    `a = ${answer} m/s²`;
            }
        },
        {
            template: "Two blocks of masses {mass_1} kg and {mass_2} kg are connected by a massless string over a frictionless pulley. What is the tension in the string in Newtons? (Assume the heavier mass is falling. Use g = 9.8 m/s²)",
            solve: (m1, m2) => {
                const heavier = Math.max(m1, m2);
                const lighter = Math.min(m1, m2);
                const a = g * (heavier - lighter) / (heavier + lighter);
                return lighter * (g + a);
            },
            explanation: (m1, m2, answer) => {
                const heavier = Math.max(m1, m2);
                const lighter = Math.min(m1, m2);
                const a = g * (heavier - lighter) / (heavier + lighter);
                
                return `First, we need to find the acceleration of the system:\n\n` +
                    `a = g × (m_heavier - m_lighter) ÷ (m_heavier + m_lighter)\n` +
                    `a = 9.8 m/s² × (${heavier} - ${lighter}) ÷ (${heavier} + ${lighter})\n` +
                    `a = 9.8 m/s² × ${heavier - lighter} ÷ ${heavier + lighter}\n` +
                    `a = ${a.toFixed(2)} m/s²\n\n` +
                    `Now, we can find the tension using the equation for the lighter mass:\n` +
                    `T - m_lighter × g = m_lighter × a\n` +
                    `T = m_lighter × (g + a)\n` +
                    `T = ${lighter} kg × (9.8 m/s² + ${a.toFixed(2)} m/s²)\n` +
                    `T = ${lighter} kg × ${(g + a).toFixed(2)} m/s²\n` +
                    `T = ${answer} N`;
            }
        }
    ];
    
    const scenario = scenarios[Math.floor(Math.random() * scenarios.length)];
    
    // Generate masses ensuring one is greater for interesting problems
    let mass_1, mass_2;
    do {
        mass_1 = randomInt(1, 20);
        mass_2 = randomInt(1, 20);
    } while (Math.abs(mass_1 - mass_2) < 2); // Ensure a noticeable difference
    
    const answer = scenario.solve(mass_1, mass_2);
    
    // Round the answer to 2 decimal places
    const roundedAnswer = preciseRound(answer, 2);
    
    // Generate the question text by replacing placeholders
    let question = scenario.template;
    question = question.replace("{mass_1}", mass_1);
    question = question.replace("{mass_2}", mass_2);
    
    // Generate the explanation
    const explanation = scenario.explanation(mass_1, mass_2, roundedAnswer);
    
    // Generate options
    const options = generateKinematicOptions(roundedAnswer);
    
    return {
        type: "kinematics",
        question: question,
        options: options,
        correct_answer: roundedAnswer,
        explanation: explanation
    };
}

// Generate a problem about an Atwood machine
function generateAtwoodMachineProblem() {
    const g = 9.8; // acceleration due to gravity in m/s²
    
    const scenarios = [
        {
            template: "In an Atwood machine, masses of {mass_1} kg and {mass_2} kg hang from a massless string passing over a frictionless pulley. If the system is released from rest, what will be the speed of the masses after {time} seconds? (Use g = 9.8 m/s²)",
            solve: (m1, m2, t) => {
                const heavier = Math.max(m1, m2);
                const lighter = Math.min(m1, m2);
                const a = g * (heavier - lighter) / (heavier + lighter);
                return a * t;
            },
            explanation: (m1, m2, t, answer) => {
                const heavier = Math.max(m1, m2);
                const lighter = Math.min(m1, m2);
                const a = g * (heavier - lighter) / (heavier + lighter);
                
                return `For an Atwood machine, the acceleration is:\n\n` +
                    `a = g × (m_heavier - m_lighter) ÷ (m_heavier + m_lighter)\n` +
                    `a = 9.8 m/s² × (${heavier} - ${lighter}) ÷ (${heavier} + ${lighter})\n` +
                    `a = 9.8 m/s² × ${heavier - lighter} ÷ ${heavier + lighter}\n` +
                    `a = ${a.toFixed(2)} m/s²\n\n` +
                    `Starting from rest (v₀ = 0), the speed after time t is:\n` +
                    `v = v₀ + a × t\n` +
                    `v = 0 + ${a.toFixed(2)} m/s² × ${t} s\n` +
                    `v = ${answer} m/s`;
            }
        },
        {
            template: "In an Atwood machine, a mass of {mass_1} kg is connected by a light string over a frictionless pulley to a second mass. If the acceleration of the system is {acceleration} m/s², what is the mass of the second object in kg? (Use g = 9.8 m/s²)",
            solve: (m1, a) => {
                // Rearranging the Atwood machine formula: a = g(m2-m1)/(m2+m1)
                // For m2: m2 = m1(g+a)/(g-a)
                return m1 * (g + a) / (g - a);
            },
            explanation: (m1, a, answer) => {
                return `For an Atwood machine, the acceleration formula is:\n\n` +
                    `a = g × (m₂ - m₁) ÷ (m₂ + m₁)\n\n` +
                    `where m₂ is the heavier mass. We need to solve for m₂.\n\n` +
                    `Multiplying both sides by (m₂ + m₁):\n` +
                    `a × (m₂ + m₁) = g × (m₂ - m₁)\n\n` +
                    `Expanding:\n` +
                    `a × m₂ + a × m₁ = g × m₂ - g × m₁\n\n` +
                    `Rearranging to isolate m₂:\n` +
                    `a × m₂ - g × m₂ = -g × m₁ - a × m₁\n` +
                    `m₂ × (a - g) = -m₁ × (g + a)\n` +
                    `m₂ = m₁ × (g + a) ÷ (g - a)\n\n` +
                    `Substituting the values:\n` +
                    `m₂ = ${m1} kg × (9.8 m/s² + ${a} m/s²) ÷ (9.8 m/s² - ${a} m/s²)\n` +
                    `m₂ = ${m1} kg × ${g + a} ÷ ${g - a}\n` +
                    `m₂ = ${answer} kg`;
            }
        }
    ];
    
    const scenario = scenarios[Math.floor(Math.random() * scenarios.length)];
    let mass_1, mass_2, time, acceleration, answer;
    
    if (scenario.template.includes("{mass_1}") && scenario.template.includes("{mass_2}") && scenario.template.includes("{time}")) {
        // First scenario: find velocity after time t
        do {
            mass_1 = randomInt(1, 15);
            mass_2 = randomInt(1, 15);
        } while (Math.abs(mass_1 - mass_2) < 2);
        
        time = randomInt(1, 10);
        answer = scenario.solve(mass_1, mass_2, time);
    } else {
        // Second scenario: find the second mass
        mass_1 = randomInt(1, 10);
        // Make sure acceleration is less than g to ensure positive mass
        acceleration = randomInt(1, 80) / 10; // 0.1 to 8.0 m/s²
        answer = scenario.solve(mass_1, acceleration);
    }
    
    // Round the answer to 2 decimal places
    const roundedAnswer = preciseRound(answer, 2);
    
    // Generate the question text by replacing placeholders
    let question = scenario.template;
    if (question.includes("{mass_1}")) question = question.replace("{mass_1}", mass_1);
    if (question.includes("{mass_2}")) question = question.replace("{mass_2}", mass_2);
    if (question.includes("{time}")) question = question.replace("{time}", time);
    if (question.includes("{acceleration}")) question = question.replace("{acceleration}", acceleration);
    
    // Generate the explanation
    let explanation;
    if (scenario.template.includes("{mass_1}") && scenario.template.includes("{mass_2}") && scenario.template.includes("{time}")) {
        explanation = scenario.explanation(mass_1, mass_2, time, roundedAnswer);
    } else {
        explanation = scenario.explanation(mass_1, acceleration, roundedAnswer);
    }
    
    // Generate options
    const options = generateKinematicOptions(roundedAnswer);
    
    return {
        type: "kinematics",
        question: question,
        options: options,
        correct_answer: roundedAnswer,
        explanation: explanation
    };
}

// Generate a problem about a compound pulley system
function generateCompoundPulleyProblem() {
    const g = 9.8; // acceleration due to gravity in m/s²
    
    const scenarios = [
        {
            template: "A compound pulley system has a mechanical advantage of {advantage}. If a force of {force} Newtons is applied, what is the maximum weight in Newtons that can be lifted?",
            solve: (advantage, force) => advantage * force,
            explanation: (advantage, force, answer) =>
                `For a compound pulley system with a mechanical advantage of ${advantage}:\n\n` +
                `The mechanical advantage tells us how many times the input force is multiplied:\n` +
                `Output force = mechanical advantage × input force\n\n` +
                `Output force = ${advantage} × ${force} N = ${answer} N\n\n` +
                `This means the system can lift a maximum weight of ${answer} N.`
        },
        {
            template: "A block of mass {mass} kg is suspended using a pulley system with {pulleys} pulleys. Assuming ideal conditions (massless pulleys and strings, no friction), what minimum force in Newtons is needed to hold the block stationary? (Use g = 9.8 m/s²)",
            solve: (mass, pulleys) => (mass * g) / pulleys,
            explanation: (mass, pulleys, answer) =>
                `For an ideal pulley system, the weight force is distributed equally among the supporting pulleys/ropes.\n\n` +
                `Weight of the block = mass × g = ${mass} kg × 9.8 m/s² = ${mass * g} N\n\n` +
                `With ${pulleys} pulleys supporting the weight, the force needed is:\n` +
                `Force = weight ÷ number of pulleys\n` +
                `Force = ${mass * g} N ÷ ${pulleys} = ${answer} N`
        }
    ];
    
    const scenario = scenarios[Math.floor(Math.random() * scenarios.length)];
    let advantage, force, mass, pulleys, answer;
    
    if (scenario.template.includes("{advantage}") && scenario.template.includes("{force}")) {
        // Mechanical advantage problem
        advantage = randomInt(2, 10);
        force = randomInt(50, 500);
        answer = scenario.solve(advantage, force);
    } else {
        // Multiple pulleys problem
        mass = randomInt(10, 100);
        pulleys = randomInt(2, 6);
        answer = scenario.solve(mass, pulleys);
    }
    
    // Round the answer to 2 decimal places
    const roundedAnswer = preciseRound(answer, 2);
    
    // Generate the question text by replacing placeholders
    let question = scenario.template;
    if (question.includes("{advantage}")) question = question.replace("{advantage}", advantage);
    if (question.includes("{force}")) question = question.replace("{force}", force);
    if (question.includes("{mass}")) question = question.replace("{mass}", mass);
    if (question.includes("{pulleys}")) question = question.replace("{pulleys}", pulleys);
    
    // Generate the explanation
    let explanation;
    if (scenario.template.includes("{advantage}") && scenario.template.includes("{force}")) {
        explanation = scenario.explanation(advantage, force, roundedAnswer);
    } else {
        explanation = scenario.explanation(mass, pulleys, roundedAnswer);
    }
    
    // Generate options
    const options = generateKinematicOptions(roundedAnswer);
    
    return {
        type: "kinematics",
        question: question,
        options: options,
        correct_answer: roundedAnswer,
        explanation: explanation
    };
}

// Generate a problem about a pulley system with friction
function generatePulleyWithFrictionProblem() {
    const g = 9.8; // acceleration due to gravity in m/s²
    
    const scenarios = [
        {
            template: "Two blocks of masses {mass_1} kg and {mass_2} kg are connected by a massless string over a pulley. The coefficient of kinetic friction between the {mass_1} kg block and the surface is {coefficient}. What is the acceleration of the system in m/s²? (Assume the {mass_2} kg block is hanging vertically and {mass_1} kg block is on a horizontal surface. Use g = 9.8 m/s²)",
            solve: (m1, m2, mu) => {
                // If m2g > μm1g, the system accelerates
                const frictionForce = mu * m1 * g;
                return (m2 * g - frictionForce) / (m1 + m2);
            },
            explanation: (m1, m2, mu, answer) => {
                const frictionForce = mu * m1 * g;
                
                return `Let's analyze the forces in this pulley system:\n\n` +
                    `For the ${m2} kg hanging block:\n` +
                    `F_net = m₂g - T = m₂a\n\n` +
                    `For the ${m1} kg block on the horizontal surface:\n` +
                    `F_net = T - F_friction = m₁a\n\n` +
                    `The friction force is:\n` +
                    `F_friction = μm₁g = ${mu} × ${m1} kg × 9.8 m/s² = ${frictionForce.toFixed(2)} N\n\n` +
                    `From these equations:\n` +
                    `m₂g - T = m₂a\n` +
                    `T - μm₁g = m₁a\n\n` +
                    `Adding these equations to eliminate T:\n` +
                    `m₂g - μm₁g = m₂a + m₁a = (m₁ + m₂)a\n\n` +
                    `Solving for a:\n` +
                    `a = (m₂g - μm₁g) ÷ (m₁ + m₂)\n` +
                    `a = (${m2} kg × 9.8 m/s² - ${frictionForce.toFixed(2)} N) ÷ (${m1} kg + ${m2} kg)\n` +
                    `a = (${m2 * g} N - ${frictionForce.toFixed(2)} N) ÷ ${m1 + m2} kg\n` +
                    `a = ${answer} m/s²`;
            }
        },
        {
            template: "A block of mass {mass_1} kg on a horizontal surface is connected by a string over a pulley to a hanging mass of {mass_2} kg. If the coefficient of kinetic friction is {coefficient}, what mass would need to hang vertically to move the system with constant velocity? (Use g = 9.8 m/s²)",
            solve: (m1, mu) => mu * m1,
            explanation: (m1, m2, mu, answer) =>
                `For the system to move with constant velocity, the acceleration must be zero, which means the forces must be balanced.\n\n` +
                `For the block on the horizontal surface:\n` +
                `The friction force is: F_friction = μm₁g = ${mu} × ${m1} kg × 9.8 m/s² = ${mu * m1 * g} N\n\n` +
                `For constant velocity, the tension in the string (which equals the weight of the hanging mass) must exactly balance this friction force:\n` +
                `T = F_friction\n` +
                `m₂g = μm₁g\n` +
                `m₂ = μm₁ = ${mu} × ${m1} kg = ${answer} kg\n\n` +
                `This means a ${answer} kg mass must hang vertically to move the system with constant velocity.`
        }
    ];
    
    const scenario = scenarios[Math.floor(Math.random() * scenarios.length)];
    let mass_1, mass_2, coefficient, answer;
    
    mass_1 = randomInt(2, 15);
    coefficient = (randomInt(20, 60) / 100).toFixed(2); // Between 0.2 and 0.6
    
    if (scenario.template.includes("what mass would need to hang")) {
        // Constant velocity problem
        // Generate a different mass_2 for the question, but it won't affect the answer
        mass_2 = randomInt(1, 10);
        answer = scenario.solve(mass_1, coefficient);
    } else {
        // Make sure the hanging mass is sufficient to overcome friction
        const minMass2 = Math.ceil(coefficient * mass_1) + 1;
        mass_2 = randomInt(minMass2, minMass2 + 10);
        answer = scenario.solve(mass_1, mass_2, coefficient);
    }
    
    // Round the answer to 2 decimal places
    const roundedAnswer = preciseRound(answer, 2);
    
    // Generate the question text by replacing placeholders
    let question = scenario.template;
    question = question.replace(/{mass_1}/g, mass_1);
    question = question.replace(/{mass_2}/g, mass_2);
    question = question.replace(/{coefficient}/g, coefficient);
    
    // Generate the explanation
    let explanation;
    if (scenario.template.includes("what mass would need to hang")) {
        explanation = scenario.explanation(mass_1, mass_2, coefficient, roundedAnswer);
    } else {
        explanation = scenario.explanation(mass_1, mass_2, coefficient, roundedAnswer);
    }
    
    // Generate options
    const options = generateKinematicOptions(roundedAnswer);
    
    return {
        type: "kinematics",
        question: question,
        options: options,
        correct_answer: roundedAnswer,
        explanation: explanation
    };
}

// Generate a problem about a pulley on an inclined plane
function generatePulleyOnInclineProblem() {
    const g = 9.8; // acceleration due to gravity in m/s²
    
    const scenarios = [
        {
            template: "A {mass_1} kg block on a frictionless inclined plane of angle {angle} degrees is connected by a massless string over a frictionless pulley to a hanging {mass_2} kg block. What is the acceleration of the system in m/s²? (Use g = 9.8 m/s²)",
            solve: (m1, m2, angle) => {
                const angleRad = angle * Math.PI / 180;
                return (m2 * g - m1 * g * Math.sin(angleRad)) / (m1 + m2);
            },
            explanation: (m1, m2, angle, answer) => {
                const angleRad = angle * Math.PI / 180;
                const parallelComponent = m1 * g * Math.sin(angleRad);
                
                return `For the block on the inclined plane:\n` +
                    `The component of gravity parallel to the incline is:\n` +
                    `F_parallel = m₁g × sin(θ) = ${m1} kg × 9.8 m/s² × sin(${angle}°) = ${parallelComponent.toFixed(2)} N\n\n` +
                    `The net force on this block is:\n` +
                    `F_net = T - F_parallel = m₁a\n\n` +
                    `For the hanging block:\n` +
                    `F_net = m₂g - T = m₂a\n\n` +
                    `Adding these equations to eliminate T:\n` +
                    `m₂g - F_parallel = m₁a + m₂a = (m₁ + m₂)a\n\n` +
                    `Solving for a:\n` +
                    `a = (m₂g - m₁g × sin(${angle}°)) ÷ (m₁ + m₂)\n` +
                    `a = (${m2 * g} N - ${parallelComponent.toFixed(2)} N) ÷ ${m1 + m2} kg\n` +
                    `a = ${answer} m/s²`;
            }
        },
        {
            template: "A {mass_1} kg block on a frictionless inclined plane of angle {angle} degrees is connected by a massless string over a frictionless pulley to a hanging mass. What mass in kg must hang vertically for the system to remain at rest? (Use g = 9.8 m/s²)",
            solve: (m1, angle) => {
                const angleRad = angle * Math.PI / 180;
                return m1 * Math.sin(angleRad);
            },
            explanation: (m1, angle, answer) => {
                const angleRad = angle * Math.PI / 180;
                
                return `For the system to remain at rest, the forces must be balanced.\n\n` +
                    `The component of gravity pulling the block down the incline is:\n` +
                    `F_parallel = m₁g × sin(θ) = ${m1} kg × 9.8 m/s² × sin(${angle}°) = ${m1 * g * Math.sin(angleRad).toFixed(2)} N\n\n` +
                    `For equilibrium, the tension in the string (which equals the weight of the hanging mass) must exactly balance this force:\n` +
                    `T = F_parallel\n` +
                    `m₂g = m₁g × sin(θ)\n` +
                    `m₂ = m₁ × sin(θ)\n` +
                    `m₂ = ${m1} kg × sin(${angle}°) = ${answer} kg`
            }
        }
    ];
    
    const scenario = scenarios[Math.floor(Math.random() * scenarios.length)];
    let mass_1, mass_2, angle, answer;
    
    mass_1 = randomInt(2, 15);
    angle = randomInt(20, 60);
    
    if (scenario.template.includes("remain at rest")) {
        // Equilibrium problem
        answer = scenario.solve(mass_1, angle);
    } else {
        // Acceleration problem
        // Generate a mass_2 that creates interesting dynamics
        const minMass = Math.floor(mass_1 * Math.sin(angle * Math.PI / 180));
        if (Math.random() < 0.5) {
            // Sometimes make mass_2 greater than the parallel component for acceleration down
            mass_2 = randomInt(minMass + 1, minMass + 10);
        } else {
            // Sometimes make mass_2 less than the parallel component for acceleration up the incline
            mass_2 = randomInt(Math.max(1, minMass - 5), minMass);
        }
        answer = scenario.solve(mass_1, mass_2, angle);
    }
    
    // Round the answer to 2 decimal places
    const roundedAnswer = preciseRound(answer, 2);
    
    // Generate the question text by replacing placeholders
    let question = scenario.template;
    question = question.replace(/{mass_1}/g, mass_1);
    if (question.includes("{mass_2}")) question = question.replace(/{mass_2}/g, mass_2);
    question = question.replace(/{angle}/g, angle);
    
    // Generate the explanation
    let explanation;
    if (scenario.template.includes("remain at rest")) {
        explanation = scenario.explanation(mass_1, angle, roundedAnswer);
    } else {
        explanation = scenario.explanation(mass_1, mass_2, angle, roundedAnswer);
    }
    
    // Generate options
    const options = generateKinematicOptions(roundedAnswer);
    
    return {
        type: "kinematics",
        question: question,
        options: options,
        correct_answer: roundedAnswer,
        explanation: explanation
    };
}

// Utility function to generate a random integer between min and max (inclusive)
function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Utility function to round to a specific number of decimal places
function preciseRound(num, decimals) {
    const factor = Math.pow(10, decimals);
    return Math.round((num + Number.EPSILON) * factor) / factor;
}

// Utility function to generate answer options for kinematic problems
function generateKinematicOptions(correctAnswer) {
    const options = [correctAnswer];
    const value = parseFloat(correctAnswer);
    
    // Create variations around the correct answer
    const variations = [];
    
    // Add some percentage based variations
    for (const factor of [0.7, 0.85, 1.15, 1.3, 0.5, 2]) {
        const varValue = value * factor;
        if (varValue > 0) {  // Keep only positive values for physical quantities
            variations.push(varValue);
        }
    }
    
    // Add some fixed variations
    for (const delta of [1, 2, 5, -1, -2, -5]) {
        const varValue = value + delta;
        if (varValue > 0) {  // Keep only positive values for physical quantities
            variations.push(varValue);
        }
    }
    
    // Select 3 different wrong options
    const wrongOptions = [];
    variations.sort(() => Math.random() - 0.5); // Shuffle variations
    
    for (const varValue of variations) {
        // Round to 2 decimal places
        const roundedVar = preciseRound(varValue, 2);
        
        if (Math.abs(roundedVar - value) > 0.01 && !wrongOptions.includes(roundedVar)) {
            wrongOptions.push(roundedVar);
            if (wrongOptions.length === 3) break;
        }
    }
    
    // If we couldn't generate enough options, add some defaults
    while (wrongOptions.length < 3) {
        const randomOpt = preciseRound(Math.max(0.1, Math.random() * value * 3), 2);
        if (Math.abs(randomOpt - value) > 0.1 && !wrongOptions.includes(randomOpt) && !options.includes(randomOpt)) {
            wrongOptions.push(randomOpt);
        }
    }
    
    options.push(...wrongOptions.slice(0, 3));
    
    return options.sort(() => Math.random() - 0.5);
}