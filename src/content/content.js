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
    if (enabled) {
        setTimeout(()=>{


        const {Events, Engine, Runner, Body, Bodies, Composite, Mouse, MouseConstraint, World} = Matter

        const engine = Engine.create(), runner = Runner.create()
        engine.gravity.y = 0.6
        Runner.run(runner, engine)

        const containers = document.querySelectorAll("section"), wallPadding = -25, wallSize = 10, els = []

        containers.forEach(el=>{
            const rects = el.getBoundingClientRect(), x = rects.x, y = rects.y, w = rects.width, h = rects.height, walls = [
                Bodies.rectangle(x+w/2, y+wallPadding, w-wallPadding*2, wallSize, {isStatic:true}),   //top
                Bodies.rectangle(x+w-wallPadding, y+h/2, wallSize, h-wallPadding*2, {isStatic:true}), //right
                Bodies.rectangle(x+w/2, y+h-wallPadding, w-wallPadding*2, wallSize, {isStatic:true}), //bottom
                Bodies.rectangle(x+wallPadding, y+h/2, wallSize, h-wallPadding*2, {isStatic:true})    // left
            ]
            Composite.add(engine.world, walls)

            const targetEls = el.querySelectorAll("h1, h2, h3, span, p, svg, .mpo-indicateur-reussite"), objPadding = -15//[...el.children]//.querySelectorAll("*")
            targetEls.forEach(innerEl=>{
                const elRects = absolutize(innerEl, el), x = elRects.x, y = elRects.y, w2 = elRects.width/2, h2 = elRects.height/2,
                        obj = Bodies.rectangle(x+w2, y+h2, (w2*2)+objPadding, (h2*2)+objPadding, {restitution:.5})
                
                els.push([elRects.newElement, obj, w2, h2, ])
                Composite.add(engine.world, obj)
            })
        })




        const top = document.body, mouse = Mouse.create(top)
        World.add(engine.world, MouseConstraint.create(engine, {mouse, constraint:{stiffness:.2, render:{visible:false}}}))

        //let lastHeight = document.documentElement.scrollHeight
        const t_ll = els.length
        Events.on(engine, "afterUpdate", ()=>{
            for (let i=0;i<t_ll;i++) {
                const elInfo = els[i], el = elInfo[0], obj = elInfo[1], x = obj.position.x, y = obj.position.y
                el.style.left = (x-elInfo[2])+"px"
                const newY = y-elInfo[3]
                el.style.top = (newY > 3000 ? 0 : newY)+"px"
                el.style.transform = "rotateZ("+obj.angle+"rad)"
            }

            //const scrollHeight = document.documentElement.scrollHeight
            //if (lastHeight != scrollHeight) {
            //    const bottomWall = walls[0]
            //    Body.setPosition(bottomWall, {x:bottomWall.position.x, y:scrollHeight-wallPadding})
            //    console.log(bottomWall.position.y)
            //    lastHeight = scrollHeight
            //}
        })


        }, 2000)

    } else console.log("reset")
}