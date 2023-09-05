<script>
export default {
    render() {
        return null
    },
    data() {
        return {
            categories: []
        };
    },
    methods: {
        async getLargeCategories() {
            const res = await this.$commonRepositories("search").getLargeCategories();
            if (res) {
                this.categories = res.data.categories || [];
                this.update({
                    categories: this.categories
                })
            }
        },
        update(data) {
            this.$emit('update', data);
        }
    },
    computed: {

    },
};
</script>
  