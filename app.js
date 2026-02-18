const roastForm = document.getElementById("roast-form");
const roastOutput = document.getElementById("roast-output");

const styleMap = {
  playful: {
    intros: [
      "Okay {name}, activating giggle protocol.",
      "Welcome, {name}. The clown horn has been armed.",
    ],
    burns: [
      "Your hobby of {hobby} sounds like a deleted side quest from a bargain-bin RPG.",
      "If confidence were Wi-Fi, your weakness \"{weakness}\" would still buffer in 144p.",
      "You bring the same energy as a motivational poster in a DMV waiting room.",
    ],
    closer: [
      "All love, no lawsuits. 🤖",
      "Roast complete. Please update your self-esteem drivers.",
    ],
  },
  savage: {
    intros: [
      "{name}, buckle up. Compassion.exe is temporarily unavailable.",
      "Scanning {name}... wow, even my sensors sighed.",
    ],
    burns: [
      "Your {hobby} era feels like a documentary called *When Potential Left the Group Chat*.",
      "You said your weakness is \"{weakness}\" and honestly that tracks with the rest of this chaos.",
      "If cringe were renewable energy, you'd power three countries and a theme park.",
    ],
    closer: [
      "No refunds. Emotional support sold separately.",
      "Roast delivered. Rebooting before HR arrives.",
    ],
  },
  "dad-joke": {
    intros: [
      "Hi {name}, I am legally required to make this corny.",
      "{name}, prepare for premium dad-joke turbulence.",
    ],
    burns: [
      "Your {hobby} is proof that free time can, in fact, be used irresponsibly.",
      "Your weakness \"{weakness}\" is adorable. Like a calculator trying to do improv.",
      "You're not a mess—you're a limited edition puzzle with extra pieces from another box.",
    ],
    closer: [
      "Thanks folks, I'll be here all reboot.",
      "Roast complete. Please tip your local robot.",
    ],
  },
};

function pickOne(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function renderTemplate(text, values) {
  return text.replace(/\{(\w+)\}/g, (_, key) => values[key] ?? "");
}

function createRoast({ name, hobby, weakness, style }) {
  const bank = styleMap[style] || styleMap.playful;
  const values = { name, hobby, weakness };

  const pieces = [
    renderTemplate(pickOne(bank.intros), values),
    renderTemplate(pickOne(bank.burns), values),
    renderTemplate(pickOne(bank.burns), values),
    pickOne(bank.closer),
  ];

  return pieces.join(" ");
}

function speakRoast(text) {
  if (!("speechSynthesis" in window)) {
    roastOutput.textContent += " (Voice unavailable in this browser.)";
    return;
  }

  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = 1;
  utterance.pitch = 0.95;
  utterance.volume = 1;

  const voices = window.speechSynthesis.getVoices();
  const comedianish = voices.find((voice) =>
    /english|en-/i.test(voice.lang || "")
  );
  if (comedianish) {
    utterance.voice = comedianish;
  }

  window.speechSynthesis.speak(utterance);
}

roastForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const name = document.getElementById("name").value.trim();
  const hobby = document.getElementById("hobby").value.trim();
  const weakness = document.getElementById("weakness").value.trim();
  const style = document.getElementById("style").value;
  const delivery = document.getElementById("delivery").value;

  const roast = createRoast({ name, hobby, weakness, style });
  roastOutput.textContent = roast;

  if (delivery === "voice") {
    speakRoast(roast);
  }
});
