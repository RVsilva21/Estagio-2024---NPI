//Animações Menu Lateral
const items = document.querySelectorAll('.items');
const arrow = document.querySelector('#arrowLeft');
const lateralmenu = document.querySelector('.menu');
const contentPage = document.querySelector('.content');
const btnNewCustomer = document.getElementById('btnNewCustomer');
const modalCreate = document.querySelector('.ModalCreate');
const closerC = document.getElementById('closerC');

const token = sessionStorage.getItem("authToken");

function selectItem() {
    items.forEach((item) => {
        item.classList.remove('colorItems')
    })
    this.classList.add('colorItems')
}

items.forEach((item) => {
    item.addEventListener('click', selectItem)
})

arrow.addEventListener('click', () => {
    lateralmenu.classList.toggle('retract')
    contentPage.classList.toggle('expand')
})



/*Function Logout System*/
 document.addEventListener("DOMContentLoaded", ()=> {

    try {

        if(!token) {

            window.location.href = "http://127.0.0.1:5501/Login/login.html";
        }

        else {

            btnCreateUser();
            openModalRegisterUser();
            closeModalRegisterUser();
            
        }

    } catch(error) {

        console.log("Error", error);
    }
 })



const r_name = document.getElementById("r_name");
const r_email = document.getElementById("r_email");
const r_nickname = document.getElementById("r_nickname");
const r_password = document.getElementById("r_password");
const r_role = document.getElementById("r_role");


/*Create new user after verify token*/

const urlCreateUser = "http://localhost:8085/auth/new_register";

async function createUser(urlCreateUser) {

    const response = await fetch(urlCreateUser, {

        headers: {

            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`

        },
        method: "POST",
        body: JSON.stringify({

            name: r_name.value,
            userName: r_nickname.value,
            userEmail: r_email.value,
            userPassword: r_password.value,
            role: r_role.value

        })
    })

    const result = response.json();
}



/*Open Modal after verify token*/
const reg_user = document.getElementById("reg_user");

reg_user.addEventListener("click", ()=> {

     modalUser.style.display = "block";

})


/*Close Modal after verify token*/
const close_user = document.getElementById("close_user");

close_user.addEventListener("click", ()=> {

    modalUser.style.display = "none";

})



/*btnCreateUser*/
const registerUser = document.getElementById("registerUser");
const modalUser = document.querySelector(".ModalUser");

function btnCreateUser() {

    registerUser.addEventListener("click", ()=> {
        
        createUser(urlCreateUser);
        modalUser.style.display = "none";
        window.location.reload(true);
    })

}



/*Function for Sign Out with verified token*/

const sign_out = document.getElementById("sign_out");

sign_out.addEventListener("click", ()=> {

    sessionStorage.removeItem(token);
    window.location.href = "http://127.0.0.1:5501/Login/login.html";

})
