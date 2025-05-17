// Geometry Problems Generator (Area, Perimeter, Volume)
// This file integrates area, perimeter, and volume problem generation

// Import the specialized problem generator functions
// Note: In an actual implementation, these would be imported from separate files

function generateGeometryProblem() {
    // Select a problem subcategory: area, perimeter, or volume
    const subCategories = ["area", "perimeter", "volume"];
    const subCategory = subCategories[Math.floor(Math.random() * subCategories.length)];
    
    let problem;
    
    if (subCategory === "area") {
        problem = generateAreaProblem();
    } else if (subCategory === "perimeter") {
        problem = generatePerimeterProblem();
    } else {
        problem = generateVolumeProblem();
    }
    
    return problem;
}

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