const newPostButton = async (event) => {
  event.preventDefault();
  document.location.replace('/newpost')
}

const deletePostButton = async (event) => {
  event.preventDefault();
  const post_id = event.target.id

  const response = await fetch(`/api/posts/${post_id}`, {
    method: 'DELETE',
  });
  if(response.ok) {
    document.location.reload();
  } else {
    alert(response.statusText);
  }
}

const editPostButton = async (event) => {
  event.preventDefault();

  console.log(event.target.id);
}

document
  .querySelector('#new-post')
  .addEventListener('click', newPostButton);

document
  .querySelectorAll('.btn-danger')
  .forEach(button => button.addEventListener('click', deletePostButton));

document
  .querySelectorAll('.btn-light')
  .forEach(button => button.addEventListener('click', editPostButton));