const videos = [
  {
    title: "Featured Affirmation Video",
    id: "YOUR_VIDEO_ID"
  },
  {
    title: "Affirmation Video 2",
    id: "YOUR_VIDEO_ID"
  },
  {
    title: "Affirmation Video 3",
    id: "YOUR_VIDEO_ID"
  }
];

function createVideo(video) {
  return 
    <div class="video-card">
      <iframe
        src="https://www.youtube.com/embed/"
        title=""
        frameborder="0"
        allowfullscreen>
      </iframe>
      <h3></h3>
    </div>
  ;
}

document.getElementById("featured-video").innerHTML = createVideo(videos[0]);
document.getElementById("video-gallery").innerHTML = videos.slice(1).map(createVideo).join("");
