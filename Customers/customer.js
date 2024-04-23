const items = document.querySelectorAll('.items');
const arrow = document.querySelector('#arrowLeft');
const lateralmenu = document.querySelector('.menu');
const contentPage = document.querySelector('.content');
const btnNewCustomer = document.getElementById('btnNewCustomer');
const modal = document.querySelector('.Modal');
const closer = document.getElementById('closer');

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

    modal.style.display = 'block';

})

closer.addEventListener('click', () => {

    modal.style.display = 'none';

})