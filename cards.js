import{auth, signOut, db, ref, get, child, remove, set} from './firebase.js'
$(document).ready(()=>{
        let name = localStorage.getItem('name')
        $($('p')[0]).text('Hi, ' + name)
        if(name){
            get(ref(db, 'Cards')).then((snapshot)=>{
                if (snapshot.exists()) {
                    // console.log(snapshot.val());
                    // const keys = Object.keys(snapshot.val())
                    // const cards = Object.values(snapshot.val())
                    const cards = snapshot.val()
                    // console.log(cards)
                    // sort by level 
                    for(const [key, cardData] of Object.entries(cards)){
                        console.log(key)
                        console.log(cardData)
                        let $newCard = $(`
                            <div id=${key} class="card d-flex flex-row shadow m-2 p-0" style="width: 28rem;">
                                <div class="bg-info rounded-2 px-2" style="width: 10rem;">
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
                                    <div class="d-flex justify-content-end position-absolute top-0 end-0">
                                        <i class="bi bi-pencil-square" data-bs-toggle="modal" data-bs-target="#exampleModal"></i>
                                        <i class="bi bi-trash3-fill"></i>
                                    </div>
                                    <div>
                                        <h1> ${cardData.name} </h1>
                                    </div>
                                    <div>
                                        <p class="lh-sm"> ${cardData.description}</p>
                                    </div>
    
                                    <div class="d-flex justify-content-end position-absolute bottom-0 end-0">
                                        <a href="https://www.google.com">
                                            <i class="fab fa-linkedin"></i>
                                        </a>
                                    </div>
                                </div>
                            </div>`)
                        $('#cards').append($newCard)
                        // edit
                        $newCard.find(".bi-pencil-square").on('click',()=>{
                            console.log('edit')
                            // set value to the input box 
                            console.log($($('.modal-body div')[0]).find('input'))
                            $($('.modal-body div')[0]).find('input').val(cardData.name)
                            $($('.modal-body div')[1]).find('textarea').val(cardData.description)
                            $($('.modal-body div')[2]).find('input').val(cardData.level)
                            $($('.modal-body div')[3]).find('input').val(cardData.point)
                            $($('.modal-body div')[4]).find('input').val(cardData.imageURL)
    
                            // save
                            $($('.modal-footer button')[1]).on('click', ()=>{
                                let cardName = $($('.modal-body div')[0]).find('input').val()
                                let cardDescription = $($('.modal-body div')[1]).find('textarea').val()
                                let cardLevel = $($('.modal-body div')[2]).find('input').val()
                                let cardPoint = $($('.modal-body div')[3]).find('input').val()
                                let cardImageURL = $($('.modal-body div')[4]).find('input').val()
                                const data = {name:cardName, description:cardDescription, 
                                    level: cardLevel, point: cardPoint, imageURL:cardImageURL}
    
                                set(ref(db, 'Cards/' + key), data)
                                .then(()=>{
                                    location.reload(); 
                                })
                            })
                        })
    
                        // delete
                        $newCard.find(".bi-trash3-fill").on('click', ()=>{
                            console.log('delete')
                            remove(ref(db, 'Cards/' + key)).then(()=>{
                                console.log('sucess')
                                // no.1
                                location.reload(); 
                                // no.2 find the card element in DOM by key
                            })
                        })
                    }
                }
    
            })
        }else{
            $('.container').empty()
            let $infor = $(`<h1>Please <a href='index.html'>login</a> </h1>`)
            $('.container').append($infor)
        }
        
        

    $($('button')[0]).on('click', ()=>{

        signOut(auth)
        .then(() => {
            // Sign-out successful.
            localStorage.removeItem('name')
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