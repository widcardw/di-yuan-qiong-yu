import { Component, Show, createMemo } from "solid-js";
import { CarbonClose } from "../icons/Cross";
import { pushMsg } from "../../utils/stores";

const Chou: Component<{
  num: number
  gangKai: boolean
  onClick: (n: number) => any
}> = (props) => {
  const enabled = createMemo(() => props.num > 0 && !props.gangKai)
  function onBtnClicked() {
    if (props.gangKai) return
    if (!props.gangKai && props.num <= 0) {
      pushMsg('战技点不足')
      return 
    }
    props.onClick(-1)
  }
  return (
    <button
      onClick={onBtnClicked}
      style={{
        'background': 'none',
        'border': 'none',
        'outline': 'none',
        'position': 'relative',
        'display': 'block',
        'width': '100px',
        'height': '100px',
        'cursor':' pointer',
        padding: 0,
        margin: 0,
      }}
    >
      <img src="/src/assets/drawing.svg" style={{ width: '100px', position: 'absolute', top: 0, left: 0 }} />
      <Show when={!enabled()}>
        <div style={{ position: 'absolute', top: 0, left: 0 }}>
          <CarbonClose width={'100px'} height={'100px'} color="red" />
        </div>
      </Show>
    </button>
  )
}

export {
  Chou,
}
