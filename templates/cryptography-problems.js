// Cryptography problem types generator

function generateCryptographyProblem() {
    const problemTypes = [
        "caesar_cipher",
        "substitution_cipher",
        "binary_conversion",
        "morse_code",
        "basic_hash",
        "atbash_cipher",
        "rail_fence_cipher",
        "hex_conversion",
        "ascii_conversion",
        "reverse_cipher"
    ];
    
    const problemType = problemTypes[Math.floor(Math.random() * problemTypes.length)];
    let question, answer, explanation;
    
    if (problemType === "caesar_cipher") {
        // Caesar cipher problems
        // Generate random shift instead of using hardcoded shifts
        const shift = randomInt(1, 25); // Any shift between 1-25 (avoiding 0 and 26 which don't change anything)
        
        // Generate a random word instead of using a hardcoded word pool
        const word = generateRandomWord(4, 7); // Random word of length 4-7 characters
        const encryptedWord = caesarCipher(word, shift);
        
        if (Math.random() > 0.5) {
            // Encryption problem
            question = `Using a Caesar cipher with shift ${shift}, what is the encrypted form of "${word}"?`;
            answer = encryptedWord;
            
            // Create explanation
            explanation = `A Caesar cipher is a substitution cipher where each letter in the plaintext is shifted a certain number of places down the alphabet.\n\n` +
                `In this case, we need to shift each letter in "${word}" by ${shift} positions in the alphabet.\n\n` +
                `Here's how each letter is encrypted:\n`;
                
            for (let i = 0; i < word.length; i++) {
                const char = word[i];
                const code = word.charCodeAt(i);
                let encryptedChar;
                
                if (code >= 65 && code <= 90) { // Uppercase letters
                    encryptedChar = String.fromCharCode(((code - 65 + shift) % 26) + 65);
                } else if (code >= 97 && code <= 122) { // Lowercase letters
                    encryptedChar = String.fromCharCode(((code - 97 + shift) % 26) + 97);
                } else {
                    encryptedChar = char; // Non-alphabetic characters remain unchanged
                }
                
                explanation += `${char} → ${encryptedChar} (shift ${shift} positions)\n`;
            }
            
            explanation += `\nTherefore, the encrypted form of "${word}" is "${encryptedWord}".`;
        } else {
            // Decryption problem
            question = `Using a Caesar cipher with shift ${shift}, what is the original word that encrypts to "${encryptedWord}"?`;
            answer = word;
            
            // Create explanation
            explanation = `A Caesar cipher is a substitution cipher where each letter in the plaintext is shifted a certain number of places down the alphabet.\n\n` +
                `To decrypt, we need to shift each letter in "${encryptedWord}" by ${shift} positions in the reverse direction (or by ${26-shift} positions forward).\n\n` +
                `Here's how each letter is decrypted:\n`;
                
            for (let i = 0; i < encryptedWord.length; i++) {
                const char = encryptedWord[i];
                const code = encryptedWord.charCodeAt(i);
                let decryptedChar;
                
                if (code >= 65 && code <= 90) { // Uppercase letters
                    decryptedChar = String.fromCharCode(((code - 65 - shift + 26) % 26) + 65);
                } else if (code >= 97 && code <= 122) { // Lowercase letters
                    decryptedChar = String.fromCharCode(((code - 97 - shift + 26) % 26) + 97);
                } else {
                    decryptedChar = char; // Non-alphabetic characters remain unchanged
                }
                
                explanation += `${char} → ${decryptedChar} (shift back ${shift} positions)\n`;
            }
            
            explanation += `\nTherefore, the original word that encrypts to "${encryptedWord}" is "${word}".`;
        }
    }
    else if (problemType === "substitution_cipher") {
        // Simple substitution cipher problems
        const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        
        // Generate a random substitution instead of using hardcoded substitution
        const substitution = generateRandomSubstitution(alphabet);
        
        // Generate a random word instead of using a hardcoded word pool
        const word = generateRandomWord(3, 6); // Random word of length 3-6 characters
        let encryptedWord = "";
        
        for (let i = 0; i < word.length; i++) {
            const char = word[i];
            const index = alphabet.indexOf(char);
            encryptedWord += (index !== -1) ? substitution[index] : char;
        }
        
        if (Math.random() > 0.5) {
            // Encryption problem
            question = `Using the substitution cipher where A→${substitution[0]}, B→${substitution[1]}, C→${substitution[2]}, etc., what is the encrypted form of "${word}"?`;
            answer = encryptedWord;
            
            // Create explanation
            explanation = `A substitution cipher replaces each letter in the plaintext with a different letter according to a fixed mapping.\n\n` +
                `The substitution mapping given is:\n` +
                `A → ${substitution[0]}, B → ${substitution[1]}, C → ${substitution[2]}, D → ${substitution[3]}, E → ${substitution[4]}, ...\n\n` +
                `In more detail, the full mapping is:\n`;
                
            for (let i = 0; i < 26; i++) {
                explanation += `${alphabet[i]} → ${substitution[i]}${(i+1) % 6 === 0 ? '\n' : ', '}`;
            }
            
            explanation += `\nNow let's encrypt each letter of "${word}":\n`;
            
            for (let i = 0; i < word.length; i++) {
                const char = word[i];
                const index = alphabet.indexOf(char);
                const encryptedChar = (index !== -1) ? substitution[index] : char;
                
                explanation += `${char} → ${encryptedChar}\n`;
            }
            
            explanation += `\nTherefore, the encrypted form of "${word}" is "${encryptedWord}".`;
        } else {
            // Decryption problem
            question = `Using the substitution cipher where A→${substitution[0]}, B→${substitution[1]}, C→${substitution[2]}, etc., what is the original word that encrypts to "${encryptedWord}"?`;
            answer = word;
            
            // Create explanation
            explanation = `A substitution cipher replaces each letter in the plaintext with a different letter according to a fixed mapping.\n\n` +
                `The substitution mapping given is:\n` +
                `A → ${substitution[0]}, B → ${substitution[1]}, C → ${substitution[2]}, D → ${substitution[3]}, E → ${substitution[4]}, ...\n\n` +
                `To decrypt, we need to reverse this mapping:\n` +
                `${substitution[0]} → A, ${substitution[1]} → B, ${substitution[2]} → C, ${substitution[3]} → D, ${substitution[4]} → E, ...\n\n` +
                `In more detail, the reverse mapping is:\n`;
                
            for (let i = 0; i < 26; i++) {
                const originalChar = alphabet[i];
                const substitutedCharIndex = substitution.indexOf(originalChar);
                const originalMappedChar = alphabet[substitutedCharIndex];
                
                explanation += `${originalChar} → ${originalMappedChar}${(i+1) % 6 === 0 ? '\n' : ', '}`;
            }
            
            explanation += `\nNow let's decrypt each letter of "${encryptedWord}":\n`;
            
            for (let i = 0; i < encryptedWord.length; i++) {
                const char = encryptedWord[i];
                const index = substitution.indexOf(char);
                const decryptedChar = (index !== -1) ? alphabet[index] : char;
                
                explanation += `${char} → ${decryptedChar}\n`;
            }
            
            explanation += `\nTherefore, the original word that encrypts to "${encryptedWord}" is "${word}".`;
        }
    }
    else if (problemType === "binary_conversion") {
        // Binary conversion problems
        const decimalValue = randomInt(5, 63);
        const binaryValue = decimalValue.toString(2);
        
        if (Math.random() > 0.5) {
            // Decimal to binary
            question = `Convert the decimal number ${decimalValue} to binary.`;
            answer = binaryValue;
            
            // Create explanation
            explanation = `To convert a decimal number to binary, we divide the number by 2 repeatedly and keep track of the remainders.\n\n` +
                `Starting with ${decimalValue}:\n`;
                
            let num = decimalValue;
            let steps = [];
            
            while (num > 0) {
                const remainder = num % 2;
                steps.push(`${num} ÷ 2 = ${Math.floor(num/2)} with remainder ${remainder}`);
                num = Math.floor(num / 2);
            }
            
            // Reverse the steps to show in the correct order
            steps.reverse();
            explanation += steps.join('\n') + '\n\n';
            
            explanation += `Reading the remainders from bottom to top gives us the binary representation: ${binaryValue}\n\n` +
                `We can verify this by converting back to decimal:\n`;
                
            let verificationSteps = [];
            for (let i = 0; i < binaryValue.length; i++) {
                const digit = binaryValue[binaryValue.length - 1 - i];
                if (digit === '1') {
                    verificationSteps.push(`1 × 2^${i} = ${Math.pow(2, i)}`);
                }
            }
            
            explanation += verificationSteps.join(' + ');
            explanation += ` = ${decimalValue}\n\n`;
            explanation += `Therefore, ${decimalValue} in binary is ${binaryValue}.`;
        } else {
            // Binary to decimal
            question = `Convert the binary number ${binaryValue} to decimal.`;
            answer = decimalValue;
            
            // Create explanation
            explanation = `To convert a binary number to decimal, we multiply each digit by the corresponding power of 2 based on its position and sum the results.\n\n` +
                `For binary number ${binaryValue}:\n`;
                
            let conversionSteps = [];
            let sum = 0;
            
            for (let i = 0; i < binaryValue.length; i++) {
                const position = binaryValue.length - 1 - i;
                const digit = parseInt(binaryValue[i]);
                const value = digit * Math.pow(2, position);
                
                if (digit === 1) {
                    conversionSteps.push(`${digit} × 2^${position} = ${value}`);
                    sum += value;
                }
            }
            
            explanation += conversionSteps.join(' + ');
            explanation += ` = ${decimalValue}\n\n`;
            explanation += `Therefore, ${binaryValue} in decimal is ${decimalValue}.`;
        }
    }
    else if (problemType === "morse_code") {
        // Morse code problems
        const morseCode = {
            'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.', 'F': '..-.',
            'G': '--.', 'H': '....', 'I': '..', 'J': '.---', 'K': '-.-', 'L': '.-..',
            'M': '--', 'N': '-.', 'O': '---', 'P': '.--.', 'Q': '--.-', 'R': '.-.',
            'S': '...', 'T': '-', 'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-',
            'Y': '-.--', 'Z': '--..', '0': '-----', '1': '.----', '2': '..---',
            '3': '...--', '4': '....-', '5': '.....', '6': '-....', '7': '--...',
            '8': '---..', '9': '----.'
        };
        
        // Generate a random word instead of using a hardcoded word pool
        const word = generateRandomWord(3, 4).toUpperCase(); // Shorter word for Morse code (3-4 letters)
        
        let morseWord = "";
        for (let i = 0; i < word.length; i++) {
            morseWord += morseCode[word[i]] + " ";
        }
        morseWord = morseWord.trim();
        
        if (Math.random() > 0.5) {
            // Text to Morse
            question = `Convert "${word}" to Morse code.`;
            answer = morseWord;
            
            // Create explanation
            explanation = `To convert text to Morse code, we replace each letter with its corresponding Morse code representation.\n\n` +
                `Here's the conversion for each letter in "${word}":\n`;
                
            for (let i = 0; i < word.length; i++) {
                explanation += `${word[i]} → ${morseCode[word[i]]}\n`;
            }
            
            explanation += `\nCombining these with spaces between each letter's code, we get:\n` +
                `${morseWord}\n\n` +
                `Therefore, "${word}" in Morse code is "${morseWord}".`;
        } else {
            // Morse to text
            question = `Convert the Morse code "${morseWord}" to text.`;
            answer = word;
            
            // Create explanation
            explanation = `To convert Morse code to text, we replace each Morse code representation with its corresponding letter.\n\n` +
                `First, let's separate the Morse code symbols by spaces:\n` +
                `"${morseWord}"\n\n` +
                `Now, we convert each Morse code symbol to its corresponding letter:\n`;
                
            const morseChars = morseWord.split(' ');
            for (let i = 0; i < morseChars.length; i++) {
                // Find the letter corresponding to this Morse code
                let letter = '';
                for (const [key, value] of Object.entries(morseCode)) {
                    if (value === morseChars[i]) {
                        letter = key;
                        break;
                    }
                }
                
                explanation += `${morseChars[i]} → ${letter}\n`;
            }
            
            explanation += `\nCombining these letters, we get:\n` +
                `${word}\n\n` +
                `Therefore, the Morse code "${morseWord}" translates to "${word}".`;
        }
    }
    else {  // basic_hash
        // Simple hash function problems
        // Generate a random word instead of using a hardcoded word pool
        const word = generateRandomWord(3, 4).toUpperCase(); // Shorter word for hash (3-4 letters)
        
        // Simple hash function: sum of ASCII values
        let hashValue = 0;
        for (let i = 0; i < word.length; i++) {
            hashValue += word.charCodeAt(i);
        }
        
        question = `Calculate the hash value of "${word}" by summing the ASCII values of each character (A=65, B=66, etc.).`;
        answer = hashValue;
        
        // Create explanation
        explanation = `A simple hash function can be created by summing the ASCII values of each character in a string.\n\n` +
            `For the word "${word}", we calculate the ASCII value of each character and sum them:\n`;
            
        for (let i = 0; i < word.length; i++) {
            const char = word[i];
            const asciiValue = word.charCodeAt(i);
            explanation += `ASCII value of '${char}' = ${asciiValue}\n`;
        }
        
        explanation += `\nSum of ASCII values = `;
        for (let i = 0; i < word.length; i++) {
            explanation += `${word.charCodeAt(i)}`;
            if (i < word.length - 1) {
                explanation += ` + `;
            }
        }
        
        explanation += ` = ${hashValue}\n\n` +
            `Therefore, the hash value of "${word}" is ${hashValue}.`;
    }
    
    // Generate multiple choice options
    const options = generateCryptographyOptions(answer, problemType);
    
    return {
        type: "cryptography",
        question: question,
        options: options,
        correct_answer: answer,
        explanation: explanation
    };
}

