<!-- TOP ベネ通販タブ -->
<template>
  <div class="co-panel co-panel-bene-online-shop">

    <div class="co-category-section co-box-x-padding">

      <div class="co-label">カテゴリ</div>

      <ShopLargeCategoryRenderless ref="ShopLargeCategoryRenderless" :catLrgClassCd="form.catLrgClassCd"
        :catMidClassCd="form.catMidClassCd" @update="updateCategory" />
      <SelectField first-option="中カテゴリ" :options="middleCategoryOptions" v-model="form.catMidClassCd"
        @changed="onChangeMidCat" :disabled="middleCategoryOptions.length === 0" />

      <SelectField first-option="小カテゴリ" :options="smallCategoryOptions" v-model="form.catSmlClassCd"
        :disabled="form.catLrgClassCd === '' || smallCategoryOptions.length === 0" />


    </div>

    <div class="co-price-box co-range-box co-box-x-padding">
      <div class="co-label">価格帯</div>

      <div class="co-from-pice-wrapper co-from-wrapper co-input-box">
        <InputField type="number" wrapperClass="co-from-price-field-wrapper" v-model="form.priceFrom"
          @input="priceFromInput" />
        <div class="co-field-label">円～</div>
      </div>

      <div class="co-to-pice-wrapper co-to-wrapper co-input-box">
        <InputField type="number" wrapperClass="to-price-field-wrapper" v-model="form.priceTo" @input="priceToInput" />
        <div class="co-field-label">円</div>
      </div>

    </div>


    <div class="co-discount-box co-range-box co-box-x-padding">
      <div class="co-label">割引率</div>

      <div class="co-discount-from-wrapper co-from-wrapper co-input-box">
        <InputField type="number" wrapperClass="to-price-field-wrapper" v-model="form.discountFrom"
          @input="discountFromInput" />
        <div class="co-field-label">％～</div>
      </div>

      <div class="co-discount-to-wrapper co-to-wrapper co-input-box">
        <InputField type="number" wrapperClass="co-from-price-field-wrapper" v-model="form.discountTo"
          @input="discountToInput" />
        <div class="co-field-label">％</div>
      </div>

    </div>

    <div class="co-keyword-input-btn-wrapper co-box-x-padding">
      <div class="co-keyword-wrapper">
        <InputField placeholder="商品名・ブランド・メニューNo（例：テレビ型番）" type="text" wrapperClass="co-keyword-input-wrapper"
          v-model="form.keyword" @input="inputKeyword" @onSearch="onSearch()" />
      </div>
      <DefaultActionButton @clicked="onSearch" />
    </div>

    <InputErrorMessage wrapper-class="co-error-bar" v-if="formError" :message="formError" />

  </div>
</template>
  
<script>


import SelectField from "@/components/form-fields/select-field/SelectField.vue";
import InputField from "@/components/form-fields/input-field/InputField.vue";
import DefaultActionButton from "@/components/action-button/default-action-button/DefaultActionButton.vue";
import ShopLargeCategoryRenderless from "@/components/renderless/ShopLargeCategoryRenderless.vue";
import InputErrorMessage from '@/components/input-error-message/InputErrorMessage.vue';

