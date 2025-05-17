import random
import math
from decimal import Decimal, ROUND_HALF_UP

def generate_average_problem():
    """Generate problems related to mean, median, mode, and weighted averages"""
    problem_types = [
        "simple_average",
        "weighted_average",
        "median",
        "mode",
        "mean_from_frequency"
    ]
    
    problem_type = random.choice(problem_types)
    
    if problem_type == "simple_average":
        # Generate 4-7 numbers to find the average of
        count = random.randint(4, 7)
        numbers = [random.randint(5, 30) for _ in range(count)]
        
        question = f"What is the mean (average) of the following numbers: {', '.join(map(str, numbers))}?"
        answer = sum(numbers) / len(numbers)
        answer = round(answer, 2)
    
    elif problem_type == "weighted_average":
        # Generate 3 items with weights
        items = []
        weights = []
        
        for _ in range(3):
            items.append(random.randint(50, 100))
            weights.append(random.randint(1, 5))
            
        question = "Find the weighted average of the following:\n"
        for i in range(3):
            question += f"Item with value {items[i]} has weight {weights[i]}\n"
        
        weighted_sum = sum(items[i] * weights[i] for i in range(3))
        total_weight = sum(weights)
        answer = weighted_sum / total_weight
        answer = round(answer, 2)
    
    elif problem_type == "median":
        # Generate 5-9 numbers to find the median of
        count = random.randint(5, 9)
        numbers = [random.randint(1, 50) for _ in range(count)]
        numbers.sort()  # Sort for clarity in the question
        
        question = f"What is the median of the following numbers: {', '.join(map(str, numbers))}?"
        
        # Calculate median
        mid = len(numbers) // 2
        if len(numbers) % 2 == 0:
            # Even number of items
            answer = (numbers[mid - 1] + numbers[mid]) / 2
        else:
            # Odd number of items
            answer = numbers[mid]
        answer = round(answer, 2)
    
    elif problem_type == "mode":
        # Generate a list with a clear mode
        base_numbers = [random.randint(1, 20) for _ in range(4)]
        # Add duplicates to ensure there's a mode
        mode_value = random.choice(base_numbers)
        duplicates = [mode_value] * random.randint(2, 3)
        numbers = base_numbers + duplicates
        random.shuffle(numbers)  # Shuffle for a more natural look
        
        question = f"What is the mode of the following numbers: {', '.join(map(str, numbers))}?"
        
        # Find the mode
        freq = {}
        for num in numbers:
            freq[num] = freq.get(num, 0) + 1
        
        max_freq = max(freq.values())
        modes = [k for k, v in freq.items() if v == max_freq]
        
        if len(modes) == 1:
            answer = modes[0]
        else:
            # If there are multiple modes, choose the one that appears in the question
            answer = mode_value
    
    else:  # mean_from_frequency
        # Create a frequency distribution and ask for the mean
        values = [random.randint(1, 10) for _ in range(4)]
        frequencies = [random.randint(1, 5) for _ in range(4)]
        
        question = "Find the mean from the following frequency distribution:\n"
        for i in range(4):
            question += f"Value {values[i]} occurs {frequencies[i]} times\n"
        
        total_sum = sum(values[i] * frequencies[i] for i in range(4))
        total_count = sum(frequencies)
        answer = total_sum / total_count
        answer = round(answer, 2)
    
    # Generate multiple choice options
    options = generate_options(answer)
    
    return {
        "type": "average",
        "question": question,
        "options": options,
        "correct_answer": answer
    }

