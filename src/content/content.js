// JS
// ULaval Extension by Louis-Charles Biron
// Please don't use nor credit this code as your own.
//

// HELLO MESSAGE
console.log("%cThank you for using ULaval Extension :)", "color:lime;font-size:16px")
console.log(`%c${logoVariations[random(0, logoVariations.length-1)]}`, "font-size:11.5px;font-family:monospace;white-space:pre;color:aliceblue")
console.log("\n\nBy Louis-Charles Biron\n\n\n")

// GLOBALS
const preloadBacklog = []
let loadingFinished = false

// MESSAGE LISTENER
chrome.runtime.onMessage.addListener(execMapper)

// FUNCTION MAPPER
function execMapper(msg) {
    if (!loadingFinished && msg.postLoad) preloadBacklog.push(msg)
    else {
        if (msg.type=="antiBloat") antiBloat(msg.value)
        else if (msg.type=="darkMode") darkMode(msg.value)
        else if (msg.type=="useGravity") useGravity(msg.value)
    }
}

// AUTO APPLY FROM STORAGE
chrome.storage.sync.get(r=>{
    if (r[SM.antiBloat]) execMapper({type:"antiBloat", value:r[SM.antiBloat], postLoad:true})
    if (r[SM.useGravity]) execMapper({type:"useGravity", value:r[SM.useGravity], postLoad:true})
})

// LOADING OBSERVER
const loadingClass = "mpo-squelette-cadre", targetElement = document.querySelector("."+loadingClass)
if (targetElement) {
    const loadingObserver = new MutationObserver(list=>{
        list.forEach(mut=>mut.removedNodes.forEach(el=>{
            if (el.className.includes(loadingClass)) {
                // ON LOAD
                console.log("LOADING FINISHED")
                loadingFinished = true
                preloadBacklog.forEach(msg=>execMapper(msg))
                loadingObserver.disconnect()
            }
        }))
    })
    loadingObserver.observe(targetElement.parentElement, {childList:true})
}

// FUNCTIONS DEFINITIONS
function antiBloat(enabled) {
    const bloatElements = document.querySelectorAll("section:not(.mpo--liste-cours), div.mpo--site-hors-session, footer, .mpo-gabarit-accordeon-liste-cours__nombre-nouvautes"), b_ll = bloatElements.length, visibility = enabled?"none":""
    for (let i=0;i<b_ll;i++) bloatElements[i].style.display = visibility

    // CENTER THE DIV
    const parent = document.querySelector(".mpo-smart-page-tableau-bord__zone-cours-et-messages-importants")
    parent.style.display = "flex"
    parent.style.justifyContent = "center"

    // CLEAN EDITION TEXT
    document.querySelector(".mpo-smart-entete-cadre__logo-mpo").innerHTML = "mon<b>Portail</b><i style='font-size:0.85em'>&nbsp;Clean edition</i>"
}

function darkMode(enabled) {
    const head = document.querySelector("head"),
          styleElement = document.createElement("style"),
          id = "__ULEDM__",
          oldElement = document.getElementById(id)
    
    styleElement.id = id
    if (oldElement) oldElement.remove()
    styleElement.appendChild(document.createTextNode(enabled ? manualDarkModeCSS: manualLightModeCSS))
    head.appendChild(styleElement)
}


function useGravity(enabled) {
    console.log("ENABLE G", enabled)
    if (enabled) {
        const {Events, Engine, Runner, Body, Bodies, Composite, Mouse, MouseConstraint, World} = Matter

        const engine = Engine.create(), runner = Runner.create()
        engine.gravity.y = 0.6
        Runner.run(runner, engine)

        const wallPadding = -20, wallSize = 10, w = document.documentElement.scrollWidth, h = document.documentElement.scrollHeight, walls = [
            Bodies.rectangle(w/2, wallPadding, w-wallPadding*2, wallSize, {isStatic:true}),   //top
            Bodies.rectangle(w-wallPadding, h/2, wallSize, h-wallPadding*2, {isStatic:true}), //right
            Bodies.rectangle(w/2, h-wallPadding, w-wallPadding*2, wallSize, {isStatic:true}), //bottom
            Bodies.rectangle(wallPadding, h/2, wallSize, h-wallPadding*2, {isStatic:true})    // left
        ]
        Composite.add(engine.world, walls)

        const top = document.querySelector(".mu-app-root"), targetEls = document.querySelectorAll("svg, img"), t_ll = targetEls.length, els = []
        targetEls.forEach(el=>{
            const elRects = absolutize(el, top), x = elRects.x, y = elRects.y, w2 = elRects.width/2, h2 = elRects.height/2,
                    obj = Bodies.rectangle(x+w2, y+h2, w2*2, h2*2, {restitution:.5})
            
            els.push([elRects.newElement, obj, w2, h2])
            Composite.add(engine.world, obj)
        })
            
        World.add(engine.world, MouseConstraint.create(engine, {mouse:Mouse.create(top), constraint:{stiffness:.2}}))

        let lastHeight = document.documentElement.scrollHeight
        Events.on(engine, "afterUpdate", ()=>{
            for (let i=0;i<t_ll;i++) {
                const elInfo = els[i], el = elInfo[0], obj = elInfo[1], x = obj.position.x, y = obj.position.y
                el.style.left = (x-elInfo[2])+"px"
                el.style.top = (y-elInfo[3])+"px"
                el.style.transform = "rotateZ("+obj.angle+"rad)"
            }

            const scrollHeight = document.documentElement.scrollHeight
            if (lastHeight != scrollHeight) {
                const bottomWall = walls[0]
                Body.setPosition(bottomWall, {x:bottomWall.position.x, y:scrollHeight-wallPadding})
                console.log(bottomWall.position.y)
                lastHeight = scrollHeight
            }
        })
    } else console.log("reset")
}