const toggleModeButton = document.getElementById('toggle-mode');
const body = document.body;

toggleModeButton.addEventListener('click', () => {
  body.classList.toggle('dark-mode');
});
