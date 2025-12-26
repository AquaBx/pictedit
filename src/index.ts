import { Image as ImageComp } from "./lib/Image";
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

let image = new ImageComp()
image.properties.width.set(200)
image.properties.height.set(200)
image.properties.background_color.set("#ff0000")
image.properties.rounding.set([0])
image.actualizePath()
frame.add(image)

let image2 = new ImageComp()
image2.properties.width.set(100)
image2.properties.height.set(100)

image2.properties.background_color.set("#00ff00")
image2.properties.rounding.set([0])
image2.actualizePath()
frame.add(image2)