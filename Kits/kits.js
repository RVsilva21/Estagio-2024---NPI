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


//Close Modal Edit Kit

const closeModalEdit = document.getElementById("closeModalEdit");
const cancelUpdate = document.getElementById("cancelUpdate");
const ModalEditKit = document.querySelector(".ModalEditKit");

cancelUpdate.addEventListener("click", ()=> {

    ModalEditKit.style.display = "none";

})

closeModalEdit.addEventListener('click', ()=> {

    ModalEditKit.style.display = "none";

})


//Close Modal Delete Kit

const closeDeleteKit = document.getElementById("closeDeleteKit");
const btnCancelDelete = document.getElementById("btnCancelDelete");
const ModalDeleteKit = document.querySelector(".ModalDeleteKit");

btnCancelDelete.addEventListener("click", ()=> {

    ModalDeleteKit.style.display = "none";

})

closeDeleteKit.addEventListener('click', ()=> {

    ModalDeleteKit.style.display = "none";

})


/*Function for reload page*/
function reloadPage() {

    window.location.reload(true);

}



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



/*Method POST*/

const urlPost = "http://localhost:8085/registerKits"

async function registerKit(urlPost) {

    const data = {

        describeKit: r_decribe.value,
        inverterQuantity: r_inverterQuantity.value,
        inverterBrand: r_inverterBrand.value,
        inverterPower: r_inverterPower.value,
        moduleQuantity: r_moduleQuantity.value,
        moduleBrand: r_moduleBrand.value,
        modulePower: r_modulePower.value,
        supplier:r_supplier.value,
        kitValue: r_kitValue.value

    }

    const response = await fetch(urlPost, {

        headers: {

            "Accept": "application/json",
            "Content-Type": "application/json"
        },

        method:"POST",

        body: JSON.stringify(data)
    })

    const result = await response.json();
    const result_data = result;
}


const btnRegisterKit = document.getElementById("registerKit");

btnRegisterKit.addEventListener("click", ()=> {

    registerKit(urlPost);
    ModalKit.style.display = "none";
    reloadPage();

})



/*Method PUT*/

const urlPut = "http://localhost:8085/updateKits"

async function updateKit(kitId) {

    const data = {

        kitId: kitId,
        describeKit: e_decribe.value,
        inverterQuantity: e_inverterQuantity.value,
        inverterBrand: e_inverterBrand.value,
        inverterPower: e_inverterPower.value,
        moduleQuantity: e_moduleQuantity.value,
        moduleBrand: e_moduleBrand.value,
        modulePower: e_modulePower.value,
        supplier:e_supplier.value,
        kitValue: e_kitValue.value

    }

    const response = await fetch(`${urlPut}/${kitId}`, {

        headers: {

            "Accept": "appication/json",
            "Content-Type": "application/json"
        },

        method: "PUT",

        body: JSON.stringify(data)
    })

    const result = await response.json();
    const result_data = result;
}



/*Method DELETE*/

const urlDelete = "http://localhost:8085/deleteKits"

async function deleteKits(kitId) {

    const response = await fetch(`${urlDelete}/${kitId}`, {

        headers: {

            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        
        method: "DELETE"
    })

    const result = await response.json();
    const result_data = result;
}



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


/*Function Capture ID fot Put*/

document.addEventListener("click", (e)=> {

    const element = e.target.closest(".edit");
        
    if(element) {

        const rows = element.closest("tr");
        const kitId = parseInt(rows.querySelector(".kitId").innerText);

        fillFieldsKit(rows);
        ModalEditKit.style.display = "block";

        const btnUpdateKit = document.getElementById("btnUpdateKit");
        
        btnUpdateKit.addEventListener("click", ()=> {

            updateKit(kitId);
            ModalEditKit.style.display = "none";
            reloadPage();

        })
    }
})


/*Function Capture ID fot Delete*/

document.addEventListener("click", (e)=> {

    const element = e.target.closest(".delete");
        
    if(element) {

        const rows = element.closest("tr");
        const kitId = rows.querySelector(".kitId").innerText;

        ModalDeleteKit.style.display = "block";

        const btnDeleteKit = document.getElementById("btnDeleteKit");;
        
        btnDeleteKit.addEventListener("click", ()=> {

            deleteKits(kitId);
            ModalDeleteKit.style.display = "none";
            reloadPage();

        })
    }
})



/*Fill in Fields*/

function fillFieldsKit(rows) {

    const e_kitId = rows.querySelector(".kitId").innerText;
    const e_decribe = rows.querySelector(".describe_kit").innerText;
    const e_kitValue = rows.querySelector(".kit_value").innerText;
    const e_moduleQuantity = rows.querySelector(".module_quantity").innerText;
    const e_modulePower = rows.querySelector(".module_power").innerText;
    const e_moduleBrand = rows.querySelector(".module_brand").innerText;
    const e_inverterQuantity = rows.querySelector(".inverter_quantity").innerText;
    const e_inverterPower = rows.querySelector(".inverter_power").innerText;
    const e_inverterBrand = rows.querySelector(".inverter_brand").innerText;
    const e_supplier = rows.querySelector(".supplier").innerText;
    
    document.getElementById("e_kitId").value = e_kitId;
    document.getElementById("e_decribe").value = e_decribe;
    document.getElementById("e_kitValue").value = e_kitValue;
    document.getElementById("e_moduleQuantity").value = e_moduleQuantity;
    document.getElementById("e_modulePower").value = e_modulePower;
    document.getElementById("e_moduleBrand").value = e_moduleBrand;
    document.getElementById("e_inverterQuantity").value = e_inverterQuantity;
    document.getElementById("e_inverterPower").value = e_inverterPower;
    document.getElementById("e_inverterBrand").value = e_inverterBrand;
    document.getElementById("e_supplier").value = e_supplier;

}