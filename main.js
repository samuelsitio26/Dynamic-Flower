onload = () => {
  document.body.classList.remove("container");

  // Audio control
  const audio = document.getElementById("bg-audio");
  let isPlaying = false;

  // Klik di mana saja untuk play/pause
  document.addEventListener("click", () => {
    if (isPlaying) {
      audio.pause();
      console.log("Music paused");
    } else {
      audio.play().catch((e) => console.log("Error playing audio:", e));
      console.log("Music playing");
    }
    isPlaying = !isPlaying;
  });
};
