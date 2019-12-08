var base_url = "https://api.football-data.org/v2/";
var token = "b73127712c034e0685850c0a5e46a782";

function status(response) {
  if (response.status !== 200) {
    console.log("Error : " + response.status);
    return Promise.reject(new Error(response.statusText));
  } else {
    return Promise.resolve(response);
  }
}
function json(response) {
  return response.json();
}
function error(error) {
  console.log("Error : " + error);
}

getCompetitionList = () => {
  if ("caches" in window) {
    caches
      .match(base_url + "competitions/2021/standings?standingType=HOME")
      .then(function(response) {
        if (response) {
          response.json().then(function(data) {
            console.log(data);

            var teamsHTML = "";
            data.standings[0].table.forEach(function(item) {
              if (item.crestUrl !== null) {
                teamsHTML += `
                    <tr>
                    <td>
                    <a href="./team_detail.html?id=${item.team.id}"><span
                    ><img src="${item.team.crestUrl}" style="width:20px;" alt="" /> ${item.team.name}</span
                  ></a>
                      
                    </td>
                    <td>${item.won}</td>
                    <td>${item.draw}</td>
                    <td>${item.lost}</td>
                    <td>${item.goalsFor}</td>
                    <td>${item.points}</td>
                  </tr>
                  `;
              }
            });

            document.getElementById("competition-list").innerHTML = teamsHTML;
          });
        }
      });
  }
  fetch(base_url + "competitions/2021/standings?standingType=HOME", {
    headers: {
      "X-Auth-Token": token
    }
  })
    .then(status)
    .then(json)
    .then(function(data) {
      console.log(data.standings, "data.standings.table");

      var teamsHTML = "";
      data.standings[0].table.forEach(function(item) {
        if (item.crestUrl !== null) {
          teamsHTML += `
          <tr>
          <td>
          <a href="./team_detail.html?id=${item.team.id}"><span
          ><img src="${item.team.crestUrl}" style="width:20px;" alt="" /> ${item.team.name}</span
        ></a>
            
          </td>
          <td>${item.won}</td>
          <td>${item.draw}</td>
          <td>${item.lost}</td>
          <td>${item.goalsFor}</td>
          <td>${item.points}</td>
        </tr>
            `;
        }
      });

      document.getElementById("competition-list").innerHTML = teamsHTML;
    })
    .catch(error);
};
getLikedTeams = () => {
  getAllFavTeamStore().then(teams => {
    console.log(teams);
    var teamsHTML = "";
    teams.forEach(function(item) {
      if (item.crestUrl !== null) {
        teamsHTML += `
              <div class="card">
                  <div class="team-detail-logo-container">
                      <img class="team-logo" src="${item.crestUrl}" />
                  </div>
                  <div class="card-content">
                    <span class="card-title truncate">${item.name}</span>
                  </div>
                <div class="card-action">
                  <a href="./team_detail.html?id=${item.id}&liked=true">View Detail</a>
                  <a onclick="deleteItem(${item.id})">Delete Item</a>
                </div>
              </div>
            `;
      }
    });

    document.getElementById("teams").innerHTML = teamsHTML;
  });
};


getTeams = () => {
  if ("caches" in window) {
    caches.match(base_url + "teams").then(function(response) {
      console.log(response);
      if (response) {
        response.json().then(function(data) {
          var teamsHTML = "";
          data.teams.forEach(function(item) {
            if (item.crestUrl !== null) {
              teamsHTML += `
                <div class="card">
                <div class="card-content">

                <div class="team-detail-logo-container">

                <a href="./team_detail.html?id=${item.id}">
                  <div class="card-image waves-effect waves-block waves-light">
                    <img class="team-logo" src="${item.crestUrl.replace(/^http:\/\//i, 'https://')}" />
                  </div>
                </a>
                </div>
                <div class="card-content">
                  <span class="card-title truncate">${item.name}</span>
                </div>
                </div>
              </div>
            `;
            }
          });

          document.getElementById("teams").innerHTML = teamsHTML;
        });
      }
    });
  }
  fetch(base_url + "teams", {
    headers: {
      "X-Auth-Token": token
    }
  })
    .then(status)
    .then(json)
    .then(function(data) {
      console.log(data);
      var teamsHTML = "";
      data.teams.forEach(function(item) {
        if (item.crestUrl !== null) {
          teamsHTML += `
          <div class="card">
            <div class="card-content">

            <div class="team-detail-logo-container">

            <a href="./team_detail.html?id=${item.id}">
              <div class="card-image waves-effect waves-block waves-light">
                <img class="team-logo" src="${item.crestUrl.replace(/^http:\/\//i, 'https://')}" />
              </div>
            </a>
            </div>
            <div class="card-content">
              <span class="card-title truncate">${item.name}</span>
            </div>
            </div>
          </div>
        `;
        }
      });
      // Sisipkan komponen card ke dalam elemen dengan id #content
      document.getElementById("teams").innerHTML = teamsHTML;
    })
    .catch(error);
};

