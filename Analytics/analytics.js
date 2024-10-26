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



/*Get Quantity Customers*/

const q_customers = document.getElementById("q_customers");
const url_q_customers = "http://localhost:8085/customersList";

async function customers(url_q_customers) {

    const response = await fetch(url_q_customers, {

        headers: {
            
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        method:"GET"
    })

    const result = await response.json()



    let qtd_customers = 0;

    result.forEach(() => qtd_customers++);
    q_customers.innerHTML = qtd_customers;
    
}

customers(url_q_customers);




/*Get Total Projects*/

const q_projects = document.getElementById("q_projects");
const url_q_projects = "http://localhost:8085/projectList";

async function projects_qtd(url_q_projects) {

    const response = await fetch(url_q_projects, {

        headers: {
            
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        method:"GET"
    })

    const result = await response.json()
    
    
    
    let qtd_projects = 0;

    result.forEach(()=> qtd_projects++);
    q_projects.innerHTML = qtd_projects;

    console.log(qtd_projects);
}

projects_qtd(url_q_projects);



/*Get Total Value Projects*/

const v_projects = document.getElementById("v_projects");
const url_v_projects = "http://localhost:8085/projectList";

async function projects_value(url_v_projects) {

    const response = await fetch(url_v_projects, {

        headers: {
            
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        method:"GET"
    })

    const result = await response.json()
    
    
    
    let value_projects = 0;

    for(let z in result) {

    value_projects = result[z].system_value + value_projects

    }
    
    v_projects.innerHTML = value_projects.toLocaleString("BRL",{style:"currency", currency:"BRL"});
    console.log(value_projects)
}

projects_value(url_v_projects);



/*Get Total Value Projects (kWp)*/

const p_projects = document.getElementById("p_projects");
const url_p_projects = "http://localhost:8085/projectList";

async function projects_kwp(url_p_projects) {

    const response = await fetch(url_p_projects, {

        headers: {
            
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        method:"GET"
    })

    const result = await response.json()
    
   

    let kwp_projects = 0;

    for(let z in result) {

        kwp_projects = result[z].system_power + kwp_projects;

    }
    
    p_projects.innerHTML = kwp_projects + " kWp";
    console.log(kwp_projects);
}

projects_kwp(url_p_projects);