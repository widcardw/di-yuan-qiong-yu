import { Component, For, Match, Switch } from "solid-js";
import { PaiTypes } from "../../types/paiTypes";
import { Tiao } from "./Tiao";
import { Tong } from "./Tong";
import { Wan } from "./Wan";
import { Blank } from "./Blank";

const MahjangList: Component<{
  list: (PaiTypes | null)[]
}> = (props) => {
  return (
    <div class="space-x-4" style={{ 'overflow-x': 'hidden', padding: '1rem', display: 'flex', 'justify-content': 'center' }}>
      <For each={props.list}>
        {(it) => (
          <Switch fallback={<Blank />}>
            <Match when={it === PaiTypes.Tiao}><Tiao /></Match>
            <Match when={it === PaiTypes.Tong}><Tong /></Match>
            <Match when={it === PaiTypes.Wan}><Wan /></Match>
          </Switch>
        )}
      </For>
    </div>
  )
}

export {
  MahjangList,
}