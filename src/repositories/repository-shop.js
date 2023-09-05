import {Repository} from "@/main.js";
const resourceSearchCategory = "/v1/search/largeCategories";

export default {
  getLargeCategories(params) {
    return Repository.get(`${resourceSearchCategory}`, { params: params });
  },

};
