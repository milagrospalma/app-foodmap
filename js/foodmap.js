$(document).ready(function() {
  var list = $('#list');
  // Agregando todos los tipos de comida en una lista
  for (var i = 0; i < foodPoints.length; i++) {
    var typeFood = foodPoints[i]['type food'];
    for (var j = 0; j < typeFood.length; j++) {
      // Validar que no se repitan las opciones
      list.append('<li class="list-group-item"><a href="#">' + typeFood[j] + '</a></li>');
    }
  };

  // Ocultando las opciones
  $('.list-group-item').hide();

  // Evento para el input
  $('#search').on('input', function() {
    var text = $(this).val();
    console.log(text);
    $('.list-group-item').each(function() {
      var option = $(this).text();
      if (option.indexOf(text) !== -1 && text.length !== 0) {
        $(this).show();
      } else {
        $(this).hide();
        if (text.length === 0) {
          $('.result').remove();
        }
      }
    });
  });

  // Evento para la opción seleccionada
  $('.list-group-item').on('click', function(event) {
    event.preventDefault();
    $('#search').val($(this).text());
    $('.list-group-item').hide();
    showImage($('#search').val());
  });

  // Función para mostrar imágenes
  function showImage(type) {
    $('#gallery').append('<div class="result-container"/>');
    // $('<div class="result-container"/>').appendTo('#gallery');
    for (var i = 0; i < foodPoints.length; i++) {
      var objRestaurant = foodPoints[i];
      var arrRest = Object.keys(objRestaurant);
      for (var j = 0; j < arrRest.length; j++) {
        if (arrRest[j] === 'type food') {
          var arrTypes = foodPoints[i]['type food'];
          // console.log(arrTypes);
          for (var x = 0; x < arrTypes.length; x++) {
            if (arrTypes[x] === type) {
              // console.log(arrTypes[x]);
              var restaurantImage = foodPoints[i]['image'];
              var restaurantName = foodPoints[i]['restaurant'];
              localStorage.address = foodPoints[i]['address'];
              localStorage.phone = foodPoints[i]['telephone'];
              localStorage.web = foodPoints[i]['web page'];

              console.log(foodPoints[i]['image']);
              console.log(foodPoints[i]['restaurant']);
              // $('.result-container').append('<img class="img-responsive" src="' + restaurantImage + '">');
              // $('.result-container').append('<p class="text">' + restaurantName + '</p>');
              $('.result-container').append('<p class="text">' + restaurantName + '</p>' + '<img class="img-responsive" src="' + restaurantImage + '">');
            }
          }
        }
      }
    }
  };

  // Evento mouseover
  $('#gallery').on('mouseover', function() {
    $('.result-container p').addClass('overlay');
  });

  $('#gallery').on('mouseout', function() {
    $('.result-container p').removeClass('overlay');
  });

  // Modal
  $('#gallery').on('click', function() {
    $('.result-container p').removeClass('overlay');
    $('#myModal').modal('show');
    $('.modal-title').append($('.text'));
    $('.modal-body').append($('.result-container img'));
    $('.modal-body').append('<p>Dirección: ' + localStorage.address + '</p>');
    $('.modal-body').append('<p>Teléfono: (01) ' + localStorage.phone + '</p>');
    $('.modal-body').append('<p>Sitio web: <a href="#">' + localStorage.web + '</a></p>');
  });
});
