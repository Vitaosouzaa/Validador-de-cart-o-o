// Function to validate credit card number and determine the issuer
function validateCreditCard(cardNumber) {
    // Remove any non-digit characters
    const sanitizedNumber = cardNumber.replace(/\D/g, '');

    // Validate card number length
    if (sanitizedNumber.length < 13 || sanitizedNumber.length > 19) {
        return { valid: false, issuer: null };
    }

    // Determine the issuer
    let issuer = null;
    if (/^4/.test(sanitizedNumber)) {
        issuer = 'Visa';
    } else if (/^5[1-5]/.test(sanitizedNumber) || /^(222[1-9]|22[3-9][0-9]|2[3-6][0-9]{2}|27[01][0-9]|2720)/.test(sanitizedNumber)) {
        issuer = 'MasterCard';
    } else if (/^(4011|4312|4389)/.test(sanitizedNumber)) {
        issuer = 'Elo';
    } else if (/^3[47]/.test(sanitizedNumber)) {
        issuer = 'American Express';
    } else if (/^(6011|65)/.test(sanitizedNumber)) {
        issuer = 'Discover';
    } else if (/^6062/.test(sanitizedNumber)) {
        issuer = 'Hipercard';
    }

    // Validate using Luhn algorithm
    const isValid = luhnCheck(sanitizedNumber);

    return { valid: isValid, issuer: issuer };
}

// Luhn algorithm to validate credit card number
function luhnCheck(cardNumber) {
    let sum = 0;
    let shouldDouble = false;

    // Process each digit from right to left
    for (let i = cardNumber.length - 1; i >= 0; i--) {
        let digit = parseInt(cardNumber[i], 10);

        if (shouldDouble) {
            digit *= 2;
            if (digit > 9) {
                digit -= 9;
            }
        }

        sum += digit;
        shouldDouble = !shouldDouble;
    }

    return sum % 10 === 0;
}

// Example usage
const cardNumber = '4485797788021019'; // Replace with actual card number
const result = validateCreditCard(cardNumber);
console.log(`Card Number: ${cardNumber}, Valid: ${result.valid}, Issuer: ${result.issuer}`);