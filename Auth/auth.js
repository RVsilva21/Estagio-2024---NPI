const nickname = document.querySelector(".nickname");
const password = document.querySelector(".password");
const enter = document.querySelector(".enter");

const urlLogin = "http://localhost:8085/auth/login";

async function userLogin(urlLogin) {

    try {
        const response = await fetch(urlLogin, {

            headers: {
                "Content-Type": "application/json"
            },

            method: 'POST',
            body: JSON.stringify({

                userName: nickname.value,
                userPassword: password.value
            })
        })

        if (!response.ok) {
            throw new Error("Erro ao fazer login");
        }
        else {

            const data = await response.json();
            const token = data.token;

            console.log(token);

            sessionStorage.setItem('authToken', token);

            window.location.href = "http://127.0.0.1:5501/Home/home.html"
        }

    } catch (error) {
        console.error('Erro no login:', error);
        alert('Login falhou!');
    }
}


enter.addEventListener("click", ()=> {

    userLogin(urlLogin);
})