export default {
  name: "ShopBeneOnlineShop",
  components: {
    SelectField,
    InputField,
    DefaultActionButton,
    ShopLargeCategoryRenderless,
    InputErrorMessage
  },
  props: {
    boCode: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      middleCategoryOptions: [],
      smallCategoryOptions: [],
      categories: [],
      form: {
        keyword: "",
        catLrgClassCd: "115",
        catMidClassCd: "",
        catSmlClassCd: "",
        priceFrom: "",
        priceTo: "",
        discountFrom: "",
        discountTo: "",
      },
      formError: "",
    };
  },
  methods: {
    discountFromInput(event) {
      this.form.discountFrom = event.target.value;
    },
    discountToInput(event) {
      this.form.discountTo = event.target.value;
    },
    priceFromInput(event) {
      this.form.priceFrom = event.target.value;
    },
    priceToInput(event) {
      this.form.priceTo = event.target.value;
    },
    updateCategory(data) {
      this.categories = data.categories;
      this.middleCategoryOptions = data.middleCategoryOptions;
      this.smallCategoryOptions = data.smallCategoryOptions;
    },
    onChangeMidCat(event) {
      if (event.target.value === "") {
        this.form.catMidClassCd = "";
        this.form.catSmlClassCd = "";
      } else if (event.target.value !== "") {
        this.form.catMidClassCd = event.target.value;
        this.form.catSmlClassCd = "";
      }
      this.$refs.ShopLargeCategoryRenderless.updateCategoryValue(this.form.catLrgClassCd, this.form.catMidClassCd);
    },
    inputKeyword(event) {
      this.form.keyword = event.target.value;
    },
    isNumber(num) {
      const parsedNumber = Number(num);
      return Number.isInteger(parsedNumber) && parsedNumber >= 0;
    },
    validate() {
      const { priceFrom, priceTo, discountFrom, discountTo } = this.form;

      const areAllNumbersValid = (
        this.isNumber(priceFrom) &&
        this.isNumber(priceTo) &&
        this.isNumber(discountFrom) &&
        this.isNumber(discountTo)
      );

      if (!areAllNumbersValid) {
        return "価格帯・割引率は正数値で入力してください。";
      }

      return "";
    },
    onSearch() {
      this.formError = this.validate();
      if (this.formError) {
        return;
      }

      const params = new URLSearchParams();
      for (const key in this.form) {
        if (Object.prototype.hasOwnProperty.call(this.form, key)) {
          params.append(key, this.form[key]);
        }
      }
      params.append('boCode', this.boCode);

      const url = `${this.$BoBsffFrontendCommon.config.shopSearchDomain}/menus?${params.toString()}`;


      window.open(url, "_self");
    },
  },
  mounted() {
    this.$refs.ShopLargeCategoryRenderless.getCategories();
  },
};
</script>
  
<style lang="scss" scoped>
@import "@/components/mobile-search-nav-popup/panel/pane.scss";

//panel
.co-panel {
  font-size: 16px;

  ::v-deep select {
    font-size: 16px !important;
  }
}

//category section
.co-category-section {
  display: flex;
  margin-bottom: 0.5rem;

  .co-label {
    min-width: 120px;
    align-items: center;
    display: flex;
  }

  .co-select-field-wrapper {
    width: calc(33.33333% - .5rem);
    margin-right: 0.5rem;
  }
}

@media screen and (max-width: 1023px) {
  .co-category-section {
    padding-top: 12px;
    flex-direction: column;
    margin-bottom: 1rem;

    .co-label {
      display: none;
    }

    .co-select-field-wrapper {
      width: 100%;
      margin-right: 0;
      margin-bottom: 0.5rem;
    }
  }
}

// range box
.co-range-box {
  display: flex;
  margin-bottom: 1rem;
  flex-direction: row;

  .co-label {
    display: flex;
    align-items: center;
    min-width: 120px;
  }

  .co-input-box {
    display: flex;
    align-items: center;

    ::v-deep .co-input-field-wrapper {
      min-width: 185px;
      margin-bottom: 0;

      input {
        background: #f4f5f6;
        max-height: 37px;
      }
    }

    .co-field-label {
      margin: 0 1rem;
    }
  }
}

@media screen and (max-width: 1023px) {
  .co-range-box {
    flex-direction: column;

    .co-label {
      height: 40px;
      line-height: 40px;
    }

    .co-input-box {
      ::v-deep .co-input-field-wrapper {
        width: calc(100% - 80px);
        margin-bottom: 0.5rem !important;
      }
    }
  }
}

// keyword input and submit button
.co-keyword-input-btn-wrapper {
  display: flex;

  .co-keyword-wrapper {
    margin-bottom: 0;
    display: flex;
    width: 100%;

    ::v-deep .co-input-field-wrapper {
      width: 100%;
      margin-bottom: 0;

      input {
        background: #f4f5f6;
        border-radius: 8px;
        height: 3rem;
        flex-shrink: 0;
        font-size: 15px;

        &::placeholder {
          color: #b5b5b5;
        }
      }
    }
  }

  ::v-deep .co-default-btn-wrapper {
    min-width: 110px;
    display: flex;
    margin-left: 8px;

    button {
      width: 100%;
      font-size: .875rem;
      padding: 0.5rem 1rem;
      flex-shrink: 0;
      display: flex;
      height: 100%;
    }
  }
}

@media screen and (max-width: 1023px) {
  .co-keyword-input-btn-wrapper {
    flex-direction: column;

    .co-keyword-wrapper {
      margin-bottom: 11px;

      ::v-deep .co-input-field-wrapper {
        input {
          padding: 11px 10px;
          font-size: 13px;
        }
      }
    }

    ::v-deep .co-default-btn-wrapper {
      margin-left: 0;
      height: 3rem;

      button {
        border-radius: 8px;
      }
    }
  }
}</style>
  