export const Storage = (key, shouldPersist = false) => {
  const storage = shouldPersist ? window.localStorage : window.sessionStorage;

  if (!key) {
    return [];
  }

  const get = () => {
    const valueSaved = storage.getItem(key);
    if (!valueSaved) {
      return null;
    }
    return JSON.parse(valueSaved);
  };

  const set = (rawValue) => {
    const value = JSON.stringify(rawValue);
    storage.setItem(key, value);
  };

  const remove = () => {
    storage.removeItem(key);
  };

  return [get(), set, remove];
};
