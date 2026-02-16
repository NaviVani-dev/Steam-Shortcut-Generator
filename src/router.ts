import { createMemoryHistory, createRouter } from 'vue-router'
import Library from "~/components/library/Main.vue"
import SteamBrowser from "~/components/browser/Main.vue"
import Local from "~/components/local/Main.vue"
import Editor from "~/components/editor/Main.vue"
import Settings from "~/components/settings/Main.vue"

const routes = [
  { path: "/", component: Library },
  { path: "/browser", component: SteamBrowser },
  { path: "/local", component: Local },
  { path: "/editor", component: Editor },
  { path: "/settings", component: Settings }
]

const router = createRouter({
  history: createMemoryHistory(),
  routes
})

export default router
