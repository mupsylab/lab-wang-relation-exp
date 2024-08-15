<script setup lang="ts">
import { onMounted } from 'vue';
import { RouterView, useRouter, useRoute } from 'vue-router';

const router = useRouter();
const route = useRoute();
onMounted(() => {
  const ua = navigator.userAgent.toLowerCase();
  if (ua.match(/micromessenger/i)) {
    if(route.name != "not-found") {
      router.push({
        name: "not-found",
        params: {
          pathMatch: [400]
        },
        hash: route.hash
      });
    }
  }
});
</script>

<template>
  <RouterView></RouterView>
</template>
