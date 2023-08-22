import { createSignal, type Component, createMemo, onMount, For, Show, Switch, Match } from 'solid-js';
import { Point } from './components/Point';
import { createStore } from 'solid-js/store'
import { PaiTypes } from './types/paiTypes';
import { getRandPai } from './utils/getRandPai';
import { CurrentTable } from './components/CurrentTable';
import { GotPai } from './components/GotPai';
import { Chou } from './components/Chou';
import { Portal } from 'solid-js/web';
import { CarbonRestart } from './components/icons/Restart';
import { CarbonInformation } from './components/icons/Info';
import { randNum } from './utils/getRand';
import { Info } from './components/Info';
import { ZhanJiDianBuZu } from './components/ZhanJiDianBuZu';
import { Loading } from './components/Loading';

const initNum = 5
// 基础倍率
const basicBeiLv = 110
// 强普倍率
const enhancedBeiLv = 264
// 算上“听牌”行迹后的每次抽牌增伤
const dmgIncStep = 40
// 天赋攻击提高
const atkIncValue = 79

const App: Component = () => {
  // 增伤层数
  const [dmgInc, setDmgInc] = createSignal(0)
  // 增伤数值
  const dmgIncValue = createMemo(() => dmgInc() * dmgIncStep)
  const [loaded, setLoaded] = createSignal(false)
  // 已经抽取的次数
  let yiChou = 0
  // 战技点个数
  const [num, setNum] = createSignal(initNum)
  // 手牌库
  const [pai, setPai] = createStore({
    [PaiTypes.Tong]: 0,
    [PaiTypes.Tiao]: 0,
    [PaiTypes.Wan]: 0,
  })
  // 用于显示的牌库
  const [paiShown, setPaiShown] = createStore({
    [PaiTypes.Tong]: 0,
    [PaiTypes.Tiao]: 0,
    [PaiTypes.Wan]: 0,
  })

  // 海底捞月得到的牌
  const [gotPai, setGotPai] = createSignal<(PaiTypes | null)[]>([])
  // 最少的牌的类型
  const [leastPaiType, setLeastPaiType] = createSignal<(PaiTypes | undefined)>()
  const [showInfo, setShowInfo] = createSignal(false)
  // 总牌数量
  const totalPaiCount = createMemo(() => pai[PaiTypes.Tong] + pai[PaiTypes.Tiao] + pai[PaiTypes.Wan])
  // 是否杠开
  const gangKai = createMemo(() => (pai[PaiTypes.Tong] === 4 && pai[PaiTypes.Tiao] === 0 && pai[PaiTypes.Wan] === 0)
    || (pai[PaiTypes.Tong] === 0 && pai[PaiTypes.Tiao] === 4 && pai[PaiTypes.Wan] === 0)
    || (pai[PaiTypes.Tong] === 0 && pai[PaiTypes.Tiao] === 0 && pai[PaiTypes.Wan] === 4))
  // 若杠开，则有 79% 的攻击提高
  const atkInc = createMemo(() => (~~gangKai()) * atkIncValue)
  // 普攻/强普的倍率
  const beiLv = createMemo(() => gangKai() ? enhancedBeiLv : basicBeiLv)
  // 获取数量最少的牌的类型
  function getLeastPaiType(): PaiTypes {
    const paiList = Array.from(Object.entries(pai))
    const sortedPaiList = paiList.sort((a, b) => a[1] - b[1])
    console.log(JSON.stringify(sortedPaiList))
    while (sortedPaiList.length > 1 && sortedPaiList[0][1] === 0) {
      sortedPaiList.shift()
      console.log('shifted')
    }
    return sortedPaiList[0][0] as PaiTypes
  }
  // 随机获取一张牌
  function getPai() {
    const pai = getRandPai()
    setGotPai(p => [...p, pai])
    setPai(pai, p => p + 1)
    // 弃牌
    if (totalPaiCount() > 4) {
      const leastType = getLeastPaiType()
      setLeastPaiType(leastType)
      leastType && setPai(leastType, p => p - 1)
    }
  }
  // 海底捞月
  function haiDiLaoYue() {
    let i = 0
    yiChou++
    // 伤害提高
    if (yiChou <= 4) {
      setDmgInc(p => p + 1)
    }
    // 随机获取两张牌
    for (; i < 2; i++) {
      if (gangKai()) {
        break
      }
      getPai()
    }
    // 如果海底捞月的第一张牌就杠开了，那么第二章为空白
    for (; i < 2; i++) {
      setGotPai(p => [...p, null])
    }
    // 战技点减少
    setNum(p => p - 1)
    setTimeout(() => {
      setGotPai([])
      setPaiShown(pai)
    }, 500)
  }

  onMount(() => {
    getPai()
    setPaiShown(pai)
    setGotPai([])
  })

  function reset() {
    setPai({
      [PaiTypes.Tiao]: 0,
      [PaiTypes.Tong]: 0,
      [PaiTypes.Wan]: 0,
    })
    setDmgInc(0)
    const rn = randNum(1, 3)
    for (let i = 0; i < rn; i++)
      getPai()
    setPaiShown(pai)
    setGotPai([])
    setNum(randNum(2, 6))
    yiChou = 0
  }

  const res = createMemo(() => (beiLv() / 100 * (1 + dmgIncValue() / 100) * (1 + atkInc() / 100)).toFixed(2))

  return (
    <Show when={loaded()} fallback={<Loading setLoaded={setLoaded} />}>
      <div style={{
        height: '100vh',
        display: 'flex',
        'flex-direction': 'column',
      }}>
        <div style={{
          position: 'absolute',
          top: 0, left: 0, right: 0, bottom: 0,
          display: 'flex',
          'justify-content': 'center',
          'align-items': 'center',
          'z-index': -1,
          'overflow-x': 'hidden',
          'overflow-y': 'hidden',
        }}>
          <img src='/assets/qingque.webp' style={{
            'max-width': '100vw',
            'max-height': '100vh',
            'min-width': '800px',
            'overflow-x': 'hidden',
            'overflow-y': 'hidden',
          }} />
        </div>
        <div class="ma-shan title">
          <Switch fallback="这是一场豪赌">
            <Match when={!gangKai() && num() <= 0}>
              输得一塌糊涂
            </Match>
            <Match when={gangKai()}>
              帝垣琼玉
            </Match>
          </Switch>
          <div class="calculate-value">{beiLv()}%{atkInc() ? <>*(1+{atkInc()}%)</> : ''}{dmgIncValue() ? <>*(1+{dmgIncValue()}%)</> : ''}={res()}</div>
        </div>
        <div style={{ flex: 1 }} />
        <CurrentTable pai={paiShown} />
        <div style={{ display: 'flex', 'justify-content': 'end', "max-width": '80vw', "margin-top": '1rem', "margin-bottom": '2rem', 'margin-left': '1rem', "margin-right": '1rem' }}>
          <Point num={num()} />
          <Chou gangKai={gangKai()} num={num()} onClick={haiDiLaoYue} />
        </div>
      </div>
      <Portal>
        <ZhanJiDianBuZu />
      </Portal>
      <div style={{ position: 'absolute', top: '4px', right: '4px', "z-index": 99 }}>
        <CarbonRestart color="white" style={{ cursor: 'pointer', "font-size": '1.5rem', display: 'block', margin: '0.5rem' }} onClick={reset} />
        <CarbonInformation color="white" style={{ cursor: 'pointer', "font-size": '1.5rem', display: 'block', margin: '0.5rem' }} onClick={() => setShowInfo(true)} />
      </div>
      <Show when={gotPai().length}>
        <Portal>
          <div style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, display: 'flex', "justify-content": 'center', "align-items": 'center' }}>
            <GotPai list={gotPai()} />
          </div>
        </Portal>
      </Show>
      <Show when={showInfo()}>
        <Portal>
          <Info setShowInfo={setShowInfo} />
        </Portal>
      </Show>
    </Show>
  );
};

export default App;
