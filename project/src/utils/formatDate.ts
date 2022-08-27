function formatDate(date: Date, format: string) {
  const map: any = {
    ss: date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds(),
    min: date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes(),
    hh: date.getHours() < 10 ? "0" + date.getHours() : date.getHours(),
    mm:
      date.getMonth() + 1 < 10
        ? "0" + (date.getMonth() + 1)
        : date.getMonth() + 1,
    dd: date.getDate() < 10 ? "0" + date.getDate() : date.getDate(),
    yyyy: date.getFullYear(),
  };

  return format.replace(/mm|dd|yyyy|hh|min|ss/gi, (matched) => map[matched]);
}

export default formatDate;
