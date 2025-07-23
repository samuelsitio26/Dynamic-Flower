onload = () => {
  document.body.classList.remove("container");

  // Audio control
  const audio = document.getElementById("bg-audio");
  let isPlaying = false;

  // Lirik lagu (gunakan lirik yang Anda berikan)
  const lyrics = [
    "That I should've bought you flowers",
    "And held your hand",
    "Should've gave you all my hours",
    "When I had the chance",
    "Take you to every party",
    "Cause all you wanted to do was dance",
    "Now my baby's dancing",
    "But she's dancing with another man",
    "",
    "Although it hurts",
    "I'll be the first to say that I was wrong",
    "Oh, I know I'm probably much too late",
    "To try and apologize for my mistakes",
    "But I just want you to know",
    "",
    "I hope he buys you flowers",
    "I hope he holds your hand",
    "Give you all his hours",
    "When he has the chance",
    "Take you to every party",
    "Cause I remember how much you loved to dance",
    "Do all the things I should've done",
    "When I was your man",
    "Do all the things I should've done",
    "When I was your man",
  ];

  let currentLyricIndex = 0;
  let lyricsInterval;
  const lyricsDisplay = document.getElementById("lyrics-display");

  // Konfigurasi timing yang bisa disesuaikan
  const lyricsConfig = {
    displayDuration: 3500, // Durasi tampil setiap lirik (ms)
    fadeOutDuration: 500, // Durasi fade out (ms)
    wordAnimationDelay: 0.1, // Delay antar kata (detik)
    pauseBetweenLines: 1000, // Jeda untuk baris kosong (ms)
    resetDelay: 2000, // Delay sebelum restart (ms)
  };

  // Fungsi untuk menampilkan lirik dengan efek
  function showLyric(text) {
    if (!text.trim()) {
      // Jika lirik kosong, tunggu sebentar lalu lanjut
      setTimeout(() => {
        nextLyric();
      }, lyricsConfig.pauseBetweenLines);
      return;
    }

    lyricsDisplay.classList.remove("show", "fade-out");

    // Buat efek per kata
    const words = text.split(" ");
    const wordsHtml = words
      .map((word) => `<span class="lyrics-word">${word}</span>`)
      .join("");
    lyricsDisplay.innerHTML = wordsHtml;

    // Tampilkan dengan delay
    setTimeout(() => {
      lyricsDisplay.classList.add("show");
    }, 100);

    // Animasi per kata dengan delay bertahap
    const wordElements = lyricsDisplay.querySelectorAll(".lyrics-word");
    wordElements.forEach((word, index) => {
      word.style.animationDelay = `${index * lyricsConfig.wordAnimationDelay}s`;

      // Tambahkan efek hover untuk interaktivitas
      word.addEventListener("mouseenter", () => {
        word.style.transform = "scale(1.2)";
        word.style.color = "#ff6b9d";
      });

      word.addEventListener("mouseleave", () => {
        word.style.transform = "scale(1)";
        word.style.color = "#fff";
      });
    });
  }

  // Fungsi untuk lirik berikutnya
  function nextLyric() {
    if (currentLyricIndex < lyrics.length) {
      showLyric(lyrics[currentLyricIndex]);
      currentLyricIndex++;
    } else {
      // Reset ke awal dengan efek yang lebih smooth
      currentLyricIndex = 0;
      lyricsDisplay.classList.add("fade-out");
      setTimeout(() => {
        lyricsDisplay.innerHTML = "🌸 Restarting... 🌸";
        lyricsDisplay.classList.remove("fade-out");
        lyricsDisplay.classList.add("show");
        setTimeout(() => {
          nextLyric();
        }, lyricsConfig.resetDelay);
      }, lyricsConfig.fadeOutDuration);
    }
  }

  // Fungsi untuk mulai menampilkan lirik
  function startLyrics() {
    if (lyricsInterval) clearInterval(lyricsInterval);

    currentLyricIndex = 0;
    nextLyric();

    // Ganti lirik dengan timing yang bisa dikonfigurasi
    lyricsInterval = setInterval(() => {
      lyricsDisplay.classList.add("fade-out");
      setTimeout(() => {
        nextLyric();
      }, lyricsConfig.fadeOutDuration);
    }, lyricsConfig.displayDuration);
  }

  // Fungsi untuk stop lirik dengan efek yang lebih smooth
  function stopLyrics() {
    if (lyricsInterval) {
      clearInterval(lyricsInterval);
      lyricsInterval = null;
    }
    lyricsDisplay.classList.remove("show");
    lyricsDisplay.classList.add("fade-out");
    setTimeout(() => {
      lyricsDisplay.innerHTML = "🎵 Music Paused 🎵";
      lyricsDisplay.classList.remove("fade-out");
      lyricsDisplay.classList.add("show");
      setTimeout(() => {
        lyricsDisplay.classList.remove("show");
        lyricsDisplay.innerHTML = "";
      }, 1500);
    }, lyricsConfig.fadeOutDuration);
  }

  // Klik di mana saja untuk play/pause dengan status indicator
  document.addEventListener("click", () => {
    if (isPlaying) {
      audio.pause();
      stopLyrics();
      console.log("🎵 Music paused");

      // Ubah cursor untuk menunjukkan status
      document.body.style.cursor = "pointer";
    } else {
      audio.play().catch((e) => console.log("❌ Error playing audio:", e));
      startLyrics();
      console.log("🎶 Music playing");

      // Ubah cursor untuk menunjukkan status
      document.body.style.cursor = "default";

      // Tampilkan pesan selamat datang
      lyricsDisplay.innerHTML = "🌸 Click anywhere to pause 🌸";
      lyricsDisplay.classList.add("show");
      setTimeout(() => {
        lyricsDisplay.classList.remove("show");
      }, 2000);
    }
    isPlaying = !isPlaying;
  });

  // Tambahkan keyboard shortcuts
  document.addEventListener("keydown", (e) => {
    if (e.code === "Space") {
      e.preventDefault();
      document.click(); // Trigger click event
    }

    // Kontrol kecepatan lirik
    if (e.key === "ArrowUp") {
      lyricsConfig.displayDuration = Math.max(
        1000,
        lyricsConfig.displayDuration - 500
      );
      console.log(`⏫ Speed up: ${lyricsConfig.displayDuration}ms`);
    }
    if (e.key === "ArrowDown") {
      lyricsConfig.displayDuration = Math.min(
        8000,
        lyricsConfig.displayDuration + 500
      );
      console.log(`⏬ Speed down: ${lyricsConfig.displayDuration}ms`);
    }
  });
};
