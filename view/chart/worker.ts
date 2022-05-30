import { paintL, paintC, paintH } from './paint'
import { support } from '../../stores/support'

export type MessageData =
  | {
      type: 'init'
      canvas: HTMLCanvasElement
    }
  | {
      type: 'l'
      l: number
      bg: string
      hasP3: boolean
      showP3: boolean
      showRec2020: boolean
      width: number
      height: number
      isFull: boolean
    }
  | {
      type: 'c'
      c: number
      bg: string
      hasP3: boolean
      showP3: boolean
      showRec2020: boolean
      width: number
      height: number
      isFull: boolean
    }
  | {
      type: 'h'
      h: number
      bg: string
      hasP3: boolean
      showP3: boolean
      showRec2020: boolean
      width: number
      height: number
      isFull: boolean
    }

let canvas: HTMLCanvasElement | undefined

onmessage = (e: MessageEvent<MessageData>) => {
  if (e.data.type === 'init') {
    canvas = e.data.canvas
  } else if (canvas) {
    if (e.data.hasP3 !== support.get()) {
      support.set(e.data.hasP3)
    }

    let start = Date.now()
    if (e.data.type === 'l') {
      paintL(
        canvas,
        e.data.width,
        e.data.height,
        e.data.bg,
        e.data.showP3,
        e.data.showRec2020,
        e.data.l,
        e.data.isFull
      )
    } else if (e.data.type === 'c') {
      paintC(
        canvas,
        e.data.width,
        e.data.height,
        e.data.bg,
        e.data.showP3,
        e.data.showRec2020,
        e.data.c,
        e.data.isFull
      )
    } else {
      paintH(
        canvas,
        e.data.width,
        e.data.height,
        e.data.bg,
        e.data.showP3,
        e.data.showRec2020,
        e.data.h,
        e.data.isFull
      )
    }
    postMessage(Date.now() - start)
  }
}
