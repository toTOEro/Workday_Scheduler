var dateEl = $('#currentDay');
var textEl = $('textarea');

var buttonEls = $('button')

// Configures the current day element to display current date and time
var currentTime = moment().format("MM/DD/YYYY hh:mm a");
dateEl.text(currentTime);

console.log(buttonEls)

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
        var scheduleArea = textEl[i]
        var rowTime = scheduleArea.dataset.time
        var momentTime = moment(rowTime, "h a").hour()
        var currentHour = moment().hour()

        if (momentTime == currentHour) {
            console.log('samehour')
            scheduleArea.setAttribute("class", "present")
        } else if (moment(momentTime).isBefore(currentHour)) {
            scheduleArea.setAttribute("class", "past")

        } else {
            scheduleArea.setAttribute("class", "future")

        }

    }

}

function saveContent(event) {
    event.preventDefault();
    var content = event.target.closest('form').querySelector('textarea');
    var timeValue = content.dataset.time;
    var textValue = content.value;
    

    console.log(content.dataset.time)
    var storedSchedule = {
        hour : timeValue,
        text: textValue,
    };
    console.log(storedSchedule);

    localStorage.setItem("schedule", JSON.stringify(storedSchedule));



}




hourCheck()

setInterval(updateTime, 1000)

buttonEls.on("click",saveContent)
