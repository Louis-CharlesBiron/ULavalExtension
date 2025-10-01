/**
    * Returns a random number within the min and max range
    * @param {Number} min: the minimal possible value (included)
    * @param {Number} max: the maximal possible value (included)
    * @param {Number?} decimals: the decimal point. (Defaults to integers)
    * @returns the generated number
    */
function random(min, max, decimals=0) {
    max+=(decimals?0:1)
    if (decimals) {
        const precision = 10**decimals
        return Math.round((Math.random()*(max-min)+min)*precision)/precision
    } else return (Math.random()*(max-min)+min)>>0
}

function absolutize(el, appendToEl=document.body) {
    const {x, y, width, height} = el.getBoundingClientRect(), copyEl = el.cloneNode(999)
    el.style.opacity = 0
    el.style.pointerEvents = "none"
    el.style.userSelect = "none"
    el.style.webkitUserDrag = "none"
    copyEl.style.webkitUserDrag = "none"
    copyEl.style.position = "absolute"
    copyEl.style.left = x+"px"
    copyEl.style.top = y+"px"
    copyEl.style.width = width+"px"
    copyEl.style.width = "fit-content"
    copyEl.style.height = height+"px"
    copyEl.style.userSelect = "none"
    copyEl.style.zIndex = 99999
    copyEl.style.transformOrigin = "center"
    appendToEl.appendChild(copyEl)
    return {newElement:copyEl, x, y, width, height}
}
function loadScript(src, callback) {
    const script = document.createElement("script")
    script.src = src
    script.onload=()=>callback&&callback()
    document.head.appendChild(script)
}

// STORAGE MAPPING
const SM = {
    darkMode:"a",
    antiBloat:"b",
    useGravity:"c",
    notes:"d",
}

// DARK MODE CSS
const manualDarkModeCSS = `
html {
    filter: invert(1) hue-rotate(180deg) saturate(1.1) !important;
}

span.mpo-menu-desktop-cadre__titre, .mpo-menu-desktop-cadre__lien, .mpo-menu-desktop-cadre__lien:hover, .mpo-menu-desktop-cadre__conteneur, .mpo-menu-elem, .MenuSiteCours_EnteteBloc * {
    color: black !important;
}

.m-icon-svg.mpo-menu-desktop-cadre__icone-entete g {
    fill: black !important;
}

.mpo-gabarit-page.mpo-smart-page-mon-compte.mpo-portail-web.mu-app-root, #conteneur-shell, #mpo-menu, .mpo-menu-desktop-cadre__conteneur, .mpo-smart-calendrier__colonne-contenu, .mpo-menu-desktop-cadre__sous-section {
    background-color: white !important;
}

img, image, iframe, video {
    filter: invert(1) hue-rotate(180deg) !important;
}

.m-modal__wrap.m--is-close-on-backdrop {
    background-color: rgba(255, 255, 255, 0.85) !important;
}

.MenuSiteCours_EnteteBloc {
    background-color: #bababa;
}

.mpo-menu-cadre__button {
    background-color: white !important;
    color: #3c3c3c !important;
}
`, manualLightModeCSS = `
html, img, image, iframe, video {
    filter: none !important;
}

span.mpo-menu-desktop-cadre__titre, .mpo-menu-desktop-cadre__lien, .mpo-menu-desktop-cadre__lien:hover, .mpo-menu-desktop-cadre__conteneur, .mpo-menu-elem, .MenuSiteCours_EnteteBloc * {
    color: white !important;
}

.m-icon-svg.mpo-menu-desktop-cadre__icone-entete g {
    fill: white !important;
}

.mpo-gabarit-page.mpo-smart-page-mon-compte.mpo-portail-web.mu-app-root, #conteneur-shell, #mpo-menu, .mpo-menu-desktop-cadre__conteneur, .mpo-smart-calendrier__colonne-contenu, .mpo-menu-desktop-cadre__sous-section {
    background-color: white !important;
}

.m-modal__wrap.m--is-close-on-backdrop {
    background-color: rgba(0, 0, 0, 0.65) !important;
}

.MenuSiteCours_EnteteBloc {
    background-color: #3c3c3c;
}

.mpo-menu-cadre__button {
    background-color: #3c3c3c !important;
    color: white !important;
}
`

