
// --- experiment tag propagation & trackers ---
(function(){
  try {
    const url = new URL(location.href);
    const exp = url.searchParams.get('exp');
    // Append exp tag to all same-origin links so sessions are easy to filter
    if (exp) {
      document.querySelectorAll('a[href^="/"]').forEach(a => {
        const u = new URL(a.getAttribute('href'), location.origin);
        if (!u.searchParams.has('exp')) { u.searchParams.set('exp', exp); }
        a.setAttribute('href', u.pathname + u.search);
      });
    }
    // pageview beacon
    var pg = document.body.getAttribute('data-page') || 'unknown';
    (new Image()).src = '/api/track?ev=pageview&pg='+encodeURIComponent(pg)+(exp?('&exp='+encodeURIComponent(exp)):'')+'&t='+Date.now();
    // scroll tracker (fires at 25, 50, 75, 100%)
    let fired = {};
    window.addEventListener('scroll', function(){
      const h = document.documentElement.scrollHeight - window.innerHeight;
      if (h <= 0) return;
      const y = (window.scrollY / h) * 100;
      [25,50,75,100].forEach(p=>{
        if (!fired[p] && y>=p) {
          fired[p]=true;
          (new Image()).src = '/api/track?ev=scroll&p='+p+(exp?('&exp='+encodeURIComponent(exp)):'')+'&t='+Date.now();
        }
      });
    }, {passive:true});
  } catch(e){}
})();
