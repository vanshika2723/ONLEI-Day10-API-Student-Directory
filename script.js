
// ==========================================
// STUDENTHUB - DAY 10 API PROJECT
// Fetch API, JSON & Async JavaScript
// ==========================================


// API URLS
const USERS_API = "https://jsonplaceholder.typicode.com/users";
const POSTS_API = "https://jsonplaceholder.typicode.com/posts";


// DOM ELEMENTS
const loadUsersBtn = document.getElementById("loadUsers");
const loadPostsBtn = document.getElementById("loadPosts");

const userList = document.getElementById("userList");
const postsList = document.getElementById("postsList");

const studentStatus = document.getElementById("studentStatus");
const postStatus = document.getElementById("postStatus");

const studentSearch = document.getElementById("studentSearch");
const postSearch = document.getElementById("postSearch");

const studentCount = document.getElementById("studentCount");
const postCount = document.getElementById("postCount");
const apiStatus = document.getElementById("apiStatus");


// STORE API DATA
let allUsers = [];
let allPosts = [];


// ==========================================
// HELPER FUNCTION - API STATUS
// ==========================================

function updateApiStatus(status) {
    apiStatus.textContent = status;
}


// ==========================================
// HELPER FUNCTION - EMPTY MESSAGE
// ==========================================

function showEmptyMessage(container, message) {
    container.replaceChildren();

    const empty = document.createElement("div");
    empty.className = "empty-message";
    empty.textContent = message;

    container.appendChild(empty);
}


// ==========================================
// TASK 1 - FETCH STUDENT DATA
// ==========================================

async function loadStudents() {

    loadUsersBtn.disabled = true;
    loadUsersBtn.textContent = "Loading...";

    studentStatus.textContent = "Fetching student records...";
    userList.replaceChildren();

    updateApiStatus("Loading");

    try {

        // Fetch API request
        const response = await fetch(USERS_API);

        // Check HTTP response
        if (!response.ok) {
            throw new Error("Unable to fetch student records.");
        }

        // Convert JSON into JavaScript objects
        const users = await response.json();

        allUsers = users;

        // Display all students
        displayStudents(allUsers);

        // Update total count
        studentCount.textContent = allUsers.length;

        studentStatus.textContent =
            `${allUsers.length} student records loaded successfully.`;

        updateApiStatus("Connected");

    } catch (error) {

        studentStatus.textContent =
            "Error: " + error.message;

        showEmptyMessage(
            userList,
            "Unable to load students. Please check your internet connection and try again."
        );

        updateApiStatus("Error");

        console.error("Student API Error:", error);

    } finally {

        loadUsersBtn.disabled = false;
        loadUsersBtn.textContent = "↻ Load Students";

    }
}


// ==========================================
// DISPLAY STUDENT CARDS
// ==========================================

function displayStudents(users) {

    userList.replaceChildren();

    if (users.length === 0) {

        showEmptyMessage(
            userList,
            "No matching students found. Try another search."
        );

        return;
    }

    users.forEach(user => {

        // Student card
        const card = document.createElement("div");
        card.className = "student-card";

        // Student top section
        const top = document.createElement("div");
        top.className = "student-top";

        // Avatar
        const avatar = document.createElement("div");
        avatar.className = "student-avatar";
        avatar.textContent = user.name.charAt(0).toUpperCase();

        // Student name and label
        const info = document.createElement("div");

        const name = document.createElement("h3");
        name.className = "student-name";
        name.textContent = user.name;

        const label = document.createElement("p");
        label.className = "student-label";
        label.textContent = "● Sample Student";

        info.append(name, label);
        top.append(avatar, info);

        // Student details
        const details = document.createElement("div");
        details.className = "student-details";

        const email = document.createElement("p");
        email.textContent = "Email: ";

        const emailValue = document.createElement("strong");
        emailValue.textContent = user.email;

        email.appendChild(emailValue);

        const city = document.createElement("p");
        city.textContent = "City: ";

        const cityValue = document.createElement("strong");
        cityValue.textContent = user.address.city;

        city.appendChild(cityValue);

        details.append(email, city);

        card.append(top, details);

        userList.appendChild(card);

    });

}


// ==========================================
// TASK 2 - STUDENT SEARCH
// ==========================================

