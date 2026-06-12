function activateLiteYouTubeEmbed(trigger) {
  const videoId = trigger.dataset.videoId || "";
  const videoTitle = trigger.dataset.videoTitle || "Sound Mind & Body YouTube video";

  if (!/^[A-Za-z0-9_-]{11}$/.test(videoId)) {
    return;
  }

  const iframe = document.createElement("iframe");
  iframe.src = `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`;
  iframe.title = videoTitle;
  iframe.loading = "lazy";
  iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
  iframe.allowFullscreen = true;
  iframe.tabIndex = -1;

  trigger.replaceWith(iframe);
  iframe.focus();
}

document.addEventListener("click", (event) => {
  const trigger = event.target.closest("[data-youtube-lite]");

  if (!trigger) {
    return;
  }

  event.preventDefault();
  activateLiteYouTubeEmbed(trigger);
});
