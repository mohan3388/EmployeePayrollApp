$(document).ready(function(){
   
    AddDateField();
  });
function AddDateField() {
    var x = document.getElementById("salary");
    for (i = 1; i <= 20; i++) {
        var option = document.createElement("option");
        option.text = (i*10000).toString();
        option.value = i*10000;
        x.add(option);
    }
}