const toggleBtn = document.querySelector(".toggle-btn");
const menuContainerEl = document.querySelector(".menu-container");
const closeBtn = document.querySelector(".close-btn");

toggleBtn.addEventListener("click", function () {
  menuContainerEl.classList.toggle("open");
});

closeBtn.addEventListener("click", function () {
  menuContainerEl.classList.remove("open");
});
