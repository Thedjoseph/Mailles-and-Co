
(() => {
  const CONFIG={email:'contact@mailles-co.fr',whatsapp:'',formEndpoint:''}; // formEndpoint : URL Formspree/Getform pour recevoir commandes et messages sans ouvrir de messagerie
  const post=async(subject,f)=>{const r=await fetch(CONFIG.formEndpoint,{method:'POST',headers:{'Content-Type':'application/json',Accept:'application/json'},body:JSON.stringify({_subject:subject,...f})});if(!r.ok)throw new Error('send')}; // whatsapp : numéro au format international sans + (ex: 33612345678)
  const hd=document.querySelector("header"),tt=document.getElementById("toTop");
  const onScroll=()=>{hd.classList.toggle("scrolled",scrollY>40);tt.classList.toggle("show",scrollY>600)};
  addEventListener("scroll",onScroll,{passive:true});onScroll();
  tt.addEventListener("click",()=>scrollTo({top:0,behavior:"smooth"}));
  const secs=["collections","about","sur-mesure"].map(id=>document.getElementById(id));
  const lk=[...document.querySelectorAll(".links a")];
  const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)lk.forEach(a=>a.classList.toggle("active",a.getAttribute("href")==="#"+e.target.id))}),{rootMargin:"-40% 0px -55% 0px"});
  secs.forEach(x=>x&&io.observe(x));
  const toast=(m)=>{const t=document.getElementById("toast");t.querySelector("span").textContent=m;t.classList.add("show");clearTimeout(toast.t);toast.t=setTimeout(()=>t.classList.remove("show"),2200)};
  const track=document.querySelector(".products"),[pv,nx]=document.querySelectorAll(".arrows .arrow");
  const step=()=>(track.querySelector(".product:not([hidden])")||track.querySelector(".product")).offsetWidth+12;
  const upd=()=>{if(!pv)return;pv.disabled=track.scrollLeft<4;nx.disabled=track.scrollLeft+track.clientWidth>=track.scrollWidth-4};
  pv?.addEventListener("click",()=>track.scrollBy({left:-step()*(innerWidth<800?2:4),behavior:"smooth"}));
  nx?.addEventListener("click",()=>track.scrollBy({left:step()*(innerWidth<800?2:4),behavior:"smooth"}));
  track?.addEventListener("scroll",upd,{passive:true});addEventListener("resize",upd);upd();
  const setFilter=(c,go=true)=>{document.querySelectorAll('.chip').forEach(b=>b.classList.toggle('active',b.dataset.filter===c));document.querySelectorAll('.product').forEach(p=>p.hidden=!(c==='all'||p.dataset.category===c));track.scrollLeft=0;upd();if(go)document.getElementById('coups-de-coeur').scrollIntoView({behavior:'smooth'})};
  const INFO={
   livraison:['Livraison','<p>Chaque création est emballée avec soin et expédiée depuis la France.</p><h3>Zones de livraison</h3><p>Livraison en France métropolitaine incluse. Corse, DOM-TOM et international : possible sur demande, nous consulter avant commande.</p><h3>Délais</h3><p>Pièces en stock : expédition sous 3 à 5 jours ouvrés.<br>Pièces faites à la commande ou sur mesure : délai indiqué sur la fiche produit ou convenu ensemble, généralement 1 à 3 semaines.</p><p>Les frais de port dépendent du poids et de la destination : ils sont confirmés avant tout paiement.</p>'],
   retours:['Retours & échanges','<p>Vous disposez de 14 jours après réception pour changer d\'avis : écrivez-nous, puis renvoyez la pièce non portée et dans son emballage.</p><p>Les créations sur mesure ou personnalisées ne sont ni reprises ni échangées.</p><p>Un défaut ? Contactez-nous avec une photo, nous trouverons une solution.</p>'],
   faq:['FAQ','<h3>Comment passer commande ?</h3><p>Ajoutez vos créations au panier, puis validez : un e-mail récapitulatif s\'ouvre. Je confirme la disponibilité, les frais de port et le paiement.</p><h3>Comment entretenir mes pièces ?</h3><p>Lavage à la main à 30°, à plat pour le séchage. Pas de sèche-linge.</p><h3>Puis-je demander une création sur mesure ?</h3><p>Oui, via le formulaire de contact : couleurs, taille, matière, on en discute.</p>'],
   cgv:['Conditions générales de vente','<p>Les présentes CGV s\'appliquent à toute commande passée sur mailles-co.fr auprès de Mailles &amp; Co.</p><h3>Commande</h3><p>Une commande est confirmée après accord par e-mail entre la cliente et la créatrice sur la disponibilité, le prix et les frais de port.</p><h3>Prix &amp; paiement</h3><p>Les prix sont indiqués en euros, toutes taxes comprises, hors frais de livraison. Le paiement est demandé avant expédition, par virement ou tout moyen convenu ensemble.</p><h3>Délais</h3><p>Les pièces en stock sont expédiées sous 3 à 5 jours ouvrés. Les créations sur mesure ou faites à la commande suivent le délai annoncé lors de l\'échange, généralement 1 à 3 semaines.</p><h3>Droit de rétractation</h3><p>Conformément à la loi, vous disposez de 14 jours après réception pour changer d\'avis sur une pièce en stock. Ce droit ne s\'applique pas aux créations personnalisées ou sur mesure (article L221-28 du Code de la consommation).</p><h3>Litiges</h3><p>En cas de désaccord, contactez-nous en priorité pour trouver une solution amiable.</p>'],
   mentions:['Mentions légales','<h3>Éditrice du site</h3><p>Le site mailles-co.fr est édité à titre individuel, en micro-entreprise (artisanat d\'art), domiciliée en France.<br>E-mail : contact@mailles-co.fr</p><p class="todo">Merci de remplacer ce paragraphe par vos coordonnées complètes (nom, SIRET, adresse) avant la mise en ligne : ces informations sont obligatoires.</p><h3>Hébergement</h3><p class="todo">À compléter avec le nom et l\'adresse de votre hébergeur une fois le site en ligne.</p><h3>Propriété intellectuelle</h3><p>Les textes, photographies et créations présentés sur ce site sont la propriété de Mailles &amp; Co et ne peuvent être reproduits sans autorisation.</p>']
  };
  const rv=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add("in");rv.unobserve(e.target)}}),{threshold:.12});
  document.querySelectorAll(".section h2,.cards,.about-copy,.quote,.custom-process,.social-copy,.insta-collage").forEach(el=>{el.classList.add("reveal");rv.observe(el)});
  const CART_KEY='maillesco_cart_v1';
  let cart=[];try{cart=JSON.parse(localStorage.getItem(CART_KEY)||'[]')}catch(e){}
  const euro=n=>new Intl.NumberFormat('fr-FR',{style:'currency',currency:'EUR'}).format(n);
  const save=()=>{try{localStorage.setItem(CART_KEY,JSON.stringify(cart))}catch(e){}renderCart();};
  const parsePrice=s=>Number((s||'').replace(/[^0-9,.-]/g,'').replace(',','.'))||0;
  const modal=(id,open=true)=>{const m=document.getElementById(id);if(!m)return;m.classList.toggle('is-open',open);m.setAttribute('aria-hidden',String(!open));document.body.style.overflow=open?'hidden':'';};
  function renderCart(){
    const box=document.getElementById('cartItems'), totalEl=document.getElementById('cartTotal'), count=document.querySelector('.cart-count');
    if(!box)return;
    const countN=cart.reduce((a,x)=>a+x.qty,0); if(count) count.textContent=countN;
    if(!cart.length){box.innerHTML='<div class="cart-empty">Votre panier est vide. Ajoutez une création pour commencer.</div>';totalEl.textContent=euro(0);return;}
    box.innerHTML=cart.map((x,i)=>`<div class="cart-row"><div><strong>${x.name}</strong><small>${x.variant?`<span class="v-tag">${x.variant}</span> · `:''}${x.meta||''} · ${euro(x.price)}</small></div><div class="qty"><button type="button" data-q="${i}" data-d="-1" aria-label="Retirer une unité">−</button><span>${x.qty}</span><button type="button" data-q="${i}" data-d="1" aria-label="Ajouter une unité">+</button></div><button type="button" class="remove" data-r="${i}">Supprimer</button></div>`).join('');
    totalEl.textContent=euro(cart.reduce((a,x)=>a+x.price*x.qty,0));
  }
  function addProduct(prod){
    const name=prod.dataset.name, price=parsePrice(prod.dataset.price), meta=prod.dataset.meta;
    const activeOpt=prod.querySelector('.variant .opt.active');
    const variant=activeOpt?activeOpt.dataset.opt:null;
    const key=name+(variant||'');
    const found=cart.find(x=>x.name===name&&x.variant===variant); if(found)found.qty++; else cart.push({name,price,meta,variant,qty:1});
    save(); toast(name+(variant?` (${variant})`:'')+' ajouté au panier'); const c=document.querySelector('.cart-count');c.classList.remove('bump');void c.offsetWidth;c.classList.add('bump');
  }
  document.addEventListener('click',e=>{
    const opt=e.target.closest('.variant .opt'); if(opt){opt.parentElement.querySelectorAll('.opt').forEach(o=>o.classList.toggle('active',o===opt));return;}
    const add=e.target.closest('.add-cart'); if(add){e.preventDefault();addProduct(add.closest('.product'));return;}
    const trigger=e.target.closest('.cart-trigger,[href="#panier"],[href="#"]');
    if(trigger && (trigger.classList.contains('cart-trigger') || /commander/i.test(trigger.textContent))){e.preventDefault();modal('cartModal',true);return;}
    const inf=e.target.closest('[data-info]');
    if(inf){e.preventDefault();const d=INFO[inf.dataset.info];document.getElementById('infoTitle').textContent=d[0];document.getElementById('infoBody').innerHTML=d[1];modal('infoModal',true);return;}
    const contact=e.target.closest('[href="#contact"]');
    if(contact){
      e.preventDefault();
      const topic=contact.dataset.topic;
      const message=document.querySelector('#contactForm textarea[name="message"]');
      if(topic && message && (!message.value||message.dataset.auto)){message.value=`Bonjour, j'aimerais obtenir des informations concernant : ${topic}.`;message.dataset.auto='1';}
      modal('cartModal',false);modal('infoModal',false);modal('contactModal',true);
      return;
    }
    const chip=e.target.closest('.chip'); if(chip){setFilter(chip.dataset.filter,false);return;}
    const close=e.target.closest('[data-close-modal]'); if(close){modal('cartModal',false);modal('contactModal',false);modal('infoModal',false);return;}
    const q=e.target.closest('[data-q]'); if(q){const i=+q.dataset.q;cart[i].qty+=+q.dataset.d;if(cart[i].qty<=0)cart.splice(i,1);save();return;}
    const r=e.target.closest('[data-r]'); if(r){cart.splice(+r.dataset.r,1);save();return;}
    const cat=e.target.closest('.card[data-category]'); if(cat){setFilter(cat.dataset.category);return;}
  });
  document.addEventListener('keydown',e=>{if(e.key==='Enter'&&e.target.matches('.card[data-category]'))e.target.click();if(e.key==='Escape'){modal('cartModal',false);modal('contactModal',false);modal('infoModal',false)}});
  const orderText=(f)=>{const lines=cart.map(x=>`- ${x.qty} x ${x.name}${x.variant?' ('+x.variant+')':''} : ${euro(x.price*x.qty)}`).join('\n');const tot=euro(cart.reduce((a,x)=>a+x.price*x.qty,0));return `Bonjour,\n\nJe souhaite commander :\n${lines}\n\nTotal articles : ${tot} (hors frais de port)\n\nNom : ${f.cname.value}\nE-mail : ${f.cemail.value}\nAdresse de livraison : ${f.caddr.value}\n${f.cnote.value?'Précisions : '+f.cnote.value+'\n':''}\nMerci de me confirmer la disponibilité, les frais de port et le mode de paiement.`};
  const cf=document.getElementById('checkoutForm'),done=document.getElementById('checkoutDone');
  if(CONFIG.whatsapp)document.getElementById('waBtn').hidden=false;
  document.getElementById('checkoutBtn')?.addEventListener('click',()=>{
    if(!cart.length){toast('Votre panier est vide');return;}
    cf.hidden=false;done.hidden=true;cf.scrollIntoView({behavior:'smooth',block:'nearest'});cf.cname.focus();
  });
  cf?.addEventListener('submit',async e=>{e.preventDefault();if(!cart.length)return;
    const text=orderText(cf),btn=cf.querySelector('[type=submit]');
    if(CONFIG.formEndpoint){
      if(btn)btn.disabled=true;
      try{await post('Commande Mailles & Co',{name:cf.cname.value,email:cf.cemail.value,message:text});cart=[];save();}
      catch(err){toast("L'envoi a échoué, réessayez ou écrivez-nous par e-mail");if(btn)btn.disabled=false;return}
      if(btn)btn.disabled=false;
    }else{
      window.location.href=`mailto:${CONFIG.email}?subject=${encodeURIComponent('Commande Mailles & Co')}&body=${encodeURIComponent(text)}`;
    }
    cf.hidden=true;done.hidden=false;});
  document.getElementById('waBtn')?.addEventListener('click',()=>{if(cf.reportValidity())window.open(`https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(orderText(cf))}`,'_blank','noopener')});
  document.getElementById('contactForm')?.addEventListener('submit',async e=>{e.preventDefault();const f=e.target;const ok=document.getElementById('contactSuccess');
    if(CONFIG.formEndpoint){try{await post('Contact — Mailles & Co',{name:f.elements.name.value,email:f.elements.email.value,message:f.elements.message.value});f.reset();ok.textContent='Merci ! Votre message a bien été envoyé.';}catch(err){toast("L'envoi a échoué, réessayez plus tard");return}}
    else{const subject=encodeURIComponent('Contact — Mailles & Co');const body=encodeURIComponent(`Nom : ${f.elements.name.value}\nE-mail : ${f.elements.email.value}\n\n${f.elements.message.value}`);window.location.href=`mailto:${CONFIG.email}?subject=${subject}&body=${body}`;}
    ok.hidden=false;});
  document.querySelectorAll('.mobile-menu a').forEach(a=>a.addEventListener('click',()=>a.closest('details').removeAttribute('open')));
  renderCart();
})();
