<script lang="ts">
import Vue from 'vue'
import BlockForm from '@/components/common/BlockForm.vue'

export default Vue.extend({
  mixins: [BlockForm],
  data() {
    return {
      url: '/api/communities',
      method: 'POST',
      hasBody: true,
      fields: [
        {id: 'name', label: 'Community Name'}
      ],
      title: '🙌 Create New Community',
      callback: () => {
        this.$store.commit('alert', {message: "New community created!", status: 'success'})
      }
    }
  }
})
</script>
