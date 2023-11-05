const dropIcon = document.getElementById('drop-icon');
const fileInput = document.getElementById('file-input');

dropIcon.addEventListener('dragover', (e) => {
  e.preventDefault();
  dropIcon.style.backgroundColor = '#eee'; // Highlight the drop area
});

dropIcon.addEventListener('dragleave', () => {
  dropIcon.style.backgroundColor = ''; // Remove the highlight when leaving the drop area
});

dropIcon.addEventListener('drop', (e) => {
  e.preventDefault();
  dropIcon.style.backgroundColor = ''; // Remove the highlight

  const files = e.dataTransfer.files; // Get the dropped files

  // Append the dropped files to the file input element
  for (let i = 0; i < files.length; i++) {
    fileInput.files.push(files[i]);
  }
});

// Listen for changes in the file input element (user selecting files via the file dialog)
fileInput.addEventListener('change', () => {
  const selectedFiles = fileInput.files;
  // Process the selected files (e.g., send them to the server)
  console.log(selectedFiles);
});
