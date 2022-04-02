import Vue  from 'vue'
import { ElLoading } from './loading'
import { ElWwy } from './wwy'import { ElD5cButton } from './d5c-button'

export interface InstallationOptions {
  locale: any,
  i18n: any,
  size: string
}
/** The version of element-ui */
export const version: string
/**
 * Install all element-ui components into Vue.
 * Please do not invoke this method directly.
 * Call `Vue.use(ElementUI)` to install.
 */
export function install (vue: typeof Vue, options: InstallationOptions): void

/** Show animation while loading data */
export const Loading: ElLoading

/** Wwy Component */
export class Wwy extends ElWwy {}



/** D5cButton Component */
export class D5cButton extends ElD5cButton {}
