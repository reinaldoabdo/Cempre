<template>
  <CmpLogin />
</template>

<script>
import { defineComponent } from "vue";
import CmpLogin from "/src/components/CmpLogin.vue";

export default defineComponent({
  name: "PagLogin",
  components: { CmpLogin },
});
</script>
