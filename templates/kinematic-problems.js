// Kinematic Problems Generator
// This file contains functions to generate problems related to speed, velocity, acceleration, etc.

function generateKinematicProblem() {
    // Decide which type of kinematic problem to generate
    const problemTypes = [
        "speed_distance_time",
        "acceleration",
        "relative_velocity",
        "projectile_motion",
        "uniform_motion",
        "average_velocity"
    ];
    
    const problemType = problemTypes[Math.floor(Math.random() * problemTypes.length)];
    
    let problem;
    
    switch(problemType) {
        case "speed_distance_time":
            problem = generateSpeedDistanceTimeProblem();
            break;
        case "acceleration":
            problem = generateAccelerationProblem();
            break;
        case "relative_velocity":
            problem = generateRelativeVelocityProblem();
            break;
        case "projectile_motion":
            problem = generateProjectileMotionProblem();
            break;
        case "uniform_motion":
            problem = generateUniformMotionProblem();
            break;
        case "average_velocity":
            problem = generateAverageVelocityProblem();
            break;
        default:
            problem = generateSpeedDistanceTimeProblem();
    }
    
    // Add an explanation if there isn't one already
    if (!problem.explanation) {
        problem.explanation = generateKinematicExplanation(problem);
    }
    
    return problem;
}

// Generate a problem about speed, distance, and time relationships
function generateSpeedDistanceTimeProblem() {
    const scenarios = [
        {
            template: "A car travels {distance} kilometers in {time} hours. What is its average speed in km/h?",
            solve: (distance, time) => distance / time,
            explanation: (distance, time, answer) => 
                `To find the average speed, we use the formula:\n\nspeed = distance ÷ time\n\n` +
                `speed = ${distance} km ÷ ${time} hours\n` +
                `speed = ${answer} km/h`
        },
        {
            template: "A cyclist moves at {speed} km/h for {time} hours. How far does the cyclist travel?",
            solve: (speed, time) => speed * time,
            explanation: (speed, time, answer) => 
                `To find the distance traveled, we use the formula:\n\ndistance = speed × time\n\n` +
                `distance = ${speed} km/h × ${time} hours\n` +
                `distance = ${answer} km`
        },
        {
            template: "If a train travels at {speed} km/h, how long will it take to cover a distance of {distance} kilometers?",
            solve: (speed, distance) => distance / speed,
            explanation: (speed, distance, answer) =>
                `To find the time taken, we use the formula:\n\ntime = distance ÷ speed\n\n` +
                `time = ${distance} km ÷ ${speed} km/h\n` +
                `time = ${answer} hours`
        }
    ];
    
    const scenario = scenarios[Math.floor(Math.random() * scenarios.length)];
    let distance, time, speed, answer;
    
    if (scenario.template.includes("{distance}") && scenario.template.includes("{time}")) {
        // Find speed given distance and time
        distance = randomInt(50, 500);
        time = randomInt(1, 10);
        answer = scenario.solve(distance, time);
    } else if (scenario.template.includes("{speed}") && scenario.template.includes("{time}")) {
        // Find distance given speed and time
        speed = randomInt(20, 120);
        time = randomInt(1, 8);
        answer = scenario.solve(speed, time);
    } else {
        // Find time given speed and distance
        speed = randomInt(40, 150);
        distance = randomInt(100, 800);
        answer = scenario.solve(speed, distance);
    }
    
    // Round the answer to 2 decimal places
    answer = preciseRound(answer, 2);
    
    // Generate the question text by replacing placeholders
    let question = scenario.template;
    if (question.includes("{distance}")) question = question.replace("{distance}", distance);
    if (question.includes("{time}")) question = question.replace("{time}", time);
    if (question.includes("{speed}")) question = question.replace("{speed}", speed);
    
    // Generate the explanation
    let explanation;
    if (scenario.template.includes("{distance}") && scenario.template.includes("{time}")) {
        explanation = scenario.explanation(distance, time, answer);
    } else if (scenario.template.includes("{speed}") && scenario.template.includes("{time}")) {
        explanation = scenario.explanation(speed, time, answer);
    } else {
        explanation = scenario.explanation(speed, distance, answer);
    }
    
    // Generate options
    const options = generateKinematicOptions(answer);
    
    return {
        type: "kinematics",
        question: question,
        options: options,
        correct_answer: answer,
        explanation: explanation
    };
}

