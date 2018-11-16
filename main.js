document.addEventListener("DOMContentLoaded", init);

var month_name = ['January','February','March','April','May','June','July','August','September','October','November','December'];
var day_name = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
     
function init(){
   var today = new Date();
   console.log(today);

   let time = document.querySelector(".time");
   time.textContent = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

   let date = document.querySelector(".date");
   date.textContent = day_name[today.getDay()] + ", " + month_name[today.getMonth()] + " "+ today.getDate() + ", " + today.getFullYear();

   let focusMonth = document.querySelector(".focus-month");

   focusMonth.textContent = month_name[today.getMonth()] + " " + today.getFullYear();
let  calendarBody = document.querySelector(".calendar-body");
   for (let i = 0; i < 7; i++) {
       let weekElement = document.createElement("div");
       weekElement.classList.add("d-row")
       for (let j = 0; j < 6; j++) {
           let dayElement = document.createElement("div");
           dayElement.classList.add("day-of-month");
           dayElement.textContent = day_name[j];
        weekElement.appendChild(dayElement);
           
       }
       calendarBody.appendChild(weekElement);
       
   }



}