getLikedTeamById = () => {
  var urlParams = new URLSearchParams(window.location.search);
  var idParam = urlParams.get("id");
  console.log(idParam);

  getFavTeamById(idParam).then(data => {
    console.log(data);

    var competitions = "";
    data.activeCompetitions.forEach(
      item => (competitions += `<li class="collection-item">${item.name}</li>`)
    );
    var squad = "";
    data.squad.map(
      item =>
        (squad += `<li class="collection-item">${item.name} <span class="new badge" data-badge-caption="">${item.position}</span></li>`)
    );
    var teamsHTML = `
        <div class="card">
          <div class="team-detail-header">
            <div class="team-detail-logo-container">
              <img class="team-detail-logo" src="${data.crestUrl}" />
            </div>
            <div class="team-detail-name"><h3>${data.name}</h3></div>
          </div>
          
          <div class="card-content">
              <div class="competitions-header">Active Competition</div>
              <div>
                <ul class="collection">
                  ${competitions}
                </ul>
              </div>
          
              <div class="squad-header">Squad</div>
              <div>
                <ul class="collection">
                  ${squad}
                </ul>
              </div>
          </div>
        </div>
      `;
    document.getElementById("body-content").innerHTML = teamsHTML;
  });
};

getTeamById = () => {
  return new Promise(function(resolve, reject) {
    // Ambil nilai query parameter (?id=)
    var urlParams = new URLSearchParams(window.location.search);
    var idParam = urlParams.get("id");

    if ("caches" in window) {
      caches.match(base_url + "teams/" + idParam).then(function(response) {
        if (response) {
          response.json().then(function(data) {
            console.log(data);
            var competitions = "";
            data.activeCompetitions.forEach(
              item =>
                (competitions += `<li class="collection-item">${item.name}</li>`)
            );
            var squad = "";
            data.squad.map(
              item =>
                (squad += `<li class="collection-item">${item.name} <span class="new badge" data-badge-caption="">${item.position}</span></li>`)
            );
            var teamsHTML = `
              <div class="card">
                <div class="team-detail-header">

                  <div class="team-detail-logo-container">
                    <img class="team-detail-logo" src="${data.crestUrl}" />
                  </div>
                  <div class="team-detail-name"><h3>${data.name}</h3></div>
                </div>
                
                <div class="card-content">
                    <div class="competitions-header">Active Competition</div>
                    <div>
                      <ul class="collection">
                        ${competitions}
                      </ul>
                    </div>
                
                    <div class="squad-header">Squad</div>
                    <div>
                      <ul class="collection">
                        ${squad}
                      </ul>
                    </div>
                </div>
              </div>
            `;
            document.getElementById("body-content").innerHTML = teamsHTML;
            resolve(data);
          });
        }
      });
    }

    fetch(`${base_url}teams/${idParam}`, {
      headers: {
        "X-Auth-Token": token
      }
    })
      .then(status)
      .then(json)
      .then(function(data) {
        console.log(data);
        var competitions = "";
        data.activeCompetitions.forEach(
          item =>
            (competitions += `<li class="collection-item">${item.name}</li>`)
        );
        var squad = "";
        data.squad.map(
          item =>
            (squad += `<li class="collection-item">${item.name} <span class="new badge" data-badge-caption="">${item.position}</span></li>`)
        );
        var teamsHTML = `
          <div class="card">
            <div class="team-detail-header">
              <div class="team-detail-logo-container">
                <img class="team-detail-logo" src="${data.crestUrl}" />
              </div>
              <div class="team-detail-name"><h3>${data.name}</h3></div>
              </div>
            
            <div class="card-content">
                <div class="competitions-header">Active Competition</div>
                <div>
                  <ul class="collection">
                    ${competitions}
                  </ul>
                </div>
             
                <div class="squad-header">Squad</div>
                <div>
                  <ul class="collection">
                    ${squad}
                  </ul>
                </div>
            </div>
          </div>
        `;
        document.getElementById("body-content").innerHTML = teamsHTML;
        resolve(data);
      });
  });
};
