const input = document.getElementById('input-email');
const submitButton = document.getElementById('submit');
const errorMessage = document.getElementById('error-message');
const beforeCard = document.getElementById('before-card');
const afterCard = document.getElementById('after-card');
const afterButton = document.getElementById('after-button');

afterButton.addEventListener('click', dismissSubmit);
submitButton.addEventListener('click', validateEmail);

async function dismissSubmit(event) {
    event.preventDefault();
    beforeCard.style.display = 'flex';
    afterCard.style.display = 'none';
}
async function validateEmail(event) {
    event.preventDefault();
    const emailValue = input.value.trim();
    const validation =
        /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g;
    if (emailValue === '') {
        errorMessage.textContent = 'Validate email require!';
        input.style.borderColor = 'var(--Red)';
        input.style.backgroundColor = '#FFE8E6';
        return;
    } else if (!validation.test(emailValue)) {
        errorMessage.textContent = 'Validate email require!';
        input.style.borderColor = 'var(--Red)';
        input.style.backgroundColor = '#FFE8E6';
        return;
    } else {
        errorMessage.textContent = '';
        input.style.borderColor = '';
        input.style.backgroundColor = '';
        input.value = '';
        beforeCard.style.display = 'none';
        afterCard.style.display = 'flex';
    }
}
