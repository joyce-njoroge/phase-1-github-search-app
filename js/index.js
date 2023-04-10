const form = document.querySelector('#github-form');
form.addEventListener('submit', (event) => {
  event.preventDefault(); // prevent the default form submission behavior
  const searchQuery = event.target.search.value; // get the value of the search input
  const searchUrl = `https://api.github.com/search/users?q=${searchQuery}`;
  fetch(searchUrl, {
    headers: {
      Accept: 'application/vnd.github.v3+json'
    }
  })
  .then(response => response.json())
  .then(data => {
    const userList = document.querySelector('#user-list');
    userList.innerHTML = ''; // clear the previous search results
    data.items.forEach(user => {
      const li = document.createElement('li');
      const avatar = document.createElement('img');
      avatar.src = user.avatar_url;
      avatar.alt = `${user.login} avatar`;
      const username = document.createElement('a');
      username.href = user.html_url;
      username.textContent = user.login;
      li.append(avatar, username);
      userList.append(li);
    });
  })
  .catch(error => console.error(error));
});


const userList = document.querySelector('#user-list');
userList.addEventListener('click', (event) => {
  if (event.target.tagName === 'A') {
    const username = event.target.textContent;
    const reposUrl = `https://api.github.com/users/${username}/repos`;
    fetch(reposUrl, {
      headers: {
        Accept: 'application/vnd.github.v3+json'
      }
    })
    .then(response => response.json())
    .then(data => {
      const reposList = document.querySelector('#repos-list');
      reposList.innerHTML = ''; // clear the previous user's repositories
      data.forEach(repo => {
        const li = document.createElement('li');
        const repoLink = document.createElement('a');
        repoLink.href = repo.html_url;
        repoLink.textContent = repo.name;
        li.append(repoLink);
        reposList.append(li);
      });
    })
    .catch(error => console.error(error));
  }
});
