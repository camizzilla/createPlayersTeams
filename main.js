const players = [
  {
    id: 0,
    name: "Rove",
    skill: 2,
    roles: [5],
    isSelected: true,
  },
  {
    id: 1,
    name: "Bedi",
    skill: 4,
    roles: [5, 4],
    isSelected: true,
  },
  {
    id: 2,
    name: "Fede",
    skill: 5,
    roles: [5, 4, 3],
    isSelected: true,
  },
  {
    id: 3,
    name: "Ish",
    skill: 3,
    roles: [5, 4],
    isSelected: true,
  },
  {
    id: 4,
    name: "Bongio",
    skill: 3,
    roles: [5, 4],
    isSelected: true,
  },
  {
    id: 5,
    name: "Zani",
    skill: 4,
    roles: [5, 4, 3],
    isSelected: true,
  },
  {
    id: 6,
    name: "Alex",
    skill: 4,
    roles: [5],
    isSelected: true,
  },
  {
    id: 7,
    name: "Cri",
    skill: 3,
    roles: [4, 3],
    isSelected: true,
  },
  {
    id: 8,
    name: "Trinka",
    skill: 4,
    roles: [3, 2, 1],
    isSelected: true,
  },
  {
    id: 9,
    name: "Zano",
    skill: 5,
    roles: [3, 2, 1],
    isSelected: true,
  },
  {
    id: 10,
    name: "Spano",
    skill: 5,
    roles: [3, 2],
    isSelected: true,
  },
  {
    id: 11,
    name: "Pozzo",
    skill: 3,
    roles: [2, 1],
    isSelected: true,
  },
  {
    id: 12,
    name: "Scotch",
    skill: 2,
    roles: [2, 1],
    isSelected: true,
  },
  {
    id: 13,
    name: "Matthew",
    skill: 2,
    roles: [2, 1],
    isSelected: true,
  },
  {
    id: 14,
    name: "Oliver",
    skill: 3,
    roles: [2, 3],
    isSelected: true,
  },
  {
    id: 15,
    name: "Gabri",
    skill: 3,
    roles: [3, 2],
    isSelected: true,
  },
  {
    id: 16,
    name: "Ventu",
    skill: 4,
    roles: [2, 1],
    isSelected: true,
  },
];

