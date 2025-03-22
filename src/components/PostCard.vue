<script setup>
import { AppState } from '@/AppState.js';
import { Post } from '@/models/Post.js';
import { postsService } from '@/services/PostsService.js';
import { logger } from '@/utils/Logger.js';
import { Pop } from '@/utils/Pop.js';
import { computed } from 'vue';

const account = computed(() => AppState.account)

defineProps({
  postProp: { type: Post, required: true }
})

async function likePost(id) {
  try {
    await postsService.likePost(id)
  } catch (error) {
    Pop.error(error, 'Could not like post')
    logger.error('COULD NOT LIKE POST', error)
  }
}

async function deletePost(postId) {
  try {
    await postsService.deletePost(postId)
  }
  catch (error) {
    Pop.error(error, 'Could not delete post')
    logger.error('COULD NOT DELETE POST', error)
  }
}

</script>
<!-- <span @click="deletePost(postProp.id)"
            v-if="postProp.creatorId == account.id" class="mdi mdi-trash-can-outline text-danger" type="button"
            title="delete post"></span> -->

<template>
  <div class="shadow-lg mt-4 rounded-4">
    <div class="d-flex justify-content-between p-3">
      <div class="d-flex align-items-center gap-3 ">
        <RouterLink :to="{ name: 'Profile', params: { profileId: postProp.creatorId } }">
          <img class="profile-img" :src="postProp.creator.picture" alt="">
        </RouterLink>
        <p class="fs-4">{{ postProp.creator.name }} </p>
      </div>
      <div class="d-flex gap-3">
        <p>
          {{ postProp.createdAt.toLocaleDateString() }}
        </p>
        <p>
          {{ postProp.createdAt.toLocaleTimeString() }}
        </p>
      </div>
    </div>
    <div class="d-flex flex-column">
      <p class="fs-5 p-3">
        {{ postProp.body }}
      </p>
      <img v-if="postProp.imgUrl" class="post-img" :src="postProp.imgUrl" alt="">
    </div>
    <div v-if="account" class="fs-4 p-3 d-flex justify-content-end gap-3">
      <div v-if="postProp.likes.find(like => like.id == account.id)">
        <span v-if="postProp.likes.find(like => like.id == account.id)" @click="likePost(postProp.id)" type="button"
          title="click to like" class="mdi mdi-heart"></span>
        <span>{{ postProp.likes.length }}</span>
      </div>
      <div v-else>
        <span @click="likePost(postProp.id)" type="button" title="click to like" class="mdi mdi-heart-outline"></span>
        <span>{{ postProp.likes.length }}</span>
      </div>
    </div>
  </div>
</template>


<style lang="scss" scoped>
.profile-img {
  aspect-ratio: 1/1;
  border-radius: 50%;
  object-fit: cover;
  height: 4em;
}

.post-img {
  width: 100%;
  object-fit: cover;
  height: 45dvh
}
</style>