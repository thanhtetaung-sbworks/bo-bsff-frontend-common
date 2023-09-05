import { RepositoryFactory } from '@/repositories/repository-factory';

export default (_, inject) => {
  const commonRepositories = (name) => {
    return RepositoryFactory.get(name);
  };
  inject('commonRepositories', commonRepositories);
};