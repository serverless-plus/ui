export interface AnyObject {
  [propName: string]: any;
}

const typeOf = (obj: any) => {
  return Object.prototype.toString.call(obj).slice(8, -1);
};

function isEmpty(val: any) {
  return (
    val === '' ||
    val === undefined ||
    val === null ||
    (typeOf(val) === 'Number' && isNaN(val)) ||
    (typeOf(val) === 'Array' && val.length === 0)
  );
}

function isObject(val: any) {
  return typeOf(val) === 'Object';
}

function isArray(val: any) {
  return typeOf(val) === 'Array';
}

function cleanEmptyValue(obj: AnyObject) {
  const newObj: AnyObject = {};
  Object.entries(obj).forEach(([key, val]) => {
    if (!isEmpty(val)) {
      newObj[key] = val;
    }
  });
  return newObj;
}

const deepClone = (obj: AnyObject) => {
  return JSON.parse(JSON.stringify(obj));
};

const objectToDotProp = (key: string, val: any, prefix?: string) => {
  const flatenArray = (arr: any[]) => {
    return arr.map((item: AnyObject) => {
      if (isObject(item)) {
        const newItem: AnyObject = {};
        const subKeyVals: AnyObject[] = [];
        Object.entries(item).forEach(([subKey, subVal]) => {
          subKeyVals.push(...objectToDotProp(subKey, subVal));
        });
        subKeyVals.forEach(item => {
          newItem[item.key] = item.val;
        });
        return newItem;
      } else {
        return item;
      }
    });
  };

  const newKey = prefix ? `${prefix}.${key}` : key;
  const keyVals = [];
  if (isObject(val)) {
    Object.entries(val).forEach(([subKey, subVal]) => {
      keyVals.push(...objectToDotProp(subKey, subVal, newKey));
    });
  } else if (isArray(val)) {
    val = flatenArray(val);
    keyVals.push({
      key: newKey,
      val,
    });
  } else {
    keyVals.push({
      key: newKey,
      val,
    });
  }
  return keyVals;
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
    if (isObject(val)) {
      const keyVals = objectToDotProp(key, val);
      keyVals.forEach(item => {
        newObj[item.key] = item.val;
      });
    } else {
      newObj[key] = val;
    }
  });

  return newObj;
};

// { 'a.b.c.d': 1, 'a.x': 2 } => {"a":{"b":{"c":{"d":1}},"x":2}}
const dotPropToObject = (key: string, val: any, obj: AnyObject = {}) => {
  const parseDotArray = (arr: any[]) => {
    return arr.map((item: AnyObject) => {
      if (isObject(item)) {
        const newItem: AnyObject = {};
        Object.entries(item).forEach(([subKey, subVal]) => {
          if (subKey.indexOf('.') !== -1) {
            dotPropToObject(subKey, subVal, newItem);
          } else {
            newItem[subKey] = subVal;
          }
        });
        return newItem;
      } else {
        return item;
      }
    });
  };
  if (isArray(val)) {
    val = parseDotArray(val);
  }
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
  let newObj: AnyObject = {};

  if (isObject(obj)) {
    Object.entries(obj).forEach(([key, val]) => {
      if (key.indexOf('.') !== -1) {
        dotPropToObject(key, val, newObj);
      } else {
        newObj[key] = val;
      }
    });
  }

  if (isArray(obj)) {
    console.log('array obj', obj);

    newObj = [];
    obj.forEach((item: AnyObject) => {
      newObj.push(parseConfig(item));
    });
  }

  return newObj;
};

export {
  isObject,
  isArray,
  isEmpty,
  deepClone,
  dotPropToObject,
  parseConfig,
  flatConfig,
  cleanEmptyValue,
};
