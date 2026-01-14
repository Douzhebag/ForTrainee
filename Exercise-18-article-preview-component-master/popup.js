const sharebtn = document.getElementById('share-button');
const shareicon = document.getElementById('share-image');
const popUp = document.getElementById('popups');
const mediaQuery = window.matchMedia('(max-width: 1024px)');
const proFile = document.querySelector('.profile');
const sharebtnipad = document.getElementById('share-button-ipad');

function toggleShare() {
    const isIpad = mediaQuery.matches;

    sharebtn.classList.toggle('selected');

    if (sharebtn.classList.contains('selected')) {
        sharebtn.style.backgroundColor = 'hsl(217, 19%, 35%)';
        shareicon.style.filter = 'brightness(0) invert(1)';
        popUp.style.display = 'flex';
        if (isIpad) {
            proFile.style.display = 'none';
            popUp.classList.add('popups-ipad');
        }
    } else {
        resetShare();
    }
}

function resetShare() {
    sharebtn.style.backgroundColor = 'hsl(210, 46%, 95%)';
    sharebtnipad.style.backgroundColor = 'hsl(210, 46%, 95%)';
    shareicon.style.filter = 'brightness(1)';
    popUp.style.display = 'none';
    popUp.classList.remove('popups-ipad');
    proFile.style.display = 'flex';
}
function resetShareIpad() {
    sharebtn.style.backgroundColor = 'hsl(210, 46%, 95%)';
    sharebtnipad.style.backgroundColor = 'hsl(214, 17%, 51%)';
    shareicon.style.filter = 'brightness(1)';
    popUp.classList.remove('popups-ipad');
    proFile.style.display = 'flex';
}

function toggleShareipad() {
    const isIpad = mediaQuery.matches;
    sharebtnipad.classList.toggle('selected-ipad');

    if (sharebtnipad.classList.contains('selected-ipad')) {
        sharebtnipad.style.backgroundColor = 'hsl(212, 23%, 69%)';
        shareicon.style.filter = 'brightness(0) invert(1)';
        popUp.style.display = 'flex';
    }
    if (isIpad) {
        proFile.style.display = 'flex';
        popUp.style.display = 'none';
        sharebtn.classList.remove('selected')
    } else {
        resetShareIpad();
    }
}
function handleScreenChange(e) {
    if (!e.matches && sharebtn.classList.contains('selected-ipad')) {
        resetShare();
    }
}

handleScreenChange(mediaQuery);

sharebtnipad.addEventListener('click', toggleShareipad);
sharebtn.addEventListener('click', toggleShare);
mediaQuery.addEventListener('change', handleScreenChange);
