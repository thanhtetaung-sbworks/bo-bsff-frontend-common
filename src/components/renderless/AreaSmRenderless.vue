<script>
export default {
    render() {
        return null
    },
    data() {
        return {
            areaSmlClasses: [],
            areaLrgClassCd: null,
            areaMidClassCd: null,
        };
    },
    methods: {
        async getSmlCodesArea(data) {
            const res = await this.$commonRepositories('search').getCodesArea({
                areaLrgClassCd: data.areaLrgClassCd,
                areaMidClassCd: data.areaMidClassCd,
            });
            if (res) {
                this.areaLrgClassCd = data.areaLrgClassCd;
                this.areaMidClassCd = data.areaMidClassCd;
                this.areaSmlClasses =
                    res?.data?.areaLrgClasses?.[0]?.areaMidClasses?.[0]?.areaSmlClasses || [];

                this.$emit('update', {
                    areaSmlClasses: this.areaSmlClasses,
                    areaLrgClassCd: this.areaLrgClassCd,
                    areaMidClassCd: this.areaMidClassCd,
                    areaSmlClassOptions: this.areaSmlClassOptions
                });
            }
        },
    },
    computed: {
        areaSmlClassOptions() {
            const collection = this.areaSmlClasses?.map(obj => {
                return {
                    id: obj.areaSmlClassCd,
                    label: obj.areaSmlClassNm,
                };
            });
            return collection && collection.length ? collection : [];
        },
    },
    // Optionally, you can add lifecycle hooks or other properties specific to your use case.
};
</script>
  