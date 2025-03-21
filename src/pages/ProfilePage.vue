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
      <div v-if="profile" class="col-12 h-100" :style="{ backgroundImage: `url(${profile.coverImg})` }">

      </div>
    </div>
  </section>
</template>


<style lang="scss" scoped></style>