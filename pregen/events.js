const LOCAL_BASE_URL = 'http://localhost:7071/api';
const AZURE_BASE_URL = 'https://orange-beach-0331eec10.azurestaticapps.net/api';
const errorHTML = `<div class="event-container">
<br>
    <div class="row">
        <div class="col-md-12 col-sm-12 session-datetime">Error occured while retrieving events</div> 
    </div>   
<br>
</div>`

const noEventsHTML = `<div class="event-container">
<br>
    <div class="row">
        <div class="col-md-12 col-sm-12 session-datetime" style="text-align:center">No events posted. Please check back later</div> 
    </div>   
<br>
</div>`


$(document).ready(function () {
    const isOnIce = /onice/.test(window.location.href);
    const eventType = isOnIce ? 'onice' : 'office'

    $.ajax({
        url: `${getAPIBaseUrl()}/GetEvents?type=${eventType}`,
        error: function (err) {
            document.getElementById("SessionsContainer").innerHTML += errorHTML;
            $("#loadingSpinner").hide();
        }
    }).then(function (data) {
        if (JSON.parse(data).length === 0) {
            document.getElementById("SessionsContainer").innerHTML += noEventsHTML;
        }
        else {
            JSON.parse(data).forEach(element => {
                document.getElementById("SessionsContainer").innerHTML += renderSession(element, eventType);
            });
        }
        $("#loadingSpinner").hide();
    });
});


const getAPIBaseUrl = () => {
    console.log(window.location.href);
    const isLocal = /josh/.test(window.location.href) || /localhost/.test(window.location.href);
    return isLocal ? LOCAL_BASE_URL : AZURE_BASE_URL;
}

const renderSession = (event, type) => {

    const prettyType = type === 'onice' ? "On-ice" : "Off-ice";

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
        <a href="mailto:jaqhockey@gmail.com?subject=RSVP for ${prettyType} Session: ${event.dateTimeDescription}}">
        <div class="session-rsvp" style="padding-left:30px;padding-right:30px;">RSVP</div>
        </a>
    </div>
    </div>
    <br>
    </div>`
    return sessionHTML;

}