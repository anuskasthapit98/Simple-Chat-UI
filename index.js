//User list
let data = ["Ram", "Shyam", "Rita", "Gita"];
let groups = [];

let list = document.getElementById("myList");
let grouplist = document.getElementById("groupList");

data.forEach((item) => {
  let li = document.createElement("li");
  let btnUSer = document.createElement("button");
  btnUSer.className = "tablinks";
  btnUSer.addEventListener("click", function (e) {
    openChat(e, item);
    active.push(item);
  });
  li.appendChild(btnUSer);
  btnUSer.innerText = item;
  list.appendChild(li);
});

//create groups
function getSelectValues(select) {
  var result = [];
  var options = select && select.options;
  var opt;

  for (var i = 0, iLen = options.length; i < iLen; i++) {
    opt = options[i];

    if (opt.selected) {
      result.push(opt.value || opt.text);
    }
  }
  groups.push(result);
  groups.forEach((item) => {
    if (groups[groups.length - 1] === item) {
      let li = document.createElement("li");
      let btnUSer = document.createElement("button");
      btnUSer.className = "tablinks";
      btnUSer.addEventListener("click", function (e) {
        if (item.includes("Ram")) openChat(e, "Ram");
        if (item.includes("Shyam")) openChat(e, "Shyam");
        if (item.includes("Rita")) openChat(e, "Rita");
        if (item.includes("Gita")) openChat(e, "Gita");
      });
      li.appendChild(btnUSer);
      btnUSer.innerText = item;
      grouplist.appendChild(li);
    }
  });
}

// Open chat box for each user
function openChat(e, user) {
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");

  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablinks");

  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  document.getElementById(user).style.display = "block";
  e.currentTarget.className += " active";
}

// Variables
var messages = document.querySelector(".message-list");

var btn = document.querySelector(".btn");
var input = document.querySelector(".input-msg");
var image = document.querySelector(".input-img");

// Button/Enter Key
btn.addEventListener("click", sendMessage);

// Messenger Functions

function sendMessage() {
  var msg = input.value;
  input.value = "";
  writeLine(msg);
}

//Send message

function writeLine(text) {
  var message = document.createElement("li");
  const date = new Date();
  message.classList.add("message-item", "item-secondary");

  const files = image.files[0];
  if (files) {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(files);
    fileReader.addEventListener("load", function () {
      message.innerHTML =
        "Sita says: " +
        text +
        '\n <img src="' +
        this.result +
        '" class="img-pic" /> \n' +
        date.toLocaleString([], { hour12: true });
    });
    image.value = "";
  } else {
    message.innerHTML =
      "Sita says: " + text + "\n" + date.toLocaleString([], { hour12: true });
  }

  messages.appendChild(message);
}

//Search
function search() {
  var input, filter, ul, li, button, i, txtValue;
  input = document.getElementById("myInput");
  filter = input.value.toUpperCase();
  ul = document.getElementById("myList");
  li = ul.getElementsByTagName("li");
  for (i = 0; i < li.length; i++) {
    button = li[i].getElementsByTagName("button")[0];
    txtValue = button.textContent || button.innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      li[i].style.display = "";
    } else {
      li[i].style.display = "none";
    }
  }
}

// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal
btn.onclick = function () {
  modal.style.display = "block";
};

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
  modal.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};
