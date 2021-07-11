const LOCAL_BASE_URL = 'http://localhost:7071';
const AZURE_BASE_URL = 'https://orange-beach-0331eec10.azurestaticapps.net/api/Getevents';

$(document).ready(function () {
    $.ajax({
        url: "http://127.0.0.1:7071/api/GetEvents",
        error: function (err) {
            var errorHTML = `<div class="event-container">
            <br>
                <div class="row">
                    <div class="col-md-12 col-sm-12 session-datetime">Error occured while retrieving events</div> 
                </div>   
            <br>
            </div>`
            document.getElementById("SessionsContainer").innerHTML += renderSession();
        }
    }).then(function (data) {
        console.log(data)

        if (data.length === 0) {
            document.getElementById("SessionsContainer").innerHTML += renderSession(element);
        }
        JSON.parse(data).forEach(element => {
            document.getElementById("SessionsContainer").innerHTML += renderSession(element);
        });
    });
});


const getAPIBaseUrl = () => {
    const isLocal = /localhost/.test(window.location.href);
    return isLocal ? LOCAL_BASE_URL : AZURE_BASE_URL;
}

const renderSession = (event) => {

    var sessionHTML = `<div class="event-container">
    <br>
        <div class="row">
            <div class="col-md-4 col-sm-12 session-title"><b>Date &amp; Time </b></div> 
            <div class="col-md-8 col-sm-12 session-datetime">${event.dateTimeDescription}</div> 
        </div>   
    <div class="row">
        <div class="col-md-4 col-sm-12 session-price"><b>Location</b></div> 
        <div class="col-md-8 col-sm-12 session-location">${event.location}</div> 
    </div>   
    <div class="row">
    <div class="col-md-4 col-sm-12 session-price"><b>Additional Info</b></div> 
    <div class="col-md-8 col-sm-12 session-location">${event.additionalInfo}</div> 
    </div>   
    <br>
    <div class="row">
    <div class="col-12" style="text-align:center">
        <a href="mailto:jaqhockey@gmail.com?subject=RSVP for On-Ice Session: ${event.dateTimeDescription}}">
        <div class="session-rsvp" style="padding-left:30px;padding-right:30px;">RSVP</div>
        </a>
    </div>
    </div>
    <br>
    </div>`
    return sessionHTML;

}