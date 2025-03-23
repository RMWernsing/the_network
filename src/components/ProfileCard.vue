<script setup>
import { AppState } from '@/AppState.js';
import { computed } from 'vue';


const profile = computed(() => AppState.activeProfile)

</script>


<template>
  <div class="d-flex justify-content-center bg-img my-3 rounded-4"
    :style="{ backgroundImage: `url(${profile?.coverImg})` }">
    <div class="d-flex flex-column text-light text-shadow">
      <h2 class="text-center mt-2 fs-1">
        {{ profile?.name }}
      </h2>
      <div class="d-flex justify-content-center">
        <img class="rounded-img my-3 profile-img" :src="profile?.picture" alt="">
      </div>
      <span class="text-center fs-1">
        <a v-if="profile?.linkedin" :title="`link to ${profile?.name}'s linkedin`" target="_blank"
          :href="profile?.linkedin">
          <span class="mdi mdi-linkedin text-light"></span>
        </a>
        <a v-if="profile?.github" :title="`link to ${profile?.name}'s github`" target="_blank" :href="profile?.github">
          <span class="mdi mdi-github text-light"></span>
        </a>
        <a v-if="profile?.resume" :title="`link to ${profile?.name}'s resume`" target="_blank" :href="profile?.resume">
          <span class="mdi mdi-file-account text-light"></span>
        </a>
      </span>
      <p class="text-center fs-5">
        {{ profile?.class }} <span v-if="profile?.graduated" class="mdi mdi-school"></span>
      </p>
      <div class="text-center fs-4">
        <b>
          {{ profile?.bio }}
        </b>
      </div>
    </div>
  </div>
</template>


<style lang="scss" scoped>
.profile-img {
  aspect-ratio: 1/1;
  border-radius: 50%;
  object-fit: cover;
  height: 30dvh;
  width: 30dvh;

}

.bg-img {
  background-position: center;
  background-size: cover;
  min-height: 70dvh;
}

.text-shadow {
  text-shadow: 1px 1px 5px rgb(255, 109, 221);
}
</style>