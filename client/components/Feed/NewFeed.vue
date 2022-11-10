<script lang="ts">
import Vue from 'vue'
import BlockForm from '@/components/common/BlockForm.vue'

export default Vue.extend({
  mixins: [BlockForm],
  data() {
    return {
      url: '/api/feed',
      method: 'POST',
      hasBody: true,
      fields: [
        {id: 'freets', label: 'Number of Freets', type: 'int'},
        {id: 'page_length', label: 'Page Length', type: 'int'}
      ],
      title: '🔃 Refresh your Feed',
      callback() {
        this.$emit('refreshed')
      }
    }
  }
})
</script>