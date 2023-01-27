const profileInfo = document.querySelector(".overview"); //div class overview
const username = "maggie-mcdonald";
const repoList = document.querySelector(".repo-list"); // ul repo list

const getData = async function () {
    const response = await fetch(`https://api.github.com/users/${username}`);
    const data = await response.json();
    displayData(data);
};

getData();

const displayData = function (data) {
   const newDiv =  document.createElement("div");
   newDiv.classList.add("user-info");
   newDiv.innerHTML = `
    <figure>
      <img alt="user avatar" src=${data.avatar_url} />
    </figure>
    <div>
      <p><strong>Name:</strong> ${data.name}</p>
      <p><strong>Bio:</strong> ${data.bio}</p>
      <p><strong>Location:</strong> ${data.location}</p>
      <p><strong>Number of public repos:</strong> ${data.public_repos}</p>
    </div> 
    `; 
    profileInfo.append(newDiv);
    fetchRepo();
};

const fetchRepo = async function () {
  const showRepo = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
  const repoData = await showRepo.json();
  displayRepos(repoData);
};

const displayRepos = function (repos) {
  for (const repo of repos) {
    const repoItem = document.createElement("li");
    repoItem.classList.add("repo");
    repoItem.innerHTML = `<h3>${repo.name}</h3>`;
    repoList.append(repoItem);
  }
};

