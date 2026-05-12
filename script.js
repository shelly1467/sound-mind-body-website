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

function createVideoCard(video, isFeatured = false) {
  const videoId = video.id || "";
  const videoTitle = video.title || "Sound Mind & Body YouTube video";
  const cardClass = isFeatured ? "video-card featured-card" : "video-card";

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

featuredVideoArea.innerHTML = createVideoCard(featuredVideo, true);
videoGallery.innerHTML = moreVideos.map((video) => createVideoCard(video)).join("");
