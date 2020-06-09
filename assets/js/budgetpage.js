//--------------------------chart script----------------------------------------

//backend sim data
var label_array = [0, 1, 2, 3, 4];
var label_names = ["savings", "food", "bills", "entertainment", "other"]
var data_array = [500, 80, 120, 45, 45];
var date_array = ["2020-05-24", "2020-05-20", "2020-05-18", "2020-05-17", "2020-05-17"]
//end of backend sim

var chartPie = document.getElementById("chart1").getContext('2d');
var myChart = new Chart(chartPie,
//Chart attributes
{
type: 'pie',
data: {
    labels: label_names, //labels for legend, etc
    datasets: [{
        data: data_array, //the actual data
        backgroundColor: ["#F7464A", "#46BFBD", "#FDB45C", "#949FB1", "#4D5360", "#4D5360"],
        hoverBackgroundColor: ["#FF5A5E", "#5AD3D1", "#FFC870", "#A8B3C5", "#616774"]
              }]
      },
options: {
responsive: true
}
});

//--------------------------add item to Summary---------------------------------

function generateBudgetItems(){
  data_array.forEach((item, i) => {
    createBudgetElement(item, "placeholder", date_array[date_array.length -1 -i]);
  });
}

generateBudgetItems();

//red color: #ff0000
//green color: #24ff00

var btnAdd = document.getElementById("add_budget_item");

var selected_label = ""

btnAdd.addEventListener("click", function() {


      var form = $("#budget_form")

      if (form[0].checkValidity() === false) {

      } else {

        var desc_input = document.getElementById("description_form").value;
        var val_input = document.getElementById("val_form").value;
        var date_input = document.getElementById("date_form").value;

        var vLength = data_array.unshift(val_input);
        var dLength = date_array.unshift(date_input);

        if (vLength !== dLength) {
          console.log("error: vLength and dLength are not equal")
        }
        createBudgetElement(val_input, desc_input, date_input);
        //$(chartPie).bootstrapTable('refresh');
      }
})

function createBudgetElement(value, desc, date) {
  var ul = document.getElementById("summary_budget");
  var li = document.createElement("li");
  li.className = 'list-group-item';
  //li.display = "block";

  var span_desc = document.createElement("span");
  span_desc.textContent = desc
  span_desc.className = "float-left"
  li.appendChild(span_desc);

  var span_date = document.createElement("span");
  span_date.textContent = date
  //span_date.id = date
  span_date.className = "float-left"
  span_date.style = "margin-left: 50px;"
  li.appendChild(span_date);

  var span_label = document.createElement("span");
  span_label.textContent = selected_label
  //span_date.id = date
  span_label.className = "float-left"
  span_label.style = "margin-left: 50px;"
  li.appendChild(span_label);

  var span_val = document.createElement("span");
  span_val.textContent = "$" + value
  span_val.className = "float-right"
  li.appendChild(span_val);

  ul.insertBefore(li, ul.firstChild);
}
//------------------------date filter-------------------------------------------

//filter by current week working. currently working on filter by month

var filter_week = document.getElementById("filter_week");
//var filter_month = document.getElementById("month_select");

filter_week.addEventListener("click", changeToWeek);
//filter_month.addEventListener("click", changeToMonth);

function changeToWeek() {
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0');
  var yyyy = today.getFullYear();

  var currDay = today.getDay();

  var currWeek = yyyy + '-' + mm + '-' + (dd - currDay); //the date of the last sunday


  var i = date_array.length - 1;
  while (date_array[i].localeCompare(currWeek) < 0 && i > 0) {
    document.getElementById("summary_budget").children[i].style.display = "none";
    i--;
  }
}
// function changeToMonth() {
//   console.log(date_array);
//   console.log(data_array);
//   displayAll();
//   var today = new Date();
//   var dd = String(today.getDate()).padStart(2, '0');
//   var mm = String(today.getMonth() + 1).padStart(2, '0');
//   var yyyy = today.getFullYear();
//
//
//   var currWeek = yyyy + "-" + mm + "-01"; //the date of the beginning of the Month
//
//
//   var i = date_array.length - 1;
//   while (date_array[i].localeCompare(currWeek) < 0 && i > 0) {
//     document.getElementById("summary_budget").children[i].style.display = "none";
//     i--;
//   }
// }

// function displayAll() {
//   const myNode = document.getElementById("summary_budget");
//   while (myNode.firstChild) {
//     myNode.removeChild(myNode.lastChild);
//   }
//
//   data_array.forEach((item, i) => {
//     createBudgetElement(item, "placeholder", date_array[date_array.length -1 -i]);
//   });
// }

//---------------------------label selector-------------------------------------
var btnLabel = document.getElementById("label_selector_button");
var btnAddLabel = document.getElementById("add_label_btn");
var labelDropDown = document.getElementById("label_selector");
var labelInput = document.getElementById("label_input");
var hasClicked = 0;

btnLabel.addEventListener("click", function(){
  if (hasClicked == 0) {
    label_names.forEach((item, i) => {
      var label = document.createElement("a");
      label.className = "dropdown-item";
      label.onclick = selectedLabel(this.textContent);
      label.textContent = item
      hasClicked = 1;
      labelDropDown.insertBefore(label, labelDropDown.firstChild);
    })
  }
})

btnAddLabel.addEventListener("click", function() {
  label_array.unshift(labelInput.value);

  var label = document.createElement("a");
  label.className = "dropdown-item";
  label.textContent = labelInput.value
  labelDropDown.insertBefore(label, labelDropDown.firstChild);

})

function selectedLabel(labelName) {
  selected_label = labelName;
}

//---------------------upload csv file-----------------------------------------

$('#input_file_csv').on('change',function(){
    //get the file name
    var fileName = $(this).val();
    var cleanFileName = fileName.replace('C:\\fakepath\\', " ");
    //replace the "Choose a file" label
    $(this).next('.custom-file-label').html(cleanFileName);
})

var file = document.getElementById('input_file_csv').files[0];
const fileReader = new FileReader();

fileReader.addEventListener('load', (event) => {
  parseFile(event.target.result);
});

fileReader.readAsText(file);

function parseFile() {

  //in progress
}


//---------------------share budget modal---------------------------------------
var btnShare = document.getElementById("send_invite_email");

btnShare.addEventListener("click", function(){


        var form = $("#share_form")


        if (form[0].checkValidity() === false) {
          console.log("error: missing form items")
        } else {
          //not working currently
        }
})
