<script>
export default {
  render() {
        return null
    },
    data() {
        return {
            areaDtlClasses: []
        };
    },
    methods: {
        async getDtlCodesArea(data) {
            const res = await this.$commonRepositories('search').getCodesArea({
                areaLrgClassCd: data.areaLrgClassCd,
                areaMidClassCd: data.areaMidClassCd,
                areaSmlClassCd: data.areaSmlClassCd
            });
            if (res) {
                this.areaDtlClasses = res?.data?.areaLrgClasses?.[0]?.areaMidClasses?.[0]?.areaSmlClasses?.[0]?.areaDtlClasses || [];

                this.$emit('update', {
                    areaDtlClasses: this.areaDtlClasses,
                    areaDtlClassOptions: this.areaDtlClassOptions
                });
            }
        },
    },
    computed: {
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
};
</script>
  