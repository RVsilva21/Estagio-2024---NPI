//Lateral Menu Animation
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



//Function to calculate Irradiation
const city_project = document.getElementById("city_project");
const irradiation = document.getElementById("irradiation");

function IrradiationIndex() {

    const selectCity = city_project.value;

    switch (selectCity) {

        case "Londrina PR":
            irradiation.value = 4.86;
            break;

        case "São Paulo SP":
            irradiation.value = 4.38;
            break;

        case "Belo Horizonte MG":
            irradiation.value = 5.14;
            break;

        default:
            irradiation.value = 0;

    }

    return irradiation;
}
city_project.addEventListener("change", IrradiationIndex);



//Function to calculte lost rate
const options = document.getElementById("orientation");
const performance = document.getElementById("performance");

function LostRate() {

    const selectOptions = options.value;
    const lost_rate = document.getElementById("lost_rate");

    switch (selectOptions) {

        case "Norte":
            lost_rate.value = 12;
            break;

        case "Nordeste":
            lost_rate.value = 20;
            break;

        case "Sul":
            lost_rate.value = 30;
            break;

        case "Suldeste":
            lost_rate.value = 35;
            break;

        default:
            lost_rate.value = "";
            performance.value = "";
            break;
    }

    performance.value = (1 - (lost_rate.value / 100));

    return selectOptions;
}

options.addEventListener("change", LostRate);



//Function to calculate Tariff, TUSD and Street Ligthing
const concessionaire = document.getElementById("concessionaire");
const tariff = document.getElementById("tariff");
const tusd = document.getElementById("tusd");
const public_lighting = document.getElementById("public_lighting");

function Rates() {

    const selectConcessionaire = concessionaire.value;

    switch (selectConcessionaire) {

        case "ENEL SP":
            tariff.value = 0.64;
            tusd.value = 0.41922;
            public_lighting.value = 18.75;
            break;

        case "CPFL Paulista":
            tariff.value = 0.85;
            tusd.value = 0.18452;
            public_lighting.value = 17.71;
            break;

        case "CEMIG-D":
            tariff.value = 0.81;
            tusd.value = 0.37317;
            public_lighting.value = 22.11;
            break;

        case "COPEL-DIS":
            tariff.value = 0.74;
            tusd.value = 0.24182;
            public_lighting.value = 20.15;
            break;

        default:
            tariff.value = "";
            tusd.value = "";
            public_lighting.value = "";
    }

    return selectConcessionaire;
}

concessionaire.addEventListener("change", Rates);



//Function to calculate Generation and System Power
const module_power = document.getElementById("module_power");
const average_consumption = document.getElementById("average_consumption");
const average_generation = document.getElementById("average_generation");
const system_power = document.getElementById("system_power");
const module_quantity = document.getElementById("module_quantity");

function Energy() {

    const moduleValue = parseInt(module_power.value);
    const averageConsumptionValue = parseFloat(average_consumption.value);
    const averagIrradiationValue = parseFloat(irradiation.value);
    const ratePerformanceValue = parseFloat(performance.value);

    if (moduleValue && averagIrradiationValue && averageConsumptionValue && ratePerformanceValue) {

        let powerSystem = parseFloat((averageConsumptionValue / averagIrradiationValue / ratePerformanceValue / 30).toFixed(2));
        let quantity = Math.ceil((powerSystem * 1000) / moduleValue);
        powerSystem = parseFloat(((quantity * moduleValue) / 1000).toFixed(2));
        let generate = parseFloat((powerSystem * averagIrradiationValue * ratePerformanceValue * 30).toFixed(2));

        system_power.value = powerSystem;
        average_generation.value = generate;
        module_quantity.value = quantity;

    }

    return;

}

module_power.addEventListener("change", Energy)
average_consumption.addEventListener("input", Energy)
irradiation.addEventListener("change", Energy)
performance.addEventListener("input", Energy)
const system_values = document.getElementById("system_values");



//Function GET
const urlGet = "http://localhost:8085/projectList";

async function getProject(urlGet) {

    const response = await fetch(urlGet, {

        method: 'GET'
    })

    const result = await response.json();
    getResult = result;
    addRowsProjects(getResult);
}



/*Create Rows Dynamically*/
const bodyProjects = document.querySelector(".bodyProjects");

