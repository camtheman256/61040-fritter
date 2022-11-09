<!-- Default page that also displays freets -->

<template>
  <main>
    <section v-if="$store.state.username">
      <header>
        <h2>Welcome to Fritter, @{{ $store.state.username }}</h2>
      </header>
      <CreateFreetForm />
    </section>
    <section v-else>
      <header>
        <h2>Welcome to Fritter!</h2>
      </header>
      <article>
        <h3>
          <router-link to="/login">
            Sign in
          </router-link>
          to create, edit, and delete freets.
        </h3>
      </article>
    </section>
    <section>
      <router-link to="/community">
        Explore communities &rarr;
      </router-link>
      <router-link to="/freets">
        Explore users and freets &rarr;
      </router-link>
    </section>
  </main>
</template>

<script>
import CreateFreetForm from '@/components/Freet/CreateFreetForm.vue';

export default {
  name: 'FreetPage',
  components: {CreateFreetForm},
};
</script>

<style scoped>
section {
  display: flex;
  flex-direction: column;
}

header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

h3 {
  font-weight: 400;
}

button {
    margin-right: 10px;
}

section .scrollbox {
  flex: 1 0 50vh;
  padding: 3%;
  overflow-y: scroll;
}
</style>
