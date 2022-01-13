const commentFormHandler = async (event) => {
  event.preventDefault();

  const content = document.querySelector('#comment-post').value.trim();
  const post_id = window.location.toString().split('/').at(-1);

  if (content) {
    const response = await fetch('/api/comments', {
      method: 'POST',
      body: JSON.stringify({ content, post_id }),
      headers: { 'Content-Type': 'application/json' },
    });
    if (response.ok) {
      // document.querySelector('.comment-form').reset();
      document.querySelector('.comment-form').reset();
      document.location.reload();
    } else {
      alert(response.statusText);
    }
  }
}

document
  .querySelector('.comment-form')
  .addEventListener('submit', commentFormHandler);