import vue from 'vue';
import router from 'vue-router';
// 公共ip
export const baseIP = '/api';

// 根据不同情况获取请求头
function getHeaders(obj) {
  if (obj.flag == "getNoT") {
    return {
      channel: "16",
      channel_no: "31",
    };
  } else if (obj.flag == "postNoT") {
    return {
      channel: "16",
      channel_no: "31",
      "content-type": "application/json;charset=UTF-8"
    };
  } else if (obj.flag == "postWithT") {
    return {
      channel: "16",
      channel_no: "31",
      Authorization: "Bearer " + obj.token,
      access_token: obj.token,
      "content-type": "application/json;charset=UTF-8"
    };
  } else if (obj.flag == "getWithT") {
    return {
      channel: "16",
      channel_no: "31",
      Authorization: "Bearer " + obj.token,
      access_token: obj.token
    };
  }
}

/**
 * ajax 请求
 * @param {*} url 请求地址，除公共部分
 * @param {*} type 请求方式
 * @param {*} obj 对象，包括请求 headers 的种类和 token 的值
 * @param {*} params 参数，数据类型为对象
 * @param {*} succ 成功回调
 * @param {*} err  失败回调
 */
export function require(url, type, obj, params, succ, err) {
  const headers = getHeaders(obj);
  $.ajax({
    url: baseIP + url,
    type: type,
    headers: headers,
    dataType: 'json',
    data: params,
    success: function (res) {
      succ(res);
    },
    error: function (err) {
      err(err);
    }
  });
}

/**
 * axios 的 get 请求
 * @param {*} url 请求地址，除公共部分
 * @param {*} obj 对象，包括请求 headers 的种类和 token 的值
 * @param {*} params 参数，数据类型为对象
 * @param {*} succ 成功回调
 * @param {*} err  失败回调
 */
export function require_get(url, obj, params, succ, err) {
  const headers = getHeaders(obj);
  vue.prototype.$axios
    .get(baseIP + url, {
      headers: headers,
      params: params
    })
    .then((res) => {
      succ(res.data);
    });
}

/**
 * axios 的 post 请求
 * @param {*} url 请求地址，除公共部分
 * @param {*} obj 对象，包括请求 headers 的种类和 token 的值
 * @param {*} params 参数，数据类型为对象
 * @param {*} succ 成功回调
 * @param {*} err  失败回调
 */
export function require_post(url, obj, params, succ, err) {
  const headers = getHeaders(obj);
  vue.prototype.$axios
    .post(baseIP + url, params, {
      headers: headers
    })
    .then((res) => {
      succ(res.data);
    });
}

/**
 * axios 的 put 请求
 * @param {*} url 请求地址，除公共部分
 * @param {*} obj 对象，包括请求 headers 的种类和 token 的值
 * @param {*} params 参数，数据类型为对象
 * @param {*} succ 成功回调
 * @param {*} err  失败回调
 */
export function require_put(url, obj, params, succ, err) {
  const headers = getHeaders(obj);
  vue.prototype.$axios
    .put(baseIP + url, params, {
      headers: headers
    })
    .then((res) => {
      succ(res.data);
    });
}

// export function isWeChat() {
// 	var ua = navigator.userAgent.toLowerCase();
//   var isWinxin = ua.indexOf('micromessenger') != -1;
// 	router.beforeEach((to, from, next) => {
// 		if (to.path === '/start') {
// 			next();
// 		} else {
// 			if (!isWinxin) {
// 				next({ path: '/start' });
// 			} else {
//         next();
//       }
// 		}
// 	});
// }
