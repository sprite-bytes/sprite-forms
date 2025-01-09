import type {App} from "vue"

export const install = (component: any) => {
    component.install = (app: App) => {
        app.use(component.name, component)
    }
    return component
}