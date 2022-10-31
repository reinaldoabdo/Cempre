<template>
  <CmpConvites />
</template>

<script>
import { defineComponent } from "vue";
import CmpConvites from "/src/components/CmpConvites.vue";

export default defineComponent({
  name: "PagConvites",
  components: { CmpConvites },
});
</script>
