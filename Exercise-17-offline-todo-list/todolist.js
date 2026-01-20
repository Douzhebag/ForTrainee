const searchbtn = document.getElementById('search-button');
const task = document.getElementById('task');
const search = document.getElementById('search');
const listContainer = document.getElementById('list-container');

searchbtn.addEventListener('click', addtask);

function addtask() {
    if (search.value === '') {
        alert('กรุณากรอกข้อมูล');
    } else {
        let li = document.createElement('li');
        li.innerHTML = search.value;
        listContainer.appendChild(li);
        let span = document.createElement('span');
        span.innerHTML = '\u00d7';
        li.appendChild(span);
    }
    search.value = '';
    saveData();
}

listContainer.addEventListener(
    'click',
    function (e) {
        if (e.target.tagName === 'LI') {
            e.target.classList.toggle('checked');
        } else if (e.target.tagName === 'SPAN') {
            e.target.parentElement.remove();
            saveData();
        }
    },
    false
);

function saveData() {
    localStorage.setItem('data', listContainer.innerHTML);
}

function showTask() {
    listContainer.innerHTML = localStorage.getItem('data');
}
showTask();
