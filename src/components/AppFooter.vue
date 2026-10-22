<template>
  <footer class="footer">
    <div class="wrap">
      <div class="footer__grid">
        <div>
          <div class="brand">Explore Naypyitaw</div>
          <p>A curated guide to food, cafés and places worth knowing in Naypyitaw. Listings are demo content for now.</p>
        </div>
        <div><h2>Explore</h2><ul>
          <li><RouterLink to="/">Discover</RouterLink></li>
          <li><RouterLink to="/restaurants">Restaurants</RouterLink></li>
          <li><RouterLink to="/restaurants?category=cafes">Cafés</RouterLink></li>
          <li><RouterLink to="/#collections">Collections</RouterLink></li>
        </ul></div>
        <div><h2>Get in touch</h2><ul><li><a href="mailto:hello@example.com">Send feedback</a></li></ul></div>
      </div>
      <small>© {{ new Date().getFullYear() }} Explore Naypyitaw. All rights reserved.</small>
    </div>
  </footer>
</template>
