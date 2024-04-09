const register = document.querySelector(".register");
const input_name = document.querySelector(".name");
const input_email = document.querySelector(".email");
const input_password = document.querySelector(".password");

function send_register() {

    fetch("http://localhost:8080/register",

        {
            headers: {

                'Accept': 'application/json',
                'Content-Type': 'application/json'

            },

            method: "POST",
            body: JSON.stringify({

                name: input_name.value,
                email: input_email.value,
                password: input_password.value
            })

        })
        .then(function (res) {
            console.log(res)
        })

        .catch(function (res) {
            console.log(res)
        })

}

function clear() {

    input_name.value = "";
    input_email.value = "";
    input_password.value = "";

}

register.addEventListener('click', function () {

    send_register();
    clear();
    
});

