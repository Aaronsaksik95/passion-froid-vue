<template>
  <div>
    <h1 class="mt-5">Images</h1>
    <h3 class="mt-5">Filtres</h3>
    <div class="d-flex justify-content-center">
      <div class="m-2">
        <input class="form-check-input m-1" type="checkbox" @click="changeProduct" v-model="pictureWithProduct" id="productCheck" />
        <label class="form-check-label" for="productCheck">Avec Produit</label>
      </div>
      <div class="m-2">
        <input class="form-check-input m-1" type="checkbox" @click="changeHuman" v-model="pictureWithHuman" id="productCheck" />
        <label class="form-check-label" for="productCheck">Avec Humain</label>
      </div>
    </div>
    <div class="flex-wrap d-flex mx-auto justify-content-around m-5">
      <div v-for="image in images.reverse()" :key="image.name" class="card m-5 p-0 col-3 shadow mb-5 rounded">
        <img :src="image.path" class="card-img-top" alt="..." />
        <p class="card-text">{{image.name}}</p>
        <div class="d-flex justify-content-around">
          <small class="">{{image.pictureCredits}}</small>
          <small class="">{{image.imageType}}</small>
        </div>
        <div>
          <small>Date limite: {{image.endOfUseDate}}</small>
        </div>
        </div>
      </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Home',
  data () {
    return {
      images: [],
      pictureWithProduct: false,
      pictureWithHuman: false
    }
  },
  async mounted () {
    await axios
      .get('http://localhost:3000/api/v1/images')
      .then((response) => (this.images = response.data.image))
  },
  methods: {
    changeProduct () {
      this.pictureWithProduct = !this.pictureWithProduct
      if (this.pictureWithProduct) {
        this.withProduct()
      } else {
        this.all()
      }
    },
    changeHuman () {
      this.pictureWithHuman = !this.pictureWithHuman
      if (this.pictureWithHuman) {
        this.withHuman()
      } else {
        this.all()
      }
    },
    withProduct () {
      axios
        .get('http://localhost:3000/api/v1/images/product')
        .then((response) => (this.images = response.data.image))
    },
    withHuman () {
      axios
        .get('http://localhost:3000/api/v1/images/human')
        .then((response) => (this.images = response.data.image))
    },
    all () {
      axios
        .get('http://localhost:3000/api/v1/images')
        .then((response) => (this.images = response.data.image))
    }
  }
}
</script>
