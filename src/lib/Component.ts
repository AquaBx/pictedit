export abstract class Component {

    _parent:Component|undefined

    _background_color:string|undefined
    _font_color:string|undefined
    _width:number|undefined
    _height:number|undefined
    _x:number|undefined
    _y:number|undefined
    _rounding:number[]|undefined
    
    constructor() {}

    protected childs : Component[] = []

    add(child:Component) {
        child._parent = this;
        this.childs.push(child);
    }

    get height() : number {
        return this._height || this._parent?.height || 0
    }
    get width() : number {
        return this._width || this._parent?.width || 0
    }
    get x() : number {
        return this._x || this._parent?.x || 0
    }
    get y() : number {
        return this._y || this._parent?.y || 0
    }
    get rounding() : number[] {
        return this._rounding || this._parent?.rounding || [0]
    }

    set height(h:number) {
        this._height=h
        this.actualizePath()
    }

    set width(w:number) {
        this._width=w
        this.actualizePath()
    }

    set x(x:number) {
        this._x=x
        this.actualizePath()
    }

    set y(y:number) {
        this._y=y
        this.actualizePath()
    }

    set rounding(r:number[]) {
        this._rounding=r
        this.actualizePath()
    }

     

    abstract actualizePath() : void
    abstract draw(RenderingContext : CanvasRenderingContext2D, GlobalContext:Object) : void;

}