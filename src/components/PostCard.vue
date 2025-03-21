<script setup>
import { Post } from '@/models/Post.js';




defineProps({
  postProp: { type: Post, required: true }
})

</script>


<template>
  <div class="shadow-lg mt-4 rounded-4">
    <div class="d-flex justify-content-between p-3">
      <div class="d-flex align-items-center gap-3 ">
        <img class="profile-img" :src="postProp.creator.picture" alt="">
        <p class="fs-4">{{ postProp.creator.name }}</p>
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