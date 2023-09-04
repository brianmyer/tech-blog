const newCommentHandler = async (event) => {
    event.preventDefault();
  

    const text = document.querySelector('#comment-text').value;
  
    if (text) {
        const fullURL = window.location.href;
        const urlParts = fullURL.split('/');
        const lastParameter = urlParts[urlParts.length - 1];
      const response = await fetch(`/api/comments/${lastParameter}`, {
        method: 'POST',
        body: JSON.stringify({ text }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        document.location.replace(`/api/blogPosts/${lastParameter}`);
      } else {
        alert('Failed to create comment');
      }
    }
  };

  document
  .querySelector('.new-comment-form')
  .addEventListener('submit', newCommentHandler);