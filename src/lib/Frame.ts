import { Component } from "./Component"

export class Frame extends Component {
    private canvas:HTMLCanvasElement|undefined

    public cursor = {
        x:0,
        y:0
    }

    public clicked = false

    onMouseUpdate(e:MouseEvent) {
        this.cursor.x = e.clientX
        this.cursor.y = e.clientY
    }

    onMouseLeave(e:MouseEvent) {
        this.cursor.x = -1
        this.cursor.y = -1
    }

    onMouseDown(e:MouseEvent) {
        this.clicked = true
    }
    
    onResize() {
        this.properties.width.set(window.innerWidth)
        this.properties.height.set(window.innerHeight)

        if (this.canvas === undefined) return
        
        this.canvas.width = this.properties.width.get()
        this.canvas.height = this.properties.height.get()

    }

    constructor() {
        super()
        this.draw = this.draw.bind(this)
        this.onResize()

        window.addEventListener("resize", this.onResize.bind(this));
        document.addEventListener('mousemove', this.onMouseUpdate.bind(this));
        document.addEventListener('mousedown', this.onMouseDown.bind(this));
        document.addEventListener('mouseenter', this.onMouseUpdate.bind(this));
        document.addEventListener('mouseleave', this.onMouseLeave.bind(this));

        requestAnimationFrame(this.draw);
    }

    actualizePath(){}

    set setCanvas(canvas:HTMLCanvasElement){
        this.canvas = canvas
        this.onResize()
    }

    get ctx(){
        return this.canvas!.getContext("2d")!
    }

    public draw(){
        this.ctx.clearRect(0, 0, this.canvas!.width, this.canvas!.height);
        for (let component of this.childs){
            component.draw(this.ctx,{cursor:this.cursor,clicked:this.clicked})
        }
        this.clicked = false
        requestAnimationFrame(this.draw);
    }

}