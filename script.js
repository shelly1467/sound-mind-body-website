// Sound Mind & Body YouTube videos
// Beginner tip: Replace only the text inside each id value below.
// Example: if your YouTube link is https://www.youtube.com/watch?v=abc123XYZ,
// the video ID is abc123XYZ.
const featuredVideo = {
  title: "Featured Affirmation Video",
  id: "YOUR_FEATURED_VIDEO_ID" // Replace this with your featured YouTube video ID.
};

const moreVideos = [
  {
    title: "Affirmation Video 2",
    id: "YOUR_SECOND_VIDEO_ID" // Replace this with your second YouTube video ID.
  },
  {
    title: "Affirmation Video 3",
    id: "YOUR_THIRD_VIDEO_ID" // Replace this with your third YouTube video ID.
  }
];

function isPlaceholderId(videoId) {
  return !videoId || videoId.includes("YOUR_");
}

function createVideoCard(video, isFeatured = false) {
  const videoId = video.id || "";
  const videoTitle = video.title || "Sound Mind & Body YouTube video";
  const cardClass = isFeatured ? "video-card featured-card" : "video-card";

  if (isPlaceholderId(videoId)) {
    return `
      <article class="${cardClass}">
        <div class="video-placeholder" role="img" aria-label="YouTube placeholder for ${videoTitle}">
          <span class="play-symbol">▶</span>
          <p>${videoTitle} coming soon</p>
        </div>
        <h3>${videoTitle}</h3>
      </article>
    `;
  }

  return `
    <article class="${cardClass}">
      <div class="video-frame">
        <iframe
          src="https://www.youtube.com/embed/${videoId}"
          title="${videoTitle}"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowfullscreen>
        </iframe>
      </div>
      <h3>${videoTitle}</h3>
    </article>
  `;
}

const featuredVideoArea = document.getElementById("featured-video");
const videoGallery = document.getElementById("video-gallery");

if (featuredVideoArea) {
  featuredVideoArea.innerHTML = createVideoCard(featuredVideo, true);
}

if (videoGallery) {
  videoGallery.innerHTML = moreVideos.map((video) => createVideoCard(video)).join("");
}

// Gentle Wellness AI Generator (rotating local affirmation library)
const affirmationLibrary = {
  "Manifest Abundance": [
    "I am safe to welcome more goodness, support, and possibility into my life.",
    "My mind gently opens to abundance in simple, steady, and peaceful ways.",
    "I notice the blessings already here, and I allow new blessings to arrive.",
    "I am worthy of receiving opportunities that support my wellbeing and growth.",
    "Abundance can meet me calmly, naturally, and one step at a time."
  ],
  "Find Motivation": [
    "I can begin with one small step, and that step is enough for today.",
    "My energy returns gently as I choose what matters most right now.",
    "I do not need perfect momentum; I only need a kind beginning.",
    "I am capable of moving forward with patience, focus, and self-respect.",
    "Each small action reminds me that progress is already happening."
  ],
  "Build Confidence": [
    "I trust myself more each time I choose to show up with honesty and care.",
    "My voice, presence, and choices are allowed to take up peaceful space.",
    "I can learn as I go and still be worthy of confidence today.",
    "I carry quiet strength within me, even when I am still growing.",
    "I am becoming more comfortable believing in who I am."
  ],
  "Receive More": [
    "I allow support, kindness, and good things to reach me without resistance.",
    "Receiving can feel calm, natural, and aligned with my highest wellbeing.",
    "I am open to blessings that arrive in expected and unexpected ways.",
    "I can be grateful for what is here while welcoming what is next.",
    "My heart is learning that it is safe to receive more."
  ],
  "Silence Your Doubt": [
    "Doubt may speak softly, but my inner wisdom is steady and clear.",
    "I do not have to believe every worried thought that passes through me.",
    "I choose trust, patience, and the next gentle step over fear.",
    "My uncertainty can exist while my courage continues to grow.",
    "I return to the truth that I am capable, guided, and enough."
  ],
  "Start Your Morning": [
    "This morning, I begin gently and let peace lead my thoughts.",
    "I welcome this day with a calm body, a clear mind, and an open heart.",
    "I do not need to rush my spirit; I can move with steady intention.",
    "Today can unfold one peaceful choice at a time.",
    "I give myself permission to start fresh right where I am."
  ],
  "Motivational Quotes": [
    "A gentle step taken today can become the strength I thank myself for tomorrow.",
    "I am not behind; I am becoming at the pace my life can hold.",
    "The next right step is powerful, even when it is small.",
    "I can rise with softness and still move with strength.",
    "My progress counts, even when it is quiet."
  ],
  "Keep Going": [
    "I have made it through hard moments before, and I can keep going now.",
    "I move forward gently, trusting that small progress still matters.",
    "Even when the path feels slow, I am still becoming stronger.",
    "I can pause, breathe, and continue with renewed kindness toward myself.",
    "My steady effort is enough to carry me into the next moment."
  ],
  "Practice Gratitude": [
    "I let my heart rest on one good thing, and peace begins to grow.",
    "Gratitude helps me notice the quiet support already around me.",
    "I can honor what is unfinished while appreciating what is here.",
    "Small blessings are worthy of my attention and my thanks.",
    "As I notice goodness, my nervous system remembers safety."
  ],
  "Body Positivity": [
    "My body deserves kindness, patience, and respect in every season.",
    "I can speak to my body as a friend, not a problem to solve.",
    "This body carries me through life, and I choose to honor it gently.",
    "I am allowed to feel at home in my body one breath at a time.",
    "My worth is whole, steady, and never dependent on appearance."
  ],
  "Courage": [
    "Courage can be quiet; it can look like one honest step forward.",
    "I am brave enough to begin before I feel completely ready.",
    "My heart can feel tender and still choose strength.",
    "I trust the courage that rises when I meet this moment with care.",
    "I can do meaningful things gently, steadily, and in my own way."
  ],
  "Success": [
    "Success is allowed to feel peaceful, aligned, and true to who I am.",
    "I grow through consistent care, clear intention, and patient action.",
    "My success can unfold without force, comparison, or self-abandonment.",
    "I am building a life that honors both my dreams and my wellbeing.",
    "Every wise step I take is part of my success story."
  ],
  "Happiness": [
    "I welcome small moments of joy and let them be enough for now.",
    "Happiness can find me in simple breaths, soft thoughts, and gentle pauses.",
    "I am allowed to enjoy this moment without needing everything to be perfect.",
    "My heart knows how to return to light, even after heavy days.",
    "I make room for peace, laughter, and quiet delight today."
  ],
  "Worry": [
    "I can breathe slowly and let my body know this moment is manageable.",
    "Worry is a signal, not a command; I can respond with gentleness.",
    "I release the need to solve everything all at once.",
    "My nervous system can soften as I return to the present moment.",
    "I am safe to take one calming breath and choose the next kind step."
  ],
  "Relationships": [
    "I am worthy of relationships rooted in kindness, honesty, and mutual care.",
    "I can give love with an open heart while honoring my own needs.",
    "Healthy connection begins with gentleness toward myself and others.",
    "I allow communication, compassion, and understanding to grow at a safe pace.",
    "Love can feel steady, respectful, and peaceful in my life."
  ],
  "Health": [
    "I support my health with small choices that honor my mind and body.",
    "My body is worthy of care, rest, nourishment, and patience today.",
    "Healing can happen gently, one supportive choice at a time.",
    "I listen to my body with compassion and respond with kindness.",
    "I am allowed to care for myself without pressure or perfection."
  ]
};

