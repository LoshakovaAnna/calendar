document.addEventListener("DOMContentLoaded", init);

var nameMonth = ['January','February','March','April','May','June','July','August','September','October','November','December'];
var nameDay = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
var today = new Date();     

function init(){
    var currentDate = new Date();

    let time = document.querySelector(".time");
    time.textContent = currentDate.getHours() + ":" + currentDate.getMinutes() + ":" + currentDate.getSeconds();
    time.textContent = currentDate.toLocaleTimeString();
    let date = document.querySelector(".date");
    date.textContent = nameDay[currentDate.getDay()] + ", " + nameMonth[currentDate.getMonth()] + " "+ currentDate.getDate() + ", " + currentDate.getFullYear();

    let focusMonth = document.querySelector(".focus-month");

    focusMonth.textContent = nameMonth[currentDate.getMonth()] + " " + currentDate.getFullYear();
       
    let selectDayOnCalendar = document.querySelector(".selected-day");
    selectDayOnCalendar.textContent = "Today";
    
    showAllDaysOfMoth(currentDate);
    
    let  calendarBody = document.querySelector(".calendar-body");
    calendarBody.addEventListener('click', changeSelectedDay);

    let arrowPlus = document.querySelector(".down-arrow");
    arrowPlus.addEventListener('click', function(){
        currentDate.setMonth( currentDate.getMonth() + 1);
        focusMonth.textContent = nameMonth[currentDate.getMonth()] + " " + currentDate.getFullYear();
        
        showAllDaysOfMoth(currentDate);
    })
    let arrowMinus = document.querySelector(".up-arrow");

    arrowMinus.addEventListener('click', function(){
        currentDate.setMonth( currentDate.getMonth() - 1);
        focusMonth.textContent = nameMonth[currentDate.getMonth()] + " " + currentDate.getFullYear();
    
        showAllDaysOfMoth(currentDate);
    })
}

function showAllDaysOfMoth(selectDate){
    let  calendarBody = document.querySelector(".calendar-body");
    destroyChildren(calendarBody);

    let templDay = new Date(selectDate.getFullYear(), selectDate.getMonth(),selectDate.getDate());
    templDay.setDate(1);
  
    if (templDay.getDay()!=1){  
        if (templDay.getDay() == 0){            
        templDay.setDate(templDay.getDate() - 6);
        }
        else
        templDay.setDate(templDay.getDate() - templDay.getDay()+1);
    }
    

    for (let i = 0; i < 6; i++) {
        let weekElement = document.createElement("div");
        weekElement.classList.add("d-row")
        for (let j = 0; j < 7; j++) {
            let dayElement = document.createElement("div");
            dayElement.classList.add("day-of-month");
            dayElement.textContent = templDay.getDate();
            if (templDay.getMonth() != selectDate.getMonth()){
                dayElement.classList.add("shadow-day");
            };
            if (templDay.toDateString() == today.toDateString()) {
                dayElement.classList.add("today");
            }
            templDay.setDate(templDay.getDate() + 1);
        
            weekElement.appendChild(dayElement);           
        }
        calendarBody.appendChild(weekElement);
    }
}

function changeSelectedDay(e) {    
        let listWords = [...document.querySelectorAll(".day-of-month")];    
        let  i = listWords.indexOf(e.target);
        i += 1;
        let selectDayOnCalendar = document.querySelector(".selected-day");
        selectDayOnCalendar.textContent = nameDay[i%7] + " " + e.target.textContent;     
      
}

function destroyChildren(node)
{
    while (node.firstChild){      
        
        node.removeChild(node.firstChild);
    }
} 