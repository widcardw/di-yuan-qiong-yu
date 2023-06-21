import { Component } from "solid-js";

const Img: Component<{ src: string }> = (props) => {
  return <img src={props.src} style={{ "border-radius": "0.5rem" }} class="ring pai-size" />
}

export {
  Img,
}