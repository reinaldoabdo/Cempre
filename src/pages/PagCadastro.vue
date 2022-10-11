<template>
  <CmpCadastro />
</template>

<script>
import { defineComponent } from "vue";
import CmpCadastro from "/src/components/CmpCadastro.vue";

export default defineComponent({
  name: "PagCadastro",
  components: { CmpCadastro },
});
</script>
