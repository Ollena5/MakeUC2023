document.addEventListener("DOMContentLoaded", function () {
// Get a reference to the file input element
const fileInput = document.getElementById("document-input");
		  
// Add an event listener to listen for file selection
fileInput.addEventListener("change", (event) => {
  // Get the selected file
  const selectedFile = event.target.files[0];

  if (selectedFile) {
    // You can perform further actions with the selected file here
    console.log("Selected file: ", selectedFile.name);

    const formData = new FormData();
    formData.append("file", selectedFile);
    fetch("/upload", {
      method: "POST",
      body: formData,
    })
      .then(response => {
        alert("File uploaded successfully!", selectedFile);
      })
      .catch(error => {
        alert("An error occurred while uploading the file.");
      });
  }
})
});