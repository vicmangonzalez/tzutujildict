let palabras;
fetch('db/palabras.json')
   .then(response => response.json())
   .then(data => palabras = data);


$('form').on('submit', function (e) {
   e.preventDefault();
   let texto = $('#buscar').val();

   // console.log(palabras)
   let nuevosElementos = filterItems(texto);

   $('#cards').empty();

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
         "</div>" +
         "</div>"
      )
   });

   $('.btnAudio').click(function () {
      $source = $(this).next('input').val();
      var audio = $("#reproductorAudio");
      $('#audioElement').attr("src", $source)
      audio[0].pause();
      audio[0].load();
      audio[0].oncanplaythrough = audio[0].play();
   });

});

function filterItems(query) {
   return palabras.filter(function (el) {
      return el.espaniol.toLowerCase().indexOf(query.toLowerCase()) > -1;
   })
}