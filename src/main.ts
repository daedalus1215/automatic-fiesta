import { createApp } from 'vue'
import App from './App.vue'
import { Quasar } from 'quasar'
import quasarLang from 'quasar/lang/en-US'
import 'quasar/src/css/index.sass'
import '@quasar/extras/material-icons/material-icons.css'
import router from './router'
import { VueQueryPlugin } from '@tanstack/vue-query'

const app = createApp(App)
app.use(router) // Make sure to use the router

app.use(VueQueryPlugin)
app.use(Quasar, {
  plugins: {}, // import Quasar plugins and add here
  lang: quasarLang,
})

app.mount('#app')
