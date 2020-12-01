let manager = new CanvasManager();

let database = firebase.database();
let userRef = database.ref("users/" + manager.myId);

userRef.onDisconnect().remove();

setInterval(
    () => {
        userRef.set(manager.getMyData());
    },
    300
);

// when user's child is ADDED, this function gets called.
database.ref("users").once("value", function(snapshot) {
    let users = snapshot.val();
    let updates = Object.values(users);

    for(let i = 0; i < updates.length; i++){
        let data = updates[i];
        if (userData.id !== manager.myId) {
            manager.updateRemoteDisplay(data);
        }
    }
});

// when user's child is CHANGED, this function gets called.
database.ref("users").on("child_changed", function(snapshot) {
    let userData = snapshot.val();
    if (userData.id !== manager.myId) {
        manager.updateRemoteDisplay(userData);
    }
});

// when user's child is REMOVED, this function gets called.
database.ref("users").on("child_removed", function(snapshot) {
    let userData = snapshot.val();
    manager.removeRemoteDisplay(userData)
});