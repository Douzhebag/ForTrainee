const bill = document.getElementById('bill');
const items = document.querySelectorAll('.items');
const custom = document.getElementById('custom');
const personbox = document.getElementById('number-box');
const tipDisplay = document.getElementById('tip');
const priceperPerson = document.getElementById('price-person');
const btn = document.getElementById('btn');

function getTipPercent() {
    if (custom.value !== '' && parseFloat(custom.value) >= 0) {
        return parseFloat(custom.value);
    }
    const activeItem = document.querySelector('.items.active');
    return activeItem ? parseInt(activeItem.innerText) : 0;
}

function updateUI() {
    const billAmount = parseFloat(bill.value) || 0;
    const tipPercent = getTipPercent();
    const personCount = parseInt(personbox.value) || 0;

    if (personCount <= 0 || billAmount <= 0) {
        tipDisplay.innerText = '$0.00';
        priceperPerson.innerText = '$0.00';
        return;
    }

    const totalTip = billAmount * (tipPercent / 100);
    const totalBill = billAmount + totalTip;

    const tipPerPerson = totalTip / personCount;
    const totalPerPerson = totalBill / personCount;

    tipDisplay.innerText = `$${tipPerPerson.toFixed(2)}`;
    priceperPerson.innerText = `$${totalPerPerson.toFixed(2)}`;
}
items.forEach((item) => {
    item.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        items.forEach((i) => i.classList.remove('active'));
        custom.value = '';

        if (!isActive) {
            item.classList.add('active');
        }
        updateUI();
    });
});

custom.addEventListener('input', () => {
    items.forEach((i) => i.classList.remove('active'));
    updateUI();
});

bill.addEventListener('input', updateUI);
personbox.addEventListener('input', updateUI);

btn.addEventListener('click', () => {
    bill.value = '';
    personbox.value = '';
    custom.value = '';
    items.forEach((i) => i.classList.remove('active'));
    tipDisplay.innerText = '$0.00';
    priceperPerson.innerText = '$0.00';
});
