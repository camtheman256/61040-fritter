<template>
  <main>
    <h1>Explore Communities on Fritter</h1>
    <section>
      <h4>Pick a community to explore:</h4>
      <form @submit.prevent="getCommunity">
        <b>&</b>
        <input
          v-model="community"
          type="text"
          placeholder="community"
        >
        <button type="submit">
          👥 Explore
        </button>
      </form>
    </section>
    <section v-if="display">
      <CommunityComponent :community="display.community" />
    </section>
  </main>
</template>

<script lang="ts">
import CommunityComponent from "./CommunityComponent.vue";

export default {
  components: { CommunityComponent },
  data() {
    return {
      community: "",
      display: null,
    };
  },
  methods: {
    async getCommunity() {
      if (!this.community) return;
      const response = await fetch(`/api/communities/${this.community}`);
      const message = await response.json();
      if (!response.ok) {
        this.$store.commit('alert', {message: message.error, status: 'error'});
        throw new Error(message.error);
      }
      this.display = message;
    },
  },
};
</script>

<style scoped>
input {
  font-family: inherit;
  font-size: inherit;
  margin-right: 10px;
}

form {
  margin-bottom: 2rem;
}

.community {
  border-radius: 5px;
  border: 1px solid black;
  padding: 10px;
}
</style>
