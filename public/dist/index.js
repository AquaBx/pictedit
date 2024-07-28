// src/lib/Component.ts
var Component = class {
  _parent;
  _background_color;
  _font_color;
  _width;
  _height;
  _x;
  _y;
  _rounding;
  constructor() {
  }
  childs = [];
  add(child) {
    child._parent = this;
    this.childs.push(child);
  }
  get height() {
    var _a;
    return this._height || ((_a = this._parent) == null ? void 0 : _a.height) || 0;
  }
  get width() {
    var _a;
    return this._width || ((_a = this._parent) == null ? void 0 : _a.width) || 0;
  }
  get x() {
    var _a;
    return this._x || ((_a = this._parent) == null ? void 0 : _a.x) || 0;
  }
  get y() {
    var _a;
    return this._y || ((_a = this._parent) == null ? void 0 : _a.y) || 0;
  }
  get rounding() {
    var _a;
    return this._rounding || ((_a = this._parent) == null ? void 0 : _a.rounding) || [0];
  }
  set height(h) {
    this._height = h;
    this.actualizePath();
  }
  set width(w) {
    this._width = w;
    this.actualizePath();
  }
  set x(x) {
    this._x = x;
    this.actualizePath();
  }
  set y(y) {
    this._y = y;
    this.actualizePath();
  }
  set rounding(r) {
    this._rounding = r;
    this.actualizePath();
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
    this.path.roundRect(this.x, this.y, this.width, this.height, this.rounding);
  }
  isOver(RenderingContext, GlobalContext) {
    return RenderingContext.isPointInPath(this.path, GlobalContext.cursor.x, GlobalContext.cursor.y);
  }
  draw(RenderingContext, GlobalContext) {
    if (this.isOver(RenderingContext, GlobalContext)) {
      this.onhover(this);
      if (GlobalContext.clicked) {
        this.onclick(this);
      }
    }
    RenderingContext.fillStyle = this._background_color;
    RenderingContext.fill(this.path);
    RenderingContext.font = "400 16px 'Segoe UI'";
    RenderingContext.textAlign = "center";
    RenderingContext.textBaseline = "middle";
    RenderingContext.fillStyle = this._font_color;
    RenderingContext.fillText(this.innerText, this.x + this.width / 2, this.y + this.height / 2);
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
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    if (this.canvas) {
      this.canvas.width = this.width;
      this.canvas.height = this.height;
    }
  }
  constructor() {
    super();
    this.onResize();
    window.addEventListener("resize", this.onResize.bind(this));
    document.addEventListener("mousemove", this.onMouseUpdate.bind(this));
    document.addEventListener("mousedown", this.onMouseDown.bind(this));
    document.addEventListener("mouseenter", this.onMouseUpdate.bind(this));
    document.addEventListener("mouseleave", this.onMouseLeave.bind(this));
  }
  actualizePath() {
  }
  set setCanvas(canvas) {
    this.canvas = canvas;
    this.canvas.width = this.width;
    this.canvas.height = this.height;
  }
  get ctx() {
    return this.canvas.getContext("2d");
  }
  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    for (let component of this.childs) {
      component.draw(this.ctx, { cursor: this.cursor, clicked: this.clicked });
    }
    requestAnimationFrame(this.draw.bind(this));
    this.clicked = false;
  }
};

// src/lib/Switch.ts
var Switch = class extends Component {
  path = new Path2D();
  innerText = "";
  onhover = (self) => {
  };
  onclick = (self) => {
  };
  constructor() {
    super();
    this.width = 40;
    this.height = 20;
  }
  actualizePath() {
    this.path = new Path2D();
    this.path.roundRect(this.x, this.y, 40, 20, 999);
    this.path.roundRect(this.x + 4, this.y + 4, 12, 12, 999);
  }
  isOver(RenderingContext, GlobalContext) {
    return RenderingContext.isPointInPath(this.path, GlobalContext.cursor.x, GlobalContext.cursor.y);
  }
  draw(RenderingContext, GlobalContext) {
    if (this.isOver(RenderingContext, GlobalContext)) {
      this.onhover(this);
      if (GlobalContext.clicked) {
        this.onclick(this);
      }
    }
    RenderingContext.fillStyle = this._background_color;
    RenderingContext.fill(this.path);
    RenderingContext.fillStyle = this._font_color;
    RenderingContext.fillText(this.innerText, this.x + this.width / 2, this.y + this.height / 2);
  }
};

// src/index.ts
var frame = new Frame();
frame.setCanvas = document.querySelector("canvas");
var btn = new Button();
btn._background_color = "#005FB8";
btn._font_color = "#ffffff";
btn.innerText = "Salve";
btn.x = 20;
btn.y = 20;
btn.width = 100;
btn.height = 36;
btn.rounding = [8];
btn.onclick = (self) => {
  self.innerText = self.innerText.split("").reverse().join("");
};
btn.onhover = (self) => {
  self._background_color = "#196ebf";
};
frame.add(btn);
var btnswitch = new Switch();
btnswitch.x = 200;
btnswitch.y = 20;
frame.add(btnswitch);
frame.draw();
