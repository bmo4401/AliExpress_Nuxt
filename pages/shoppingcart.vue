<template>
  <MainLayout>
    <div
      id="ShoppingCartPage"
      class="mt-4 max-w-[1200px] mx-auto px-2"
    >
      <div
        v-if="false"
        class="h-[500px] flex items-center justify-center"
      >
        <div class="pt-20">
          <img
            src="/images/1.png"
            width="250"
            alt=""
          />
          <div class="text-xl text-center mt-4">No items yet?</div>
          <div
            class="flex text-center"
            v-if="true"
          >
            <NuxtLink
              to="/auth"
              class="bg-[#fd374f] w-full text-white text-[21px] font-semibold p-1.5 rounded-full mt-4"
              >Sign in</NuxtLink
            >
          </div>
        </div>
      </div>
      <div
        v-else
        class="md:flex gap-4 justify-between mx-auto w-full"
      >
        <div class="w-full">
          <div class="w-full">
            <div class="bg-white rounded-lg p-4">
              <div class="text-2xl font-bold mb-2">Shopping Cart (0)</div>
            </div>
          </div>
          <div class="bg-[#feeeef] rounded-lg p-4 mt-4">
            <div class="text-red-500 font-bold">
              Welcome Deal applicable on 1 item only
            </div>
          </div>
          <div
            id="Items"
            class="bg-white rounded-lg p-4 mt-4"
          >
            <div v-for="product in products">
              <CartItem
                :product="product"
                :selectedArray="selectedArray"
                @selectedRadio="selectedRadioFunc"
              />
            </div>
          </div>
        </div>
        <div class="md:hidden block my-4" />
        <div class="md:w-[35%]">
          <div
            id="Summary"
            class="bg-white rounded-lg p-4"
          >
            <div class="text-2xl font-extrabold mb-2">Summary</div>
            <div class="flex items-center justify-between my-4">
              <div class="font-semibold">Total</div>
              <div class="text-2xl font-semibold">
                $ <span class="font-extrabold">{{ totalPriceComputed }}</span>
              </div>
            </div>
            <button
              @click="goToCheckout"
              class="flex items-center justify-center bg-[#fd374f] w-full text-white text-[21px] font-semibold p-1.5 rounded-full mt-4"
            >
              Checkout
            </button>
          </div>
          <div
            id="PaymentProtection"
            class="bg-white rounded-lg p-4 mt-4"
          >
            <div class="text-lg font-semibold mb-2">Payment methods</div>
            <div class="flex items-center justify-start gap-8 my-4">
              <div v-for="card in cards">
                <img
                  :src="card"
                  alt=""
                  class="h-6"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </MainLayout>
</template>

<script setup lang="ts">
import CartItem from '~/components/CartItem.vue';
import { products } from '~/data';
import { Product } from '~/type';
import MainLayout from '~/layouts/MainLayout.vue';
import { useUserStore } from '~/stores/user';
const userStore = useUserStore();
let selectedArray = ref<Product[]>([]);
onMounted(() => {
  setTimeout(() => (userStore.isLoading = false), 200);
});

const totalPriceComputed = computed(() => {
  let price = 0;
  userStore.cart.forEach((prod) => {
    price += prod.price;
  });
  return price / 100;
});

const selectedRadioFunc = (e: Product) => {
  console.log(e);
  if (!selectedArray.value.length) {
    selectedArray.value.push(e);
    return;
  }
  selectedArray.value.forEach((item, idx) => {
    if (e.id != item.id) {
      selectedArray.value.push(e);
    } else {
      selectedArray.value.splice(idx, 1);
    }
  });
};

const goToCheckout = () => {
  let ids: number[] = [];
  userStore.checkout = [];
  selectedArray.value.forEach((item) => ids.push(item.id));
  let res = userStore.cart.filter((item) => {
    return ids.indexOf(item.id) != -1;
  });
  res.forEach((item) => userStore.checkout.push(toRaw(item)));
  return navigateTo('/checkout');
};

const cards = ref(['visa.png', 'mastercard.png', 'paypal.png', 'applepay.png']);
</script>
