
// Page beacon so static page views also hit /api/echo
(function(){
  try {
    var pg = document.body.getAttribute('data-page') || 'unknown';
    var img = new Image(1,1);
    img.src = '/api/echo?pg=' + encodeURIComponent(pg) + '&t=' + Date.now();
  } catch(e){}
})();
