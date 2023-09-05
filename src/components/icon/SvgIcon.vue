<template>
    <svg
    :class="['co-common-icon', customClassName]"
    xmlns="http://www.w3.org/2000/svg"
    :width="width"
    :height="height"
    :viewBox="viewBox"
    :aria-label="icon.name"
    @click="$emit('click')"
    role="img"
    >
      <!-- <g v-html="icon.path"></g> -->
      <g :fill="fill" :stroke="stroke" v-html="icon.path"></g>
    </svg>
  </template>
  
  <script>
  export default {
    name: 'SvgIcon',
    props: {
      name: {
        type: String,
        default: "box",
        required: true
      },
      width: {
        type: [Number, String],
        default: 16
      },
      height: {
        type: [Number, String],
        default: 16
      },
      color: {
        type: String
      },
      customClass: {
        type: String,
        default: ''
      },
      opt: {
        type: Object,
        default: () => ({})
      },
      customViewBox: {
        type: String,
        default: ''
      }
    },
    computed: {
      customClassName() {
        return this.customClass ? this.customClass : this.name
      },
      icon() {
        if (!this.$svgicon || !this.$svgicon[this.name]) return {};
        return this.$svgicon[this.name];
      },
      option() {
        if (!this.opt) return {};
        return this.opt;
      },
      fill() {
        if (!this.icon || !this.icon.fill) return undefined;
        if (this.icon.fill == "#FFF") return this.icon.fill;
        if (!this.color) return this.icon.fill;
        return this.color;
      },
      stroke() {
        if (!this.icon || !this.icon.stroke) return undefined;
        if (this.icon.stroke == "#FFF") return this.icon.stroke;
        if (!this.color) return this.icon.stroke;
        return this.color;
      },
      viewBox() {
        if ( this.customViewBox ) {
          return this.customViewBox
        }
        if (!this.icon.viewBox) {
          return "0 0 24 24";
        } 
        return this.icon.viewBox;
      }
    }
  };
  </script>
  
  <style scoped></style>
  