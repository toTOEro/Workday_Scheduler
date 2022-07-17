var dateEl = $('#currentDay');
var textEl = $('textarea');
var storedSchedule = JSON.parse(window.localStorage.getItem("storedSchedule")) || [];
var buttonEls = $('button');
var successEl = $('#success');

// Configures the current day element to display current date and time
var currentTime = moment().format("MM/DD/YYYY hh:mm a");
dateEl.text(currentTime);


// Function to update the time indicator on the page
function updateTime() {
    var seconds = moment().second();

    // Logic to add the blinking : sign to indicate that the clock is functioning properly
    if (seconds % 2 == 0) {
        currentTime = moment().format("MM/DD/YYYY hh:mm a");
        dateEl.text(currentTime);
    } else {
        currentTime = moment().format("MM/DD/YYYY hh mm a");
        dateEl.text(currentTime);
    }

    // Allows for the backgrounds of each hour in the schedule to update with the clock 
    hourCheck()

};

// Function to determine if a row is before, after, or is the current hour
function hourCheck() {
    for (let i = 0; i < textEl.length; i++) {
        // Initialize Variables
        var scheduleArea = textEl[i];
        var rowTime = scheduleArea.dataset.time;
        var momentTime = moment(rowTime, "h a").hour();
        var currentHour = moment().hour();

        // If else if else to check each row if it is present, past, or future
        if (momentTime == currentHour) {
            scheduleArea.setAttribute("class", "present");
        } else if (moment(momentTime).isBefore(currentHour)) {
            scheduleArea.setAttribute("class", "past");
        } else {
            scheduleArea.setAttribute("class", "future");
        };

    };

};

// saveContent function saves each schedule line item into specific index positions corresponding to each hour
function saveContent(event) {
    event.preventDefault();
    // Query selector to target the text area corresponding to the button press
    var content = event.target.closest('form').querySelector('textarea');


    // Pulls information from webpage content
    var timeValue = content.dataset.time;
    var textValue = content.value;
    var indexValue = content.dataset.index;

    // Populates object with updated information
    var updatedHour = {
        hour: timeValue,
        text: textValue,
    };

    // Pushes updated information to storedSchedule array
    storedSchedule[indexValue] = updatedHour;

    // Saves updated schedule to local storage
    window.localStorage.setItem("storedSchedule", JSON.stringify(storedSchedule));

    successEl.text(`Successfully submitted for ${timeValue}`).delay(2000).fadeOut(600, resetSuccess);

};

// Renders the saved schedule; used for on-page load
function renderSavedSchedule() {
    for (let i = 0; i < storedSchedule.length; i++) {

        if (storedSchedule[i] != null) {
            textEl[i].textContent = storedSchedule[i].text;
        } else {
            textEl[i].textContent = "";
        };
    };
};

// Resets the success notification
function resetSuccess() {
    successEl.text("");
    successEl.removeAttr("style");

}


// Initial execution of function to enable formatting on webpage load
hourCheck();
renderSavedSchedule();

// setInterval function to update time
setInterval(updateTime, 1000);


// Event listeners
buttonEls.on("click", saveContent);
