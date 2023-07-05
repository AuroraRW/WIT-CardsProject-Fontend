import{auth, signOut} from './firebase.js'
$(document).ready(()=>{
    const cardData = JSON.parse(localStorage.getItem('card'))
    if(cardData){
        let $newCard = $(`
        <div class="card d-flex flex-row shadow m-2 p-0" style="width: 28rem;">
            <div class="bg-info rounded-2 px-2">
                <div class="bg-secondary m-3 rounded-3">
                    <p class="text-center text-white fw-bolder px-2 text-nowrap">LEVEL ${cardData.level}</p>
                </div>
                <div class="d-flex justify-content-center"> 
                    <img style="width:100px" src=${cardData.imageURL} alt="male avatar with beard">
                </div>
                <div class="bg-secondary m-2 px-2 rounded-3"> 
                    <p class="text-center text-white fw-bolder text-nowrap">${cardData.point} POINTS</p>
                </div>
            </div>
            <div class="m-3 position-relative" style="width: 16rem;">
                <div>
                    <h1> ${cardData.name} </h1>
                </div>
                <div>
                    <p class="lh-sm"> ${cardData.description}</p>
                </div>
                <div class="position-absolute bottom-0 end-0">
                    <a href="https://www.google.com" class="text-decoration-none">LinkedIn </a>
                </div>
            </div>
        </div>`)

        $('#cards').append($newCard)
        localStorage.removeItem('card')
    }

    $($('button')[0]).on('click', ()=>{

        signOut(auth)
        .then(() => {
            // Sign-out successful.
            window.location.href="index.html"
          })
        .catch((error) => {
            console.log(error)  
        });
    })
    $($('button')[1]).on('click', ()=>{
        window.location.href="create.html"
    })

})