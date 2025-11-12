console.log("JS is connected!");

const jobs = [
  { title: "Frontend Developer", company: "TechNova", location: "Remote", description: "Work with React, Tailwind, and APIs." },
  { title: "UI Designer", company: "PixelCraft", location: "Accra", description: "Design clean, modern interfaces." },
  { title: "Backend Developer", company: "CodeBase", location: "Lagos", description: "Node.js, MongoDB, REST APIs." },
  { title: "Fullstack Developer", company: "DevWorks", location: "Remote", description: "Build end-to-end web applications using JS and Node." },
  { title: "Remote Frontend Developer", company: "NaijaTech Solutions", location: "Remote", description: "Build responsive websites using React.js and modern frontend tools." },
  { title: "Remote Backend Developer", company: "LagosCode", location: "Remote", description: "Work on Node.js and MongoDB backend systems for client projects." },
  { title: "Remote UI/UX Designer", company: "DesignHive NG", location: "Remote", description: "Design intuitive interfaces and user experiences for web and mobile apps." },
  { title: "Remote Data Analyst", company: "DataWorks Nigeria", location: "Remote", description: "Analyze data trends using Python, SQL, and visualization tools." },
  { title: "Remote Digital Marketing Specialist", company: "BrandBoost NG", location: "Remote", description: "Manage campaigns, social media, and SEO for multiple clients." },
  { title: "Remote Content Writer", company: "WriteSmart Nigeria", location: "Remote", description: "Create engaging content for blogs, websites, and social media platforms." },
  { title: "Remote Fullstack Developer", company: "CodeFront NG", location: "Remote", description: "Work on end-to-end web applications using JavaScript, Node.js, and React." },
  { title: "Frontend Engineer", company: "AbujaTech", location: "Remote", description: "Develop scalable front-end solutions using React." },
  { title: "Remote QA Tester", company: "Testify NG", location: "Remote", description: "Perform testing for web and mobile applications." },
  { title: "Remote DevOps Engineer", company: "CloudWorks NG", location: "Remote", description: "Manage deployment pipelines and server infrastructure." },
  { title: "Remote Mobile App Developer", company: "AppCraft NG", location: "Remote", description: "Build cross-platform mobile applications with Flutter." }
];

const searchInput = document.getElementById("searchInput");
const jobList = document.getElementById("jobList");
const locationFilter = document.getElementById("locationFilter");

/* -----------------------------
   Display jobs function
----------------------------- */
function displayJobs(list) {
  jobList.innerHTML = "";
  if(list.length === 0) {
    const noJobs = document.createElement("div");
    noJobs.className = "no-jobs";
    noJobs.textContent = "No jobs found matching your search.";
    jobList.appendChild(noJobs);
    return;
  }

  list.forEach((job, index) => {
    const card = document.createElement("div");
    card.className = "job-card";

    const remoteBadge = job.location === "Remote" ? `<span class="remote-badge">Remote</span>` : "";

    card.innerHTML = `
      <h3>${job.title} ${remoteBadge}</h3>
      <p><strong>Company:</strong> ${job.company}</p>
      <p><strong>Location:</strong> ${job.location}</p>
      <p>${job.description}</p>
    `;

    // Initial opacity 0 for fade-in
    card.style.opacity = '0';
    card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    card.style.transform = 'translateY(20px)';

    jobList.appendChild(card);
  });
}

/* -----------------------------
   Filter jobs
----------------------------- */
function filterJobs() {
  const search = searchInput.value.toLowerCase();
  const location = locationFilter.value;

  const filtered = jobs.filter(job => {
    const matchTitle = job.title.toLowerCase().includes(search);
    const matchLocation = location ? job.location === location : true;
    return matchTitle && matchLocation;
  });

  displayJobs(filtered);
  showSuggestions(filtered);
}

/* -----------------------------
   Search suggestions
----------------------------- */
function showSuggestions(filteredJobs) {
  const oldList = document.getElementById("suggestions");
  if (oldList) oldList.remove();
  if (!searchInput.value) return;

  const suggestionList = document.createElement("ul");
  suggestionList.id = "suggestions";
  suggestionList.style.listStyle = 'none';
  suggestionList.style.padding = '5px';
  suggestionList.style.border = '1px solid #ccc';
  suggestionList.style.background = 'white';
  suggestionList.style.position = 'absolute';
  suggestionList.style.width = searchInput.offsetWidth + 'px';
  suggestionList.style.zIndex = '1000';
  suggestionList.style.maxHeight = '150px';
  suggestionList.style.overflowY = 'auto';

  filteredJobs.forEach(job => {
    const item = document.createElement("li");
    item.textContent = job.title;
    item.style.padding = '5px';
    item.style.cursor = 'pointer';
    item.addEventListener('click', () => {
      searchInput.value = job.title;
      filterJobs();
      suggestionList.remove();
    });
    suggestionList.appendChild(item);
  });

  searchInput.parentNode.appendChild(suggestionList);
}

/* -----------------------------
   MutationObserver for fade-in
----------------------------- */
const observer = new MutationObserver((mutationsList) => {
  mutationsList.forEach(mutation => {
    if (mutation.type === 'childList') {
      mutation.addedNodes.forEach((node, index) => {
        if (node.classList && node.classList.contains('job-card')) {
          // Trigger fade-in animation
          setTimeout(() => {
            node.style.opacity = '1';
            node.style.transform = 'translateY(0)';
          }, index * 50); // staggered animation
        }
      });
    }
  });
});

// Observe jobList for added child nodes
observer.observe(jobList, { childList: true });

/* -----------------------------
   Event listeners
----------------------------- */
searchInput.addEventListener('input', filterJobs);
locationFilter.addEventListener('change', filterJobs);

// Initial display
displayJobs(jobs);
