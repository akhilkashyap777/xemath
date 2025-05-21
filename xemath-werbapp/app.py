from flask import Flask, jsonify, render_template
import random
import math
from decimal import Decimal, ROUND_HALF_UP
from additional_problem import generate_average_problem, generate_bodmas_problem, generate_probability_problem

app = Flask(__name__, static_url_path='', static_folder='static')

def generate_percentage_problem():
    # Medium to hard level percentage problems
    problem_types = [
        "percentage_increase_decrease",
        "compound_percentage",
        "percentage_of_percentage",
        "reverse_percentage"
    ]
    
    problem_type = random.choice(problem_types)
    
    if problem_type == "percentage_increase_decrease":
        # Find the new value after percentage increase/decrease
        original = random.randint(100, 1000)
        percentage = random.randint(15, 75)
        increase = random.choice([True, False])
        
        operation = "increased" if increase else "decreased"
        if increase:
            answer = original * (1 + percentage/100)
        else:
            answer = original * (1 - percentage/100)
        
        question = f"If {original} is {operation} by {percentage}%, what is the new value?"
        answer = round(answer, 2)
    
    elif problem_type == "compound_percentage":
        # Compound percentage changes
        original = random.randint(100, 500)
        percentage1 = random.randint(10, 30)
        percentage2 = random.randint(10, 30)
        
        operations = random.choices(["increase", "decrease"], k=2)
        
        if operations[0] == "increase":
            interim = original * (1 + percentage1/100)
        else:
            interim = original * (1 - percentage1/100)
            
        if operations[1] == "increase":
            answer = interim * (1 + percentage2/100)
        else:
            answer = interim * (1 - percentage2/100)
        
        question = f"A value of {original} is first {operations[0]}d by {percentage1}% and then {operations[1]}d by {percentage2}%. What is the final value?"
        answer = round(answer, 2)
    
    elif problem_type == "percentage_of_percentage":
        # Find percentage of a percentage
        whole = random.randint(500, 2000)
        percentage1 = random.randint(20, 75)
        percentage2 = random.randint(15, 65)
        
        part = whole * (percentage1/100)
        answer = part * (percentage2/100)
        
        question = f"{percentage1}% of {whole} is {round(part)}. What is {percentage2}% of that?"
        answer = round(answer, 2)
    
    else:  # reverse_percentage
        # Find original value given the result after percentage change
        final = random.randint(120, 1000)
        percentage = random.randint(15, 75)
        increase = random.choice([True, False])
        
        operation = "increased" if increase else "decreased"
        
        if increase:
            original = final / (1 + percentage/100)
        else:
            original = final / (1 - percentage/100)
        
        question = f"A value was {operation} by {percentage}% to get {final}. What was the original value?"
        answer = round(original, 2)
    
    # Generate multiple choice options
    options = generate_options(answer)
    
    return {
        "type": "percentage",
        "question": question,
        "options": options,
        "correct_answer": answer
    }

