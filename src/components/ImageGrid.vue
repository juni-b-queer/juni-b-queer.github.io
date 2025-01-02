<template>
  <div class="image-grid">
    <div v-for="userInfo in teamDids" :key="userInfo.did">
      <UserLink :did="userInfo.did" :pds="userInfo?.pds" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import UserLink from '@/components/UserLink.vue'

export default defineComponent({
  name: 'ImageGrid',
  components: {
    UserLink,
  },
  data() {
    return {
      teamDids: [
        { did: 'did:plc:wpp4lklhvmopw6zcy6qb42ru' },
        { did: 'did:plc:ksjfbda7262bbqmuoly54lww' },
        { did: 'did:plc:oky5czdrnfjpqslsw2a5iclo' },
        { did: 'did:plc:qjeavhlw222ppsre4rscd3n2' },
        { did: 'did:plc:linrigsaay5zenhg756ca6tg' },
        { did: 'did:plc:tl7zqgil2irwndwojsxszceb' },
        { did: 'did:plc:vpkhqolt662uhesyj6nxm7ys' },
        { did: 'did:plc:3jpt2mvvsumj2r7eqk4gzzjz' },
        { did: 'did:plc:44ybard66vv44zksje25o7dz' },
        { did: 'did:plc:yk4dd2qkboz2yv6tpubpc6co', pds: 'https://pds.dholms.xyz' },
        { did: 'did:plc:vzmlifz3ghar4cu2hj3srga2' },
        { did: 'did:plc:l3rouwludahu3ui3bt66mfvj' },
        { did: 'did:plc:vjug55kidv6sye7ykr5faxxn' },
        { did: 'did:plc:ragtjsm2j2vknwkz3zp4oxrd' },
        { did: 'did:plc:p2cp5gopk7mgjegy6wadk3ep' },
        { did: 'did:plc:q6gjnaw2blty4crticxkmujt' },
        { did: 'did:plc:oisofpd7lj26yvgiivf3lxsi', pds: 'https://pds.haileyok.com' },
      ],
    }
  },
})
</script>

<style scoped>
.image-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 20px;
  place-items: center;
  padding-bottom: 36px;
}

.grid-item {
  text-align: center;
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
</style>