// Helper functions for cryptography problems
function caesarCipher(text, shift) {
    let result = "";
    
    for (let i = 0; i < text.length; i++) {
        let char = text[i];
        
        if (char.match(/[A-Z]/i)) {
            const code = text.charCodeAt(i);
            
            // Uppercase letters
            if (code >= 65 && code <= 90) {
                char = String.fromCharCode(((code - 65 + shift) % 26) + 65);
            }
            // Lowercase letters
            else if (code >= 97 && code <= 122) {
                char = String.fromCharCode(((code - 97 + shift) % 26) + 97);
            }
        }
        
        result += char;
    }
    
    return result;
}

// Function to generate a random word of specified length
function generateRandomWord(minLength, maxLength) {
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const length = randomInt(minLength, maxLength);
    let word = "";
    
    // Generate consonants and vowels in a somewhat alternating pattern for more pronounceable words
    const vowels = "AEIOU";
    const consonants = "BCDFGHJKLMNPQRSTVWXYZ";
    
    let useVowel = Math.random() > 0.5; // Start with either vowel or consonant
    
    for (let i = 0; i < length; i++) {
        if (useVowel) {
            word += vowels[randomInt(0, vowels.length - 1)];
        } else {
            word += consonants[randomInt(0, consonants.length - 1)];
        }
        
        // 70% chance to alternate between vowel and consonant for more natural words
        if (Math.random() < 0.7) {
            useVowel = !useVowel;
        }
    }
    
    return word;
}

