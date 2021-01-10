module.exports = {
  createTime: function (time) {
    time = new Date(time);
    let year, month, day, hour, minute, second;
    year = time.getFullYear();
    month = time.getMonth();
    day = time.getDate();
    hour = time.getHours();
    minute = time.getMinutes();
    second = time.getSeconds();

    let date = new Date(year, month, day, hour, minute, second);
    return date;
  },
};
