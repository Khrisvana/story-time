import { bootstrap, Modal } from "bootstrap/dist/js/bootstrap.bundle"
// import * as bootstrap from "bootstrap"
export default defineNuxtPlugin(() => {
    /** Modal Instance */

    const modals: any = {}

    const instanceModal = (id: string) => {
        return Modal.getOrCreateInstance(`#${id}`)
    }

    interface Modal {
        show: Function
        hide: Function
        dispose: Function
        toggle: Function
        hideOthers: Function
    }

    const modal: Modal = {
        show(id: string) {
            instanceModal(id).show()
            modals[id] = instanceModal(id)
        },
        hide(id: string) {
            instanceModal(id).hide()
        },
        dispose(id: string) {
            instanceModal(id).dispose()
        },
        toggle(id: string) {
            instanceModal(id).toggle()
        },
        hideOthers(id: string) {
            const keys = Object.keys(modals)

            keys.forEach((key) => {
                if (key !== id) {
                    modals[key].hide()
                }
            })
        },
    }

    /** End of Modal Instance */

    return {
        provide: {
            bootstrap,
            bModal: modal,
        },
    }
})
