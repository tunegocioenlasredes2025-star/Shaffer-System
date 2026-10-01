/* Shaffer System · web
   El formulario no manda a ningún servidor: arma el mensaje y abre WhatsApp
   con todo cargado, así el pedido llega directo a Fernando. */
(function () {
  'use strict';
  var WA = '5491166384242';
  var BASE = 'Hola, quiero información sobre el podógrafo digital en comodato.';

  // Los botones de WhatsApp sueltos llevan un mensaje armado
  document.querySelectorAll('[data-wa]').forEach(function (a) {
    a.href = 'https://wa.me/' + WA + '?text=' + encodeURIComponent(BASE);
  });

  // La barra toma borde al bajar
  var barra = document.getElementById('barra');
  var alBajar = function () { barra.classList.toggle('con-borde', window.scrollY > 8); };
  window.addEventListener('scroll', alBajar, { passive: true }); alBajar();

  // Formulario -> WhatsApp
  var form = document.getElementById('form');
  var err = document.getElementById('form-err');
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var faltan = [];
    form.querySelectorAll('[required]').forEach(function (el) {
      var mal = !el.value.trim();
      el.closest('.campo').classList.toggle('error', mal);
      if (mal) faltan.push(el.previousElementSibling ? el.previousElementSibling.textContent.replace(/\(opcional\)/, '').trim() : el.name);
    });
    if (faltan.length) {
      err.textContent = 'Completá: ' + faltan.join(', ') + '.';
      err.hidden = false;
      form.querySelector('.error input, .error select').focus();
      return;
    }
    err.hidden = true;
    var v = function (n) { return (form.elements[n].value || '').trim(); };
    var lineas = ['Hola, quiero pedir el podógrafo digital en comodato.', '',
      'Nombre: ' + v('nombre'),
      'Especialidad: ' + v('especialidad')];
    if (v('matricula')) lineas.push('Matrícula: ' + v('matricula'));
    lineas.push('Consultorio en: ' + v('localidad'),
      'Mi WhatsApp: ' + v('telefono'),
      'Pacientes por semana con consulta de pie: ' + v('pacientes'));
    if (v('mensaje')) lineas.push('', v('mensaje'));
    window.open('https://wa.me/' + WA + '?text=' + encodeURIComponent(lineas.join('\n')), '_blank', 'noopener');
  });
  form.addEventListener('input', function (e) {
    var c = e.target.closest('.campo');
    if (c && e.target.value.trim()) c.classList.remove('error');
  });
})();
