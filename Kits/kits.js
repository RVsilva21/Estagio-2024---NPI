const items = document.querySelectorAll('.items');
const arrow = document.querySelector('#arrowLeft');
const lateralmenu = document.querySelector('.menu');
const contentPage = document.querySelector('.content');
const btnNewCustomer = document.getElementById('btnNewCustomer');
const modalCreate = document.querySelector('.ModalCreate');
const closerC = document.getElementById('closerC');


//Lateral Menu Animation
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


//Close Modal Register Kit

const closeModal = document.getElementById("closeModal");
const ModalKit = document.querySelector(".ModalKit");
const FormsRegisterKit = document.querySelector(".FormsRegisterKit");

closeModal.addEventListener('click', ()=> {

    ModalKit.style.display = "none";
})

//Open Modal Register Kit

const openModal = document.getElementById("openModal");

openModal.addEventListener("click", ()=> {

    ModalKit.style.display = "block";
})



/*Method GET*/

const urlGet = "http://localhost:8085/listKits";

async function listKits(urlGet) {

    const response = await fetch(urlGet, {

        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        method: "GET"
    })

    const data = await response.json();
    const result = data;

    dynamicTable(result);
}

window.addEventListener("load", ()=> {
    listKits(urlGet);
})

/*Dynamic Table Kits*/

const bodyTableKits = document.querySelector(".bodyTableKits");

function dynamicTable(result) {

    let rows = "";
    let lineId = 0;

    for(let z in result) {

        lineId += 1;
        rows += `

            <tr id= "${lineId}">
                <td class="kitId" style="display:none;">${result[z].kitId}</td>
                <td class="describe_kit">${result[z].describeKit}</td>
                <td class="kit_value">${result[z].kitValue}</td>
                <td class="module_quantity">${result[z].moduleQuantity}</td>
                <td class="module_power">${result[z].modulePower}</td>
                <td class="module_brand">${result[z].moduleBrand}</td>
                <td class="inverter_quantity">${result[z].inverterQuantity}</td>
                <td class="inverter_power">${result[z].inverterPower}</td>
                <td class="inverter_brand">${result[z].inverterBrand}</td>
                <td class="supplier">${result[z].supplier}</td>
                <td class = "columnEdit"><i class="edit"><img src="/assets/icons/Edit.svg" width="20" height="20"></i><span></span><i class="delete"><img src="/assets/icons/Delete.svg" width="20" height="20"></i></td>
            </tr>
                `
        bodyTableKits.innerHTML = rows;
    }
    
}