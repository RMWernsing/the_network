<script setup>
import { AppState } from '@/AppState.js';
import ProfileCard from '@/components/ProfileCard.vue';
import { accountService } from '@/services/AccountService.js';
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

onMounted(() => {

})

async function updateAccount() {
  try {
    await accountService.updateAccount(editableAccountData.value)
    Pop.success('Successfully Updated Account')
  }
  catch (error) {
    Pop.error(error, 'Could not update account')
    logger.log('COULD NOT UPDATE ACCOUNT', error)
  }
}

</script>

<template>
  <h1 class="text-center">account editor</h1>
  <section class="container">
    <div class="row justify-content-center">
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
    </div>
  </section>
</template>

<style scoped lang="scss">
img {
  max-width: 100px;
}

label {
  display: block;
}

input,
textarea {
  width: 90%;
}
</style>
