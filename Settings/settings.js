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



/**/



/*Function for Sign Out with verified token*/

const sign_out = document.getElementById("sign_out");

sign_out.addEventListener("click", ()=> {

    sessionStorage.removeItem(token);
    window.location.href = "http://127.0.0.1:5501/Login/login.html";

})