// CONSOLE LOGO VARIATIONS
const logoVariations = [
    `▓▓▓▓▒▒▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▒▒▒▒▒▒▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▒▓▓▓▓▓▓
▓▓▓▒▒░░░▒▒▓▓▓▓▓▓▓▓▓▒▒░░░░░░░░░░░░░░░░▒▒▓▓▓▓▓▓▓▓▓▒▒░░░▒▒▓▓▓▓
▓▓▓▓▒░░░░░░░░▒▒▒▒░░░░░░▒▒▒▓▓▓▓▓▓▒▒▒░░░░░░▒▒▒▒░░░░░░░░▒▓▓▓▓▓
▓▓▓▓▓▒░░░░░░░░░░░░░░▒▓▓▓███████████▓▓▒░░░░░░░░░░▒░░░▒▓▓▓▓▓▓
▓▓▓▓▓▒▒░░░▒▒▒▒░░░░░░░░░░░░░░░░░░░░░░░░░░░░░▒▒▒▒▒░░░▒▒▓▓▓▓▓▓
▓▓▓▓▓▓▒░░░░▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒░░▒▒▓▓▓▓▓▓▓
▓▓▓▓▓▓▒▒░░░░░▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒░░░░▒▒▓▓▓▓▓▓▓
▓▓▓▓▓▓▒░░░░░░░░░░░░░▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒░░░░░░░░░░░▒▒▓▓▓▓▓▓
▓▓▓▓▓▒░░░░░░▓▒▒▒░░░░░░░░░░░░░░░░░░░░░░░░░░▒▒▓█░░░░░░▒▓▓▓▓▓▓
▓▓▓▓▒░░░░░░░▓██████▓▓▓▒▒▒▒▒▒▒▒▒▒▒▒▓▓▓▓████████░░░░░░░▒▓▓▓▓▓
▓▓▓▒▒░░░▒▒░░▒███▓▒░░░▒▓█████████████▒▒▒▒▒▓███▓░░▒▒░░░▒▒▓▓▓▓
▓▓▓▒▒░░░▒▒░░▒██▓░░▒▒▒░░▓███████████░░▒▒▒░░███▒░░▒▒░░░▒▒▓▓▓▓
▓▓▓▒░░░▒▒▒░░░██▓░░▒▒▒░░▓███████████░░▒▒▒░░▓██▒░░▒▒▒░░░▒▓▓▓▓
▓▓▓▒░░░▒▒▒░░░███▒░░░░░▓████████████▓▒░░░░▓███▒░░▒▒▒░░░▒▓▓▓▓
▓▓▓▒▒░░░▒▒░░░██████▓▓▓██████▓▓███████████████▒░░▒▒░░░▒▒▓▓▓▓
▓▓▓▒▒░░░▒▒░░▒███████░░▓████▒░░▒█████░░███████▓░░▒▒░░░▒▒▓▓▓▓
▓▓▓▓▒░░░░░░░▒███████▓▒░▒█▓░░██░▒██▓░▒████████▓░░░▒░░░▒▓▓▓▓▓
▓▓▓▓▒▒░░░░░░▓█████████▒░▒░░▓███░░▒░▓██████████░░░░░░▒▒▓▓▓▓▓
▓▓▓▓▓▒▒░░░░▒███████████▓░▒▓█████▒░▓███████████▒░░░░▒▒▓▓▓▓▓▓
▓▓▓▓▓▓▒▒░░░▓██████▓▓▓▓▓▒▒▒▒▒▒▒▒▒▓▓▓▓▓██████████░░░▒▒▓▓▓▓▓▓▓
▓▓▓▓▓▓▒▒░░▓█▓▒▒▒░░░░░░░░░░░░░░░░░░░░░░░░░▒▒▒▓▓█▓░░▒▒▓▓▓▓▓▓▓
▓▓▓▓▓▓▒░░░░░░░░░░▒░░░░░░░░░░░░░░░░░░░░▒▒▒▒▒░░░░░░░░▒▒▓▓▓▓▓▓
▓▓▓▓▓▒░░░░░░░░░░░░░░░░░▒▒▒▒▒▒▒▒▒▒▒░░░░░░░░░░░░▒▒▒░░░▒▓▓▓▓▓▓
▓▓▓▓▒░░░░░░░░░░▒░░░░░▒▒▓▓████████▓▓▒▒░░░░░▒░░░░░░░░░░▒▓▓▓▓▓
▓▓▓▒▒░░░░░▒▒▒▓▓▓▓▒▒▒░░░░░░░░░░░░░░░░░░▒▒▒▓▓▓▓▒▒▒░░░░░▒▒▓▓▓▓
███▓▒▒▒▓▓████████████▓▓▓▒▒▒▒▒▒▒▒▒▒▓▓▓████████████▓▓▒▒▒▓████`,
    `cooo+==+++oooooooooooo+++++======+++++ooooooooooooo++=++oooo
oo+=- .:-~++++oo+++=-::...      ...::-~+++oo++++~-:. -=+ooo
ooo+=.     .:~==-:    :-==++++++==~:    :-==~:.      =+oooo
oooo+~   ::.       :=oOOXHHMMMMHHXXOo=:       .:-.  ~+ooooo
ooooo=~  .----:::..                   ..:::-----:  ~=oooooo
ooooo+=:  :-------------------------------------  -=+oooooo
oooooo==   ::---------------------------------:   ==ooooooo
ooooo+~.       ..:::--------------------:...      .~=oooooo
oooo+~     .o=~-:.      ..........      .:~=oX.     ~+ooooo
ooo+=.  :.  +XXXXXXOo+=~~==~~~~~~=++oOHMMMMMMX  ::  .=+oooo
ooo=~  :--  ~XXX+-:::~OXXHMMMMMMMMMH=---~OMMMo  --:  ~=+ooo
oo+=-  :--  -XXo .---  oXXMMMMMMMMH. ---. XMM=  --:  -=+ooo
+++=:  ---  :XX+ :---. +XXMMMMMMMMX .---: OMM~ .---  :=++++
+++=:  ---  :XXX=: . :+XXXHMMMMMMMMO-.. :+MMM~ .---  :=++++
+++=-  :--  :XXXXXXOoOXXXXXMOOMMMMMMMHMMMMMMM=  --:  -=++++
+++=~  :--  -XXXXXXX .oXXXX~  ~MMMMX:.HMMMMMMo  --:  ~=++++
++++=.  ::  =XXXXXXXO- =XO:.XX.-MMo -MMMMMMMMO  :-   =+++++
++++=-  ..  OXXXXXXXXX=.~..oHMH..=.+MMMMMMMMMH  ..  -=+++++
+++++=-    -XXXXXXXXXXXo.-OXXHMM~:OMMMMMMMMMMM~    -=++++++
++++++=~  .OXXXXXXOOo++=~~----==++oOOXHMMMMMMMH.  ~=+++++++
++++++=~  +X+=--:. ....::::::::::::::...:--~+OMo  ~=+++++++
++++++=   .  .:::-:::...............::-----::. :   ==++++++
+++++=.  :::..       .:--~~====~--::.      ..:---  .=++++++
++++=.       .:-:   :-=oOXXHHHHHXOo=-:   :-:.       .=+++++
+++=-   .:~==++++=~-:.              .:-~=++++==~:.   -=++++
HHHo=~=oOXHHHHHHHHHXXOo+=~~~~~~~~=+oOXXHHHHHHHHHXOo=~=oHHHH`,
    `┃┃┃┃║║║┃┃┃┃┃┃┃┃┃┃┃┃┃┃┃┃║║║║║║║║║║║║┃┃┃┃┃┃┃┃┃┃┃┃┃┃┃┃║║║┃┃┃┃┃
┃┃┃║═ ──═│║║┃┃┃┃┃║║│═━────      ────━═│║║┃┃┃┃┃║║│═── ═║┃┃┃┃
┃┃┃║│─     ─━═│║═─    ━═│║║║║║║║║│═━    ─═║│═━─      │║┃┃┃┃
┃┃┃┃║│   ━──       ━║┃┼╬╬╋██████╋╬╬┼┃║━       ─━━─  │║┃┃┃┃┃
┃┃┃┃┃║═  ─━━━━━━───                    ─━━━═════━  ═║┃┃┃┃┃┃
┃┃┃┃┃┃║━  ━━━━━━━━━━━━━━═══━━━━━═══════════════━  ━║┃┃┃┃┃┃┃
┃┃┃┃┃┃║║   ━━━━━━━━━━━━━══════════════════════━   ║║┃┃┃┃┃┃┃
┃┃┃┃┃║│─       ───━━━━━━═══════════════━━───      ─│║┃┃┃┃┃┃
┃┃┃┃║│     ─┃║══━─      ──────────      ─━═│┃╬─     │║┃┃┃┃┃
┃┃┃┃║─  ━─  ┃╬╬╬╬╬╬┼┃║││││││││││││║┃┃╬╋██████╬  ─━  ─║┃┃┃┃┃
┃┃┃║│  ─━━  ═╬╬╬┃═━━━═┼╬╬██████████╋│═══│┼███┼  ══─  │║┃┃┃┃
┃┃┃║═  ━══  ━╬╬┃ ─═══  ┃╬╋████████╋  ═══─ ╬██║  ══━  ═║┃┃┃┃
┃┃┃║━  ━══  ━╬╬┃ ━═══─ ┃╬╬████████╬ ─═══━ ┼██│  ══━  ━║┃┃┃┃
┃┃┃║─  ━══  ━╬╬╬║─   ━┃╬╬╬╋████████┼═   ━┃███│ ─══━  ─║┃┃┃┃
┃┃┃║━  ━══  ━╬╬╬╬╬╬╬┼╬╬╬╬╬╬█╬╬███████╋███████│  ══━  ━║┃┃┃┃
┃┃┃║│  ━━═  ═╬╬╬╬╬╬╬ ─┼╬╬╬╬│  │████╋━ ╋██████┃  ══━  │║┃┃┃┃
┃┃┃║║─  ━━  ║╬╬╬╬╬╬╬╬━ │╬┼━─╬╬─═██┃ ═████████╬  ━━   ║║┃┃┃┃
┃┃┃┃║═  ─   ┼╬╬╬╬╬╬╬╬╬│ ═──┼╋█╋──│─┃█████████╋   ─  ═║┃┃┃┃┃
┃┃┃┃┃║━    ═╬╬╬╬╬╬╬╬╬╬╬┃─═╬╬╬███│━┼███████████│    ━║┃┃┃┃┃┃
┃┃┃┃┃║║═   ┼╬╬╬╬╬╬╬┼┃┃║║│═════║║║┃┼┼╬╬╋███████╋─  ═║║┃┃┃┃┃┃
┃┃┃┃┃┃║═  ║╬┃│═━━─ ────────────━━━━━─────══│┃┼█┼  ═║┃┃┃┃┃┃┃
┃┃┃┃┃║│   ─  ──━━━━━──────     ─────━━━═══━━── ━   │║┃┃┃┃┃┃
┃┃┃┃║│─  ━━━──       ─━━══││║║││══━──       ─━━═━  ─│║┃┃┃┃┃
┃┃┃║║─       ─━═━   ━═║┃┼╬╋╋╋╋╋╋╬┼┃║═━   ─═━─       ─║║┃┃┃┃
┃┃║║═   ─━═│║║║║║║│═━                ━═│║║║║║║│═━─   ═║║┃┃┃
╋╋╋┃║│║┃┼╋╋╋╋╋╋╋╋╋╋╋╬┼┃║║││════││║║┃┼╬╋╋╋╋╋╋╋╋╋╋╬╬┃║═║┃╋╋╋╋`,
    `▓▓▓▒▒▒▒▒▒▓▓▓▓▓▓▓▓▓▓▓▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▓▓▓▓▓▓▓▓▓▓▓▒▒▒▒▒▒▓▓▓▓
▓▓▒▒░   ░▒▒▒▒▒▒▓▒▒▒▒░░              ░░▒▒▒▒▒▓▒▒▒▒▒░   ░▒▒▓▓▓
▓▓▒▒▒       ░░▒▒░     ░░▒▒▒▒▒▒▒▒▒▒░░     ░▒▒░░       ▒▒▒▓▓▓
▓▓▓▒▒░   ░          ▒▓▓▓██████████▓▓▓▒░        ░░   ░▒▒▓▓▓▓
▓▓▓▓▒▒░   ░░░░░                          ░░░░░░░░  ░▒▒▓▓▓▓▓
▒▒▒▒▒▒▒░  ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░  ░▒▒▒▒▒▒▒▒
▒▒▒▒▒▒▒▒    ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░   ▒▒▒▒▒▒▒▒▒
▒▒▒▒▒▒▒           ░░░░░░░░░░░░░░░░░░░░░░░          ▒▒▒▒▒▒▒▒
▒▒▒▒▒▒      ▓▒░░                         ░░▒▓▓      ▒▒▒▒▒▒▒
▒▒▒▒▒   ░   ▒▓▓▓▓▓▓▓▒▒▒▒░▒▒▒░░░░▒▒▒▒▓▓███████▓   ░   ▒▒▒▒▒▒
▒▒▒▒▒   ░░  ░▓▓▓▒░░░░░▓▓▓███████████▒░░░░▓███▓  ░░   ▒▒▒▒▒▒
▒▒▒▒░  ░░░  ░▓▓▓  ░░░  ▓▓██████████  ░░░  ▓██▒  ░░░  ░▒▒▒▒▒
▒▒▒▒   ░░░  ░▓▓▒ ░░░░  ▒▓▓████████▓  ░░░░ ▓██▒  ░░░   ▒▒▒▒▒
▒▒▒▒   ░░░  ░▓▓▓▒    ░▒▓▓▓█████████▓░   ░▒███▒  ░░░   ▒▒▒▒▒
▒▒▒▒░  ░░░  ░▓▓▓▓▓▓▓▓▓▓▓▓▓▓█▓▓███████████████▒  ░░░  ░▒▒▒▒▒
▒▒▒▒░  ░░░  ░▓▓▓▓▓▓▓  ▓▓▓▓▓░  ░█████  ███████▓  ░░░  ░▒▒▒▒▒
▒▒▒▒▒   ░░  ▒▓▓▓▓▓▓▓▓░ ▒▓▓░ ▓▓ ░██▓ ░████████▓  ░░   ▒▒▒▒▒▒
▒▒▒▒▒░      ▓▓▓▓▓▓▓▓▓▓▒ ░  ▓███  ▒ ▒██████████      ░▒▒▒▒▒▒
▒▒▒▒▒▒░    ░▓▓▓▓▓▓▓▓▓▓▓▓ ░▓▓▓███░ ▓███████████▒    ░▒▒▒▒▒▒▒
▒▒▒▒▒▒▒░   ▓▓▓▓▓▓▓▓▓▓▒▒▒▒░░░░░▒▒▒▒▓▓▓▓█████████   ░▒▒▒▒▒▒▒▒
▒▒▒▒▒▒▒░  ▒▓▒▒░░░              ░░░░      ░░▒▒▓█▓  ░▒▒▒▒▒▒▒▒
▒▒▒▒▒▒▒        ░░░░░                 ░░░░░░░       ▒▒▒▒▒▒▒▒
▒▒▒▒▒▒   ░░░          ░░░░░▒▒▒▒░░░░           ░░░   ▒▒▒▒▒▒▒
▒▒▒▒▒         ░░    ░░▒▒▓▓██████▓▓▓▒░░    ░░         ▒▒▒▒▒▒
▒▒▒▒░    ░░▒▒▒▒▒▒▒░░                  ░░▒▒▒▒▒▒▒░░    ░▒▒▒▒▒
███▓▒░▒▒▓███████████▓▓▓▒▒▒░░░░░░▒▒▒▓▓▓███████████▓▒▒░▒▓████`,
    `MMMHXXXHMMMMMMMMMMMMMHHHXXXXXXXXXXHHHMMMMMMMMMMMMMHXXXHMMMM
MMHX=.:-=oXXHHMMHXXO=~--:..    ..:--~=oXXHMMMHXXo=-: =XHMMM
MMMXO.     :~+OO=-.  .~+OOXHHHHXXo+~.  .-=OO+~:      OXMMMM
MMMMXo  .~-:.      -OMB$W%@@##@@%W$BMX~      .:~=:  oXMMMMM
MMMMMX+  -~~~~~--:..                 ..:-~~==+++-  +XMMMMMM
MMMMMHX~  ~~~~~~~~~~~~~~==========+++++++++++++=  ~XHMMMMMM
MMMMMMXO. .-~~~~~~~~~~~~=++++++++++++++++++++=~. .OXMMMMMMM
MMMMMXo:      ..:-~~~~~~=++++++++++++==~--:..     :oXMMMMMM
MMMMXo. .  :MO+=-:     ..::::::::..     :~+OM$:  . .oXMMMMM
MMMHX-  ~-  HW$$W$$8MXOooOOooooooOXHM$@######$  -~  :XHMMMM
MMMXo  -~=  +$$$H=~~~+B$$@#########%O===o8###B  ==-  oXMMMM
MMHX=  ~==  ~$$M :===..M$W########%..===: $##X  ==~  =XHMMM
MMHX- .~==. ~$$H ~+++: H$$@#######$ :=++~ 8##o .+=~. -XHMMM
MMHX- .~=+. ~$$$X-...~H$W$%########8=...~H###o .+=~. -XHMMM
MMHX~ .~==. ~$$WWW$$B$$$$$$#88#######%@######O .==~. ~XHMMM
HHHXo  -==  =$$$$$W$.:B$$W$o  o####W-.%######M  ==-  oXHHHH
HHHXO: .~-  X$$$$$$$8~ O$8~:$W:=@#B +@#######8  -~.  OXHHHH
HHHHX=  :. .8$$$$$$$$$O.+::B%#@--O.H#########%. .:  =XHHHHH
HHHHHX=    +WW$$$$$$$$$M:=8$$@#@o-8###########o    =XHHHHHH
HHHHHHX+  .8$$$$$$$8MHXOo+++++OXXHB8$W%#######@:  +XHHHHHHH
HHHHHHX+  X$MO+~~:..::---------~~~~--::.-=+oH8#B  +XHHHHHHH
HHHHHXO.  : .:-~~~~--:::.......::::--~~==+=~-. -  .OXHHHHHH
HHHHXO.  ~~~-:.     .:-~=+oOXXOo+=~-:.     .:-===. .OXHHHHH
HHHXO-      .:~=-.  ~=XM8WW%%%%W$8MX=~. .-=~:.  ..  :OXHHHH
HHHX=   :~+OXXXXXXo=-.              .-=oXXXXXXO+~:   =XHHHH
%%%WBOoOM8W%%%%%%%%%%%%%%%%%%W$8MHOo++++++oOXM8$W%%%%%%%%%%%%%%%%%%W8MO+OMW%%%%%%`,
]