let palabras;
fetch('db/palabras.json')
   .then(response => response.json())
   .then(data => palabras = data);


$('form').on('submit', function (e) {
   e.preventDefault();
   let texto = $('#buscar').val();
   $('#cards').empty();
   $('#errorMensaje').empty();

   // console.log(palabras)

   if (texto.includes("'")) {
      $('#cards').html("<p class=\"text-primary text-center\">Parece que estás intentando buscar una palabra en tzutujil, te recomendamos comprar el libro en la Academia de Lenguas Mayas más cercana para tener el diccionario completo.</p>")
   } else if (texto.length != 0) {
      let nuevosElementos = filterItems(texto);

      nuevosElementos.forEach(p => {
         $('#cards').append(
            "<div class=\"card bg-light my-3 col-md-4 p-2\">" +
            "<div class=\"card-header\"> #" + p.id + "</div>" +
            "<div class=\"card-body\">" +
            "<h5 class=\"card-title\">" + p.espaniol + " - " + p.tzutujil + "</h5>" +
            "<p class=\"card-text\">" + p.exes + "<br>" + p.extzu + "</p>" +
            "<button type=\"button\" class=\"btn btn-primary btnAudio\" data-toggle=\"modal\" data-target=\"#audioModal\">" +
            "<i class=\"fas fa-volume-up\"></i>" +
            "</button>" +
            " <input type=\"hidden\" value=\"" + p.audiosrc + "\">" +
            " <input type=\"hidden\" value=\"" + p.voice + "\">" +
            "</div>" +
            "</div>"
         )
      });

      $('.btnAudio').click(function () {
         $source = $(this).next('input').val();
         $voz = $(this).next('input').next('input').val();

         $('#laVoz').text($voz)

         var audio = $("#reproductorAudio");
         $('#audioElement').attr("src", $source)
         audio[0].pause();
         audio[0].load();
         audio[0].oncanplaythrough = audio[0].play();
      });
   } else {
      $('#errorMensaje').html("<p class=\"text-danger text-right\">Debes escribir al menos una letra.</p>")
   }

});

function filterItems(query) {
   return palabras.filter(function (el) {
      return el.espaniol.toLowerCase().indexOf(query.toLowerCase()) > -1;
   })
}