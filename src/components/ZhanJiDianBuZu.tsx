import { Component, For } from "solid-js";
import { msg } from "../utils/stores";

const ZhanJiDianBuZu: Component = () => {
  return (
    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, 'display': 'flex', 'flex-direction': 'column', 'justify-content': 'center' }}>
      <For each={msg()}>
        {(it) => (
          <div
            style={{ background: '#00000090', padding: '0.5rem 4rem', margin: '0.2rem auto', color: 'white' }}
            class='anim-in'
          >
            {it.msg}
          </div>
        )}
      </For>
    </div>
  )
}

export {
  ZhanJiDianBuZu
}