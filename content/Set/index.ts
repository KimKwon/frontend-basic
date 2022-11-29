const generateId = (function () {
  let uniqueNumber = 1;
  const prefix = "__unique-";

  return () => prefix + uniqueNumber++;
})();

const SYM: unique symbol = Symbol.for("__unique");

interface ISet {
  get(element: unknown): unknown | undefined;
  has(element: unknown): boolean;
  add(element: unknown): void;
  forEach(callback: (element: unknown) => void): void;
}

type TSetItems = {
  [key: TSetItemKey]: unknown;
};

type TSetItem = { [SYM]?: string };

type TPrimitive =
  | string
  | number
  | bigint
  | symbol
  | boolean
  | null
  | undefined;

type TSetItemKey = string | symbol;

const isSetItemKey = (key: unknown): key is TSetItemKey => {
  const keyType = typeof key;
  return keyType === "string" || keyType === "symbol";
};

const isPrimitive = (key: unknown): key is TPrimitive => {
  return !isObjectItem(key);
};

const isObjectItem = (element: unknown): element is TSetItem => {
  return (
    (typeof element === "object" && element !== null) ||
    typeof element === "function"
  );
};

class MySet implements ISet {
  #items: TSetItems = {};

  constructor(iterable?: Array<unknown>) {
    iterable?.forEach((item) => {
      this.add(item);
    });
  }

  #getItemKey(element: unknown): TSetItemKey | symbol | undefined {
    if (isObjectItem(element)) {
      const target = element?.[SYM];
      if (target === undefined) return undefined;

      return Symbol.for(target);
    }

    if (isPrimitive(element)) {
      if (isSetItemKey(element)) {
        return element;
      }

      return Symbol.for(element as any);
    }

    return undefined;
  }

  has(element: unknown): boolean {
    const key = this.#getItemKey(element);
    if (key === undefined) return false;

    return this.#items.hasOwnProperty(key);
  }

  add(element: unknown): void {
    if (typeof element === "symbol")
      throw Error("Symbol is not supported now.");
    if (this.has(element)) return;

    let currentKey: TSetItemKey = Symbol.for(element as any);

    if (isSetItemKey(element)) {
      currentKey = element;
    }

    if (isObjectItem(element)) {
      const generatedKey = generateId();
      Object.defineProperty(element, SYM, {
        value: generatedKey,
      });

      currentKey = Symbol.for(generatedKey);
    }

    Object.defineProperty(this.#items, currentKey, {
      value: element,
    });
  }

  forEach(callback: (element: unknown) => void): void {
    for (const value of Object.getOwnPropertySymbols(this.#items)) {
      callback(this.#items[value]);
    }
  }

  get(element: unknown) {
    if (!this.has(element)) return undefined;

    const key = this.#getItemKey(element);
    if (!key) return undefined;

    return this.#items[key];
  }

  *[Symbol.iterator]() {
    for (const symbolKey of Object.getOwnPropertySymbols(this.#items)) {
      yield this.#items[symbolKey];
    }

    for (const key of Object.getOwnPropertyNames(this.#items)) {
      yield this.#items[key];
    }
  }
}
