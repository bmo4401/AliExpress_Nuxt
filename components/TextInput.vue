<template>
  <div>
    <client-only>
      <input
        :placeholder="placeholder"
        @focus="isFocused = true"
        @blur="isFocused = false"
        :type="inputType"
        v-model="inputComputed"
        autocomplete="off"
        :class="{ 'border-red-500': error, 'border-gray-900': isFocused }"
        class="w-full bg-white text-gray-800 border text-sm border-[#eff0eb] rounded-lg p-3 placeholder-gray-500 focus:outline-none"
      />
    </client-only>

    <span
      v-if="error"
      class="text-red-500 text-[14px] font-semibold"
    >
      {{ error }}
    </span>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits(['update:input']);
const props = defineProps([
  'input',
  'placeholder',
  'max',
  'inputType',
  'error',
]);
const { input, placeholder, max, inputType, error } = toRefs(props);
let isFocused = ref(false);
const inputComputed = computed({
  get: () => input?.value,
  set: (val) => {
    console.log(val);
    emit('update:input', val);
  },
});
</script>
