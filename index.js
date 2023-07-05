// const loginEle = document.getElementsByTagName('label')
// const loginEle = document.querySelectorAll('label')
import {auth, signInWithEmailAndPassword} from './firebase.js'
$(document).ready(()=>{
    $('button').on('click', (e)=>{
        e.preventDefault()
        $('#login-email').siblings('p').css('display', 'none')
        $('#login-email').removeClass('warning')
        $('#login-password').removeClass('warning')
        $('#login-password').siblings('p').css('display', 'none')
        const email = $('#login-email').val()
        const password = $('#login-password').val()
        
        let reEmail = /[a-z]+@[a-z]+\.[a-z]+/
        let rePassword = /[a-zA-Z0-9]{6,20}/
        if(!reEmail.test(email)){
            // show the error for email
            $('#login-email').addClass('warning')
            $('#login-email').siblings('p').css('display', 'block')
        }else if(!rePassword.test(password)){
            // show the error for password
            $('#login-password').addClass('warning')
            $('#login-password').siblings('p').css('display', 'block')
        }else{
            // send data to backend
            console.log(email)
            console.log(password)
            signInWithEmailAndPassword(auth, email, password)
            .then((userCredential)=>{
                console.log(userCredential.user)

                // get uid from userCredential.user and save uid into localstorage
                
                // get all user infor from db save name into localstorage
                
                window.location.href='cards.html'
            })
            
        }
    })
})