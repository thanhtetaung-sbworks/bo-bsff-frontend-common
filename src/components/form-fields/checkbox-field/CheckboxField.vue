<template>
  <div class="co-checkbox-field-wrapper">
        <label class="co-label">
            <input type="checkbox" :value="value" :checked="isChecked" @change="handleChange" />
            <span class="co-square-box">
            </span>
            <span v-if="label" class="co-label-text">{{ label }}</span>
            <div v-if="$slots.default" class="co-label-content co-flex-center">
              <slot/>
            </div>
        </label>
    </div>
</template>
  

<script>
export default {
  props: {
    label: {
      type: String,
      required: false,
    },
    value: {
      type: [String, Boolean, Array],
      required: true,
    },
    defaultValue: {
      type: [String, Boolean],
      required: true,
    },
  },
  computed: {
    isChecked() {
      if ( Array.isArray(this.value) ) {
        return this.value.includes(this.defaultValue);
      } else {
        return this.value;
      }
    },
  },
  methods: {
    handleChange(event) {
      const { checked } = event.target;

      let newValue;
      if ( Array.isArray(this.value) ) {
        const addValue = this.value.includes(this.defaultValue) ? this.value : [...this.value, this.defaultValue]
        newValue = checked ? addValue : this.value.filter((item) => item != this.defaultValue);
      } else {
        newValue = checked;
      }
      this.$emit("input", newValue);
    },
  },
};
</script>

<style lang="scss" scoped>
.co-checkbox-field-wrapper .co-label {
  display: flex;

  input {
    appearance: none;
  }

  .co-square-box {
    width: 1.3rem;
    height: 1.3rem;
    position: relative;
    background-color: #fff;
    flex: 0 0 auto;
    border: solid 1px #a8aaad;
    border-radius: 0.25rem;
    overflow: hidden;
    cursor: pointer;
    &::before {
      // content: "";
      // font-family: "Font Awesome 5 Free";
      content: '';
      font-weight: bold;
      font-size: 1.125rem;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      color: #da291c;
      background: transparent url("data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgNTEyIDUxMiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJtMTczLjg5OCA0MzkuNDA0LTE2Ni40LTE2Ni40Yy05Ljk5Ny05Ljk5Ny05Ljk5Ny0yNi4yMDYgMC0zNi4yMDRsMzYuMjAzLTM2LjIwNGM5Ljk5Ny05Ljk5OCAyNi4yMDctOS45OTggMzYuMjA0IDBMMTkyIDMxMi42OSA0MzIuMDk1IDcyLjU5NmM5Ljk5Ny05Ljk5NyAyNi4yMDctOS45OTcgMzYuMjA0IDBsMzYuMjAzIDM2LjIwNGM5Ljk5NyA5Ljk5NyA5Ljk5NyAyNi4yMDYgMCAzNi4yMDRsLTI5NC40IDI5NC40MDFjLTkuOTk4IDkuOTk3LTI2LjIwNyA5Ljk5Ny0zNi4yMDQtLjAwMXoiIGZpbGw9IiNkYTI5MWMiIGNsYXNzPSJmaWxsLTAwMDAwMCI+PC9wYXRoPjwvc3ZnPg==") center center  / cover no-repeat;
      opacity: 0;
      width: 100%;
      height: 100%;
    }
  }

  input:checked + .co-square-box::before {
    opacity: 1;
  }

  .co-label-text {
    flex: 1 1 auto;
    opacity: 1;
    padding-left: 0.5rem;
    padding-right: 1rem;
    text-align: left;
    cursor: pointer;
    font-size: 14px;
  }
  .co-label-content {
    padding-left: 0.5rem;
    padding-right: 1rem;
  }
}

</style>