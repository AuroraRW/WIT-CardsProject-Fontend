import {auth, createUserWithEmailAndPassword, db, ref, set} from './firebase.js'
$(document).ready(()=>{
    $('button').on('click', (e)=>{
        e.preventDefault()
        if($('p').length){
            $('p').each(function(){
                $(this).remove()
            })
        }

        const email = $($('.form-control')[0]).val()
        const password = $($('.form-control')[1]).val()
        const firstName = $($('.form-control')[2]).val()
        const lastName = $($('.form-control')[3]).val()
        const $genderEle = $('input[name="gender"]:checked')
        const $preferEle = $('input[type="checkbox"]:checked')
        if($genderEle.length == 0){
            const $warningEle = $('<p></p>')
            $warningEle.text('Please select gender')
            $warningEle.attr('class','warning')
            $('.gender-section').append($warningEle)
        }else if($preferEle.length == 0){
            const $warningEle = $('<p></p>')
            $warningEle.text('Please select')
            $warningEle.attr('class', 'warning')
            $('.preference').append($warningEle)
        }else{
            const gender = $genderEle.val()
            let prefer = []
            $preferEle.each(function(){
                prefer.push($(this).val())
            })
            // $preferEle.each(i=>{
            //     // console.log($($preferEle[i]).val())
            //     prefer.push($($preferEle[i]).val())
            // })
            console.log(email)
            console.log(password)
            console.log(firstName)
            console.log(lastName)
            console.log(gender)
            console.log(prefer)
            // create a new user
            const userData = {Email: email, Password: password, 
                FirstName: firstName, LastName: lastName, 
                Gender: gender, Perfer:prefer}
            
            createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential)=>{
                console.log(userCredential.user)
                // save the user into database
                const userKey = userCredential.user.uid
                set(ref(db, 'Users/' + userKey), userData)
                .then(()=>{
                    window.location.href='index.html'
                })
            })
        }
    })
})
