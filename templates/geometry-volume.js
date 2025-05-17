// Geometry Problems Generator - Volume
// This file generates problems related to volume calculations for various 3D shapes

// Utility functions for random number generation - duplicated here for independence
function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomFloat(min, max) {
    return Math.random() * (max - min) + min;
}

function preciseRound(num, decimals) {
    const factor = Math.pow(10, decimals);
    return Math.round((num + Number.EPSILON) * factor) / factor;
}

function generateVolumeProblem() {
    const shapes = [
        "cube",
        "rectangular_prism",
        "cylinder",
        "cone",
        "sphere",
        "pyramid",
        "triangular_prism",
        "hemisphere",
        "composite"
    ];
    
    const shape = shapes[Math.floor(Math.random() * shapes.length)];
    let question, answer, explanation;
    
    // Use decimal or integer values based on probability
    const useDecimals = Math.random() < 0.4; // 40% chance of using decimals
    
    switch(shape) {
        case "cube":
            const side = useDecimals ? 
                preciseRound(randomFloat(3, 15), 1) : 
                randomInt(3, 15);
                
            question = `Calculate the volume of a cube with side length ${side} units.`;
            answer = preciseRound(Math.pow(side, 3), 2);
            explanation = `The volume of a cube is calculated by cubing the side length.\n\nVolume = side³ = ${side}³ = ${answer} cubic units`;
            break;
            
        case "rectangular_prism":
            const length = useDecimals ? 
                preciseRound(randomFloat(4, 20), 1) : 
                randomInt(4, 20);
                
            const width = useDecimals ? 
                preciseRound(randomFloat(3, 15), 1) : 
                randomInt(3, 15);
                
            const height = useDecimals ? 
                preciseRound(randomFloat(2, 10), 1) : 
                randomInt(2, 10);
                
            question = `Find the volume of a rectangular prism with length ${length} units, width ${width} units, and height ${height} units.`;
            answer = preciseRound(length * width * height, 2);
            explanation = `The volume of a rectangular prism is the product of its length, width, and height.\n\nVolume = length × width × height = ${length} × ${width} × ${height} = ${answer} cubic units`;
            break;
            
        case "cylinder":
            const cylinderRadius = useDecimals ? 
                preciseRound(randomFloat(2, 12), 1) : 
                randomInt(2, 12);
                
            const cylinderHeight = useDecimals ? 
                preciseRound(randomFloat(4, 20), 1) : 
                randomInt(4, 20);
                
            // Randomly choose to provide diameter instead of radius
            const usesDiameter = Math.random() > 0.5;
            
            if (usesDiameter) {
                const diameter = preciseRound(cylinderRadius * 2, 1);
                question = `Calculate the volume of a cylinder with diameter ${diameter} units and height ${cylinderHeight} units. (Use π = 3.14)`;
                answer = preciseRound(Math.PI * Math.pow(cylinderRadius, 2) * cylinderHeight, 2);
                explanation = `First, we need to find the radius: radius = diameter ÷ 2 = ${diameter} ÷ 2 = ${cylinderRadius} units.\n\nThe volume of a cylinder is calculated using the formula: Volume = π × r² × h\n\nVolume = 3.14 × ${cylinderRadius}² × ${cylinderHeight} = 3.14 × ${preciseRound(Math.pow(cylinderRadius, 2), 2)} × ${cylinderHeight} = ${answer} cubic units`;
            } else {
                question = `What is the volume of a cylinder with radius ${cylinderRadius} units and height ${cylinderHeight} units? (Use π = 3.14)`;
                answer = preciseRound(Math.PI * Math.pow(cylinderRadius, 2) * cylinderHeight, 2);
                explanation = `The volume of a cylinder is calculated using the formula: Volume = π × r² × h\n\nVolume = 3.14 × ${cylinderRadius}² × ${cylinderHeight} = 3.14 × ${preciseRound(Math.pow(cylinderRadius, 2), 2)} × ${cylinderHeight} = ${answer} cubic units`;
            }
            break;
            
        case "cone":
            const coneRadius = useDecimals ? 
                preciseRound(randomFloat(3, 12), 1) : 
                randomInt(3, 12);
                
            const coneHeight = useDecimals ? 
                preciseRound(randomFloat(5, 18), 1) : 
                randomInt(5, 18);
                
            question = `Find the volume of a cone with radius ${coneRadius} units and height ${coneHeight} units. (Use π = 3.14)`;
            answer = preciseRound((1/3) * Math.PI * Math.pow(coneRadius, 2) * coneHeight, 2);
            explanation = `The volume of a cone is one-third the product of the base area and the height.\n\nVolume = (1/3) × π × r² × h = (1/3) × 3.14 × ${coneRadius}² × ${coneHeight} = (1/3) × 3.14 × ${preciseRound(Math.pow(coneRadius, 2), 2)} × ${coneHeight} = ${answer} cubic units`;
            break;
            
        case "sphere":
            const sphereRadius = useDecimals ? 
                preciseRound(randomFloat(3, 15), 1) : 
                randomInt(3, 15);
                
            // Randomly choose to provide diameter instead of radius
            const sphereUsesDiameter = Math.random() > 0.5;
            
            if (sphereUsesDiameter) {
                const diameter = preciseRound(sphereRadius * 2, 1);
                question = `Calculate the volume of a sphere with diameter ${diameter} units. (Use π = 3.14)`;
                answer = preciseRound((4/3) * Math.PI * Math.pow(sphereRadius, 3), 2);
                explanation = `First, we need to find the radius: radius = diameter ÷ 2 = ${diameter} ÷ 2 = ${sphereRadius} units.\n\nThe volume of a sphere is calculated using the formula: Volume = (4/3) × π × r³\n\nVolume = (4/3) × 3.14 × ${sphereRadius}³ = (4/3) × 3.14 × ${preciseRound(Math.pow(sphereRadius, 3), 2)} = ${answer} cubic units`;
            } else {
                question = `What is the volume of a sphere with radius ${sphereRadius} units? (Use π = 3.14)`;
                answer = preciseRound((4/3) * Math.PI * Math.pow(sphereRadius, 3), 2);
                explanation = `The volume of a sphere is calculated using the formula: Volume = (4/3) × π × r³\n\nVolume = (4/3) × 3.14 × ${sphereRadius}³ = (4/3) × 3.14 × ${preciseRound(Math.pow(sphereRadius, 3), 2)} = ${answer} cubic units`;
            }
            break;
            
        case "pyramid":
            // Square-based pyramid
            const baseLength = useDecimals ? 
                preciseRound(randomFloat(4, 15), 1) : 
                randomInt(4, 15);
                
            const pyramidHeight = useDecimals ? 
                preciseRound(randomFloat(5, 20), 1) : 
                randomInt(5, 20);
                
            const baseArea = baseLength * baseLength;
            
            question = `Find the volume of a square-based pyramid with base side length ${baseLength} units and height ${pyramidHeight} units.`;
            answer = preciseRound((1/3) * baseArea * pyramidHeight, 2);
            explanation = `The volume of a pyramid is one-third the product of the base area and the height.\n\nBase area = ${baseLength} × ${baseLength} = ${baseArea} square units\n\nVolume = (1/3) × base area × height = (1/3) × ${baseArea} × ${pyramidHeight} = ${answer} cubic units`;
            break;
            
        case "triangular_prism":
            const baseWidth = useDecimals ? 
                preciseRound(randomFloat(4, 15), 1) : 
                randomInt(4, 15);
                
            const baseHeight = useDecimals ? 
                preciseRound(randomFloat(3, 12), 1) : 
                randomInt(3, 12);
                
            const prismLength = useDecimals ? 
                preciseRound(randomFloat(5, 20), 1) : 
                randomInt(5, 20);
                
            const triangleArea = (baseWidth * baseHeight) / 2;
            
            question = `Calculate the volume of a triangular prism with a triangular base of width ${baseWidth} units and height ${baseHeight} units, and a prism length of ${prismLength} units.`;
            answer = preciseRound(triangleArea * prismLength, 2);
            explanation = `The volume of a prism is the product of the base area and the length.\n\nTriangular base area = (width × height) ÷ 2 = (${baseWidth} × ${baseHeight}) ÷ 2 = ${triangleArea} square units\n\nVolume = base area × length = ${triangleArea} × ${prismLength} = ${answer} cubic units`;
            break;
            
        case "hemisphere":
            const hemiRadius = useDecimals ? 
                preciseRound(randomFloat(3, 15), 1) : 
                randomInt(3, 15);
                
            question = `What is the volume of a hemisphere with radius ${hemiRadius} units? (Use π = 3.14)`;
            answer = preciseRound((2/3) * Math.PI * Math.pow(hemiRadius, 3), 2);
            explanation = `The volume of a hemisphere is half the volume of a sphere.\n\nVolume = (1/2) × (4/3) × π × r³ = (2/3) × π × r³ = (2/3) × 3.14 × ${hemiRadius}³ = (2/3) × 3.14 × ${preciseRound(Math.pow(hemiRadius, 3), 2)} = ${answer} cubic units`;
            break;
            
        case "composite":
            // Generate composite shape volume problems
            const compositeTypes = ["cylinder+hemisphere", "cube+pyramid", "cylinder+cone"];
            const compositeType = compositeTypes[Math.floor(Math.random() * compositeTypes.length)];
            
            if (compositeType === "cylinder+hemisphere") {
                const compRadius = useDecimals ? 
                    preciseRound(randomFloat(3, 10), 1) : 
                    randomInt(3, 10);
                    
                const cylinderPart = useDecimals ? 
                    preciseRound(randomFloat(5, 15), 1) : 
                    randomInt(5, 15);
                    
                // Calculate volumes
                const hemiVolume = (2/3) * Math.PI * Math.pow(compRadius, 3);
                const cylVolume = Math.PI * Math.pow(compRadius, 2) * cylinderPart;
                const totalVolume = hemiVolume + cylVolume;
                
                question = `A shape consists of a hemisphere with radius ${compRadius} units attached to the top of a cylinder with the same radius and height ${cylinderPart} units. Calculate the total volume of this shape. (Use π = 3.14)`;
                answer = preciseRound(totalVolume, 2);
                explanation = `We need to find the sum of the hemisphere's volume and the cylinder's volume.\n\nHemisphere volume = (2/3) × π × r³ = (2/3) × 3.14 × ${compRadius}³ = ${preciseRound(hemiVolume, 2)} cubic units\n\nCylinder volume = π × r² × h = 3.14 × ${compRadius}² × ${cylinderPart} = ${preciseRound(cylVolume, 2)} cubic units\n\nTotal volume = Hemisphere volume + Cylinder volume = ${preciseRound(hemiVolume, 2)} + ${preciseRound(cylVolume, 2)} = ${answer} cubic units`;
            }
            else if (compositeType === "cube+pyramid") {
                const cubeSide = useDecimals ? 
                    preciseRound(randomFloat(4, 12), 1) : 
                    randomInt(4, 12);
                    
                const pyramidHeight = useDecimals ? 
                    preciseRound(randomFloat(3, 10), 1) : 
                    randomInt(3, 10);
                    
                // Calculate volumes
                const cubeVolume = Math.pow(cubeSide, 3);
                const pyramidVolume = (1/3) * Math.pow(cubeSide, 2) * pyramidHeight;
                const totalVolume = cubeVolume + pyramidVolume;
                
                question = `A shape consists of a cube with side length ${cubeSide} units with a square-based pyramid on top. The pyramid has the same base dimensions as the cube and a height of ${pyramidHeight} units. What is the total volume of this shape?`;
                answer = preciseRound(totalVolume, 2);
                explanation = `We need to find the sum of the cube's volume and the pyramid's volume.\n\nCube volume = side³ = ${cubeSide}³ = ${preciseRound(cubeVolume, 2)} cubic units\n\nPyramid volume = (1/3) × base area × height = (1/3) × ${cubeSide}² × ${pyramidHeight} = (1/3) × ${preciseRound(Math.pow(cubeSide, 2), 2)} × ${pyramidHeight} = ${preciseRound(pyramidVolume, 2)} cubic units\n\nTotal volume = Cube volume + Pyramid volume = ${preciseRound(cubeVolume, 2)} + ${preciseRound(pyramidVolume, 2)} = ${answer} cubic units`;
            }
            else { // cylinder+cone
                const bothRadius = useDecimals ? 
                    preciseRound(randomFloat(3, 10), 1) : 
                    randomInt(3, 10);
                    
                const cylinderHeight = useDecimals ? 
                    preciseRound(randomFloat(5, 15), 1) : 
                    randomInt(5, 15);
                    
                const coneHeight = useDecimals ? 
                    preciseRound(randomFloat(4, 12), 1) : 
                    randomInt(4, 12);
                    
                // Calculate volumes
                const cylVolume = Math.PI * Math.pow(bothRadius, 2) * cylinderHeight;
                const coneVolume = (1/3) * Math.PI * Math.pow(bothRadius, 2) * coneHeight;
                const totalVolume = cylVolume + coneVolume;
                
                question = `A shape consists of a cylinder with radius ${bothRadius} units and height ${cylinderHeight} units with a cone on top. The cone has the same radius as the cylinder and a height of ${coneHeight} units. Calculate the total volume of this shape. (Use π = 3.14)`;
                answer = preciseRound(totalVolume, 2);
                explanation = `We need to find the sum of the cylinder's volume and the cone's volume.\n\nCylinder volume = π × r² × h = 3.14 × ${bothRadius}² × ${cylinderHeight} = 3.14 × ${preciseRound(Math.pow(bothRadius, 2), 2)} × ${cylinderHeight} = ${preciseRound(cylVolume, 2)} cubic units\n\nCone volume = (1/3) × π × r² × h = (1/3) × 3.14 × ${bothRadius}² × ${coneHeight} = (1/3) × 3.14 × ${preciseRound(Math.pow(bothRadius, 2), 2)} × ${coneHeight} = ${preciseRound(coneVolume, 2)} cubic units\n\nTotal volume = Cylinder volume + Cone volume = ${preciseRound(cylVolume, 2)} + ${preciseRound(coneVolume, 2)} = ${answer} cubic units`;
            }
            break;
    }
    
    // Generate multiple choice options
    const options = generateOptions(answer);
    
    return {
        type: "geometry",
        question: question,
        options: options,
        correct_answer: answer,
        explanation: explanation
    };
}

