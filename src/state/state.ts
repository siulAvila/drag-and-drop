type Listener<T> = (items: T[]) => void;

export default abstract class State<T> {
  protected listeners: Listener<T>[] = [];
  protected items: T[] = [];

  addListener(listenerFn: Listener<T>) {
    this.listeners.push(listenerFn);
  }
}
