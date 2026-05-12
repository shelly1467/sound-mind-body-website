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

const featuredVideo = document.querySelector("#featured-video");
const videoGallery = document.querySelector("#video-gallery");

if (featuredVideo) {
  featuredVideo.innerHTML = createVideo(videos[0]);
}

if (videoGallery) {
  videoGallery.innerHTML = videos.slice(1).map(createVideo).join("");
}
