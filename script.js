
function greeting() {
  const greetingElement = document.getElementById("greeting");
  if (greetingElement) greetingElement.textContent = "Welcome to FutureStar High School!";
}
window.onload = greeting;

// Profile
function showEmail() {
  const email = document.getElementById("email");
  if (email) email.style.display = "block";
}

function showPhone() {
  const phone = document.getElementById("phone");
  if (phone) phone.style.display = "block";
}

function hideContact() {
  const email = document.getElementById("email");
  const phone = document.getElementById("phone");
  if (email) email.style.display = "none";
  if (phone) phone.style.display = "none";
}

function updateStatus() {
  const newStatus = document.getElementById("statusInput").value.trim().toLowerCase();
  const statusElement = document.getElementById("status");
  if (newStatus === "active" || newStatus === "suspended") {
    statusElement.innerHTML = `Status: <span style="color:${newStatus === "active" ? "green" : "red"}">${newStatus}</span>`;
  } else {
    showPopup("Please enter either 'Active' or 'Suspended'.");
  }
}

// Attach event listeners...
document.addEventListener("DOMContentLoaded", () => {
  const emailBtn = document.getElementById("emailBtn");
  const phoneBtn = document.getElementById("phoneBtn");
  const hideBtn = document.getElementById("hideBtn");
  const updateBtn = document.getElementById("updateStatusBtn");

  if (emailBtn) emailBtn.addEventListener("click", showEmail);
  if (phoneBtn) phoneBtn.addEventListener("click", showPhone);
  if (hideBtn) hideBtn.addEventListener("click", hideContact);
  if (updateBtn) updateBtn.addEventListener("click", updateStatus);
});

// Profile Page Functionality
window.addEventListener("DOMContentLoaded", function () {
  const emailBtn = document.getElementById("showEmail");
  const phoneBtn = document.getElementById("showPhone");
  const hideBtn = document.getElementById("hideContact");
  const contactPara = document.getElementById("contact");

  const updateStatusBtn = document.getElementById("updateStatusBtn");
  const statusInput = document.getElementById("statusInput");
  const statusText = document.getElementById("status");

  if (emailBtn && phoneBtn && hideBtn && contactPara) {
    emailBtn.addEventListener("click", () => {
      contactPara.textContent = "Email: amina.khan@example.com";
    });

    phoneBtn.addEventListener("click", () => {
      contactPara.textContent = "Phone: +93 700 123 456";
    });

    hideBtn.addEventListener("click", () => {
      contactPara.textContent = "";
    });
  }

  if (updateStatusBtn && statusInput && statusText) {
    updateStatusBtn.addEventListener("click", () => {
      const newStatus = statusInput.value.trim().toLowerCase();
      if (newStatus === "active" || newStatus === "suspended") {
        const color = newStatus === "active" ? "green" : "red";
        statusText.innerHTML = `Status: <span style="color:${color}; text-transform: capitalize;">${newStatus}</span>`;
        statusInput.value = "";
      } else {
       showPopup("Please enter either 'Active' or 'Suspended'.");

      }
    });
  }
});

// courses
const defaultCourses = [
  // Grade 10
  { name: "Biology", grade: 10, details: "Cell structure and life systems" },
  { name: "English", grade: 10, details: "Grammar, reading comprehension, and writing skills" },
  { name: "Chemistry", grade: 10, details: "Atoms, molecules, and chemical reactions" },
  { name: "History", grade: 10, details: "World history and civilizations" },
  { name: "Mathematics", grade: 10, details: "Algebra, geometry, and trigonometry" },
  { name: "Computer Science", grade: 10, details: "Basic programming concepts and web development" },
  // Grade 11
  { name: "Mathematics", grade: 11, details: "Advanced algebra and geometry" },
  { name: "Computer Science", grade: 11, details: "HTML, CSS, and JavaScript basics" },
  { name: "Physics", grade: 11, details: "Forces, motion, and energy principles" },
  { name: "Geography", grade: 11, details: "Earth systems and human-environment interactions" },
  { name: "Literature", grade: 11, details: "Classic and modern texts with critical analysis" },
  { name: "Pashto", grade: 11, details: "Language structure, poetry, and cultural expression" },
];

