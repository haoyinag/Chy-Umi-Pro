/** 年龄正则表达式 */
export const agePattern = /^([1-9]|[0-9]{2}|100)$/;

/** 手机正则表达式 */
export const mobilePattern = /^1[123456789]\d{9}$/;

/** 非特殊字符正则表达式 */
export const specialTextPattern = /^[\u4E00-\u9FA5A-Za-z0-9]+$/;

// 判断是否含有emoji表情
export const iconRule2 = /[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF][\u200D|\uFE0F]|[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF]|[0-9|*|#]\uFE0F\u20E3|[0-9|#]\u20E3|[\u203C-\u3299]\uFE0F\u200D|[\u203C-\u3299]\uFE0F|[\u2122-\u2B55]|\u303D|[\A9|\AE]\u3030|\uA9|\uAE|\u3030/gi;

/** 数字+英文 */
export const numEnTextPattern = /^[0-9a-zA-Z]+$/;

/** 数字+小数点 */
export const numPotTextPattern = /^(\d|\.)+(\.\d+)?$/;

/** 数字 */
export const numPattern = /^\d{1,}$/;

/** 英文 */
export const numEnPattern = /^[a-zA-Z]+$/;
