<template>
  <div>
    <!--<div class="text-center">
      <button @click="toggle()" :disabled="items === undefined" class="btn btn-outline-dark rounded-pill" type="button">
        Détails <i style="margin-left: 3px" :class="`fas fa-chevron-${show ? 'up' : 'down'}`"></i>
      </button>
    </div>-->
    <div class="mt-4" v-if="!show">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Details',
    props: {
      items: '',
    },
    data() {
      return {
        show: false,
      }
    },
    methods: {
      toggle() {
        this.show = !this.show
      },
    },
  };
</script>
