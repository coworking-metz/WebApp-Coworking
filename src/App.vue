<template>
  <section class="hero is-fullheight" style="background-color: #f2af10">
    <div class="hero-body">
      <div class="container">
        <div class="columns is-centered">
          <div class="column  is-5-widescreen">
            <div align="center" class="mb-4">
              <a href="https://coworking-metz.fr">
                <img alt="Coworking logo" src="./assets/logo.png" style="width: 100%" />
              </a>
            </div>
            <router-view />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<style  >
.media-content {
  overflow: initial !important;
}
</style>
