<script setup>
import { AppState } from '@/AppState.js';
import ProfileCard from '@/components/ProfileCard.vue';
import { accountService } from '@/services/AccountService.js';
import { addsService } from '@/services/AddsService.js';
import { profilesService } from '@/services/ProfilesService.js';
import { logger } from '@/utils/Logger.js';
import { Pop } from '@/utils/Pop.js';
import { computed, onMounted, ref } from 'vue';

const editableAccountData = ref({
  name: '',
  picture: '',
  coverImg: '',
  github: '',
  linkedin: '',
  resume: '',
  class: '',
  graduated: false,
  bio: '',
})

const account = computed(() => AppState.account)
const profile = computed(() => AppState.activeProfile)
const adds = computed(() => AppState.adds || [])
const isLoading = ref(true)


onMounted(() => {
  getAds()
})

onMounted(async () => {
  try {
    await accountService.getAccount();
    if (AppState.account) {
      await profilesService.getProfileById(AppState.account.id);
    }
    isLoading.value = false;
  } catch (error) {
    logger.error('Error fetching account or profile:', error);
  }
});

async function updateAccount() {
  try {
    await accountService.updateAccount(editableAccountData.value)
    Pop.success('Successfully Updated Account')
  }
  catch (error) {
    Pop.error(error, 'Could not update account')
    logger.error('COULD NOT UPDATE ACCOUNT', error)
  }
}

async function getAds() {
  try {
    await addsService.getAds()
  }
  catch (error) {
    Pop.error(error, 'Could not get ads')
    logger.error('COULD NOT GET ADS', error)
  }
}

</script>

<template>
  <h1 class="text-center">account editor</h1>
  <section class="container">
    <div class="row justify-content-center">
      <div class="col-12">
        <div v-if="adds && adds.length > 0" class="d-flex justify-content-center">
          <img :src="adds[0].banner" alt="">
        </div>
      </div>
      <div class="col-md-6">
        <form @submit.prevent="updateAccount()">
          <label for="name">Name</label>
          <input v-model="editableAccountData.name" type="text" id="name" name="name" required maxlength="100"
            minlength="1">
          <label for="picture">Profile Picture</label>
          <input v-model="editableAccountData.picture" type="url" id="picture" name="picture" maxlength="500">
          <label for="coverImg">Cover Image</label>
          <input v-model="editableAccountData.coverImg" type="url" id="coverImg" name="coverImg" maxlength="500">
          <label for="github">Github</label>
          <input v-model="editableAccountData.github" type="url" id="github" name="github" maxlength="500">
          <label for="linkedin">Linkedin</label>
          <input v-model="editableAccountData.linkedin" type="url" id="linkedin" name="linkedin" maxlength="500">
          <label for="resume">Resume</label>
          <input v-model="editableAccountData.resume" type="url" id="resume" name="resume" maxlength="500">
          <label for="class">Class</label>
          <input v-model="editableAccountData.class" type="text" id="class" name="class" maxlength="500">
          <label for="graduated">Graduated</label>
          <input v-model="editableAccountData.graduated" type="checkbox" id="graduated" name="graduated"
            maxlength="500">
          <label for="bio">Bio</label>
          <textarea v-model="editableAccountData.bio" name="bio" id="bio" maxlength="1000"></textarea>
          <button type="submit" class="btn btn-success">submit</button>
        </form>
      </div>
      <div class="col-md-6">
        <div v-if="!account">
          <p class="text-center fs-1">Loading... <span class="mdi mdi-loading mdi-spin"></span></p>
        </div>
        <div v-else-if="profile">
          <ProfileCard />
        </div>
      </div>
      <div class="col-12">
        <div v-if="adds && adds.length > 0" class="d-flex justify-content-center">
          <img :src="adds[1].banner" alt="">
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
img {
  max-width: 100%;
}

label {
  display: block;
}

input,
textarea {
  width: 90%;
}
</style>
