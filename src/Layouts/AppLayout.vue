<template>
  <div class="layout-container">
    <!-- Navigation Bar -->
    <header class="navbar">
      <nav>
        <ul>
          <li class="nav-title">Bluesky team activity tracker</li>
          <li class="nav-item">
            <router-link to="/home" active-class="router-link-active">Home</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/team-members" active-class="router-link-active"
              >Team Members</router-link
            >
          </li>
        </ul>
      </nav>
    </header>

    <!-- Main Content -->
    <main class="content">
      <router-view />
    </main>

    <!-- Footer -->
    <footer class="custom-footer">
      <div class="footer-content">
        <a class="footer-text">Unofficial program written by @literallyjustadog.online</a>
        <a
          href="https://github.com/juni-b-queer/juni-b-queer.github.io"
          class="footer-link"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src="@/assets/github-mark.svg" alt="Website 1" class="footer-icon" />
        </a>
        <a
          href="https://bsky.app/profile/literallyjustadog.online"
          class="footer-link"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src="@/assets/bsky-logo.svg" alt="Website 2" class="footer-icon" />
        </a>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
/* Root layout ensures no scrollbars */
.layout-container {
  display: flex;
  flex-direction: column;
  //min-height: 100vh; /* Ensure the layout spans the full viewport height */
  width: 100%;
  overflow: hidden; /* Prevent unwanted scrollbars */
  box-sizing: border-box;
}

/* Navbar */
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%; /* Full width */
  background-color: #f5f5f5;
  border-bottom: 1px solid #ddd;
  padding: 1rem;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 10;
  box-sizing: border-box;
}

.navbar nav ul {
  display: flex;
  justify-content: space-between;
  align-items: center;
  list-style: none;
  margin: 0;
  padding: 0;
  width: 100%;
}

.nav-title {
  font-size: 1.25rem;
  font-weight: bold;
  color: #007bff;
  margin-right: auto;
}

.nav-item {
  margin-left: 1rem;
  & a {
    text-decoration: none;
    font-weight: normal;
    color: #000;
    transition:
      color 0.3s ease,
      font-weight 0.3s ease;
    padding: 8px;
    border-radius: 4px;
  }

  & a:hover {
    background-color: #007bff;
    color: #fff;
  }
}

::v-deep(.router-link-active) {
  font-weight: bold;
  color: #fff !important;
  background-color: #007bff;
}

/* Content: Avoid overlapping and allow proper flex behavior */
.content {
  flex: 1; /* Take up remaining space */
  width: 100%; /* Ensure full width */
  padding: 1rem;
  margin-top: 72px; /* Account for fixed navbar height */
  box-sizing: border-box;
  overflow: auto; /* Allow internal scrolling if content overflows */
}

/* Footer */
.custom-footer {
  background-color: #f5f5f5;
  border-top: 1px solid #ddd;
  padding: 0.5rem 1rem;
  text-align: center;
  box-sizing: border-box;
  flex-shrink: 0; /* Prevent the footer from shrinking */
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%; /* Full width */
  //border-bottom: 1px solid #ddd;
  //box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 10;
}

.footer-content {
  display: flex;
  gap: 10px;
  align-items: center;
  justify-content: center;
}

.footer-icon {
  width: 36px;
  //height: 24px;
}

.footer-link:hover {
  background-color: #f5f5f5;
}

.footer-text {
  color: #007bff;
}

/* Reset html and body dimensions to prevent scrollbars */
html,
body {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  overflow: hidden; /* Remove potential scrollbars on body */
}
</style>
