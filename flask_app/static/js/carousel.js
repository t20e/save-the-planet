//set varibles
//cahnge the text
const hInfo = document.querySelector(".hInfo");
const pInfo = document.querySelector(".pInfo");
const likedCauseBtn = document.getElementById("likeCause");
const likeCauseForm = document.querySelector(".inputSubmit");
const donateBtn = document.getElementById('donateToCause')
let pop_upModelForPost = document.querySelector('.model')
let pop_upModelForUpdating = document.querySelector('.modelPopUpForUpdatingCause')
// let modelUpdateDonationFromLike = document.querySelector('.modelUpdateDonationFromLike')
const pInfo_detail = document.querySelector(".pInfo_detail")
const imgInfo_detail = document.querySelector('.imgInfo_detail')

const checkIfUserContributed = (causeIdFromVar) => {
    //if user hanst liked then it will give error to stop this err check if array contains the index
    for (let x = 0; x < userAlreadyContributed.length; x++) {
        if (causeIdFromVar == userAlreadyContributed[x].cause_id) {
            return {
                donation_amount: userAlreadyContributed[x].donation_amount,
                liked: userAlreadyContributed[x].liked
            }
        }
    }
    return {
        donation_amount: 0,
        liked: 0,
    };
};
const supportDeforestation = {
    h1: "Support stopping deforestation",
    p_whatWeDo: "Ending deforestation is our best chance to conserve wildlife and defend the rights of forest communities. On top of that, it’s one of the quickest and most cost effective ways to curb global warming. That’s why we’re campaigning for a deforestation-free future.",
    p: "Deforestation has greatly altered landscapes around the world. About 2,000 years ago, 80 percent of Western Europe was forested; today the figure is 34 percent. In North America, about half of the forests in the eastern part of the continent were cut down from the 1600s to the 1870s for timber and agriculture. China has lost great expanses of its forests over the past 4,000 years and now just over 20 percent of it is forested. Much of Earth’s farmland was once forests. Today, the greatest amount of deforestation is occurring in tropical rainforests, aided by extensive road construction into regions that were once almost inaccessible. Building or upgrading roads into forests makes them more accessible for exploitation. Slash-and-burn agriculture is a big contributor to deforestation in the tropics. With this agricultural method, farmers burn large swaths of forest, allowing the ash to fertilize the land for crops. The land is only fertile for a few years, however, after which the farmers move on to repeat the process elsewhere. Tropical forests are also cleared to make way for logging, cattle ranching, and oil palm and rubber tree plantations. Deforestation can result in more carbon dioxide being released into the atmosphere. That is because trees take in carbon dioxide from the air for photosynthesis, and carbon is locked chemically in their wood. When trees are burned, this carbon returns to the atmosphere as carbon dioxide. With fewer trees around to take in the carbon dioxide, this greenhouse gas accumulates in the atmosphere and accelerates global warming. Deforestation also threatens the world’s biodiversity. Tropical forests are home to great numbers of animal and plant species. When forests are logged or burned, it can drive many of those species into extinction. Some scientists say we are already in the midst of a mass-extinction episode. More immediately, the loss of trees from a forest can leave soil more prone to erosion. This causes the remaining plants to become more vulnerable to fire as the forest shifts from being a closed, moist environment to an open, dry one. While deforestation can be permanent, this is not always the case. In North America, for example, forests in many areas are returning thanks to conservation efforts.",
    "img_src": "../static/images/support_forest/deforestion_2.jpeg",
    causeDate: allCauses[0].id,
    contributedToThisCause: checkIfUserContributed(
        allCauses[0].id
    ),
};
// console.log(supportDeforestation)
const supportScientist = {
    h1: "Support the scientist protest",
    p: "Over 1,000 scientists from 25 different countries staged protests last week following the release of the Intergovernmental Panel on Climate Change’s new report. The report warned that rapid and deep cuts to greenhouse gas emissions are necessary by 2025 to avoid catastrophic climate effects. The group, called the Scientist Rebellion, writes in a letter that “current actions and plans are grossly inadequate, and even these obligations are not being met.” Their protests “highlight the urgency and injustice of the climate and ecological crisis,” per a statement from the organization. Human industrial activity has impacted the world as severely as the asteroid which wiped out the dinosaurs. 70% of the mammals, fish, birds, plants, amphibians, reptiles, and around half of the insects annihilated. Greenhouse gas emissions and temperatures soaring faster than at perhaps any point in Earth’s history. Climate tipping points being crossed – like the melting of the Arctic – accelerating heating and stripping humanity of meaningful control over our future. We are heading toward a world at least 4°C hotter this century. The effects will be catastrophic. Even 2°C – which we are set to burn through by 2050 – means billions without enough food and water, hundreds of millions of refugees, historic natural disasters virtually every year, war, disease. Without political and economic revolution we face a nightmare from which we cannot wake. Scientists know this, and we are starting to resist.",
    p_whatWeDo: "Time is running out. The crisis is accelerating: our movements must grow similarly rapidly to have any hope of success. Unfortunately, this is only possible with adequate funding. Many of Scientist Rebellion’s activists work full time, around the clock, often risking arrest and imprisonment in order to spread awareness of the climate crisis and push governments towards enacting meaningful change. Donations will be used to finance both our actions and living expenses. Any amount you can donate will be appreciated greatly, and you will be able to see the results of your contributions as actions on our social media. ",
    "img_src": "../static/images/support_scientist/scientist_2.jpeg",
    causeDate: allCauses[1].id,
    contributedToThisCause: checkIfUserContributed(
        allCauses[1].id
    ),
};
const supportGreatBarrierReef = {
    h1: "Support the great barrier reefs",
    p: "Once upon a time, there was a city so dazzling and kaleidoscopic, so braided and water-rimmed, that it was often compared to a single living body. It clustered around a glimmering emerald spine, which astronauts could glimpse from orbit. It hid warm nooks and crannies, each a nursery for new life. It opened into radiant, iris-colored avenues, which tourists crossed oceans to see. The city was, the experts declared, the planet’s largest living structure. Then, all at once, a kind of invisible wildfire overran the city. It consumed its avenues and neighborhoods, swallowed its canyons and branches. It expelled an uncountable number of dwellers from their homes. It was merciless: Even those who escaped the initial ravishment perished in the famine that followed. Many people had loved the city, but none of them could protect it. No firefighters, no chemicals, no intervention of any kind could stop the destruction. As the heat plundered the city of its wealth, the experts could only respond with careful, mournful observation. All of this recently happened, more or less, off the east coast of Australia. The Great Barrier Reef—which, at 1,400 miles long, is the longest and largest coral reef in the world—was blanketed by dangerously hot water in the summer of 2016. This heat strangled and starved the corals, causing what has been called 'an unprecedented bleaching event. 'Though that bleaching event was reported at the time, scientists are just starting to understand how catastrophically transformative it was. A new paper, published Wednesday in the journal Nature, serves as a kind of autopsy report for the debacle. After inspecting every one of its reefs, and surveying them on an almost species-by-species basis, the paper reports that vast swaths of the Great Barrier Reef were permanently transformed in the summer of 2016. The reef’s northern third, previously its most pristine section, lost more than half of its corals. Two of its most recognizable creatures—the amber-colored staghorn corals, and the flat, fanlike tabular corals—suffered the worst casualties. But damage was widespread out across the entire ecosystem. 'On average, across the Great Barrier Reef, one in three corals died in nine months,' said Terry Hughes, an author of the paper and the director of the ARC Center of Excellence for Coral Reef Studies, the Australian government’s federal research program devoted to corals.",
    p_whatWeDo: "We established a pilot ocean-based coral nursery to regenerate coral reefs on the Great Barrier Reef at Fitzroy Island, near Cairns. Cuttings of corals that survived the two recent bleaching events (pictures above) were harvested from a nearby reef and attached to 10 coral tree frames, which accelerates the growth of the corals. The first generation of corals has been re-planted on a nearby damaged reef and the second generation of corals is being grown to continue this process. This solution has been proven overseas and adapted to the Great Barrier Reef.",
    "img_src": "../static/images/support_forest/deforestion_2.jpeg",
    causeDate: allCauses[2].id,
    "img_src": "../static/images/support_reefs/reef_2.jpeg",
    contributedToThisCause: checkIfUserContributed(
        allCauses[2].id
    ),
};
//change the value inside of the form cause_id so it matches whatever slide the user is on when they like or donte to that cause
// check weather the varibles exist in dom before doing anything
if (causeIdforLikes !== null) {
    causeIdforLikes.value = supportDeforestation.causeDate;
    causeIdForDonate.value = supportDeforestation.causeDate;
    causeIdForDonateUpdate.value = supportDeforestation.causeDate
}
hInfo.textContent = supportDeforestation.h1;
pInfo.textContent = supportDeforestation.p;
pInfo_detail.textContent = supportDeforestation.p_whatWeDo
imgInfo_detail.src = supportDeforestation.img_src

