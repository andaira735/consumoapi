<script type="text/javascript">
$(document).ready(function () {


  mostrarTodos();
  $("#formSuper").validate({
    rules:{
      id_s:{
        required: true,
        number: true
      },
      nombre:{
        required: true,
      },
      app: {
        required: true,
      },
      alias:{
        required: true,
      },
      empresa:{
        required: true,
      },
    },
    messages:{
      id_s:{
        required: 'Este campo es obligatorio',
        number: 'Este campo solo admite numeros enteros'
      },
      nombre:{
        required: 'Este campo es obligatorio',
      },
      app: {
        required: 'Este campo es obligatorio',
      },
      alias:{
        required: 'Este campo es obligatorio',
      },
      empresa:{
        required: 'Este campo es obligatorio',
      },
    },
    errorElement: 'span'
  });

  $('#AgregarSuper').click(function (e) {
    e.preventDefault();
    var url = "http://localhost:9002/SuperHeroes/superHeroes/Heroe/guardar";
    var data = JSON.stringify({
      id: $('#id_s').val(),
      nombre: $('#nombre').val(),
      app: $('#app').val(),
      alias: $('#alias').val(),
      empresa: $('#empresa').val()
    });

    $.ajax({
      method: "POST",
      url: url,
      data: data,
      dataType: 'json',
      contentType: "application/json",
      success: function (data) {
        console.log('Rellenando la tabla');
        mostrarTodos();
      },
      error: function (errors) {
        console.log(errors);
      }
    });

  });

  $("#EditarSuper").click(function (e) {
    e.preventDefault();
    var url = "http://localhost:9002/SuperHeroes/superHeroes/Heroe/editar";
    var data = JSON.stringify({
      id: $('#edit_id_s').val(),
      nombre: $('#edit_nombre').val(),
      app: $('#edit_app').val(),
      alias: $('#edit_alias').val(),
      empresa: $('#edit_empresa').val()
    });

    $.ajax({
      type: "POST",
      url: url,
      data: data,
      dataType: 'json',
      contentType: "application/json",
      success: function (data) {
        mostrarTodos();

        console.log("Actualizado correctamente")
      },
      error: function (errors) {
        console.log(errors);
      }
    });
  });

});

function showEditModal(e) {
  var url = "http://localhost:9002/SuperHeroes/superHeroes/Heroe/buscar";
  var data = JSON.stringify({
    id: e
  });

  $.ajax({
    method: "POST",
    url: url,
    data: data,
    dataType: 'json',
    contentType: "application/json",
    success: function (response, data) {
      console.log('Rellenando el formulario para editar');
      //console.log('response' + response.nombre);

      $('#edit_id_s').val(response.id);
      $('#edit_nombre').val(response.nombre);
      $('#edit_app').val(response.app);
      $('#edit_alias').val(response.alias);
      $('#edit_empresa').val(response.empresa);
      $('#modalEditar').modal("show");
    },
    error: function (errors) {
      console.log(errors);
    }
  });

}

function eliminarSuper(e) {
  swal({
    title: "¿Está seguro?",
    text: "Esta acción es irreversible",
    icon: "warning",
    buttons: ["Cancelar", "Eliminar"],
    dangerMode: true,
    closeModal: false,
  }).then(function (data) {
    if (data) {
      var data = JSON.stringify({
        id: e
      });
      var url = "http://localhost:9002/SuperHeroes/superHeroes/Heroe/eliminar";
      $.ajax({
        /*             headers: {
                      'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                    }, */
        type: "POST",
        url: url,
        data: data,
        dataType: 'json',
        contentType: "application/json",
        success: function () {
          swal("Eliminado correctamente", "success");
          mostrarTodos();
        },
        error: function (errors) {
          console.log("HOLA 3");
          swal("Hubo un error al eliminar este super");
        }
      });
    } else {
      console.log("HOLA 4");
      swal("Cancelado", "Se canceló la operación", "error");
      mostrarTodos();
    }
  });
}


function mostrarTodos(){
  $.get("http://localhost:9002/SuperHeroes/superHeroes/Heroe/mostrar", function (response, state) {
    //$("#proveedor").empty();
    $("tbody").children().remove();
    for (i = 0; i < response.length; i++) {
      console.log(response[i].id + ' ' + response[i].nombre + ' ' +
        response[i].app + ' ' + response[i].alias + ' ' + response[i].empresa);
      $('#tablaSuper').append(
        '<tr><td>' + response[i].id + '</td><td>' +
        response[i].nombre + '</td><td>'
        + response[i].app + '</td><td>'
        + response[i].alias + '</td><td>'
        + response[i].empresa + '</td><td>'
        + '<button type="button" class="btn btn-warning col-sm-4" id="btnEditarSuper" onclick="showEditModal(' + response[i].id + ')"><i class="fa fa-edit"></i></button><button type="button" class="btn btn-danger col-sm-4 float-right" onclick="eliminarSuper(' + response[i].id + ')"><i class="fa fa-ban"></i></button></td></tr>');
    }
  }, 'json');
}
</script>