// console.log("joining");

var courseList = [
  {
    imageSrc: "quantum_screen_assets/images/imageMask.svg",
    headTopicContent: "Acceleration",
    subject: "Physics",
    grade: "Grade 7",
    greenGrade: "+2",
    unit: 4,
    lessons: 18,
    topics: 24,
    selectClassOptions: ["Mr. Frank's Class B", "Mr. Scorcese's Film Class"],
    studentInfo: "50 Students | 21-Jan-2020 - 21-Aug-2020",
    bottomImages: [
      "quantum_screen_assets/icons/preview.svg",
      "quantum_screen_assets/icons/manage course.svg",
      "quantum_screen_assets/icons/grade submissions.svg",
      "quantum_screen_assets/icons/reports.svg",
    ],
  },
  {
    imageSrc: "quantum_screen_assets/images/imageMask-1.svg",
    headTopicContent: "Displacement, Velocity and Speed",
    subject: "Physics 2",
    grade: "Grade 6",
    greenGrade: "+3",

    unit: 2,
    lessons: 15,
    topics: 20,
    selectClassOptions: [
      "No Classes",
      "Mr. Frank's Class B",
      "Mr. Scorcese's Film Class",
    ],
    studentInfo: "",
    bottomImages: [
      "quantum_screen_assets/icons/preview.svg",
      "quantum_screen_assets/icons/manage course.svg",
      "quantum_screen_assets/icons/grade submissions.svg",
      "quantum_screen_assets/icons/reports.svg",
    ],
  },
  {
    imageSrc: "quantum_screen_assets/images/imageMask-2.svg",
    headTopicContent:
      "Introduction to Biology: Micro Organisms and how they...",
    subject: "Biology",
    grade: "Grade 4",
    greenGrade: "+1",
    unit: 5,
    lessons: 16,
    topics: 22,
    selectClassOptions: ["Mr. Scorcese's Biology Class", "Mr. Frank's Class B"],
    studentInfo: "300 Students",
    bottomImages: [
      "quantum_screen_assets/icons/preview.svg",
      "quantum_screen_assets/icons/manage course.svg",
      "quantum_screen_assets/icons/grade submissions.svg",
      "quantum_screen_assets/icons/reports.svg",
    ],
  },
  {
    imageSrc: "quantum_screen_assets/images/imageMask-3.svg",
    headTopicContent: "Introduction to High School Mathematics",
    subject: "Mathematics",
    grade: "Grade 8",
    greenGrade: "+3",
    unit: 4,
    lessons: 18,
    topics: 24,
    selectClassOptions: ["Mr. Frank's Class A", "Mr. Scorcese's Film Class"],
    studentInfo: "44 Students | 14-Oct-2019 - 20-Oct-2020",
    bottomImages: [
      "quantum_screen_assets/icons/preview.svg",
      "quantum_screen_assets/icons/manage course.svg",
      "quantum_screen_assets/icons/grade submissions.svg",
      "quantum_screen_assets/icons/reports.svg",
    ],
  },
];

var mainContent = document.querySelector("#main-content");
console.log("joining");
mainContent.innerHTML = `
    ${courseList
      .map(
        (item) => `
        <div class="grid-card">
        <div class="expired-container">
          <div class="expired-card">EXPIRED</div>
        </div>
        <div class="img-info">
          <img src="${item.imageSrc}" alt="" />
          <div class="info-container">
            <div class="title">
              <span>${item.headTopicContent}</span>
              <img src="quantum_screen_assets/icons/favourite.svg" alt="" />
            </div>
            <div class="subtitle">
              <span>${item.subject}</span>
              <div class="grade">
                <span>${item.grade}</span>
                <span class="green">${item.greenGrade}</span>
              </div>
            </div>
            <div class="subtitle2">
              <div>
                <span class="num">${item.unit}</span>
                <span class="text">Units</span>
              </div>
              <div>
                <span class="num">${item.lessons}</span>
                <span class="text">Lessons</span>
              </div>
              <div>
                <span class="num">${item.topics}</span>
                <span class="text">Topics</span>
              </div>
            </div>
            <div class="subtitle3">
            <select name="teacher" id="teacher">
            ${item.selectClassOptions
              .map(
                (option) =>
                  `<option value="${option}" class="option">${option}</option>`
              )
              .join("")}
        </select>   
            </div>
            <div class="subtitle4">
              <span> ${item.studentInfo} </span>
             
            </div>
          </div>
        </div>
       
        <div class="card-opration">
        ${item.bottomImages
          .map((image) => `<img src="${image}" alt="">`)
          .join("")}
         
        </div>
      </div>
    `
      )
      .join("")}
`;

var navbarContainer = document.querySelector(".navbar-container");
// notificationCard
var alertsIcon = document.querySelector("#alerts-icon-div");
var announcementsIcon = document.querySelector("#announcements-icon-div");
// menu-icon-div

