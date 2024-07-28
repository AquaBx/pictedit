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
        this.path.roundRect(this.x, this.y, this.width, this.height, this.rounding);
    }

    isOver(RenderingContext : CanvasRenderingContext2D, GlobalContext:Object) : bool {
        return RenderingContext.isPointInPath(this.path, GlobalContext.cursor.x, GlobalContext.cursor.y)
    }

    public draw(RenderingContext : CanvasRenderingContext2D, GlobalContext:Object){

        if (this.isOver(RenderingContext,GlobalContext)) {
            this.onhover(this)
            if (GlobalContext.clicked) {
                this.onclick(this)
            }
        }

        RenderingContext.fillStyle = this._background_color;
        RenderingContext.fill(this.path);

        RenderingContext.font = "400 16px 'Segoe UI'";
        RenderingContext.textAlign = "center";
        RenderingContext.textBaseline = "middle";

        RenderingContext.fillStyle  = this._font_color;
        RenderingContext.fillText(this.innerText, this.x+this.width/2, this.y+this.height/2);
    }

}