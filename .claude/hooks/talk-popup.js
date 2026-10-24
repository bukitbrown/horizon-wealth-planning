/* Talk popup hook: after the visitor has stayed on the page for 10 seconds, shows a dialog
   announcing the free lunchtime financial planning talk.
   Loaded by index.html (<script src=".claude/hooks/talk-popup.js">); it builds its own styles and markup.
   Change the delay, words or venue in the config below; no other file needs editing. */
(function () {
  const config = {
    delayMs: 10000,
    title: 'Free financial planning talk',
    when: 'Lunchtime, 12pm to 1pm',
    where: 'Bukit Timah Shopping Mall',
    blurb: 'Bring your lunch and learn how to plan your pay, CPF and first savings. No cost, no obligation.',
    cta: 'Reserve my seat',
    ctaHref: '#contact'
  };

  const css = `
    #talkPopup { border: 0; border-radius: var(--radius, 6px); padding: 0; width: min(92vw, 440px); color: var(--ink, #0F1720); background: #fff; box-shadow: 0 24px 60px rgba(15,23,32,.35); }
    #talkPopup::backdrop { background: rgba(15,23,32,.55); }
    #talkPopup .tp-body { padding: 2rem 1.75rem 1.75rem; }
    #talkPopup .tp-tag { display: inline-block; font-size: 12px; font-weight: 500; letter-spacing: .06em; text-transform: uppercase; color: var(--accent, #D3202E); margin: 0 0 .6rem; }
    #talkPopup h2 { margin: 0 0 1rem; font-size: 1.5rem; line-height: 1.2; }
    #talkPopup dl { margin: 0 0 1rem; display: grid; gap: .4rem; }
    #talkPopup dt { font-size: 12px; text-transform: uppercase; letter-spacing: .05em; opacity: .6; }
    #talkPopup dd { margin: 0; font-weight: 500; }
    #talkPopup p { margin: 0 0 1.25rem; line-height: 1.5; }
    #talkPopup .tp-actions { display: flex; flex-wrap: wrap; gap: .75rem; align-items: center; }
    #talkPopup .tp-close { position: absolute; top: .5rem; right: .5rem; width: 40px; height: 40px; border: 0; background: none; font-size: 26px; line-height: 1; cursor: pointer; color: inherit; }
  `;

  function build() {
    const style = document.createElement('style');
    style.textContent = css;
    document.head.appendChild(style);

    const dlg = document.createElement('dialog');
    dlg.id = 'talkPopup';
    dlg.setAttribute('aria-labelledby', 'talkPopupTitle');
    dlg.innerHTML =
      '<button type="button" class="tp-close" aria-label="Close">&times;</button>' +
      '<div class="tp-body">' +
        '<span class="tp-tag">You are invited</span>' +
        '<h2 id="talkPopupTitle"></h2>' +
        '<dl><div><dt>When</dt><dd class="tp-when"></dd></div><div><dt>Where</dt><dd class="tp-where"></dd></div></dl>' +
        '<p class="tp-blurb"></p>' +
        '<div class="tp-actions"><a class="btn tp-cta" href="#"></a><button type="button" class="link-arrow tp-later" style="background:none;border:0;cursor:pointer">Maybe later</button></div>' +
      '</div>';
    document.body.appendChild(dlg);

    dlg.querySelector('#talkPopupTitle').textContent = config.title;
    dlg.querySelector('.tp-when').textContent = config.when;
    dlg.querySelector('.tp-where').textContent = config.where;
    dlg.querySelector('.tp-blurb').textContent = config.blurb;
    const cta = dlg.querySelector('.tp-cta');
    cta.textContent = config.cta;
    cta.href = config.ctaHref;

    const close = () => dlg.close();
    dlg.querySelector('.tp-close').addEventListener('click', close);
    dlg.querySelector('.tp-later').addEventListener('click', close);
    cta.addEventListener('click', close);
    dlg.addEventListener('click', e => { if (e.target === dlg) close(); });
    return dlg;
  }

  function start() {
    setTimeout(function () {
      if (document.querySelector('dialog[open]')) return;
      const dlg = build();
      if (typeof dlg.showModal === 'function') dlg.showModal();
    }, config.delayMs);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start);
  else start();
})();
