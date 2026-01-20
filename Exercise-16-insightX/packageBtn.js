const Websitebtn = document.querySelector('.website-type');
const Marketingbtn = document.querySelector('.marketing-type');
const Beforepackage = document.querySelector('.second-package-container');
const Afterpackage = document.querySelector('.second-after-package-container');

Websitebtn.addEventListener('click', afterPackage);
Marketingbtn.addEventListener('click', beforePackage);

function afterPackage(e) {
    e.preventDefault();
    Beforepackage.style.display = 'block';
    Websitebtn.style.backgroundColor = 'black';
    Websitebtn.style.color = 'white';
    Marketingbtn.style.backgroundColor = 'white';
    Marketingbtn.style.color = 'black';
    Afterpackage.style.display = 'none';
    Websitebtn.style.transitionDelay = '0.1s';
}
// function beforePackage(e) {
//     e.preventDefault();
// }
function beforePackage(e) {
    e.preventDefault();
    Afterpackage.style.display = 'block';
    Beforepackage.style.display = 'none';
    Marketingbtn.style.backgroundColor = 'black';
    Marketingbtn.style.color = 'white';
    Websitebtn.style.backgroundColor = 'white';
    Websitebtn.style.color = 'black';
    Marketingbtn.style.transitionDelay = '0.1s';
}
