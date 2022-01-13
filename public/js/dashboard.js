const newPostButton = async (event) => {
  event.preventDefault();
  document.location.replace('/newpost')
}

document
  .querySelector('#new-post')
  .addEventListener('click', newPostButton)