<template>
  <div class="container-section">
    <h3 class="container-header">{{ activityType }}s</h3>
    <div class="container">
      <div
        v-if="
          activity.length > 0 &&
          (activityType === 'Like' || activityType == 'Post' || activityType == 'Repost')
        "
        class="activity-list"
      >
        <PostRecord
          v-for="(item, index) in activity"
          :key="index"
          :activity="item.activity"
          :record="item.record"
        />
        <div class="load-more-button" @click="loadMore()">Load More...</div>
      </div>
      <div
        v-else-if="activity.length > 0 && (activityType === 'Block' || activityType == 'Follow')"
        class="activity-list"
      >
        <UserRecord
          v-for="(item, index) in activity"
          :key="index"
          :activity="item.activity"
          :record="item.record"
        />
        <div v-if="canLoadMore" class="load-more-button" @click="loadMore()">Load More...</div>
        <div v-else>No more {{ activityType.toLowerCase() }}s to load</div>
      </div>
      <p v-else>No {{ activityType.toLowerCase() }}s available.</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import {
  getActorLikes,
  getActorPosts,
  getActorReposts,
  getRecord,
  getActorBlocks,
  getActorFollows,
} from '@/services/bskyHelpers.ts'
import PostRecord from '@/components/PostRecord.vue'
import UserRecord from '@/components/UserRecord.vue'

interface ActivityItem {
  activity: object
  record: object
}

export default defineComponent({
  name: 'ActivityContainer',
  components: { UserRecord, PostRecord },
  props: {
    did: {
      type: String,
      required: true,
    },
    activityType: {
      type: String as () => 'Like' | 'Post' | 'Follow' | 'Repost' | 'Block',
      required: true,
    },
  },
  data() {
    return {
      pds: null,
      activity: [] as ActivityItem[],
      cursor: null,
      canLoadMore: true,
    }
  },
  methods: {
    loadMore() {
      this.getActivity(this.cursor)
    },
    async getActivity(cursor = null) {
      const curLength = this.activity.length
      switch (this.activityType) {
        case 'Like':
        case 'Repost':
          const actResponse =
            this.activityType === 'Like'
              ? await getActorLikes(this.did, cursor, this.pds)
              : await getActorReposts(this.did, cursor, this.pds)
          this.cursor = actResponse.cursor

          for (const activity of actResponse.records) {
            console.log(activity)
            const activityRecord = await getRecord(activity.value.subject.uri)
            if (!activityRecord) {
              continue
            }
            this.activity.push({ record: activityRecord, activity: activity})
          }
          break
        case 'Post':
          const postsResponse = await getActorPosts(this.did, cursor, this.pds)
          this.cursor = postsResponse.cursor
          for (const post of postsResponse.records) {
            this.activity.push({ record: post, activity: post })
          }
          break
        case 'Block':
        case 'Follow':
          const userResponse =
            this.activityType === 'Block'
              ? await getActorBlocks(this.did, cursor, this.pds)
              : await getActorFollows(this.did, cursor, this.pds)
          this.cursor = userResponse.cursor
          for (const graphActivity of userResponse.records) {
            this.activity.push({ record: graphActivity, activity: graphActivity })
          }
          break

        default:
          break
      }

      if (curLength === this.activity.length) {
        this.canLoadMore = false
      }
    },
  },
  mounted() {
    const query = new URLSearchParams(window.location.search)
    const pds = query.get('pds')
    if (pds) {
      // @ts-ignore
      this.pds = pds
    }
    if (this.did) {
      this.getActivity()
    }
  },
})
</script>

<style scoped>
.container-section {
  margin-bottom: 20px;
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 45vw;
}

.container-header {
  font-size: 1.3em;
  margin-bottom: 10px;
  font-weight: bold;
  color: #fff;
}

.container {
  border: 1px solid #ccc;
  padding: 20px;
  border-radius: 8px;
  background: white;
  box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.1);
  color: black;
  overflow-y: scroll;
  max-height: 50vh;
}

.activity-list {
  list-style-type: none;
  padding: 0;
}

.activity-list li {
  margin-bottom: 10px;
  font-size: 0.95em;
  color: black;
}

.load-more-button {
  cursor: pointer;
  text-decoration: underline;
}
</style>
