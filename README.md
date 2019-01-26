# KDate 
自定义日期对象。
该类主要为解决javascript中Date对象中不符合日常习惯而创建。

## 安装和使用
您可以直接下载代码，将src/kDate.js放到您的项目中，或者使用
`npm install kdate`

## 新建一个KDate对象
以下代码都是可以正常运行的
```js
new KDate(new Date());      //直接传入一个Date对象
new KDate(new Date().valueOf());//传入一个10位数的时间戳（精确到秒）
new KDate(parseInt(new Date().valueOf()/1000));//传入一个13位数的时间错（精确到毫秒）
new KDate(2019,1,1,12,0,0);     //2019年1月1日12点。原生Date对象是这样写的：new Date(2019,0,1,12,0,0)
new KDate('2019-01-02T12:00:00.3456');
new KDate('2019/01/02 12:00:00');
new KDate('2019/01/02 12:00');
new KDate('2019/01/02 12');
new KDate('2019/01/02');
new KDate('2019-01-02');
```

## 静态方法
KDate.parse()
将字符串转换为Date对象，支持形式参考new KDate中参数为string的部分

## 读取日期数据
|方法 |参数|说明|
|----|----|----|
|year||返回年份，如：2019|
|month||返回月份（1-12）|
|day||返回天（1-31）|
|weekDay||返回星期几，返回值（1-7）|
|weekDayText||返回星期一、星期二……星期天|
|hour||返回小时数|
|minute||返回分钟数|
|second||返回秒数|
|milliSeconds||返回秒数|
|timeStamp|long|返回时间戳，默认10位，long=true，则返回13位时间戳|
|dateStr||返回日期部分，格式为：yyyy-MM-dd|
|timeStr||返回时间部分，格式为：hh:mm:ss|
|shortTime||返回时间部分，不包含秒，格式为：hh:mm|
|toString|fmt|自定义格式化日期字符串，fmt默认值：yyyy-MM-dd hh:mm:ss|

## 修改日期数据
|方法 |参数|说明|
|----|----|----|
|addDays|value|增加天数|
|addMonths|value|增加月数|
|addYears|value|增加年数|
|addWeeks|value|增加周数|
|addHours|value|增加小时数|
|addMinutes|value|增加分钟数|
|addSeconds|value|增加秒数|


## 作者信息
开心就好 qq:27375 微信号：qq27375
