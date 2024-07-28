import { Button } from "./lib/Button";
import { Frame } from "./lib/Frame"

let frame = new Frame()
frame.setCanvas = document.querySelector("canvas")!

let btn = new Button()
btn._background_color = "#005FB8"
btn._font_color = "#ffffff"
btn.innerText = "Salve"
btn.x = 20
btn.y = 20
btn.width = 100
btn.height = 36
btn.rounding = [8]
btn.onclick = (self) => {self.innerText =  self.innerText.split('').reverse().join('') }
btn.onhover = (self) => {self._background_color = "#196ebf"}
frame.add(btn)

frame.draw()