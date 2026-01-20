const ratingItems = document.querySelectorAll('.rating-list-items');
const submitbtn = document.getElementById('submit');

submitbtn.addEventListener('click', inputRate);

function inputRate(e) {
    e.preventDefault();
    let p = document.createElement('p');
    p.innerHTML = ratingItems.values;
}

