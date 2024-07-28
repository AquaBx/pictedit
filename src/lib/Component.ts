import { Properties } from "./Utils";

export abstract class Component {

    _parent:Component|undefined
    public properties = new Properties()

    constructor() {}

    protected childs : Component[] = []

    add(child:Component) {
        child._parent = this;
        this.childs.push(child);
    }

    abstract actualizePath() : void
    abstract draw(RenderingContext : CanvasRenderingContext2D, GlobalContext:Object) : void;

}