// Function to generate a random substitution cipher
function generateRandomSubstitution(alphabet) {
    // Make a copy of the alphabet and shuffle it
    const letters = alphabet.split('');
    
    // Fisher-Yates shuffle algorithm
    for (let i = letters.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [letters[i], letters[j]] = [letters[j], letters[i]];
    }
    
    return letters.join('');
}

function generateCryptographyOptions(correctAnswer, problemType) {
    const options = [correctAnswer];
    
    if (problemType === "caesar_cipher" || problemType === "substitution_cipher" || problemType === "morse_code") {
        // For text-based answers, create variations
        if (typeof correctAnswer === 'string') {
            // Create variations by changing letters
            const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
            
            for (let i = 0; i < 5 && options.length < 4; i++) {
                let variation = correctAnswer;
                
                // Change 1-2 characters
                const numChanges = (correctAnswer.length > 2) ? randomInt(1, 2) : 1;
                
                for (let j = 0; j < numChanges; j++) {
                    const pos = randomInt(0, variation.length - 1);
                    let newChar;
                    
                    if (variation[pos].match(/[A-Z]/)) {
                        do {
                            const charIndex = randomInt(0, 25);
                            newChar = alphabet[charIndex];
                        } while (newChar === variation[pos]);
                        
                        variation = variation.substring(0, pos) + newChar + variation.substring(pos + 1);
                    }
                }
                
                if (variation !== correctAnswer && !options.includes(variation)) {
                    options.push(variation);
                }
            }
        }
    } 
    else if (problemType === "binary_conversion") {
        // For binary/decimal conversions
        const value = parseInt(correctAnswer);
        
        if (isNaN(value)) {
            // If answer is binary string, create wrong binary strings
            const binary = correctAnswer;
            const decimal = parseInt(binary, 2);
            
            for (let i = -2; i <= 2; i++) {
                if (i !== 0) {
                    const newValue = decimal + i;
                    if (newValue > 0) {
                        const wrongBinary = newValue.toString(2);
                        if (!options.includes(wrongBinary)) {
                            options.push(wrongBinary);
                        }
                    }
                }
            }
            
            // Add a binary with a bit flipped
            if (binary.length > 1) {
                const pos = randomInt(0, binary.length - 1);
                const flippedBit = binary.charAt(pos) === '0' ? '1' : '0';
                const wrongBinary = binary.substring(0, pos) + flippedBit + binary.substring(pos + 1);
                if (!options.includes(wrongBinary)) {
                    options.push(wrongBinary);
                }
            }
        } else {
            // If answer is decimal, create wrong decimal values
            for (let i = -2; i <= 2; i++) {
                if (i !== 0) {
                    const wrongValue = value + i;
                    if (wrongValue > 0 && !options.includes(wrongValue)) {
                        options.push(wrongValue);
                    }
                }
            }
            
            // Also add values that would result from common binary conversion errors
            const binary = value.toString(2);
            if (binary.length > 1) {
                const pos = randomInt(0, binary.length - 1);
                const flippedBit = binary.charAt(pos) === '0' ? '1' : '0';
                const wrongBinary = binary.substring(0, pos) + flippedBit + binary.substring(pos + 1);
                const wrongValue = parseInt(wrongBinary, 2);
                
                if (!options.includes(wrongValue)) {
                    options.push(wrongValue);
                }
            }
        }
    }
    else {  // basic_hash
        // For hash values
        const value = parseInt(correctAnswer);
        
        // Create variations by adding/subtracting
        for (let i = -10; i <= 10; i += 5) {
            if (i !== 0) {
                const variation = value + i;
                if (variation > 0 && !options.includes(variation)) {
                    options.push(variation);
                }
            }
        }
        
        // Add some common errors like digit transposition
        const valueStr = value.toString();
        if (valueStr.length > 1) {
            const pos = randomInt(0, valueStr.length - 2);
            const transposed = valueStr.substring(0, pos) + 
                               valueStr.charAt(pos + 1) + 
                               valueStr.charAt(pos) + 
                               valueStr.substring(pos + 2);
            
            const transposedValue = parseInt(transposed);
            if (!options.includes(transposedValue)) {
                options.push(transposedValue);
            }
        }
    }
    
    // Ensure we have exactly 4 options
    while (options.length < 4) {
        if (typeof correctAnswer === 'string') {
            // Create a random string variation
            const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
            let variation = "";
            
            for (let i = 0; i < correctAnswer.length; i++) {
                if (Math.random() < 0.3) {
                    variation += chars[randomInt(0, chars.length - 1)];
                } else {
                    variation += correctAnswer[i];
                }
            }
            
            if (variation !== correctAnswer && !options.includes(variation)) {
                options.push(variation);
            }
        } else {
            // Create a random numerical variation
            const variation = correctAnswer + randomInt(-20, 20);
            if (variation !== correctAnswer && !options.includes(variation) && variation > 0) {
                options.push(variation);
            }
        }
    }
    
    // Take only the first 4 options and shuffle
    return options.slice(0, 4).sort(() => Math.random() - 0.5);
}

// Utility functions for random number generation and rounding
function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function preciseRound(num, decimals) {
    const factor = Math.pow(10, decimals);
    return Math.round((num + Number.EPSILON) * factor) / factor;
}