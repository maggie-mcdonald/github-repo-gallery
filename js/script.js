const profileInfo = document.querySelector(".overview"); //div class overview
const username = "maggie-mcdonald";
const repoList = document.querySelector(".repo-list"); // ul repo list
const repoClass = document.querySelector(".repos"); //the class where all the repos appear
const repoData = document.querySelector(".repo-data"); //the class of repoData currently hidden
const backToRepoButton = document.querySelector(".view-repos");
const filterInput = document.querySelector(".filter-repos");

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
  filterInput.classList.remove("hide");
};

repoList.addEventListener("click", function (e) {
  if (e.target.matches("h3")) {
    const repoName = e.target.innerText;
    getRepoInfo(repoName);
  }
  });

  const getRepoInfo = async function (repoName) {
    const fetchInfo = await fetch (`https://api.github.com/repos/${username}/${repoName}`);
    const repoInfo = await fetchInfo.json();
    console.log(repoInfo);

    const fetchLanguages = await fetch(repoInfo.languages_url);
    const languageData = await fetchLanguages.json();

    languages = [];
    for (language in languageData) {
      languages.push(language);
    }

    displayRepoInfo(repoInfo, languages);
  };

  const displayRepoInfo = function (repoInfo, languages) {
    backToRepoButton.classList.remove("hide");
    repoData.innerHTML = "";
    repoData.classList.remove("hide");
    repoClass.classList.add("hide");
    const div =  document.createElement("div");
    div.innerHTML = `
      <h3>Name: ${repoInfo.name}</h3>
        <p>Description: ${repoInfo.description}</p>
        <p>Default Branch: ${repoInfo.default_branch}</p>
        <p>Languages: ${languages.join(", ")}</p>
        <a class="visit" href="${repoInfo.html_url}" target="_blank" rel="noreferrer noopener">View Repo on GitHub!</a> 
      `;
     repoData.append(div);    
 };

 backToRepoButton.addEventListener("click" , function() {
  repoClass.classList.remove("hide");
  repoData.classList.add("hide");
  backToRepoButton.classList.add("hide");
 });

 filterInput.addEventListener("input" , function (e) {
  const searchText = e.target.value;
  const repos = document.querySelectorAll(".repo");
  const searchLowerText = searchText.toLowerCase();

  for (const repo of repos) {
      const repoLowerText = repo.innerText.toLowerCase();
    if (repoLowerText.includes(searchLowerText)) {
      repo.classList.remove("hide");
    } else {
      repo.classList.add("hide");
    }
  }
 });