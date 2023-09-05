<template>
  <div class="co-life-play-panel co-panel">

    <SelectField first-option="大エリア" :options="areaMidClassOptions" v-model="form.areaMidClassCd" :disabled="areaMidClassOptions.length === 0" @changed="onChangeMidArea" />
    <SelectField first-option="中エリア" :options="areaSmlClassOptions" v-model="form.areaSmlClassCd" :disabled="form.areaMidClassCd === '' || areaSmlClassOptions.length === 0" @changed="onChangeSmlArea" />
    <SelectField first-option="小エリア" :options="areaDtlClassOptions" v-model="form.areaDtlClassCd" :disabled="form.areaMidClassCd === '' || areaDtlClassOptions.length === 0" @changed="onChangeDtlArea" />

    <div class="co-select-field-wrapper">
      <select
        class="co-select-field co-std-select"
        @change="lifeGenreChanged"
        :disabled="!categoryOptions"
      >
        <option
          selected
          value=""
          class="co-default"
          disabled
        >ジャンル</option>
        <option
          v-for="(cat, i) in categoryOptions"
          :key="`cat-${i}`"
          :value="cat.id"
        >{{ cat.label }}</option>
      </select>
    </div>

    <div class="co-genre-tag-list">
      <div v-for="(item, index) in lifeGenreTags" class="co-genre-tag" v-bind:key="index">
        <span class="co-text">
          {{ item.name }}
        </span>
        <button class="co-delete-btn" v-on:click="deleteLifeGenreTags(index)">
          ×
        </button>
      </div>
    </div>

    <div class="co-input-box">
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
      selectedCategory: '',
      lifeGenreTags: [],
      areaSmlClasses: [],
      areaDtlClasses: [],
      form: {
        keyword: "",
        keywordError: "",

        areaLrgClassCd: "",
        areaMidClassCd: "",
        areaSmlClassCd: "",
        areaDtlClassCd: ""

      },
    };
  },
  computed: {
    areaMidClasses() {
      return this.$store.state.searchPopup.stayPanel.areaMidClassesData;
    },
    categoryOptions() {
      if (this.$props.categories.length === 0) {
        return [];
      }
      const listFilter = filter(this.$props.categories, (item) => {
        if (
          !this.lifeGenreTags.find((o) => o.catClassCd === item.catClassCd)
        ) {
          if (
            item.level === 3 &&
            item.catLrgClassCd === "113" &&
            item.catMidClassCd === "201"
          ) {
            return item;
          }
        }
      });
      const items = uniqBy(listFilter, "catClassCd");

      const collection = items?.map(obj => {
        return {
          id: obj.catClassCd + ',' + obj.name + ',' + obj.level,
          label: obj.name
        }
      })

      return collection;
    },

    areaMidClassOptions() {
      const collection = this.areaMidClasses?.map(obj => {
        return {
          id: obj.areaMidClassCd,
          label: obj.areaMidClassNm
        };
      });
      return collection && collection.length ? collection : [];
    },
    areaSmlClassOptions() {
      const collection = this.areaSmlClasses?.map(obj => {
        return {
          id: obj.areaSmlClassCd,
          label: obj.areaSmlClassNm
        };
      });
      return collection && collection.length ? collection : [];
    },
    areaDtlClassOptions() {
      const collection = this.areaDtlClasses?.map(obj => {
        return {
          id: obj.areaDtlClassCd,
          label: obj.areaDtlClassNm
        };
      });
      return collection && collection.length ? collection : [];
    }
  },
  methods: {
    async getSmlCodesArea(index) {
      const data = this.areaMidClasses[index - 1];
      const res = await this.$commonRepositories("search").getCodesArea({
        areaLrgClassCd: data.areaLrgClassCd,
        areaMidClassCd: data.areaMidClassCd
      });

      if (res) {
        this.form.areaLrgClassCd = data.areaLrgClassCd;
        this.form.areaMidClassCd = data.areaMidClassCd;
        this.areaSmlClasses =
          res?.data?.areaLrgClasses?.[0]?.areaMidClasses?.[0]?.areaSmlClasses ||
          [];
      }
    },
    async getDtlCodesArea(index) {
      const data = this.areaSmlClasses[index - 1];
      const res = await this.$commonRepositories("search").getCodesArea({
        areaLrgClassCd: this.form.areaLrgClassCd,
        areaMidClassCd: this.form.areaMidClassCd,
        areaSmlClassCd: data.areaSmlClassCd
      });
      if (res) {
        this.areaDtlClasses =
          res?.data?.areaLrgClasses?.[0]?.areaMidClasses?.[0]
            ?.areaSmlClasses?.[0]?.areaDtlClasses || [];
      }
    },
    resetFormAndAreas() {
      this.form.areaMidClassCd = '';
      this.form.areaSmlClassCd = '';
      this.form.areaDtlClassCd = '';
      this.areaSmlClasses = [];
      this.areaDtlClasses = [];
    },
    onChangeMidArea(event) {
      if (event.target.value === "") {
        this.resetFormAndAreas();
      } else if (event.target.value !== "") {
        this.form.areaMidClassCd = event.target.value;
        this.form.areaSmlClassCd = "";
        this.form.areaDtlClassCd = "";
        this.areaSmlClasses = [];
        this.areaDtlClasses = [];
        this.getSmlCodesArea(event.target.selectedIndex);
      }
    },


    onChangeSmlArea(event) {
      if (event.target.value === "") {
        this.form.areaSmlClassCd = "";
        this.form.areaDtlClassCd = "";
      } else if (event.target.value !== "") {
        this.form.areaSmlClassCd = event.target.value;
        this.form.areaDtlClassCd = "";
        this.getDtlCodesArea(event.target.selectedIndex);
      }
    },

    onChangeDtlArea(event) {
      this.form.areaDtlClassCd = event.target.value;
    },

    lifeGenreChanged(e) {
      const category = e.target.value.split(",");
      if (category.length !== 3) {
        return;
      }
      this.lifeGenreTags.push({
        catClassCd: category[0],
        name: category[1],
        level: category[2]
      });
    },
    deleteLifeGenreTags(index) {
      this.$delete(this.lifeGenreTags, index);
    },
    onInput(event) {
      this.form.keyword = event.target.value;
    },
    searchRequest() {
      if (
        !this.form.keyword &&
        !this.form.areaMidClassCd &&
        !this.form.areaSmlClassCd &&
        !this.form.areaDtlClassCd
      ) {
        this.form.keywordError = "カテゴリを選択するかキーワードを入力してください。";
        return;
      }

      const params = new URLSearchParams(this.getQueryString());
      const url = this.$BoBsffFrontendCommon.config.lifeSearchDomain + "/menus?" + params;
      window.open(url, "_self");
    },
    getQueryString() {
      const { keyword, areaMidClassCd, areaSmlClassCd, areaDtlClassCd } = this.form;
      const query = {
        type: 2,
        ...(keyword && { keyword }),
        ...(areaMidClassCd && { areaMidClassCd }),
        ...(areaSmlClassCd && { areaSmlClassCd }),
        ...(areaDtlClassCd && { areaDtlClassCd }),
        ...(this.lifeGenreTags.length && { lifeGenreTags: this.lifeGenreTags.map(x => x.catClassCd) }),
      };
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
}

.co-genre-tag-list .co-genre-tag {
  margin-bottom: 0.5rem;
  display: inline-block;
  margin-right: 2%;
  font-size: 12px;

  .co-delete-btn {
    width: 20px;
    border-radius: 10px;
    margin: 0 10px 0 5px;
  }
}
//We should remove .select-field-wrapper and use SelectField when lifeGenreChanged event behaviour is correct
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
    font-size: 12px;
    line-height: 1.25;
    background: #fff;
    border: 1px solid #cacccf;
    border-radius: 4px;
    padding: 0.375rem 0.5rem;
    width: 100%;
    height: 2.5rem;
    color: #000;

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