def generate_ratio_problem():
    # Medium to hard level ratio problems
    problem_types = [
        "find_value_given_ratio",
        "ratio_distribution",
        "ratio_change",
        "equivalent_ratios"
    ]
    
    problem_type = random.choice(problem_types)
    
    if problem_type == "find_value_given_ratio":
        # Find a value given a ratio and another value
        a = random.randint(2, 9)
        b = random.randint(2, 9)
        
        # Make sure they don't have a common factor
        while math.gcd(a, b) != 1:
            a = random.randint(2, 9)
            b = random.randint(2, 9)
            
        # Decide which value to provide
        if random.choice([True, False]):
            # Given value of first term
            multiplier = random.randint(5, 20)
            value_a = a * multiplier
            answer = b * multiplier
            
            question = f"If the ratio of a:b is {a}:{b} and a = {value_a}, what is b?"
        else:
            # Given value of second term
            multiplier = random.randint(5, 20)
            value_b = b * multiplier
            answer = a * multiplier
            
            question = f"If the ratio of a:b is {a}:{b} and b = {value_b}, what is a?"
    
    elif problem_type == "ratio_distribution":
        # Distribute a quantity according to a ratio
        a = random.randint(2, 7)
        b = random.randint(2, 7)
        c = random.randint(2, 7)
        
        total = random.randint(100, 500)
        # Make it divisible by the sum
        total = total - (total % (a + b + c))
        
        part_value = total / (a + b + c)
        
        position = random.randint(1, 3)
        if position == 1:
            answer = a * part_value
            question = f"A sum of {total} is divided in the ratio {a}:{b}:{c}. How much is the first share?"
        elif position == 2:
            answer = b * part_value
            question = f"A sum of {total} is divided in the ratio {a}:{b}:{c}. How much is the second share?"
        else:
            answer = c * part_value
            question = f"A sum of {total} is divided in the ratio {a}:{b}:{c}. How much is the third share?"
    
    elif problem_type == "ratio_change":
        # How a ratio changes when terms are modified
        a = random.randint(3, 10)
        b = random.randint(3, 10)
        
        operations = [
            f"If the ratio is {a}:{b} and the first term is increased by {random.randint(2, 5)}, what is the new ratio?",
            f"If the ratio is {a}:{b} and the second term is decreased by {random.randint(1, b-2)}, what is the new ratio?",
            f"If the ratio is {a}:{b} and both terms are multiplied by {random.randint(2, 4)}, what is the new ratio?",
            f"If the ratio is {a}:{b} and {random.randint(2, 5)} is added to both terms, what is the new ratio?"
        ]
        
        question = random.choice(operations)
        
        # For this type, we'll return the answer as a string since it's a ratio
        if "first term is increased" in question:
            increment = int(question.split("increased by ")[1].split(",")[0])
            new_a = a + increment
            answer = f"{new_a}:{b}"
        elif "second term is decreased" in question:
            decrement = int(question.split("decreased by ")[1].split(",")[0])
            new_b = b - decrement
            answer = f"{a}:{new_b}"
        elif "both terms are multiplied" in question:
            multiplier = int(question.split("multiplied by ")[1].split(",")[0])
            new_a = a * multiplier
            new_b = b * multiplier
            answer = f"{new_a}:{new_b}"
        else:  # added to both
            increment = int(question.split("added to both")[0].split(" ")[-2])
            new_a = a + increment
            new_b = b + increment
            answer = f"{new_a}:{new_b}"
    
    else:  # equivalent_ratios
        # Find equivalent ratios with missing terms
        a = random.randint(2, 10)
        b = random.randint(2, 10)
        
        multiplier = random.randint(3, 10)
        new_a = a * multiplier
        new_b = b * multiplier
        
        if random.choice([True, False]):
            question = f"If {a}:{b} = {new_a}:x, what is x?"
            answer = new_b
        else:
            question = f"If {a}:{b} = y:{new_b}, what is y?"
            answer = new_a
    
    # Generate multiple choice options
    options = generate_options(answer)
    
    return {
        "type": "ratio",
        "question": question,
        "options": options,
        "correct_answer": answer
    }

