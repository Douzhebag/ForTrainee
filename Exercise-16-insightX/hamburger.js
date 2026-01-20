const hamburger = document.getElementById('burger-menu');
const sidebar = document.querySelector('.sidebar');
const closesidebar = document.querySelector('.close-icon');
const arrowdown = document.querySelector('.icon-sidebar');
const arrowdowncontent = document.querySelector('.arrow-content');

hamburger.addEventListener('click', showSidebar);-
closesidebar.addEventListener('click', hideSidebar);
arrowdown.addEventListener('click', arrowdownOpen);

function showSidebar(e) {
        
    if (window.innerWidth <= 1203) {
        sidebar.style.display = 'flex';
        sidebar.classList.toggle('active');
    }
}   
function hideSidebar(e) {
    e.preventDefault();
    sidebar.style.display = 'none';
}

function arrowdownOpen(e) {
    e.preventDefault();
    arrowdowncontent.classList.toggle('arrow-toggle');
    arrowdown.classList.toggle('rotate');
}
