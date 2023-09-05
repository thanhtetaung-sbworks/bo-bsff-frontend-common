<template>
    <div class="co-input-field-wrapper" :class="[wrapperClass]">
      <input
        class="co-input-field"
        :type="type"
        :placeholder="placeholder"
        @keypress.enter="keypressEnter()"
        :value="value"
        @input="onInput"
        :class="{
          'co-error': error
        }"
        :autocomplete="autocomplete"
      />
    </div>
  </template>
  
  <script>
  export default {
    props: {
        wrapperClass: {
            type: String,
            default: ""
      },
        type: {
            type: String,
            default: "text"
      },
      placeholder: {
        type: String,
        default: "",
      },
      error: {
        type: String,
        default: "",
      },
      autocomplete: {
        type: String,
        default: "off",
        },
        value: {
        type: String,
        default: "",
        },
    },
    methods: {
      keypressEnter() {
        this.$emit("keypressEnter");
      },
      onInput(event) {
        this.$emit("input", event);
      },
    },
  };
  </script>
  
  <style lang="scss" scoped>
.co-input-field-wrapper {
  position: relative;
  margin-bottom: 0.5rem;
  .co-input-field {
    @include co-reset-appearance;
    padding: .75rem 1rem;
    font-size: 12px;
    width: 100%;
    border: 1px solid #cacccf;
    border-radius: 0.25rem;
    color: #1f2021;
    line-height: 1.8;
    overflow: hidden;
    height: 100%;
    max-height: 40px;
    &:focus {
      outline: none;
      background-color: #fff7f7;
      border: 1px solid $co-primary;
    }
    &.co-error {
      background-color: #fae6e9;
    }
  }
}

  </style>
  