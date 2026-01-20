// const beforeSubmit = document.getElementById('before-submit');
// const afterSubmit = document.getElementById('after-submit');
// const button = document.getElementById('submit');
// const ratingItems = document.querySelectorAll('.rating-list-items');
// const ratingDisplay = document.getElementById('rating-display');

// let selectedRating = 0;

// const handleSubmit = (e) => {
//     e.preventDefault();
//     if (beforeSubmit && afterSubmit) {
//         beforeSubmit.style.display = 'none';
//         afterSubmit.style.display = 'flex';
//         ratingDisplay.textContent = selectedRating;
//     }
// };

// ratingItems.forEach((item) => {
//     // เพิ่ม event listener แบบ 'click' ให้กับแต่ละ item
//     item.addEventListener('click', () => {
//         // วนลูปผ่านทุก rating item เพื่อลบ class 'selected' ออกจากทั้งหมด
//         ratingItems.forEach((i) => {
//             i.classList.remove('selected');
//         });
//         // เพิ่ม class 'selected' ให้เฉพาะ item ที่คลิก
//         item.classList.add('selected');
//         // เก็บค่าของ item ที่คลิก (ตัวเลข 1-5) ลงในตัวแปร selectedRating
//         selectedRating = item.textContent;
//     });
// });

// button.addEventListener('click', handleSubmit);
const beforeSubmit = document.getElementById('before-submit');
const afterSubmit = document.getElementById('after-submit');
const button = document.getElementById('submit');
const ratingItems = document.querySelectorAll('.rating-list-items');
const ratingDisplay = document.getElementById('rating-display');

let rating = 0;

const ratingViews = () => {
    ratingItems.forEach((item) => {
        item.addEventListener('click', () => {
            ratingItems.forEach((i) => i.classList.remove('selected'));
            item.classList.add('selected');
            rating = item.innerHTML;
        });
    });
    button.addEventListener('click', (e) => {
        e.preventDefault();
        if (beforeSubmit && afterSubmit) {
            beforeSubmit.style.display = 'none';
            afterSubmit.style.display = 'flex';
            ratingDisplay.innerHTML = `${rating}`;
        }
    });
};
ratingViews();
