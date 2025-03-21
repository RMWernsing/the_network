<script setup>
import { AppState } from '@/AppState.js';
import { profilesService } from '@/services/ProfilesService.js';
import { logger } from '@/utils/Logger.js';
import { Pop } from '@/utils/Pop.js';
import { computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';


const route = useRoute()
const profile = computed(() => AppState.activeProfile)

onMounted(() => {
  getProfileById()
})

async function getProfileById() {
  try {
    const profileId = route.params.profileId
    await profilesService.getProfileById(profileId)
  }
  catch (error) {
    Pop.error(error, 'Could not get profile by id')
    logger.log('COULD NOT GET PROFILE BY ID', error)
  }
}

</script>


<template>
  <section class="container">
    <div class="row">
      <div v-if="profile" class="col-12">
        <div class="d-flex justify-content-center bg-img my-3 rounded-4"
          :style="{ backgroundImage: `url(${profile.coverImg})` }">
          <div class="d-flex flex-column">
            <img class="profile-img mt-5 mb-3" :src="profile.picture" alt="">
            <span class="text-center fs-1">
              <a v-if="profile.linkedin" class="text-dark" :title="`link to ${profile.name}'s linkedin`" target="_blank"
                :href="profile.linkedin">
                <span class="mdi mdi-linkedin"></span>
              </a>
              <a v-if="profile.github" class="text-dark" :title="`link to ${profile.name}'s github`" target="_blank"
                :href="profile.github">
                <span class="mdi mdi-github"></span>
              </a>
              <a v-if="profile.resume" class="text-dark" :title="`link to ${profile.name}'s resume`" target="_blank"
                :href="profile.resume">
                <span class="mdi mdi-file-account"></span>
              </a>
            </span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>


<style lang="scss" scoped>
.profile-img {
  aspect-ratio: 1/1;
  border-radius: 50%;
  object-fit: cover;
  height: 30dvh;
}

.bg-img {
  background-position: center;
  background-size: cover;
  min-height: 70dvh;
}
</style>