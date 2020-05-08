//--------------------------chart script----------------------------------------

//placeholder arrays for testing
var label_array = ["savings", "food", "ex3", "ex4", "ex5"];
var data_array = [500, 80, 120, 45, 45];


var chartPie = document.getElementById("chart1").getContext('2d');
var myChart = new Chart(chartPie,
//Chart attributes
{
type: 'pie',
data: {
    labels: label_array, //labels for legend, etc
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

//red color: #ff0000
//green color: #24ff00

var btnAdd = document.getElementById("add_budget_item");
var ul = document.getElementById("summary_budget");

btnAdd.addEventListener("click", function() {
  var li = document.createElement("li");
  li.className = 'list-group-item';

  var desc_input = document.getElementById("description_form").value;
  var val_input = document.getElementById("val_form").value;
  var date_input = document.getElementById("date_form").value;

  var span_desc = document.createElement("span");
  span_desc.textContent = desc_input
  span_desc.className = "float-left"
  li.appendChild(span_desc);

  var span_date = document.createElement("span");
  span_date.textContent = date_input
  span_date.className = "float-left"
  span_date.style = "margin-left: 50px;"
  li.appendChild(span_date);

  var span_val = document.createElement("span");
  span_val.textContent = "$" + val_input
  span_val.className = "float-right"
  li.appendChild(span_val);

  ul.insertBefore(li, ul.firstChild);
})
