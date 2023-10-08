<template>
  <div
    class="w-full h-screen bg-white"
    id="AuthPage"
  >
    <div
      class="w-full flex items-center justify-center p-5 border-b border-b-gray-300"
    >
      <NuxtLink
        to="/"
        class="min-w-[170px]"
      >
        <img
          width="170"
          src="/AliExpress-logo.png"
        />
      </NuxtLink>
    </div>
    <div class="max-w-[400px] mx-auto px-2">
      <div class="text-center my-6">Login / Register</div>
      <button
        @click="login('google')"
        class="flex items-center justify-center gap-3 p-1.5 w-full hover:bg-gray-100 rounded-full text-lg font-semibold"
      >
        <img
          class="w-full max-w-[30px]"
          src="/google-logo.png"
        />
        <div>Google</div>
      </button>
      <button
        @click="login('github')"
        class="mt-4 flex items-center justify-center gap-3 p-1.5 w-full hover:bg-gray-100 rounded-full text-lg font-semibold"
      >
        <img
          class="w-full max-w-[30px]"
          src="/github-logo.png"
        />
        <div>Github</div>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
const client = useSupabaseClient();
const user = useSupabaseUser();
console.log('❄️ ~ file: auth.vue:48 ~ user:', user);
watchEffect(() => {
  if (user.value) {
    return navigateTo('/');
  }
});
const login = async (prov: any) => {
  const {} = await client.auth.signInWithOAuth({ provider: prov });
};
</script>
