<template>
  <div class="grid-item" @click="goToUserView()">
    <img :src="avatar" alt="Image" class="grid-image" />
    <a class="grid-label juni" v-if="did === 'did:plc:wpp4lklhvmopw6zcy6qb42ru'"
      >Not a bsky employee</a
    >
    <a class="grid-label">{{ handle }}</a>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { getProfile } from '@/services/bskyHelpers.ts'

export default defineComponent({
  name: 'UserLink',
  props: {
    did: {
      type: String,
      required: true,
    },
    pds: {
      type: String,
      required: false,
    },
  },
  data() {
    return {
      handle: '',
      avatar: '',
    }
  },
  methods: {
    goToUserView() {
      console.log(this.pds)
      const query = this.pds ? { pds: this.pds } : {}
      this.$router.push({ name: 'user', params: { did: this.did }, query })
    },
  },
  async mounted() {
    if (this.did) {
      const response = await getProfile(this.did)

      if (response.handle) {
        this.handle = '@' + response.handle
      } else {
        this.handle = this.did
      }

      if (response.avatar) {
        this.avatar = response.avatar
      }
    }
  },
})
</script>

<style scoped>
.grid-item {
  text-align: center;
  padding: 8px;
  border-radius: 4px;
  transition: 0.3s;
}

.grid-item:hover {
  cursor: pointer;
  background-color: #007bff;
  border-radius: 4px;
  & .grid-label {
    color: black;
  }
}
.grid-image {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
}

.grid-label {
  margin-top: 4px;
  display: block;
}

.juni {
  font-weight: 600;
}
</style>
