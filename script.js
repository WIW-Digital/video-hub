fetch('videos.json')
  .then(res => res.json())
  .then(data => {
    // Sort by id descending
    data.sort((a, b) => b.id - a.id);

    const container = document.getElementById('videoList');
    data.forEach(video => {
      const div = document.createElement('div');
     div.innerHTML = `
        <iframe src="${video.url}" title="${video.title}" allowfullscreen></iframe>
        <p>${video.title}</p>
        <p>Made by: ${video.madeby}</p> 
      `;
      container.appendChild(div);
    });
  })
  .catch(err => console.error(err));