// default courses
let courses = [...defaultCourses];

let currentGrade = null;

function renderCourses(list = []) {
  const courseList = document.getElementById("courseList");
  if (!courseList) return;
  courseList.innerHTML = "";
  list.forEach((course) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <strong>${course.name}</strong> (Grade ${course.grade})
      <button onclick="showPopup('${course.details}')">Show Course Details</button>
    `;
    courseList.appendChild(li);
  });
}

function addCourse() {
  const name = document.getElementById("newCourse").value.trim();
  const grade = parseInt(document.getElementById("newGrade").value);

  if (!name || isNaN(grade)) {
    return showPopup("⚠️ Please fill both fields correctly.");
  }

  if (grade !== 10 && grade !== 11) {
    return showPopup("⚠️ We currently support only Grade 10 and Grade 11.");
  }

  const newCourse = { name, grade, details: "No additional details." };
  courses.push(newCourse); 

  if (grade === currentGrade) {
    renderCourses(courses.filter(c => c.grade === currentGrade));
    showPopup(`✅ Course added to Grade ${grade}.`);
  } else {
    showPopup(`✅ Course added to Grade ${grade}. Click 'Grade ${grade}' to view it.`);
  }

  document.getElementById("newCourse").value = "";
  document.getElementById("newGrade").value = "";
}

function filterCourses(grade) {
  currentGrade = grade;
  const filtered = courses.filter(c => c.grade === grade);
  renderCourses(filtered);
}

function showPopup(message) {
  const existing = document.querySelector(".popup");
  if (existing) existing.remove();

  const popup = document.createElement("div");
  popup.className = "popup show";
  popup.innerHTML = `
    <div class="popup-content">
      <p>${message}</p>
      <button onclick="this.closest('.popup').remove()">OK</button>
    </div>
  `;
  document.body.appendChild(popup);
}

// Show 2 courses from each grade on page load
window.addEventListener("DOMContentLoaded", () => {
  const previewCourses = [];

  const grade10 = defaultCourses.filter(c => c.grade === 10).slice(0, 3);
  const grade11 = defaultCourses.filter(c => c.grade === 11).slice(0, 3);

  previewCourses.push(...grade10, ...grade11);
  renderCourses(previewCourses);
});

// Contact
function sendMessage(e) {
  e.preventDefault();
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();
  if (!name || !email || !message) {
    showPopup("Please fill in all fields.");
  } else {
    showPopup("Message sent successfully!");
    e.target.reset();
  }
}

// Theme Toggle
const toggleBtn = document.getElementById("theme-toggle");
const body = document.body;

function setThemeIcon() {
  if (!toggleBtn) return;
  toggleBtn.textContent = body.classList.contains("dark-mode") ? "☀️" : "🌙";
}

if (localStorage.getItem("theme") === "dark") {
  body.classList.add("dark-mode");
  setThemeIcon();
}

if (toggleBtn) {
  toggleBtn.addEventListener("click", () => {
    body.classList.toggle("dark-mode");
    localStorage.setItem("theme", body.classList.contains("dark-mode") ? "dark" : "light");
    setThemeIcon();
  });
}

// Hamburger toggle
const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");
if (hamburger && navLinks) {
  hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("show");
  });
}

// Custom popup
function showPopup(message) {
  let popup = document.querySelector(".popup");
  if (!popup) {
    popup = document.createElement("div");
    popup.classList.add("popup");
    popup.innerHTML = `
      <p id="popupMessage"></p>
      <button onclick="this.parentElement.classList.remove('show')">OK</button>
    `;
    document.body.appendChild(popup);
  }
  popup.querySelector("#popupMessage").textContent = message;
  popup.classList.add("show");
}

// Init courses if on courses page
document.addEventListener("DOMContentLoaded", () => {
  if (document.getElementById("courseList")) {
    renderCourses();
  }
});

