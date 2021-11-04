$(document).ready(function () {
  mostrarDatos();

});

function mostrarDatos() {
  $.get("https://api.datos.gob.mx/v1/calidadAire", function (response, state) {
    //$("#proveedor").empty();
    $("tbody").children().remove();

    console.log(response.results[1]);
    console.log(response.results[1].stations[0].indexes[0].calculationTime);
    console.log(response.results[1].stations[0].indexes[0].responsiblePollutant);
    console.log(response.results[1].stations[0].indexes[0].value);
    console.log(response.results[1].stations[0].indexes[0].scale);
    console.log(response.results[1].stations[0].id);
    console.log(response.results[1].stations[0].location.lon);
    //console.log(response.results[1].stations[0].measurements.length);
    console.log(response.results.length)

    for (i = 0; i < response.results.length; i++) {
      var _id = response.results[i]._id;
      var calculationTime = response.results[i].stations[0].indexes[0].calculationTime;
      var responsiblePollutant = response.results[i].stations[0].indexes[0].responsiblePollutant;
      var value = response.results[i].stations[0].indexes[0].value;
      var scale = response.results[i].stations[0].indexes[0].scale;

      var averagedOverInHours;
      var time;
      var value2;
      var unit;
      var pollutant;

      if(response.results[i].stations[0].measurements.length<1){

       averagedOverInHours = "-";
       time = "-";
       value2 = "-";
       unit = "-";
       pollutant = "-";
      }else{
       averagedOverInHours = response.results[i].stations[0].measurements[0].averagedOverInHours;
       time = response.results[i].stations[0].measurements[0].time;
       value2 = response.results[i].stations[0].measurements[0].value;
       unit = response.results[i].stations[0].measurements[0].unit;
       pollutant = response.results[i].stations[0].measurements[0].pollutant;
      }

      var lon = response.results[1].stations[0].location.lon;
      var alt = response.results[1].stations[0].location.alt;
      var lat = response.results[1].stations[0].location.lat;
      

      var sourceId = response.results[i].stations[0].source_id;
      var name = response.results[i].stations[0].name;
      var id = response.results[i].stations[0].id;      
      

      $('#tablaDatos').append(
        '<tr><td>' + _id + '</td><td>'
        + calculationTime + '</td><td>'
        + responsiblePollutant + '</td><td>'
        + value + '</td><td>'
        + scale + '</td><td>'
        + averagedOverInHours + '</td><td>'
        + time + '</td><td>'
        + value2 + '</td><td>'
        + unit + '</td><td>'
        + pollutant + '</td><td>'
        + alt + '</td><td>'
        + lon + '</td><td>'
        + lat + '</td><td>'
        + sourceId + '</td><td>'
        + name + '</td><td>'
        + id + '</td></tr>'
       // + '<button type="button" class="btn btn-warning col-sm-4" id="btnEditarEmpleado" onclick="showEditModal(' + response[i].numeroEmpleado + ')"><i class="fa fa-edit"></i></button></td><td><button type="button" class="btn btn-danger col-sm-4 float-right" onclick="eliminarEmpleado(' + response[i].numeroEmpleado + ')"><i class="fa fa-ban"></i></button></td></tr>');
      );
    }
  }, 'json');
}
