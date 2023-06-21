import { Component } from "solid-js";
import { PaiTypes } from "../../types/paiTypes";
import { MahjangList } from "../mahjang";

const GotPai: Component<{
  list: (PaiTypes | null)[]
}> = (props) => {
  return (
    <MahjangList list={props.list} />
  )
}

export {
  GotPai,
}
