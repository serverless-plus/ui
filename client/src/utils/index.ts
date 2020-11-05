export interface AnyObject {
  [propName: string]: any;
}

const typeOf = (obj: any) => {
  return Object.prototype.toString.call(obj).slice(8, -1);
};

const deepClone = (obj: AnyObject) => {
  return JSON.parse(JSON.stringify(obj));
};

const objectToDotProp = (key: string, val: any, prefix?: string) => {
  const newKey = prefix ? `${prefix}.${key}` : key;
  const keyVals = [];
  if (typeOf(val) === 'Object') {
    Object.entries(val).forEach(([subKey, subVal]) => {
      keyVals.push(...objectToDotProp(subKey, subVal, newKey));
    });
  } else {
    const newKey = prefix ? `${prefix}.${key}` : key;
    keyVals.push({
      key: newKey,
      val,
    });
  }
  return keyVals;
};

// { 'a.b.c.d': 1, 'a.x': 2 } => {"a":{"b":{"c":{"d":1}},"x":2}}
const dotPropToObject = (key: string, val: any, obj: AnyObject = {}) => {
  const keyArr = key.split('.');
  if (!obj[keyArr[0]]) {
    obj[keyArr[0]] = {};
  }
  if (keyArr.length > 2) {
    const newKey = keyArr.slice(1).join('.');
    obj[keyArr[0]] = dotPropToObject(newKey, val, obj[keyArr[0]]);
  } else {
    if (!obj[keyArr[0]]) {
      obj[keyArr[0]] = {};
    }
    obj[keyArr[0]][keyArr[1]] = val;
  }
  return obj;
};

/**
 * transfer dot property object to nested object
 * eg: { 'a.b.c.d': 1, 'a.x': 2 } => {"a":{"b":{"c":{"d":1}},"x":2}}
 *
 * @param obj object
 */
const parseConfig = (obj: AnyObject) => {
  const newObj: AnyObject = {};

  Object.entries(obj).forEach(([key, val]) => {
    if (key.indexOf('.') !== -1) {
      dotPropToObject(key, val, newObj);
    } else {
      newObj[key] = val;
    }
  });
  return newObj;
};

/**
 * flat nested property object to dot property
 * eg: {"a":{"b":{"c":{"d":1}},"x":2}} => { 'a.b.c.d': 1, 'a.x': 2 }
 *
 * @param obj object
 */
const flatConfig = (obj: AnyObject) => {
  const newObj: AnyObject = {};
  Object.entries(obj).forEach(([key, val]) => {
    if (typeOf(val) === 'Object') {
      const keyVals = objectToDotProp(key, val);
      keyVals.forEach((item) => {
        newObj[item.key] = item.val;
      });
    } else {
      newObj[key] = val;
    }
  });

  return newObj;
};

export { deepClone, dotPropToObject, parseConfig, flatConfig };
