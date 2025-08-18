
(function(){
  const params = new URLSearchParams(location.search);
  const exp = params.get('exp');
  function beacon(q){ (new Image()).src = '/api/track?' + q + (exp?('&exp='+encodeURIComponent(exp)):'') + '&t=' + Date.now(); }
  // pageview
  beacon('ev=pageview&pg='+(document.body.getAttribute('data-page')||'unknown'));
  // scroll depth
  let fired = {}; window.addEventListener('scroll', ()=>{
    const h = document.documentElement.scrollHeight - innerHeight; if(h<=0) return;
    const y = (scrollY / h) * 100; [25,50,75,100].forEach(p=>{ if(!fired[p] && y>=p){ fired[p]=1; beacon('ev=scroll&p='+p); if(p>=75) beacon('ev=scrolldeep'); } });
  }, {passive:true});
  // click tracking
  document.addEventListener('click', (e)=>{
    const t = e.target.closest('[data-track]'); if(!t) return;
    beacon('ev=click&target='+encodeURIComponent(t.getAttribute('data-track')));
  });

  // tabs
  document.querySelectorAll('.tabs').forEach(group=>{
    group.querySelectorAll('button').forEach(btn=>{
      btn.addEventListener('click', ()=>{
        group.querySelectorAll('button').forEach(b=>b.classList.remove('active'));
        btn.classList.add('active');
        const id = btn.getAttribute('data-tab');
        group.parentElement.querySelectorAll('.tabpanel').forEach(p=>p.classList.remove('active'));
        const panel = group.parentElement.querySelector('#'+id);
        if(panel){ panel.classList.add('active'); beacon('ev=tab&which='+encodeURIComponent(id)); }
      });
    });
  });

  // accordion
  document.querySelectorAll('.accordion h3').forEach(h=>{
    h.addEventListener('click', ()=>{
      const p = h.nextElementSibling; p.classList.toggle('open');
      beacon('ev=accordion&title='+encodeURIComponent(h.textContent||''));
    });
  });

  // Lazy sections
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{
      if(e.isIntersecting){
        const el = e.target;
        if(el.dataset.src){
          fetch(el.dataset.src).then(r=>r.text()).then(html=>{ el.innerHTML = html; });
          beacon('ev=lazyload&src='+encodeURIComponent(el.dataset.src));
          io.unobserve(el);
        }
      }
    });
  }, {rootMargin:'200px'});
  document.querySelectorAll('.lazy[data-src]').forEach(el=>io.observe(el));

  // Cart drawer UI
  const drawer = document.getElementById('cart-drawer');
  const openBtn = document.getElementById('open-cart');
  const closeBtn = document.getElementById('close-cart');
  function refreshCart(){
    fetch('/api/cart').then(r=>r.json()).then(data=>{
      const wrap = document.getElementById('cart-items'); wrap.innerHTML='';
      let total=0;
      (data.items||[]).forEach(i=>{
        total += (i.price||0)*(i.qty||1);
        const row = document.createElement('div'); row.className='row';
        row.innerHTML = '<div>'+i.name+'</div><div>'+i.qty+'</div><div>$'+i.price+'</div><button class="linklike" data-id="'+i.id+'">✕</button>';
        wrap.appendChild(row);
        row.querySelector('button').addEventListener('click', ()=>{
          fetch('/api/cart?id='+i.id, {method:'DELETE'}).then(()=>refreshCart());
        });
      });
      document.getElementById('cart-total').textContent = '$'+total.toFixed(2);
    });
  }
  if(openBtn){ openBtn.addEventListener('click', ()=>{ drawer.classList.add('open'); refreshCart(); }); }
  if(closeBtn){ closeBtn.addEventListener('click', ()=>{ drawer.classList.remove('open'); }); }
  window.addToCart = function(id){
    fetch('/api/cart', {method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({product_id:id, qty:1})})
      .then(()=>{ beacon('ev=cart-add&id='+id); if(drawer){ drawer.classList.add('open'); refreshCart(); } });
  };
})();