document.addEventListener("DOMContentLoaded", (event) => {
  let listPlayer = document.querySelector("ul.list-player");
  let inputNumberTeams = document.querySelector("input.input-number-teams");
  inputNumberTeams.value = 2;
  let btnMakeTeams = document.querySelector("button.btn-make-teams");
  let teams = [];
  let teamsResultsDiv = document.querySelector(".teams_wrapper .teams");

  let init = () => {
    players.forEach((player) => {
      let li = document.createElement("li");
      let span = document.createElement("span");
      let input = document.createElement("input");
      input.setAttribute("type", "checkbox");
      input.setAttribute("id", `${player.id}`);
      input.setAttribute("checked", true);
      input.addEventListener("change", (e) => checkedInput(e));
      li.appendChild(span);
      li.appendChild(input);
      span.innerText = player.name;
      listPlayer.appendChild(li);
    });
  };

  init();

  const checkedInput = (input) => {
    const idx = input.target.id;
    if (idx && players.some((player) => player.id === +idx)) {
      let player = players.filter((player) => player.id === +idx)[0];
      player.isSelected = input.target.checked;
    }
  };

  const shuffle = (array) => {
    return array
      .map((a) => ({ sort: Math.random(), value: a }))
      .sort((a, b) => a.sort - b.sort)
      .map((a) => a.value);
  };

  let makeTeams = () => {
    if (inputNumberTeams.value) {
      teams = [];
      teamsCounter = 0;
      for (let i = 0; i < +inputNumberTeams.value; i++) {
        teams.push([]);
      }

      let playersFiltered = players.filter((player) => player.isSelected);
      let playersFilteredRandom = shuffle(playersFiltered);

      for (let i = 5; i > 0; i--) {
        let secondPriorityPlayers = [];
        let thirdPriorityPlayers = [];
        playersFilteredRandom.forEach((player) => {
          let isRole = player.roles.some((role) => role === i);
          if (isRole) {
            let priority = player.roles.length;
            switch (priority) {
              case 1:
                teams[teamsCounter].push(player);
                playersFilteredRandom = playersFilteredRandom.filter(
                  (playerFiltered) => playerFiltered.id !== player.id
                );
                teamsCounter =
                  teamsCounter < teams.length - 1 ? teamsCounter + 1 : 0;
                break;
              case 2:
                secondPriorityPlayers.push(player);
                break;
              case 3:
                thirdPriorityPlayers.push(player);
                break;
            }
          }
        });

        secondPriorityPlayers.forEach((player) => {
          teams[teamsCounter].push(player);
          playersFilteredRandom = playersFilteredRandom.filter(
            (playerFiltered) => playerFiltered.id !== player.id
          );
          teamsCounter = teamsCounter < teams.length - 1 ? teamsCounter + 1 : 0;
        });
        thirdPriorityPlayers.forEach((player) => {
          teams[teamsCounter].push(player);
          playersFilteredRandom = playersFilteredRandom.filter(
            (playerFiltered) => playerFiltered.id !== player.id
          );
          teamsCounter = teamsCounter < teams.length - 1 ? teamsCounter + 1 : 0;
        });
      }
      setUpTeamsBySkill(teams);
    }
  };

  let setUpTeamsBySkill = (teams) => {
    let skillsScoreTeamsTot = teams.map(() => 0);
    let skillsScoreTeamsTotTemp = [...skillsScoreTeamsTot];

    let teamWithLongestLength = [];
    let longestLength = 0;
    teams.forEach((team) => {
      if (team.length > longestLength) {
        longestLength = team.length;
        teamWithLongestLength = [...team];
      }
    });
    let areTeamReminder = !teams[teams.length - 1][teamWithLongestLength.length - 1];
    teamWithLongestLength.forEach((player, idxPlayer) => {

      if ( ( teamWithLongestLength.length - 1 === idxPlayer ) && areTeamReminder) {

        for (let index = 0; index < teams.length; index++) {
          if (teams[index][idxPlayer]) {
            const max = Math.max(...skillsScoreTeamsTotTemp);
            const min = Math.min(...skillsScoreTeamsTotTemp);

            console.log('max', max);
            console.log('min', min);

            const skillPlayer = teams[index][idxPlayer].skill;
            const idMax = skillsScoreTeamsTotTemp.findIndex((mx) => mx === max);
            const idMin = skillsScoreTeamsTotTemp.findIndex((mn) => mn === min);
            console.log('teams[index][idxPlayer]', teams[index][idxPlayer]);
            if ( skillPlayer < 3 ) {
              teams[idMax][idxPlayer] = teams[index][idxPlayer];
              skillsScoreTeamsTotTemp.splice(idMax, 1); // non va bene
              teams[index][idxPlayer] = undefined;
            } else {
              teams[idMin][idxPlayer] = teams[index][idxPlayer];
              skillsScoreTeamsTotTemp.splice(idMin, 1); // non va bene
              teams[index][idxPlayer] = undefined;
            }
            console.log('skillsScoreTeamsTotTemp', skillsScoreTeamsTotTemp);
              
          };
          // skillsScoreTeamsTotTemp[index] += teams[index][idxPlayer].skill;
        }
      } else {
        for (let index = 0; index < teams.length; index++) {
          skillsScoreTeamsTotTemp[index] += teams[index][idxPlayer].skill;
        }

        const max = Math.max(...skillsScoreTeamsTotTemp);
        const min = Math.min(...skillsScoreTeamsTotTemp);

        if (max - min >= 3) {
          const idMax = skillsScoreTeamsTotTemp.findIndex((mx) => mx === max);
          const idMin = skillsScoreTeamsTotTemp.findIndex((mn) => mn === min);
          let playerMax = teams[idMax][idxPlayer];
          let playerMin = teams[idMin][idxPlayer];

          teams[idMax][idxPlayer] = playerMin;
          teams[idMin][idxPlayer] = playerMax;
        }
        for (let index = 0; index < teams.length; index++) {
          const player = teams[index][idxPlayer];
          skillsScoreTeamsTot[index] += player.skill;
        }
        skillsScoreTeamsTotTemp = [...skillsScoreTeamsTot];
      }
    });
    createTeamsTable(teams, skillsScoreTeamsTot);
  };

  createTeamsTable = (teams, skillsScoreTeamsTot) => {
    teams.forEach((team, index) => {
      let ul = document.createElement("ul");
      team.forEach((player) => {
        if(player){
          let li = document.createElement("li");
          li.innerText = player.name;
          ul.appendChild(li);
        }
      });
      let separator = document.createElement("div");
      let div = document.createElement("div");
      div.innerText = skillsScoreTeamsTot[index];
      ul.appendChild(separator);
      ul.appendChild(div);
      teamsResultsDiv.appendChild(ul);
    });
  };

  btnMakeTeams.addEventListener("click", (e) => makeTeams());
});
