import { PaiTypes } from "../types/paiTypes";

const PAI_TYPE_NUM = 3

function getRandPai(): PaiTypes {
  const rnd = Math.floor(Math.random() * PAI_TYPE_NUM)
  switch (rnd) {
    case 0: return PaiTypes.Tong
    case 1: return PaiTypes.Tiao
    case 2: return PaiTypes.Wan
    default: throw new Error('No such type of pai!')
  }
}

export {
  getRandPai
}