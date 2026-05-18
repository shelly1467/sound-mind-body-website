(() => {
  const listenButton = document.getElementById("listen-affirmation");
  const affirmationMessage = document.getElementById("affirmation-message");
  const generateAnotherButton = document.getElementById("generate-another");
  let currentAudio = null;
  let currentAudioUrl = "";

  const readyText = "Listen to This Affirmation";
  const loadingText = "Creating Audio…";
  const playingText = "Playing…";

  function resetButton() {
    if (listenButton) {
      listenButton.textContent = readyText;
      listenButton.disabled = false;
    }
  }

  function stopAudio() {
    if (currentAudio) {
      currentAudio.pause();
      currentAudio.currentTime = 0;
      currentAudio = null;
    }

    if (currentAudioUrl) {
      URL.revokeObjectURL(currentAudioUrl);
      currentAudioUrl = "";
    }

    resetButton();
  }

  function useBrowserSpeechFallback(text) {
    if (!("speechSynthesis" in window)) {
      resetButton();
      return;
    }

    window.speechSynthesis.cancel();
    listenButton.textContent = "Speaking…";

    const speech = new SpeechSynthesisUtterance(text);
    speech.addEventListener("end", resetButton);
    speech.addEventListener("error", resetButton);
    window.speechSynthesis.speak(speech);
  }

  async function playElevenLabsAffirmation(event) {
    event.preventDefault();
    event.stopImmediatePropagation();

    if (!listenButton || !affirmationMessage) {
      return;
    }

    const text = affirmationMessage.textContent.trim();

    if (!text) {
      return;
    }

    stopAudio();
    window.speechSynthesis?.cancel();
    listenButton.disabled = true;
    listenButton.textContent = loadingText;

    try {
      const response = await fetch("/.netlify/functions/elevenlabs-tts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ text })
      });

      if (!response.ok) {
        throw new Error("ElevenLabs function failed.");
      }

      const audioBlob = await response.blob();
      currentAudioUrl = URL.createObjectURL(audioBlob);
      currentAudio = new Audio(currentAudioUrl);

      listenButton.textContent = playingText;
      listenButton.disabled = false;
      currentAudio.addEventListener("ended", stopAudio);
      currentAudio.addEventListener("error", () => useBrowserSpeechFallback(text));
      await currentAudio.play();
    } catch (error) {
      useBrowserSpeechFallback(text);
    }
  }

  if (listenButton) {
    listenButton.addEventListener("click", playElevenLabsAffirmation, true);
  }

  if (generateAnotherButton) {
    generateAnotherButton.addEventListener("click", stopAudio, true);
  }
})();
