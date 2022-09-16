function register(event){
    event.preventDefault();


var date = document.getElementById("start-date-year").value+'/'+document.getElementById("start-date-month").value+'/'
+document.getElementById("start-date-year").value;
var salary = document.getElementById("salary").value;
var sal = parseFloat(salary).toFixed(3);
var StartDate = new Date(date);

let repData = {
    "EmpName":document.getElementById("fullname").value,
    "gender":document.querySelector('input[name="gender"]:checked').value,
    "salary":parseFloat(sal),
    "startDate":startDate,
    "department":[...document.querySelectorAll('input[name-department]:checked')].map(e => e.value),
    "notes":document.getElementById("notes").value
}

let rdata = JSON.stringify(repData);
var x = document.getElementById("snackbar");
x.className = "show";
$.ajax({
    url:'https://localhost:44388/swagger/Register',
    type: "POST",
    data:rdata,
    dataType:"json",
    contentType:'application/json',
    success: function (data){
        console.log(data);
        x.innerHTML = "registration successfully";
        x.style.color = "green";
        setTimeout(function(){x.className = x.className.replace("show", "");}, 3000);
    },
    error: function (error){
        console.log(error);
        x.innerHTML = "failed";
        x.style.color = "red";
        setTimeout(function(){x.className = x.className.replace("show", "");}, 3000);
    }
});
}