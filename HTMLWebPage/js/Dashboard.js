let empPayrollList;
window.addEventListener('DOMContentLoaded',(event)=>{
   
    empPayrollList=getEmployeePayrollDataFromStorage();
    document.querySelector(".emp-count").textContent=empPayrollList.length;
    createInnerHtml();
});



const getEmployeePayrollDataFromStorage=()=>{
    return localStorage.getItem('EmployeePayrollList') ?
                        JSON.parse(localStorage.getItem('EmployeePayrollList')) : [];
}

$(document).ready(function(){
    var table = document.getElementById("emp-table");
    $(document).on('click', '#delEmp', function(){

   
    $.ajax({
        url: 'https://localhost:44388/EmpPay/Update/'+this.value,
        type: "GET",
        success: function(data){
            console.log(data['success']);
            window.alert(data['success'])
            loadData();
        },
            
        error:function(error){
            console.log(error);
        }
    });
    });


// const createInnerHtml=()=>{
//     const headerHtml="<th></th><th>Name</th><th>Gender</th><th>Department</th>"+
//                       "<th>Salary</th><th>Start Date</th><th>Action</th>";

//     // if(empPayrollList.length == 0) return;
//     const innerHtml=`${headerHtml}
    
// <tr><td><img class="profile" alt=""  src="../assert/profileImg2.png"></td>
// <td>Mohan sahu</td>
// <td>Male</td>
// <td><div class="dept-label">HR</div><div class="dept-label">Finance</div></td>

// <td>30000</td>
// <td>1 Nov 2020</td>

//     <td><img id="1" onclick="remove(this)" alt="delete"  src="../assert/logo/deleteLogo.png">
//     <img id="1" onclick="remove(this)" alt="edit"  src="../assert/logo/editIcon.png"></td>
// </tr>`;

    
    // //let empPayrollList=createEmployeePayrollJSON();
    // for(const empPayrollData of empPayrollList){
    //     innerHtml=`${innerHtml}
    // <tr>
    //     <td><img class="profile"alt="" src="${empPayrollData._profilePic}" alt=""></td>
    //     <td>${empPayrollData._name}</td>
    //     <td>${empPayrollData._gender}</td>
    //     <td>${getDeptHtml(empPayrollData._department)}</td>
    //     <td>${empPayrollData._salary}</td>
    //     <td>${empPayrollData._startDate}</td>
    //     <td>
    //         <img id="${empPayrollData._id}" onclick="remove(this)" 
    //             src="../assert/logo/deleteLogo.png" alt="delete">
    //         <img id="${empPayrollData._id}" onclick="update(this)"
    //             src="../assert/logo/EditIcon.png"alt="edit">
    //     </td>
    // </tr>
    // `;
    // }
//     document.querySelector('#table-display').innerHTML=innerHtml;
// }

const createInnerHtml=()=>{
    const headerHtml="<th></th><th>Name</th><th>Gender</th><th>Department</th>"+
                      "<th>Salary</th><th>Start Date</th><th>Action</th>";
    let innerHtml = `${headerHtml}` ;
    //if(empPayrollList.length == 0) return;
    //const innerHTML=`${headerHtml}`

    
    let empPayrollList=createEmployeePayrollJSON();
    for(const empPayrollData of empPayrollList){
        innerHtml=`${innerHtml}
    <tr>
        <td><img class="profile"alt="" src="${empPayrollData._profilePic}" alt=""></td>
        <td>${empPayrollData._name}</td>
        <td>${empPayrollData._gender}</td>
        <td><div>${getDeptHtml(empPayrollData._department)}</div>
       </td>
        <td>${empPayrollData._salary}</td>
        <td>${empPayrollData._startDate}</td>
        <td>
            <img id="${empPayrollData._id}" onclick="remove(this)" 
                src="../assert/logo/deleteLogo.png" alt="delete">
            <img id="${empPayrollData._id}" onclick="update(this)"
                src="../assert/logo/EditIcon.png"alt="edit">
        </td>
    </tr>
    `;
    }
    document.querySelector('#table-display').innerHTML=innerHtml;
}

const createEmployeePayrollJSON = () => {
    let empPayrollListLocal = [{
        _name: "mohan sahu",
        _gender:"male",
        _department:['Engineering','Finance'],
        _salary:'500000',    
        _startDate: '29 Oct 2019',
        _note:'',
        _id:new Date().getTime(),
        _profilePic:'../assert/profileImg2.png'

    },
    {
        _name: "Raj",
        _gender:"male",
        _department:['Sales','Finance'],
        _salary:'400000',    
        _startDate: '31 Oct 2020',
        _note:'',
        _id:new Date().getTime()+1,
        _profilePic:'../assert/profileImg3.png'
    }
];
  return empPayrollListLocal
}

const getDeptHtml=(deptList)=>{
    let deptHtml='';
    for(const dept of deptList){
        deptHtml=`${deptHtml}<div class='dept-label'>${dept}</div>`
    }
    return deptHtml;
}


loadData();

function loadData(){
    $.ajax({
        url:"https://localhost:44388/swagger/Emppayroll",
        type:"GET",
        success: function (result){
            window.alert(result);
            console.log(result);
            setEmployees(result['employees'])
        },
        error: function (errormessage){
            alert(errormessage.responseText);
        }

    });
}

function setEmployees(employees){
    $("#table").find("tr:gt(0)").remove();
    var i;
    for(i=0; i<employees.length; i++){
        var row = table.insertRow();
        row.value = employees[i]["employeeID"];
        row.insertCell().innerHTML = employees[i]["profile"];
        row.insertCell().innerHTML = employees[i]["fullname"];
        row.insertCell().innerHTML = employees[i]["gender"];

        var s = departmentStr(employees[i]['department']);
        row.insertCell().innerHTML = s;

       row.insertCell().innerHTML = 'Rs. '+employees[i]['salary'];
       row.insertCell().innerHTML = employees[i]['startDate'];
       row.insertCell().innerHTML = '<button class="tr-btn" id="delEmp" value='employees[i]["employeeID"] +'><i class="fa fa-trash"></i></button>'+
       '<button class="edit-btn" id="editEmp" value='employees[i]["employeeID"] +'><i class="fa fa-trash"></i></button>'  ;

    }
}

function departmentStr(dept){
    if(dept!=null)
    {
        var s = "";
        for(var i=0; i<dept.length; i++){
            S += "<span class=\"dot\">"+dept[i]+"</span>&nbsp;&nbsp;"
        }
        return s;
    }
    return '';
}

$(document).on('click', '#editEmp', function(){
    $.ajax({
        url: 'https://localhost:44388/EmpPay/Update/'+this.value,
        type: "GET",
        success: function(data){
            console.log(data['data']);
            updateEmp(data['data']);
            var updateResult=JSON.stringify(data['data']);
            localStorage.setItem("editEmp", updateResult);
        }

    });
});


});
