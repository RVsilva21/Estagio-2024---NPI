const register = document.querySelector(".register");
const input_name = document.querySelector(".name");
const input_nickname = document.querySelector(".nickname");
const input_email = document.querySelector(".email");
const input_password = document.querySelector(".password");
const userRole = document.querySelector(".userRole");


// Register Users

const urlRegister = "http://localhost:8085/auth/register";

async function registerUser(urlRegister) {

    const response = await fetch(urlRegister, {

        headers: {

            "Accept": "application/json",
            "Content-Type": "application/json"

        },

        method: 'POST',

        body: JSON.stringify({
            name: input_name.value,
            userEmail: input_email.value,
            userName: input_nickname.value,
            userPassword: input_password.value,
            role: userRole.value
        })
    });
}


register.addEventListener("click", () => {
       
    if ((input_name.value && input_nickname.value
        && input_email.value && input_password.value 
        && userRole.value) === "") {

            alert("Preencha todos os campos!");

    } else {
        registerUser(urlRegister);
        alert("Cadastro Feito com Sucesso! Você será redirecionado a página de login.");
        setTimeout(redirectPage, 1000);
    }
})

function redirectPage() {
    window.location.href = "http://127.0.0.1:5501//Login/login.html";
}
