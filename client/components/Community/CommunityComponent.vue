<template>
  <article class="community">
    <h3>&{{ community.name }}</h3>
    <p>
      {{ community.members.length }} members, moderated by
      {{ community.moderators.map((u) => `@${u.username}`).join(", ") }}
    </p>
  </article>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  props: {
    community: {
      type: Object,
      default: () => {},
    },
  },
});
</script>
