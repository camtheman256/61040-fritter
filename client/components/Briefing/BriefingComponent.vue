<template>
  <article>
    <h1>
      Your Briefing
    </h1>
    <p>
      Showing Freets from the last {{ timeframe }} hours.
    </p>
    <div
      v-if="freets.length === 0"
      class="empty"
    >
      😔 Sorry, we couldn't find any Freets for you!
      <p>Use the links above to explore communities and follow users to get more Freets in your feed.</p>
    </div>
    <FreetComponent
      v-for="freet in freets"
      :key="freet.id"
      :freet="freet"
    />
  </article>
</template>

<script lang="ts">
import Vue from 'vue'
import FreetComponent from '@/components/Freet/FreetComponent.vue'

export default Vue.extend({
  components: {FreetComponent},
  data() {
    return {
      freets: [],
      timeframe: 12,
    }
  },
  async mounted() {
    this.fetchBriefing()
  },
  methods: {
    async fetchBriefing() {
      const request = await fetch(`/api/briefing?hours=${this.timeframe}`)
      const response = await request.json()
      this.freets = response.freets;
    }
  }
})
</script>

<style scoped>
.empty {
  text-align: center;
  color: gray;
}
.empty > p {
  font-size: medium;
}
</style>