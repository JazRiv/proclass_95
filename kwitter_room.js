// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyD8qVnliXMwFKl1izQQM2hO9IRUcokRjdA",
  authDomain: "chat-talk-1b82c.firebaseapp.com",
  databaseURL: "https://chat-talk-1b82c-default-rtdb.firebaseio.com",
  projectId: "chat-talk-1b82c",
  storageBucket: "chat-talk-1b82c.appspot.com",
  messagingSenderId: "922462400746",
  appId: "1:922462400746:web:d2136dac09a8c6cfd22793"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

user_name = localStorage.getItem("user_name");

document.getElementById("user_name").innerHTML="Welcome " + user_name;

  function addRoom(){
    room_name = document.getElementById("room_name").value;
    firebase.database().ref("/").child(room_name).update({
          purpose:"Adding Room Name"
    });

    localStorage.setItem("room_name", room_name);
    window.location = "kwitter_page.html";
  }

function getData() {
    firebase.database().ref("/" + room_name).on('value', function(snapshot) {
          document.getElementById("output").innerHTML = "";
          snapshot.forEach(function(childSnapshot) {
          childKey  = childSnapshot.key;
          childData = childSnapshot.val;
          if (childKey != "purpose"){
             firebase_message_id = childKey;
             message_data = childData;
             
             console.log(firebase_message_id);
             console.log(message_data);
             name = message_data['name'];
             message = message_data['message'];
             like = message_data['like'];
             name_with_tag = "<h4>"+ name +" <img class='user_tick' src='tick.png'></h4>";
             message_with_tag = "<h4 class='message_h4'>" + message + "</h4>";
             like_button = "<button class='btn btn-warning' id="+ firebase_message_id + " onclick='updateLike(this.id)'>";
             span_with_tag = "<span class='glyphicon glyphicon-thumbs-up'>Like: "+ like +"</span></button><hr>";
           
             row = name_with_tag + message_with_tag + like_button + span_with_tag;
             document.getElementById("output").innerHTML + row;
          }
    });
});
}
getData();

function redirectionToRoomName(name){
    console.log(name);
    localStorage.setItem("room_name", name);
    window.location = "kwitter_page.html";
}

