/* Chatbot click hook: speaks the greeting when a visitor clicks the floating chat widget.
   Loaded by index.html (<script src=".claude/hooks/chatbot-greeting.js">) and called from initChatbot().
   Change the words or voice here; no other file needs editing. */
(function () {
  const message = 'Hello, so nice to visit us, how can I help you on the financial planning';

  function pickVoice() {
    const voices = window.speechSynthesis.getVoices();
    return voices.find(v => /en-SG/i.test(v.lang))
      || voices.find(v => /en-(GB|AU|US)/i.test(v.lang) && /female|zira|samantha|google uk english female/i.test(v.name))
      || voices.find(v => /^en/i.test(v.lang))
      || null;
  }

  function speak() {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(message);
    const voice = pickVoice();
    if (voice) u.voice = voice;
    u.lang = voice ? voice.lang : 'en-SG';
    u.rate = 0.95;
    u.pitch = 1.15;
    window.speechSynthesis.speak(u);
  }

  window.HorizonChatHook = { message, speak };
})();
