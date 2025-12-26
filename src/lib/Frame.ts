import { Component } from "./Component"

export class Frame extends Component {
    private canvas:HTMLCanvasElement|undefined


    selected : Component|undefined

    public select(component:Component){
        this.selected = component
        console.log(this.selected)

    }

    onMouseUpdate(e:MouseEvent) {
        this.selected?.onMouseUpdate(e)
    }

    onMouseLeave(e:MouseEvent) {
        this.selected?.onMouseLeave(e)
    }

    public clicked = {
        state: false,
        x:0,
        y:0
    }

    onMouseDown(e:MouseEvent) {
        this.clicked.state = true
        this.clicked.x = e.x
        this.clicked.y = e.y

        let to_be_reset = true

        for (let component of this.childs) {
            if ( component.isOver(this.ctx,this.clicked.x,this.clicked.y) ) {
                if (this.clicked.state) {
                    this.select(component)
                    to_be_reset = false
                } else {
                    component.onhover()
                }
            }

            component.draw(this.ctx)
        }

        this.clicked.state = false

        if (to_be_reset) {this.selected = undefined}
        this.selected?.onMouseDown(e)

    }

    onMouseUp(e:MouseEvent) {
        this.selected?.onMouseUp(e)
    }

    onResize() {
        this.properties.width.set(window.innerWidth)
        this.properties.height.set(window.innerHeight)

        if (this.canvas === undefined) return
        
        this.canvas.width = this.properties.width.get()
        this.canvas.height = this.properties.height.get()
    }

    isOver(){return true}

    public add(child: Component) {
        super.add(child)
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
        document.addEventListener('mouseup', this.onMouseUp.bind(this));

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

        for (let component of this.childs) {
            component.draw(this.ctx)
        }
        
        requestAnimationFrame(this.draw);
    }
}