studentSearch.addEventListener("input", function () {

    const searchValue = studentSearch.value
        .trim()
        .toLowerCase();

    const filteredUsers = allUsers.filter(user => {

        return (
            user.name.toLowerCase().includes(searchValue) ||
            user.email.toLowerCase().includes(searchValue) ||
            user.address.city.toLowerCase().includes(searchValue)
        );

    });

    displayStudents(filteredUsers);

    if (allUsers.length > 0) {

        studentStatus.textContent =
            `${filteredUsers.length} of ${allUsers.length} students found.`;

    }

});


// ==========================================
// TASK 3 - FETCH POSTS
// ==========================================

async function loadLatestPosts() {

    loadPostsBtn.disabled = true;
    loadPostsBtn.textContent = "Loading...";

    postStatus.textContent = "Fetching latest posts...";
    postsList.replaceChildren();

    updateApiStatus("Loading");

    try {

        // Send GET request
        const response = await fetch(POSTS_API);

        // Check response
        if (!response.ok) {
            throw new Error("Unable to fetch posts.");
        }

        // Parse JSON
        const posts = await response.json();

        allPosts = posts;

        // Display first 10 posts
        displayPosts(allPosts.slice(0, 10));

        postCount.textContent = allPosts.length;

        postStatus.textContent =
            `${allPosts.length} posts fetched successfully. Showing the first 10 posts.`;

        updateApiStatus("Connected");

    } catch (error) {

        postStatus.textContent =
            "Error: " + error.message;

        showEmptyMessage(
            postsList,
            "Unable to load posts. Please try again later."
        );

        updateApiStatus("Error");

        console.error("Posts API Error:", error);

    } finally {

        loadPostsBtn.disabled = false;
        loadPostsBtn.textContent = "↻ Load Posts";

    }

}


// ==========================================
// DISPLAY POSTS
// ==========================================

function displayPosts(posts) {

    postsList.replaceChildren();

    if (posts.length === 0) {

        showEmptyMessage(
            postsList,
            "No matching posts found. Try another search."
        );

        return;
    }

    posts.forEach(post => {

        // Create post card
        const card = document.createElement("article");
        card.className = "post-card";

        // Post number
        const number = document.createElement("span");
        number.className = "post-number";
        number.textContent = `POST #${post.id}`;

        // Post title
        const title = document.createElement("h3");
        title.textContent = post.title;

        // Post body
        const body = document.createElement("p");
        body.textContent = post.body;

        // Footer
        const footer = document.createElement("div");
        footer.className = "post-footer";
        footer.textContent = `Author ID: ${post.userId}`;

        card.append(number, title, body, footer);

        postsList.appendChild(card);

    });

}


// ==========================================
// TASK 4 - POST SEARCH
// ==========================================

postSearch.addEventListener("input", function () {

    const searchValue = postSearch.value
        .trim()
        .toLowerCase();

    // Filter all posts by title
    const filteredPosts = allPosts.filter(post => {

        return post.title
            .toLowerCase()
            .includes(searchValue);

    });

    // Show matching posts
    displayPosts(filteredPosts);

    if (allPosts.length > 0) {

        postStatus.textContent =
            `${filteredPosts.length} matching posts found.`;

    }

});


// ==========================================
// BUTTON EVENTS
// ==========================================

loadUsersBtn.addEventListener("click", loadStudents);

loadPostsBtn.addEventListener("click", loadLatestPosts);


// ==========================================
// JSON CONVERSION DEMONSTRATION
// ==========================================

const student = {
    name: "Rahul",
    course: "Web Development",
    active: true
};

// JavaScript object to JSON string
const jsonData = JSON.stringify(student);

console.log("JSON String:", jsonData);

// JSON string to JavaScript object
const parsedData = JSON.parse(jsonData);

console.log("Parsed Student Name:", parsedData.name);


// ==========================================
// PROMISE DEMONSTRATION
// ==========================================

const promiseExample = new Promise((resolve) => {

    resolve("Promise executed successfully!");

});

promiseExample.then(result => {

    console.log(result);

});


// ==========================================
// ASYNC / AWAIT DEMONSTRATION
// ==========================================

async function demonstrateAsync() {

    const message = await Promise.resolve(
        "Async/Await is working successfully!"
    );

    console.log(message);

}

demonstrateAsync();


// ==========================================
// END OF STUDENTHUB PROJECT
// ==========================================
