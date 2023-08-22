import { Component } from "solid-js";
import { CarbonClose } from "./icons/Cross";

const Info: Component<{
  setShowInfo: (v: boolean) => any
}> = (props) => {
  return <div style={{
    position: 'absolute',
    top: 0, bottom: 0, left: 0, right: 0,
    display: 'flex', "justify-content": 'center', "align-items": 'center',
  }}
  >
    <div style={{
      padding: '2rem',
      background: '#597F81e0',
      "border-radius": '0.5rem',
      'backdrop-filter': 'blur(8px)',
      position: 'relative',
      "text-align": 'center'
    }}>
      <CarbonClose style={{ position: 'absolute', top: '0.5rem', right: '0.5rem', color: 'white', cursor: 'pointer' }} onClick={() => props.setShowInfo(false)} />
      <a href="https://github.com/widcardw/di-yuan-qiong-yu" target="_blank">GitHub</a>
      <a href="https://wiki.biligame.com/sr/%E6%96%87%E4%BB%B6:%E9%9D%92%E9%9B%80%E7%AB%8B%E7%BB%98.png" target="_blank">立绘来源 biligame</a>
      <a href="https://www.bilibili.com/video/BV1fV4y1m758" target="_blank">牌面来源 叶子1537</a>
      <a>本页使用的是6星魂满行迹青雀</a>
      <div style={{ color: 'lightgray' }}>仅供娱乐 禁止商用</div>
    </div>
  </div>
}

export {
  Info
}