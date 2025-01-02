<template>
  <div class="post-record">
    <a :href="postLink" target="_blank" rel="noopener noreferrer"
      >{{ handle }} - {{ activityTime }}</a
    >
    <p>{{ postText }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { extractDID, getHandle, generateUrlForPost } from '@/services/bskyHelpers.ts'

export default defineComponent({
  name: 'PostRecord',
  props: {
    record: {
      type: Object,
      required: true,
    },
    activity: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      handle: '',
    }
  },
  methods: {
    async getPosterHandle() {
      const did = extractDID(this.record.uri)
      this.handle = await getHandle(did)
    },
  },
  computed: {
    postText() {
      return this.record.value.text
    },
    activityTime() {
      return new Date(this.activity.value.createdAt).toLocaleString()
    },
    postLink() {
      return generateUrlForPost(this.record.uri)
    },
  },
  mounted() {
    this.getPosterHandle()
  },
})
</script>

<style scoped>
.post-record {
  padding: 10px;
  border: 1px solid #aaa;
}
</style>
