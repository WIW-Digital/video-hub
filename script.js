const videoList = document.getElementById("videoList");
const searchInput = document.getElementById("searchInput");
const noResult = document.getElementById("noResult");

let allVideos = [];

fetch("videos.json")
  .then(res => res.json())
  .then(data => {
    data.sort((a, b) => b.id - a.id);
    allVideos = data;
    renderVideos(data);
  })
  .catch(err => console.error(err));

function renderVideos(videos) {
  videoList.innerHTML = "";

  if (videos.length === 0) {
    noResult.style.display = "block";
    return;
  }

  noResult.style.display = "none";

  videos.forEach(video => {
    const div = document.createElement("div");
    div.className = "video-card";
    div.innerHTML = `
      <iframe src="${video.url}" title="${video.title}" allowfullscreen></iframe>
      <div class="video-info">
        <p class="video-title">${video.title}</p>
        <p>Made by: ${video.madeby}</p>
      </div>
    `;
    videoList.appendChild(div);
  });
}

searchInput.addEventListener("input", () => {
  const keyword = searchInput.value.toLowerCase().trim();

  const filteredVideos = allVideos.filter(video =>
    video.title.toLowerCase().includes(keyword)
  );

  renderVideos(filteredVideos);
});
