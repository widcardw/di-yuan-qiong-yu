import { createSignal } from "solid-js";
import { nanoid } from 'nanoid'

const [msg, setMsg] = createSignal<{ msg: string, id: string }[]>([])

function pushMsg(m: string) {
  const id = nanoid()
  setMsg(p => [...p, { id, msg: m }])
  setTimeout(() => {
    setMsg(p => p.filter(i => i.id !== id))
  }, 3000)
}

export {
  msg,
  pushMsg,
}
