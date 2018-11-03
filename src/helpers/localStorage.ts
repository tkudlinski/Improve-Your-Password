
import localStorage from "localStorage";
import { passwordLength as passwordLengthType } from "./crypto";

const KEY = "@IMPROVE_YOUR_PASSWORD";

export interface IStorage {
    passwordLength: passwordLengthType,
    secured: boolean,
    aboutExpanded: boolean,
}

export const get = (): IStorage | null => {
    const data = localStorage.getItem(KEY)
    return (typeof data !== 'undefined' && data !== null) ? (JSON.parse(data) as IStorage) : null
}

export const set = (item: IStorage) => {
    let data = get()
    data = data === null ? item : { ...data, ...item }
    localStorage.setItem(KEY, JSON.stringify(data))
};
