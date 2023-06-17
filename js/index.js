if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', ready)
 else ready()

let slidesContainer, slides, imgWidth;
let toLeftScroll;
let slideIndex = 1

function ready() {
    loadHeader()
    loadFooter()

    slidesContainer = document.querySelector('.slides')
    slides = slidesContainer.querySelectorAll('img')
    imgWidth = slidesContainer.querySelectorAll('img')[0].clientWidth

    const next = document.getElementById('next'),
    previous = document.getElementById('previous')
    setInterval(() => {changeImage()}, 6000);

    next.addEventListener('click', nextslide)
    previous.addEventListener('click', previousSlide)

    const menu_layer = document.querySelector('.menu_layer')
    menu_layer.addEventListener('click', ()=> {
        menu_layer.classList.remove('active')
        document.querySelector('ul.menu').classList.remove('active')
    })
}

function changeImage() {    
    if(slideIndex === slides.length) toLeftScroll = false
        else if(slideIndex === 1) toLeftScroll = true


    if (toLeftScroll) {
        ++slideIndex
        slidesContainer.scrollLeft = -imgWidth * (slideIndex - 1)
    } else {
        --slideIndex
        slidesContainer.scrollLeft = -imgWidth * (slideIndex - 1)
    }
}

function nextslide() {
    if(slideIndex !== slides.length) {
        ++slideIndex
        slidesContainer.scrollLeft = -imgWidth * (slideIndex - 1)
    } else return
}

function previousSlide() {
        if(slideIndex !== 1) {
            --slideIndex
            slidesContainer.scrollLeft = -imgWidth * (slideIndex - 1)
        } else return
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