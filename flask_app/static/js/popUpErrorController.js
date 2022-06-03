//call set timeout function
//change the timeout time depending on the length of the p tag
window.setTimeout(() => {
    //check if that id exisits in html
    if(document.querySelector('.model_container_error') ){
        const modelIDContainer_error = document.querySelector('.model_container_error')
        const pTag_error = document.querySelector('.pTag_error')
        console.log(pTag_error.innerHTML.length);
        let timeout = 0000;
        if (pTag_error.innerText.length < 70) {
            timeout = 5500
        } else if (pTag_error.innerText.length < 150) {
            timeout = 8500
        } else {
            timeout = 15000
        }
        //close after a couple of seconds
        setTimeout(() => {
            modelIDContainer_error.classList.add('remove')
        }, timeout)
    }
}, 0000)

