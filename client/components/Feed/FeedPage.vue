<template>
  <main>
    <article>
      <h1>Your Feed on Fritter, @{{ $store.state.username }}</h1>
      <p>Based on your follows and communities, loaded {{ loaded && loaded.toLocaleString() }}</p>
      <p>
        <b>Want the latest?</b> 
        <button
          class="refresh"
          @click="showRefresh = !showRefresh"
        >
          {{ showRefresh ? "❌ Close" : "🔃 Refresh your feed" }}
        </button>
      </p>
      <NewFeed
        v-if="showRefresh"
        @refreshed="loadFeed(1)"
      />
    </article>
    <section>
      <FreetComponent
        v-for="freet in freets"
        :key="freet.id"
        :freet="freet"
      />
      <div class="pagination">
        <button @click="loadFeed(page - 1)">
          ⬅️ Previous Page
        </button>
        <p>Page {{ page }}</p>
        <button @click="loadFeed(page + 1)">
          Next Page ➡️
        </button>
      </div>
    </section>
  </main>
</template>

<script lang="ts">
import Vue from 'vue'
import FreetComponent from '@/components/Freet/FreetComponent.vue'
import NewFeed from './NewFeed.vue'

export default Vue.extend({
  components: { FreetComponent, NewFeed },
  data() {
    return {
      freets: [],
      page: 1,
      loaded: null,
      showRefresh: false,
    }
  },
  mounted() {
    this.loadFeed(this.page)
  },
  methods: {
    async loadFeed(page) {
      if(page < 1) return;
      const response = await fetch(`/api/feed?page=${page}`)
      const message = await response.json()
      if(!response.ok) {
        this.$store.commit('alert', {message: message.error, status: 'error'})
        throw new Error(message.error)
      }

      this.freets = message.freets
      this.page = page
      this.loaded = new Date(message.loaded)
      this.showRefresh = false
    }
  }
})

</script>

<style scoped>
.pagination {
  display: flex;
  flex-direction: row;
  gap: 1rem;
  justify-content: center;
}

.refresh {
  margin-left: 1rem;
}
</style>