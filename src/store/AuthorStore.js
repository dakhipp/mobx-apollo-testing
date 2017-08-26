import { observable, action } from 'mobx';

class AuthorStore {
  @observable author = undefined;

  @action setAuthor(authorObj) {
  	this.author = authorObj;
  }
}

export default new AuthorStore();
