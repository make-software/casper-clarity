import { observable } from 'mobx';

/** Similar to observable.map, but more intuitive with components
 * that can react when the values are set. */
export default class ObservableValueMap<K, V> {
  values = new Map<K, ObservableValue<V>>();

  get(key: K): ObservableValue<V> {
    if (!this.values.has(key)) {
      this.values.set(key, new ObservableValue());
    }
    return this.values.get(key)!;
  }

  // Set the value inside the item the component retrieved previously
  // with `get` so that the change can be observed.
  set(key: K, value: V) {
    this.get(key).value = value;
  }

  clear() {
    this.values.clear();
  }
}

export class ObservableValue<V> {
  @observable value: V | null = null;
}