const supportiveSentences = [
  "Take a slow breath and let this message settle gently.",
  "Let this be a soft reminder that you are supported right now.",
  "You can return to this thought whenever your spirit needs steadiness.",
  "Read it once more slowly, as if you are speaking to a dear friend.",
  "Let your next step be simple, kind, and enough."
];

const topicGrid = document.querySelector("[data-affirmation-topics]");
const affirmationResult = document.getElementById("affirmation-result");
const affirmationTopic = document.getElementById("affirmation-topic");
const affirmationMessage = document.getElementById("affirmation-message");
const affirmationSupport = document.getElementById("affirmation-support");
const listenAffirmationButton = document.getElementById("listen-affirmation");
const affirmationAudioStatus = document.getElementById("affirmation-audio-status");
const affirmationAudioPlayer = document.getElementById("affirmation-audio-player");
const generateAnotherButton = document.getElementById("generate-another");
const lastAffirmationIndexes = {};
let selectedTopic = "";
let currentAffirmationAudioUrl = "";
let currentAffirmationAudioText = "";

function getNextAffirmation(topic) {
  const messages = affirmationLibrary[topic] || [];

  if (!messages.length) {
    return "I am allowed to pause, breathe, and meet myself with kindness.";
  }

  let nextIndex = Math.floor(Math.random() * messages.length);

  if (messages.length > 1) {
    while (nextIndex === lastAffirmationIndexes[topic]) {
      nextIndex = Math.floor(Math.random() * messages.length);
    }
  }

  lastAffirmationIndexes[topic] = nextIndex;
  return messages[nextIndex];
}

function getSupportiveSentence() {
  return supportiveSentences[Math.floor(Math.random() * supportiveSentences.length)];
}

function setAffirmationAudioStatus(message = "") {
  if (affirmationAudioStatus) {
    affirmationAudioStatus.textContent = message;
  }
}

function resetAffirmationAudio() {
  if (affirmationAudioPlayer) {
    affirmationAudioPlayer.pause();
    affirmationAudioPlayer.removeAttribute("src");
    affirmationAudioPlayer.load();
  }

  if (currentAffirmationAudioUrl) {
    URL.revokeObjectURL(currentAffirmationAudioUrl);
  }

  currentAffirmationAudioUrl = "";
  currentAffirmationAudioText = "";

  if (listenAffirmationButton) {
    listenAffirmationButton.disabled = false;
    listenAffirmationButton.classList.remove("is-playing");
    listenAffirmationButton.textContent = "Listen to This Affirmation";
  }

  setAffirmationAudioStatus("");
}

