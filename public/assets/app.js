
// tag propagation & trackers; also set cookie when deep scroll happens
(function(){
  try {
    const url = new URL(location.href);
    const exp = url.searchParams.get('exp');
    if (exp) {
      document.querySelectorAll('a[href^="/"]').forEach(a => {
        const u = new URL(a.getAttribute('href'), location.origin);
        if (!u.searchParams.has('exp')) { u.searchParams.set('exp', exp); }
        a.setAttribute('href', u.pathname + u.search);
      });
    }
    var pg = document.body.getAttribute('data-page') || 'unknown';
    (new Image()).src = '/api/track?ev=pageview&pg='+encodeURIComponent(pg)+(exp?('&exp='+encodeURIComponent(exp)):'')+'&t='+Date.now();
    let fired = {};
    window.addEventListener('scroll', function(){
      const h = document.documentElement.scrollHeight - window.innerHeight;
      if (h <= 0) return;
      const y = (window.scrollY / h) * 100;
      [25,50,75,100].forEach(p=>{
        if (!fired[p] && y>=p) {
          fired[p]=true;
          const img = new Image(1,1);
          img.src = '/api/track?ev=scroll&p='+p+(exp?('&exp='+encodeURIComponent(exp)):'')+'&t='+Date.now();
          if (p>=75) {
            // flag deep scroll with a cookie via GET param; server will set a cookie
            (new Image()).src = '/api/track?ev=scrolldeep';
          }
        }
      });
    }, {passive:true});
    document.addEventListener('click', (e) => {
      const a = e.target.closest('a[href^="/"]');
      if (!a) return;
      const href = a.getAttribute('href');
      const img = new Image(1,1);
      img.src = '/api/track?ev=click&href=' + encodeURIComponent(href) + (exp ? '&exp=' + encodeURIComponent(exp) : '') + '&t=' + Date.now();
    });
  } catch(e){}
})();
