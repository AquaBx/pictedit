import { Button } from "./lib/Button";
import { Frame } from "./lib/Frame"

let frame = new Frame()
frame.setCanvas = document.querySelector("canvas")!

let btn = new Button()
btn.properties.background_color.set("#005FB8")
btn.properties.font_color.set("#ffffff")
btn.innerText = "Salve"
btn.properties.x.set(20)
btn.properties.y.set(20)
btn.properties.width.set(100)
btn.properties.height.set(36)
btn.properties.rounding.set([8])

btn.onclick = (self) => {self.innerText =  self.innerText.split('').reverse().join('') }
btn.onhover = (self) => {self.properties.background_color.setTransition("#196ebf")}
btn.actualizePath()

frame.add(btn)