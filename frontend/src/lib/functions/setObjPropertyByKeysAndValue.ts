import { Key } from "react";

function setObjPropertyByKeysAndValue<Obj extends {[key in Key]: any}>(originObj: Obj, key: string, newValue: any) {
  const keys = key.split('.');
  let obj = {...originObj};
  let property = undefined;

  for(let i = 0;i < keys.length - 1;i++) {
    const _key = keys[i];
    if(obj[_key]) {
      property = obj[_key]; // 到最後一個的前一個
    } else { break; }
  }
  if(property) { property[keys[keys.length - 1]] = newValue; }

  return obj;
}

export default setObjPropertyByKeysAndValue;