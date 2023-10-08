<template>
  <MainLayout>
    <div
      id="AddressPage"
      class="mt-4 max-w-[500px] mx-auto px-2"
    >
      <div class="mx-auto bg-white rounded-lg p-3">
        <div class="text-xl font-bold mb-2">Address Details</div>
        <form @submit.prevent="submit()">
          <TextInput
            class="w-full"
            placeholder="Contact Name"
            v-model:input="contactName"
            inputType="text"
            :error="error && error.type == 'contactName' ? error.message : ''"
          />
          <TextInput
            class="w-full mt-2"
            placeholder="Address"
            v-model:input="address"
            inputType="text"
            :error="error && error.type == 'address' ? error.message : ''"
          />
          <TextInput
            class="w-full mt-2"
            placeholder="Zip Code"
            v-model:input="zipcode"
            inputType="text"
            :error="error && error.type == 'zipCode' ? error.message : ''"
          />
          <TextInput
            class="w-full mt-2"
            placeholder="City"
            v-model:input="city"
            inputType="text"
            :error="error && error.type == 'city' ? error.message : ''"
          />
          <TextInput
            class="w-full mt-2"
            placeholder="Country"
            v-model:input="country"
            inputType="text"
            :error="error && error.type == 'country' ? error.message : ''"
          />
          <button
            :disabled="isWorking"
            type="submit"
            class="mt-6 bg-gradient-to-r from-[#fe630c] to-[#ff3200] w-full text-white text-[21px] font-semibold p-1.5 rounded-full"
          >
            <div v-if="!isWorking">Update Address</div>
            <Icon
              v-else
              name="line-md:loading-twotone-loop"
              size="25"
              class="mr-2"
            />
          </button>
        </form>
      </div>
    </div>
  </MainLayout>
</template>

<script setup lang="ts">
import { Addresses } from '@prisma/client';
import MainLayout from '~/layouts/MainLayout.vue';
import { useUserStore } from '~/stores/user';
import { Error } from '~/type';
const userStore = useUserStore();
const user = useSupabaseUser();
let contactName = ref('');
let address = ref('');
let zipcode = ref('');
let city = ref('');
let country = ref('');

let currentAddress = ref<Addresses | null>(null);
let isUpdate = ref(false);
let isWorking = ref(false);
let error = ref<Error | null>(null);

watchEffect(async () => {
  const { data } = await useFetch<Addresses>(
    `/api/prisma/get-address-by-user/${user.value}`,
    {
      server: true,
    },
  );
  currentAddress.value = data.value;
  if (currentAddress.value) {
    (contactName.value = currentAddress.value.name),
      (address.value = currentAddress.value.address),
      (zipcode.value = currentAddress.value.zipcode),
      (city.value = currentAddress.value.city),
      (country.value = currentAddress.value.country);
    isUpdate.value = true;
  }
  userStore.isLoading = false;
});

const submit = async () => {
  isWorking.value = true;
  error.value = null;
  if (!contactName.value) {
    error.value = {
      type: 'contactName',
      message: 'A contact name is required',
    };
  } else if (!address.value) {
    error.value = {
      type: 'address',
      message: 'An address is required',
    };
  } else if (!zipcode.value) {
    error.value = {
      type: 'zipCode',
      message: 'A zip code is required',
    };
  } else if (!city.value) {
    error.value = {
      type: 'city',
      message: 'A city is required',
    };
  } else if (!country.value) {
    error.value = {
      type: 'country',
      message: 'A country is required',
    };
  }

  if (error.value) {
    isWorking.value = false;
    return;
  }
  /* more */
  if (isUpdate.value) {
    await useFetch(`/api/prisma/update-address/${currentAddress.value?.id}`, {
      method: 'PATCH',
      body: {
        userId: user.value?.id,
        name: contactName.value,
        address: address.value,
        zipcode: zipcode.value,
        city: city.value,
        country: country.value,
      },
    });
    isWorking.value = false;

    return navigateTo('/checkout');
  }

  await useFetch(`/api/prisma/add-address/`, {
    method: 'POST',
    body: {
      userId: user.value?.id,
      name: contactName.value,
      address: address.value,
      zipcode: zipcode.value,
      city: city.value,
      country: country.value,
    },
  });

  isWorking.value = false;

  return navigateTo('/checkout');
};
</script>
