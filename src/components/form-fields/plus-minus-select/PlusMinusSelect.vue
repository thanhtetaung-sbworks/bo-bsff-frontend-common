<template>
    <div class="co-plus-minus-field-wrapper" :class="[wrapperClass]">
        <div @click="decrement" class="co-minus-button co-action-btn co-flex-center" :class="{disabled : selectedValue <= calculatedMin}">
            <SvgIcon name="action_circle_minus_fill" width="26" height="26" />
        </div>
        <div class="co-select-field-wrapper">
            <select class="co-select-field co-std-select" :class="[selectClass]" 
                v-model="selectedValue"
                @change="change"
                :disabled="!options || disabled">
                <option v-for="(option, i) in options" :key="`large-${i}`" :value="option.id">
                    {{ option.label }}
                </option>
            </select>
        </div>
        <div @click="increment" class="co-plus-button co-action-btn co-flex-center" :class="{'co-disabled' : selectedValue >= calculatedMax}">
            <SvgIcon name="action_circle_plus_fill" width="26" height="26" />
        </div>
    </div>
</template>

<script>
import SvgIcon from '@/components/icon/SvgIcon.vue'
export default {
    components: {
        SvgIcon
    },
    name: 'PlusMinusSelect',
    props: {
        options: Array,
        value: [String, Number],
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
        min: {
            type: [Number, String],
            default: null
        },
        max: {
            type: [Number, String],
            default: null
        }
    },
    data() {
        return {
            selectedValue: this.value
        }
    },
    computed: {
        calculatedMin() {
            return this.min !== null ? Number(this.min) : (this.options ? Math.min(...this.options.map(option => option.id)) : 0);
        },
        calculatedMax() {
            return this.max !== null ? Number(this.max) : (this.options ? Math.max(...this.options.map(option => option.id)) : Infinity);
        }
    },
    methods: {
        change() {
            this.$emit('changed', this.selectedValue);
        },
        increment() {
            if (this.selectedValue < this.calculatedMax) {
                this.selectedValue++;
                this.$emit('input', this.selectedValue);
                this.change();
            }
        },
        decrement() {
            if (this.selectedValue > this.calculatedMin) {
                this.selectedValue--;
                this.$emit('input', this.selectedValue);
                this.change();
            }
        },
    },
    watch: {
        value(newValue) {
            this.selectedValue = newValue;
        },
        options() {
            if (this.min === null) {
                this.selectedValue = Math.max(this.calculatedMin, this.selectedValue);
            }
            if (this.max === null) {
                this.selectedValue = Math.min(this.calculatedMax, this.selectedValue);
            }
        }
    }
};
</script>
  
<style lang="scss" scoped>
//select field
.co-plus-minus-field-wrapper {
    display: flex;
    justify-items: center;
    .co-action-btn {
        padding: 0 4px;
        cursor: pointer;
        &.co-disabled {
            cursor: default;
            pointer-events: none;
            opacity: 0.5;
        }
    }
    .co-select-field-wrapper {
        max-width: 48px;
        position: relative;
        width: 100%;

        .co-select-field {
            font-size: 0.8rem;
            line-height: 1.25;
            background: #fff;
            border: 1px solid #cacccf;
            border-radius: 4px;
            padding: 0.375rem 0.5rem;
            width: 50px;
            height: 2.5rem;
            color: #000;
            text-align: center;

            &:disabled {
                color: #d3d3d3;
            }

            &:focus {
                outline: none;
                border: 1px solid $co-primary;
            }
        }
    }
}
</style>
  