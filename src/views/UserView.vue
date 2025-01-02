<template>
  <div>
    <button class="back-button" @click="goBack">Back</button>

    <div class="top-section">
      <img :src="avatar" alt="User Avatar" class="avatar" />
      <div class="user-info">
        <p class="display-name">{{ displayName }}</p>
        <p><strong>User DID:</strong> {{ did }}</p>
        <p><strong>User Handle:</strong> {{ handle }}</p>
      </div>
    </div>

    <div class="containers">
      <ActivityContainer :did="did" activityType="Post" />

      <ActivityContainer :did="did" activityType="Like" />

      <ActivityContainer :did="did" activityType="Repost" />

      <ActivityContainer :did="did" activityType="Follow" />

      <ActivityContainer :did="did" activityType="Block" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { getProfile } from '@/services/bskyHelpers.ts'
import ActivityContainer from '@/components/ActivityContainer.vue'

export default defineComponent({
  name: 'UserView',
  components: { ActivityContainer },
  props: {
    did: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      pds: '',
      handle: '',
      displayName: '',
      avatar: '',
    }
  },
  async mounted() {
    const query = new URLSearchParams(window.location.search)
    const pds = query.get('pds')
    if (pds) {
      this.pds = pds
    }

    if (this.did) {
      const response = await getProfile(this.did)

      this.handle = response.handle ? '@' + response.handle : this.did
      this.avatar = response.avatar || ''
      this.displayName = response.displayName || ''
    }
  },
  methods: {
    goBack() {
      this.$router.go(-1)
    },
  },
})
</script>

<style scoped>
.top-section {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  position: relative;
}

.back-button {
  position: absolute;
  top: 4em;
  left: 0;
  background-color: transparent;
  border: none;
  font-size: 1rem;
  color: #007bff;
  padding: 12px 16px;
  cursor: pointer;
  text-decoration: none;
}

.back-button:hover {
  text-decoration: underline;
}

.avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 20px;
}

.user-info {
  color: #fff;
  & .display-name {
    font-size: 2em;
  }
}

.containers {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  margin-bottom: 20px;
}
</style>
