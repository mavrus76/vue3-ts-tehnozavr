import type { Events } from '@/main'
import type { Emitter } from 'mitt'

interface IGotoPage {
  eventBus: Emitter<Events>
}

export default function gotoPage(this: IGotoPage, pageName: string, pageParams: any) {
  this.eventBus.emit('gotoPage', { pageName, pageParams })
}
