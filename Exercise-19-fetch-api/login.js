const user = document.getElementById('username');
const pass = document.getElementById('password');
const btn = document.getElementById('submit');
const item = document.getElementById('item')
async function login() {
    try {   
        const api = await fetch(
            'https://api.learnhub.thanayut.in.th/auth/login',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: user.value    ,
                    password: pass.value,
                }),
            }
        );
        if (!user.value || !pass.value) {
            alert('กรุณากรอก Username หรือ Password');
            return;
        }
        const data = await api.json();
        if (!data.accessToken) {
            alert('กรุณากรอก Username หรือ Password ให้ถูกต้อง');
            return;
        }
        localStorage.setItem('accesTokenNaja', data.accessToken);
        const userData = await fetch(
            'https://api.learnhub.thanayut.in.th/auth/me',
            {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${data.accessToken}`,
                },
            }
        );
        const userLogin = await userData.json();
        alert('เข้าสู่ระบบ');
        return userLogin;
    } catch (error) {
        console.log('Error:', error);
    }
    user.value = '';
    pass.value = '';
}

async function valueItem() {
    try {
        const userBody = await login();
        if (!userBody) {
            return userBody;
        }
        const loginHTML = `
    <section>
        <p>id:${userBody.id}</p>
        <p>username:${userBody.username}</p>
        <p>name:${userBody.name}</p>
        <p>registeredAt:${userBody.registeredAt}</p>
    </section>
    `;
        item.innerHTML = loginHTML;
    } catch (error) {
        alert('เข้าสู้ระบบไม่สำเร็จ');
    }
}
btn.addEventListener('click', async (event) => {
    event.preventDefault();
    await valueItem();
});





