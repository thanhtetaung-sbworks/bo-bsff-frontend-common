<script>
import filter from "lodash/filter";
import uniqBy from "lodash/uniqBy";
export default {
    render() {
        return null;
    },
    props: {
        catLrgClassCd: {
            type: String,
            default: "",
        },
        catMidClassCd: {
            type: String,
            default: "",
        }
    },
    data() {
        return {
            categories: [],
            catLrgClassCdValue: this.catLrgClassCd,
            catMidClassCdValue: this.catMidClassCd
        };
    },
    computed: {
        middleCategoryOptions() {
            if (this.categories.length === 0) {
                return [];
            }

            const listFilter = filter(this.categories, (item) => {
                if (
                    item.level === 2 &&
                    item.catLrgClassCd === this.catLrgClassCdValue
                ) {
                    return item;
                }
            });
            const items = uniqBy(listFilter, "catClassCd");

            const collection = items?.map(obj => {
                return {
                    id: obj.catClassCd,
                    label: obj.name
                }
            });

            return collection && collection.length ? collection : [];
        },


        smallCategoryOptions() {
            if (this.categories.length === 0) {
                return [];
            }

            const listFilter = filter(
            this.categories,
            (item) =>
              item.level === 3 &&
              item.catLrgClassCd === this.catLrgClassCdValue &&
              item.catMidClassCd === this.catMidClassCdValue
          );

            const items = uniqBy(listFilter, "catClassCd");

            const collection = items?.map(obj => {
                return {
                    id: obj.catClassCd,
                    label: obj.name
                }
            });

            return collection && collection.length ? collection : [];
        },
    },
    methods: {
        updateCategoryValue(catLrgClassCd, catSmlClassCd) {
            this.catLrgClassCdValue = catLrgClassCd
            this.catMidClassCdValue = catSmlClassCd
            this.updateData();
        },
        async getCategories() {
            const res = await this.$commonRepositories("shop").getLargeCategories();
            if (res) {
                this.categories = res.data.categories || [];
            }
            this.updateData();
        },

        updateData() {
            this.$emit('update', {
                categories: this.categories,
                middleCategoryOptions: this.middleCategoryOptions,
                smallCategoryOptions: this.smallCategoryOptions
            });
        }
    }
};
</script>