document.getElementById('dropdownButton').addEventListener('click', function () {
  const menu = document.getElementById('dropdownMenu');
  menu.classList.toggle('hidden'); // Toggle the menu visibility
});

function filterProjects(category) {
  const cards = document.querySelectorAll('.card');
  cards.forEach(card => {
    if (category === "All" || card.dataset.category === category) {
      card.style.display = "block"; // Show the card
    } else {
      card.style.display = "none"; // Hide the card
    }
  });
}

// Event listener for radio button changes
document.querySelectorAll('input[name="option"]').forEach(radio => {
  radio.addEventListener('change', function () {
    const category = this.value; // Get selected value
    filterProjects(category); // Filter projects
    document.getElementById('dropdownMenu').classList.add('hidden'); // Close dropdown
  });
});

// Work Area function to populate cards
async function workArea() {
  const workPromise = await fetch("/.netlify/functions/work");
  const workData = await workPromise.json();
  const template = document.querySelector("#work-card-template");
  const wrapper = document.createDocumentFragment();

  workData.forEach(work => {
    const clone = template.content.cloneNode(true);
    clone.querySelector(".card").dataset.category = work.Category; // Assign category to card
    clone.querySelector(".card-title").textContent = work.Name;
    clone.querySelector(".card-description").textContent = work.About;
    
    // Set fallback image if no photo is provided
    if (!work.Photo || work.Photo.trim() === "") {
      work.Photo = "src/img/fallbackworkimage.png";
    }
    clone.querySelector("img").src = work.Photo;

    wrapper.appendChild(clone); // Append the cloned card to wrapper
  });

  document.querySelector(".work-section").appendChild(wrapper); // Append all cards at once
}

workArea(); // Call the function to display cards