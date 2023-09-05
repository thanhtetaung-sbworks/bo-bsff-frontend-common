<template>
  <div class="co-panel co-accommodation-panel">

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
      <InputField placeholder="施設名、メニューNo、地名などを入力（例：東京 温泉）" v-model="domesticKeyword" @input="domesticInput"
        @keypressEnter="onDomesticStaySearch()" :error="error.keywordError" autocomplete="on" />
    </div>

    <GrayBgTitle title="期間" />

    <div class="co-date-night-wrapper co-box-x-padding co-box-y-padding">

      <div class="co-date-picker-wrapper">
        <date-picker class="co-datepicker-inner-wrapper" placeholder="YYYY/MM/DD" :language="$root.Datepicker.language.ja"
          :disabled-dates="pickerOption.disabledDates" :format="pickerOption.displayFormat" v-model="checkInDate"
          clear-button clear-button-icon="fa fa-times-circle" />
        <SvgIcon name="top_calendar" height="18" width="18" />
      </div>

      <div class="co-from-text">から</div>

      <PlusMinusSelect :options="stayNightOptions" v-model="stayNights" @changed="staySelectChange" />

    </div>

    <GrayBgTitle title="部屋数" />

    <div class="co-room-people-wrapper co-box-x-padding co-box-y-padding">

      <PlusMinusSelect :options="roomOptions" v-model="rooms" @changed="roomSelectChange" wrapper-class="room-selector" />

      <div class="co-sub-title">1部屋ご利用人数</div>

      <div class="co-number-of-people">
        <span class="co-open-l">└</span>
        <span class="co-adult-label co-label">大人</span>

        <PlusMinusSelect :options="adultOptions" v-model="adult" @changed="adultSelectChange" />

        <span class="co-child-label co-label">/子ども</span>

        <div class="co-adult-input-wrapper">
          <VDropdown>
            <InputField :value="child | humanUnit" @input="peoples" />
            <template #popper>
              <ChildPicker :rooms="rooms" v-model="child" @changeChildrenQuantity="onChangeChildrenQuantity" />
            </template>
          </VDropdown>
        </div>

      </div>

    </div>

    <GrayBgTitle title="部屋タイプ" />

    <div class="co-room-type-wrapper co-box-x-padding co-box-y-padding">

      <CheckboxField label="禁煙" v-model="roomCondition" :default-value="'isNonSmokingRoom'" />
      <CheckboxField label="喫煙" v-model="roomCondition" :default-value="'isSmokingRoom'" />
      <CheckboxField label="おまかせ" v-model="smok_random_flag" :default-value="smok_random_flag" />

    </div>

    <GrayBgTitle title="こだわり条件" />

    <div class="co-rakuten-type-wrapper co-box-x-padding co-box-y-padding">
      <CheckboxField v-model="planByCompany" :default-value="'isNotRakuten'">
        <img
          src="data:image/png;base64,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"
          alt="Beneオリジナル" />
      </CheckboxField>

      <CheckboxField v-model="planByCompany" :default-value="'isRakuten'">
        <img
          src="data:image/png;base64,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"
          alt="BeneRakutentravel" />
      </CheckboxField>

    </div>

    <InputErrorMessage wrapper-class="co-error-bar" v-if="error.keywordError" :message="error.keywordError" />

    <FooterStickySearchButton @clicked="onDomesticStaySearch" />

  </div>
</template>
  
