<script>
export default {
  render() {
    return null;
  },
  data() {
    return {
      areaMidClasses: []
    };
  },
  computed: {
    isSearchPopupShow() {
      return this.$store.state.navSearch.isOpen
    },
    areaMidClassesData() {
      return this.$store.state.searchPopup.stayPanel.areaMidClassesData;
    },
    options() {
      const collection = this.areaMidClassesData?.map(obj => {
        return {
          id: obj.areaMidClassCd,
          label: obj.areaMidClassNm
        };
      });
      return collection && collection.length ? collection : [];
    }
  },
  methods: {
    async getMidCodesArea() {
      const res = await this.$commonRepositories("search").getLargeCodesArea();
      if (res) {
        this.areaMidClasses = res.data || [];
        this.$store.dispatch('searchPopup/stayPanel/upateAreaMidClassesData', this.areaMidClasses);
      }
      this.updateData();
    },
    updateData() {
      this.$emit('update', {
        areaMidClasses: this.areaMidClassesData,
        areaMidClassOptions: this.options 
      });
    }
  },
  created() {
    if (this.isSearchPopupShow && this.areaMidClassesData.length === 0) {
      this.getMidCodesArea();
    } else {
      this.updateData();
    }
  }
};
</script>