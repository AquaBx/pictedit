import { Component } from "./Component";

export class Button extends Component {
    private path = new Path2D()
    innerText = ""

    onhover : Function = (self:this) => {}
    onclick : Function = (self:this) => {}

    inside = false
    clicked = false

    constructor() {
        super()
    }

    onMouseDown(e: MouseEvent) {
        if (this.clicked) return
        this.onclick(this)
        this.clicked = true
    }
    onMouseLeave(e: MouseEvent) {
        this.inside = false
    }
    onMouseUp(e: MouseEvent) {
        this.clicked = false
    }
    onMouseUpdate(e: MouseEvent) {
        this.inside = true
    }

    actualizePath() {
        this.path = new Path2D()
        this.path.roundRect(this.properties.x.get(), this.properties.y.get(), this.properties.width.get(), this.properties.height.get(), this.properties.rounding.get());
    }

    isOver(RenderingContext : CanvasRenderingContext2D, x:number, y:number) : boolean {
        return RenderingContext.isPointInPath(this.path, x, y)
    }

    public draw(RenderingContext : CanvasRenderingContext2D){

        if (this.inside) {
            this.onhover(this)
            this.properties.background_color.transitionIncrease();
        }
        else {
            this.properties.background_color.transitionDecrease();
        }
        RenderingContext.fillStyle = this.properties.background_color.get()
        RenderingContext.fill(this.path);

        RenderingContext.font = "400 16px 'Segoe UI'";
        RenderingContext.textAlign = "center";
        RenderingContext.textBaseline = "middle";

        RenderingContext.fillStyle  = this.properties.font_color.get()
        RenderingContext.fillText(this.innerText, this.properties.x.get()+this.properties.width.get()/2, this.properties.y.get()+this.properties.height.get()/2);
        
    }

}