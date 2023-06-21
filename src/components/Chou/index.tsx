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
      class="chou-size"
      onClick={onBtnClicked}
      style={{
        'background': 'none',
        'border': 'none',
        'outline': 'none',
        'position': 'relative',
        'display': 'block',
        'cursor': ' pointer',
        padding: 0,
        margin: 0,
      }}
    >
      <img src="/assets/drawing.svg" style={{ position: 'absolute', top: 0, left: 0 }} class="chou-size" />
      <Show when={!enabled()}>
        <div style={{ position: 'absolute', top: 0, left: 0 }}>
          <CarbonClose color="red" class="chou-size" />
        </div>
      </Show>
    </button>
  )
}

export {
  Chou,
}
