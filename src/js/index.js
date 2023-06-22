import { initMeasuresSwiper, initTabsSwiper, setTabs, openHelp, validateBodyDataForm, initProcessing } from "./components/parts/_initial.js";
import { initHeroSwiper } from "./components/parts/_hero.js";
import { initUnsubModal } from "./components/parts/_unsubscribe.js";
import { initAuthModal } from "./components/parts/_authorization.js";



initHeroSwiper()

initMeasuresSwiper()
initTabsSwiper()
setTabs()
openHelp()
validateBodyDataForm()
initProcessing()

initUnsubModal()
initAuthModal()