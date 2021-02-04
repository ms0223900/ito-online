import { Key } from "react";

function setObjPropertyByKeysAndValue<Obj extends {[key in Key]: any}>(originObj: Obj, key: string, newValue: any) {
  const keys = key.split('.');
  let obj = {...originObj};
  let propertyNow = obj;

  for(let i = 0;i < keys.length - 1;i++) {
    const _key = keys[i];
    if(propertyNow[_key]) {
      propertyNow = propertyNow[_key]; // 到最後一個的前一個
    } else { break; }
  }
  const lastKey = keys[keys.length - 1] as Key;
  if(propertyNow) { (propertyNow[lastKey] as any) = newValue; }

  return obj;
}

export default setObjPropertyByKeysAndValue;