// Generate a problem about acceleration
function generateAccelerationProblem() {
    const scenarios = [
        {
            template: "A car accelerates from {initial_velocity} m/s to {final_velocity} m/s in {time} seconds. What is its acceleration in m/s²?",
            solve: (v0, v, t) => (v - v0) / t,
            explanation: (v0, v, t, answer) =>
                `To find acceleration, we use the formula:\n\na = (v - v₀) ÷ t\n\n` +
                `where v is the final velocity, v₀ is the initial velocity, and t is the time taken.\n\n` +
                `a = (${v} m/s - ${v0} m/s) ÷ ${t} s\n` +
                `a = ${v - v0} m/s ÷ ${t} s\n` +
                `a = ${answer} m/s²`
        },
        {
            template: "A bicycle rider accelerates at {acceleration} m/s² for {time} seconds, starting from rest. What is the final velocity in m/s?",
            solve: (a, t) => a * t,
            explanation: (a, t, answer) =>
                `When starting from rest (v₀ = 0), the final velocity can be calculated using:\n\n` +
                `v = v₀ + a × t\n` +
                `v = 0 + ${a} m/s² × ${t} s\n` +
                `v = ${answer} m/s`
        },
        {
            template: "A train with initial velocity {initial_velocity} m/s accelerates at {acceleration} m/s² for {time} seconds. What is its final velocity in m/s?",
            solve: (v0, a, t) => v0 + a * t,
            explanation: (v0, a, t, answer) =>
                `To find the final velocity, we use the formula:\n\n` +
                `v = v₀ + a × t\n\n` +
                `where v₀ is the initial velocity, a is the acceleration, and t is the time.\n\n` +
                `v = ${v0} m/s + ${a} m/s² × ${t} s\n` +
                `v = ${v0} m/s + ${a * t} m/s\n` +
                `v = ${answer} m/s`
        },
        {
            template: "A car with initial velocity {initial_velocity} m/s accelerates to {final_velocity} m/s over a distance of {distance} meters. What is its acceleration in m/s²?",
            solve: (v0, v, d) => (v * v - v0 * v0) / (2 * d),
            explanation: (v0, v, d, answer) =>
                `To find acceleration when given distances, we use the formula:\n\n` +
                `v² = v₀² + 2ad\n\n` +
                `Rearranging to solve for a:\n\n` +
                `a = (v² - v₀²) ÷ (2d)\n\n` +
                `a = ((${v})² - (${v0})²) ÷ (2 × ${d})\n` +
                `a = (${v * v} - ${v0 * v0}) ÷ ${2 * d}\n` +
                `a = ${v * v - v0 * v0} ÷ ${2 * d}\n` +
                `a = ${answer} m/s²`
        }
    ];
    
    const scenario = scenarios[Math.floor(Math.random() * scenarios.length)];
    let initial_velocity, final_velocity, time, acceleration, distance, answer;
    
    if (scenario.template.includes("{initial_velocity}") && scenario.template.includes("{final_velocity}") && scenario.template.includes("{time}")) {
        // Find acceleration given initial velocity, final velocity, and time
        initial_velocity = randomInt(0, 20);
        final_velocity = initial_velocity + randomInt(10, 40); // Ensure final > initial
        time = randomInt(2, 15);
        answer = scenario.solve(initial_velocity, final_velocity, time);
    } else if (scenario.template.includes("{acceleration}") && scenario.template.includes("{time}")) {
        // Find final velocity given acceleration and time (starting from rest)
        acceleration = randomInt(1, 10);
        time = randomInt(3, 15);
        answer = scenario.solve(acceleration, time);
    } else if (scenario.template.includes("{initial_velocity}") && scenario.template.includes("{acceleration}") && scenario.template.includes("{time}")) {
        // Find final velocity given initial velocity, acceleration, and time
        initial_velocity = randomInt(5, 30);
        acceleration = randomInt(1, 10);
        time = randomInt(2, 12);
        answer = scenario.solve(initial_velocity, acceleration, time);
    } else {
        // Find acceleration given initial velocity, final velocity, and distance
        initial_velocity = randomInt(0, 20);
        final_velocity = initial_velocity + randomInt(10, 40); // Ensure final > initial
        distance = randomInt(50, 500);
        answer = scenario.solve(initial_velocity, final_velocity, distance);
    }
    
    // Round the answer to 2 decimal places
    answer = preciseRound(answer, 2);
    
    // Generate the question text by replacing placeholders
    let question = scenario.template;
    if (question.includes("{initial_velocity}")) question = question.replace("{initial_velocity}", initial_velocity);
    if (question.includes("{final_velocity}")) question = question.replace("{final_velocity}", final_velocity);
    if (question.includes("{time}")) question = question.replace("{time}", time);
    if (question.includes("{acceleration}")) question = question.replace("{acceleration}", acceleration);
    if (question.includes("{distance}")) question = question.replace("{distance}", distance);
    
    // Generate the explanation
    let explanation;
    if (scenario.template.includes("{initial_velocity}") && scenario.template.includes("{final_velocity}") && scenario.template.includes("{time}")) {
        explanation = scenario.explanation(initial_velocity, final_velocity, time, answer);
    } else if (scenario.template.includes("{acceleration}") && scenario.template.includes("{time}")) {
        explanation = scenario.explanation(acceleration, time, answer);
    } else if (scenario.template.includes("{initial_velocity}") && scenario.template.includes("{acceleration}") && scenario.template.includes("{time}")) {
        explanation = scenario.explanation(initial_velocity, acceleration, time, answer);
    } else {
        explanation = scenario.explanation(initial_velocity, final_velocity, distance, answer);
    }
    
    // Generate options
    const options = generateKinematicOptions(answer);
    
    return {
        type: "kinematics",
        question: question,
        options: options,
        correct_answer: answer,
        explanation: explanation
    };
}

