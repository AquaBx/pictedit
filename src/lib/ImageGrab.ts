import { Component } from "./Component";

export class ImageGrab extends Component {
    private path = new Path2D()
    innerText = ""

    constructor() {
        super()
    }

    actualizePath() {
        this.path = new Path2D()
        this.path.arc(this.properties.x.get(), this.properties.y.get(), 10, 0, 2 * Math.PI)
    }

    isOver(RenderingContext : CanvasRenderingContext2D, GlobalContext:Object) : boolean {
        return RenderingContext.isPointInPath(this.path, GlobalContext.cursor.x, GlobalContext.cursor.y)
    }

    public draw(RenderingContext : CanvasRenderingContext2D){
        RenderingContext.fillStyle = "#F3F3F3";
        RenderingContext.fill(this.path);
        RenderingContext.lineWidth = 1;
        RenderingContext.strokeStyle = "#FFFFFF";
        RenderingContext.stroke(this.path);
    }

}