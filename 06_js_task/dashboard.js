var dashboard = [
    {
        imageSrc: "images/imageMask.png",
        headTopicContent: "Acceleration",
        subject: "Physics | Grade 7",
        greenText: "+2",
        unit: 4,
        lessons: 18,
        topics: 24,
        selectClassOptions: [
            "Mr. Frank's Class B",
            "Mr. Scorcese's Film Class"
        ],
        studentInfo: "50 Students | 21-Jan-2020 - 21-Aug-2020",
        bottomImages: [
            "icons/preview.svg",
            "icons/manage course.svg",
            "icons/grade submissions.svg",
            "icons/reports.svg"
        ]
        
    },
    {
        imageSrc: "images/imageMask-1.png",
        headTopicContent: "Displacement, Velocity and Speed",
        subject: "Physics 2 | Grade 6",
        greenText: "+3",
        unit: 2,
        lessons: 15,
        topics: 20,
        selectClassOptions: [
            "No Classes",
            "Mr. Frank's Class B",
            "Mr. Scorcese's Film Class"
        ],
        studentInfo: "",
        bottomImages: [
            "icons/preview.svg",
            "icons/manage course.svg",
            "icons/grade submissions.svg",
            "icons/reports.svg"
        ]
    },
    {
        imageSrc: "images/imageMask-2.png",
        headTopicContent: "Introduction to Biology: Micro Organisms and how they...",
        subject: "Biology | Grade 4",
        greenText: "+1",
        unit: 5,
        lessons: 16,
        topics: 22,
        selectClassOptions: [
            "Mr. Scorcese's Biology Class",
            "Mr. Frank's Class B"
        ],
        studentInfo: "300 Students",
        bottomImages: [
            "icons/preview.svg",
            "icons/manage course.svg",
            "icons/grade submissions.svg",
            "icons/reports.svg"
        ]
    },
    {
        imageSrc: "images/imageMask-3.png",
        headTopicContent: "Introduction to High School Mathematics",
        subject: "Mathematics | Grade 8",
        greenText: "+3",
        unit: 4,
        lessons: 18,
        topics: 24,
        selectClassOptions: [
            "Mr. Frank's Class A",
            "Mr. Scorcese's Film Class"
        ],
        studentInfo: "44 Students | 14-Oct-2019 - 20-Oct-2020",
        bottomImages: [
            "icons/preview.svg",
            "icons/manage course.svg",
            "icons/grade submissions.svg",
            "icons/reports.svg"
        ]
    }
];

// Accessing HTML element
var dashboardContainer = document.getElementById('dashboard-main');

// Generating and setting HTML content using template literals
dashboardContainer.innerHTML = `
    ${dashboard.map(item => `
        <div class="element-grid ">
            <div class="top">
                <div class="image-top-left">
                    <img src="${item.imageSrc}" alt="">
                </div>
                <div class="content-top-right">
                    <div class="topic">
                        <p class="head-topic-content">${item.headTopicContent}</p>    
                        <img src="icons/favourite.svg" alt="">                            
                    </div>
                    <p class="subject small">${item.subject} <span class="green-text">${item.greenText}</span></p>
                    <p class="unit small"><span class="bold-number">${item.unit}</span> Units  <span class="bold-number">${item.lessons}</span> Lessons  <span class="bold-number">${item.topics}</span> Topics  </p>
                    <select name="select-class" class="select-class">
                        ${item.selectClassOptions.map(option => `<option value="${option}" class="option">${option}</option>`).join('')}
                    </select>                               
                    <p class="student-info small">${item.studentInfo}</p> 
                </div>
            </div>

            <div class="bottom">
            ${item.bottomImages.map(image => `<img src="${image}" alt="">`).join('')}
            </div>
        </div>
    `).join('')}
`;