def generate_bodmas_problem():
    """Generate problems related to order of operations (BODMAS/PEMDAS)"""
    problem_types = [
        "simple_bodmas",
        "multi_step_bodmas",
        "bodmas_with_powers",
        "complex_bodmas"
    ]
    
    problem_type = random.choice(problem_types)
    
    if problem_type == "simple_bodmas":
        # Generate a simple BODMAS expression with 3 operations
        operations = ['+', '-', '*', '/']
        a = random.randint(5, 20)
        b = random.randint(2, 10)
        c = random.randint(2, 10)
        d = random.randint(2, 10)
        
        # Make sure we don't divide by zero
        while b == 0 or c == 0 or d == 0:
            b = random.randint(2, 10)
            c = random.randint(2, 10)
            d = random.randint(2, 10)
            
        op1 = random.choice(operations)
        op2 = random.choice(operations)
        
        expression = f"{a} {op1} {b} {op2} {c}"
        question = f"Calculate: {expression}"
        
        # Evaluate the expression following BODMAS
        if op1 == '+' and op2 == '+':
            answer = a + b + c
        elif op1 == '+' and op2 == '-':
            answer = a + b - c
        elif op1 == '+' and op2 == '*':
            answer = a + (b * c)
        elif op1 == '+' and op2 == '/':
            answer = a + (b / c)
        elif op1 == '-' and op2 == '+':
            answer = a - b + c
        elif op1 == '-' and op2 == '-':
            answer = a - b - c
        elif op1 == '-' and op2 == '*':
            answer = a - (b * c)
        elif op1 == '-' and op2 == '/':
            answer = a - (b / c)
        elif op1 == '*' and op2 == '+':
            answer = (a * b) + c
        elif op1 == '*' and op2 == '-':
            answer = (a * b) - c
        elif op1 == '*' and op2 == '*':
            answer = (a * b) * c
        elif op1 == '*' and op2 == '/':
            answer = (a * b) / c
        elif op1 == '/' and op2 == '+':
            answer = (a / b) + c
        elif op1 == '/' and op2 == '-':
            answer = (a / b) - c
        elif op1 == '/' and op2 == '*':
            answer = (a / b) * c
        elif op1 == '/' and op2 == '/':
            answer = (a / b) / c
        
    elif problem_type == "multi_step_bodmas":
        # Generate a multi-step BODMAS expression with brackets
        a = random.randint(5, 20)
        b = random.randint(2, 10)
        c = random.randint(2, 10)
        d = random.randint(2, 10)
        
        operations = ['+', '-', '*', '/']
        op1 = random.choice(operations)
        op2 = random.choice(operations)
        op3 = random.choice(operations)
        
        # Create a random expression with brackets
        bracket_positions = [
            f"({a} {op1} {b}) {op2} {c} {op3} {d}",
            f"{a} {op1} ({b} {op2} {c}) {op3} {d}",
            f"{a} {op1} {b} {op2} ({c} {op3} {d})"
        ]
        
        expression = random.choice(bracket_positions)
        question = f"Calculate: {expression}"
        
        # For safety and accuracy, we'll use eval() with safe input
        # This is safe because we're generating the expressions ourselves
        # Replace division operator for proper evaluation
        eval_expression = expression.replace('/', '//')
        try:
            answer = eval(eval_expression)
        except:
            # Fallback to a simple expression if evaluation fails
            answer = a + b * c
    
    elif problem_type == "bodmas_with_powers":
        # Generate expressions with powers/exponents
        a = random.randint(2, 10)
        b = random.randint(2, 4)  # Keep exponents small
        c = random.randint(2, 10)
        
        operations = ['+', '-', '*', '/']
        op = random.choice(operations)
        
        # Randomly decide if exponent is applied to first or second term
        if random.choice([True, False]):
            expression = f"{a}^{b} {op} {c}"
            question = f"Calculate: {a}^{b} {op} {c}"
            
            if op == '+':
                answer = (a ** b) + c
            elif op == '-':
                answer = (a ** b) - c
            elif op == '*':
                answer = (a ** b) * c
            else:  # division
                answer = (a ** b) / c
        else:
            expression = f"{a} {op} {c}^{b}"
            question = f"Calculate: {a} {op} {c}^{b}"
            
            if op == '+':
                answer = a + (c ** b)
            elif op == '-':
                answer = a - (c ** b)
            elif op == '*':
                answer = a * (c ** b)
            else:  # division
                answer = a / (c ** b)
    
    else:  # complex_bodmas
        # Create a more complex expression with multiple operations
        a = random.randint(10, 30)
        b = random.randint(2, 15)
        c = random.randint(2, 10)
        d = random.randint(2, 10)
        
        # Ensure we don't get division by zero
        while b == 0 or c == 0 or d == 0:
            b = random.randint(2, 15)
            c = random.randint(2, 10)
            d = random.randint(2, 10)
            
        # Create various templates for complex expressions
        templates = [
            f"{a} + {b} * {c} - {d}",
            f"{a} - {b} / {c} + {d}",
            f"{a} * ({b} + {c}) / {d}",
            f"({a} + {b}) * ({c} - {d})",
            f"{a} / {b} + {c} * {d}",
            f"{a} * {b} - {c} / {d}"
        ]
        
        expression = random.choice(templates)
        question = f"Calculate: {expression}"
        
        # Replace division for integer division in evaluation
        eval_expression = expression.replace('/', '//')
        try:
            answer = eval(eval_expression)
        except:
            # Fallback
            answer = a + b * c - d
    
    # Make sure the answer is a reasonable number
    answer = round(float(answer), 2)
    
    # Generate multiple choice options
    options = generate_options(answer)
    
    return {
        "type": "bodmas",
        "question": question,
        "options": options,
        "correct_answer": answer
    }

