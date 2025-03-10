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

btnNewCustomer.addEventListener('click', () => {
    modalCreate.style.display = 'block';
})

closerC.addEventListener('click', () => {
    modalCreate.style.display = 'none';
})



/*Verify Token*/

document.addEventListener("DOMContentLoaded", async() => {

    try {

        if(!token) {

            window.location.href = "http://127.0.0.1:5501/Login/login.html";

        } else {

            btnGetCustomer();
            btnPostCustomer();
            btnUpdateCustomer();
            btnDeleteCustomer();

        }

    } catch(error) {

        console.log("Error", error);
    }
})



//Método GET
const search = document.getElementById('searchC');
const table = document.querySelector('.bodyTable');
const modalEdit = document.querySelector('.ModalEdit');

const urlGet = "http://localhost:8085/customersList";

async function getCustomer(urlGet) {
    const response = await fetch(urlGet, { 
        
        headers: {

            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        method: "GET" 
    
    });

    var dataCustomer = await response.json();
    result = dataCustomer;
    addRows(result);

}

function addRows(result) {

    var lineId = 0;
    var row = "";

    for (let z in result) {
        
        lineId += 1;
        row += `
        <tr id ="${lineId}">
        <td class ="id_customer"style="display:none">${result[z].id_customer}</td>
        <td class="name">${result[z].name}</td>
        <td class="phone">${result[z].phone}</td>
        <td class="e_mail">${result[z].e_mail}</td>
        <td class="type">${result[z].type}</td>
        <td class="address">${result[z].address}</td>
        <td class="city">${result[z].city}</td>
        <td class="editCustomer"><i class="edit"><img src="/assets/icons/Edit.svg" width="20" height="20"></i><span></span><i class="delete"><img src="/assets/icons/Delete.svg" width="20" height="20"></i></td>
        </tr>
        `
        table.innerHTML = row;
    }
}



//Método POST
const form = document.querySelector(".formsCustomerC");
const name = document.querySelector(".name");
const type = document.querySelector(".type");
const phone = document.querySelector(".phone");
const city = document.querySelector(".city");
const e_mail = document.querySelector(".e_mail");
const address = document.querySelector(".address");

const urlPost = 'http://localhost:8085/createCustomers';

async function postCustomer(urlPost) {
    const response = await fetch(urlPost,
        
        {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${token}`
            },

            method: "POST",
            body: JSON.stringify({
                name: name.value,
                type: type.value,
                phone: phone.value,
                city: city.value,
                e_mail: e_mail.value,
                address: address.value
            })
        })
        

    customer = await response.json();
    result = customer;
}



/*Function btnPostCustomer after verify token*/

function btnPostCustomer() {
form.addEventListener('submit', () => {
    postCustomer(urlPost);
})
}



function fillEditModal(row) {

    const id_customer = row.querySelector('.id_customer').innerText;
    const customerNameD = row.querySelector('.name').innerText;
    const customerTypeD = row.querySelector('.type').innerText;
    const phoneD = row.querySelector('.phone').innerText;
    const cityD = row.querySelector('.city').innerText;
    const emailD = row.querySelector('.e_mail').innerText;
    const addressD = row.querySelector('.address').innerText;

    document.querySelector('.id_customerD').value = id_customer;
    document.querySelector('.nameD').value = customerNameD;
    document.querySelector('.typeD').value = customerTypeD;
    document.querySelector('.phoneD').value = phoneD;
    document.querySelector('.cityD').value = cityD;
    document.querySelector('.e_mailD').value = emailD;
    document.querySelector('.addressD').value = addressD;

    modalEdit.style.display = 'block';
}



//Método PUT
const formD = document.querySelector('.formsCustomerD');
const urlPut = `http://localhost:8085/updateCustomers`;

async function UpdateCustomer(id_customer) {

    const response = await fetch(`${urlPut}/${id_customer}`, {

        headers: {

            'Accept': 'application/json',
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${token}`
        },

        method: 'PUT',
        body: JSON.stringify({

            name: document.querySelector('.nameD').value,
            type: document.querySelector('.typeD').value,
            phone: document.querySelector('.phoneD').value,
            city: document.querySelector('.cityD').value,
            e_mail: document.querySelector('.e_mailD').value,
            address: document.querySelector('.addressD').value
        })
    })

    const data = await response.json();
}



/*Function btnUpdateCustomer after verify token*/

function btnUpdateCustomer() {
document.addEventListener('click', (e) => {
    const target = e.target.closest('.edit');
    if (target) {
        const row = target.closest('tr');
        fillEditModal(row);
        if (row) {
            const idElement = row.querySelector('.id_customer');
            if (idElement) {
                const id_customer = idElement.innerText;
                modalEdit.style.display = "block";

                formD.addEventListener('submit', () => {
                    UpdateCustomer(id_customer);
                })
            }
        }
    }
})
}



const cancel = document.querySelector('.cancel');
const closerD = document.getElementById('closerD');

cancel.addEventListener('click', () => {
    modalEdit.style.display = "none";
});

closerD.addEventListener('click', () => {
    modalEdit.style.display = "none";
});



//Método DELETE
const urlDelete = `http://localhost:8085/deleteCustomers`;

async function deleteCustomer(id_customer) {

    const response = await fetch(`${urlDelete}/${id_customer}`, {
        
        headers: {

            'Accept': 'application/json',
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${token}`
        },

        method: 'DELETE'
    })

    const data = await response.json();
}

const modalDelete = document.querySelector('.ModalDelete');
const confirmDelete = document.getElementById('confirmDelete');
const deny = document.getElementById('deny');



/*Function btnDeleteCustomer after verify token*/

function btnDeleteCustomer() {

document.addEventListener('click', (el) => {
    const target = el.target.closest('.delete');
    if (target) {
        const row = target.closest('tr');
        if (row) {
            const idElement = row.querySelector('.id_customer');
            if (idElement) {
                const id_customer = idElement.innerText;
                modalDelete.style.display = 'block';

                confirmDelete.addEventListener('click', () => {
                    deleteCustomer(id_customer),
                        modalDelete.style.display = 'none',
                        window.location.reload(true);
                });
            }
        }
    }
});
}



deny.addEventListener('click', () => {
    modalDelete.style.display = 'none';
})



/*Function btnGetCustomer after verify Token*/

function btnGetCustomer() {
window.addEventListener('load', () => {
    getCustomer(urlGet);
    table.style.opacity = 1;
})
}