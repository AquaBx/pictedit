import { Properties } from "./Utils";

export abstract class Component {

    _parent:Component|undefined
    public properties = new Properties()

    constructor() {}

    protected childs : Component[] = []

    onhover : Function = (self:this) => {}
    onclick : Function = (self:this) => {}

    abstract onMouseUpdate(e:MouseEvent)

    abstract onMouseLeave(e:MouseEvent)

    abstract onMouseDown(e:MouseEvent)

    abstract onMouseUp(e:MouseEvent)

    abstract isOver(RenderingContext : CanvasRenderingContext2D, x:number, y:number) : boolean

    add(child:Component) {
        child._parent = this;
        this.childs.push(child);
    }

    abstract actualizePath() : void
    abstract draw(RenderingContext : CanvasRenderingContext2D) : void;

}