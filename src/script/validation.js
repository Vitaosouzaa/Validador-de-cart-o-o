
const validCard = document.getElementById('card-number');
const validButton = document.getElementById('validate-btn');
const resultMessage = document.getElementById('result')

function validateCardNumber(cardNumber) {
    let sum = 0;
    let shouldDouble = false;

    // Percorre os dígitos do cartão de trás para frente
    for (let i = cardNumber.length - 1; i >= 0; i--) {
        let digit = parseInt(cardNumber[i]);

        if (shouldDouble) {
            digit *= 2;
            if (digit > 9) {
                digit -= 9;
            }
        }

        sum += digit;
        shouldDouble = !shouldDouble;
    }

    // O número é válido se a soma for múltiplo de 10
    return sum % 10 === 0;
};

function getCardBrand(cardNumber) {
    const brands = {
        Visa: /^4[0-9]{12}(?:[0-9]{3})?$/,
        MasterCard: /^5[1-5][0-9]{14}$/,
        Amex: /^3[47][0-9]{13}$/,
        Discover: /^6(?:011|5[0-9]{2})[0-9]{12}$/,
        JCB: /^(?:2131|1800|35\d{3})\d{11}$/,
        Diners: /^3(?:0[0-5]|[68][0-9])[0-9]{11}$/,
    };

    for (const [brand, regex] of Object.entries(brands)) {
        if (regex.test(cardNumber)) {
            return brand;
        }
    }
    return 'Desconhecida';
}

validButton.addEventListener('click', () => {
    const cardNumber = validCard.value.replace(/\s+/g, '');

     if (cardNumber === '' || isNaN(cardNumber)) {
        resultMessage.textContent = 'Por favor, insira um número válido.';
        resultMessage.style.color = 'red';
        return;
    }

    const cardBrand = getCardBrand(cardNumber);

    if (validateCardNumber(cardNumber)) {
        resultMessage.textContent = `Cartão válido! Bandeira: ${cardBrand}`;
        resultMessage.style.color = 'green';
    } else {
        resultMessage.textContent = `Cartão inválido! Bandeira: ${cardBrand}`;
        resultMessage.style.color = 'red';
    }
});