function addRowsProjects(getResult) {

    var lineId = 0;
    var row = "";

    for (let z in getResult) {

        lineId += 1;
        row += `
        <tr class ="${lineId}">
        <td class ="project_id" style="display:none">${getResult[z].project_id}</td>
        <td class ="group_project" style="display:none">${getResult[z].group_project}</td>
        <td class ="city_project" style="display:none">${getResult[z].city_project}</td>
        <td class ="irradiation" style="display:none">${getResult[z].irradiation}</td>
        <td class ="orientation" style="display:none">${getResult[z].orientation}</td>
        <td class ="lost_rate" style="display:none">${getResult[z].lost_rate}</td>
        <td class ="performance" style="display:none">${getResult[z].performance}</td>
        <td class ="concessionaire" style="display:none">${getResult[z].concessionaire}</td>
        <td class ="tariff" style="display:none">${getResult[z].tariff}</td>
        <td class ="tusd" style="display:none">${getResult[z].tusd}</td>
        <td class ="public_lighting" style="display:none">${getResult[z].public_lighting}</td>
        <td class ="average_consumption" style="display:none">${getResult[z].average_consumption}</td>
        <td class ="type_project" style="display:none">${getResult[z].type_project}</td>
        <td class ="kit" style="display:none">${getResult[z].kit}</td>
        <td class="name">${"Renan Victor Bueno da Silva"}</td>
        <td class="system_power">${getResult[z].system_power}</td>
        <td class="average_generation">${getResult[z].average_generation}</td>
        <td class="module_quantity">${getResult[z].module_quantity}</td>
        <td class="module_power">${getResult[z].module_power}</td>
        <td class="system_value">${getResult[z].system_value}</td>
        <td class="editProjects"><i class="edit"><img src="/assets/icons/Edit.svg" width="20" height="20"></i><span></span><i class="delete"><img src="/assets/icons/Delete.svg" width="20" height="20"></i></td>
        </tr>
        `
        bodyProjects.innerHTML = row;
    }
}


//Function POST
const urlPost = "http://localhost:8085/createProject";

async function createProject(urlPost) {

    const data = {

        group_project: document.getElementById("group_project").value,
        city_project: document.getElementById("city_project").value,
        irradiation: document.getElementById("irradiation").value,
        orientation: document.getElementById("orientation").value,
        lost_rate: document.getElementById("lost_rate").value,
        performance: document.getElementById("performance").value,
        concessionaire: document.getElementById("concessionaire").value,
        tariff: document.getElementById("tariff").value,
        tusd: document.getElementById("tusd").value,
        public_lighting: document.getElementById("public_lighting").value,
        average_consumption: document.getElementById("average_consumption").value,
        module_power: module_power.value,
        average_generation: average_generation.value,
        module_quantity: module_quantity.value,
        system_power: system_power.value,
        type_project: document.getElementById("type_project").value,
        kit: document.getElementById("kit").value,
        system_value: system_values.value

    }

    const response = await fetch(urlPost, {

        headers: {

            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },

        method: 'POST',
        body: JSON.stringify(data)
    })

    console.log(data)
    const result = await response.json();

}

const save = document.getElementById("save");
save.addEventListener("click", () => {
    createProject(urlPost)
})



/*Edit Modal Project*/
function fieldModalEditProject(row) {

    const project_id = row.querySelector(".project_id").innerText;
    const group_project = row.querySelector(".group_project").innerText;
    const city_project = row.querySelector(".city_project").innerText;
    const irradiation = row.querySelector(".irradiation").innerText;
    const orientation = row.querySelector(".orientation").innerText;
    const lost_rate = row.querySelector(".lost_rate").innerText;
    const performance = row.querySelector(".performance").innerText;
    const concessionaire = row.querySelector(".concessionaire").innerText;
    const tariff = row.querySelector(".tariff").innerText;
    const tusd = row.querySelector(".tusd").innerText;
    const public_lighting = row.querySelector(".public_lighting").innerText;
    const average_consumption = row.querySelector(".average_consumption").innerText;
    const type_project = row.querySelector(".type_project").innerText;
    const kit = row.querySelector(".kit").innerText;
    const name = row.querySelector(".name").innerText;
    const system_power = row.querySelector(".system_power").innerText;
    const average_generation = row.querySelector(".average_generation").innerText;
    const module_quantity = row.querySelector(".module_quantity").innerText;
    const module_power = row.querySelector(".module_power").innerText;
    const system_value = row.querySelector(".system_value").innerText;

    document.querySelector(".project_id_ed").value = project_id;
    document.querySelector(".group_project_ed").value = group_project;
    document.querySelector(".city_project_ed").value = city_project;
    document.querySelector(".irradiation_ed").value = irradiation;
    document.querySelector(".orientation_ed").value = orientation;
    document.querySelector(".lost_rate_ed").value = lost_rate;
    document.querySelector(".performance_ed").value = performance;
    document.querySelector(".concessionaire_ed").value = concessionaire;
    document.querySelector(".tariff_ed").value = tariff;
    document.querySelector(".tusd_ed").value = tusd;
    document.querySelector(".public_lighting_ed").value = public_lighting;
    document.querySelector(".average_consumption_ed").value = average_consumption;
    document.querySelector(".type_project_ed").value = type_project;
    document.querySelector(".kit_ed").value = kit;
    document.querySelector(".name_ed").value = name;
    document.querySelector(".system_power_ed").value = system_power;
    document.querySelector(".average_generation_ed").value = average_generation;
    document.querySelector(".module_quantity_ed").value = module_quantity;
    document.querySelector(".module_power_ed").value = module_power;
    document.querySelector(".system_values_ed").value = system_value;

}



