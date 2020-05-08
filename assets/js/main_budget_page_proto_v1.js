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
