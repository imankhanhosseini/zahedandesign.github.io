if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', ready)
    else ready()

window.onload= ()=> changeLine()

function ready() {
    loadHeader()
    loadFooter()

    const navBtns = document.querySelectorAll('.navigation li')
    navBtns.forEach(btn => {
        btn.addEventListener('click', filterData)
    })
}


function loadHeader() {
    const xml = new XMLHttpRequest()
    xml.onload = function() {
        document.querySelector('header').innerHTML = this.responseText
    }
    xml.open('GET', 'component/header.html')
    xml.send()
}

function loadFooter() {
    const xml = new XMLHttpRequest()
    xml.onload = function() {
        document.querySelector('footer').innerHTML = this.responseText
    }
    xml.open('GET', 'component/footer.html')
    xml.send()
}
function changeLine() {
    const line = document.querySelector('.navigation .active_line'),
          current = document.querySelector('li.current')
          
    line.style.width = current.clientWidth + 'px'
    line.style.left = current.offsetLeft + 'px'
}

function filterData() {
    document.querySelector('li.current').classList.remove('current')
    this.classList.add('current')
    changeLine()
}