const samples = document.querySelectorAll('.samples .items > .sample')

const pcScreenMedia = window.matchMedia('(min-width: 1000px)'),
    tabletScreenMedia = window.matchMedia('(max-width: 1000px)'),
    mobileScreenMedia = window.matchMedia('(max-width: 680px)');

setGrid()

function setGrid() {
    if(pcScreenMedia.matches) {
        console.log('pc')
        for(let i = 0; i< samples.length; i++) {
            // Getting item row Number
            let rowNum = Math.ceil((i+1)/3)
            // Setting items column
            samples[i].style.gridColumn = `${(i+1)-((rowNum-1)*3)} / ${(i+2)-((rowNum-1)*3)}` 
            // if item was odd set items row 
            if((i+1)%2 !== 0) {
                samples[i].style.background = 'red'
                samples[i].style.gridRow = `span 3`
                // if item was tall blue middle one set row start 
                if((i+2) % 6 === 0) {
                    let rowBegin = Math.floor(i/6) 
                    samples[i].style.background = 'blue'
                    samples[i].style.gridRow = `${3+(rowBegin*5)} / span 3`
                }
            }
        }
    } else if(tabletScreenMedia.matches && window.matchMedia('(min-width: 680px)').matches) {
        console.log('tab')
        for(let i=0; i< samples.length; i++){
            // Getting item row Number
            let rowNum = Math.ceil((i+1)/2)
            // Setting items column
            samples[i].style.gridColumn = `${(i+1)-((rowNum-1)*2)} / ${(i+2)-((rowNum-1)*2)}`
            if( (i+1)%4 === 0 ) {
                samples[i].style.background = 'green'
                samples[i].style.gridColumn = '1 / 2'
            }
            // if item was odd set items row 
            if((i+1)%2 !== 0) {
                samples[i].style.background = 'red'
                samples[i].style.gridRow = `span 3`
                if( (i+1)%4 === 3 ) {
                    samples[i].style.background = 'blue'
                    samples[i].style.gridColumn = '2 / 3'
                }
            }
        }
    } else if(mobileScreenMedia.matches) {
        console.log('mobile')
        for(let i=0; i<samples.length; i++){
            samples[i].style.gridColumn = '1 / 2'
        }
    }
}



window.addEventListener('resize', setGrid)


const navBtns= document.querySelectorAll('.navigation ul li')

// adding event listener to all navigation buttons
navBtns.forEach(btn=> {
    btn.addEventListener('click', filterGallery)
})

function filterGallery() {
    //getting all menu clicked items 
    const filterd = document.querySelectorAll(this.dataset.filter)
    // removing "filterd" and "disabled" classname from all items
    samples.forEach(sample=> {
        sample.classList.remove('filterd')
        sample.classList.remove('disabled')
    })
    // add "filterd" className to all filterd items
    filterd.forEach(item=> item.classList.add('filterd'))

    // remove "current" classname from previus li and adding "current" classname to cliked li
    document.querySelector('.current').classList.remove('current')
    this.classList.add('current')

    // adding "disabled" classname to all not filterd items
    samples.forEach(sample=> !sample.classList.contains('filterd') && sample.classList.add('disabled'))
    
    // setting item translate position after changing menu
    filterd.forEach((item, index)=> {
        let itemX=0, itemY=0;
        let ofTop = item.offsetTop, ofLeft = item.offsetLeft;

        // Getting item translateX

        if (pcScreenMedia.matches) {
            
            if((index+1)%3 === 0 && ofLeft <= 500) {
                if(ofLeft < 500 && ofLeft > 300) itemX = 316
                    else if(ofLeft <= 300) itemX = 632
            } else if((index+1)%3 === 1 && ofLeft >= 10) {
                if(ofLeft < 500 && ofLeft > 300) itemX = -316
                    else if(ofLeft >= 500) itemX = -632
            } else if((index+1)%3 === 2) {
                if (ofLeft > 500 || ofLeft < 300) {
                    ofLeft < 300 ? itemX = 316 : itemX = -316
                }
            }
    
            // Getting item translateY
    
            if(index < 3 && ofTop >= 10) {
                itemY = -ofTop
            } else if(index>2) {
                itemY = -ofTop
                for(let thisIndex = index-3; thisIndex >= 0; thisIndex -= 3) {
                    itemY += (filterd[thisIndex].offsetHeight + 16)
                }
            } 

        } else if(tabletScreenMedia.matches && window.matchMedia('(min-width: 680px)').matches) {
            // getting item tarnslateX
            if ((index+1)%2 === 1 && ofLeft >= 10) itemX= -316
            else if((index+1)%2 === 0 && ofLeft <= 300) itemX = 316

            // getting item tarnslateY 
            if(index < 2 && ofTop >= 10) itemY = -ofTop
            else if(index>1) {
                itemY = -ofTop
                for(let thisIndex = index-2; thisIndex >= 0; thisIndex -= 2) {
                    itemY += (filterd[thisIndex].offsetHeight + 16)
                }
            }
        } else if(mobileScreenMedia.matches) {
            //getting item translateY
            if(index === 0 && ofTop >= 10) itemY = -ofTop
            else if(index>0) {
                itemY = -ofTop
                for(let thisIndex = index-1; thisIndex >= 0; thisIndex -= 1) {
                    itemY += (filterd[thisIndex].offsetHeight + 16)
                }
            }
        }


        item.style.transform = `translateX(${itemX}px) translateY(${itemY}px) scale(1)`

        samples.forEach(sample=> {
            if(sample.classList.contains('disabled')) sample.style.transform = `translateX(0) translateY(0) scale(0)`
        })
    })
}