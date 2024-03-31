const items = document.querySelectorAll(".items");
const arrow = document.querySelector('#arrowLeft');
const lateralmenu = document.querySelector('.menu');

function selectItem(){
    items.forEach((item) => {
        item.classList.remove('colorItems')
    })
    this.classList.add('colorItems')
}

items.forEach((item) => {
    item.addEventListener('click', selectItem)
})

arrow.addEventListener('click', function() {
    lateralmenu.classList.toggle('retract')
})