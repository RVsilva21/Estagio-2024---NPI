//Animações Menu Lateral
const items = document.querySelectorAll('.items');
const arrow = document.querySelector('#arrowLeft');
const lateralmenu = document.querySelector('.menu');
const contentPage = document.querySelector('.content');
const btnNewCustomer = document.getElementById('btnNewCustomer');
const modalCreate = document.querySelector('.ModalCreate');
const closerC = document.getElementById('closerC');

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



//Método GET
const search = document.getElementById('searchC');
const table = document.querySelector('.bodyTable');
const modalEdit = document.querySelector('.ModalEdit');

const urlGet = "http://localhost:8081/customer";

async function getCustomer(urlGet) {
    const response = await fetch(urlGet, { method: "GET" });
    var dataCustomer = await response.json();
    result = dataCustomer;
    addRows(result);

}

function addRows(result) {
    var lineId = 0;
    var row = "";
    for (let z in result) {
        data = result[z];
        data = Object.values(data);
        lineId += 1;
        row += `
        <tr id ="${lineId}">
        <td class ="idCustomers"style="display:none">${data[0]}</td>
        <td class="customer_name">${data[1]}</td>
        <td class="phone">${data[3]}</td>
        <td class="e_mail">${data[5]}</td>
        <td class="customer_type">${data[2]}</td>
        <td class="address">${data[6]}</td>
        <td class="city">${data[4]}</td>
        <td class="editCustomer"><i class="edit"><img src="/icons/Edit.svg" width="20" height="20"></i><span></span><i class="delete"><img src="/icons/Delete.svg" width="20" height="20"></i></td>
        </tr>
        `
        table.innerHTML = row;
    }
}
/*search.addEventListener('click', ()=> {   
    getCustomer(urlGet),
    table.style.opacity=1
})*/



//Método POST
const form = document.querySelector(".formsCustomerC");
const customer_name = document.querySelector(".customer_name");
const customer_type = document.querySelector(".customer_type");
const phone = document.querySelector(".phone");
const city = document.querySelector(".city");
const e_mail = document.querySelector(".e_mail");
const address = document.querySelector(".address");

const urlPost = 'http://localhost:8081/customer';

async function postCustomer(urlPost) {
    const response = await fetch(urlPost,
        {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },

            method: "POST",
            body: JSON.stringify({
                customer_name: customer_name.value,
                customer_type: customer_type.value,
                phone: phone.value,
                city: city.value,
                e_mail: e_mail.value,
                address: address.value
            }),
        })

    dataCustomer = await response.json();
    result = dataCustomer;
}

form.addEventListener('submit', () => {
    postCustomer(urlPost);
})

function fillEditModal(row) {
    const idCustomers = row.querySelector('.idCustomers').innerText;
    const customerNameD = row.querySelector('.customer_name').innerText;
    const customerTypeD = row.querySelector('.customer_type').innerText;
    const phoneD = row.querySelector('.phone').innerText;
    const cityD = row.querySelector('.city').innerText;
    const emailD = row.querySelector('.e_mail').innerText;
    const addressD = row.querySelector('.address').innerText;

    document.querySelector('.idCustomersD').value = idCustomers;
    document.querySelector('.customer_nameD').value = customerNameD;
    document.querySelector('.customer_typeD').value = customerTypeD;
    document.querySelector('.phoneD').value = phoneD;
    document.querySelector('.cityD').value = cityD;
    document.querySelector('.e_mailD').value = emailD;
    document.querySelector('.addressD').value = addressD;

    modalEdit.style.display = 'block';
}



//Método PUT
const formD = document.querySelector('.formsCustomerD');
const urlPut = `http://localhost:8081/customer`;

async function UpdateCustomer(idCustomers) {

    const response = await fetch(`${urlPut}/${idCustomers}`, {

        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: 'PUT',
        body: JSON.stringify({
            customer_name: document.querySelector('.customer_nameD').value,
            customer_type: document.querySelector('.customer_typeD').value,
            phone: document.querySelector('.phoneD').value,
            city: document.querySelector('.cityD').value,
            e_mail: document.querySelector('.e_mailD').value,
            address: document.querySelector('.addressD').value
        })
    })

    data = await response.json();
    result = data;
    console.log(result);
}

document.addEventListener('click', (e) => {
    const target = e.target.closest('.edit');
    if (target) {
        const row = target.closest('tr');
        fillEditModal(row);
        if (row) {
            const idElement = row.querySelector('.idCustomers');
            if (idElement) {
                const idCustomers = idElement.innerText;

                formD.addEventListener('submit', () => {
                    UpdateCustomer(idCustomers);
                })
            }
        }
    }
})

const cancel = document.querySelector('.cancel');
const closerD = document.getElementById('closerD');

cancel.addEventListener('click', () => {
    modalEdit.style.display = "none";
});

closerD.addEventListener('click', () => {
    modalEdit.style.display = "none";
});



//Método DELETE
const urlDelete = `http://localhost:8081/customer`;

async function deleteCustomer(idCustomers) {
    const response = await fetch(`${urlDelete}/${idCustomers}`, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: 'DELETE',
    })

    data = await response.json();
    result = data;
}

const modalDelete = document.querySelector('.ModalDelete');
const confirmDelete = document.getElementById('confirmDelete');
const deny = document.getElementById('deny');

document.addEventListener('click', (el) => {
    const target = el.target.closest('.delete');
    if (target) {
        const row = target.closest('tr');
        if (row) {
            const idElement = row.querySelector('.idCustomers');
            if (idElement) {
                const idCustomers = idElement.innerText;
                modalDelete.style.display = 'block';

                confirmDelete.addEventListener('click', () => {
                    deleteCustomer(idCustomers),
                        modalDelete.style.display = 'none',
                        window.location.reload(true);
                });
            }
        }
    }
});

deny.addEventListener('click', () => {
    modalDelete.style.display = 'none';
})


window.addEventListener('load', () => {
    getCustomer(urlGet);
    table.style.opacity = 1;
})