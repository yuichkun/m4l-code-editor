document.addEventListener('DOMContentLoaded', () => {
  const editor = document.getElementById('editor');
  editor.onchange = e => {
    alert(e.target.value);
  };
});