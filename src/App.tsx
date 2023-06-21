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

const App: Component = () => {
  const [beilv, setBeilv] = createSignal(50)
  const [loaded, setLoaded] = createSignal(false)
  let yiChou = 0
  const [num, setNum] = createSignal(initNum)
  const [pai, setPai] = createStore({
    [PaiTypes.Tong]: 0,
    [PaiTypes.Tiao]: 0,
    [PaiTypes.Wan]: 0,
  })

  const [paiShown, setPaiShown] = createStore({
    [PaiTypes.Tong]: 0,
    [PaiTypes.Tiao]: 0,
    [PaiTypes.Wan]: 0,
  })

  const [gotPai, setGotPai] = createSignal<(PaiTypes | null)[]>([])
  const [leasetPaiType, setLeastPaiType] = createSignal<(PaiTypes | undefined)>()
  const [showInfo, setShowInfo] = createSignal(false)

  const totalPaiCount = createMemo(() => pai[PaiTypes.Tong] + pai[PaiTypes.Tiao] + pai[PaiTypes.Wan])

  const gangKai = createMemo(() => (pai[PaiTypes.Tong] === 4 && pai[PaiTypes.Tiao] === 0 && pai[PaiTypes.Wan] === 0)
    || (pai[PaiTypes.Tong] === 0 && pai[PaiTypes.Tiao] === 4 && pai[PaiTypes.Wan] === 0)
    || (pai[PaiTypes.Tong] === 0 && pai[PaiTypes.Tiao] === 0 && pai[PaiTypes.Wan] === 4))

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

  function getPai() {
    const pai = getRandPai()
    setGotPai(p => [...p, pai])
    setPai(pai, p => p + 1)
    if (totalPaiCount() > 4) {
      const leastType = getLeastPaiType()
      setLeastPaiType(leastType)
      leastType && setPai(leastType, p => p - 1)
    }
  }

  function haiDiLaoYue() {
    let i = 0
    yiChou++
    if (yiChou <= 4) {
      setBeilv(p => p + 14)
    }
    for (; i < 2; i++) {
      if (gangKai()) {
        break
      }
      getPai()
    }
    for (; i < 2; i++) {
      setGotPai(p => [...p, null])
    }
    if (gangKai()) {
      setBeilv(p => p + 70)
    }
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
    const rn = randNum(1, 3)
    for (let i = 0; i < rn; i++)
      getPai()
    setPaiShown(pai)
    setGotPai([])
    setNum(randNum(2, 6))
    setBeilv(50)
    yiChou = 0
  }

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
          <div>{beilv()}</div>
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
