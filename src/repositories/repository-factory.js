
import search from "./repository-search.js";
import shop from "./repository-shop.js";
import mock_search from "./mock/repository-search.js";
import mock_shop from "./mock/repository-shop.js";

const repository = {
  search,
  shop
};

const mock_repository = {
  mock_search,
  mock_shop
}




const mode = ""; // "mock";
const repositories =  mode === "mock" ? mock_repository : repository;

export const RepositoryFactory = {
  get: (name) => {
    const repositoryName = mode === "mock" ? `mock_${name}` : name;
    return (
      repositories[repositoryName] ||
      console.error(`${repositoryName} repository is not found.`)
    );
  }
};
