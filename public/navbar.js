class MyNavbar extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <nav class="w-full max-w-[1536px] py-4 px-8 lg:px-24 lg:py-6 md:px-10 md:py-4">
        <div class="flex justify-between items-center">
          <div>
            <picture class="block w-full">
              <source media="(min-width: 640px)" srcset="src/img/default-horizontal.png">
              <img src="src/img/default.png" alt="Logo" class="w-[110px] sm:w-[200px] h-auto object-cover">
            </picture>
          </div>
          <div>
            <!-- Hamburger Button -->
            <button id="menuButton" class="block relative z-50"> <!-- Add z-50 to ensure it's above the menu -->
              <!-- Hamburger Icon -->
              <svg id="menuIcon" class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>     
          </div>
        </div>

        <!-- Mobile Menu (Hidden by default) -->
        <div id="mobileMenu" class="hidden fixed top-0 left-0 w-full h-[75vh] bg-white text-black z-40 flex flex-col items-center justify-center"> <!-- Use z-40 to keep it below the button -->
          <ul class="text-black text-xl">
            <li class="py-4"><a href="#home">Home</a></li>
            <li class="py-4"><a href="#about">About Us</a></li>
            <li class="py-4"><a href="#services">Services</a></li>
            <li class="py-4"><a href="#contact">Contact</a></li>
          </ul>
        </div>
      </nav>
    `;

    const menuButton = this.querySelector('#menuButton');
    const mobileMenu = this.querySelector('#mobileMenu');
    const menuIcon = this.querySelector('#menuIcon');
    let menuOpen = false;

    menuButton.addEventListener('click', function () {
      mobileMenu.classList.toggle('hidden');
      menuOpen = !menuOpen;

      // Toggle between hamburger icon and close icon
      if (menuOpen) {
        menuIcon.innerHTML = `
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>`;
      } else {
        menuIcon.innerHTML = `
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>`;
      }
    });
  }
}

// Define the custom element
customElements.define('my-navbar', MyNavbar);
