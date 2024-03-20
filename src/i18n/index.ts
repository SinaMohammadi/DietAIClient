import { nextTick } from 'vue'
import { createI18n } from 'vue-i18n'
import defaultMessages from '../translations/en.json'

export const supportedLocales: any = {
  en: { name: 'English', dir: 'ltr' },
  fa: { name: 'فارسی', dir: 'rtl' }
}

export const defaultLocale = 'en'

let _i18n: any

function setup(options = { locale: defaultLocale }) {
  console.log(options)
  _i18n = createI18n({
    legacy: false,
    locale: options.locale,
    fallbackLocale: defaultLocale,

    messages: { [defaultLocale]: defaultMessages }
  })

  setLocale(options.locale)

  return _i18n
}

function setLocale(newLocale: any) {
  _i18n.global.locale.value = newLocale

  setDocumentAttributesFor(newLocale)
}

async function loadMessagesFor(locale: any) {
  const messages = await import(`../translations/${locale}.json`)

  _i18n.global.setLocaleMessage(locale, messages.default)

  return nextTick()
}

function setDocumentAttributesFor(locale: any) {
  const htmlElement = document.querySelector('html')
  console.log(supportedLocales)
  htmlElement?.setAttribute('lang', locale)
  htmlElement?.setAttribute('dir', supportedLocales[locale].dir)
}

export default {
  get I18n() {
    return _i18n
  },
  setup,
  setLocale,
  loadMessagesFor
}