def generate_proportion_problem():
    # Medium to hard level proportion problems
    problem_types = [
        "direct_proportion",
        "inverse_proportion",
        "combined_proportion"
    ]
    
    problem_type = random.choice(problem_types)
    
    if problem_type == "direct_proportion":
        # Direct proportion problems
        scenarios = [
            {
                "template": "If {a} workers can complete a job in {b} days, how many days will it take {c} workers to complete the same job?",
                "is_direct": False,
                "formula": lambda a, b, c: (a * b) / c
            },
            {
                "template": "If {a} machines can produce {b} items in one hour, how many items can {c} machines produce in one hour?",
                "is_direct": True,
                "formula": lambda a, b, c: (b * c) / a
            },
            {
                "template": "A car travels {a} miles in {b} hours. At the same speed, how many miles will it travel in {c} hours?",
                "is_direct": True,
                "formula": lambda a, b, c: (a * c) / b
            }
        ]
        
        scenario = random.choice(scenarios)
        
        if scenario["is_direct"]:
            a = random.randint(2, 10)
            b = random.randint(15, 100)
            c = random.randint(a+1, 20)
        else:
            a = random.randint(5, 20)
            b = random.randint(3, 15)
            c = random.randint(1, a-1)
            
        question = scenario["template"].format(a=a, b=b, c=c)
        answer = scenario["formula"](a, b, c)
    
    elif problem_type == "inverse_proportion":
        # Inverse proportion problems
        a = random.randint(4, 12)
        b = random.randint(8, 24)
        c = random.randint(a+2, 24)
        
        scenarios = [
            f"If {a} people can paint a house in {b} hours, how many hours would it take {c} people to paint the same house?",
            f"A tap flowing at a rate of {a} liters per minute fills a tank in {b} minutes. How long would it take if the flow rate was {c} liters per minute?",
            f"If {a} machines can complete a task in {b} hours, how many hours would it take {c} machines to complete the same task?"
        ]
        
        question = random.choice(scenarios)
        answer = (a * b) / c
    
    else:  # combined_proportion
        # Combined direct and inverse proportion
        a = random.randint(10, 30)
        b = random.randint(3, 12)
        c = random.randint(2, 8)
        d = random.randint(15, 40)
        e = random.randint(4, 15)
        
        question = f"{a} workers, working {b} hours a day, complete a job in {c} days. How many days would it take {d} workers, working {e} hours a day, to complete the same job?"
        
        # Formula: workers × hours × days = constant
        original_work = a * b * c
        new_work_per_day = d * e
        answer = original_work / new_work_per_day
    
    answer = round(answer, 2)
    # Generate multiple choice options
    options = generate_options(answer)
    
    return {
        "type": "proportion",
        "question": question,
        "options": options,
        "correct_answer": answer
    }

def generate_options(correct_answer):
    """Generate 4 multiple choice options including the correct answer"""
    options = [correct_answer]
    
    # Handle string answers (like ratios)
    if isinstance(correct_answer, str) and ':' in correct_answer:
        a, b = map(int, correct_answer.split(':'))
        # Generate 3 different wrong options
        wrong_options = []
        for _ in range(6):  # Generate more options than needed in case of duplicates
            if random.choice([True, False]):
                # Modify first number
                new_a = max(1, a + random.choice([-2, -1, 1, 2]))
                new_option = f"{new_a}:{b}"
            else:
                # Modify second number
                new_b = max(1, b + random.choice([-2, -1, 1, 2]))
                new_option = f"{a}:{new_b}"
            
            if new_option != correct_answer and new_option not in wrong_options:
                wrong_options.append(new_option)
                if len(wrong_options) == 3:
                    break
        
        options.extend(wrong_options[:3])  # Add only 3 wrong options
    else:
        # For numerical answers
        value = float(correct_answer)
        
        # Create variations around the correct answer
        variations = [
            value * 0.85,  # 15% less
            value * 0.95,  # 5% less
            value * 1.05,  # 5% more
            value * 1.15,  # 15% more
            value - 1,     # 1 less
            value + 1,     # 1 more
            value * 0.5,   # half
            value * 2      # double
        ]
        
        # Select 3 different wrong options
        wrong_options = []
        random.shuffle(variations)
        
        for var in variations:
            # Round to 2 decimal places
            rounded_var = round(var, 2)
            if abs(rounded_var - value) > 0.01 and rounded_var not in wrong_options:
                wrong_options.append(rounded_var)
                if len(wrong_options) == 3:
                    break
        
        options.extend(wrong_options[:3])  # Add only 3 wrong options
    
    # Shuffle the options
    random.shuffle(options)
    return options

@app.route('/api/problem', methods=['GET'])
def get_problem():
    # Randomly select which type of problem to generate
    problem_type = random.choice(['percentage', 'ratio', 'proportion', 'average', 'bodmas', 'probability'])
    
    if problem_type == 'percentage':
        problem = generate_percentage_problem()
    elif problem_type == 'ratio':
        problem = generate_ratio_problem()
    elif problem_type == 'proportion':
        problem = generate_proportion_problem()
    elif problem_type == 'average':
        problem = generate_average_problem()
    elif problem_type == 'bodmas':
        problem = generate_bodmas_problem()
    else:  # probability
        problem = generate_probability_problem()
    
    return jsonify(problem)

@app.route('/')
def index():
    return render_template('index.html')

if __name__ == '__main__':
    app.run(debug=True)