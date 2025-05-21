// Geometry Problems Generator - Area and Perimeter
// This file generates problems related to area and perimeter calculations

// Utility functions for random number generation
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

function generateAreaProblem() {
    const shapes = [
        "rectangle",
        "square",
        "triangle",
        "circle",
        "trapezoid",
        "parallelogram",
        "rhombus",
        "sector",
        "composite"
    ];
    
    const shape = shapes[Math.floor(Math.random() * shapes.length)];
    let question, answer, explanation;
    
    // Use decimal or integer values based on probability
    const useDecimals = Math.random() < 0.4; // 40% chance of using decimals
    
    switch(shape) {
        case "rectangle":
            const length = useDecimals ? 
                preciseRound(randomFloat(5, 25), 1) : 
                randomInt(5, 25);
                
            const width = useDecimals ? 
                preciseRound(randomFloat(3, 15), 1) : 
                randomInt(3, 15);
                
            question = `Find the area of a rectangle with length ${length} units and width ${width} units.`;
            answer = preciseRound(length * width, 2);
            explanation = `To find the area of a rectangle, multiply length by width.\n\nArea = length × width\nArea = ${length} × ${width} = ${answer} square units`;
            break;
            
        case "square":
            const side = useDecimals ? 
                preciseRound(randomFloat(4, 20), 1) : 
                randomInt(4, 20);
                
            question = `What is the area of a square with side length ${side} units?`;
            answer = preciseRound(side * side, 2);
            explanation = `The area of a square is calculated by squaring the side length.\n\nArea = side² = ${side} × ${side} = ${answer} square units`;
            break;
            
        case "triangle":
            // Choose between different triangle types
            const triangleType = ["standard", "right", "equilateral"][Math.floor(Math.random() * 3)];
            
            if (triangleType === "standard") {
                const base = useDecimals ? 
                    preciseRound(randomFloat(6, 24), 1) : 
                    randomInt(6, 24);
                    
                const height = useDecimals ? 
                    preciseRound(randomFloat(4, 16), 1) : 
                    randomInt(4, 16);
                    
                question = `Calculate the area of a triangle with base ${base} units and height ${height} units.`;
                answer = preciseRound((base * height) / 2, 2);
                explanation = `For a triangle, the area is half the product of the base and height.\n\nArea = (base × height) ÷ 2\nArea = (${base} × ${height}) ÷ 2 = ${answer} square units`;
            } 
            else if (triangleType === "right") {
                // Generate a right triangle using Pythagorean triples or random values
                const useTriples = Math.random() < 0.5;
                let sideA, sideB;
                
                if (useTriples && !useDecimals) {
                    // Use Pythagorean triples
                    const triples = [
                        {a: 3, b: 4}, {a: 5, b: 12}, {a: 8, b: 15}, {a: 7, b: 24}
                    ];
                    
                    const triple = triples[Math.floor(Math.random() * triples.length)];
                    const scaleFactor = randomInt(1, 3);
                    sideA = triple.a * scaleFactor;
                    sideB = triple.b * scaleFactor;
                } else {
                    // Use random values
                    sideA = useDecimals ? 
                        preciseRound(randomFloat(3, 12), 1) : 
                        randomInt(3, 12);
                        
                    sideB = useDecimals ? 
                        preciseRound(randomFloat(4, 15), 1) : 
                        randomInt(4, 15);
                }
                
                question = `Find the area of a right triangle with legs of length ${sideA} units and ${sideB} units.`;
                answer = preciseRound((sideA * sideB) / 2, 2);
                explanation = `For a right triangle, the area is half the product of the two legs.\n\nArea = (leg1 × leg2) ÷ 2\nArea = (${sideA} × ${sideB}) ÷ 2 = ${answer} square units`;
            } 
            else { // equilateral
                const side = useDecimals ? 
                    preciseRound(randomFloat(6, 20), 1) : 
                    randomInt(6, 20);
                    
                const height = preciseRound(side * Math.sqrt(3) / 2, 2);
                
                question = `Calculate the area of an equilateral triangle with side length ${side} units.`;
                answer = preciseRound((Math.sqrt(3) / 4) * side * side, 2);
                explanation = `For an equilateral triangle with side s, the area is (√3 × s²) ÷ 4.\n\nArea = (√3 × ${side}²) ÷ 4\nArea = (√3 × ${side * side}) ÷ 4 = ${answer} square units\n\nAlternatively, we can use the formula Area = (s × h) ÷ 2, where h is the height.\nThe height of an equilateral triangle is (√3 × s) ÷ 2 = ${height} units.\nSo Area = (${side} × ${height}) ÷ 2 = ${answer} square units.`;
            }
            break;
            
        case "circle":
            let radius, diameter;
            
            if (Math.random() > 0.5) { // Ask using radius
                radius = useDecimals ? 
                    preciseRound(randomFloat(3, 15), 1) : 
                    randomInt(3, 15);
                    
                question = `What is the area of a circle with radius ${radius} units? (Use π = 3.14)`;
                answer = preciseRound(Math.PI * radius * radius, 2);
                explanation = `The area of a circle is π × r².\n\nArea = π × ${radius}² = 3.14 × ${radius * radius} = ${answer} square units`;
            } 
            else { // Ask using diameter
                radius = useDecimals ? 
                    preciseRound(randomFloat(3, 15), 1) : 
                    randomInt(3, 15);
                    
                diameter = preciseRound(radius * 2, 1);
                
                question = `Find the area of a circle with diameter ${diameter} units. (Use π = 3.14)`;
                answer = preciseRound(Math.PI * radius * radius, 2);
                explanation = `First, we find the radius: r = diameter ÷ 2 = ${diameter} ÷ 2 = ${radius} units.\n\nThen we calculate the area using A = π × r².\nArea = π × ${radius}² = 3.14 × ${radius * radius} = ${answer} square units`;
            }
            break;
            
        case "trapezoid":
            const base1 = useDecimals ? 
                preciseRound(randomFloat(8, 20), 1) : 
                randomInt(8, 20);
                
            const minBase2 = Math.min(base1 - 1, 4); // Ensure base2 is smaller than base1
            const base2 = useDecimals ? 
                preciseRound(randomFloat(minBase2, base1 - 0.1), 1) : 
                randomInt(minBase2, base1 - 1);
                
            const trapHeight = useDecimals ? 
                preciseRound(randomFloat(5, 15), 1) : 
                randomInt(5, 15);
            
            question = `Calculate the area of a trapezoid with parallel sides of length ${base1} units and ${base2} units, and a height of ${trapHeight} units.`;
            answer = preciseRound(((base1 + base2) / 2) * trapHeight, 2);
            explanation = `The area of a trapezoid is the average of the parallel sides multiplied by the height.\n\nArea = ((b₁ + b₂) ÷ 2) × h\nArea = ((${base1} + ${base2}) ÷ 2) × ${trapHeight}\nArea = (${preciseRound(base1 + base2, 2)} ÷ 2) × ${trapHeight} = ${preciseRound((base1 + base2) / 2, 2)} × ${trapHeight} = ${answer} square units`;
            break;
            
        case "parallelogram":
            const paraBase = useDecimals ? 
                preciseRound(randomFloat(8, 20), 1) : 
                randomInt(8, 20);
                
            const paraHeight = useDecimals ? 
                preciseRound(randomFloat(4, 15), 1) : 
                randomInt(4, 15);
            
            question = `What is the area of a parallelogram with base ${paraBase} units and height ${paraHeight} units?`;
            answer = preciseRound(paraBase * paraHeight, 2);
            explanation = `The area of a parallelogram is the product of the base and height.\n\nArea = base × height\nArea = ${paraBase} × ${paraHeight} = ${answer} square units`;
            break;
            
        case "rhombus":
            const diagonal1 = useDecimals ? 
                preciseRound(randomFloat(8, 24), 1) : 
                randomInt(8, 24);
                
            const diagonal2 = useDecimals ? 
                preciseRound(randomFloat(6, 20), 1) : 
                randomInt(6, 20);
            
            question = `Find the area of a rhombus with diagonals of lengths ${diagonal1} units and ${diagonal2} units.`;
            answer = preciseRound((diagonal1 * diagonal2) / 2, 2);
            explanation = `The area of a rhombus can be calculated as half the product of its diagonals.\n\nArea = (d₁ × d₂) ÷ 2\nArea = (${diagonal1} × ${diagonal2}) ÷ 2 = ${answer} square units`;
            break;
            
        case "sector":
            const sectorRadius = useDecimals ? 
                preciseRound(randomFloat(5, 15), 1) : 
                randomInt(5, 15);
                
            const angle = randomInt(30, 330); // Angle in degrees
            
            question = `Calculate the area of a sector with radius ${sectorRadius} units and central angle ${angle}°. (Use π = 3.14)`;
            answer = preciseRound((angle / 360) * Math.PI * sectorRadius * sectorRadius, 2);
            explanation = `The area of a sector is a fraction of the circle's area, where the fraction is the central angle divided by 360°.\n\nArea = (θ ÷ 360°) × π × r²\nArea = (${angle} ÷ 360) × 3.14 × ${sectorRadius}²\nArea = ${preciseRound(angle / 360, 4)} × 3.14 × ${preciseRound(sectorRadius * sectorRadius, 2)} = ${answer} square units`;
            break;
            
        case "composite":
            // Generate a composite shape problem (combination of two basic shapes)
            const shapes = ["rectangle+triangle", "rectangle+semicircle", "square+triangle"];
            const compositeType = shapes[Math.floor(Math.random() * shapes.length)];
            
            if (compositeType === "rectangle+triangle") {
                const rectLength = useDecimals ? 
                    preciseRound(randomFloat(8, 15), 1) : 
                    randomInt(8, 15);
                    
                const rectWidth = useDecimals ? 
                    preciseRound(randomFloat(4, 10), 1) : 
                    randomInt(4, 10);
                    
                const triangleHeight = useDecimals ? 
                    preciseRound(randomFloat(3, 8), 1) : 
                    randomInt(3, 8);
                
                const rectArea = rectLength * rectWidth;
                const triangleArea = (rectWidth * triangleHeight) / 2;
                const totalArea = rectArea + triangleArea;
                
                question = `A composite shape consists of a rectangle of length ${rectLength} units and width ${rectWidth} units with a triangle attached to its top side. The triangle has the same base as the rectangle's width and a height of ${triangleHeight} units. What is the total area of this composite shape?`;
                answer = preciseRound(totalArea, 2);
                explanation = `We need to find the sum of the rectangle's area and the triangle's area.\n\nRectangle area = length × width = ${rectLength} × ${rectWidth} = ${preciseRound(rectArea, 2)} square units\n\nTriangle area = (base × height) ÷ 2 = (${rectWidth} × ${triangleHeight}) ÷ 2 = ${preciseRound(triangleArea, 2)} square units\n\nTotal area = Rectangle area + Triangle area = ${preciseRound(rectArea, 2)} + ${preciseRound(triangleArea, 2)} = ${answer} square units`;
            } 
            else if (compositeType === "rectangle+semicircle") {
                const rectLength = useDecimals ? 
                    preciseRound(randomFloat(8, 16), 1) : 
                    randomInt(8, 16);
                    
                const rectWidth = useDecimals ? 
                    preciseRound(randomFloat(5, 12), 1) : 
                    randomInt(5, 12);
                
                const semicircleRadius = rectWidth / 2;
                const rectArea = rectLength * rectWidth;
                const semicircleArea = (Math.PI * semicircleRadius * semicircleRadius) / 2;
                const totalArea = rectArea + semicircleArea;
                
                question = `A shape consists of a rectangle of length ${rectLength} units and width ${rectWidth} units with a semicircle attached to one of its shorter sides. What is the total area of this shape? (Use π = 3.14)`;
                answer = preciseRound(totalArea, 2);
                explanation = `We need to find the sum of the rectangle's area and the semicircle's area.\n\nRectangle area = length × width = ${rectLength} × ${rectWidth} = ${preciseRound(rectArea, 2)} square units\n\nThe semicircle has radius = width ÷ 2 = ${rectWidth} ÷ 2 = ${preciseRound(semicircleRadius, 2)} units\n\nSemicircle area = (π × r²) ÷ 2 = (3.14 × ${preciseRound(semicircleRadius, 2)}²) ÷ 2 = ${preciseRound(semicircleArea, 2)} square units\n\nTotal area = Rectangle area + Semicircle area = ${preciseRound(rectArea, 2)} + ${preciseRound(semicircleArea, 2)} = ${answer} square units`;
            }
            else { // square+triangle
                const squareSide = useDecimals ? 
                    preciseRound(randomFloat(6, 15), 1) : 
                    randomInt(6, 15);
                    
                const triangleHeight = useDecimals ? 
                    preciseRound(randomFloat(4, 10), 1) : 
                    randomInt(4, 10);
                
                const squareArea = squareSide * squareSide;
                const triangleArea = (squareSide * triangleHeight) / 2;
                const totalArea = squareArea + triangleArea;
                
                question = `A composite shape consists of a square with side length ${squareSide} units and a triangle attached to one of its sides. The triangle has the same base as the square's side and a height of ${triangleHeight} units. What is the total area of this composite shape?`;
                answer = preciseRound(totalArea, 2);
                explanation = `We need to find the sum of the square's area and the triangle's area.\n\nSquare area = side² = ${squareSide}² = ${preciseRound(squareArea, 2)} square units\n\nTriangle area = (base × height) ÷ 2 = (${squareSide} × ${triangleHeight}) ÷ 2 = ${preciseRound(triangleArea, 2)} square units\n\nTotal area = Square area + Triangle area = ${preciseRound(squareArea, 2)} + ${preciseRound(triangleArea, 2)} = ${answer} square units`;
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

function generatePerimeterProblem() {
    const shapes = [
        "rectangle",
        "square",
        "triangle",
        "circle",
        "semicircle",
        "polygon",
        "composite"
    ];
    
    const shape = shapes[Math.floor(Math.random() * shapes.length)];
    let question, answer, explanation;
    
    // Use decimal or integer values based on probability
    const useDecimals = Math.random() < 0.4; // 40% chance of using decimals
    
    switch(shape) {
        case "rectangle":
            const length = useDecimals ? 
                preciseRound(randomFloat(5, 25), 1) : 
                randomInt(5, 25);
                
            const width = useDecimals ? 
                preciseRound(randomFloat(3, 15), 1) : 
                randomInt(3, 15);
                
            question = `Find the perimeter of a rectangle with length ${length} units and width ${width} units.`;
            answer = preciseRound(2 * (length + width), 2);
            explanation = `The perimeter of a rectangle is twice the sum of its length and width.\n\nPerimeter = 2 × (length + width) = 2 × (${length} + ${width}) = 2 × ${preciseRound(length + width, 2)} = ${answer} units`;
            break;
            
        case "square":
            const side = useDecimals ? 
                preciseRound(randomFloat(4, 20), 1) : 
                randomInt(4, 20);
                
            question = `What is the perimeter of a square with side length ${side} units?`;
            answer = preciseRound(4 * side, 2);
            explanation = `The perimeter of a square is four times its side length.\n\nPerimeter = 4 × side = 4 × ${side} = ${answer} units`;
            break;
            
        case "triangle":
            // Choose between different triangle types
            const triangleType = ["scalene", "isosceles", "equilateral", "right"][Math.floor(Math.random() * 4)];
            
            if (triangleType === "scalene") {
                // Generate three sides that can form a triangle (satisfy triangle inequality)
                let sideA, sideB, sideC;
                let validTriangle = false;
                
                while (!validTriangle) {
                    sideA = useDecimals ? 
                        preciseRound(randomFloat(5, 15), 1) : 
                        randomInt(5, 15);
                        
                    sideB = useDecimals ? 
                        preciseRound(randomFloat(6, 18), 1) : 
                        randomInt(6, 18);
                        
                    sideC = useDecimals ? 
                        preciseRound(randomFloat(7, 20), 1) : 
                        randomInt(7, 20);
                    
                    // Check triangle inequality theorem
                    if (sideA + sideB > sideC && sideA + sideC > sideB && sideB + sideC > sideA) {
                        validTriangle = true;
                    }
                }
                
                question = `Calculate the perimeter of a triangle with sides ${sideA} units, ${sideB} units, and ${sideC} units.`;
                answer = preciseRound(sideA + sideB + sideC, 2);
                explanation = `The perimeter of a triangle is the sum of all three sides.\n\nPerimeter = a + b + c = ${sideA} + ${sideB} + ${sideC} = ${answer} units`;
            } 
            else if (triangleType === "isosceles") {
                const base = useDecimals ? 
                    preciseRound(randomFloat(6, 15), 1) : 
                    randomInt(6, 15);
                    
                const equalSides = useDecimals ? 
                    preciseRound(randomFloat(8, 20), 1) : 
                    randomInt(8, 20);
                    
                question = `Find the perimeter of an isosceles triangle with two equal sides of ${equalSides} units each and a base of ${base} units.`;
                answer = preciseRound(2 * equalSides + base, 2);
                explanation = `The perimeter of an isosceles triangle is the sum of all three sides, where two sides are equal.\n\nPerimeter = 2 × equal side + base = 2 × ${equalSides} + ${base} = ${2 * equalSides} + ${base} = ${answer} units`;
            } 
            else if (triangleType === "equilateral") {
                const side = useDecimals ? 
                    preciseRound(randomFloat(5, 20), 1) : 
                    randomInt(5, 20);
                    
                question = `Calculate the perimeter of an equilateral triangle with side length ${side} units.`;
                answer = preciseRound(3 * side, 2);
                explanation = `The perimeter of an equilateral triangle is three times its side length, since all sides are equal.\n\nPerimeter = 3 × side = 3 × ${side} = ${answer} units`;
            }
            else { // right triangle
                const useTriples = Math.random() < 0.5 && !useDecimals;
                let sideA, sideB, hypotenuse;
                
                if (useTriples) {
                    // Use Pythagorean triples
                    const triples = [
                        {a: 3, b: 4, c: 5},
                        {a: 5, b: 12, c: 13},
                        {a: 8, b: 15, c: 17},
                        {a: 7, b: 24, c: 25}
                    ];
                    
                    const triple = triples[Math.floor(Math.random() * triples.length)];
                    const scaleFactor = randomInt(1, 3);
                    sideA = triple.a * scaleFactor;
                    sideB = triple.b * scaleFactor;
                    hypotenuse = triple.c * scaleFactor;
                } else {
                    sideA = useDecimals ? 
                        preciseRound(randomFloat(3, 12), 1) : 
                        randomInt(3, 12);
                        
                    sideB = useDecimals ? 
                        preciseRound(randomFloat(4, 15), 1) : 
                        randomInt(4, 15);
                        
                    hypotenuse = preciseRound(Math.sqrt(sideA * sideA + sideB * sideB), 2);
                }
                
                question = `Find the perimeter of a right triangle with legs of length ${sideA} units and ${sideB} units.`;
                answer = preciseRound(sideA + sideB + hypotenuse, 2);
                explanation = `For a right triangle with legs a and b, we can find the hypotenuse using the Pythagorean theorem: c² = a² + b².\n\nc² = ${sideA}² + ${sideB}² = ${sideA * sideA} + ${sideB * sideB} = ${sideA * sideA + sideB * sideB}\nc = √${sideA * sideA + sideB * sideB} = ${hypotenuse} units\n\nThe perimeter is the sum of all three sides: a + b + c = ${sideA} + ${sideB} + ${hypotenuse} = ${answer} units`;
            }
            break;
            
        case "circle":
            const radius = useDecimals ? 
                preciseRound(randomFloat(3, 15), 1) : 
                randomInt(3, 15);
                
            const askByDiameter = Math.random() > 0.5;
            
            if (askByDiameter) {
                const diameter = preciseRound(2 * radius, 1);
                question = `Find the circumference of a circle with diameter ${diameter} units. (Use π = 3.14)`;
                answer = preciseRound(Math.PI * diameter, 2);
                explanation = `The circumference of a circle can be calculated using the formula:\nCircumference = π × diameter = 3.14 × ${diameter} = ${answer} units`;
            } else {
                question = `What is the circumference of a circle with radius ${radius} units? (Use π = 3.14)`;
                answer = preciseRound(2 * Math.PI * radius, 2);
                explanation = `The circumference of a circle can be calculated using the formula:\nCircumference = 2 × π × radius = 2 × 3.14 × ${radius} = ${answer} units`;
            }
            break;
            
        case "semicircle":
            const semiRadius = useDecimals ? 
                preciseRound(randomFloat(3, 15), 1) : 
                randomInt(3, 15);
                
            const diameter = preciseRound(2 * semiRadius, 1);
            
            question = `Calculate the perimeter of a semicircle with radius ${semiRadius} units. (Use π = 3.14)`;
            answer = preciseRound(Math.PI * semiRadius + diameter, 2);
            explanation = `The perimeter of a semicircle is the sum of the semicircular arc and the diameter.\n\nPerimeter = π × radius + diameter = 3.14 × ${semiRadius} + ${diameter} = ${preciseRound(Math.PI * semiRadius, 2)} + ${diameter} = ${answer} units`;
            break;
            
        case "polygon":
            // Regular polygon perimeter
            const sides = randomInt(5, 10); // Pentagon to decagon
            const sideLength = useDecimals ? 
                preciseRound(randomFloat(3, 15), 1) : 
                randomInt(3, 15);
                
            const polygonNames = {
                5: "pentagon",
                6: "hexagon",
                7: "heptagon",
                8: "octagon",
                9: "nonagon",
                10: "decagon"
            };
            
            question = `What is the perimeter of a regular ${polygonNames[sides]} with side length ${sideLength} units?`;
            answer = preciseRound(sides * sideLength, 2);
            explanation = `A regular ${polygonNames[sides]} has ${sides} equal sides. The perimeter is the sum of all side lengths.\n\nPerimeter = number of sides × side length = ${sides} × ${sideLength} = ${answer} units`;
            break;
            
        case "composite":
            // Composite shape perimeter problem
            const compositeTypes = ["rectangle+semicircle", "square+triangle"];
            const compositeType = compositeTypes[Math.floor(Math.random() * compositeTypes.length)];
            
            if (compositeType === "rectangle+semicircle") {
                const rectLength = useDecimals ? 
                    preciseRound(randomFloat(8, 16), 1) : 
                    randomInt(8, 16);
                    
                const rectWidth = useDecimals ? 
                    preciseRound(randomFloat(5, 12), 1) : 
                    randomInt(5, 12);
                    
                const circleRadius = rectWidth / 2;
                
                // The perimeter includes: 3 sides of rectangle + semicircular arc
                const rectPart = 2 * rectLength + rectWidth;
                const arcPart = Math.PI * circleRadius;
                const totalPerimeter = rectPart + arcPart;
                
                question = `A shape consists of a rectangle of length ${rectLength} units and width ${rectWidth} units with a semicircle attached to one of its shorter sides. Calculate the perimeter of this shape. (Use π = 3.14)`;
                answer = preciseRound(totalPerimeter, 2);
                explanation = `To find the perimeter, we add the three straight sides of the rectangle and the semicircular arc.\n\nRectangle sides = 2 × length + 1 × width = 2 × ${rectLength} + 1 × ${rectWidth} = ${rectPart} units\n\nSemicircular arc = π × radius = 3.14 × ${circleRadius} = ${preciseRound(arcPart, 2)} units\n\nTotal perimeter = Rectangle part + Semicircular arc = ${rectPart} + ${preciseRound(arcPart, 2)} = ${answer} units`;
            }
            else { // square+triangle
                // Create a square with an equilateral triangle on one side
                const squareSide = useDecimals ? 
                    preciseRound(randomFloat(6, 15), 1) : 
                    randomInt(6, 15);
                    
                // Calculate the perimeter: 3 sides of square + 2 sides of triangle
                const perimeter = 3 * squareSide + 2 * squareSide;
                
                question = `A shape consists of a square with side length ${squareSide} units and an equilateral triangle attached to one side of the square. The triangle's side length equals the square's side length. What is the perimeter of this composite shape?`;
                answer = preciseRound(perimeter, 2);
                explanation = `To find the perimeter, we count each edge of the composite shape that forms its boundary.\n\nSquare edges = 3 sides (one side is shared with the triangle) = 3 × ${squareSide} = ${3 * squareSide} units\n\nTriangle edges = 2 sides (one side is shared with the square) = 2 × ${squareSide} = ${2 * squareSide} units\n\nTotal perimeter = Square edges + Triangle edges = ${3 * squareSide} + ${2 * squareSide} = ${answer} units`;
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

// Function to generate multiple choice options
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
    
    // Common errors in geometry calculations
    if (value > 4) {
        // Common errors like forgetting to divide by 2 in triangle area
        variations.push(preciseRound(value * 2, 2));
        variations.push(preciseRound(value / 2, 2));
    }
    
    if (value > 1) {
        // Common error of using radius instead of diameter or vice versa
        variations.push(preciseRound(value * Math.PI / 2, 2));
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