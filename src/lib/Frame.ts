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
        this.width = window.innerWidth
        this.height = window.innerHeight

        if (this.canvas){
            this.canvas.width = this.width
            this.canvas.height = this.height
        }
    }

    constructor() {
        super()

        this.onResize()

        window.addEventListener("resize", this.onResize.bind(this));
        document.addEventListener('mousemove', this.onMouseUpdate.bind(this));
        document.addEventListener('mousedown', this.onMouseDown.bind(this));
        document.addEventListener('mouseenter', this.onMouseUpdate.bind(this));
        document.addEventListener('mouseleave', this.onMouseLeave.bind(this));
    }

    actualizePath(){}

    set setCanvas(canvas:HTMLCanvasElement){
        this.canvas = canvas
        this.canvas!.width = this.width
        this.canvas!.height = this.height
    }

    get ctx(){
        return this.canvas!.getContext("2d")!
    }

    public draw(){
        this.ctx.clearRect(0, 0, this.canvas!.width, this.canvas!.height);
        for (let component of this.childs){
            component.draw(this.ctx,{cursor:this.cursor,clicked:this.clicked})
        }
        requestAnimationFrame( this.draw.bind(this) );
        this.clicked = false
    }

}