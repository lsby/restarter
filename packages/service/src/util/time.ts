import moment from "moment-timezone"

moment.locale("zh-cn")
moment.tz.setDefault("Asia/Shanghai")

const value: unique symbol = Symbol("value")

/**
 * 时间
 */
export type Time = {
  [value]: moment.Moment
}

/**
 * 创建时间
 */
export function makeTime(a?: moment.MomentInput): Time {
  const _data = moment(a)
  if (isNaN(_data.unix())) throw new Error("输入时间无法解析: " + a)
  return {
    [value]: _data,
  }
}

/**
 * 获得10位时间戳
 */
export function getUnixTime10(a: Time): number {
  return a[value].unix()
}
/**
 * 获得13位时间戳
 */
export function getUnixTime13(a: Time): number {
  return a[value].unix() * 1000
}

/**
 * 增加一天
 */
export function addDay(a: Time): Time {
  return {
    [value]: a[value].clone().add(1, "d"),
  }
}
/**
 * 减少一天
 */
export function subDay(a: Time): Time {
  return {
    [value]: a[value].clone().subtract(1, "d"),
  }
}

/**
 * 天的头
 */
export function dayStart(a: Time): Time {
  return {
    [value]: a[value].clone().startOf("day"),
  }
}
/**
 * 天的尾
 */
export function dayEnd(a: Time): Time {
  return {
    [value]: a[value].clone().endOf("day"),
  }
}

/**
 * 时间大于
 */
export function unixTimeGT(a: Time, b: Time): boolean {
  return a[value].unix() > b[value].unix()
}

/**
 * 格式化
 */
export function format(a: Time, 形式: string): string {
  return a[value].format(形式)
}
/**
 * 格式化到秒
 */
export function formatYMDHMS(a: Time): string {
  return a[value].format("YYYY-MM-DD HH:mm:ss")
}
/**
 * 格式化到日
 */
export function formatYMD(a: Time): string {
  return a[value].format("YYYY-MM-DD")
}

/**
 * 转换到Date
 */
export function toDate(a: Time): Date {
  return a[value].toDate()
}
