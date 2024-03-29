const postFormHandler = async (event) => {
  event.preventDefault();

  const title = document.querySelector('#post-title').value.trim();
  const content = document.querySelector('#post-content').value.trim();

  const post_id = window.location.toString().split('/').at(-1);

  const response = await fetch(`/api/posts/${post_id}`, {
    method: 'PUT',
    body: JSON.stringify({ title, content }),
    headers: { 'Content-Type': 'application/json' },
  });
  if(response.ok) {
    document.location.replace('/dashboard')
  } else {
    alert(response.statusText);
  }
}

document
  .querySelector('.edit-post')
  .addEventListener('submit', postFormHandler);