// Function to generate multiple choice options - duplicated here for independence
function generateOptions(correctAnswer) {
    const options = [correctAnswer];
    const value = parseFloat(correctAnswer);
    
    // Create variations around the correct answer
    const variations = [];
    
    // Add percentage-based variations
    for (const factor of [0.75, 0.85, 0.9, 1.1, 1.15, 1.25]) {
        variations.push(preciseRound(value * factor, 2));
    }
    
    // Add fixed variations based on the magnitude of the answer
    const magnitude = Math.abs(value);
    let fixedVariations = [];
    
    if (magnitude < 10) {
        fixedVariations = [value - 1, value + 1, value - 2, value + 2];
    } else if (magnitude < 50) {
        fixedVariations = [value - 5, value + 5, value - 8, value + 8];
    } else if (magnitude < 100) {
        fixedVariations = [value - 10, value + 10, value - 15, value + 15];
    } else {
        fixedVariations = [value - 20, value + 20, value - 50, value + 50];
    }
    
    variations.push(...fixedVariations);
    
    // Common errors in volume calculations
    variations.push(preciseRound(value * 3, 2)); // Using 1 instead of 1/3
    variations.push(preciseRound(value / 3, 2)); // Using 1/9 instead of 1/3
    
    if (value > 1) {
        // Common error of using radius instead of diameter or vice versa
        variations.push(preciseRound(value * 8, 2)); // Using r³ instead of (r/2)³ for diameter
        variations.push(preciseRound(value / 8, 2)); // Using (d/2)³ instead of d³ for radius
    }
    
    // Select 3 different wrong options
    const wrongOptions = [];
    // Shuffle the variations for randomness
    for (let i = variations.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [variations[i], variations[j]] = [variations[j], variations[i]];
    }
    
    for (const variation of variations) {
        if (Math.abs(variation - value) > 0.01 && !wrongOptions.includes(variation)) {
            wrongOptions.push(variation);
            if (wrongOptions.length === 3) break;
        }
    }
    
    // If we still don't have 3 wrong options (unlikely), add some random ones
    while (wrongOptions.length < 3) {
        const randomOption = preciseRound(value * (1 + (Math.random() * 0.6 - 0.3)), 2);
        if (Math.abs(randomOption - value) > 0.01 && !wrongOptions.includes(randomOption)) {
            wrongOptions.push(randomOption);
        }
    }
    
    options.push(...wrongOptions);
    
    // Shuffle all options for final presentation
    for (let i = options.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [options[i], options[j]] = [options[j], options[i]];
    }
    
    return options;
}