//Function PUT
const urlPut = "http://localhost:8085/updateProject";
const saves = document.getElementById("saves");
const modalUpdateProject = document.getElementById("ModalUpdateProject");
const formsModalProject = document.querySelector(".formsModalProject");

async function updateProject(idPutInt) {

    const response = await fetch(`${urlPut}/${idPutInt}`, {

        headers: {

            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },

        method: 'PUT',
        body: JSON.stringify({
            
        project_id: document.querySelector(".project_id_ed").value,
        group_project: document.querySelector(".group_project_ed").value,
        city_project: document.querySelector(".city_project_ed").value,
        irradiation: document.querySelector(".irradiation_ed").value,
        orientation: document.querySelector(".orientation_ed").value,
        lost_rate: document.querySelector(".lost_rate_ed").value,
        performance: document.querySelector(".performance_ed").value,
        concessionaire: document.querySelector(".concessionaire_ed").value,
        tariff: document.querySelector(".tariff_ed").value,
        tusd: document.querySelector(".tusd_ed").value,
        public_lighting: document.querySelector(".public_lighting_ed").value,
        average_consumption: document.querySelector(".average_consumption_ed").value,
        module_power: document.querySelector(".module_power_ed").value,
        average_generation: document.querySelector(".average_generation_ed").value,
        module_quantity: document.querySelector(".module_quantity_ed").value,
        system_power: document.querySelector(".system_power_ed").value,
        type_project: document.querySelector(".type_project_ed").value,
        kit: document.querySelector(".kit_ed").value,
        system_value: document.querySelector(".system_values_ed").value

        })
    })

    const result = await response.json();

}


/*Open Modal Update*/
document.addEventListener('click', (e) => {
    const target = e.target.closest('.edit');
    if (target) {
        const row = target.closest("tr");
        fieldModalEditProject(row);
        modalUpdateProject.style.display = "block"; 
    }
})


saves.addEventListener("click", ()=> {
    
    const idPutInt = parseInt(document.querySelector(".project_id").innerText);
    updateProject(idPutInt);
})


/*Closer Modal Edit*/
const closer_edit = document.getElementById("closer_edit");

closer_edit.addEventListener("click", () => {
    modalUpdateProject.style.display = "none";
})


/*Cancel Modal Edit*/
const cancel_edit = document.getElementById("cancel");

cancel_edit.addEventListener("click", () => {
    modalUpdateProject.style.display = "none";
})



//Function DELETE
const urlDelete = "http://localhost:8085/deleteProject";
const modalDeleteProject = document.querySelector(".ModalDeleteProject");
const cancelDeleteProject = document.getElementById("d_delete");
const c_Delete = document.getElementById("c_Delete");

async function deleteProject(idPutInt) {

    const response = await fetch(`${urlDelete}/${idPutInt}`, {
        
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: 'DELETE'

    })

    const result = await response.json();
}


/*Open Modal Delete*/
document.addEventListener('click', (e) => {
    const target = e.target.closest('.delete');
    if (target) {
        const row = target.closest("tr");

        const idPut = row.querySelector(".project_id").innerText;
        let idPutInt = parseInt(idPut)
        modalDeleteProject.style.display = "block";

        c_Delete.addEventListener("click", ()=> {
            deleteProject(idPutInt);
            modalDeleteProject.style.display = "none";
            window.location.reload(true);
        })
    }
})


/*Closer Modal Delete*/
document.addEventListener('click', (e)=> {
    const target = e.target.closest("#d_delete");
    if(target) {
        modalDeleteProject.style.display = "none";
    }
})


/*Load Page*/
window.addEventListener("load", () => {
    getProject(urlGet);
})