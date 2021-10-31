const DEFAULT_TIMEOUT = 7500;

export default class Alert {
  static SUCCESS = "success";
  static INFO = "info";
  static DANGER = "danger";
  static WARNING = "warning";

  constructor(props = {}) {
    this.key = `alert_${Date.now()}`;
    this.type = props.type;
    this.message = props.message;
    this.header = props.header;
    this.footer = props.footer;
    this.visible = true;
    this.timeout = props.timeout || DEFAULT_TIMEOUT;
    return this;
  }

  display() {
    if (this.timeout > 0) {
      setTimeout(() => {
        this.setVisibility(false);
      }, this.timeout);
    }
  }

  setType(type) {
    this.type = type;
    return this;
  }

  setMessage(message) {
    this.message = message;
    return this;
  }

  setHeader(header) {
    this.header = header;
    return this;
  }

  setFooter(footer) {
    this.footer = footer;
    return this;
  }

  setVisibility(vis) {
    this.visible = vis;
    return this;
  }

  setTimeout(timeout) {
    this.timeout = timeout;
    return this;
  }
}

export class ApiErrorAlert extends Alert {
  constructor(error = {}) {
    let message = error.response.data.detail;

    if (!message && typeof error.response.data === "object") {
      Object.entries(error.response.data).forEach(([key, value]) => {
        if (`${key}` === "non_field_errors") {
          message = `${value}`;
        } else {
          message = `${key} : ${value}`;
        }
      });
    }

    super({
      type: Alert.DANGER,
      message,
      header: `Error ${error.response.status}`,
      footer: error.response.config.url,
    });
  }
}

export { Alert };