// Generate a problem about relative velocity
function generateRelativeVelocityProblem() {
    const scenarios = [
        {
            template: "Two cars are moving in the same direction. If car A moves at {velocity_a} km/h and car B moves at {velocity_b} km/h, what is the velocity of car A relative to car B in km/h?",
            solve: (vA, vB) => vA - vB,
            explanation: (vA, vB, answer) =>
                `When two objects are moving in the same direction, the relative velocity is the difference of their velocities.\n\n` +
                `relative velocity = velocity of A - velocity of B\n\n` +
                `relative velocity = ${vA} km/h - ${vB} km/h\n` +
                `relative velocity = ${answer} km/h\n\n` +
                `${answer > 0 ? 'Since the result is positive, car A is moving faster than car B.' : 
                  answer < 0 ? 'Since the result is negative, car B is moving faster than car A.' :
                  'Since the result is zero, both cars are moving at the same speed.'}`
        },
        {
            template: "Two trains are moving in opposite directions. If train A moves at {velocity_a} km/h and train B moves at {velocity_b} km/h, what is the relative velocity between them in km/h?",
            solve: (vA, vB) => vA + vB,
            explanation: (vA, vB, answer) =>
                `When two objects are moving in opposite directions, the relative velocity is the sum of their velocities.\n\n` +
                `relative velocity = velocity of A + velocity of B\n\n` +
                `relative velocity = ${vA} km/h + ${vB} km/h\n` +
                `relative velocity = ${answer} km/h`
        },
        {
            template: "A boat moves at {boat_speed} km/h in still water. If the boat travels upstream against a river current of {current_speed} km/h, what is the boat's velocity relative to the shore in km/h?",
            solve: (vBoat, vCurrent) => vBoat - vCurrent,
            explanation: (vBoat, vCurrent, answer) =>
                `When a boat travels upstream (against the current), its velocity relative to the shore is:\n\n` +
                `effective velocity = boat speed - current speed\n\n` +
                `effective velocity = ${vBoat} km/h - ${vCurrent} km/h\n` +
                `effective velocity = ${answer} km/h`
        },
        {
            template: "A boat moves at {boat_speed} km/h in still water. If the boat travels downstream with a river current of {current_speed} km/h, what is the boat's velocity relative to the shore in km/h?",
            solve: (vBoat, vCurrent) => vBoat + vCurrent,
            explanation: (vBoat, vCurrent, answer) =>
                `When a boat travels downstream (with the current), its velocity relative to the shore is:\n\n` +
                `effective velocity = boat speed + current speed\n\n` +
                `effective velocity = ${vBoat} km/h + ${vCurrent} km/h\n` +
                `effective velocity = ${answer} km/h`
        }
    ];
    
    const scenario = scenarios[Math.floor(Math.random() * scenarios.length)];
    let velocity_a, velocity_b, boat_speed, current_speed, answer;
    
    if (scenario.template.includes("{velocity_a}") && scenario.template.includes("{velocity_b}")) {
        if (scenario.template.includes("same direction")) {
            velocity_a = randomInt(60, 140);
            velocity_b = randomInt(30, 120);
        } else {  // opposite directions
            velocity_a = randomInt(50, 150);
            velocity_b = randomInt(50, 150);
        }
        answer = scenario.solve(velocity_a, velocity_b);
    } else {  // River current scenarios
        boat_speed = randomInt(10, 40);
        current_speed = randomInt(2, 15);
        // Make sure boat speed is always greater than current speed for upstream travel
        if (scenario.template.includes("upstream") && boat_speed <= current_speed) {
            boat_speed = current_speed + randomInt(5, 20);
        }
        answer = scenario.solve(boat_speed, current_speed);
    }
    
    // Round the answer to 2 decimal places
    answer = preciseRound(answer, 2);
    
    // Generate the question text by replacing placeholders
    let question = scenario.template;
    if (question.includes("{velocity_a}")) question = question.replace("{velocity_a}", velocity_a);
    if (question.includes("{velocity_b}")) question = question.replace("{velocity_b}", velocity_b);
    if (question.includes("{boat_speed}")) question = question.replace("{boat_speed}", boat_speed);
    if (question.includes("{current_speed}")) question = question.replace("{current_speed}", current_speed);
    
    // Generate the explanation
    let explanation;
    if (scenario.template.includes("{velocity_a}") && scenario.template.includes("{velocity_b}")) {
        explanation = scenario.explanation(velocity_a, velocity_b, answer);
    } else {
        explanation = scenario.explanation(boat_speed, current_speed, answer);
    }
    
    // Generate options
    const options = generateKinematicOptions(answer);
    
    return {
        type: "kinematics",
        question: question,
        options: options,
        correct_answer: answer,
        explanation: explanation
    };
}

