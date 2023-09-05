

const newFormHandler = async (event) => {
  event.preventDefault();

  const title = document.querySelector('#blogPost-title').value.trim();
  const text = document.querySelector('#blogPost-text').value;

  if (title && text) {
    const response = await fetch(`/api/blogPosts`, {
      method: 'POST',
      body: JSON.stringify({ title, text }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to create blog post');
    }
  }
};

const updButtonHandler = async (event) => {
  if (event.target.id === 'update') {
    const id = event.target.getAttribute('data-id');
    const response = await fetch(`/update/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log(response)
    if (response.ok) {
      document.location.replace(`/update/${id}`);
    } else {
      console.log('Failed to update blog post')
    }
  }
}

const delButtonHandler = async (event) => {
  if (event.target.id === 'delete') {
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/blogPosts/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to delete blog post');
    }
  }
};

document
  .querySelector('.new-blogPost-form')
  .addEventListener('submit', newFormHandler);

document
  .querySelector('.blogPost-list')
  .addEventListener('click', delButtonHandler);

  document
  .querySelector('.blogPost-list')
  .addEventListener('click', updButtonHandler);
