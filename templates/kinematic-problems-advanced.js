`Impulse is defined as the change in momentum:\n\n` +
                `Impulse = m × (v_final - v_initial)\n\n` +
                `When the impulse is applied in the opposite direction to motion:\n` +
                `-${impulse} N⋅s = ${m} kg × (v_final - ${v} m/s)\n` +
                `v_final = ${v} m/s - ${impulse} N⋅s ÷ ${m} kg\n` +
                `v_final = ${v} m/s - ${impulse / m} m/s = ${answer} m/s`
        },
        {
            template: "A {mass} kg bullet is fired horizontally into a {block_mass} kg wooden block that is at rest. The bullet becomes embedded in the block. If the combined bullet and block moves at {final_velocity} m/s, what was the initial velocity of the bullet in m/s?",
            solve: (m, blockMass, finalV) => finalV * (m + blockMass) / m,
            explanation: (m, blockMass, finalV, answer) =>
                `This is a perfectly inelastic collision where the bullet embeds in the block. We can use conservation of momentum.\n\n` +
                `Before collision:\n` +
                `Momentum = m_bullet × v_bullet + m_block × v_block\n` +
                `Momentum = ${m} kg × v_bullet + ${blockMass} kg × 0 m/s\n` +
                `Momentum = ${m} kg × v_bullet\n\n` +
                `After collision:\n` +
                `Momentum = (m_bullet + m_block) × v_final\n` +
                `Momentum = (${m} kg + ${blockMass} kg) × ${finalV} m/s\n` +
                `Momentum = ${m + blockMass} kg × ${finalV} m/s = ${(m + blockMass) * finalV} kg⋅m/s\n\n` +
                `By conservation of momentum:\n` +
                `${m} kg × v_bullet = ${(m + blockMass) * finalV} kg⋅m/s\n` +
                `v_bullet = ${(m + blockMass) * finalV} kg⋅m/s ÷ ${m} kg = ${answer} m/s`
        }
    ];
    
    const scenario = scenarios[Math.floor(Math.random() * scenarios.length)];
    let mass, mass_1, mass_2, velocity, velocity_1, velocity_2, block_mass, final_velocity, impulse, answer;
    
    if (scenario.template.includes("{mass_1}") && scenario.template.includes("{velocity_1}") && scenario.template.includes("{mass_2}") && !scenario.template.includes("{velocity_2}")) {
        // Elastic collision with stationary object
        mass_1 = randomInt(1, 10);
        velocity_1 = randomInt(5, 30);
        
        // Ensure interesting results by controlling relative masses
        if (scenario.template.includes("velocity of the first object")) {
            // For diverse outcomes in first object's final velocity (including some reversals)
            if (Math.random() < 0.4) {
                // Make m1 < m2 for reversal
                mass_2 = randomInt(mass_1 + 1, mass_1 + 15);
            } else {
                // Make m1 > m2
                mass_2 = randomInt(1, mass_1);
            }
        } else {
            // For second object, any mass ratio works
            mass_2 = randomInt(1, 20);
        }
        
        answer = scenario.solve(mass_1, velocity_1, mass_2);
    } else if (scenario.template.includes("{mass_1}") && scenario.template.includes("{velocity_1}") && scenario.template.includes("{mass_2}") && scenario.template.includes("{velocity_2}")) {
        // Inelastic head-on collision
        mass_1 = randomInt(1, 15);
        mass_2 = randomInt(1, 15);
        velocity_1 = randomInt(5, 30);
        velocity_2 = randomInt(5, 30);
        answer = scenario.solve(mass_1, velocity_1, mass_2, velocity_2);
    } else if (scenario.template.includes("{mass}") && scenario.template.includes("{velocity_1}") && scenario.template.includes("{impulse}")) {
        // Impulse problem
        mass = randomInt(1, 10);
        velocity_1 = randomInt(10, 50);
        // Make sure the impulse doesn't completely reverse the motion by too much
        const maxImpulse = mass * velocity_1 * 1.5;
        impulse = randomInt(1, maxImpulse);
        answer = scenario.solve(mass, velocity_1, impulse);
    } else {
        // Bullet in wooden block
        mass = randomInt(1, 50) / 100; // 0.01 to 0.5 kg (bullet)
        block_mass = randomInt(1, 10); // 1 to 10 kg (block)
        final_velocity = randomInt(10, 100) / 10; // 1.0 to 10.0 m/s
        answer = scenario.solve(mass, block_mass, final_velocity);
    }
    
    // Round the answer to 2 decimal places
    answer = preciseRound(answer, 2);
    
    // Generate the question text by replacing placeholders
    let question = scenario.template;
    if (question.includes("{mass}")) question = question.replace("{mass}", mass);
    if (question.includes("{mass_1}")) question = question.replace("{mass_1}", mass_1);
    if (question.includes("{mass_2}")) question = question.replace("{mass_2}", mass_2);
    if (question.includes("{velocity}")) question = question.replace("{velocity}", velocity);
    if (question.includes("{velocity_1}")) question = question.replace("{velocity_1}", velocity_1);
    if (question.includes("{velocity_2}")) question = question.replace("{velocity_2}", velocity_2);
    if (question.includes("{block_mass}")) question = question.replace("{block_mass}", block_mass);
    if (question.includes("{final_velocity}")) question = question.replace("{final_velocity}", final_velocity);
    if (question.includes("{impulse}")) question = question.replace("{impulse}", impulse);
    
    // Generate the explanation
    let explanation;
    if (scenario.template.includes("{mass_1}") && scenario.template.includes("{velocity_1}") && scenario.template.includes("{mass_2}") && !scenario.template.includes("{velocity_2}")) {
        explanation = scenario.explanation(mass_1, velocity_1, mass_2, answer);
    } else if (scenario.template.includes("{mass_1}") && scenario.template.includes("{velocity_1}") && scenario.template.includes("{mass_2}") && scenario.template.includes("{velocity_2}")) {
        explanation = scenario.explanation(mass_1, velocity_1, mass_2, velocity_2, answer);
    } else if (scenario.template.includes("{mass}") && scenario.template.includes("{velocity_1}") && scenario.template.includes("{impulse}")) {
        explanation = scenario.explanation(mass, velocity_1, impulse, answer);
    } else {
        explanation = scenario.explanation(mass, block_mass, final_velocity, answer);
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

// Generate a problem about pulley systems
function generatePulleySystemProblem() {
    const g = 9.8; // acceleration due to gravity in m/s²
    
    const scenarios = [
        {
            template: "Two blocks of masses {mass_1} kg and {mass_2} kg are connected by a massless string over a frictionless pulley. What is the acceleration of the// Advanced Kinematic Problems Generator
// This file contains functions to generate more complex problems related to kinematics

function generateAdvancedKinematicProblem() {
    // Decide which type of advanced kinematic problem to generate
    const problemTypes = [
        "circular_motion",
        "inclined_plane",
        "work_energy",
        "momentum_collision",
        "pulley_systems"
    ];
    
    const problemType = problemTypes[Math.floor(Math.random() * problemTypes.length)];
    
    let problem;
    
    switch(problemType) {
        case "circular_motion":
            problem = generateCircularMotionProblem();
            break;
        case "inclined_plane":
            problem = generateInclinedPlaneProblem();
            break;
        case "work_energy":
            problem = generateWorkEnergyProblem();
            break;
        case "momentum_collision":
            problem = generateMomentumCollisionProblem();
            break;
        case "pulley_systems":
            problem = generatePulleySystemProblem();
            break;
        default:
            problem = generateCircularMotionProblem();
    }
    
    // Add an explanation if there isn't one already
    if (!problem.explanation) {
        problem.explanation = generateAdvancedKinematicExplanation(problem);
    }
    
    return problem;
}

// Generate a problem about circular motion
function generateCircularMotionProblem() {
    const g = 9.8; // acceleration due to gravity in m/s²
    
    const scenarios = [
        {
            template: "A car is moving around a circular track with radius {radius} meters at a constant speed of {velocity} m/s. What is the centripetal acceleration in m/s²?",
            solve: (r, v) => Math.pow(v, 2) / r,
            explanation: (r, v, answer) =>
                `For an object moving in a circular path at constant speed, the centripetal acceleration is given by:\n\n` +
                `a_c = v² ÷ r\n\n` +
                `where v is the speed and r is the radius of the circle.\n\n` +
                `a_c = (${v})² ÷ ${r}\n` +
                `a_c = ${v * v} ÷ ${r}\n` +
                `a_c = ${answer} m/s²\n\n` +
                `This acceleration is directed toward the center of the circular path.`
        },
        {
            template: "A {mass} kg object is moving in a horizontal circle of radius {radius} meters at a speed of {velocity} m/s. What is the centripetal force required to maintain this circular motion in Newtons?",
            solve: (m, r, v) => (m * Math.pow(v, 2)) / r,
            explanation: (m, r, v, answer) =>
                `The centripetal force required for circular motion is:\n\n` +
                `F_c = m × v² ÷ r\n\n` +
                `where m is the mass, v is the speed, and r is the radius.\n\n` +
                `F_c = ${m} kg × (${v} m/s)² ÷ ${r} m\n` +
                `F_c = ${m} kg × ${v * v} m²/s² ÷ ${r} m\n` +
                `F_c = ${answer} N`
        },
        {
            template: "An object moves in a circular path of radius {radius} meters with a speed of {velocity} m/s. What is the period of one complete revolution in seconds?",
            solve: (r, v) => (2 * Math.PI * r) / v,
            explanation: (r, v, answer) =>
                `The period (T) of circular motion is the time taken to complete one revolution.\n\n` +
                `T = distance ÷ speed\n` +
                `T = circumference ÷ speed\n` +
                `T = 2πr ÷ v\n\n` +
                `T = 2 × π × ${r} m ÷ ${v} m/s\n` +
                `T = ${2 * Math.PI * r} m ÷ ${v} m/s\n` +
                `T = ${answer} seconds`
        },
        {
            template: "A conical pendulum consists of a {mass} kg mass on a string of length {length} meters that makes an angle of {angle} degrees with the vertical. What is the speed of the mass in m/s? (Use g = 9.8 m/s²)",
            solve: (m, l, angle) => Math.sqrt(g * l * Math.sin(angle * Math.PI / 180) * Math.tan(angle * Math.PI / 180)),
            explanation: (m, l, angle, answer) => {
                const angleRad = angle * Math.PI / 180;
                const r = l * Math.sin(angleRad); // horizontal radius
                
                return `For a conical pendulum, we need to analyze the forces.\n\n` +
                    `The horizontal radius of the circular path is:\n` +
                    `r = L × sin(θ) = ${l} m × sin(${angle}°) = ${r.toFixed(3)} m\n\n` +
                    `For circular motion, the centripetal force is provided by the horizontal component of tension:\n` +
                    `T × sin(${angle}°) = m × v²/r\n\n` +
                    `The vertical component of tension balances the weight:\n` +
                    `T × cos(${angle}°) = m × g\n\n` +
                    `Dividing these equations:\n` +
                    `tan(${angle}°) = v²/(r × g)\n\n` +
                    `Solving for v:\n` +
                    `v = √(r × g × tan(${angle}°))\n` +
                    `v = √(${r.toFixed(3)} × 9.8 × ${Math.tan(angleRad).toFixed(3)})\n` +
                    `v = ${answer} m/s`;
            }
        },
        {
            template: "A car is traveling around a circular turn of radius {radius} meters. If the coefficient of static friction between the tires and the road is {coefficient}, what is the maximum speed the car can have without slipping in m/s? (Use g = 9.8 m/s²)",
            solve: (r, mu) => Math.sqrt(mu * g * r),
            explanation: (r, mu, answer) =>
                `For a car to navigate a turn without slipping, the maximum centripetal force is limited by friction.\n\n` +
                `The maximum friction force is:\n` +
                `F_friction = μ × m × g\n\n` +
                `This must equal the required centripetal force:\n` +
                `m × v²/r = μ × m × g\n\n` +
                `Solving for v:\n` +
                `v² = μ × g × r\n` +
                `v = √(μ × g × r)\n` +
                `v = √(${mu} × 9.8 m/s² × ${r} m)\n` +
                `v = √(${mu * 9.8 * r})\n` +
                `v = ${answer} m/s`
        }
    ];
    
    const scenario = scenarios[Math.floor(Math.random() * scenarios.length)];
    let radius, velocity, mass, length, angle, coefficient, answer;
    
    if (scenario.template.includes("{radius}") && scenario.template.includes("{velocity}") && !scenario.template.includes("{mass}")) {
        // Centripetal acceleration
        radius = randomInt(20, 200);
        velocity = randomInt(5, 50);
        answer = scenario.solve(radius, velocity);
    } else if (scenario.template.includes("{mass}") && scenario.template.includes("{radius}") && scenario.template.includes("{velocity}")) {
        // Centripetal force
        mass = randomInt(1, 20);
        radius = randomInt(10, 100);
        velocity = randomInt(5, 30);
        answer = scenario.solve(mass, radius, velocity);
    } else if (scenario.template.includes("{radius}") && scenario.template.includes("{velocity}") && !scenario.template.includes("{mass}") && !scenario.template.includes("{coefficient}")) {
        // Period of revolution
        radius = randomInt(10, 100);
        velocity = randomInt(5, 30);
        answer = scenario.solve(radius, velocity);
    } else if (scenario.template.includes("{mass}") && scenario.template.includes("{length}") && scenario.template.includes("{angle}")) {
        // Conical pendulum
        mass = randomInt(1, 10);
        length = randomInt(1, 5);
        angle = randomInt(15, 60);
        answer = scenario.solve(mass, length, angle);
    } else {
        // Maximum speed without slipping
        radius = randomInt(20, 200);
        coefficient = (randomInt(30, 90) / 100).toFixed(2); // Between 0.3 and 0.9
        answer = scenario.solve(radius, coefficient);
    }
    
    // Round the answer to 2 decimal places
    answer = preciseRound(answer, 2);
    
    // Generate the question text by replacing placeholders
    let question = scenario.template;
    if (question.includes("{radius}")) question = question.replace("{radius}", radius);
    if (question.includes("{velocity}")) question = question.replace("{velocity}", velocity);
    if (question.includes("{mass}")) question = question.replace("{mass}", mass);
    if (question.includes("{length}")) question = question.replace("{length}", length);
    if (question.includes("{angle}")) question = question.replace("{angle}", angle);
    if (question.includes("{coefficient}")) question = question.replace("{coefficient}", coefficient);
    
    // Generate the explanation
    let explanation;
    if (scenario.template.includes("{radius}") && scenario.template.includes("{velocity}") && !scenario.template.includes("{mass}") && !scenario.template.includes("{coefficient}")) {
        explanation = scenario.explanation(radius, velocity, answer);
    } else if (scenario.template.includes("{mass}") && scenario.template.includes("{radius}") && scenario.template.includes("{velocity}")) {
        explanation = scenario.explanation(mass, radius, velocity, answer);
    } else if (scenario.template.includes("{mass}") && scenario.template.includes("{length}") && scenario.template.includes("{angle}")) {
        explanation = scenario.explanation(mass, length, angle, answer);
    } else if (scenario.template.includes("{radius}") && scenario.template.includes("{coefficient}")) {
        explanation = scenario.explanation(radius, coefficient, answer);
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

// Generate a problem about inclined planes
function generateInclinedPlaneProblem() {
    const g = 9.8; // acceleration due to gravity in m/s²
    
    const scenarios = [
        {
            template: "A {mass} kg block slides down a frictionless inclined plane that makes an angle of {angle} degrees with the horizontal. What is the acceleration of the block in m/s²? (Use g = 9.8 m/s²)",
            solve: (m, angle) => g * Math.sin(angle * Math.PI / 180),
            explanation: (m, angle, answer) =>
                `For an object sliding down a frictionless inclined plane:\n\n` +
                `The component of gravity parallel to the incline is what causes acceleration:\n` +
                `a = g × sin(θ)\n\n` +
                `a = 9.8 m/s² × sin(${angle}°)\n` +
                `a = 9.8 × ${Math.sin(angle * Math.PI / 180).toFixed(4)}\n` +
                `a = ${answer} m/s²\n\n` +
                `Note that the mass cancels out, so the acceleration is independent of the object's mass.`
        },
        {
            template: "A {mass} kg box is placed on an inclined plane that makes an angle of {angle} degrees with the horizontal. If the coefficient of static friction is {coefficient}, will the box slide down the plane without being pushed? (Answer 1 for yes, 0 for no)",
            solve: (m, angle, mu) => {
                const willSlide = Math.tan(angle * Math.PI / 180) > mu ? 1 : 0;
                return willSlide;
            },
            explanation: (m, angle, mu, answer) => {
                const angleRad = angle * Math.PI / 180;
                const tangent = Math.tan(angleRad).toFixed(4);
                
                return `For an object on an inclined plane, it will slide if the component of gravity parallel to the plane exceeds the maximum static friction force.\n\n` +
                    `The component of gravity parallel to the plane is:\n` +
                    `F_parallel = m × g × sin(θ) = ${m} kg × 9.8 m/s² × sin(${angle}°)\n\n` +
                    `The component of gravity perpendicular to the plane is:\n` +
                    `F_perpendicular = m × g × cos(θ) = ${m} kg × 9.8 m/s² × cos(${angle}°)\n\n` +
                    `The maximum static friction force is:\n` +
                    `F_friction = μ × F_perpendicular = ${mu} × ${m} kg × 9.8 m/s² × cos(${angle}°)\n\n` +
                    `The object will slide if F_parallel > F_friction, which simplifies to:\n` +
                    `tan(θ) > μ\n\n` +
                    `tan(${angle}°) = ${tangent}\n` +
                    `μ = ${mu}\n\n` +
                    `${answer === 1 ? 
                      `Since tan(${angle}°) > ${mu}, the box WILL slide down the plane without being pushed.` : 
                      `Since tan(${angle}°) < ${mu}, the box will NOT slide down the plane without being pushed.`}`
            }
        },
        {
            template: "A block of mass {mass} kg is placed on an inclined plane with angle {angle} degrees. If the coefficient of kinetic friction is {coefficient}, what is the acceleration of the block in m/s² as it slides down the plane? (Use g = 9.8 m/s²)",
            solve: (m, angle, mu) => g * (Math.sin(angle * Math.PI / 180) - mu * Math.cos(angle * Math.PI / 180)),
            explanation: (m, angle, mu, answer) => {
                const angleRad = angle * Math.PI / 180;
                const sinComponent = g * Math.sin(angleRad);
                const frictionEffect = mu * g * Math.cos(angleRad);
                
                return `For a block sliding down an inclined plane with friction:\n\n` +
                    `The component of gravity parallel to the plane is:\n` +
                    `a_gravity = g × sin(θ) = 9.8 m/s² × sin(${angle}°) = ${sinComponent.toFixed(3)} m/s²\n\n` +
                    `The deceleration due to friction is:\n` +
                    `a_friction = μ × g × cos(θ) = ${mu} × 9.8 m/s² × cos(${angle}°) = ${frictionEffect.toFixed(3)} m/s²\n\n` +
                    `The net acceleration is:\n` +
                    `a_net = a_gravity - a_friction\n` +
                    `a_net = ${sinComponent.toFixed(3)} - ${frictionEffect.toFixed(3)} = ${answer} m/s²\n\n` +
                    `${answer > 0 ? 
                      'Since the result is positive, the block accelerates down the plane.' : 
                      answer < 0 ? 
                      'Since the result is negative, friction is stronger than the component of gravity, so the block would accelerate up the plane if pushed downward initially.' :
                      'Since the result is zero, the block would move at constant velocity if given an initial push.'}`
            }
        },
        {
            template: "A {mass} kg block is pushed up an inclined plane with an initial velocity of {velocity} m/s. The plane is inclined at an angle of {angle} degrees, and the coefficient of kinetic friction is {coefficient}. How far up the plane (measured along the incline) will the block go before coming to a stop in meters? (Use g = 9.8 m/s²)",
            solve: (m, v, angle, mu) => {
                const angleRad = angle * Math.PI / 180;
                const acceleration = g * (Math.sin(angleRad) + mu * Math.cos(angleRad)); // Acceleration is opposite to motion
                return Math.pow(v, 2) / (2 * acceleration);
            },
            explanation: (m, v, angle, mu, answer) => {
                const angleRad = angle * Math.PI / 180;
                const sinComponent = g * Math.sin(angleRad);
                const frictionEffect = mu * g * Math.cos(angleRad);
                const totalDeceleration = sinComponent + frictionEffect;
                
                return `To find how far the block will go, we need the deceleration and initial velocity.\n\n` +
                    `When moving up the plane, both gravity and friction act to slow the block:\n\n` +
                    `Deceleration due to gravity component = g × sin(θ) = 9.8 m/s² × sin(${angle}°) = ${sinComponent.toFixed(3)} m/s²\n\n` +
                    `Deceleration due to friction = μ × g × cos(θ) = ${mu} × 9.8 m/s² × cos(${angle}°) = ${frictionEffect.toFixed(3)} m/s²\n\n` +
                    `Total deceleration = ${sinComponent.toFixed(3)} + ${frictionEffect.toFixed(3)} = ${totalDeceleration.toFixed(3)} m/s²\n\n` +
                    `Using the kinematic equation v² = v₀² - 2ad (where final v = 0):\n` +
                    `0 = ${v}² - 2 × ${totalDeceleration.toFixed(3)} × d\n` +
                    `2 × ${totalDeceleration.toFixed(3)} × d = ${v * v}\n` +
                    `d = ${v * v} ÷ (2 × ${totalDeceleration.toFixed(3)})\n` +
                    `d = ${answer} meters`
            }
        },
        {
            template: "A box of mass {mass} kg is at rest on a {angle} degree inclined plane. The coefficient of static friction is {coefficient}. What minimum force parallel to the incline is needed to start the box moving up the plane in Newtons? (Use g = 9.8 m/s²)",
            solve: (m, angle, mu) => {
                const angleRad = angle * Math.PI / 180;
                return m * g * (Math.sin(angleRad) + mu * Math.cos(angleRad));
            },
            explanation: (m, angle, mu, answer) => {
                const angleRad = angle * Math.PI / 180;
                const weightComponent = m * g * Math.sin(angleRad);
                const frictionForce = mu * m * g * Math.cos(angleRad);
                
                return `To move the box up the incline, we need to overcome both the component of weight parallel to the incline and the friction force.\n\n` +
                    `Weight component parallel to incline = m × g × sin(θ) = ${m} kg × 9.8 m/s² × sin(${angle}°) = ${weightComponent.toFixed(2)} N\n\n` +
                    `Maximum static friction force = μ × m × g × cos(θ) = ${mu} × ${m} kg × 9.8 m/s² × cos(${angle}°) = ${frictionForce.toFixed(2)} N\n\n` +
                    `The minimum force needed = weight component + friction force\n` +
                    `F_min = ${weightComponent.toFixed(2)} N + ${frictionForce.toFixed(2)} N = ${answer} N`
            }
        }
    ];
    
    const scenario = scenarios[Math.floor(Math.random() * scenarios.length)];
    let mass, angle, coefficient, velocity, answer;
    
    if (scenario.template.includes("{mass}") && scenario.template.includes("{angle}") && !scenario.template.includes("{coefficient}")) {
        // Frictionless inclined plane
        mass = randomInt(1, 20);
        angle = randomInt(15, 60);
        answer = scenario.solve(mass, angle);
    } else if (scenario.template.includes("{mass}") && scenario.template.includes("{angle}") && scenario.template.includes("{coefficient}") && !scenario.template.includes("{velocity}")) {
        if (scenario.template.includes("will the box slide")) {
            // Will it slide problem
            mass = randomInt(1, 20);
            angle = randomInt(10, 45);
            coefficient = (randomInt(20, 100) / 100).toFixed(2); // Between 0.2 and 1.0
            
            // Adjust parameters to get a mix of "yes" and "no" answers
            if (Math.random() < 0.5) {
                // Make it likely to slide
                angle = randomInt(30, 60);
                coefficient = (randomInt(20, 50) / 100).toFixed(2); // Lower friction
            } else {
                // Make it likely not to slide
                angle = randomInt(10, 30);
                coefficient = (randomInt(50, 100) / 100).toFixed(2); // Higher friction
            }
            
            answer = scenario.solve(mass, angle, coefficient);
        } else if (scenario.template.includes("acceleration of the block") || scenario.template.includes("minimum force")) {
            // Sliding with friction or minimum force problem
            mass = randomInt(1, 15);
            angle = randomInt(15, 45);
            coefficient = (randomInt(20, 60) / 100).toFixed(2); // Between 0.2 and 0.6
            answer = scenario.solve(mass, angle, coefficient);
        }
    } else {
        // Block pushed up incline
        mass = randomInt(1, 10);
        velocity = randomInt(3, 15);
        angle = randomInt(15, 45);
        coefficient = (randomInt(10, 40) / 100).toFixed(2); // Between 0.1 and 0.4
        answer = scenario.solve(mass, velocity, angle, coefficient);
    }
    
    // Round the answer to 2 decimal places
    answer = preciseRound(answer, 2);
    
    // Generate the question text by replacing placeholders
    let question = scenario.template;
    if (question.includes("{mass}")) question = question.replace("{mass}", mass);
    if (question.includes("{angle}")) question = question.replace("{angle}", angle);
    if (question.includes("{coefficient}")) question = question.replace("{coefficient}", coefficient);
    if (question.includes("{velocity}")) question = question.replace("{velocity}", velocity);
    
    // Generate the explanation
    let explanation;
    if (scenario.template.includes("{mass}") && scenario.template.includes("{angle}") && !scenario.template.includes("{coefficient}")) {
        explanation = scenario.explanation(mass, angle, answer);
    } else if (scenario.template.includes("{mass}") && scenario.template.includes("{angle}") && scenario.template.includes("{coefficient}") && !scenario.template.includes("{velocity}")) {
        explanation = scenario.explanation(mass, angle, coefficient, answer);
    } else {
        explanation = scenario.explanation(mass, velocity, angle, coefficient, answer);
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

// Generate a problem about work and energy
function generateWorkEnergyProblem() {
    const g = 9.8; // acceleration due to gravity in m/s²
    
    const scenarios = [
        {
            template: "A {mass} kg object is lifted to a height of {height} meters. How much gravitational potential energy does it gain in Joules? (Use g = 9.8 m/s²)",
            solve: (m, h) => m * g * h,
            explanation: (m, h, answer) =>
                `Gravitational potential energy is calculated using the formula:\n\n` +
                `PE = m × g × h\n\n` +
                `where m is the mass, g is the acceleration due to gravity, and h is the height.\n\n` +
                `PE = ${m} kg × 9.8 m/s² × ${h} m\n` +
                `PE = ${answer} Joules`
        },
        {
            template: "An object with a mass of {mass} kg is moving at a speed of {velocity} m/s. What is its kinetic energy in Joules?",
            solve: (m, v) => 0.5 * m * Math.pow(v, 2),
            explanation: (m, v, answer) =>
                `Kinetic energy is calculated using the formula:\n\n` +
                `KE = (1/2) × m × v²\n\n` +
                `where m is the mass and v is the velocity.\n\n` +
                `KE = (1/2) × ${m} kg × (${v} m/s)²\n` +
                `KE = 0.5 × ${m} kg × ${v * v} m²/s²\n` +
                `KE = ${answer} Joules`
        },
        {
            template: "A force of {force} Newtons is applied to an object over a distance of {distance} meters in the direction of the force. How much work is done in Joules?",
            solve: (F, d) => F * d,
            explanation: (F, d, answer) =>
                `Work is calculated using the formula:\n\n` +
                `W = F × d × cos(θ)\n\n` +
                `where F is the force, d is the displacement, and θ is the angle between the force and displacement vectors.\n\n` +
                `Since the force is applied in the direction of displacement, cos(θ) = cos(0°) = 1.\n\n` +
                `W = ${F} N × ${d} m × 1\n` +
                `W = ${answer} Joules`
        },
        {
            template: "A {mass} kg block slides down a frictionless inclined plane of height {height} meters. What is the speed of the block in m/s when it reaches the bottom? (Use g = 9.8 m/s²)",
            solve: (m, h) => Math.sqrt(2 * g * h),
            explanation: (m, h, answer) =>
                `We can use the principle of conservation of energy to solve this problem.\n\n` +
                `At the top of the incline, the block has potential energy but no kinetic energy.\n` +
                `PE_initial = m × g × h = ${m} kg × 9.8 m/s² × ${h} m = ${m * g * h} J\n` +
                `KE_initial = 0 J\n\n` +
                `At the bottom of the incline, all potential energy has been converted to kinetic energy.\n` +
                `PE_final = 0 J\n` +
                `KE_final = (1/2) × m × v²\n\n` +
                `By conservation of energy: PE_initial = KE_final\n` +
                `${m} × 9.8 × ${h} = (1/2) × ${m} × v²\n` +
                `${m * g * h} = ${m/2} × v²\n` +
                `v² = ${m * g * h} ÷ ${m/2} = ${2 * g * h}\n` +
                `v = √${2 * g * h} = ${answer} m/s\n\n` +
                `Note that the mass cancels out, so the final speed is independent of the mass.`
        },
        {
            template: "A {mass} kg ball is thrown vertically upward with an initial speed of {velocity} m/s. What is the maximum height in meters the ball will reach? (Use g = 9.8 m/s²)",
            solve: (m, v) => Math.pow(v, 2) / (2 * g),
            explanation: (m, v, answer) =>
                `We can use the principle of conservation of energy to solve this problem.\n\n` +
                `Initially, the ball has kinetic energy but no potential energy (relative to the starting point).\n` +
                `KE_initial = (1/2) × m × v₀² = (1/2) × ${m} kg × (${v} m/s)² = ${0.5 * m * v * v} J\n` +
                `PE_initial = 0 J\n\n` +
                `At the maximum height, the ball has potential energy but no kinetic energy (velocity = 0).\n` +
                `KE_final = 0 J\n` +
                `PE_final = m × g × h = ${m} kg × 9.8 m/s² × h\n\n` +
                `By conservation of energy: KE_initial = PE_final\n` +
                `${0.5 * m * v * v} = ${m} × 9.8 × h\n` +
                `${0.5 * v * v} = 9.8 × h\n` +
                `h = ${0.5 * v * v} ÷ 9.8 = ${answer} m`
        }
    ];
    
    const scenario = scenarios[Math.floor(Math.random() * scenarios.length)];
    let mass, height, velocity, force, distance, answer;
    
    if (scenario.template.includes("{mass}") && scenario.template.includes("{height}") && !scenario.template.includes("{velocity}")) {
        // Potential energy or sliding down inclined plane
        mass = randomInt(1, 20);
        height = randomInt(2, 30);
        answer = scenario.solve(mass, height);
    } else if (scenario.template.includes("{mass}") && scenario.template.includes("{velocity}") && !scenario.template.includes("{height}")) {
        // Kinetic energy
        mass = randomInt(1, 20);
        velocity = randomInt(2, 30);
        answer = scenario.solve(mass, velocity);
    } else if (scenario.template.includes("{force}") && scenario.template.includes("{distance}")) {
        // Work done
        force = randomInt(10, 200);
        distance = randomInt(2, 50);
        answer = scenario.solve(force, distance);
    } else if (scenario.template.includes("{mass}") && scenario.template.includes("{velocity}") && scenario.template.includes("maximum height")) {
        // Ball thrown upward
        mass = randomInt(1, 10);
        velocity = randomInt(5, 30);
        answer = scenario.solve(mass, velocity);
    }
    
    // Round the answer to 2 decimal places
    answer = preciseRound(answer, 2);
    
    // Generate the question text by replacing placeholders
    let question = scenario.template;
    if (question.includes("{mass}")) question = question.replace("{mass}", mass);
    if (question.includes("{height}")) question = question.replace("{height}", height);
    if (question.includes("{velocity}")) question = question.replace("{velocity}", velocity);
    if (question.includes("{force}")) question = question.replace("{force}", force);
    if (question.includes("{distance}")) question = question.replace("{distance}", distance);
    
    // Generate the explanation
    let explanation;
    if (scenario.template.includes("{mass}") && scenario.template.includes("{height}") && !scenario.template.includes("{velocity}")) {
        explanation = scenario.explanation(mass, height, answer);
    } else if (scenario.template.includes("{mass}") && scenario.template.includes("{velocity}") && !scenario.template.includes("{height}")) {
        explanation = scenario.explanation(mass, velocity, answer);
    } else if (scenario.template.includes("{force}") && scenario.template.includes("{distance}")) {
        explanation = scenario.explanation(force, distance, answer);
    } else if (scenario.template.includes("{mass}") && scenario.template.includes("{velocity}") && scenario.template.includes("maximum height")) {
        explanation = scenario.explanation(mass, velocity, answer);
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

// Generate a problem about momentum and collisions
function generateMomentumCollisionProblem() {
    const scenarios = [
        {
            template: "A {mass_1} kg object moving at {velocity_1} m/s collides with a stationary {mass_2} kg object. If the collision is perfectly elastic, what is the velocity of the first object after the collision in m/s?",
            solve: (m1, v1, m2) => ((m1 - m2) / (m1 + m2)) * v1,
            explanation: (m1, v1, m2, answer) =>
                `For a perfectly elastic collision where one object is initially at rest, we can use the conservation of momentum and kinetic energy.\n\n` +
                `The formula for the velocity of the first object after collision is:\n` +
                `v1' = ((m1 - m2) / (m1 + m2)) × v1\n\n` +
                `v1' = ((${m1} - ${m2}) / (${m1} + ${m2})) × ${v1}\n` +
                `v1' = (${m1 - m2} / ${m1 + m2}) × ${v1}\n` +
                `v1' = ${(m1 - m2) / (m1 + m2)} × ${v1} = ${answer} m/s\n\n` +
                `${answer < 0 ? 'The negative value indicates the first object reverses direction after collision.' : 
                   answer > 0 ? 'The first object continues in the same direction but with reduced speed.' : 
                   'The first object comes to a complete stop after collision.'}`
        },
        {
            template: "A {mass_1} kg object moving at {velocity_1} m/s collides with a stationary {mass_2} kg object. If the collision is perfectly elastic, what is the velocity of the second object after the collision in m/s?",
            solve: (m1, v1, m2) => ((2 * m1) / (m1 + m2)) * v1,
            explanation: (m1, v1, m2, answer) =>
                `For a perfectly elastic collision where one object is initially at rest, we can use the conservation of momentum and kinetic energy.\n\n` +
                `The formula for the velocity of the second object after collision is:\n` +
                `v2' = ((2 × m1) / (m1 + m2)) × v1\n\n` +
                `v2' = ((2 × ${m1}) / (${m1} + ${m2})) × ${v1}\n` +
                `v2' = (${2 * m1} / ${m1 + m2}) × ${v1}\n` +
                `v2' = ${(2 * m1) / (m1 + m2)} × ${v1} = ${answer} m/s\n\n` +
                `The second object always moves in the same direction as the initial velocity of the first object.`
        },
        {
            template: "A {mass_1} kg object moving at {velocity_1} m/s collides head-on with a {mass_2} kg object moving in the opposite direction at {velocity_2} m/s. If the collision is perfectly inelastic (the objects stick together), what is the velocity of the combined object after the collision in m/s?",
            solve: (m1, v1, m2, v2) => (m1 * v1 - m2 * v2) / (m1 + m2),
            explanation: (m1, v1, m2, v2, answer) =>
                `For a perfectly inelastic collision (where objects stick together), momentum is conserved but kinetic energy is not.\n\n` +
                `Initial momentum = m1 × v1 + m2 × (-v2)\n` +
                `Initial momentum = ${m1} kg × ${v1} m/s - ${m2} kg × ${v2} m/s\n` +
                `Initial momentum = ${m1 * v1 - m2 * v2} kg⋅m/s\n\n` +
                `After collision, the objects move together with mass (m1 + m2) and velocity v'.\n` +
                `Final momentum = (m1 + m2) × v'\n\n` +
                `By conservation of momentum: Initial momentum = Final momentum\n` +
                `${m1 * v1 - m2 * v2} = (${m1} + ${m2}) × v'\n` +
                `v' = ${m1 * v1 - m2 * v2} ÷ ${m1 + m2} = ${answer} m/s\n\n` +
                `${answer > 0 ? 'The positive value indicates the combined object moves in the direction of the first object.' : 
                   answer < 0 ? 'The negative value indicates the combined object moves in the direction of the second object.' : 
                   'The combined object comes to a complete stop after collision.'}`
        },
        {
            template: "An object of mass {mass} kg is moving with a velocity of {velocity_1} m/s. If an impulse of {impulse} N⋅s is applied in the opposite direction to its motion, what is the final velocity of the object in m/s?",
            solve: (m, v, impulse) => v - impulse / m,
            explanation: (m, v, impulse, answer) =>
                `Impulse is defined as the change in momentum:\n\n` +
                `Impulse = m × (v_final - v_initial)\n\n` +
                `When the impulse is applied in the opposite direction to motion:\n` +
                `-${impulse} N⋅s = ${m} kg × (v_final - ${v} m/s)\n` +
                `v_final = ${v} m/s - ${impulse} N⋅s ÷ ${m} kg\n` +
                `v_final = ${v} m/s - ${impulse / m} m/s = ${answer} m/s`
        },
        {
            template: "A {mass} kg bullet is fired horizontally into a {block_mass} kg wooden block that is at rest. The bullet becomes embedded in the block. If the combined bullet and block moves at {final_velocity} m/s, what was the initial velocity of the bullet in m/s?",
            solve: (m, blockMass, finalV) => finalV * (m + blockMass) / m,
            explanation: (m, blockMass, finalV, answer) =>
                `This is a perfectly inelastic collision where the bullet embeds in the block. We can use conservation of momentum.\n\n` +
                `Before collision:\n` +
                `Momentum = m_bullet × v_bullet + m_block × v_block\n` +
                `Momentum = ${m} kg × v_bullet + ${blockMass} kg × 0 m/s\n` +
                `Momentum = ${m} kg × v_bullet\n\n` +
                `After collision:\n` +
                `Momentum = (m_bullet + m_block) × v_final\n` +
                `Momentum = (${m} kg + ${blockMass} kg) × ${finalV} m/s\n` +
                `Momentum = ${m + blockMass} kg × ${finalV} m/s = ${(m + blockMass) * finalV} kg⋅m/s\n\n` +
                `By conservation of momentum:\n` +
                `${m} kg × v_bullet = ${(m + blockMass) * finalV} kg⋅m/s\n` +
                `v_bullet = ${(m + blockMass) * finalV} kg⋅m/s ÷ ${m} kg = ${answer} m/s`
        }
    ];
    
    const scenario = scenarios[Math.floor(Math.random() * scenarios.length)];
    let mass, mass_1, mass_2, velocity, velocity_1, velocity_2, block_mass, final_velocity, impulse, answer;
    
    if (scenario.template.includes("{mass_1}") && scenario.template.includes("{velocity_1}") && scenario.template.includes("{mass_2}") && !scenario.template.includes("{velocity_2}")) {
        // Elastic collision with stationary object
        mass_1 = randomInt(1, 10);
        velocity_1 = randomInt(5, 30);
        
        // Ensure interesting results by controlling relative masses
        if (scenario.template.includes("velocity of the first object")) {
            // For diverse outcomes in first object's final velocity (including some reversals)
            if (Math.random() < 0.4) {
                // Make m1 < m2 for reversal
                mass_2 = randomInt(mass_1 + 1, mass_1 + 15);
            } else {
                // Make m1 > m2
                mass_2 = randomInt(1, mass_1);
            }
        } else {
            // For second object, any mass ratio works
            mass_2 = randomInt(1, 20);
        }
        
        answer = scenario.solve(mass_1, velocity_1, mass_2);
    } else if (scenario.template.includes("{mass_1}") && scenario.template.includes("{velocity_1}") && scenario.template.includes("{mass_2}") && scenario.template.includes("{velocity_2}")) {
        // Inelastic head-on collision
        mass_1 = randomInt(1, 15);
        mass_2 = randomInt(1, 15);
        velocity_1 = randomInt(5, 30);
        velocity_2 = randomInt(5, 30);
        answer = scenario.solve(mass_1, velocity_1, mass_2, velocity_2);
    } else if (scenario.template.includes("{mass}") && scenario.template.includes("{velocity_1}") && scenario.template.includes("{impulse}")) {
        // Impulse problem
        mass = randomInt(1, 10);
        velocity_1 = randomInt(10, 50);
        // Make sure the impulse doesn't completely reverse the motion by too much
        const maxImpulse = mass * velocity_1 * 1.5;
        impulse = randomInt(1, maxImpulse);
        answer = scenario.solve(mass, velocity_1, impulse);
    } else {
        // Bullet in wooden block
        mass = randomInt(1, 50) / 100; // 0.01 to 0.5 kg (bullet)
        block_mass = randomInt(1, 10); // 1 to 10 kg (block)
        final_velocity = randomInt(10, 100) / 10; // 1.0 to 10.0 m/s
        answer = scenario.solve(mass, block_mass, final_velocity);
    }
    
    // Round the answer to 2 decimal places
    answer = preciseRound(answer, 2);
    
    // Generate the question text by replacing placeholders
    let question = scenario.template;
    if (question.includes("{mass}")) question = question.replace("{mass}", mass);
    if (question.includes("{mass_1}")) question = question.replace("{mass_1}", mass_1);
    if (question.includes("{mass_2}")) question = question.replace("{mass_2}", mass_2);
    if (question.includes("{velocity}")) question = question.replace("{velocity}", velocity);
    if (question.includes("{velocity_1}")) question = question.replace("{velocity_1}", velocity_1);
    if (question.includes("{velocity_2}")) question = question.replace("{velocity_2}", velocity_2);
    if (question.includes("{block_mass}")) question = question.replace("{block_mass}", block_mass);
    if (question.includes("{final_velocity}")) question = question.replace("{final_velocity}", final_velocity);
    if (question.includes("{impulse}")) question = question.replace("{impulse}", impulse);
    
    // Generate the explanation
    let explanation;
    if (scenario.template.includes("{mass_1}") && scenario.template.includes("{velocity_1}") && scenario.template.includes("{mass_2}") && !scenario.template.includes("{velocity_2}")) {
        explanation = scenario.explanation(mass_1, velocity_1, mass_2, answer);
    } else if (scenario.template.includes("{mass_1}") && scenario.template.includes("{velocity_1}") && scenario.template.includes("{mass_2}") && scenario.template.includes("{velocity_2}")) {
        explanation = scenario.explanation(mass_1, velocity_1, mass_2, velocity_2, answer);
    } else if (scenario.template.includes("{mass}") && scenario.template.includes("{velocity_1}") && scenario.template.includes("{impulse}")) {
        explanation = scenario.explanation(mass, velocity_1, impulse, answer);
    } else {
        explanation = scenario.explanation(mass, block_mass, final_velocity, answer);
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

// Generate a problem about pulley systems
function generatePulleySystemProblem() {
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
            template: "A {mass} kg block is connected to a frictionless pulley system with a mechanical advantage of {advantage}. What is the minimum force needed to lift the block in Newtons? (Use g = 9.8 m/s²)",
            solve: (m, adv) => (m * g) / adv,
            explanation: (m, adv, answer) => {
                return `The mechanical advantage of a pulley system tells us how many times the force is multiplied.\n\n` +
                    `The weight of the block is: F_weight = m × g = ${m} kg × 9.8 m/s² = ${m * g} N\n\n` +
                    `With a mechanical advantage of ${adv}, the minimum force needed is:\n` +
                    `F_min = F_weight ÷ mechanical advantage\n` +
                    `F_min = ${m * g} N ÷ ${adv}\n` +
                    `F_min = ${answer} N`;
            }
        }
    ];
    
    const scenario = scenarios[Math.floor(Math.random() * scenarios.length)];
    let mass, mass_1, mass_2, advantage, answer;
    
    if (scenario.template.includes("{mass_1}") && scenario.template.includes("{mass_2}")) {
        // Two-mass pulley system
        do {
            mass_1 = randomInt(1, 20);
            mass_2 = randomInt(1, 20);
        } while (Math.abs(mass_1 - mass_2) < 2); // Ensure a noticeable difference
        
        answer = scenario.solve(mass_1, mass_2);
    } else {
        // Mechanical advantage pulley system
        mass = randomInt(5, 50);
        advantage = randomInt(2, 8);
        answer = scenario.solve(mass, advantage);
    }
    
    // Round the answer to 2 decimal places
    answer = preciseRound(answer, 2);
    
    // Generate the question text by replacing placeholders
    let question = scenario.template;
    if (question.includes("{mass}")) question = question.replace("{mass}", mass);
    if (question.includes("{mass_1}")) question = question.replace("{mass_1}", mass_1);
    if (question.includes("{mass_2}")) question = question.replace("{mass_2}", mass_2);
    if (question.includes("{advantage}")) question = question.replace("{advantage}", advantage);
    
    // Generate the explanation
    let explanation;
    if (scenario.template.includes("{mass_1}") && scenario.template.includes("{mass_2}")) {
        explanation = scenario.explanation(mass_1, mass_2, answer);
    } else {
        explanation = scenario.explanation(mass, advantage, answer);
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

// Utility function to generate a generic explanation for advanced kinematic problems
function generateAdvancedKinematicExplanation(problem) {
    const answer = problem.correct_answer;
    const questionType = problem.type;
    
    return `This is an advanced ${questionType} problem that requires application of physics principles like conservation of momentum, energy, or Newton's laws.\n\n` +
           `The answer is ${answer}, which was calculated using the appropriate physical equations for this scenario.\n\n` +
           `When solving these problems, identify the relevant physical principles, draw free-body diagrams when needed, and apply the correct equations to find the unknown quantities.`;
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
        const roundedVar = preciseRound(varValue, 2);
        
        if (Math.abs(roundedVar - value) > 0.01 && !wrongOptions.includes(roundedVar)) {
            wrongOptions.push(roundedVar);
            if (wrongOptions.length === 3) break;
        }
    }
    
    while (wrongOptions.length < 3) {
        const randomOpt = preciseRound(Math.max(0.1, Math.random() * value * 3), 2);
        if (Math.abs(randomOpt - value) > 0.1 && !wrongOptions.includes(randomOpt) && !options.includes(randomOpt)) {
            wrongOptions.push(randomOpt);
        }
    }
    
    options.push(...wrongOptions.slice(0, 3));
    
    return options.sort(() => Math.random() - 0.5);
}