// Generate a problem about projectile motion
function generateProjectileMotionProblem() {
    const g = 9.8; // acceleration due to gravity in m/s²
    
    const scenarios = [
        {
            template: "A ball is thrown horizontally from a height of {height} meters with an initial velocity of {velocity} m/s. How far horizontally will the ball travel before hitting the ground? (Use g = 9.8 m/s²)",
            solve: (h, v0) => v0 * Math.sqrt(2 * h / g),
            explanation: (h, v0, answer) =>
                `For a horizontally thrown projectile, we need to find how long it takes to hit the ground, then multiply by the horizontal velocity.\n\n` +
                `First, find the time to hit the ground using:\n` +
                `h = (1/2)gt²\n` +
                `${h} = (1/2) × 9.8 × t²\n` +
                `t² = (2 × ${h}) ÷ 9.8\n` +
                `t² = ${2 * h / 9.8}\n` +
                `t = ${Math.sqrt(2 * h / g)} seconds\n\n` +
                `The horizontal distance is:\n` +
                `d = v₀ × t\n` +
                `d = ${v0} × ${Math.sqrt(2 * h / g).toFixed(3)}\n` +
                `d = ${answer} meters`
        },
        {
            template: "A projectile is launched at an angle of 45° with an initial velocity of {velocity} m/s. What is its maximum height in meters? (Use g = 9.8 m/s²)",
            solve: (v0) => Math.pow(v0 * Math.sin(Math.PI/4), 2) / (2 * g),
            explanation: (v0, answer) =>
                `For a projectile launched at angle θ, the maximum height is found using:\n\n` +
                `h_max = (v₀ × sin θ)² ÷ (2g)\n\n` +
                `At 45°, sin θ = sin(45°) = 0.7071\n\n` +
                `h_max = (${v0} × 0.7071)² ÷ (2 × 9.8)\n` +
                `h_max = (${v0 * 0.7071})² ÷ 19.6\n` +
                `h_max = ${Math.pow(v0 * 0.7071, 2)} ÷ 19.6\n` +
                `h_max = ${answer} meters`
        },
        {
            template: "A projectile is launched at an angle of 30° with an initial velocity of {velocity} m/s. What is its horizontal range in meters? (Use g = 9.8 m/s²)",
            solve: (v0) => (Math.pow(v0, 2) * Math.sin(Math.PI/3)) / g,
            explanation: (v0, answer) =>
                `For a projectile launched at angle θ, the horizontal range is found using:\n\n` +
                `R = (v₀² × sin(2θ)) ÷ g\n\n` +
                `For θ = 30°, sin(2θ) = sin(60°) = 0.866\n\n` +
                `R = (${v0}² × 0.866) ÷ 9.8\n` +
                `R = (${v0 * v0} × 0.866) ÷ 9.8\n` +
                `R = ${v0 * v0 * 0.866} ÷ 9.8\n` +
                `R = ${answer} meters`
        },
        {
            template: "A ball is thrown upward with an initial velocity of {velocity} m/s. How long will it take to reach its maximum height in seconds? (Use g = 9.8 m/s²)",
            solve: (v0) => v0 / g,
            explanation: (v0, answer) =>
                `For an object thrown vertically upward, the time to reach maximum height is:\n\n` +
                `t = v₀ ÷ g\n\n` +
                `where v₀ is the initial velocity and g is the acceleration due to gravity.\n\n` +
                `t = ${v0} ÷ 9.8\n` +
                `t = ${answer} seconds\n\n` +
                `At this point, the vertical velocity becomes zero before the object starts falling back down.`
        }
    ];
    
    const scenario = scenarios[Math.floor(Math.random() * scenarios.length)];
    let height, velocity, answer;
    
    if (scenario.template.includes("{height}") && scenario.template.includes("{velocity}")) {
        // Horizontal projectile
        height = randomInt(5, 50);
        velocity = randomInt(5, 30);
        answer = scenario.solve(height, velocity);
    } else if (scenario.template.includes("{velocity}")) {
        // Angled or vertical projectile
        velocity = randomInt(10, 50);
        answer = scenario.solve(velocity);
    }
    
    // Round the answer to 2 decimal places
    answer = preciseRound(answer, 2);
    
    // Generate the question text by replacing placeholders
    let question = scenario.template;
    if (question.includes("{height}")) question = question.replace("{height}", height);
    if (question.includes("{velocity}")) question = question.replace("{velocity}", velocity);
    
    // Generate the explanation
    let explanation;
    if (scenario.template.includes("{height}") && scenario.template.includes("{velocity}")) {
        explanation = scenario.explanation(height, velocity, answer);
    } else {
        explanation = scenario.explanation(velocity, answer);
    }
    
    // Generate options
    const options = generateKinematicOptions(answer);
    
    return {
        type: "kinematics",
        question: question,
        options: options,
        correct_answer: answer,
        explanation: explanation
    };
}

