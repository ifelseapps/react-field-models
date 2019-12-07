export const getObjectKeys = <TObject extends object>(obj: TObject) => Object.keys(obj) as Array<keyof TObject>;
export const isFunction = (fn?: Function): fn is Function => typeof fn === 'function';
