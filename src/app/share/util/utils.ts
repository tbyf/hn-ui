import { Injectable } from '@angular/core';

/**
 * 工具
 */
export class Utils {
  constructor() {}

  /**
   * 是否为空
   * @param value 值
   */
  static isEmpty(value: any): boolean {
    return value == null || (typeof value === 'string' && value.length === 0);
  }

  /**
   * 是否不为空
   * @param value 值
   */
  static isNotEmpty(value: any): boolean {
    return !Utils.isEmpty(value);
  }

  /**
   * 是否数组
   * @param vaue 值
   */
  static isArray(value: any): boolean {
    return Array.isArray(value);
  }

  /**
   * 是否对象
   * @param vaue 值
   */
  static isObject(value: any): boolean {
    return typeof value === 'object' && !Utils.isArray(value);
  }

  /**
   * url中如果有双斜杠替换为单斜杠
   * @param url
   * @returns {string}
   */
  static replaceUrl(url) {
    if (-1 != url.indexOf('http://')) {
      return 'http://' + url.substring(7).replace(/\/\//g, '/');
    } else if (-1 != url.indexOf('https://')) {
      return 'https://' + url.substring(8).replace(/\/\//g, '/');
    } else {
      return url;
    }
  }

  /**
   * 日期对象转为日期字符串
   * @param date 需要格式化的日期对象
   * @param sFormat 输出格式,默认为yyyy-MM-dd                         年：y，月：M，日：d，时：h，分：m，秒：s
   * @example  dateFormat(new Date())                                "2017-02-28"
   * @example  dateFormat(new Date(),'yyyy-MM-dd')                   "2017-02-28"
   * @example  dateFormat(new Date(),'yyyy-MM-dd hh:mm:ss')         "2017-02-28 09:24:00"
   * @example  dateFormat(new Date(),'hh:mm')                       "09:24"
   * @example  dateFormat(new Date(),'yyyy-MM-ddThh:mm:ss+08:00')   "2017-02-28T09:24:00+08:00"
   * @returns {string}
   */
  static dateFormat(date: Date, sFormat: String = 'yyyy-MM-dd'): string {
    const time = {
      Year: 0,
      TYear: '0',
      Month: 0,
      TMonth: '0',
      Day: 0,
      TDay: '0',
      Hour: 0,
      THour: '0',
      hour: 0,
      Thour: '0',
      Minute: 0,
      TMinute: '0',
      Second: 0,
      TSecond: '0',
      Millisecond: 0
    };
    time.Year = date.getFullYear();
    time.TYear = String(time.Year).substr(2);
    time.Month = date.getMonth() + 1;
    time.TMonth = time.Month < 10 ? '0' + time.Month : String(time.Month);
    time.Day = date.getDate();
    time.TDay = time.Day < 10 ? '0' + time.Day : String(time.Day);
    time.Hour = date.getHours();
    time.THour = time.Hour < 10 ? '0' + time.Hour : String(time.Hour);
    time.hour = time.Hour < 13 ? time.Hour : time.Hour - 12;
    time.Thour = time.hour < 10 ? '0' + time.hour : String(time.hour);
    time.Minute = date.getMinutes();
    time.TMinute = time.Minute < 10 ? '0' + time.Minute : String(time.Minute);
    time.Second = date.getSeconds();
    time.TSecond = time.Second < 10 ? '0' + time.Second : String(time.Second);
    time.Millisecond = date.getMilliseconds();

    return sFormat
      .replace(/yyyy/gi, String(time.Year))
      .replace(/yyy/gi, String(time.Year))
      .replace(/yy/gi, time.TYear)
      .replace(/y/gi, time.TYear)
      .replace(/MM/g, time.TMonth)
      .replace(/M/g, String(time.Month))
      .replace(/dd/gi, time.TDay)
      .replace(/d/gi, String(time.Day))
      .replace(/HH/g, time.THour)
      .replace(/H/g, String(time.Hour))
      .replace(/hh/g, time.Thour)
      .replace(/h/g, String(time.hour))
      .replace(/mm/g, time.TMinute)
      .replace(/m/g, String(time.Minute))
      .replace(/ss/gi, time.TSecond)
      .replace(/s/gi, String(time.Second))
      .replace(/fff/gi, String(time.Millisecond));
  }

  /**
   *  UUID生成
   *  @returns {string}
   */
  static UUID(): string {
    return 'xxxxxxxx-xxxx-6xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
      const r = (Math.random() * 16) | 0,
        v = c == 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }

  /**
   *  短UUID生成
   *  @returns {string}
   */
  static shortUUID(): string {
    return 'xx-6xy'.replace(/[xy]/g, c => {
      const r = (Math.random() * 16) | 0,
        v = c == 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(6);
    });
  }

  /**
   * 获得绝对位置
   * @param element
   * @param target
   */
  static absolutePosition(element: any, target: any): void {
    const elementDimensions = element.offsetParent
      ? { width: element.offsetWidth, height: element.offsetHeight }
      : this.getHiddenElementDimensions(element);
    const elementOuterHeight = elementDimensions.height;
    const elementOuterWidth = elementDimensions.width;
    const targetOuterHeight = target.offsetHeight;
    const targetOuterWidth = target.offsetWidth;
    const targetOffset = target.getBoundingClientRect();
    const windowScrollTop = this.getWindowScrollTop();
    const windowScrollLeft = this.getWindowScrollLeft();
    const viewport = this.getViewport();
    let top, left;

    if (targetOffset.top + targetOuterHeight + elementOuterHeight > viewport.height) {
      top = targetOffset.top + windowScrollTop - elementOuterHeight;
      if (top < 0) {
        top = 0 + windowScrollTop;
      }
    } else {
      top = targetOuterHeight + targetOffset.top + windowScrollTop;
    }

    if (targetOffset.left + targetOuterWidth + elementOuterWidth > viewport.width) {
      left = targetOffset.left + windowScrollLeft + targetOuterWidth - elementOuterWidth;
    } else {
      left = targetOffset.left + windowScrollLeft;
    }

    element.style.top = top + 'px';
    element.style.left = left + 'px';
  }

  /**
   * 获得尺寸
   * @param element
   */
  static getHiddenElementDimensions(element: any): any {
    const dimensions: any = {};
    element.style.visibility = 'hidden';
    element.style.display = 'block';
    dimensions.width = element.offsetWidth;
    dimensions.height = element.offsetHeight;
    element.style.display = 'none';
    element.style.visibility = 'visible';

    return dimensions;
  }

  /**
   * 获得视图大小
   */
  static getViewport(): any {
    const win = window,
      d = document,
      e = d.documentElement,
      g = d.getElementsByTagName('body')[0],
      w = win.innerWidth || e.clientWidth || g.clientWidth,
      h = win.innerHeight || e.clientHeight || g.clientHeight;

    return { width: w, height: h };
  }

  /**
   * 获得窗口滚动高度
   */
  static getWindowScrollTop(): number {
    const doc = document.documentElement;
    return (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);
  }

  /**
   * 获得窗口滚动宽度
   */
  static getWindowScrollLeft(): number {
    const doc = document.documentElement;
    return (window.pageXOffset || doc.scrollLeft) - (doc.clientLeft || 0);
  }

  /**
   * 获得实际位置
   * @param element
   * @param target
   */
  static relativePosition(element: any, target: any): void {
    const elementDimensions = element.offsetParent
      ? { width: element.offsetWidth, height: element.offsetHeight }
      : this.getHiddenElementDimensions(element);
    const targetHeight = target.offsetHeight;
    const targetWidth = target.offsetWidth;
    const targetOffset = target.getBoundingClientRect();
    const windowScrollTop = this.getWindowScrollTop();
    const viewport = this.getViewport();
    let top, left;

    if (targetOffset.top + targetHeight + elementDimensions.height > viewport.height) {
      top = -1 * elementDimensions.height;
      if (targetOffset.top + top < 0) {
        top = 0;
      }
    } else {
      top = targetHeight;
    }

    if (targetOffset.left + elementDimensions.width > viewport.width) {
      left = targetWidth - elementDimensions.width;
    } else {
      left = 0;
    }

    element.style.top = top + 'px';
    element.style.left = left + 'px';
  }

  /**
   * 是否成功
   * @param val
   */
  static resultSuccess(val: string): boolean {
    return val === 'success';
  }

  /**
   * 是否失败
   * @param val
   */
  static resultFailure(val: string): boolean {
    return val === 'failure';
  }

  /**
   * 是否错误
   * @param val
   */
  static resultError(val: string): boolean {
    return val === 'error';
  }

  /**
   * 是否为空
   * @param value 值
   */
  static notEmpty(value: any): boolean {
    return value !== null && value !== '' && value !== undefined;
  }

  /**
   * 过滤空对象
   * @param data 数据
   */
  static filterEmptyObj(data: any) {
    const params: any = {};
    for (const key in data) {
      if (this.notEmpty(data[key])) {
        params[key] = data[key];
      }
    }
    return params;
  }

  /**
   * 过滤时间数组
   * @param data 数据
   */
  static filterDateArr(data: any) {
    return data.map((item: any, i: any) => {
      let time: any;
      if (i === 0) {
        time = Number(new Date(this.dateFormat(item, 'yyyy-MM-dd 00:00:00')));
      } else {
        time = Number(new Date(this.dateFormat(item, 'yyyy-MM-dd 23:59:59')));
      }
      return time;
    });
  }

  /**
   * 获取滚动位置
   */
  static scollPostion() {
    let top: any, left: any, width: any, height: any;
    if (document.documentElement && document.documentElement.scrollTop) {
      top = document.documentElement.scrollTop;
      left = document.documentElement.scrollLeft;
      width = document.documentElement.scrollWidth;
      height = document.documentElement.scrollHeight;
    } else if (document.body) {
      top = document.body.scrollTop;
      left = document.body.scrollLeft;
      width = document.body.scrollWidth;
      height = document.body.scrollHeight;
    }
    return {
      top,
      left,
      width,
      height
    };
  }
}
