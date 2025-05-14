import { allDataProps } from './SearchComponents/types';
interface FieldType {
  [key: string]: string | number;
}
interface FindFieldsProps {
  struct?: any;
  formData: any;
}

export function displayInput({ struct, formData }: FindFieldsProps) {
  if (struct?.notDisplay) {
    return false;
  } else if (struct?.displayDependency?.length) {
    const fields: FieldType = {};
    if (!struct?.displayDependency) return false;
    for (const item of struct.displayDependency) {
      if (item.watchId && item?.watchId)
        fields[item?.watchId] = formData?.[item?.watchId];
    }

    let hasExpectedValue = true;

    if (!struct?.displayDependency) return false;
    for (const item of struct.displayDependency) {
      if (item.value?.length && item.watchId) {
        if (!fields[item?.watchId] && item?.showByDefault) {
          hasExpectedValue = hasExpectedValue && true;
        } else if (
          (item.value as string[]).includes(fields[item?.watchId] as string)
        ) {
          hasExpectedValue = hasExpectedValue && true;
        } else hasExpectedValue = hasExpectedValue && false;
      } else {
        hasExpectedValue = hasExpectedValue && true;
      }
    }
    return hasExpectedValue;
  } else {
    return true;
  }
}

export function hasUndefinedValues(data: any) {
  for (const key in data) {
    if (Object.prototype.hasOwnProperty.call(data, key)) {
      if (typeof data[key] === 'undefined' || !data[key]) {
        return false;
      }
    }
  }
  return true;
}

export function areRequiredKeysDefined(data: any, requiredField: string[]) {
  for (const key of requiredField) {
    if (
      !Object.prototype.hasOwnProperty.call(data, key) ||
      !data[key] ||
      (Array.isArray(data[key]) && data[key]?.length === 0)
    ) {
      return false;
    }
  }
  return true;
}

export function areQueriesOptional(data?: allDataProps, watch?: any) {
  const value = [];
  for (const key in data) {
    if (watch(key)) {
      value.push(watch(key));
    }
  }
  if (value?.length) {
    return true;
  }
  return false;
}

export function areConditionalRequiredKeysDefined(
  data: any,
  requiredField: any[],
) {
  for (const field of requiredField) {
    if (!field.watchId || !field.value) {
      if (field.fieldName && !data[field.fieldName]) {
        return false;
      }
    } else {
      const watchedValue = data[field.watchId];
      if (field.value.includes(watchedValue)) {
        if (field.fieldName && !data[field.fieldName]) {
          return false;
        }
      }
    }
  }
  return true;
}

export function removeUndefinedProperties(data: any) {
  const newObj: any = {};
  for (const key in data) {
    if (data[key]) {
      if (Array.isArray(data[key]) && data[key]?.length !== 0) {
        newObj[key] = data[key];
      }
      if (!Array.isArray(data[key])) {
        newObj[key] = data[key];
      }
    }
  }
  return newObj;
}

export function SelectedOneField(data: any) {
  const checkSubmittedData = Object.values(data).every(
    (item) => item === undefined,
  );
  return checkSubmittedData;
}

export const convertArrayValuesToCommaSeparated = (data: any) => {
  Object.keys(data)?.forEach((key) => {
    if (Array.isArray(data[key])) {
      const commaSeparated = data[key]?.join(',');
      data = { ...data, [key]: commaSeparated };
    }
  });
  return data;
};
