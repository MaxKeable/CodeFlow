const newCodeSnippetHandler = async (event) => {
    event.preventDefault();
  
    const name = document.querySelector('#codeSnippet-name').value.trim();
    const description = document.querySelector('#codeSnippet-desc').value.trim();

    if (name && description) {
        const response = await fetch(`/api/module`, {
          method: 'POST',
          body: JSON.stringify({ name, description }),
          headers: {
            'Content-Type': 'application/json',
          },
        });
    
        if (response.ok) {
          document.location.replace('/moduleRoutes');
        } else {
          alert('Failed to create a new code snippet');
        }
      }
    };

    document
  .querySelector('.new-codeSnippet-form')
  .addEventListener('submit', newCodeSnippetHandler);