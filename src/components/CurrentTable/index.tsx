import { Component, For, Match, Switch, createMemo } from "solid-js";
import { PaiTypes } from "../../types/paiTypes";
import { MahjangList, Tiao, Tong, Wan } from "../mahjang";

const CurrentTable: Component<{
  pai: Record<PaiTypes, number>
}> = (props) => {
  const currentPai = createMemo(() => {
    const sortedPaiList = Object.entries(props.pai).sort((a, b) => b[1] - a[1])
    const current: PaiTypes[] = []
    sortedPaiList.forEach((v) => {
      for (let i = 0; i < v[1]; i++) {
        current.push(v[0] as PaiTypes)
      }
    })
    return current
  })


  return (
    <MahjangList list={currentPai()} />
  )
}

export {
  CurrentTable
}