// Generate a problem about uniform motion
function generateUniformMotionProblem() {
    const scenarios = [
        {
            template: "Two cars start from points {distance} km apart and move toward each other. If one car moves at {velocity_a} km/h and the other at {velocity_b} km/h, how long will it take for them to meet in hours?",
            solve: (d, vA, vB) => d / (vA + vB),
            explanation: (d, vA, vB, answer) =>
                `When two objects move toward each other, the time until they meet is:\n\n` +
                `t = total distance ÷ (speed of A + speed of B)\n\n` +
                `t = ${d} km ÷ (${vA} km/h + ${vB} km/h)\n` +
                `t = ${d} km ÷ ${vA + vB} km/h\n` +
                `t = ${answer} hours`
        },
        {
            template: "A car and a truck start from the same point moving in the same direction. The car moves at {velocity_a} km/h and the truck moves at {velocity_b} km/h. If the car starts {time} hours after the truck, how long will it take for the car to catch up with the truck (from the car's start time) in hours?",
            solve: (vA, vB, t) => (vB * t) / (vA - vB),
            explanation: (vA, vB, t, answer) =>
                `When a faster object catches up to a slower one that had a head start:\n\n` +
                `Let's calculate the distance the truck travels before the car starts:\n` +
                `d = truck speed × head start time\n` +
                `d = ${vB} km/h × ${t} h = ${vB * t} km\n\n` +
                `For the car to catch up, it must cover this distance. The relative speed is (car speed - truck speed):\n\n` +
                `catch-up time = distance ÷ relative speed\n` +
                `catch-up time = ${vB * t} km ÷ (${vA} km/h - ${vB} km/h)\n` +
                `catch-up time = ${vB * t} km ÷ ${vA - vB} km/h\n` +
                `catch-up time = ${answer} hours`
        },
        {
            template: "Two trains are {distance} km apart on parallel tracks. They start moving toward each other at the same time with speeds of {velocity_a} km/h and {velocity_b} km/h. How far apart will they be {time} hours after they start?",
            solve: (d, vA, vB, t) => Math.max(0, d - (vA + vB) * t),
            explanation: (d, vA, vB, t, answer) => {
                const meetingTime = d / (vA + vB);
                
                if (t >= meetingTime) {
                    return `The trains start ${d} km apart and move toward each other at speeds of ${vA} km/h and ${vB} km/h.\n\n` +
                           `The time it takes for them to meet is:\n` +
                           `meeting time = ${d} km ÷ (${vA} km/h + ${vB} km/h)\n` +
                           `meeting time = ${d} km ÷ ${vA + vB} km/h\n` +
                           `meeting time = ${meetingTime.toFixed(2)} hours\n\n` +
                           `Since ${t} hours is greater than or equal to the meeting time (${meetingTime.toFixed(2)} hours), the trains have already passed each other.\n\n` +
                           `After they pass, they continue moving away from each other, but the question asks for their distance apart at ${t} hours, which is ${answer} km.`;
                } else {
                    return `The trains start ${d} km apart and move toward each other.\n\n` +
                           `In ${t} hours, the first train moves: ${vA} km/h × ${t} h = ${vA * t} km\n` +
                           `The second train moves: ${vB} km/h × ${t} h = ${vB * t} km\n\n` +
                           `Total distance covered by both trains: ${vA * t} km + ${vB * t} km = ${(vA + vB) * t} km\n\n` +
                           `Remaining distance between them: ${d} km - ${(vA + vB) * t} km = ${answer} km`;
                }
            }
        },
        {
            template: "A boat can travel at {boat_speed} km/h in still water. If it takes {time_upstream} hours to travel {distance} km upstream and {time_downstream} hours to return downstream, what is the speed of the river current in km/h?",
            solve: (vBoat, tUp, tDown, d) => (d/tDown - d/tUp) / 2,
            explanation: (vBoat, tUp, tDown, d, answer) =>
                `Let the river current speed be c km/h.\n\n` +
                `Upstream speed = boat speed - current = ${vBoat} - c km/h\n` +
                `Downstream speed = boat speed + current = ${vBoat} + c km/h\n\n` +
                `For upstream travel:\n` +
                `${tUp} h = ${d} km ÷ (${vBoat} - c) km/h\n` +
                `${vBoat} - c = ${d} ÷ ${tUp} = ${d/tUp} km/h\n\n` +
                `For downstream travel:\n` +
                `${tDown} h = ${d} km ÷ (${vBoat} + c) km/h\n` +
                `${vBoat} + c = ${d} ÷ ${tDown} = ${d/tDown} km/h\n\n` +
                `Subtracting the first equation from the second:\n` +
                `2c = ${d/tDown} - ${d/tUp} = ${d/tDown - d/tUp} km/h\n` +
                `c = ${answer} km/h`
        }
    ];
    
    const scenario = scenarios[Math.floor(Math.random() * scenarios.length)];
    let distance, velocity_a, velocity_b, time, time_upstream, time_downstream, boat_speed, answer;
    
    if (scenario.template.includes("{distance}") && scenario.template.includes("{velocity_a}") && scenario.template.includes("{velocity_b}") && !scenario.template.includes("{time}")) {
        // Two objects moving toward each other
        distance = randomInt(100, 500);
        velocity_a = randomInt(40, 100);
        velocity_b = randomInt(40, 100);
        answer = scenario.solve(distance, velocity_a, velocity_b);
    } else if (scenario.template.includes("{velocity_a}") && scenario.template.includes("{velocity_b}") && scenario.template.includes("{time}") && !scenario.template.includes("{distance}")) {
        // Car catching up to truck
        velocity_a = randomInt(60, 120);
        velocity_b = randomInt(30, 50);
        time = randomInt(1, 5);
        answer = scenario.solve(velocity_a, velocity_b, time);
    } else if (scenario.template.includes("{distance}") && scenario.template.includes("{velocity_a}") && scenario.template.includes("{velocity_b}") && scenario.template.includes("{time}")) {
        // Trains on parallel tracks
        distance = randomInt(150, 600);
        velocity_a = randomInt(40, 120);
        velocity_b = randomInt(40, 120);
        // Make time less than meeting time to avoid negative distances
        const meetingTime = distance / (velocity_a + velocity_b);
        time = preciseRound(Math.random() * meetingTime, 2);
        answer = scenario.solve(distance, velocity_a, velocity_b, time);
    } else {
        // Boat upstream/downstream
        boat_speed = randomInt(15, 40);
        distance = randomInt(20, 100);
        // Create realistic current speed (less than boat speed)
        const current_speed = randomInt(2, Math.floor(boat_speed * 0.7));
        // Calculate times based on speeds
        time_upstream = preciseRound(distance / (boat_speed - current_speed), 2);
        time_downstream = preciseRound(distance / (boat_speed + current_speed), 2);
        answer = current_speed;  // We know the answer already
    }
    
    // Round the answer to 2 decimal places
    answer = preciseRound(answer, 2);
    
    // Generate the question text by replacing placeholders
    let question = scenario.template;
    if (question.includes("{distance}")) question = question.replace("{distance}", distance);
    if (question.includes("{velocity_a}")) question = question.replace("{velocity_a}", velocity_a);
    if (question.includes("{velocity_b}")) question = question.replace("{velocity_b}", velocity_b);
    if (question.includes("{time}")) question = question.replace("{time}", time);
    if (question.includes("{time_upstream}")) question = question.replace("{time_upstream}", time_upstream);
    if (question.includes("{time_downstream}")) question = question.replace("{time_downstream}", time_downstream);
    if (question.includes("{boat_speed}")) question = question.replace("{boat_speed}", boat_speed);
    
    // Generate the explanation
    let explanation;
    if (scenario.template.includes("{distance}") && scenario.template.includes("{velocity_a}") && scenario.template.includes("{velocity_b}") && !scenario.template.includes("{time}")) {
        explanation = scenario.explanation(distance, velocity_a, velocity_b, answer);
    } else if (scenario.template.includes("{velocity_a}") && scenario.template.includes("{velocity_b}") && scenario.template.includes("{time}") && !scenario.template.includes("{distance}")) {
        explanation = scenario.explanation(velocity_a, velocity_b, time, answer);
    } else if (scenario.template.includes("{distance}") && scenario.template.includes("{velocity_a}") && scenario.template.includes("{velocity_b}") && scenario.template.includes("{time}")) {
        explanation = scenario.explanation(distance, velocity_a, velocity_b, time, answer);
    } else {
        explanation = scenario.explanation(boat_speed, time_upstream, time_downstream, distance, answer);
    }
    
    // Generate options
    const options = generateKinematicOptions(answer);
    
    return {
        type: "kinematics",
        question: question,
        options: options,
        correct_answer: answer,
        explanation: explanation
    };
}

