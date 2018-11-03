import { sha3_512 } from "js-sha3";

export type passwordLength = 16 | 32 | 64 ;

export const getHash = (text: string): string => sha3_512(text);

export const getPassword = (text: string, iternationsNumber: number, length: passwordLength): string => {
  let hash = text
  for (let i = 0; i < iternationsNumber; i++) {
    hash = getHash(hash)
  }
  return `${text}-${hash}`.substr(0, length);
}
 