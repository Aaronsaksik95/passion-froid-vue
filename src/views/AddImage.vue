<template>
  <div class="w-50 mx-auto m-5">
    <form @submit.prevent="sendFile" class="row g-3">
      <div class="col-md-12">
        <label for="inputImage" class="form-label">Image</label>
        <input
          type="file"
          class="form-control"
          id="inputImage"
          ref="file"
          @change="selectFile"
          required
        />
      </div>
      <!-- <div class="col-md-6">
        <label for="inputLabel" class="form-label">Label</label>
        <input type="text" class="form-control" id="inputLabel" required/>
      </div> -->
      <div class="col-md-6">
        <label for="inputType" class="form-label">Type d'image</label>
        <input
          type="text"
          v-model="imageType"
          class="form-control"
          id="inputType"
          placeholder="Photo PassionFroid, Photo fournisseur..."
          required
        />
      </div>
      <div class="col-md-6">
        <label for="inputCredit" class="form-label">Crédits photos</label>
        <input type="text" v-model="pictureCredits" class="form-control" id="inputCredit" required/>
      </div>
      <div class="d-flex w-100 horizontal-scrollable">
        <p class="m-1" v-for="tag in tags" :key="tag">{{ tag }}</p>
      </div>
      <div>

      </div>
      <div class="col-9 mt-4">
        <input type="text" v-if="tags.length == 0" v-model="tag" class="form-control" id="inputTags" placeholder="Tags" required/>
        <input type="text" v-else v-model="tag" class="form-control" id="inputTags" placeholder="Tags" />
      </div>
      <div class="col-3 mt-4">
        <p @click="addTag" class="btn btn-success">Ajouter ce tag</p>
      </div>
      <div class="col-md-3">
        <div class="form-check">
          <input class="form-check-input" type="checkbox" v-model="pictureWithProduct" id="productCheck" />
          <label class="form-check-label" for="productCheck"
            >Avec Produit</label
          >
        </div>
      </div>
      <div class="col-md-3">
        <div class="form-check">
          <input class="form-check-input" type="checkbox" v-model="pictureWithHuman" id="humanCheck" />
          <label class="form-check-label" for="humanCheck">Avec Humain</label>
        </div>
      </div>
      <div class="col-md-3">
        <div class="form-check">
          <input class="form-check-input" type="checkbox" v-model="pictureWithInstitutional" id="instituCheck" />
          <label class="form-check-label" for="instituCheck"
            >Institutionnelle</label
          >
        </div>
      </div>
      <div class="col-md-4 mt-5">
        <div class="form-check">
          <input class="form-check-input" type="checkbox" v-model="limitedRightsOfUse" id="limitCheck" />
          <label class="form-check-label" for="limitCheck"
            >Droits d’utilisation limités</label
          >
        </div>
      </div>
      <div class="col-md-4" v-if="limitedRightsOfUse">
        <label for="inputCopyright" class="form-label">Copyright</label>
        <input type="text" v-model="copyright" class="form-control" id="inputCopyright" />
      </div>
      <div class="col-md-4">
        <label for="inputCopyright" class="form-label"
          >Date fin de droits d'utilisation</label
        >
        <input type="date" v-model="endOfUseDate" class="form-control" id="inputCopyright" required/>
      </div>
      <div class="col-12">
        <button class="btn btn-primary" :disabled="!this.file">Ajouter l'image</button>
      </div>
    </form>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Home',
  data () {
    return {
      file: '',
      imageType: '',
      pictureCredits: '',
      tags: [],
      tag: '',
      pictureWithProduct: false,
      pictureWithHuman: false,
      pictureWithInstitutional: false,
      limitedRightsOfUse: false,
      copyright: '',
      endOfUseDate: '',
      format: 'jpg'
    }
  },
  methods: {
    selectFile () {
      this.file = this.$refs.file.files[0]
    },
    addTag () {
      this.tags.push(this.tag)
      console.log(this.tags)
      this.tag = ''
    },
    async sendFile () {
      const formData = new FormData()
      formData.append('file', this.file)
      console.log(this.file)
      await axios
        .post('http://localhost:3000/api/v1/images', formData, {
          name: this.file.name,
          imageType: this.imageType,
          pictureWithProduct: this.pictureWithProduct,
          pictureWithHuman: this.pictureWithHuman,
          pictureWithInstitutional: this.pictureWithInstitutional,
          format: this.format,
          pictureCredits: this.pictureCredits,
          limitedRightsOfUse: this.limitedRightsOfUse,
          copyright: this.copyright,
          endOfUseDate: this.endOfUseDate,
          tags: this.tags
        })
        .then(res => {
          console.log(res)
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>
<style scoped>
.horizontal-scrollable {
  overflow-x: auto;
  white-space: nowrap;
}
</style>
