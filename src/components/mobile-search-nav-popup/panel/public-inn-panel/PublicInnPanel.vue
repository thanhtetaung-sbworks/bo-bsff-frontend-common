<template>
  <div class="co-panel co-public-inn-panel">

    <div class="co-area-wrapper co-box-x-padding">

      <AreaMidRenderless @update="updateAreaMidClasses" />
      <SelectField first-option="大エリア" :options="areaMidClassOptions" v-model="areaMidClassCd" @changed="onChangeMidArea"
        :disabled="areaMidClasses.length === 0" />


      <AreaSmRenderless ref="AreaSmRenderless" @update="updateAreaSmlAction" />
      <SelectField first-option="中エリア" :options="areaSmlClassOptions" v-model="areaSmlClassCd" @changed="onChangeSmlArea"
        :disabled="areaMidClassCd === '' || areaSmlClasses.length === 0" />

      <AreaDtRenderless ref="AreaDtRenderless" @update="updateAreaDtAction" />
      <SelectField first-option="小エリア" :options="areaDtlClassOptions" v-model="areaDtlClassCd" @changed="onChangeDtlArea"
        :disabled="areaMidClassCd === '' || areaDtlClasses.length === 0" />

    </div>

    <div class="co-keyword-field-wrapper co-box-x-padding">
      <InputField placeholder="施設名、メニューNo、地名などを入力（例：東京 温泉）" v-model="publicKeyword" @input="keywordInput"
        @keypressEnter="onPublicStaySearch()" :error="error.keywordError" autocomplete="on" />
    </div>

    <InputErrorMessage wrapper-class="co-error-bar" v-if="error.keywordError" :message="error.keywordError" />

    <FooterStickySearchButton @clicked="onPublicStaySearch" />

  </div>
</template>
    
<script>
import SelectField from "@/components/form-fields/select-field/SelectField.vue";
import InputField from "@/components/form-fields/input-field/InputField.vue";
import FooterStickySearchButton from "@/components/action-button/footer-sticky-search-button/FooterStickySearchButton.vue";
import InputErrorMessage from '@/components/input-error-message/InputErrorMessage.vue';
import AreaMidRenderless from '@/components/renderless/AreaMidRenderless.vue';
import AreaSmRenderless from '@/components/renderless/AreaSmRenderless.vue';
import AreaDtRenderless from "@/components/renderless/AreaDtRenderless.vue";
export default {
  components: {
    SelectField,
    InputField,
    FooterStickySearchButton,
    InputErrorMessage,
    AreaMidRenderless,
    AreaSmRenderless,
    AreaDtRenderless
  },
  props: {
    boCode: {
      type: String
    }
  },
  data() {
    return {
      publicKeyword: "",
      areaMidClassOptions: [],
      areaMidClasses: [],
      areaSmlClassOptions: [],
      areaSmlClasses: [],
      areaDtlClassOptions: [],
      areaDtlClasses: [],

      areaLrgClassCd: "",
      areaMidClassCd: "",
      areaSmlClassCd: "",
      areaDtlClassCd: "",
      error: {
        keywordError: ""
      },
    };
  },
  methods: {
    updateAreaMidClasses(data) {
      this.areaMidClasses = data.areaMidClasses;
      this.areaMidClassOptions = data.areaMidClassOptions;
    },
    updateAreaSmlAction(data) {
      this.areaSmlClasses = data.areaSmlClasses;
      this.areaLrgClassCd = data.areaLrgClassCd;
      this.areaMidClassCd = data.areaMidClassCd;
      this.areaSmlClassOptions = data.areaSmlClassOptions;
    },

    updateAreaDtAction(data) {
      this.areaDtlClasses = data.areaDtlClasses;
      this.areaDtlClassOptions = data.areaDtlClassOptions;
    },
    onChangeMidArea(event) {
      if (event.target.value === "") {
        this.resetAreaSelection();
      } else {
        this.areaMidClassCd = event.target.value;
        this.resetAreaSelection();
        const currentAreMidClass = this.areaMidClasses[event.target.selectedIndex - 1];
        this.$refs.AreaSmRenderless.getSmlCodesArea(currentAreMidClass);
      }
    },
    onChangeSmlArea(event) {
      if (event.target.value === "") {
        this.areaSmlClassCd = "";
        this.areaDtlClassCd = "";
        this.areaDtlClasses = [];
      } else {
        this.areaSmlClassCd = event.target.value;
        this.areaDtlClassCd = "";
        this.areaDtlClasses = [];
        const currentAreSmlClass = this.areaSmlClasses[event.target.selectedIndex - 1];
        this.$refs.AreaDtRenderless.getDtlCodesArea({
          areaLrgClassCd: this.areaLrgClassCd,
          areaMidClassCd: this.areaMidClassCd,
          areaSmlClassCd: currentAreSmlClass.areaSmlClassCd,
        });
      }
    },
    resetAreaSelection() {
      this.areaMidClassCd = "";
      this.areaSmlClassCd = "";
      this.areaDtlClassCd = "";
      this.areaSmlClasses = [];
      this.areaDtlClasses = [];
    },
    onChangeDtlArea(event) {
      this.areaDtlClassCd = event.target.value;
    },
    keywordInput(e) {
      this.publicKeyword = e.target.value;
    },
    onPublicStaySearch() {
      this.error.keywordError = "";
      if ( !this.publicKeyword && !this.areaMidClassCd ) {
        this.error.keywordError = "キーワードを入力するかエリアを選択してください。";
        return;
      }

      const url = `${this.$BoBsffFrontendCommon.config.staySearchDomain}?keyword=${this.publicKeyword}&areaLrgClassCd=${this.areaLrgClassCd}&areaMidClassCd=${this.areaMidClassCd}&areaSmlClassCd=${this.areaSmlClassCd}&areaDtlClassCd=${this.areaDtlClassCd}&category=publicStay`;
      window.open(url, "_self");
    },
  },
};
</script>
<style scoped lang="scss">
@import "@/components/mobile-search-nav-popup/panel/pane.scss";

.co-area-wrapper {
  display: flex;
  margin: 0.5rem 0 0;

  ::v-deep .co-select-field-wrapper {
    margin-right: 8px;
    width: 100%;
    margin-bottom: 0;
  }
}
.co-error-bar {
  padding-top: 1.5rem;
}
@media screen and (max-width: 500px) {
  .co-area-wrapper {
    flex-direction: column;
    ::v-deep .co-select-field-wrapper {
      margin-bottom: 0.5rem;
      select {
        cursor: pointer;
        font-size: .8rem;
      }
    }
  }
}
</style>
    