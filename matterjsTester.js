function absolutize(el, appendToEl=document.body) {
  const {x, y, width, height} = el.getBoundingClientRect(), copyEl = el.cloneNode(999)
  
  el.style.opacity = 0
  el.style.pointerEvents = "none"
  
  copyEl.style.position = "absolute"
  copyEl.style.left = x+"px"
  copyEl.style.top = y+"px"
  copyEl.style.width = width+"px"
  copyEl.style.height = height+"px"
  copyEl.style.zIndex = 9999
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

loadScript("https://cdn.jsdelivr.net/npm/matter-js@0.20.0/build/matter.min.js", ()=>{

const {Engine, Runner, Bodies, Composite, Mouse, MouseConstraint, World} = Matter

const engine = Engine.create(), runner = Runner.create()
engine.gravity.y = 0.6
Runner.run(runner, engine)

const wallPadding = 0, wallSize = 20, w = window.innerWidth, h = window.innerHeight, walls = [
  Bodies.rectangle(w/2, wallPadding, w-wallPadding*2, wallSize, {isStatic:true}),   //top
  Bodies.rectangle(w-wallPadding, h/2, wallSize, h-wallPadding*2, {isStatic:true}), //right
  Bodies.rectangle(w/2, h-wallPadding, w-wallPadding*2, wallSize, {isStatic:true}), //bottom
  Bodies.rectangle(wallPadding, h/2, wallSize, h-wallPadding*2, {isStatic:true})    // left
]
Composite.add(engine.world, walls)

const top = document.body
    
const targetEl = document.querySelector("body > div.L3eUgb > div.o3j99.LLD4me.yr19Zb.LS8OJ > div > svg")
  
const targetRects = absolutize(targetEl, top), newTargetEl = targetRects.newElement
  
const objTest = Bodies.rectangle(targetRects.x+targetRects.width/2, targetRects.y+targetRects.height/2, targetRects.width, targetRects.height, {restitution:.5})
Composite.add(engine.world, [objTest])

const mouse = Mouse.create(top)
World.add(engine.world, MouseConstraint.create(engine, {mouse:mouse, constraint:{stiffness:.2}}))

Matter.Events.on(engine, "afterUpdate", ()=>{
  const x = objTest.position.x, y = objTest.position.y, rad = objTest.angle

  newTargetEl.style.left = (x-targetRects.width/2)+"px"
  newTargetEl.style.top = (y-targetRects.height/2)+"px"
  newTargetEl.style.transform="rotateZ("+rad+"rad)"
})

  
})

