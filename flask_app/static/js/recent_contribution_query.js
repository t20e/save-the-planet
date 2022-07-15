const repeatedDiv = document.getElementById("repeatedDiv");
const xhr = new XMLHttpRequest();
let allContributions;
let pfp;
let flag;
const noPfp = "https://save-planet-images-s3.s3.amazonaws.com/client/noPfp.jpg"

const loadAllContributionData = () => {
    $.ajax({
        type: "GET",
        url: "http://127.0.0.1:5000/api/save-planet/recentContributions",
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function (callback) {
            if (callback.length > 0) {
                const data = callback;
                date = new Date();
                let lastTimeCalled = date.getUTCFullYear() + '-' +
                    ('00' + (date.getUTCMonth() + 1)).slice(-2) + '-' +
                    ('00' + date.getUTCDate()).slice(-2) + ' ' +
                    ('00' + date.getUTCHours()).slice(-2) + ':' +
                    ('00' + date.getUTCMinutes()).slice(-2) + ':' +
                    ('00' + date.getUTCSeconds()).slice(-2);
                setTimeout(() => {
                    recallApi(lastTimeCalled);
                }, 8000);
                return addInitiateJSONtoHtml(data);
            }
        },
        error: function (jqxhr, exception) {
            console.log('error fetching data from db');
        },
    });
};
loadAllContributionData();

const recallApi = (lastTimeCalled) => {
    console.log(lastTimeCalled + " last time called");
    pullNewDonationJSON(lastTimeCalled);
};
const getFlag = (flag) => {
    switch (flag) {
        case "United States":
        case "usa":
        case "USA":
        case "United States Of america":
            return "https://save-planet-images-s3.s3.amazonaws.com/app/countries/usa_image.jpg";
        case "France":
        case "france":
            return "https://save-planet-images-s3.s3.amazonaws.com/app/countries/france_image.png";
        case "United Kingdom":
        case "UK":
        case "uk":
        case "britain":
            return "https://save-planet-images-s3.s3.amazonaws.com/app/countries/uk_image.jpg";
        default:
            return "https://save-planet-images-s3.s3.amazonaws.com/app/countries/gloabl.jpg";
        // break;
    }
};
const addInitiateJSONtoHtml = (data) => {
    allContributions = data;
    for (let i = 0; i < allContributions.length; i++) {
        if( allContributions[i].profile_pic != null) {
            pfp =  allContributions[i].profile_pic
        } else {
            pfp = noPfp
        }
        if (allContributions[i].last_donation_timestamp != null) {
            allContributions[i].last_donation_timestamp = allContributions[i].last_donation_timestamp.slice(4, 16);
        }
        flag = getFlag(allContributions[i].country);
        repeatedDiv.innerHTML +=
            "<div class='LikedOrDonated'>" +
            "<div class='userLikedDiv'>" +
            "<img class='userPfp' src="+pfp+" />" +
            "<p class='usersName'> " +
            allContributions[i].first_name +
            " " +
            allContributions[i].last_name +
            "</p>" +
            "<div class='gridUserShowContainer'>" +
            "<div class='userDidThisSupport'>" +
            "<p>" +
            "donated $" +
            allContributions[i].donation_amount +
            " to " +
            allContributions[i].name +
            "</p>" +
            "</div>" +
            "<p class='date'>" +
            allContributions[i].last_donation_timestamp +
            "</p>" +
            "</div>" +
            "<img class='flag' src=" +
            flag +
            " />" +
            "</div>" +
            "</div>";
    }
};

const addNewDonations = (data) => {
    for (let i = 0; i < data.length; i++) {
        if (data[i].profile_pic != null) {
            pfp = data[i].profile_pic
        } else {
            pfp = noPfp
        }
        if (data[i].last_donation_timestamp != null) {
            data[i].last_donation_timestamp = data[i].last_donation_timestamp.slice(
                4,
                16
            );
        }
        flag = getFlag(data[i].country);
        repeatedDiv.insertAdjacentHTML(
            "afterbegin",
            "<div class='LikedOrDonated'>" +
            "<div class='userLikedDiv'>" +
            "<img class='userPfp' src=" +
            pfp +
            " />" +
            "<p class='usersName'> " +
            data[i].first_name +
            " " +
            data[i].last_name +
            "</p>" +
            "<div class='gridUserShowContainer'>" +
            "<div class='userDidThisSupport'>" +
            "<p>" +
            "donated $" +
            data[i].donation_amount +
            " to " +
            data[i].name +
            "</p>" +
            "</div>" +
            "<p class='date'>" +
            data[i].last_donation_timestamp +
            "</p>" +
            "</div>" +
            "<img class='flag' src=" +
            flag +
            " >" +
            "</div>" +
            "</div>"
        );
    }
};
//second pull
const pullNewDonationJSON = (lastTimeCalled) => {
    //pull the new data based on time
    $.ajax({
        type: "GET",
        url: `http://127.0.0.1:5000/api/save-planet/updateRecentContributions${lastTimeCalled}`,
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function (callback) {
            console.log(callback);
            if (callback.length > 0) {
                date = new Date();
                let lastTimeCalled = date.getUTCFullYear() + '-' +
                    ('00' + (date.getUTCMonth() + 1)).slice(-2) + '-' +
                    ('00' + date.getUTCDate()).slice(-2) + ' ' +
                    ('00' + date.getUTCHours()).slice(-2) + ':' +
                    ('00' + date.getUTCMinutes()).slice(-2) + ':' +
                    ('00' + date.getUTCSeconds()).slice(-2);
                setTimeout(() => {
                    recallApi(lastTimeCalled);
                }, 8000);
                addNewDonations(callback);
            } else {
                setTimeout(() => {
                    recallApi(lastTimeCalled);
                }, 8000);
            }
        },
        error: function (jqxhr, exception) {
            console.log('error fetching data from db');
            date = new Date();
            let lastTimeCalled = date.getUTCFullYear() + '-' +
                ('00' + (date.getUTCMonth() + 1)).slice(-2) + '-' +
                ('00' + date.getUTCDate()).slice(-2) + ' ' +
                ('00' + date.getUTCHours()).slice(-2) + ':' +
                ('00' + date.getUTCMinutes()).slice(-2) + ':' +
                ('00' + date.getUTCSeconds()).slice(-2);
            setTimeout(() => {
                recallApi(lastTimeCalled);
            }, 8000);
        },
    });
};
