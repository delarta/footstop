var request = idb.open("footstop", 1, upgradedDB => {
  let favTeamObjectStore = upgradedDB.createObjectStore("favTeamStore", {
    keyPath: "id"
  });
  favTeamObjectStore.createIndex("team_name", "name", { unique: false });
});

function liked(team) {
  request
    .then(db => {
      let tx = db.transaction("favTeamStore", "readwrite");
      let store = tx.objectStore("favTeamStore");
      console.log(team);
      store.add(team);
      return tx.complete;
    })
    .then(() => console.log("Team Added to Favorite!"));
}

function getAllFavTeamStore() {
  return new Promise((resolve, reject) => {
    request
      .then(db => {
        let tx = db.transaction("favTeamStore", "readonly");
        let store = tx.objectStore("favTeamStore");
        return store.getAll();
      })
      .then(teams => {
        resolve(teams);
      });
  });
}

function getFavTeamById(id) {
  console.log(typeof(id))
  return new Promise((resolve, reject) => {
    request
      .then(db => {
        let tx = db.transaction("favTeamStore", "readonly");
        let store = tx.objectStore("favTeamStore");
        console.log(store);
        
        return store.get(Number(id));
      })
      .then(teams => {
        console.log(teams);
        resolve(teams);
      });
  });
}

function deleteItem(id) {
  console.log(typeof(id))
  return new Promise((resolve, reject) => {
    request
      .then(db => {
        let tx = db.transaction("favTeamStore", "readwrite");
        let store = tx.objectStore("favTeamStore");
        store.delete(Number(id));
        return tx
      })
      .then(tx => {
        if(tx.complete){
          resolve(true)
          getLikedTeams()
        console.log('berhasil')

        }else{
          reject(new Error(tx.onerror))
        }
        // console.log('berhasil')
      });
  });
}
