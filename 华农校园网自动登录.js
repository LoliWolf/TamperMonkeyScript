// ==UserScript==
// @name         华农校园网自动登录脚本
// @namespace    hzau-auto-login
// @version      1.0
// @description  发送一个HTTP请求，并带有表单数据，然后关闭当前的标签页
// @author       Loli_Wolf
// @match        *://211.69.143.97/srun_portal_pc.php*
// @match        *://211.69.143.98/srun_portal_pc.php*
// @match        *://www.msftconnecttest.com/redirect
// @grant        GM_xmlhttpRequest
// ==/UserScript==

(function() {
    'use strict';
    var url = "http://211.69.143.97/include/auth_action.php";
    var maxRetry = 5;
    var retryCount = 0;

    var formData = new FormData();
    formData.append('username', '');
    formData.append('password', '');
    formData.append('action', 'login');
    formData.append('ac_id', '5');
    formData.append('ajax', '1');
    formData.append('save_me', '0');

    function sendRequest() {
        GM_xmlhttpRequest({
            method: "POST",
            url: url,
            data: formData,
            onload: function(response) {
                console.log(response.responseText);
                if (response.responseText.indexOf('login_ok') === -1) {
                    retryLogin();
                } else {
                    window.close(); // 成功时关闭标签页
                }
            },
            onerror: function(error) {
                console.error(error);
                retryLogin();
            }
        });
    }

    function retryLogin() {
        if (retryCount < maxRetry) {
            retryCount++;
            setTimeout(sendRequest, 2000); // 2秒后重试
        } else {
            console.log('登录尝试失败，请手动操作。');
        }
    }

    sendRequest();
})();
