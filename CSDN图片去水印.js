// ==UserScript==
// @name         CSDN图片去水印
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  CSDN图片去水印
// @author       Loli_Wolf
// @match        *://*/*
// @grant        none
// @run-at       document-start
// ==/UserScript==

(function() {
    'use strict';

    const customDomains = [
        'img-blog.csdnimg.cn',
        'img-blog.csdn.net',
    ];

    function modifyImageURLs() {
        document.querySelectorAll('img').forEach(img => {
            let src = img.src;
            if (customDomains.some(domain => src.includes(`https://${domain}/`)) && src.includes('?')) {
                img.src = src.split('?')[0];
            }
        });
    }

    document.addEventListener('DOMContentLoaded', modifyImageURLs);
})();
