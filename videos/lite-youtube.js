(function () {
  const players = document.querySelectorAll("[data-youtube-id]");

  players.forEach((player) => {
    player.addEventListener("click", () => {
      const videoId = player.dataset.youtubeId;
      const videoTitle = player.dataset.youtubeTitle || "Sound Mind & Body YouTube video";

      if (!videoId) {
        return;
      }

      const iframe = document.createElement("iframe");
      iframe.src = `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`;
      iframe.title = videoTitle;
      iframe.width = "1280";
      iframe.height = "720";
      iframe.loading = "lazy";
      iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
      iframe.allowFullscreen = true;

      player.replaceWith(iframe);
      iframe.focus();
    });
  });
})();