var menuIcon = document.querySelector("#menu-icon-div");
// menu-popup
var menuPopup = document.querySelector(".menu-popup");

var notificationCard = document.querySelector("#notificationCard");
var announcementsCard = document.querySelector("#announcementsCard");

// announcementsCard

var accountIcon = document.querySelector("#account-icon");

// function onTapAlerts() {
//   alertsIcon.src = "quantum_screen_assets/icons/arrow-down.svg";
// }
alertsIcon.addEventListener("mouseover", function () {
  announcementsCard.style.display = "none";
  menuPopup.style.display = "none";
  notificationCard.style.display = "block";
});

notificationCard.addEventListener("mouseout", function () {
  notificationCard.style.display = "none";
  menuPopup.style.display = "none";
  announcementsCard.style.display = "none";
});

announcementsIcon.addEventListener("mouseover", function () {
  notificationCard.style.display = "none";
  menuPopup.style.display = "none";
  announcementsCard.style.display = "block";
});

announcementsCard.addEventListener("mouseout", function () {
  announcementsCard.style.display = "none";
  menuPopup.style.display = "none";
  notificationCard.style.display = "none";
});

menuIcon.addEventListener("mouseover", function () {
  notificationCard.style.display = "none";
  announcementsCard.style.display = "none";
  menuPopup.style.display = "block";
});

menuPopup.addEventListener("mouseout", function () {
  announcementsCard.style.display = "none";
  notificationCard.style.display = "none";
  menuPopup.style.display = "none";
});

function toggleCheckbox(checkboxContainer) {
  const checkbox = checkboxContainer.querySelector(".checkbox");
  const v = checkboxContainer.parentElement.parentElement;
  if (checkbox.src.includes("checkbox-checked.svg")) {
    checkbox.src = "quantum_screen_assets/icons/back.svg";
    v.classList.remove("selected");
  } else {
    checkbox.src = "quantum_screen_assets/icons/checkbox-checked.svg";
    v.classList.add("selected");
  }
}
function toggleCheckboxnotification(checkboxContainer) {
  const checkbox = checkboxContainer.querySelector(".checkbox");
  const v = checkboxContainer.parentElement.parentElement;
  if (checkbox.src.includes("checkbox-checked.svg")) {
    checkbox.src = "quantum_screen_assets/icons/back.svg";
    v.classList.remove("selected");
  } else {
    checkbox.src = "quantum_screen_assets/icons/checkbox-checked.svg";
    v.classList.add("selected");
  }
}

var contentSubmenu = document.querySelector("#content-submenu");
var contentDiv = document.querySelector("#content-div");

contentDiv.addEventListener("click", function () {
  console.log("hi");
  if (contentSubmenu.style.display === "flex") {
    contentSubmenu.style.display = "none";
    contentDiv.style.backgroundColor = "#FFFFFF";
  } else {
    contentSubmenu.style.display = "flex";
    contentDiv.style.backgroundColor = "#F3F3F3";
    contentSubmenu.style.backgroundColor = "#F3F3F3";
  }
});

var usersSubmenu = document.querySelector("#users-submenu");
var usersDiv = document.querySelector("#users-div");

usersDiv.addEventListener("click", function () {
  console.log("hi");
  if (usersSubmenu.style.display === "flex") {
    usersSubmenu.style.display = "none";
    usersDiv.style.backgroundColor = "#FFFFFF";
  } else {
    usersSubmenu.style.display = "flex";
    usersDiv.style.backgroundColor = "#F3F3F3";
    usersSubmenu.style.backgroundColor = "#F3F3F3";
  }
});

var reportsSubmenu = document.querySelector("#reports-submenu");
var reportsDiv = document.querySelector("#reports-div");

reportsDiv.addEventListener("click", function () {
  console.log("hi");
  if (reportsSubmenu.style.display === "flex") {
    reportsSubmenu.style.display = "none";
    reportsDiv.style.backgroundColor = "#FFFFFF";
  } else {
    reportsSubmenu.style.display = "flex";
    reportsDiv.style.backgroundColor = "#F3F3F3";
    reportsSubmenu.style.backgroundColor = "#F3F3F3";
  }
});
var adminSubmenu = document.querySelector("#admin-submenu");
var adminDiv = document.querySelector("#admin-div");

adminDiv.addEventListener("click", function () {
  console.log("hi");
  if (adminSubmenu.style.display === "flex") {
    adminSubmenu.style.display = "none";
    adminDiv.style.backgroundColor = "#FFFFFF";
  } else {
    adminSubmenu.style.display = "flex";
    adminDiv.style.backgroundColor = "#F3F3F3";
    adminSubmenu.style.backgroundColor = "#F3F3F3";
  }
});
