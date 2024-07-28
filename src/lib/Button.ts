import { Component } from "./Component";

export class Button extends Component {
    private path = new Path2D()
    innerText = ""

    onhover : Function = (self:this) => {}
    onclick : Function = (self:this) => {}

    constructor() {
        super()
    }

    actualizePath() {
        this.path = new Path2D()
        this.path.roundRect(this.properties.x.get(), this.properties.y.get(), this.properties.width.get(), this.properties.height.get(), this.properties.rounding.get());
    }

    isOver(RenderingContext : CanvasRenderingContext2D, GlobalContext:Object) : boolean {
        return RenderingContext.isPointInPath(this.path, GlobalContext.cursor.x, GlobalContext.cursor.y)
    }

    public draw(RenderingContext : CanvasRenderingContext2D, GlobalContext:Object){

        if (this.isOver(RenderingContext,GlobalContext)) {
            this.onhover(this)
            this.properties.background_color.transitionIncrease();

            if (GlobalContext.clicked) {
                this.onclick(this)
            }
        }
        else {
            this.properties.background_color.transitionDecrease();
        }
        RenderingContext.fillStyle = "#" + this.properties.background_color.get().toString(16).padStart(6, '0');
        RenderingContext.fill(this.path);

        RenderingContext.font = "400 16px 'Segoe UI'";
        RenderingContext.textAlign = "center";
        RenderingContext.textBaseline = "middle";

        RenderingContext.fillStyle  = "#" + this.properties.font_color.get().toString(16).padStart(6, '0');
        RenderingContext.fillText(this.innerText, this.properties.x.get()+this.properties.width.get()/2, this.properties.y.get()+this.properties.height.get()/2);
        
    }

}