if (supportDeforestation.contributedToThisCause.donation_amount > 0 && supportDeforestation.contributedToThisCause.liked === 1) {
    pop_upModelForUpdating.classList.add('show')
    pop_upModelForPost.classList.remove('show')
} else {
    pop_upModelForUpdating.classList.remove('show')
    pop_upModelForPost.classList.add('show')
}
//function to check if user already contributed to a certain cause and change btn functions
//set the dfault because then u will need to slike to activate already liked btn
const setSlideContribution = (causeObj) => {
    //make check if donation contribution first befote liked 
    if (causeObj.contributedToThisCause.donation_amount > 0) {
        likedCauseBtn.classList.add("alreadyLikedCause");
        likeCauseForm.classList.add("alreadyLikedForm");
        donateBtn.classList.add('hasAlreadyDonated')
        //change the form so that it can be to update rather then post
    }
    //if they only liked not donate
    else if (causeObj.contributedToThisCause.liked == 1) {
        likedCauseBtn.classList.add("alreadyLikedCause");
        likeCauseForm.classList.add("alreadyLikedForm");
        donateBtn.classList.remove('hasAlreadyDonated')
    } else {
        likedCauseBtn.classList.remove("alreadyLikedCause");
        likeCauseForm.classList.remove("alreadyLikedForm");
        donateBtn.classList.remove('hasAlreadyDonated')
    }
    //change the form
    if (causeObj.contributedToThisCause.donation_amount > 0 && causeObj.contributedToThisCause.liked === 1) {
        pop_upModelForUpdating.classList.add('show');
        pop_upModelForPost.classList.remove('show');
    } else {
        pop_upModelForUpdating.classList.remove('show');
        pop_upModelForPost.classList.add('show');
    }
};
setSlideContribution(supportDeforestation);

