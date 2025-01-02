<template>
  <div class="user-record">
    <div class="user-avatar-section">
      <img v-if="avatar !== ''" :src="avatar" alt="Avatar image for user" class="user-avatar" />
      <div v-else class="no-avatar-image" />
    </div>
    <a :href="userLink" target="_blank" rel="noopener noreferrer"
      >{{ handle }} - {{ activityTime }}</a
    >
    <p>DID: {{ userDid }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { generateUrlForUser, getProfile } from '@/services/bskyHelpers.ts'

export default defineComponent({
  name: 'UserRecord',
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
      avatar: '',
    }
  },
  methods: {
    async getPosterProfile() {
      const profile = await getProfile(this.userDid)
      this.handle = profile.handle ?? 'DELETED USER'
      this.avatar = profile.avatar ?? ''
    },
  },
  computed: {
    userDid() {
      return this.record.value.subject
    },
    activityTime() {
      return new Date(this.activity.value.createdAt).toLocaleString()
    },
    userLink() {
      return generateUrlForUser(this.record.value.subject)
    },
  },
  mounted() {
    this.getPosterProfile()
  },
})
</script>

<style scoped>
.user-record {
  padding: 10px;
  border: 1px solid #aaa;
}

.user-avatar-section {
  .user-avatar {
    width: 50px;
    border-radius: 50%;
  }
}
</style>
