<template>
  <div class="co-life-play-panel co-panel">
    <SelectField first-option="大カテゴリ" :options="largeCategoryOptions" v-model="form.catLrgClassCd"
      @changed="onChangeLargeCat" />
    <SelectField first-option="中カテゴリ" :options="middleCategoryOptions" v-model="form.catMidClassCd"
      :disabled="form.catLrgClassCd === '' || !middleCategoryOptions" @changed="onChangeMidCat" />
    <SelectField first-option="小カテゴリ" :options="smallCategoryOptions" v-model="form.catSmlClassCd"
      :disabled="form.catMidClassCd === '' || !smallCategoryOptions" @changed="onChangeSmlCat" />
    <div class="input-box">
      <InputField placeholder="施設名、メニューNo、地名などを入力" v-model="form.keyword" @input="onInput"
        @keypressEnter="searchRequest()" :error="form.keywordError" autocomplete="on" />
      <InputErrorMessage :message="form.keywordError" wrapper-class="co-input-error" />
    </div>
    <LifeActionButton @clicked="searchRequest" :map-link="mapLink" />
  </div>
</template>

<script>
import uniqBy from "lodash/uniqBy";
import filter from "lodash/filter";
import SelectField from '@/components/form-fields/select-field/SelectField.vue';
import InputField from '@/components/form-fields/input-field/InputField.vue';
import InputErrorMessage from '@/components/input-error-message/InputErrorMessage.vue';
import LifeActionButton from '@/components/action-button/life-action-button/LifeActionButton.vue';

export default {
  components: {
    SelectField,
    InputField,
    InputErrorMessage,
    LifeActionButton
  },
  props: {
    lifeSearchDomain: {
      type: String,
      default: ""
    },
    mapLink: {
      type: String,
      default: "/map"
    },
    categories: {
      type: Array,
      default: function () {
        return [];
      }
    }
  },
  data() {
    return {
      form: {
        keyword: "",
        keywordError: "",
        catLrgClassCd: "",
        catMidClassCd: "",
        catSmlClassCd: "",
      },
    };
  },
  computed: {
    largeCategoryOptions() {
      if (this.$props.categories.length === 0) {
        return [];
      }
      const listFilter = filter(
        this.$props.categories,
        (item) =>
          item.level === 1 &&
          ((+item.catClassCd >= 102 && +item.catClassCd <= 114) ||
            (+item.catClassCd >= 116 && +item.catClassCd <= 119))
      );
      const items = uniqBy(listFilter, "catClassCd");

      const collection = items?.map(obj => {
        return {
          id: obj.catClassCd,
          label: obj.name
        };
      });
      return collection && collection.length ? collection : [];
    },
    middleCategoryOptions() {
      if (this.$props.categories.length === 0) {
        return [];
      }

      const listFilter = filter(this.$props.categories, (item) => {
        if (
          item.level === 2 &&
          item.catLrgClassCd === this.form.catLrgClassCd
        ) {
          if (
            (item.catLrgClassCd === "011" || item.catLrgClassCd === "113") &&
            item.name !== "飲食店"
          ) {
            return item;
          }
          if (item.catLrgClassCd === "119" && item.name !== "お問合せ") {
            return item;
          }
          if (
            item.catLrgClassCd !== "119" &&
            item.catLrgClassCd !== "113" &&
            item.catLrgClassCd !== "011"
          ) {
            return item;
          }
        }
      });
      const items = uniqBy(listFilter, "catClassCd");

      const collection = items?.map(obj => {
        return {
          id: obj.catClassCd,
          label: obj.name
        };
      });
      return collection && collection.length ? collection : [];
    },
    smallCategoryOptions() {
      if (this.$props.categories.length === 0) {
        return [];
      }

      const listFilter = filter(
        this.$props.categories,
        (item) =>
          item.level === 3 &&
          item.catLrgClassCd === this.form.catLrgClassCd &&
          item.catMidClassCd === this.form.catMidClassCd
      );
      const items = uniqBy(listFilter, "catClassCd");

      const collection = items?.map(obj => {
        return {
          id: obj.catClassCd,
          label: obj.name
        };
      });
      return collection && collection.length ? collection : [];

    },
  },
  methods: {
    onChangeLargeCat(event) {
      this.form.catLrgClassCd = event.target.value;
      this.form.catMidClassCd = "";
      this.form.catSmlClassCd = "";
    },
    onChangeMidCat(event) {
      this.form.catMidClassCd = event.target.value;
      this.form.catSmlClassCd = "";
    },
    onChangeSmlCat(event) {
      this.form.catSmlClassCd = event.target.value;
    },
    onInput(event) {
      this.form.keyword = event.target.value;
    },
    searchRequest() {
      if (
        !this.form.keyword &&
        !this.form.catLrgClassCd &&
        !this.form.catMidClassCd &&
        !this.form.catSmlClassCd
      ) {
        this.form.keywordError = "カテゴリを選択するかキーワードを入力してください。";
        return;
      }

      const params = new URLSearchParams(this.getQueryString());
      const url = this.$BoBsffFrontendCommon.config.lifeSearchDomain + "/menus?" + params;
      window.open(url, "_self");
    },
    getQueryString() {
      const query = {}
      query.type = 1;

      if (this.form.catLrgClassCd) {
        query.catLrgClassCd = this.form.catLrgClassCd
      }
      if (this.form.catMidClassCd) {
        query.catMidClassCd = this.form.catMidClassCd
      }
      if (this.form.catSmlClassCd) {
        query.catSmlClassCd = this.form.catSmlClassCd
      }
      if (this.form.keyword) {
        query.keyword = this.form.keyword
      }
      return query;
    }
  },

};
</script>
<style lang="scss" scoped>
.co-panel {
  padding: 0 10px;
  position: relative;
  padding-top: 0.5rem;

  ::v-deep .co-std-select {
    font-size: 12px;
  }
}

.co-input-box {
  display: flex;
  flex-wrap: nowrap;
  align-items: center;

  ::v-deep .co-input-field-wrapper {
    width: 100%;

    .co-input-field {
      height: 100%;
    }
  }

  ::v-deep .co-input-error {
    padding-top: 1.5rem;
    height: 100%;
  }
}</style>