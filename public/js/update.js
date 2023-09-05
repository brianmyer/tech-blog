const updFormHandler = async (event) => {
    event.preventDefault();
  
    const title = document.querySelector('#blogPost-title').value.trim();
    const text = document.querySelector('#blogPost-text').value;
    if (title && text) {
      const fullURL = window.location.href;
        const urlParts = fullURL.split('/');
        const lastParameter = urlParts[urlParts.length - 1];
  
      const response = await fetch(`/api/blogPosts/${lastParameter}`, {
        method: 'PUT',
        body: JSON.stringify({ title, text }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        document.location.replace(`/api/blogPosts/${lastParameter}`);
      } else {
        console.log('Failed to update blog post');
      }
    }
  };
  
  document
  .querySelector('.new-blogPost-form')
  .addEventListener('submit', updFormHandler);