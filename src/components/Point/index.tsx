import { Component, For } from "solid-js";

const Point: Component<{
  num: number
}> = (props) => {
  return (
    <div style={{ display: 'flex', "align-items": 'center', color: 'white' }} class="oswald">
      <div style={{ "font-size": '1.5rem' }}>{props.num}</div>
      <div style={{ width: '1rem', "text-align": 'center' }}>{'/'}</div>
      <div style={{ width: '7rem', 'white-space': 'nowrap' }}>
        <For each={Array.from({ length: props.num })}>
          {(_, __) => '🌟 '}
        </For>
      </div>
    </div>
  )
}

export {
  Point,
}