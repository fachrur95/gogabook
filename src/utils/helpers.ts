import type { IRole } from "@/types/cores/roles";
import type { GridFilterItem } from "@mui/x-data-grid-pro";

export const variantNameShown = (name: string): string => {
  // const splitted = name.split(",");
  return name.replaceAll(",", " ")
}

export const fileToBase64 = (file: File | Blob): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      resolve(reader.result as string);
    };

    reader.readAsDataURL(file);
    reader.onerror = reject;
  });

export const truncateText = (input: string, max = 45): string => input.length > max ? `${input.substring(0, max)}...` : input;

const codeFormat = "id-ID";

const FormatCurrency = new Intl.NumberFormat(codeFormat, {
  minimumFractionDigits: 0,
  style: 'currency',
  currency: 'IDR',
});

const FormatNumber = new Intl.NumberFormat(codeFormat, {
  minimumFractionDigits: 0,
});

export const formatCurrency = (value: number): string => FormatCurrency.format(value);

export const formatNumber = (value: number): string => FormatNumber.format(value);

export const isJson = (str: string): boolean => {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
}

export const checkNull = (value: string | null): string | null => {
  if (typeof value === "string" && value === "") {
    return null;
  }

  return value;
}

export const checkZero = (value: number | null): number | null => {
  if (typeof value === "number" && isNaN(value)) {
    return 0;
  }

  return value;
}

export const dateConvert = (date: Date, options?: Intl.DateTimeFormatOptions): string => date.toLocaleString("en-US", options);

export const getPublicIdCloudinary = (url: string): string | undefined => {
  const split1 = url.split("/ptnq/")?.[1];
  const split2 = split1?.split(".webp")?.[0];

  return split2 ? `ptnq/${split2}` : split2;
}

export const generateHex = (size = 6): string => {
  const result = [];
  const hexRef = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f'];

  for (let n = 0; n < size; n++) {
    result.push(hexRef[Math.floor(Math.random() * 16)]);
  }
  return result.join('');
}

export const isBase64 = (value: string): boolean => {
  const patttern = /^([A-Za-z0-9+/]{4})*([A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{2}==)?$/;
  const result = value.match(patttern) ? true : false;

  return result
}

export const isValidUrl = (urlString: string): boolean => {
  let url;
  try {
    url = new URL(urlString);
  }
  catch (e) {
    return false;
  }
  return url.protocol === "http:" || url.protocol === "https:";
}

export const currentDate = (param = new Date()): string => {
  const date = param.getDate();
  const month = param.getMonth() + 1;
  const year = param.getFullYear();

  return `${year}/${month}/${date}`
}

// eslint-disable-next-line @typescript-eslint/no-unsafe-return
export const convertToArabicText = (conventionalNumber: string): string => {
  const arabicNumbers: Record<string, string> = {
    '0': '٠',
    '1': '١',
    '2': '٢',
    '3': '٣',
    '4': '٤',
    '5': '٥',
    '6': '٦',
    '7': '٧',
    '8': '٨',
    '9': '٩',
  };

  const arabicText = conventionalNumber
    .split('')
    .map((digit) => (arabicNumbers[digit] ? arabicNumbers[digit] : digit))
    .join('');

  return arabicText;
}


/* export const findNestedObj = ({
  arrayObj,
  valueFind,
  keyFind = "masterrole_alias"
}: { arrayObj: IRole[], valueFind: string, keyFind?: string }): IRole | undefined => {
  let foundObj = undefined;
  JSON.stringify(arrayObj, (_, nestedValue) => {
    // console.log({ nestedValue })
    if (nestedValue && nestedValue[keyFind] === valueFind) {
      foundObj = nestedValue;
    }
    return nestedValue;
  });
  return foundObj;
}; */

export function findNestedObj(arr: IRole[] | null, searchValue: string, searchKey: keyof IRole = "masterrole_alias"): IRole | undefined {
  if (!arr) return undefined;
  for (const obj of arr) {
    for (const key in obj) {
      if (key === searchKey && obj[key] === searchValue) {
        return obj;
      }
      const valueOfKey = obj[key as keyof IRole];
      const typeOfKey = typeof valueOfKey
      if (typeOfKey === "object") {
        const foundInNested = findNestedObj([valueOfKey] as unknown as IRole[], searchKey, searchValue as keyof IRole);
        if (foundInNested) {
          return foundInNested;
        }
      }
    }
  }
  return undefined;
}

export const convertOperator = ({ items }: { items: GridFilterItem[] }) => {
  // console.log({ data })
  return items.map((el) => {
    if (
      el.operatorValue === "equals" ||
      el.operatorValue === "=" ||
      el.operatorValue === "is"
    ) {
      return { ...el, operatorValue: "eq" };
    }
    if (el.operatorValue === "contains") {
      return { ...el, operatorValue: "substring" };
    }
    if (el.operatorValue === "isAnyOf") {
      return { ...el, operatorValue: "in" };
    }
    if (el.operatorValue === "isNotEmpty") {
      return { ...el, operatorValue: "ne", value: null };
    }
    if (el.operatorValue === "isEmpty") {
      return { ...el, operatorValue: "is", value: null };
    }
    if (
      el.operatorValue === "isNot" ||
      el.operatorValue === "not" ||
      el.operatorValue === "!="
    ) {
      return { ...el, operatorValue: "ne" };
    }
    if (
      el.operatorValue === "isAfter" ||
      el.operatorValue === "after" ||
      el.operatorValue === ">"
    ) {
      return { ...el, operatorValue: "gt" };
    }
    if (
      el.operatorValue === "isOnOrAfter" ||
      el.operatorValue === "onOrAfter" ||
      el.operatorValue === ">="
    ) {
      return { ...el, operatorValue: "gte" };
    }
    if (
      el.operatorValue === "isBefore" ||
      el.operatorValue === "before" ||
      el.operatorValue === "<"
    ) {
      return { ...el, operatorValue: "lt" };
    }
    if (
      el.operatorValue === "isOnOrBefore" ||
      el.operatorValue === "onOrBefore" ||
      el.operatorValue === "<="
    ) {
      return { ...el, operatorValue: "lte" };
    }
    return el;
  });
};

export const convertDateOnly = (val: number) => {
  return new Date(val).toLocaleString("id-ID", { dateStyle: "long" });

  // return `${date.getMonth() + 1}/${date.getDay()}/${date.getFullYear()}`;
};