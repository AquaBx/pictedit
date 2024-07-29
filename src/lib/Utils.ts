
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
    protected _duration:number = 20

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

class PropertyHexa extends PropertyTransitionG<string> {
    get() {
        let c1 = String(this._base_value).padStart(6, '0')
        let c2 = String(this._target_value).padStart(6, '0')

        if (this._base_value === undefined) return "#ffffff"


        let r1 = parseInt(c1.substr(1,2),16)
        let g1 = parseInt(c1.substr(3,2),16)
        let b1 = parseInt(c1.substr(5,2),16)

        let r2 = parseInt(c2.substr(1,2),16)
        let g2 = parseInt(c2.substr(3,2),16)
        let b2 = parseInt(c2.substr(5,2),16)

        let r = (r2 - r1) * this.getRatio() + r1
        let g = (g2 - g1) * this.getRatio() + g1
        let b = (b2 - b1) * this.getRatio() + b1

        return `rgb(${r},${g},${b})`
    }
}

class PropertyString extends PropertyG<string> {
    get() {
        return this._base_value || ""
    }
}

export class Properties {
    background_color = new PropertyHexa()
    font_color = new PropertyHexa()
    width = new PropertyNumber()
    height = new PropertyNumber()
    x = new PropertyNumber()
    y = new PropertyNumber()
    rounding = new PropertyNumberList()
}