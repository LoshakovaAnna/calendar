document.addEventListener('DOMContentLoaded', init);

const nameMonth = ['January','February','March','April','May','June','July','August','September','October','November','December'];
const nameDay = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];

var dateToChange = new Date();

function init(){

    updateTime();
    setInterval(updateTime, 1000);
    showCurrentDate();
    updateFocusDate(dateToChange);    
    refreshDaysOfMonth(dateToChange);
    addEventListenerCalender();
    addEventListenerArrow();   
};


function updateTime(){    
    let time = document.querySelector('.time');
    let date = new Date();
    time.textContent = date.toLocaleTimeString();
};

function showCurrentDate(){
    let date = document.querySelector('.date');
    let today = new Date();
    date.textContent = nameDay[today.getDay()] + ', ' + nameMonth[today.getMonth()] + ' '+ today.getDate() + ', ' + today.getFullYear();
};

function updateFocusDate(date){    
    let focusMonth = document.querySelector('.focus-month');
    focusMonth.textContent = nameMonth[date.getMonth()] + ' ' + date.getFullYear();       
};

function addEventListenerCalender(){
    let  calendarBody = document.querySelector('.calendar-body');
    calendarBody.addEventListener('click', changeSelectedDay);
};

function  addEventListenerArrow(){
    let arrowsOfChangeMonth = document.querySelector('.arrows-change-month');
    arrowsOfChangeMonth.addEventListener('click', changeMonth);
};

function changeMonth(e){
    if(e.target.classList.contains('down-arrow')){
        dateToChange.setMonth( dateToChange.getMonth() + 1);
    }
    else{
        dateToChange.setMonth( dateToChange.getMonth() - 1);    
    } 
    updateFocusDate(dateToChange);
    refreshDaysOfMonth(dateToChange);
};

function refreshDaysOfMonth(selectDate){    
    let  calendarBody = document.querySelector('.calendar-body');
    destroyChildren(calendarBody);

    let today = new Date(); 
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
        let weekElement = document.createElement('div');
        weekElement.classList.add('d-row')
        for (let j = 0; j < 7; j++) {
            let dayElement = document.createElement('div');
            dayElement.classList.add('day-of-month');
            dayElement.textContent = templDay.getDate();
            if (templDay.getMonth() != selectDate.getMonth()){
                dayElement.classList.add('shadow-day');
            };
            if (templDay.toDateString() == today.toDateString()) {
                dayElement.classList.add('today');
            }
            templDay.setDate(templDay.getDate() + 1);
        
            weekElement.appendChild(dayElement);           
        }
        calendarBody.appendChild(weekElement);
    }
};

function changeSelectedDay(e) {    
    let listWords = [...document.querySelectorAll('.day-of-month')];    
    
    for (let i = 0; i < listWords.length; i++) {
        listWords[i].classList.remove('day-selected-on-calendar');        
    };
    e.target.classList.add('day-selected-on-calendar');

    let  index = listWords.indexOf(e.target);
    index += 1;
    let selectDayOnCalendar = document.querySelector('.selected-day');
    selectDayOnCalendar.textContent = nameDay[index%7] + ' ' + e.target.textContent;   
};

function destroyChildren(node)
{
    while (node.firstChild){      
        node.removeChild(node.firstChild);
    }
}; 