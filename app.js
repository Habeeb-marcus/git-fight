// pages
const splashPage = document.getElementById("splash-page");
const playerPage1 = document.getElementById("player-page1");
const playerPage2 = document.getElementById("player-page2");
const playerOneInput = document.getElementById("player-one");
const playerTwoInput = document.getElementById("player-two");
const player = document.querySelector(".user");
const detailsCont = document.querySelector(".details-cont");
const resultPage = document.querySelector(".result-page");
const btnOne = document.querySelector(".one");
const players = document.querySelectorAll(".user");
const formOne = document.querySelector(".form-one");
const formTwo = document.querySelector(".form-two");
const detailsOne = document.querySelector(".details-one");
const initiate = document.querySelector(".init-btn ");
const reset = document.querySelector(".reset-btn ");


console.log(playerOneInput);
console.log(detailsOne);
console.log(players);
let users = [];
let user = "";
let error = "";
players.forEach((player) => {
  player.value = ''
  player.addEventListener("change", () => {
    user = player.value;
    console.log(user);
  });
});

// const url = `https://api.github.com/users/${user}`;

const getPlayer = async () => {
  try {
    const response = await fetch(`https://api.github.com/users/${user}`);
    const data = await response.json();
    console.log(data);
    if (data.message !== "Not Found") {
      users.push(data);
      localStorage.setItem("myItems", JSON.stringify(users));
    }
    console.log(users);
    return data;
  } catch (err) {
    // error = err
    console.log(err);
    return err;
  }
};

// splash screen
const btnStart = document.getElementById("btn-start");




// player details page avatar_url, name, following, public_repos, followers, login
function playersDetailPage() {
  const image1 = document.querySelector(".details-one .ul li img");
  const name1 = document.querySelector(".details-one .ul .name");
  const username1 = document.querySelector(".details-one .ul .username");
  const follower1 = document.querySelector(".details-one .ul .follower");
  const following1 = document.querySelector(".details-one .ul .following");
  const repo1 = document.querySelector(".details-one .ul .repo");

  const image2 = document.querySelector(".details-two .ul li img");
  const name2 = document.querySelector(".details-two .ul .name");
  const username2 = document.querySelector(".details-two .ul .username");
  const follower2 = document.querySelector(".details-two .ul .follower");
  const following2 = document.querySelector(".details-two .ul .following");
  const repo2 = document.querySelector(".details-two .ul .repo");



  image1.setAttribute("src", users[0].avatar_url);
  name1.innerHTML = `Name: ${users[0].login}`;
  username1.innerHTML = `Username: ${users[0].name}`;
  follower1.innerHTML = `follower: ${users[0].followers}`;
  following1.innerHTML = `following: ${users[0].following}`;
  repo1.innerHTML = `Public repo: ${users[0].public_repos}`;

  image2.setAttribute("src", users[1].avatar_url);
  name2.innerHTML = `Name: ${users[1].login}`;
  username2.innerHTML = `Username: ${users[1].name}`;
  follower2.innerHTML = `follower: ${users[1].followers}`;
  following2.innerHTML = `following: ${users[1].following}`;
  repo2.innerHTML = `Public repo: ${users[1].public_repos}`;
  console.log(users[0].avatar_url);

}




//  Each “Follower" represents a point, Each “Following”
// represents a point, each “Repository” represents half point.




// function to show player one page
const showPlayerOne = () => {
  return (
    (splashPage.style.display = "none"),
    playerPage1.classList.remove("hidden"),
    (playerPage1.style.display = "flex")
    // (playerOneInput.value = "")
  );
};


//function that will display player two page
const submitPlayerOne = async (e) => {
  e.preventDefault();
  let result = await getPlayer();
  if (result.message !== "Not Found") {
    return (
      (playerPage1.style.display = "none"),
      playerPage2.classList.remove("hidden"),
      (playerPage2.style.display = "flex")
      // (playerTwoInput.value = "")
    );
  } else {
    document.querySelector(".err-message").innerHTML = "User not found";
  }
};

const submitPlayerTwo = async (e) => {
  e.preventDefault();
  let result = await getPlayer();
  if (result.message !== "Not Found") {
    (playerPage2.style.display = "none"),
      detailsCont.classList.remove("hidden");
    playersDetailPage();
  } else {
    return (document.querySelector(".err-message1").innerHTML =
      "User not found");
  }
};


const resetPlayer =  () =>{
 users = []
 detailsCont.classList.add("hidden");
 showPlayerOne();
}

// display result 
function displayResult() {
let total1 = 0;
let total2 = 0;

const winner = document.querySelector(".winner .ul");
const loser = document.querySelector(".loser .ul");
const winnerScore = document.querySelector(".winner .ul .score");
const loserScore = document.querySelector(".loser .ul .score");
const player1Score = document.querySelector(".details-one .ul");
const player2Score = document.querySelector(".details-two .ul");


const player1Follower = users[0].followers;
const player1Following = users[0].following;
const player1Repo = users[0].public_repos/2

total1 = player1Follower + player1Following + player1Repo;

const player2Follower = users[1].followers;
const player2Following = users[1].following;
const player2Repo = users[1].public_repos/2

total2 = player2Follower + player2Following + player2Repo;

if(total1 > total2 ) {


winnerScore.innerHTML = `Score: ${total1}`;
loserScore.innerHTML = `Score: ${total2}`;

winner.appendChild(player1Score);
loser.appendChild(player2Score);

} else {

  winnerScore.innerHTML = `Score: ${total2}`;
  loserScore.innerHTML = `Score: ${total1}`;

  winner.appendChild(player2Score);
  loser.appendChild(player1Score);
}

}




// show Result page 
function showResultPage() {
  detailsCont.classList.add("hidden");
  resultPage.classList.remove("hidden");
  displayResult();

}


console.log(users);

// EventListener
btnStart.addEventListener("click", showPlayerOne);
formOne.addEventListener("submit", submitPlayerOne);
formTwo.addEventListener("submit", submitPlayerTwo);
initiate.addEventListener("click", showResultPage);
reset.addEventListener("click", resetPlayer);


