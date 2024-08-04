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



//Function to calculate Irradiation
const city = document.getElementById("city");
const irradiation = document.getElementById("irradiation");

function IrradiationIndex () {

    const selectCity = city.value;
    
    switch(selectCity) {

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

    return selectCity;
}
city.addEventListener("change", IrradiationIndex);



//Function to calculte lost rate
const selectOptions = document.getElementById("orientation");
function LostRate () {

    const item = selectOptions.value;
    const lostRate = document.getElementById("lostRate");
    const performance = document.getElementById("performance");
    
    switch(item) {

        case "Norte":
            lostRate.value = 12;
        break;

        case "Nordeste":
            lostRate.value = 20;
        break;

        case "Sul":
            lostRate.value = 30;
        break;

        case "Suldeste":
            lostRate.value = 35;
        break;

        default:
            lostRate.value = "";
            performance.value = "";
        break;
    }

    performance.value = (1-(lostRate.value/100));

    return item;
}

selectOptions.addEventListener("change", LostRate);



//Function to calculate Tariff, TUSD and Street Ligthing
const concessionaire = document.getElementById("concessionaire");
const tariff = document.getElementById("tariff");
const tusd = document.getElementById("tusd");
const streetLighting = document.getElementById("streetLighting");

function Rates() {

    const selectConcessionaire = concessionaire.value;

    switch(selectConcessionaire) {

        case "ENEL SP":
            tariff.value = 0.64;
            tusd.value = 0.41922;
            streetLighting.value = 18.75;
        break;

        case "CPFL Paulista":
            tariff.value = 0.85;
            tusd.value = 0.18452;
            streetLighting.value = 17.71;
        break;

        case "CEMIG-D":
            tariff.value = 0.81;
            tusd.value = 0.37317;
            streetLighting.value = 22.11;
        break;

        case "COPEL-DIS":
            tariff.value = 0.74;
            tusd.value = 0.24182;
            streetLighting.value = 20.15;
        break;

        default:
            tariff.value = "";
            tusd.value = "";
            streetLighting.value = "";
    }

    return selectConcessionaire;
}

concessionaire.addEventListener("change", Rates);



//Function to calculate Generation and System Power
const consumption = document.getElementById("consumption");
const averageGenerate = document.getElementById("averageGenerate");
const systemPower = document.getElementById("systemPower");
const modulePerformance = document.getElementById("modulePerformance");
const moduleQuantity = document.getElementById("moduleQuantity");

const calc = document.getElementById("calc");

function Energy () {

    const module = parseInt(modulePerformance.value);
    const averageConsumption = parseFloat(consumption.value);
    const averagIrradiation = parseFloat(irradiation.value);
    const ratePerformance = parseFloat(performance.value);

    let power = averageConsumption / averagIrradiation / ratePerformance / 30;

    const quantity = Math.ceil((power*1000)/module);
    
    const generate = parseFloat(((averageConsumption) * (averagIrradiation) * (ratePerformance) * (30)).toFixed(2));
    power = parseFloat((quantity * module).toFixed(2));
    
    systemPower.value = power;
    averageGenerate.value = generate;

    return power;
}
calc.addEventListener("click", Energy);
