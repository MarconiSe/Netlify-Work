let visibleCards = 6; // Number of cards to show initially
let totalCards; // Will hold the total number of cards

// Work Area function to populate cards
async function workArea() {
  const workPromise = await fetch("/.netlify/functions/work");
  const workData = await workPromise.json();
  totalCards = workData.length;
  
  const template = document.querySelector("#work-card-template");
  const wrapper = document.createDocumentFragment();

  workData.forEach((work, index) => {
    const clone = template.content.cloneNode(true);
    clone.querySelector(".card").dataset.category = Array.isArray(work.Category) ? work.Category.join(',') : work.Category; // Handle array or string
    clone.querySelector(".card-title").textContent = work.Name;
    clone.querySelector(".card-description").textContent = work.About;
    
    // Set fallback image if no photo is provided
    if (!work.Photo || work.Photo.trim() === "") {
      work.Photo = "src/img/fallbackworkimage.png";
    }
    clone.querySelector("img").src = work.Photo;

    clone.querySelector(".card").style.display = (index < visibleCards) ? "block" : "none"; // Only show the first 6
    wrapper.appendChild(clone);
  });

  document.querySelector(".work-section").appendChild(wrapper); // Append all cards at once
}

// Show more functionality
document.getElementById('showMoreButton').addEventListener('click', function () {
  const cards = document.querySelectorAll('.card');
  visibleCards += 6; // Show 6 more
  cards.forEach((card, index) => {
    if (index < visibleCards) {
      card.style.display = "block"; // Show the next set of cards
    }
  });

  // If all cards are shown, hide the "Show More" button and display "Collapse"
  if (visibleCards >= totalCards) {
    this.classList.add('hidden'); // Hide the "Show More" button
    document.getElementById('collapseButton').classList.remove('hidden'); // Show the "Collapse" button
  }
});

// Collapse functionality
document.getElementById('collapseButton').addEventListener('click', function () {
  const cards = document.querySelectorAll('.card');
  visibleCards = 6; // Collapse to the initial 6 cards
  cards.forEach((card, index) => {
    card.style.display = (index < visibleCards) ? "block" : "none"; // Show only the first 6
  });

  // Show the "Show More" button again and hide the "Collapse" button
  document.getElementById('showMoreButton').classList.remove('hidden');
  this.classList.add('hidden'); // Hide the "Collapse" button
});

// Call the function to display initial cards
workArea();
