import {OpenAI} from 'openai';
const apiKey = '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';
const openai = new OpenAI({ apiKey, dangerouslyAllowBrowser: true });

export default function index(apiKey,openai){
new OpenAI({ apiKey, dangerouslyAllowBrowser: true });

document.addEventListener("DOMContentLoaded", function () {
  const fileInput = document.getElementById("document-input");
  
  fileInput.addEventListener("change", (event) => {
    const selectedFile = event.target.files[0];
  
    if (selectedFile) {
      console.log("Selected file: ", selectedFile.name);
  
      const formData = new FormData();
      formData.append("file", selectedFile);
  
      // Now, you can use the OpenAI API to answer questions based on the document.
      // const apiKey = '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';
      const client = new OpenAI({ apiKey });
      const question = 'What is the document about?'; // Your question here
  
      client.completions.create({
        prompt: `Document: ${selectedFile.name}\nQuestion: ${question}\nAnswer:`,
        max_tokens: 50, // Adjust this as needed
      })
        .then(response => {
        alert("File uploaded successfully!", selectedFile);
          const answer = response.choices[0].text;
          console.log('Answer:', answer);
        })
        .catch(error => {
            alert("An error occurred while uploading the file.");
        });
  
        
    }
  });
});
}

index(apiKey, openai);