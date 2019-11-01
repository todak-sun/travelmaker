/**
 *
 */
window.onload = function() {
  alert('route.js loaded');
};

$(document).ready(function() {
  $('#routeWriteBtn').on('click', function() {
    alert('routeWriteBtn Click');
    location.href = '/route/routeWriteForm';
  });
});