function getAffirmationAudioText() {
  const topic = affirmationTopic ? affirmationTopic.textContent.trim() : "";
  const message = affirmationMessage ? affirmationMessage.textContent.trim() : "";

  return [topic, message].filter(Boolean).join(". ");
}

async function generateAffirmationAudio(text) {
  const response = await fetch("/api/elevenlabs-tts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ text })
  });

  if (!response.ok) {
    let errorMessage = "Audio is unavailable right now. Please try again soon.";

    try {
      const errorData = await response.json();
      if (errorData && errorData.error) {
        errorMessage = errorData.error;
      }
    } catch (error) {
      // Keep the calm default message when the response is not JSON.
    }

    throw new Error(errorMessage);
  }

  return response.blob();
}

async function playAffirmationAudio() {
  if (!affirmationAudioPlayer || !listenAffirmationButton) {
    return;
  }

  if (!affirmationAudioPlayer.paused) {
    affirmationAudioPlayer.pause();
    return;
  }

  const audioText = getAffirmationAudioText();

  if (!audioText) {
    setAffirmationAudioStatus("Choose a topic first, then listen to your affirmation.");
    return;
  }

  if (!currentAffirmationAudioUrl || currentAffirmationAudioText !== audioText) {
    listenAffirmationButton.disabled = true;
    listenAffirmationButton.textContent = "Creating your audio...";
    setAffirmationAudioStatus("Preparing a calm voice reading with ElevenLabs.");

    try {
      const audioBlob = await generateAffirmationAudio(audioText);

      if (currentAffirmationAudioUrl) {
        URL.revokeObjectURL(currentAffirmationAudioUrl);
      }

      currentAffirmationAudioUrl = URL.createObjectURL(audioBlob);
      currentAffirmationAudioText = audioText;
      affirmationAudioPlayer.src = currentAffirmationAudioUrl;
    } catch (error) {
      listenAffirmationButton.textContent = "Listen to This Affirmation";
      setAffirmationAudioStatus(error.message);
      return;
    } finally {
      listenAffirmationButton.disabled = false;
    }
  }

  try {
    await affirmationAudioPlayer.play();
  } catch (error) {
    setAffirmationAudioStatus("Please tap the button again to start the audio.");
  }
}

function showAffirmation(topic, shouldScroll = true) {
  selectedTopic = topic;
  affirmationTopic.textContent = topic;
  affirmationMessage.textContent = getNextAffirmation(topic);
  affirmationSupport.textContent = getSupportiveSentence();
  resetAffirmationAudio();
  affirmationResult.hidden = false;

  document.querySelectorAll(".topic-card.is-selected").forEach((card) => {
    card.classList.remove("is-selected");
  });

  const selectedCard = Array.from(document.querySelectorAll(".topic-card")).find((card) => {
    const label = card.querySelector(".topic-label");
    return label && label.textContent.trim() === topic;
  });

  if (selectedCard) {
    selectedCard.classList.add("is-selected");
  }

  if (shouldScroll) {
    affirmationResult.scrollIntoView({ behavior: "smooth", block: "center" });
  }
}

if (topicGrid && affirmationResult) {
  topicGrid.addEventListener("click", (event) => {
    const topicCard = event.target.closest(".topic-card");

    if (!topicCard) {
      return;
    }

    event.preventDefault();
    const topicLabel = topicCard.querySelector(".topic-label");

    if (topicLabel) {
      showAffirmation(topicLabel.textContent.trim());
    }
  });
}

if (generateAnotherButton) {
  generateAnotherButton.addEventListener("click", () => {
    if (selectedTopic) {
      showAffirmation(selectedTopic, false);
    }
  });
}

if (listenAffirmationButton) {
  listenAffirmationButton.addEventListener("click", playAffirmationAudio);
}

if (affirmationAudioPlayer && listenAffirmationButton) {
  affirmationAudioPlayer.addEventListener("play", () => {
    listenAffirmationButton.classList.add("is-playing");
    listenAffirmationButton.textContent = "Pause Affirmation";
    setAffirmationAudioStatus("Playing your affirmation.");
  });

  affirmationAudioPlayer.addEventListener("pause", () => {
    listenAffirmationButton.classList.remove("is-playing");
    listenAffirmationButton.textContent = "Play Affirmation";
    setAffirmationAudioStatus("Audio paused.");
  });

  affirmationAudioPlayer.addEventListener("ended", () => {
    listenAffirmationButton.classList.remove("is-playing");
    listenAffirmationButton.textContent = "Listen Again";
    setAffirmationAudioStatus("Your affirmation audio has ended.");
  });
}
