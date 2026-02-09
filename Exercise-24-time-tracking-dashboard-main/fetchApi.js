const gridContainer = document.getElementById('grid-container');
const daily = document.getElementById('Daily');
const weekly = document.getElementById('Weekly');
const monthly = document.getElementById('Monthly');

const cardColors = [
    'orange-card',
    'blue-card',
    'pink-card',
    'green-card',
    'purple-card',
    'yellow-card',
];

async function fetchData() {
    try {
        const response = await fetch('data.json');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
        return [];
    }
}

async function inputDataDailyONHTML() {
    const data = await fetchData();

    const cardsHTML = data
        .map((item, index) => `
        <div class="card ${cardColors[index]}">
            <div class="background-card">
                <img src="./images/icon-${item.title.toLowerCase().replace(/\s+/g, '-')}.svg" alt="${item.title} icon" />
            </div>
            <div class="data-card">
                <div class="header-card">
                    <p>${item.title}</p>
                    <img src="./images/icon-ellipsis.svg" alt="icon-ellipsis" class="ellipsis"/>
                </div>
                <div class="caption-card">
                    <p class="hour">${item.timeframes.daily.current}hrs</p>
                    <p class="lastweek">Last Week <span>${item.timeframes.daily.previous}hrs</span></p>
                </div>
            </div>
        </div>
    `,
        )
        .join('');
    gridContainer.innerHTML = cardsHTML;
}
async function inputDataWeeklyONHTML() {
    const data = await fetchData();

    const cardsHTML = data
        .map(
            (item, index) => `
        <div class="card ${cardColors[index]}">
            <div class="background-card">
                <img src="./images/icon-${item.title.toLowerCase().replace(/\s+/g, '-')}.svg" alt="${item.title} icon" />
            </div>
            <div class="data-card">
                <div class="header-card">
                    <p>${item.title}</p>
                    <img src="./images/icon-ellipsis.svg" alt="icon-ellipsis" class="ellipsis"/>
                </div>
                <div class="caption-card">
                    <p class="hour">${item.timeframes.weekly.current}hrs</p>
                    <p class="lastweek">Last Week <span>${item.timeframes.weekly.previous}hrs</span></p>
                </div>
            </div>
        </div>
    `,
        )
        .join('');

    gridContainer.innerHTML = cardsHTML;
}
async function inputDataMonthlyONHTML() {
    const data = await fetchData();

    const cardsHTML = data
        .map(
            (item, index) => `
        <div class="card ${cardColors[index]}">
            <div class="background-card">
                <img src="./images/icon-${item.title.toLowerCase().replace(/\s+/g, '-')}.svg" alt="${item.title} icon" />
            </div>
            <div class="data-card">
                <div class="header-card">
                    <p>${item.title}</p>
                    <img src="./images/icon-ellipsis.svg" alt="icon-ellipsis" class="ellipsis"/>
                </div>
                <div class="caption-card">
                    <p class="hour">${item.timeframes.monthly.current}hrs</p>
                    <p class="lastweek">Last Week <span>${item.timeframes.monthly.previous}hrs</span></p>
                </div>
            </div>
        </div>
    `,
        )
        .join('');

    gridContainer.innerHTML = cardsHTML;
}

daily.addEventListener('click', inputDataDailyONHTML);
weekly.addEventListener('click', inputDataWeeklyONHTML);
monthly.addEventListener('click', inputDataMonthlyONHTML);

inputDataDailyONHTML();
