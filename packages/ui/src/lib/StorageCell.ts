import { observable, computed } from 'mobx';

// Store data in session storage.
export default class StorageCell<T> {
  @observable private value: T;

  constructor(private key: string, defaultValue: T) {
    const existing = sessionStorage.getItem(key);
    if (existing != null) {
      this.value = JSON.parse(existing);
    } else {
      this.value = defaultValue;
      this.save();
    }
  }

  private save() {
    sessionStorage.setItem(this.key, JSON.stringify(this.value));
  }

  @computed get get() {
    return this.value;
  }

  set(v: T) {
    this.value = v;
    this.save();
  }
}
