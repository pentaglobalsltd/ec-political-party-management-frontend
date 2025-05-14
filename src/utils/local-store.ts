export function getStorage(key: string) {
  const now = Date.now();

  let expiresIn: string | null | number = localStorage.getItem(
    key + '_expiresIn',
  );
  if (expiresIn === undefined || expiresIn === null) {
    expiresIn = 0;
  }

  expiresIn = Math.abs(expiresIn as number);
  if (expiresIn < now) {
    // Expired
    removeStorage(key);
    return null;
  } else {
    try {
      const value = localStorage.getItem(key);
      return value;
    } catch (e) {
      console.log(
        'getStorage: Error reading key [' +
          key +
          '] from localStorage: ' +
          JSON.stringify(e),
      );
      return null;
    }
  }
}

export function removeStorage(key: string) {
  try {
    localStorage.setItem(key, '');
    localStorage.setItem(key + '_expiresIn', '');
  } catch (e) {
    console.log(
      'removeStorage: Error removing key [' +
        key +
        '] from localStorage: ' +
        JSON.stringify(e),
    );
    return false;
  }
  return true;
}

export function setStorage(key: string, value: any, expires?: number | null) {
  if (expires === undefined || expires === null) {
    expires = 24 * 60 * 60;
  }

  const now = Date.now();
  const schedule: number | string = now + expires * 1000;
  try {
    localStorage.setItem(key, value);
    localStorage.setItem(key + '_expiresIn', schedule as any);
  } catch (e) {
    console.log(
      'setStorage: Error setting key [' +
        key +
        '] in localStorage: ' +
        JSON.stringify(e),
    );
    return false;
  }
  return true;
}
