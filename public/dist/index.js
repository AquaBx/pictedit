// src/lib/Utils.ts
var PropertyG = class {
  _base_value;
  set(value) {
    this._base_value = value;
  }
};
var PropertyTransitionG = class extends PropertyG {
  _target_value;
  _last = 0;
  _duration = 100;
  set(value) {
    super.set(value);
    this._target_value = value;
  }
  setTransition(value) {
    this._target_value = value;
  }
  transitionIncrease() {
    this._last = Math.min(this._duration, this._last + 1);
  }
  transitionDecrease() {
    this._last = Math.max(0, this._last - 1);
  }
  getRatio() {
    return this._last / this._duration;
  }
};
var PropertyNumber = class extends PropertyTransitionG {
  get() {
    return this._base_value === void 0 ? 0 : (this._target_value - this._base_value) * this.getRatio() + this._base_value;
  }
};
var PropertyNumberList = class extends PropertyTransitionG {
  get() {
    if (this._base_value === void 0) return [];
    let a = [];
    for (let i in this._base_value) {
      a[i] = (this._target_value[i] - this._base_value[i]) * this.getRatio() + this._base_value[i];
    }
    return a;
  }
};
var PropertyHexa = class extends PropertyTransitionG {
  get() {
    let c1 = String(this._base_value).padStart(6, "0");
    let c2 = String(this._target_value).padStart(6, "0");
    if (this._base_value === void 0) return "#ffffff";
    let r1 = parseInt(c1.substr(1, 2), 16);
    let g1 = parseInt(c1.substr(3, 2), 16);
    let b1 = parseInt(c1.substr(5, 2), 16);
    let r2 = parseInt(c2.substr(1, 2), 16);
    let g2 = parseInt(c2.substr(3, 2), 16);
    let b2 = parseInt(c2.substr(5, 2), 16);
    let r = (r2 - r1) * this.getRatio() + r1;
    let g = (g2 - g1) * this.getRatio() + g1;
    let b = (b2 - b1) * this.getRatio() + b1;
    return `rgb(${r},${g},${b})`;
  }
};
var Properties = class {
  background_color = new PropertyHexa();
  font_color = new PropertyHexa();
  width = new PropertyNumber();
  height = new PropertyNumber();
  x = new PropertyNumber();
  y = new PropertyNumber();
  rounding = new PropertyNumberList();
};

// src/lib/Component.ts
var Component = class {
  _parent;
  properties = new Properties();
  constructor() {
  }
  childs = [];
  add(child) {
    child._parent = this;
    this.childs.push(child);
  }
};

// src/lib/Button.ts
var Button = class extends Component {
  path = new Path2D();
  innerText = "";
  onhover = (self) => {
  };
  onclick = (self) => {
  };
  constructor() {
    super();
  }
  actualizePath() {
    this.path = new Path2D();
    this.path.roundRect(this.properties.x.get(), this.properties.y.get(), this.properties.width.get(), this.properties.height.get(), this.properties.rounding.get());
  }
  isOver(RenderingContext, GlobalContext) {
    return RenderingContext.isPointInPath(this.path, GlobalContext.cursor.x, GlobalContext.cursor.y);
  }
  draw(RenderingContext, GlobalContext) {
    if (this.isOver(RenderingContext, GlobalContext)) {
      this.onhover(this);
      this.properties.background_color.transitionIncrease();
      if (GlobalContext.clicked) {
        this.onclick(this);
      }
    } else {
      this.properties.background_color.transitionDecrease();
    }
    RenderingContext.fillStyle = this.properties.background_color.get();
    RenderingContext.fill(this.path);
    RenderingContext.font = "400 16px 'Segoe UI'";
    RenderingContext.textAlign = "center";
    RenderingContext.textBaseline = "middle";
    RenderingContext.fillStyle = this.properties.font_color.get();
    RenderingContext.fillText(this.innerText, this.properties.x.get() + this.properties.width.get() / 2, this.properties.y.get() + this.properties.height.get() / 2);
  }
};

// src/lib/Frame.ts
var Frame = class extends Component {
  canvas;
  cursor = {
    x: 0,
    y: 0
  };
  clicked = false;
  onMouseUpdate(e) {
    this.cursor.x = e.clientX;
    this.cursor.y = e.clientY;
  }
  onMouseLeave(e) {
    this.cursor.x = -1;
    this.cursor.y = -1;
  }
  onMouseDown(e) {
    this.clicked = true;
  }
  onResize() {
    this.properties.width.set(window.innerWidth);
    this.properties.height.set(window.innerHeight);
    if (this.canvas === void 0) return;
    this.canvas.width = this.properties.width.get();
    this.canvas.height = this.properties.height.get();
  }
  constructor() {
    super();
    this.draw = this.draw.bind(this);
    this.onResize();
    window.addEventListener("resize", this.onResize.bind(this));
    document.addEventListener("mousemove", this.onMouseUpdate.bind(this));
    document.addEventListener("mousedown", this.onMouseDown.bind(this));
    document.addEventListener("mouseenter", this.onMouseUpdate.bind(this));
    document.addEventListener("mouseleave", this.onMouseLeave.bind(this));
    requestAnimationFrame(this.draw);
  }
  actualizePath() {
  }
  set setCanvas(canvas) {
    this.canvas = canvas;
    this.onResize();
  }
  get ctx() {
    return this.canvas.getContext("2d");
  }
  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    for (let component of this.childs) {
      component.draw(this.ctx, { cursor: this.cursor, clicked: this.clicked });
    }
    this.clicked = false;
    requestAnimationFrame(this.draw);
  }
};

// src/index.ts
var frame = new Frame();
frame.setCanvas = document.querySelector("canvas");
var btn = new Button();
btn.properties.background_color.set("#005FB8");
btn.properties.font_color.set("#ffffff");
btn.innerText = "Salve";
btn.properties.x.set(20);
btn.properties.y.set(20);
btn.properties.width.set(100);
btn.properties.height.set(36);
btn.properties.rounding.set([8]);
btn.onclick = (self) => {
  self.innerText = self.innerText.split("").reverse().join("");
};
btn.onhover = (self) => {
  self.properties.background_color.setTransition("#ff0000");
};
btn.actualizePath();
frame.add(btn);
