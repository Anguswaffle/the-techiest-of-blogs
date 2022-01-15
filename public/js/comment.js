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
      document.querySelector('.comment-form').reset();
      document.location.reload();
    } else {
      alert(response.statusText);
    }
  }
}

const deleteCommentButton = async (event) => {
  event.preventDefault();

  const result = confirm('Are you sure you want to delete this comment?');

  if(result) {
    const comment_id = event.target.id;

    const response = await fetch(`/api/comments/${comment_id}`, {
      method: 'DELETE',
    });
    if(response.ok) {
      document.location.reload();
    } else {
      alert(response.statusText);
    }
  }
}

// const editCommentButton = async (event) => {
//   event.preventDefault();

//   const comment_id = event.target.id;

//   document.location.assign(`editcomment/${comment_id}`)
// }

document
  .querySelector('.comment-form')
  .addEventListener('submit', commentFormHandler);

document
  .querySelectorAll('.delete-comment')
  .forEach(button => {
    button.addEventListener('click', deleteCommentButton)
  });