def generate_probability_problem():
    """Generate problems related to probability"""
    problem_types = [
        "basic_probability",
        "card_probability",
        "dice_probability",
        "conditional_probability",
        "combined_probability"
    ]
    
    problem_type = random.choice(problem_types)
    
    if problem_type == "basic_probability":
        # Generate a basic probability problem with colored balls
        total_balls = random.randint(20, 50)
        red_balls = random.randint(5, total_balls // 2)
        blue_balls = random.randint(5, total_balls - red_balls)
        green_balls = total_balls - red_balls - blue_balls
        
        # Randomly choose which probability to ask for
        color_choices = ['red', 'blue', 'green']
        target_color = random.choice(color_choices)
        
        if target_color == 'red':
            target_count = red_balls
        elif target_color == 'blue':
            target_count = blue_balls
        else:
            target_count = green_balls
            
        question = f"A bag contains {red_balls} red balls, {blue_balls} blue balls, and {green_balls} green balls. If a ball is drawn at random, what is the probability of getting a {target_color} ball?"
        
        answer = target_count / total_balls
        answer = round(answer, 3)
    
    elif problem_type == "card_probability":
        # Probability problems involving a standard deck of 52 cards
        card_types = [
            {"name": "a heart", "count": 13},
            {"name": "a face card (Jack, Queen, King)", "count": 12},
            {"name": "a red card", "count": 26},
            {"name": "an Ace", "count": 4},
            {"name": "a card less than 5", "count": 16},  # Aces count as 1
            {"name": "a black face card", "count": 6}
        ]
        
        card_choice = random.choice(card_types)
        
        question = f"In a standard deck of 52 playing cards, what is the probability of drawing {card_choice['name']}?"
        
        answer = card_choice['count'] / 52
        answer = round(answer, 3)
    
    elif problem_type == "dice_probability":
        # Probability problems involving dice
        dice_count = random.randint(1, 3)
        
        if dice_count == 1:
            # Single die problems
            outcomes = [
                {"name": "an even number", "favorable": 3},
                {"name": "a number greater than 4", "favorable": 2},
                {"name": "a number less than or equal to 3", "favorable": 3},
                {"name": "a prime number (2, 3, 5)", "favorable": 3}
            ]
            
            outcome = random.choice(outcomes)
            
            question = f"When rolling a single die, what is the probability of getting {outcome['name']}?"
            answer = outcome['favorable'] / 6
        
        elif dice_count == 2:
            # Two dice problems
            outcomes = [
                {"name": "a sum of 7", "favorable": 6},
                {"name": "a sum of 8", "favorable": 5},
                {"name": "a sum less than 5", "favorable": 6},
                {"name": "a sum greater than 9", "favorable": 6},
                {"name": "doubles (both dice showing same number)", "favorable": 6}
            ]
            
            outcome = random.choice(outcomes)
            
            question = f"When rolling two dice, what is the probability of getting {outcome['name']}?"
            answer = outcome['favorable'] / 36
        
        else:  # Three dice
            # Three dice problems
            outcomes = [
                {"name": "a sum of 10", "favorable": 27},
                {"name": "all three dice showing the same number", "favorable": 6},
                {"name": "all even numbers", "favorable": 8},
                {"name": "a sum less than 6", "favorable": 10}
            ]
            
            outcome = random.choice(outcomes)
            
            question = f"When rolling three dice, what is the probability of getting {outcome['name']}?"
            answer = outcome['favorable'] / 216
        
        answer = round(answer, 3)
    
    elif problem_type == "conditional_probability":
        # Generate conditional probability problems
        
        # Create a 2×2 contingency table
        row1_col1 = random.randint(10, 30)
        row1_col2 = random.randint(10, 30)
        row2_col1 = random.randint(10, 30)
        row2_col2 = random.randint(10, 30)
        
        total = row1_col1 + row1_col2 + row2_col1 + row2_col2
        
        # Create a context
        contexts = [
            {
                "row1": "plays sports", 
                "row2": "doesn't play sports",
                "col1": "gets A grades", 
                "col2": "doesn't get A grades"
            },
            {
                "row1": "owns a car", 
                "row2": "doesn't own a car",
                "col1": "lives in the city", 
                "col2": "lives in suburbs"
            },
            {
                "row1": "likes coffee", 
                "row2": "doesn't like coffee",
                "col1": "works full-time", 
                "col2": "works part-time"
            }
        ]
        
        context = random.choice(contexts)
        
        # Randomly choose which conditional probability to ask
        if random.choice([True, False]):
            # P(A|B)
            condition = f"{context['row1']}"
            event = f"{context['col1']}"
            
            question = f"In a survey of {total} people, {row1_col1 + row1_col2} people {context['row1']} and {row1_col1 + row2_col1} people {context['col1']}. Of the people who {context['row1']}, {row1_col1} also {context['col1']}. What is the probability that a randomly selected person {event} given that they {condition}?"
            
            answer = row1_col1 / (row1_col1 + row1_col2)
        else:
            # P(B|A)
            condition = f"{context['col1']}"
            event = f"{context['row1']}"
            
            question = f"In a survey of {total} people, {row1_col1 + row1_col2} people {context['row1']} and {row1_col1 + row2_col1} people {context['col1']}. Of the people who {context['col1']}, {row1_col1} also {context['row1']}. What is the probability that a randomly selected person {event} given that they {condition}?"
            
            answer = row1_col1 / (row1_col1 + row2_col1)
        
        answer = round(answer, 3)
    
    else:  # combined_probability
        # Generate problems involving combined probability (AND/OR)
        
        # Create two events with probabilities
        prob_A = random.randint(20, 80) / 100
        prob_B = random.randint(20, 80) / 100
        
        # Decide if events are independent or not
        independent = random.choice([True, False])
        
        if independent:
            # Independent events
            context = random.choice([
                f"Event A has a probability of {prob_A} and event B has a probability of {prob_B}. If events A and B are independent",
                f"The probability of rain on Saturday is {prob_A} and the probability of rain on Sunday is {prob_B}. Assuming the weather on these days is independent"
            ])
            
            if random.choice([True, False]):
                # P(A and B)
                question = f"{context}, what is the probability that both events occur?"
                answer = prob_A * prob_B
            else:
                # P(A or B)
                question = f"{context}, what is the probability that at least one event occurs?"
                answer = prob_A + prob_B - (prob_A * prob_B)
        else:
            # Dependent events
            prob_A_given_B = random.randint(max(10, int(prob_A * 100 - 20)), min(90, int(prob_A * 100 + 20))) / 100
            
            context = random.choice([
                f"Event A has a probability of {prob_A} and the probability of event A given that event B has occurred is {prob_A_given_B}. The probability of event B is {prob_B}.",
                f"The probability of a student passing math is {prob_A}. The probability of the student passing science is {prob_B}. Given that the student passes science, the probability of passing math is {prob_A_given_B}."
            ])
            
            # P(A and B)
            question = f"{context} What is the probability that both events occur?"
            answer = prob_A_given_B * prob_B
        
        answer = round(answer, 3)
    
    # Generate multiple choice options
    options = generate_probability_options(answer)
    
    return {
        "type": "probability",
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
            # Round to same decimal places as the correct answer
            if isinstance(correct_answer, float):
                decimals = len(str(correct_answer).split('.')[-1]) if '.' in str(correct_answer) else 0
                rounded_var = round(var, decimals)
            else:
                rounded_var = round(var, 2)
                
            if abs(rounded_var - value) > 0.001 and rounded_var not in wrong_options:
                wrong_options.append(rounded_var)
                if len(wrong_options) == 3:
                    break
        
        options.extend(wrong_options[:3])  # Add only 3 wrong options
    
    # Shuffle the options
    random.shuffle(options)
    return options

def generate_probability_options(correct_answer):
    """Generate options for probability questions (always between 0 and 1)"""
    options = [correct_answer]
    
    # Special handling for probability values
    value = float(correct_answer)
    
    # Create variations around the correct answer, ensuring they stay between 0 and 1
    variations = []
    
    # Add some percentage based variations
    for factor in [0.7, 0.85, 1.15, 1.3]:
        var = value * factor
        if 0 < var < 1:
            variations.append(var)
    
    # Add some fixed variations
    for delta in [0.1, 0.2, 0.05, -0.05, -0.1, -0.2]:
        var = value + delta
        if 0 < var < 1:
            variations.append(var)
    
    # Add some common probability misconceptions if they're different enough
    common_values = [1/6, 1/4, 1/3, 1/2, 2/3, 3/4, 5/6]
    for val in common_values:
        if abs(val - value) > 0.05:  # Ensure it's sufficiently different
            variations.append(val)
    
    # Select 3 different wrong options
    wrong_options = []
    random.shuffle(variations)
    
    for var in variations:
        # Round to 3 decimal places for probabilities
        rounded_var = round(var, 3)
        if abs(rounded_var - value) > 0.001 and rounded_var not in wrong_options:
            wrong_options.append(rounded_var)
            if len(wrong_options) == 3:
                break
    
    # If we couldn't generate enough options, add some defaults
    while len(wrong_options) < 3:
        default_options = [0.1, 0.25, 0.5, 0.75, 0.9]
        for opt in default_options:
            if abs(opt - value) > 0.1 and opt not in wrong_options and opt not in options:
                wrong_options.append(opt)
                if len(wrong_options) == 3:
                    break
    
    options.extend(wrong_options[:3])
    random.shuffle(options)
    return options