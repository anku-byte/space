  const imgEl = document.getElementById("nasa-img");
    const storyEl = document.getElementById("story");

    async function generateStory() {
      const keyword = document.getElementById("keyword").value.trim();
      if (!keyword) {
        alert("Please enter a keyword!");
        return;
      }

      storyEl.innerText = "Generating story...";
      try {
        const res = await fetch(`https://images-api.nasa.gov/search?q=${keyword}&media_type=image`);
        const data = await res.json();
        const items = data.collection.items;

        if (items.length === 0) {
          storyEl.innerText = "No results found. Try another keyword.";
          imgEl.src = "https://via.placeholder.com/600x300?text=No+Image+Found";
          return;
        }

        const random = items[Math.floor(Math.random() * items.length)];
        const title = random.data[0].title;
        const desc = random.data[0].description || "A mysterious object in the universe.";
        const img = random.links[0].href;

        imgEl.src = img;

        const storyText = `Your journey begins with the discovery of "${title}". 
A stunning marvel hidden in the depths of space, it tells a story of cosmic wonders.

${desc}

As you travel across galaxies, you realize this is only the beginning of your space adventure.`;

        storyEl.innerText = storyText;
      } catch (e) {
        storyEl.innerText = "Unable to generate story. Please try again.";
        imgEl.src = "https://via.placeholder.com/600x300?text=NASA+Image+Unavailable";
      }
    }

    // Generate stars
    for (let i = 0; i < 100; i++) {
      let star = document.createElement("div");
      star.classList.add("star");
      star.style.top = Math.random() * window.innerHeight + "px";
      star.style.left = Math.random() * window.innerWidth + "px";
      document.body.appendChild(star);
    }

    // Shooting stars
    setInterval(() => {
      let shootingStar = document.createElement("div");
      shootingStar.classList.add("shooting-star");
      shootingStar.style.top = Math.random() * window.innerHeight/2 + "px";
      shootingStar.style.left = "0px";
      document.body.appendChild(shootingStar);
      setTimeout(() => shootingStar.remove(), 2000);
    }, 3000);