// Generate a problem about average velocity
function generateAverageVelocityProblem() {
    const scenarios = [
        {
            template: "A car travels at {velocity_1} km/h for {time_1} hours and then at {velocity_2} km/h for {time_2} hours. What is the average velocity for the entire journey in km/h?",
            solve: (v1, t1, v2, t2) => (v1 * t1 + v2 * t2) / (t1 + t2),
            explanation: (v1, t1, v2, t2, answer) =>
                `To find the average velocity, we use the formula:\n\n` +
                `average velocity = total distance ÷ total time\n\n` +
                `Total distance = distance at first speed + distance at second speed\n` +
                `Total distance = (${v1} km/h × ${t1} h) + (${v2} km/h × ${t2} h)\n` +
                `Total distance = ${v1 * t1} km + ${v2 * t2} km = ${v1 * t1 + v2 * t2} km\n\n` +
                `Total time = ${t1} h + ${t2} h = ${t1 + t2} h\n\n` +
                `Average velocity = ${v1 * t1 + v2 * t2} km ÷ ${t1 + t2} h = ${answer} km/h`
        },
        {
            template: "A car travels a distance of {distance} km in {time} hours. For the first half of the distance, it travels at {velocity_1} km/h. What is the speed during the second half of the trip in km/h?",
            solve: (d, t, v1) => {
                const t1 = (d/2)/v1;
                const v2 = (d/2)/(t - t1);
                return v2;
            },
            explanation: (d, t, v1, answer) => {
                const halfDistance = d/2;
                const timeFirstHalf = halfDistance/v1;
                const timeSecondHalf = t - timeFirstHalf;
                
                return `Let's break this down:\n\n` +
                    `Total distance = ${d} km\n` +
                    `First half distance = ${halfDistance} km\n` +
                    `Second half distance = ${halfDistance} km\n\n` +
                    `For the first half at ${v1} km/h:\n` +
                    `time = distance ÷ speed = ${halfDistance} km ÷ ${v1} km/h = ${timeFirstHalf.toFixed(2)} h\n\n` +
                    `Time for second half = total time - first half time\n` +
                    `Time for second half = ${t} h - ${timeFirstHalf.toFixed(2)} h = ${timeSecondHalf.toFixed(2)} h\n\n` +
                    `Speed for second half = distance ÷ time\n` +
                    `Speed for second half = ${halfDistance} km ÷ ${timeSecondHalf.toFixed(2)} h = ${answer} km/h`;
            }
        },
        {
            template: "A runner completes {distance} km in {time} hours. If the runner's speed for the first {first_part} km was {velocity_1} km/h, what was the speed for the remaining distance in km/h?",
            solve: (d, t, dFirst, v1) => {
                const dSecond = d - dFirst;
                const tFirst = dFirst/v1;
                const tSecond = t - tFirst;
                return dSecond/tSecond;
            },
            explanation: (d, t, dFirst, v1, answer) => {
                const dSecond = d - dFirst;
                const tFirst = dFirst/v1;
                const tSecond = t - tFirst;
                
                return `Let's find the speed for the remaining distance:\n\n` +
                    `Total distance = ${d} km\n` +
                    `First part distance = ${dFirst} km\n` +
                    `Remaining distance = ${d} km - ${dFirst} km = ${dSecond} km\n\n` +
                    `For the first part at ${v1} km/h:\n` +
                    `time = distance ÷ speed = ${dFirst} km ÷ ${v1} km/h = ${tFirst.toFixed(2)} h\n\n` +
                    `Time for remaining distance = total time - first part time\n` +
                    `Time for remaining distance = ${t} h - ${tFirst.toFixed(2)} h = ${tSecond.toFixed(2)} h\n\n` +
                    `Speed for remaining distance = distance ÷ time\n` +
                    `Speed for remaining distance = ${dSecond} km ÷ ${tSecond.toFixed(2)} h = ${answer} km/h`;
            }
        },
        {
            template: "A cyclist rides at {velocity_1} km/h uphill and {velocity_2} km/h downhill over the same route. If the total journey takes {time} hours, what is the total distance traveled in km?",
            solve: (v1, v2, t) => {
                // This is a special case where we need to find the distance
                // If time up = time down, then total time = distance × (1/v1 + 1/v2)
                // So distance = total time ÷ (1/v1 + 1/v2)
                return (2 * v1 * v2 * t) / (v1 + v2);
            },
            explanation: (v1, v2, t, answer) => {
                const totalDistance = answer;
                const halfDistance = totalDistance / 2;
                const timeUp = halfDistance / v1;
                const timeDown = halfDistance / v2;
                
                return `Let's denote the one-way distance as d km.\n\n` +
                    `Time for uphill journey at ${v1} km/h: t_up = d ÷ ${v1} = d/${v1} hours\n` +
                    `Time for downhill journey at ${v2} km/h: t_down = d ÷ ${v2} = d/${v2} hours\n\n` +
                    `Total time = t_up + t_down = d/${v1} + d/${v2} = d × (${1/v1} + ${1/v2}) = ${t} hours\n\n` +
                    `Solving for d:\n` +
                    `d = ${t} ÷ (${1/v1} + ${1/v2})\n` +
                    `d = ${t} ÷ ${1/v1 + 1/v2}\n` +
                    `d = ${halfDistance} km (one-way distance)\n\n` +
                    `Total distance traveled (both ways) = 2 × d = 2 × ${halfDistance} = ${answer} km`;
            }
        }
    ];
    
    const scenario = scenarios[Math.floor(Math.random() * scenarios.length)];
    let distance, time, velocity_1, velocity_2, time_1, time_2, first_part, answer;
    
    if (scenario.template.includes("{velocity_1}") && scenario.template.includes("{time_1}") && scenario.template.includes("{velocity_2}") && scenario.template.includes("{time_2}")) {
        // Average velocity with two different speeds and times
        velocity_1 = randomInt(40, 100);
        velocity_2 = randomInt(30, 120);
        time_1 = randomInt(1, 5);
        time_2 = randomInt(1, 5);
        answer = scenario.solve(velocity_1, time_1, velocity_2, time_2);
    } else if (scenario.template.includes("{distance}") && scenario.template.includes("{time}") && scenario.template.includes("{velocity_1}") && scenario.template.includes("{first_part}")) {
        // Speed for remaining distance after first part
        distance = randomInt(40, 120);
        first_part = randomInt(10, distance/2);
        velocity_1 = randomInt(30, 80);
        // Make sure the remaining distance requires a realistic speed
        const timeFirstPart = first_part / velocity_1;
        time = timeFirstPart + randomInt(1, 3);
        answer = scenario.solve(distance, time, first_part, velocity_1);
    } else if (scenario.template.includes("{distance}") && scenario.template.includes("{time}") && scenario.template.includes("{velocity_1}")) {
        // Speed during second half of distance
        distance = randomInt(40, 120);
        velocity_1 = randomInt(30, 80);
        // Make sure the second half requires a realistic speed
        const timeFirstHalf = (distance/2) / velocity_1;
        time = timeFirstHalf + randomInt(1, 3);
        answer = scenario.solve(distance, time, velocity_1);
    } else {
        // Cyclist uphill/downhill problem
        velocity_1 = randomInt(10, 20);  // Uphill speed
        velocity_2 = randomInt(25, 45);  // Downhill speed (faster)
        time = randomInt(2, 6);
        answer = scenario.solve(velocity_1, velocity_2, time);
    }
    
    // Round the answer to 2 decimal places
    answer = preciseRound(answer, 2);
    
    // Generate the question text by replacing placeholders
    let question = scenario.template;
    if (question.includes("{distance}")) question = question.replace("{distance}", distance);
    if (question.includes("{time}")) question = question.replace("{time}", time);
    if (question.includes("{velocity_1}")) question = question.replace("{velocity_1}", velocity_1);
    if (question.includes("{velocity_2}")) question = question.replace("{velocity_2}", velocity_2);
    if (question.includes("{time_1}")) question = question.replace("{time_1}", time_1);
    if (question.includes("{time_2}")) question = question.replace("{time_2}", time_2);
    if (question.includes("{first_part}")) question = question.replace("{first_part}", first_part);
    
    // Generate the explanation
    let explanation;
    if (scenario.template.includes("{velocity_1}") && scenario.template.includes("{time_1}") && scenario.template.includes("{velocity_2}") && scenario.template.includes("{time_2}")) {
        explanation = scenario.explanation(velocity_1, time_1, velocity_2, time_2, answer);
    } else if (scenario.template.includes("{distance}") && scenario.template.includes("{time}") && scenario.template.includes("{velocity_1}") && scenario.template.includes("{first_part}")) {
        explanation = scenario.explanation(distance, time, first_part, velocity_1, answer);
    } else if (scenario.template.includes("{distance}") && scenario.template.includes("{time}") && scenario.template.includes("{velocity_1}")) {
        explanation = scenario.explanation(distance, time, velocity_1, answer);
    } else {
        explanation = scenario.explanation(velocity_1, velocity_2, time, answer);
    }
    
    // Generate options
    const options = generateKinematicOptions(answer);
    
    return {
        type: "kinematics",
        question: question,
        options: options,
        correct_answer: answer,
        explanation: explanation
    };
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

function generateKinematicExplanation(problem) {
    const answer = problem.correct_answer;
    const questionType = problem.type;
    
    return `This is a ${questionType} problem involving motion concepts.\n\n` +
           `The answer is ${answer}, which was calculated using the appropriate kinematic equations for this scenario.\n\n` +
           `Remember to pay attention to the units and make sure your calculations maintain dimensional consistency.`;
}

function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function preciseRound(num, decimals) {
    const factor = Math.pow(10, decimals);
    return Math.round((num + Number.EPSILON) * factor) / factor;
}