<template>
  <article class="community">
    <h3>&{{ community.name }}</h3>
    <p>
      {{ community.members.length }} members, moderated by
      {{ community.moderators.map((u) => `@${u.username}`).join(", ") }}
    </p>
    <section v-if="$store.state.username">
      <h5 class="membership">
        Change community membership:
      </h5>
      <button
        v-if="
          community.members
            .map((u) => u.username)
            .includes($store.state.username)
        "
        @click="changeCommunityMembership(false)"
      >
        ❌ Leave Group
      </button>
      <button
        v-else
        @click="changeCommunityMembership(true)"
      >
        ➕ Join Group
      </button>
    </section>
  </article>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  props: {
    community: {
      type: Object,
      default: () => {},
    },
  },
  methods: {
    async changeCommunityMembership(join) {
      const response = await fetch(`/api/communities/${this.community.name}`, {
        method: join ? "PUT" : "DELETE",
      });
      const message = await response.json();
      if(!response.ok) {
        this.$store.commit('alert', {message: message.error, status: 'error'});
        throw new Error(message.error);
      }
      this.$store.commit('alert', {message: message.message, status: 'success'})
      this.$emit('modified');
    },
  },
});
</script>

<style>
.membership {
  margin-bottom: 0.5rem;
}

.community {
  margin-bottom: 2rem;
}
</style>
