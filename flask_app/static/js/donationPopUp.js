const openDonationBoxBtn = document.getElementById("donateToCause");
const donation_slider_one = document.querySelector('.donation_slider_one')
const donation_slider_two = document.querySelector('.donation_slider_two')
const nextBtnOnForm = document.querySelector('.nextBtn')
const gobackBtn = document.querySelector('.gobackBtn')
const modelIDContainer = document.querySelector(".model_container");
const mainContainer = document.getElementById('mainContainer')
const model_error = document.querySelector('.model_error')
openDonationBoxBtn.addEventListener('click', () => {
    modelIDContainer.classList.add("show");
    mainContainer.style.opacity = .1
})
const succesfulContributionCallBack = (purpose, whichForm, causeIdValue) => {
    if (purpose == "donated to a cuase") {
        closePopUpForm()
    }
    //make the heart change
    let whichCause = document.forms[whichForm][causeIdValue].value
    //the hundred below is so it pass as greater then 0 in the callback
    if (whichCause == 15) {
        supportDeforestation.contributedToThisCause.donation_amount = 1
        supportDeforestation.contributedToThisCause.liked = 1
        whichCause = supportDeforestation
    } else if (whichCause == 16) {
        supportScientist.contributedToThisCause.donation_amount = 1
        supportScientist.contributedToThisCause.liked = 1
        whichCause = supportScientist
    } else if (whichCause == 17) {
        supportGreatBarrierReef.contributedToThisCause.donation_amount = 1
        supportGreatBarrierReef.contributedToThisCause.liked = 1
        whichCause = supportGreatBarrierReef
    }
    if (whichForm === 'formDonateCause') {

    }
    setSlideContribution(whichCause)
    //change the slider if its the first form to back 
    gobackForm()
}
const removePopUP = () => {
    modelIDContainer.classList.remove('show')
    mainContainer.style.opacity = 1
}
const moveToNextSectionForm = () => {
    donation_slider_one.style = 'display: none'
    donation_slider_two.classList.add('show')
    nextBtnOnForm.style.display = 'none'
    gobackBtn.style.display = 'block'
}
const gobackForm = () => {
    donation_slider_one.style = 'display: flex'
    donation_slider_two.classList.remove('show')
    nextBtnOnForm.style.display = 'block'
    gobackBtn.style.display = 'none'
}
const closePopUpForm = () => {
    modelIDContainer.classList.remove("show")
    mainContainer.style.opacity = 1
}
const addErrorPopUp = (errors) => {
    const popUpError = document.querySelector('.model_container_errorMain')
    popUpError.classList.add('show')
    errors.forEach(element => {
        model_error.innerHTML += "<p class='pTag_error' style='display: block;'>" + '•' + element + "</p>"
    });
    let timeout = 0000;
    if (errors.length < 4) {
        timeout = 4500
    } else if (errors.length < 8) {
        timeout = 9000
    } else {
        timeout = 15000
    }
    //close after a couple of seconds
    setTimeout(() => {
        popUpError.classList.remove('show')
    }, timeout)
}

//make it dry as possible without it reapting
$(document).ready(function () {

    $('#likeACause').submit(function (e) {
        e.preventDefault()
        let formData = {};
        let form = this;
        $.each(this.elements, function (i, v) {
            let input = $(v);
            formData[input.attr("name")] = input.val();
            delete formData["undefined"];
        });
        postData('/save-planet/likedCause', 'formLikeCause', 'cause_id_for_like', formData, form)
    })
    $('#donationForm').submit(function (e) {
        e.preventDefault()
        let formData = {};
        let form = this;
        $.each(this.elements, function (i, v) {
            let input = $(v);
            formData[input.attr("name")] = input.val();
            delete formData["undefined"];
        });
        postData('/save-planet/donateToCause', 'formDonateCause', 'cause_id', formData, form)
    })
    $('#donationFormUpdate').submit(function (e) {
        e.preventDefault()
        let formData = {};
        let form = this;
        $.each(this.elements, function (i, v) {
            let input = $(v);
            formData[input.attr("name")] = input.val();
            delete formData["undefined"];
        });
        postData('/save-planet/donateToCause', 'formDonateCauseUpdate', 'cause_id', formData, form)
    })

    function postData(url, whichForm, cause_idName, formData, form) {
        console.log('submitted');
        $.ajax({
            type: 'POST',
            url: url,
            dataType: 'json',
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify(formData),
            context: form,
            success: function (callback) {
                // $(doantionFormId)[0].reset();
                console.log('succesful', callback);
                //remove the donationform
                // if call does not eqaul validation is false
                if (callback.validation_successful == 'false') {
                    addErrorPopUp(callback.errors)
                    console.log('errors');
                } else if (callback.succesfullly == "liked") {
                    succesfulContributionCallBack("donated to a cuase", whichForm, cause_idName)
                    console.log('liked a cause');
                } else if (callback.temperingCheck == "failed") {
                    //do nothing, this is checking if user already liked and is trying to relike
                    console.log('print tamper failed');
                    addErrorPopUp(['unsuccessful, please refresh page'])
                    //then make the main page disappear
                    removePopUP()
                    //adjust the form to update
                }
                else {
                    succesfulContributionCallBack("donated to a cuase", whichForm, cause_idName)
                }
            },
            error: function (jqXHR, exception) {
                // $(doantionFormId)[0].reset();
                alert('error please refresh page')
                console.log('error from adding to donation', jqXHR);
                // $(this).html("error!");
            }
        })
    }
})