<template>
  <main>
    <section v-if="$store.state.username">
      <header>
        <h2>@{{ $store.state.username }}, see what's happening on Fritter</h2>
      </header>
      <CreateFreetForm />
    </section>
    <section>
      <header>
        <div class="left">
          <h2>
            Viewing all freets
            <span v-if="$store.state.filter">
              by @{{ $store.state.filter }}
            </span>
          </h2>
          <div v-if="$store.state.username">
            <p v-if="$store.state.filter && $store.state.filter != $store.state.username">
              <FollowUserButton
                :is-following="$store.state.following.some((u) => u.username === $store.state.filter)"
                :user="$store.state.filter"
              />
            </p>
            <p v-else>
              To follow someone, first look up their freets.
            </p>
          </div>
        </div>
        <div class="right">
          <GetFreetsForm
            ref="getFreetsForm"
            value="author"
            placeholder="🔍 Filter by author (optional)"
            button="🔄 Get freets"
          />
        </div>
      </header>
      <section
        v-if="$store.state.freets.length"
      >
        <FreetComponent
          v-for="freet in $store.state.freets"
          :key="freet.id"
          :freet="freet"
        />
      </section>
      <article
        v-else
      >
        <h3>No freets found.</h3>
      </article>
    </section>
  </main>
</template>
<script lang="ts">
import Vue from 'vue'
import FreetComponent from '@/components/Freet/FreetComponent.vue';
import CreateFreetForm from '@/components/Freet/CreateFreetForm.vue';
import GetFreetsForm from '@/components/Freet/GetFreetsForm.vue';
import FollowUserButton from '@/components/Account/FollowUserButton.vue';


export default Vue.extend({
  name: 'FreetView',
  components: {FreetComponent, GetFreetsForm, CreateFreetForm, FollowUserButton},
  mounted() {
    this.$refs.getFreetsForm.submit();
  }
})
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