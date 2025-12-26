import { Component } from "./Component";
import { ImageGrab } from "./ImageGrab";

export class Image extends Component {
    private path = new Path2D()

    onhover : Function = (self:this) => {}
    onclick : Function = (self:this) => {}

    last_x = 0
    last_y = 0
    drag = false

    onMouseDown(e: MouseEvent) {
        this.drag = true

        this.last_x = e.x
        this.last_y = e.y
    }

    onMouseUpdate(e: MouseEvent) {
        if (!this.drag) return

        this.properties.x.set(this.properties.x.get() + e.x - this.last_x)
        this.properties.y.set(this.properties.y.get() + e.y - this.last_y)
        this.onMouseDown(e)
        this.actualizePath()
    }

    onMouseLeave(e: MouseEvent) {
        this.drag = false
    }

    onMouseUp(e: MouseEvent) {
        this.drag = false
    }

    constructor() {
        super()

        /* 
        let grab1 = new ImageGrab() // top left
        let grab2 = new ImageGrab() // top right
        let grab3 = new ImageGrab() // bottom left
        let grab4 = new ImageGrab() // bottom right

        this.add(grab1)
        this.add(grab2)
        this.add(grab3)
        this.add(grab4)
        */
    }

    actualizePath() {
        this.path = new Path2D()
        this.path.roundRect(this.properties.x.get(), this.properties.y.get(), this.properties.width.get(), this.properties.height.get(), this.properties.rounding.get());
        
        /*
        this.childs[0].properties.x.set( this.properties.x.get() )
        this.childs[0].properties.y.set( this.properties.y.get() )
        
        this.childs[1].properties.x.set( this.properties.x.get() + this.properties.width.get() )
        this.childs[1].properties.y.set( this.properties.y.get() )

        this.childs[2].properties.x.set( this.properties.x.get() )
        this.childs[2].properties.y.set( this.properties.y.get() + this.properties.height.get() )

        this.childs[3].properties.x.set( this.properties.x.get() + this.properties.width.get() )
        this.childs[3].properties.y.set( this.properties.y.get() + this.properties.height.get() )

        for (let item of this.childs){
            item.actualizePath()
        } 
        */
    }

    isOver(RenderingContext : CanvasRenderingContext2D, x:number, y:number) : boolean {
        return RenderingContext.isPointInPath(this.path, x, y)
    }

    public draw(RenderingContext : CanvasRenderingContext2D){
        RenderingContext.fillStyle = this.properties.background_color.get()
        RenderingContext.fill(this.path);
    }

}