const renderPieChart = expenses => {
  google.charts.load("current", { packages: ["corechart"] });
  google.charts.setOnLoadCallback(drawChart);

  function drawChart() {
    google.charts.load("current", { packages: ["corechart"] });
    google.charts.setOnLoadCallback(drawChart);
    function drawChart() {
      var data = google.visualization.arrayToDataTable([
        ["Category", "Expense"],
        ...Object.entries(expenses),
      ]);

      var options = {
        title: "Expenses :",
        is3D: true,
        backgroundColor: "transparent",
        legend: {
          textStyle: { color: "#64ffda", fontSize: 20 },
          position: "bottom",
        },
        titleTextStyle: { color: "#64ffda" },
        chartArea: { width: "50%", height: "80%" },
      };

      var chart = new google.visualization.PieChart(
        document.getElementById("pie-chart")
      );
      chart.draw(data, options);
    }
  }
};
