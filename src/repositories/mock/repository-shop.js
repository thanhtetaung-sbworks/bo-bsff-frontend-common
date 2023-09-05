// import Repository from "../repository";
import mockDataCategories from "./mockdata/shopCategories.json";

export default {
  getLargeCategories() {
    return new Promise(resolve => {
      resolve({
        status: 200,
        data: mockDataCategories
      })
    })
  },

};
