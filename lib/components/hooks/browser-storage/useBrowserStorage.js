/**
 * © Copyright IBM Corp. 2021, 2023
 * SPDX-License-Identifier: Apache-2.0
 */


export default (React) => (props) => {
  const {
    key,
    initialValue = null,
    storageType = 'local'
  } = props;

  const storage = storageType === 'session' ? window.sessionStorage : window.localStorage;

  const [tabStorageChangeEvent] = React.useState(() => {
    return new Event(`${storageType}-storage-${key}`, { bubbles: true });
  });

  const [storedValue, setStoredValue] = React.useState(() => {
    const value = safelyParseJSON(storage.getItem(key));

    if (value === null || typeof value === 'undefined') {
      storage.setItem(key, JSON.stringify(initialValue));
      return initialValue;
    }
    return value;
  });

  const handleStorageChangeEvent = React.useCallback(() => {
    const newValue = storage.getItem(key);

    if (newValue !== null && typeof newValue !== 'undefined' && newValue !== JSON.stringify(storedValue)) {
      setValue(JSON.parse(newValue));
    } else if ((newValue === null || typeof newValue === 'undefined') && initialValue) {
      setValue(initialValue);
    }
  }, [key, storedValue, initialValue, setValue, storage]);

  React.useEffect(() => {
    window.addEventListener(`${storageType}-storage-${key}`, handleStorageChangeEvent);

    return () => {
      window.removeEventListener(`${storageType}-storage-${key}`, handleStorageChangeEvent);
    };
  }, [handleStorageChangeEvent, key, storageType]);

  const setValue = React.useCallback(newValue => {
    try {
      storage.setItem(key, JSON.stringify(newValue));
    } catch (err) {
      console.warn('Unable to set session storage value', err);
    }

    setStoredValue(newValue);

    try {
      document.dispatchEvent(tabStorageChangeEvent);
    } catch (error) {
      // ignore err
    }
  }, [tabStorageChangeEvent, key, storage]);

  return [storedValue, setValue];
};

function safelyParseJSON(string) {
  let parsedStringValue;

  if (string) {
    try {
      parsedStringValue = JSON.parse(string);
    } catch {
      parsedStringValue = string;

      if (parsedStringValue === 'undefined') {
        /* eslint-disable-next-line */
        parsedStringValue = undefined;
      }
    }
  }

  return parsedStringValue;
}
