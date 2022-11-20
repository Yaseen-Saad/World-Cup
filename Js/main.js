let cont = document.querySelector(".container");
let logo = document.querySelector("nav img");
function logoSize() {}
onresize = () => {
  logo.style.left =
    +(getComputedStyle(cont).margin.split(" ")[1] == undefined
      ? 0
      : getComputedStyle(cont).margin.split(" ")[1].split("px")[0]) +
    +getComputedStyle(cont).padding.split(" ")[1].split("px")[0] -
    50 +
    "px";
};

onload = () => {
  logo.style.left =
    +(getComputedStyle(cont).margin.split(" ")[1] == undefined
      ? 0
      : getComputedStyle(cont).margin.split(" ")[1].split("px")[0]) +
    +getComputedStyle(cont).padding.split(" ")[1].split("px")[0] -
    50 +
    "px";
};
async function fetchMatch() {
  let data = await fetch("./Json/data.json"),
    response = await data.json(),
    groupsdiv = document.querySelector("section#groupss .container"),
    matchesdiv = document.querySelector("section#matches.container"),
    groups = [],
    groupA = ["groupA"],
    groupB = ["groupB"],
    groupC = ["groupC"],
    groupD = ["groupD"],
    groupE = ["groupE"],
    groupF = ["groupF"],
    groupG = ["groupG"],
    groupH = ["groupH"];
  groups = [groupA, groupB, groupC, groupD, groupE, groupF, groupG, groupH];
  for (const match of response) {
    match.Group == "Group A" ? groupA.push(match.MatchNumber) : null;
    match.Group == "Group B" ? groupB.push(match.MatchNumber) : null;
    match.Group == "Group C" ? groupC.push(match.MatchNumber) : null;
    match.Group == "Group D" ? groupD.push(match.MatchNumber) : null;
    match.Group == "Group E" ? groupE.push(match.MatchNumber) : null;
    match.Group == "Group F" ? groupF.push(match.MatchNumber) : null;
    match.Group == "Group G" ? groupG.push(match.MatchNumber) : null;
    match.Group == "Group H" ? groupH.push(match.MatchNumber) : null;
    let matchArt = document.createElement("article");
    let timeAr = new Date(match.DateUtc).toLocaleDateString("ar-eg", {
      weekday: "long",
      year: "numeric",
      month: "short",
      day: "numeric",
      hour12: true,
      hour: "numeric",
    });
    let timeEn = new Date(match.DateUtc).toLocaleDateString("en-us", {
      weekday: "long",
      year: "numeric",
      month: "short",
      day: "numeric",
      hour12: true,
      hour: "numeric",
    });

    matchArt.innerHTML = ` <span >${match.Group}</span> 
    <div><div class="img" style="background-image:url(${match.flag[0]})"></div>
  <p>${match.HomeTeam}</p></div>
  <p>${timeAr} <br> ${timeEn}</p>
     <div><div class="img" style="background-image:url(${match.flag[1]})"></div>
  <p>${match.AwayTeam}</p></div>
    `;
    matchesdiv.append(matchArt);
  }
  for (const group of groups) {
    let groupdiv = document.createElement("article");
    let groupName = document.createElement("div");
    let groupTeams = document.createElement("div");
    let groupTeamsDiv = document.createElement("div");
    groupName.innerText = group[0].split("p").join("p (") + ")";
    groupTeams.innerHTML = `<span>Home team</span><span>Away Team</span>`;
    for (const match of group) {
      if (isNaN(match)) continue;
      let matchdiv = document.createElement("div");
      matchdiv.innerHTML = `
    <div>
        <div class="img" style="background-image:url(${
          response[match - 1].flag[0]
        })"></div>
         <p>${response[match - 1].HomeTeam}</p>
    </div>
    <div>
        <div class="img" style="background-image:url(${
          response[match - 1].flag[1]
        })"></div>
            <p>${response[match - 1].AwayTeam}</p>
    </div>`;
      groupTeamsDiv.append(matchdiv);
    }

    groupdiv.append(groupName);
    groupdiv.append(groupTeams);
    groupdiv.append(groupTeamsDiv);
    groupsdiv.append(groupdiv);
  }

  console.log(response);
}
fetchMatch();
