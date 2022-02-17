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
         "<h5 class=\"card-title\">"+ p.espaniol + " - " + p.tzutujil + "</h5>" +
         "<p class=\"card-text\">" + p.exes + "<br>" + p.extzu + "</p>" +
         "</div>" +
         "</div>"
      )
   });

});

function filterItems(query) {
   return palabras.filter(function (el) {
      return el.espaniol.toLowerCase().indexOf(query.toLowerCase()) > -1;
   })
}