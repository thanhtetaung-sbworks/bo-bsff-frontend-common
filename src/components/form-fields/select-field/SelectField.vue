<template>
    <div class="co-select-field-wrapper" :class="[wrapperClass]">
        <select class="co-select-field co-std-select" :class="[selectClass]" 
            v-model="selectedValue"
            @change="change"
            :disabled="!options || disabled">
            <option v-if="firstOption" selected value="" class="co-default" :disabled="disabledFirstOption">
                {{ firstOption }}
            </option>
            <option v-for="(option, i) in options" :key="`large-${i}`" :value="option.id">
                {{ option.label }}
            </option>
        </select>
    </div>
</template>

<script>
export default {
    name: 'SelectField',
    props: {
        options: Array,
        value: [String, Number],
        firstOption: [String, Number],
        disabledFirstOption: {
            type: Boolean,
            default: false
        },
        disabled: {
            type: Boolean,
            default: false
        },
        wrapperClass: {
            type: String,
            default: ''
        },
        selectClass: {
            type: String,
            default: ''
        },
    },
    data() {
        return {
            selectedValue: this.value
        }
    },
    methods: {
        change(event) {
            this.$emit('changed', event);
        }
    },
    watch: {
        value(newValue) {
            this.selectedValue = newValue;
        }
    }
};
</script>
  
<style lang="scss" scoped>
//select field
.co-select-field-wrapper {
  margin-bottom: 0.5rem;
  position: relative;
  width: 100%;

  &::after {
    content: "";
    position: absolute;
    right: 10px;
    top: 15px;
    width: 10px;
    height: 10px;
    border-top: 2px solid #ccc;
    border-left: 2px solid #ccc;
    transform: translateY(-50%) rotate(-135deg);
    font-size: 20px;
    pointer-events: none;
  }

  .co-select-field {
    font-size: 1rem;
    line-height: 1.25;
    background: #fff;
    border: 1px solid #cacccf;
    border-radius: 4px;
    padding: 0.375rem 0.5rem;
    width: 100%;
    height: 2.5rem;
    color: #000;
    @include co-reset-appearance;

    &:disabled {
      color: #d3d3d3;
    }

    &:focus {
      outline: none;
      border: 1px solid $co-primary;
    }
  }
}
</style>
  