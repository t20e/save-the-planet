// const validateAmount = (evt, inputOnform) => {
//     if (inputOnform.value.length < 1) {
//         inputOnform.value = '$'
//     }
//     let input = String.fromCharCode(evt.which);
//     if (!(numPattern.test(input))) {
//         evt.preventDefault();
//     }
// }
const imgTagForPfp = document.getElementById('showPfp')
//add the pfp to reg page
const showPfpFun = (event) => {
    console.log(event.target.files[0]);
    const reader = new FileReader()
    reader.onload = () => {
        imgTagForPfp.classList.add('show')
        imgTagForPfp.src = reader.result
    }
    reader.readAsDataURL(event.target.files[0])
}

const numPattern = new RegExp("^[0-9]*$");
const nameRegex = /^[a-zA-Z]*$/;
const onlyNumRegexPos = /^[0-9]*$/
const submitBtnOne = document.querySelector('.submitBtnOne')
const submitBtnTwo = document.querySelector('.submitBtnTwo')
// const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
const emailRegex = /^[a-zA-Z0-9.+_-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]+$/
$('.fname_error_one').hide();
$('.lname_error_one').hide();
$('.address_error_one').hide();
$('.postal_error_one').hide();
$('.state_error_one').hide();
$('.country_error_one').hide();
$('.amount_error_one').hide();
$('.email_error_one').hide();
$('.nameOnCard_error_one').hide();
$('.cardType_error_one').hide();
$('.cardNum_error_one').hide();
$('.cvv_error_one').hide();
$('.expirationCard_error_one').hide();
//first form  
//silder one  
let fname_error_one = true;
let lname_error_one = true;
let address_error_one = false;
let postal_error_one = false;
let state_error_one = false;
let country_error_one = false;
//slider two
let amount_error_one = false;
let email_error_one = true;
let nameOnCard_error_one = false;
let cardType_error_one = false;
let cardNum_error_one = false;
let cvv_error_one = false;
let expirationCard_error_one = false;
//update
let amount_error_two = false;
let email_error_two = true;
let nameOnCard_error_two = false;
let cardType_error_two = false;
let cardNum_error_two = false;
let cvv_error_two = false;
let expirationCard_error_two = false;
//validate 
$(function () {
    //inputs
    $('.form_fname').focusout(function () {
        let check = validateNames(
            $('.form_fname').val()
        );
        if (check == 'passed') {
            $('.fname_error_one').hide();
            fname_error_one = true
            allowNextBtn()
        } else if (check == 'failed') {
            $('.fname_error_one').show().html("should only contain characters")
            fname_error_one = false
            allowNextBtn()
        } else if (check = 'short') {
            $('.fname_error_one').show().html("should be more than 2 characters")
            fname_error_one = false
            allowNextBtn()
        }
    })
    $('.form_lname').focusout(function () {
        let check = validateNames(
            $('.form_lname').val()
        );
        if (check == 'passed') {
            $('.lname_error_one').hide();
            lname_error_one = true
            allowNextBtn()
            allowNextBtn()
        } else if (check == 'failed') {
            $('.lname_error_one').show().html("should only contain characters")
            lname_error_one = false
            allowNextBtn()
        } else if (check = 'short') {
            $('.lname_error_one').show().html("should be more than 2 characters")
            lname_error_one = false
            allowNextBtn()
        }
    })
    $('.address').focusout(function () {
        if ($('.address').val().length < 6) {
            $('.address_error_one').show().html("should be more than 3 characters")
            address_error_one = false
            allowNextBtn()
        } else {
            $('.address_error_one').hide()
            address_error_one = true
            allowNextBtn()
        }
    })
    $('.postal').focusout(function () {
        if ($('.postal').val().length < 4) {
            $('.postal_error_one').show().html("should be more than 3 characters")
            postal_error_one = false
            allowNextBtn()
        } else {
            $('.postal_error_one').hide()
            postal_error_one = true
            allowNextBtn()
        }
    })
    $('.state').focusout(function () {
        if ($('.state').val().length < 2) {
            $('.state_error_one').show().html("should be more than 1 character")
            state_error_one = false
            allowNextBtn()
        } else {
            $('.state_error_one').hide()
            state_error_one = true
            allowNextBtn()
        }
    })
    $('.country').focusout(function () {
        if ($('.country').val().length < 3) {
            $('.country_error_one').show().html("should be more than 2 characters")
            country_error_one = false
            allowNextBtn()
        } else {
            $('.country_error_one').hide()
            country_error_one = true
            allowNextBtn()
        }
    })
    $('.donation_amount').focusout(function () {
        if ($('.donation_amount').val()[0] != '$') {
            $('.donation_amount').val('$' + $('.donation_amount').val())
        }
        if ($('.donation_amount').val() === "$" || $('.donation_amount').val().substring(1) < 1) {
            $('.amount_error_one').show().html('should be more than a $1')
            amount_error_one = false
            allowSubmitOne()
        } else if (onlyNumRegexPos.test($('.donation_amount').val().substring(1))) {
            $('.amount_error_one').hide()
            amount_error_one = true
            allowSubmitOne()
        } else {
            amount_error_one = false
            allowSubmitOne()
            $('.amount_error_one').show().html('needs to be numeric')
        }
    })
    $('.email').focusout(function () {
        if (emailRegex.test($('.email').val()) && $('.email').val() !== '') {
            $('.email_error_one').hide()
            email_error_one = true
            allowSubmitOne()
        } else {
            email_error_one = false
            allowSubmitOne()
            $('.email_error_one').show().html('please enter a valid email')
        }
    })
    $('.nameOnCard').focusout(function () {
        let check = validateNames(
            $('.nameOnCard').val()
        );
        if (check == 'passed') {
            $('.nameOnCard_error_one').hide();
            nameOnCard_error_one = true
            allowSubmitOne()
        } else if (check == 'failed') {
            nameOnCard_error_one = false
            allowSubmitOne()
            $('.nameOnCard_error_one').show().html("should only contain characters")
        } else if (check = 'short') {
            nameOnCard_error_one = false
            allowSubmitOne()
            $('.nameOnCard_error_one').show().html("should be more than 2 characters")
        }
    })
    $('.cardType').focusout(function () {
        if ($('.cardType').val() == null) {
            $('.cardType_error_one').show().html('select card type')
            cardType_error_one = false
            allowSubmitOne()
        } else {
            $('.cardType_error_one').hide()
            cardType_error_one = true
            allowSubmitOne()
        }
    })
    $('.cardNum').focusout(function () {
        if ($('.cardNum').val() == '') {
            $('.cardNum_error_one').show().html('please enter a card number')
            cardNum_error_two = false
            allowSubmitOne()
        } else if ($('.cardNum').val().length < 16) {
            $('.cardNum_error_one').show().html('card number needs to be more than 16 digits')
            cardNum_error_two = false
            allowSubmitOne()
        } else {
            $('.cardNum_error_one').hide()
            cardNum_error_two = true
            allowSubmitOne()
        }
    })
    $('.cvv').focusout(function () {
        if ($('.cvv').val() == '') {
            $('.cvv_error_one').show().html('please enter a cvv number')
            cvv_error_one = false
            allowSubmitOne()
        } else if ($('.cvv').val().length < 3) {
            cvv_error_one = false
            allowSubmitOne()
            $('.cvv_error_one').show().html('cvv needs to be more than 2 digits')
        } else {
            cvv_error_one = true
            allowSubmitOne()
            $('.cvv_error_one').hide()
        }
    })
    $('.expDate').focusout(function () {
        if ($('.expDate').val() == '') {
            $('.expirationCard_error_one').show().html('please enter a expiration date')
            expirationCard_error_one = false
            allowSubmitOne()
        } else if ($('.expDate').val().length < 4 || $('.expDate').val().length > 4) {
            $('.expirationCard_error_one').show().html('expiration date needs to be 4 digits')
            expirationCard_error_one = false
            allowSubmitOne()
        } else if (onlyNumRegexPos.test($('.expDate').val())) {
            $('.expirationCard_error_one').hide()
            expirationCard_error_one = true
            allowSubmitOne()
        } else {
            $('.expirationCard_error_one').show().html('expiration date needs to be numeric ')
            expirationCard_error_one = false
            allowSubmitOne()
        }
    })
    //update form below
    //
    $('.donation_amount_two').focusout(function () {
        if ($('.donation_amount_two').val()[0] != '$') {
            $('.donation_amount_two').val('$' + $('.donation_amount_two').val())
        }
        if ($('.donation_amount_two').val() === "$" || $('.donation_amount_two').val().substring(1) < 1) {
            $('.amount_error_two').show().html('should be more than a $1')
            amount_error_two = false
            allowSubmitTwo()
        } else if (onlyNumRegexPos.test($('.donation_amount_two').val().substring(1))) {
            $('.amount_error_two').hide()
            amount_error_two = true
            allowSubmitTwo()
        } else {
            amount_error_two = false
            allowSubmitTwo()
            $('.amount_error_two').show().html('needs to be numeric')
        }
    })
    $('.email_two').focusout(function () {
        if (emailRegex.test($('.email_two').val()) && $('.email_two').val() !== '') {
            $('.email_error_two').hide()
            email_error_two = true
            allowSubmitTwo()
        } else {
            $('.email_error_two').show().html('please enter a valid email')
            nameOnCard_error_two = false
            allowSubmitTwo()
        }
    })
    $('.nameOnCard_two').focusout(function () {
        let check = validateNames(
            $('.nameOnCard_two').val()
        );
        if (check == 'passed') {
            $('.nameOnCard_error_two').hide();
            nameOnCard_error_two = true
            allowSubmitTwo()
        } else if (check == 'failed') {
            $('.nameOnCard_error_two').show().html("should only contain characters")
            nameOnCard_error_two = false
            allowSubmitTwo()
        } else if (check = 'short') {
            $('.nameOnCard_error_two').show().html("should be more than 2 characters")
            nameOnCard_error_two = false
            allowSubmitTwo()
        }
    })
    $('.cardType_two').focusout(function () {
        if ($('.cardType_two').val() == null) {
            $('.cardType_error_two').show().html('select card type')
            cardType_error_two = false
            allowSubmitTwo()
        } else {
            $('.cardType_error_two').hide()
            cardType_error_two = true
            allowSubmitTwo()
        }
    })
    $('.cardNum_two').focusout(function () {
        if ($('.cardNum_two').val() == '') {
            $('.cardNum_error_two').show().html('please enter a card number')
            cardNum_error_two= false
            allowSubmitTwo()
        } else if ($('.cardNum_two').val().length < 16) {
            $('.cardNum_error_two').show().html('card number needs to be more than 16 digits')
            cardNum_error_two= false
            allowSubmitTwo()
        } else {
            $('.cardNum_error_two').hide()
            cardNum_error_two= true
            allowSubmitTwo()
        }
    })
    $('.cvv_two').focusout(function () {
        if ($('.cvv_two').val() == '') {
            $('.cvv_error_two').show().html('please enter a cvv number')
            cvv_error_two = false
            allowSubmitTwo()
        } else if ($('.cvv_two').val().length < 3) {
            $('.cvv_error_two').show().html('cvv needs to be more than 2 digits')
            cvv_error_two = false
            allowSubmitTwo()
        } else {
            $('.cvv_error_two').hide()
            cvv_error_two = true
            allowSubmitTwo()
        }
    })
    $('.expDate_two').focusout(function () {
        if ($('.expDate_two').val() == '') {
            $('.expirationCard_error_two').show().html('please enter a expiration date')
            expirationCard_error_two = false
            allowSubmitTwo()
        } else if ($('.expDate_two').val().length < 4 || $('.expDate_two').val().length > 4) {
            $('.expirationCard_error_two').show().html('expiration date needs to be 4 digits')
            expirationCard_error_two = false
            allowSubmitTwo()
        } else if (onlyNumRegexPos.test($('.expDate_two').val())) {
            $('.expirationCard_error_two').hide()
            expirationCard_error_two = true
            allowSubmitTwo()
        } else {
            $('.expirationCard_error_two').show().html('expiration date needs to be numeric ')
            expirationCard_error_two = false
            allowSubmitTwo()
        }
    })
    //validating funcs
    const validateNames = (name) => {
        if (nameRegex.test(name) && name.length > 2) {
            return 'passed'
        } else if (!nameRegex.test(name)) {
            return 'failed'
        } else if (name.length < 2) {
            return 'short'
        }
    }
})

//show the next button when they have enter all the first pop validations
const allowNextBtn = () => {
    if (fname_error_one == true &&
        lname_error_one == true &&
        address_error_one == true &&
        postal_error_one == true &&
        state_error_one == true &&
        country_error_one == true) {
        nextBtnOnForm.classList.add('allow')
    } else {
        nextBtnOnForm.classList.remove('allow')
    }
}
const allowSubmitOne = () => {
    if (amount_error_one == true &&
        email_error_one == true &&
        nameOnCard_error_one == true &&
        cardType_error_one == true &&
        cvv_error_one == true &&
        cardNum_error_two == true &&
        expirationCard_error_one == true) {
        submitBtnOne.classList.add('allow')
    } else {
        submitBtnOne.classList.remove('allow')
    }
}
const allowSubmitTwo = () =>{
    if (amount_error_two == true &&
        email_error_two == true &&
        nameOnCard_error_two == true &&
        cardType_error_two == true &&
        cardNum_error_two == true &&
        cvv_error_two == true &&
        expirationCard_error_two == true) {
        submitBtnTwo.classList.add('allow')
    } else {
        submitBtnTwo.classList.remove('allow')
    }
}