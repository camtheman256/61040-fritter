<template>
  <button
    v-if="isFollowing"
    @click="toggleFollow(false)"
  >
    ➖ Unfollow @{{ user }}
  </button>
  <button
    v-else
    @click="toggleFollow(true)"
  >
    ➕ Follow @{{ user }}
  </button>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  props: {
    user: {
      type: String,
      default: "",
    },
    isFollowing: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    async toggleFollow(follow) {
      const response = await fetch(
        `/api/users/${this.user}/followers`,
        {
          method: follow ? "PATCH" : "DELETE",
        }
      );
      const message = await response.json();
      if (!response.ok) {
        this.$store.commit("alert", {
          message: message.error,
          status: "error",
        });
        throw new Error(message.error);
      }
      this.$store.commit("alert", {
        message: message.message,
        status: "success",
      });

      fetch("/api/users/session", {
        credentials: "same-origin", // Sends express-session credentials with request
      })
        .then((res) => res.json())
        .then((res) => {
          const user = res.user;
          this.$store.commit("setUsername", user ? user : null);
        });
    },
  },
});
</script>