const track = document.querySelector(".carousel_track");
const slides = Array.from(track.children);
const nextBtn = document.querySelector(".carousel_btn--right");
const prevBtn = document.querySelector(".carousel_btn--left");
const dotsNav = document.querySelector(".carousel_nav");
const dots = Array.from(dotsNav.children);
const slideWidth = slides[0].getBoundingClientRect().width;
//pass in the data into js

//bottom does top better
const setSlidePosition = (slide, index) => {
    slide.style.left = slideWidth * index + "px";
    //this will get all the slides to go inplace no matter how many images u add
};
slides.forEach(setSlidePosition);

const moveToSLide = (track, currentSlide, targetSlide) => {
    //move to next slide
    track.style.transform = "translateX(-" + targetSlide.style.left + ")";

    //import for when i want to add the info below the carsouel
    currentSlide.classList.remove("current_slide");
    targetSlide.classList.add("current_slide");
};
const updateDots = (currentDot, targetDot) => {
    currentDot.classList.remove("current_slide");
    targetDot.classList.add("current_slide");
};
const hideSliderArrows = (slides, prevBtn, nextBtn, targetIndex) => {
    if (targetIndex === 0) {
        prevBtn.classList.add("is-hidden");
        nextBtn.classList.remove("is-hidden");
    } else if (targetIndex === slides.length - 1) {
        prevBtn.classList.remove("is-hidden");
        nextBtn.classList.add("is-hidden");
    } else {
        prevBtn.classList.remove("is-hidden");
        nextBtn.classList.remove("is-hidden");
    }
    if (targetIndex == 0) {
        hInfo.textContent = supportDeforestation.h1;
        pInfo.textContent = supportDeforestation.p;
        pInfo_detail.textContent = supportDeforestation.p_whatWeDo
        imgInfo_detail.src = supportDeforestation.img_src
        if (causeIdforLikes !== null) {
            causeIdforLikes.value = supportDeforestation.causeDate;
            causeIdForDonate.value = supportDeforestation.causeDate;
            causeIdForDonateUpdate.value = supportDeforestation.causeDate
        }
        //if user already donated the change the method to a put
        //call function to check if user already liked this cause and change the btn colors
        setSlideContribution(supportDeforestation);
        //change form depending on if they already donated
    } else if (targetIndex == 1) {
        hInfo.textContent = supportScientist.h1;
        pInfo.textContent = supportScientist.p;
        pInfo_detail.textContent = supportScientist.p_whatWeDo
        imgInfo_detail.src = supportScientist.img_src
        if (causeIdforLikes !== null) {
            causeIdforLikes.value = supportScientist.causeDate;
            causeIdForDonate.value = supportScientist.causeDate;
            causeIdForDonateUpdate.value = supportScientist.causeDate
        }
        //call function to check if user already liked this cause and change the btn colors
        //if user already donated the change the method to a put
        setSlideContribution(supportScientist);
    } else {
        hInfo.textContent = supportGreatBarrierReef.h1;
        pInfo.textContent = supportGreatBarrierReef.p;
        pInfo_detail.textContent = supportGreatBarrierReef.p_whatWeDo
        imgInfo_detail.src = supportGreatBarrierReef.img_src
        if (causeIdforLikes !== null) {
            causeIdforLikes.value = supportGreatBarrierReef.causeDate;
            causeIdForDonate.value = supportGreatBarrierReef.causeDate;
            causeIdForDonateUpdate.value = supportGreatBarrierReef.causeDate
        }
        //call function to check if user already liked this cause and change the btn colors
        //if user already donated the change the method to a put
        setSlideContribution(supportGreatBarrierReef);
    }
};
//move left
prevBtn.addEventListener("click", (e) => {
    const currentSlide = track.querySelector(".current_slide");
    const prevSlide = currentSlide.previousElementSibling;
    const currentDot = dotsNav.querySelector(".current_slide");
    const prevDot = currentDot.previousElementSibling;
    const prevIndex = slides.findIndex((slide) => slide === prevSlide);

    moveToSLide(track, currentSlide, prevSlide);
    updateDots(currentDot, prevDot);
    hideSliderArrows(slides, prevBtn, nextBtn, prevIndex);
});
//click on right btn move move right
nextBtn.addEventListener("click", (e) => {
    const currentSlide = track.querySelector(".current_slide");
    //only look through track instead of whole document
    const nextSlide = currentSlide.nextElementSibling;
    //get the next img li from currentSlide element;
    // const amountToMoce = nextSlide.style.left;
    // //move to next slide
    // track.style.transform = 'translateX(-' + amountToMoce +')';

    // //import for when i want to add the info below the carsouel
    // currentSlide.classList.remove('current_slide')
    // nextSlide.classList.add('current_slide')
    const currentDot = dotsNav.querySelector(".current_slide");
    const nextDot = currentDot.nextElementSibling;
    const nextIndex = slides.findIndex((slide) => slide === nextSlide);
    moveToSLide(track, currentSlide, nextSlide);
    updateDots(currentDot, nextDot);
    hideSliderArrows(slides, prevBtn, nextBtn, nextIndex);
});

//change dots for each slide
dotsNav.addEventListener("click", (e) => {
    //find what we clicked on off the whole nav?
    const targetDot = e.target.closest("button");
    // /the cloest button only lets u click the button not the whole nac div
    if (!targetDot) return;
    //stops function id user does not click one of the buttons nav slide
    const currentSlide = track.querySelector(".current_slide");
    const currentDot = dotsNav.querySelector(".current_slide");
    const targetIndex = dots.findIndex((dot) => dot === targetDot);
    const targetSlide = slides[targetIndex];

    moveToSLide(track, currentSlide, targetSlide);
    updateDots(currentDot, targetDot);
    hideSliderArrows(slides, prevBtn, nextBtn, targetIndex);
});

