import PerfectScroll from "perfect-scrollbar";

export default class Scrollable {
  constructor(selector, options) {
    this.option = options || {
      suppressScrollX: true,
    };

    if (selector) {
      this.el = document.querySelectorAll(selector);
      this.ps = [];

      if (this.el.length) {
        this.el.forEach((el) => {
          this.ps.push(new PerfectScroll(el, this.option));
        });
      }
    }
  }

  update() {
    this.ps.forEach((ps) => {
      ps.update();
    });
  }
}
