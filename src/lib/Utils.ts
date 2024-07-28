
class GlobalContext {

}

abstract class PropertyG<T> {
    protected _base_value : T|undefined
    abstract get() : T

    set(value:T|undefined){
        this._base_value = value
        //parent.actualizePath()
    }
}

abstract class PropertyTransitionG<T> extends PropertyG<T> {
    protected _target_value : T|undefined
    protected _last:number=0
    protected _duration:number = 100

    set(value:T|undefined){
        super.set(value)
        this._target_value = value
    }

    setTransition(value:T|undefined){
        this._target_value = value
    }

    transitionIncrease() {
        this._last = Math.min(this._duration,this._last + 1)
    }

    transitionDecrease() {
        this._last = Math.max(0,this._last - 1)
    }

    getRatio(){
        return this._last/this._duration
    }
}

class PropertyNumber extends PropertyTransitionG<number> {
    get() {
        return this._base_value === undefined ? 0 : (this._target_value - this._base_value) * this.getRatio() + this._base_value
    }
}

class PropertyNumberList extends PropertyTransitionG<number[]> {
    get() {
        if (this._base_value === undefined) return []

        let a = []
        for (let i in this._base_value) {
            a[i] = (this._target_value[i] - this._base_value[i]) * this.getRatio() + this._base_value[i]
        }
        return a
    }
}

class PropertyString extends PropertyG<string> {
    get() {
        return this._base_value || ""
    }
}

export class Properties {
    background_color = new PropertyNumber()
    font_color = new PropertyNumber()
    width = new PropertyNumber()
    height = new PropertyNumber()
    x = new PropertyNumber()
    y = new PropertyNumber()
    rounding = new PropertyNumberList()
}