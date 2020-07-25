import { capitalize } from "@core/utils";

export class DomListener {
  constructor($root, listeners = []) {
    if (!$root) {
      throw new Error(`no $root provided for DomListener.`);
    }
    this.$root = $root;
    this.listeners = listeners;
  }

  initDOMListeners() {
    this.listeners.forEach((listener) => {
      const method = getMethodName(listener);
      if (!this[method]) {
        throw new Error(`method ${method} is not 
        implemented in ${this.name} Component!`);
      }
      this[method] = this[method].bind(this);
      // те ж саме що і addEventListener
      this.$root.on(listener, this[method]);
    });
  }

  removeDOMListeners() {
    this.listeners.forEach((listener) => {
      const method = getMethodName(listener);
      // те ж саме що і removeEventListener
      this.$root.off(listener, this[method]);
    });
  }
}

// input -> onInput
function getMethodName(eventName) {
  return "on" + capitalize(eventName);
}
