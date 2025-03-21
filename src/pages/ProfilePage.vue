<script setup>
import { profilesService } from '@/services/ProfilesService.js';
import { logger } from '@/utils/Logger.js';
import { Pop } from '@/utils/Pop.js';
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';


const route = useRoute()

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
      <div class="col-12 bg-danger">
        im here
      </div>
    </div>
  </section>
</template>


<style lang="scss" scoped></style>