<script>
import ChildPicker from "@/components/child-picker/ChildPicker.vue";
import GrayBgTitle from "@/components/gray-bg-title/GrayBgTitle.vue";
import SvgIcon from '@/components/icon/SvgIcon.vue'
import PlusMinusSelect from "@/components/form-fields/plus-minus-select/PlusMinusSelect.vue";
import CheckboxField from "@/components/form-fields/checkbox-field/CheckboxField.vue";
import SelectField from "@/components/form-fields/select-field/SelectField.vue";
import InputField from "@/components/form-fields/input-field/InputField.vue";
import FooterStickySearchButton from "@/components/action-button/footer-sticky-search-button/FooterStickySearchButton.vue";
import InputErrorMessage from '@/components/input-error-message/InputErrorMessage.vue';
import AreaMidRenderless from '@/components/renderless/AreaMidRenderless.vue';
import AreaSmRenderless from '@/components/renderless/AreaSmRenderless.vue';
import AreaDtRenderless from "@/components/renderless/AreaDtRenderless.vue";
export default {
  components: {
    ChildPicker,
    SelectField,
    GrayBgTitle,
    SvgIcon,
    PlusMinusSelect,
    CheckboxField,
    FooterStickySearchButton,
    InputField,
    InputErrorMessage,
    AreaMidRenderless,
    AreaSmRenderless,
    AreaDtRenderless
  },
  filters: {
    humanUnit(value) {
      return `${value}人`;
    }
  },
  props: {
    boCode: {
      type: String
    }
  },
  data() {
    return {
      stayIsActive: 1,
      domesticKeyword: "",
      pickerOption: {
        displayFormat: "yyyy/MM/dd",
        disabledDates: {
          to: new Date(new Date().setDate(new Date().getDate() - 1))
        }
      },
      planByCompany: [],
      roomCondition: [],
      serviceEquip: [],
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
      stayNights: "1",
      rooms: "1",
      adult: 2,
      child: 0,
      people: 1,
      chillDetails: {
        exUpperGradesHeadCnt: 0,
        exLowerGradesHeadCnt: 0,
        youjiAHeadCnt: 0,
        youjiBHeadCnt: 0,
        youjiCHeadCnt: 0,
        youjiDHeadCnt: 0
      },
      smok_random_flag: false,
      checkInDate: "",
      error: {
        keywordError: ""
      },
    };
  },
  computed: {
    adultOptions() {
      return this.generateOptions(1, 10);
    },
    roomOptions() {
      return this.generateOptions(1, 10);
    },
    stayNightOptions() {
      return this.generateOptions(1, 6, "泊", true);
    },
  },
    methods: {
      generateOptions(start, end, labelSuffix = "", useLabel = false) {
      const options = [];
      for (let n = start; n <= end; n++) {
        const label = useLabel ? `${n}${labelSuffix}` : n;
        options.push({ id: n, label });
      }
      return options;
    },
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
      getISODate(date) {
        return date ? this.$moment(date).format("YYYY-MM-DD") : "";
      },
      domesticInput(e) {
        this.domesticKeyword = e.target.value;
      },
      getGroupParams(group) {
        return group?.length ? group.filter(Boolean).toString() : "";
      },
      toQueryString(paramsObject) {
        return Object.keys(paramsObject)
          .filter((item) => paramsObject[item])
          .map((key) => `${key}=${paramsObject[key]}`)
          .join("&");
      },
      onDomesticStaySearch() {
        this.error.keywordError = "";
        if (
          !this.domesticKeyword &&
          !this.areaMidClassCd
        ) {
          this.error.keywordError =
            "キーワードを入力するかエリアを選択してください。";
          return;
        }
        const uri = this.$BoBsffFrontendCommon.config.staySearchDomain;
        const params = {
          category: "stay",
          rooms: this.rooms,
          roomCnt: this.rooms,
          numPeople: this.child + this.adult,
          stayNights: this.stayNights,
          keyword: this.domesticKeyword,
          areaLrgClassCd: this.areaLrgClassCd,
          areaMidClassCd: this.areaMidClassCd,
          areaSmlClassCd: this.areaSmlClassCd,
          areaDtlClassCd: this.areaDtlClassCd,
          // smok_random_flag: this.smok_random_flag ? 1 : 0,
          checkInDate: this.getISODate(this.checkInDate),
          roomCondition: this.getGroupParams(this.roomCondition),
          planByCompany: this.getGroupParams(this.planByCompany),
          adultHeadCnt: this.adult,
          exUpperGradesHeadCnt: this.chillDetails.exUpperGradesHeadCnt,
          exLowerGradesHeadCnt: this.chillDetails.exLowerGradesHeadCnt,
          youjiAHeadCnt: this.chillDetails.youjiAHeadCnt,
          youjiBHeadCnt: this.chillDetails.youjiBHeadCnt,
          youjiCHeadCnt: this.chillDetails.youjiCHeadCnt,
          youjiDHeadCnt: this.chillDetails.youjiDHeadCnt
        };
        const queryParams = this.toQueryString(params);
        window.open(`${uri}?${queryParams}`, "_self");
      },
      staySelectChange(value) {
        this.stayNights = value;
      },
      roomSelectChange(value) {
        this.rooms = value;
      },
      adultSelectChange(value) {
        this.adult = value
        this.peoples();
      },
      childDecrement() {
        if (this.child > 1) {
          this.child--;
          this.peoples();
        }
      },
      childIncrement() {
        if (this.child < 10) {
          this.child++;
          this.peoples();
        }
      },
      peoples() {
        return (this.people = parseInt(this.adult) + parseInt(this.child));
      },
      onChangeMidArea(event) {
        if (event.target.value === "") {
          this.areaMidClassCd = "";
          this.areaSmlClassCd = "";
          this.areaDtlClassCd = "";
          this.areaSmlClasses = [];
          this.areaDtlClasses = [];
        } else if (event.target.value !== "") {
          this.areaMidClassCd = event.target.value;
          this.areaSmlClassCd = "";
          this.areaDtlClassCd = "";
          this.areaSmlClasses = [];
          this.areaDtlClasses = [];
          const currentAreMidClass = this.areaMidClasses[event.target.selectedIndex - 1];
          this.$refs.AreaSmRenderless.getSmlCodesArea(currentAreMidClass)
        }
      },
      onChangeSmlArea(event) {
        if (event.target.value === "") {
          this.areaSmlClassCd = "";
          this.areaDtlClassCd = "";
          this.areaDtlClasses = [];
        } else if (event.target.value !== "") {
          this.areaSmlClassCd = event.target.value;
          this.areaDtlClassCd = "";
          this.areaDtlClasses = [];
          const currentAreSmlClass = this.areaSmlClasses[event.target.selectedIndex - 1];
          this.$refs.AreaDtRenderless.getDtlCodesArea({
            areaLrgClassCd: this.areaLrgClassCd,
            areaMidClassCd: this.areaMidClassCd,
            areaSmlClassCd: currentAreSmlClass.areaSmlClassCd
          });
        }
      },
      onChangeDtlArea(event) {
        this.areaDtlClassCd = event.target.value;
      },
      onChangeChildrenQuantity(childDetails) {
        this.chillDetails = childDetails;
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
  }
}

//datepicker 
.co-date-night-wrapper {
  display: flex;
  align-items: center;

  .co-from-text {
    margin-left: 0.6rem;
    margin-right: 0.2rem;
    font-size: 12px;
  }
}

.co-date-picker-wrapper {
  position: relative;
  font-size: 0.8rem;
  background: #fff;
  display: flex;
  align-items: center;
  max-width: 8.5rem;

  svg {
    position: absolute;
    right: 0.75rem;
    top: 10px;
  }

  ::v-deep input {
    border: 1px solid #CACCCF;
    border-radius: 4px;
    padding: 0.375rem 2rem 0.375rem 0.6rem;
    width: 8.5rem;
    height: 2.5rem;
    font-size: 0.8rem;
    cursor: pointer;
    text-align: right;
  }

  ::v-deep .vdp-datepicker__clear-button {
    position: absolute;
    left: 10px;
    top: 7px;
    font-size: 23px;
  }
}


@media screen and (max-width: 500px) {
  .co-area-wrapper {
    flex-direction: column;
  }
}

//room
.co-room-people-wrapper {
  display: flex;
  gap: 0.5rem;
  flex-direction: column;
  margin: 0.5rem 0;

  .co-number-of-people {
    display: flex;
    align-items: center;

    .co-label {
      font-weight: bold;
      margin: 0 8px;
    }
  }

  .co-input-field-wrapper {
    margin-bottom: 0;
    max-width: 50px;
    text-align: center;

    ::v-deep input {
      padding: 0;
      width: 50px;
      height: 40px;
      text-align: center;
    }
  }
}

//room-type-wrapper
.co-room-type-wrapper {
  display: flex;
}

//rakuten-type-wrapper
.co-rakuten-type-wrapper {
  display: flex;
}

//error-bar
.co-error-bar {
  padding-top: 1.5rem;
}
</style>
  