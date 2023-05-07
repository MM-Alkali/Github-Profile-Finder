const githubData = {
  token: "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",
  username: "Aksheg",
};

const body = {
  query: `
  query {
    viewer {
      name
      bio
      avatarUrl
      company
      location
      email
      url
      followers {
        totalCount
      }
      following {
        totalCount
      }
      repositories(first: 10, orderBy: {field: PUSHED_AT, direction: DESC}) {
        totalCount
        nodes {
          name
          description
          updatedAt
          url
          primaryLanguage {
            name
          }
        }
      }
      contributionsCollection {
        totalCommitContributions
        totalPullRequestContributions
        totalRepositoriesWithContributedCommits
        totalRepositoriesWithContributedPullRequests
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              contributionCount
            }
          }
        }
      }
      organizations(first: 10) {
        nodes {
          name
          url
        }
      }
    }
  }
      `,
};

const baseUrl = "https://api.github.com/graphql";

const headers = {
  "Content-Type": "application/json",
  Authorization: "Bearer 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",
};
const avatar = document.getElementById("small");
const profileImage = document.getElementById("avatar");
const fullName = document.querySelector(".name");
const userName = document.querySelector(".nickname");
const bio = document.querySelector(".bio");
const noOfFollowers = document.querySelector(".followers");
const noOfFollowing = document.querySelector(".following");
const displayTime = document.querySelector(".time");
const totalNoOfRepos = document.querySelector(".repo-count");
const allRepos = document.querySelector(".repos");

fetch(baseUrl, {
  method: "POST",
  headers: headers,
  body: JSON.stringify(body),
})
  .then((response) => response.json())
  .then((data) => {
    console.log(data, "here");
    const avatarUrl = data.data.viewer.avatarUrl;
    profileImage.src = avatarUrl;
    avatar.src = avatarUrl;
    fullName.innerHTML = data.data.viewer.name;
    const urlArr = data.data.viewer.url.split("/");
    userName.innerHTML = urlArr[3];
    bio.innerHTML = data.data.viewer.bio;
    noOfFollowers.innerHTML = data.data.viewer.followers.totalCount;
    noOfFollowing.innerHTML = " . " + data.data.viewer.following.totalCount;
    var date = new Date();
    var options = { hour12: false };
    const timeDisplay = date
      .toLocaleString("en-US", options)
      .split(",")[1]
      .slice(0, 6);
    displayTime.innerHTML = timeDisplay;
    totalNoOfRepos.innerHTML = data.data.viewer.repositories.totalCount;
    const repoArr = data.data.viewer.repositories.nodes;
    repoArr.map((repo) => {
      const repoDiv = document.createElement("div");
      const repoName = document.createElement("a");
      repoName.href =repo.url
      const repoDesc = document.createElement("span");
      const repoPriLang = document.createElement("span");
      const repoUpdatedAt = document.createElement("span");
      repoName.textContent = repo.name;
      repoDesc.textContent = repo.description;
      // repoPriLang.textContent = repo.primaryLanguage.name;
      const dateString = repo.updatedAt;
      const date = new Date(dateString);
      const formattedDate = date.toLocaleString("en-us", {
        month: "short",
        day: "numeric",
      });
      repoUpdatedAt.textContent = "Updated on " + formattedDate;
      repoDiv.classList.add("repo");
      repoName.classList.add("repo-name");
      repoDesc.classList.add("repo-desc");
      // repoPriLang.classList.add("repo-primary-language");
      repoUpdatedAt.classList.add("repo-updated-at");
      repoDiv.appendChild(repoName);
      repoDiv.appendChild(repoDesc);
      // repoDiv.appendChild(repoPriLang);
      repoDiv.appendChild(repoUpdatedAt);
      allRepos.appendChild(repoDiv);
    });
  })
  .catch((err) => console.error(err));
