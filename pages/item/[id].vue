<template>
  <MainLayout>
    <div
      id="ItemPage"
      class="mt-4 max-w-[1200px] mx-auto px-2"
    >
      <div class="md:flex gap-4 justify-between mx-auto w-full">
        <div class="md:w-[40%]">
          <img
            v-if="currentImage"
            class="rounded-lg object-fill"
            :src="currentImage"
          />
          <div
            v-if="images[0] !== ''"
            class="flex ite ms-center justify-center mt-2"
          >
            <div v-for="(image, idx) in images">
              <img
                :key="idx"
                @mouseover="currentImage = image"
                @click="currentImage = image"
                width="70"
                class="rounded-md object-fill border-[3px] cursor-pointer"
                :class="currentImage === image ? 'border-[#ff5353]' : ''"
                :src="image"
              />
            </div>
          </div>
        </div>
        <div class="md:w-[60%] bg-white p-3 rounded-lg">
          <div v-if="product">
            <p class="mb-2">{{ product.title }}</p>
            <p class="font-light text-[12px] mb-2">{{ product.description }}</p>
          </div>
          <div class="flex items-center pt-1.5">
            <span class="h-4 min-w-4 rounded-full p-0.5 bg-[#ffd000] mr-2"
              ><Icon
                name="ic:outline-star-purple500"
                class="-mt-[17px]"
                size="12"
            /></span>
            <p class="text-[#ff5353]">Extra 5% off</p>
          </div>
          <div class="flex items-center justify-start my-2">
            <Icon
              name="ic:outline-star-purple500"
              color="#ff5353"
            />
            <Icon
              name="ic:outline-star-purple500"
              color="#ff5353"
            />
            <Icon
              name="ic:outline-star-purple500"
              color="#ff5353"
            />
            <Icon
              name="ic:outline-star-purple500"
              color="#ff5353"
            />
            <Icon
              name="ic:outline-star-purple500"
              color="#ff5353"
            />
            <Icon
              name="ic:outline-star-purple500"
              color="#ff5353"
            />
            <span class="text-[13px] font-light ml-2"
              >5 213 Reviews 1,000+</span
            >
          </div>
          <div class="border-b" />
          <div class="flex items-center justify-start gap-2 my-2">
            <div class="text-xl font-bold">${{ priceComputed }}</div>
            <span
              class="bg-[#f5f5f5] border text-[#c08562] text-[9px] font-semibold"
              >70% off</span
            >
          </div>
          <p class="text-[#009a66] text-xs font-semibold pt-1">
            Free 11-day delivery over $8.28
          </p>
          <p class="text-[#009a66] text-xs font-semibold pt-1">Free Shipping</p>
          <div class="py-2" />
          <button
            @click="addToCart()"
            :disabled="isInCart"
            class="px-6 py-2 rounded-lg text-white text-lg font-semibold bg-gradient-to-r from-[#ff851a] to-[#ffac2c]"
          >
            <div v-if="isInCart">Is Added</div>
            <div v-else>Add to Cart</div>
          </button>
        </div>
      </div>
    </div>
  </MainLayout>
</template>

<script setup lang="ts">
import { useUserStore } from '~/stores/user';
import MainLayout from '~/layouts/MainLayout.vue';
import { Products } from '@prisma/client';
const userStore = useUserStore();
const route = useRoute();
const id = route.params.id as string;

let currentImage = ref('');
let product = ref<Products | null>(null);

onBeforeMount(async () => {
  const { data } = await useFetch<Products>(
    `/api/prisma/get-product-by-id/${id}`,
    {
      server: true,
    },
  );
  product.value = data.value;
});

watchEffect(() => {
  if (product && product.value) {
    currentImage.value = product.value.url;
    images.value[0] = product.value.url;
    userStore.isLoading = false;
  }
});
const isInCart = computed(() => {
  let res = false;
  userStore.cart.forEach((prod: Products) => {
    if (Number(id) === prod.id) {
      res = true;
    }
  });
  return res;
});

const priceComputed = computed(() => {
  if (product.value) {
    return product.value.price / 100;
  }
  return '0.00';
});
const images = ref([
  '/images/1.png',
  '/images/2.png',
  '/images/3.png',
  '/images/4.png',
  '/images/5.png',
]);

const addToCart = () => {
  product.value && userStore.cart.push(product.value);
};
</script>
