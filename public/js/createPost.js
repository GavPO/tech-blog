async function postFormHandler() {
    const postText = document.getElementById('post-field').value.trim();

    console.log(postText);
};

document
    .querySelector('.post-form')
    .addEventListener("submit", postFormHandler);