import { Component, createEffect, createSignal, onMount } from "solid-js";

const Loading: Component<{
  setLoaded: (v: boolean) => any
}> = (props) => {

  const [p1, setP1] = createSignal(false)
  const [p2, setP2] = createSignal(false)
  const [p3, setP3] = createSignal(false)
  const [p4, setP4] = createSignal(false)

  createEffect(() => {
    if (p1() && p2() && p3() && p4()) {
      props.setLoaded(true)
    }
  })

  const [msg, setMsg] = createSignal('Loading...')

  return (
    <>
      <img src="/assets/qingque.webp" width="100px" style={{ position: 'absolute' }} onLoad={() => setP1(true)} onError={(e) => {setMsg(String(e))}} />
      <img src="/assets/tiao.JPG" width="100px" style={{ position: 'absolute' }} onLoad={() => setP2(true)} onError={(e) => {setMsg(String(e))}} />
      <img src="/assets/tong.JPG" width="100px" style={{ position: 'absolute' }} onLoad={() => setP3(true)} onError={(e) => {setMsg(String(e))}} />
      <img src="/assets/wan.JPG" width="100px" style={{ position: 'absolute' }} onLoad={() => setP4(true)} onError={(e) => {setMsg(String(e))}} />
      <div
        style={{
          background: '#597F81',
          position: 'absolute', top: 0, bottom: 0, left: 0, right: 0,
          display: 'flex',
          "justify-content": 'center',
          'align-items': 'center',
          'font-size': '4rem',
          color: 'white',
        }}
        class="oswald"
      >
        {msg()}
      </div>
    </>
  )
}

export {
  Loading,
}