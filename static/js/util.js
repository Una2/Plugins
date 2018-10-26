import $ from 'jquery'
// $(function () {
  // return {
    function  toUtf8(str) {
      if (/[\u0080-\uFFFF]/.test(str)) {
        str = unescape(encodeURIComponent(str));
      }

      return str;
    };

    /*********************************************************
     * 基础工具
     * **/
    // 数据类型
    function type(obj) {
      if (obj == null) {
        return String(obj);
      }
      // 早期的webkit内核浏览器实现了已废弃的ecma262v4标准，可以将正则字面量当作函数使用，因此typeof在判定正则时会返回function
      return typeof obj === 'object' || typeof obj === 'function' ? class2type[Object.prototype.toString.call(obj)] || 'object' : typeof obj;
    };
    // 判断是否为空，可判断空数组，空json
    function  isEmpty(v) {
      var type = type(v);
      if (type === 'undefined' || v === null) {
        return true;
      } else if (type === 'number') {
        return !v && v !== 0;
      } else if (type === 'array') {
        return v.length === 0;
      } else if (type === 'object') {
        for (var t in v) {
          return false;
        }
        return true;
      }
      return !v;

    };
    //短信验证码倒计时
    function  countdown ($element, param) {
      var second = param.second;
      console.log($element, "$element")
      var waiting = param.waiting || 's后重新获取';
      $element.text(second + waiting);
      $element.attr("disabled", "disabled");
      var countdown;
      if (second > 0) {
        countdown = setInterval(function () {
          $element.text(--second + waiting);
          if (second <= 0) {
            clearInterval(countdown);
            $element.removeAttr("disabled");
            $element.text(param.text);
          }
        }, 1000)
      } else {
        clearInterval(countdown);
        $element.removeAttr("disabled");
        $element.text(param.text);
      }
    }
  // }
// })
