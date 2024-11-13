var zmXCall = (function(window) {
    var resizeCallbacks = new Array(),
            callbacks = {},
            removeFlags = {},
            html5 = false,
            flash = true,
            scrollCallbacks = new Array(),
            scrollWnds = new Array(),
            xcallId,
            flashCallbacks = [];
    function serialize(data) {
        if (typeof JSON == 'object' && JSON.stringify)
            return JSON.stringify(data);
        if (data == undefined)
            return 'undefined';
        if (data == null)
            return 'null';
        try {
            if (typeof data == "string" || data.constructor.toString().match(/string/i) != null)
                return '"' + data.replace(/"/g, '\\"') + '"';
        } catch (e) {
        }
        var a;
        if (Object.prototype.toString.call(data).match(/array/i) != null) {
            a = new Array();
            var length = data.length;
            for (var i = 0; i < length; i++)
                a.push(serialize(data[i]));
            return "[" + a.join(",") + "]";
        }
        if (typeof data == "object") {
            a = new Array();
            for (var f in data)
                a.push('"' + f + '":' + serialize(data[f]));
            return "{" + a.join(",") + "}";
        }
        return data.toString();
    }

    if (window.postMessage) {
        html5 = true;
        var onmessage = function(e) {
            try {
                var data = eval('(' + e.data + ')');
            } catch (ex) {
                return;
            }
            if (data['xcallAction']) {
                switch (data['xcallAction']) {
                    case 'registerScrollHandler':
                        var existed = false, wnd = e.source;
                        for (var i = 0; i < scrollWnds.length; i++)
                            if (scrollWnds[i] == wnd) {
                                existed = true;
                                break;
                            }
                        if (!existed)
                            scrollWnds.push(e.source);
                        break;
                    case 'onScroll':
                        for (var i = 0; i < scrollCallbacks.length; i++)
                            scrollCallbacks[i].call(window, data['xcallParams']);
                        break;
                    default:
                        zmXCall.call(data['xcallAction'], data['xcallParams'], window, e.source);
                        break;
                }
            }
        };
        if (window.attachEvent)
            window.attachEvent('onmessage', onmessage);
        else
            window.addEventListener('message', onmessage, false);
        if (typeof zm != 'undefined') {
            zm(window).scroll(function() {
                if (scrollWnds.length == 0)
                    return;
                var msg = serialize({xcallAction: 'onScroll', xcallParams: zmXCall.getTopSelf()});
                for (var i = 0; i < scrollWnds.length; i++)
                    scrollWnds[i].postMessage(msg, '*');
            });
        }
    }
    var m = navigator.userAgent.toLowerCase().match(/(^|\s)(firefox|safari|opera|msie|chrome)[\/:\s]([\d\.]+)/) || ['', '', '0.0'],
            msie = m[2] == "msie",
            opera = m[2] == "opera";
    if (!window.postMessage || msie) {
        var flashwp = document.createElement('DIV');
        flashwp.id = 'zmxcall-flash';
        window.onload = function() {
            document.body.appendChild(flashwp);
            var flashUrl = "http://static.me.zing.vn/swf/zmxcall-1.00.swf",
                    playerId = "zmxcall-obj",
                    oAttrs = {id: playerId},
            oParams = {
                movie: flashUrl,
                allowScriptAccess: "always"
            };
            swfobject.embedSWF(flashUrl, 'zmxcall-flash', 1, 1, "9.0.0", "", {}, oParams, oAttrs);
        }
    }

    return {
        DEFAULT_PROXY_VERSION: "1.00",
        DEFAULT_HOST: "me.zing.vn",
        version: '1.14',
        window: window,
        enableFlash: function() {
            flash = true;
            for (var i = 0, fn; fn = flashCallbacks[i]; i++)
                fn();
        },
        flashReady: function(fn) {
            flashCallbacks.push(fn);
        },
        onresize: function(callback) {
            if (callback)
                resizeCallbacks.push(callback);
            else
                for (var i = 0; i < resizeCallbacks.length; i++)
                    resizeCallbacks[i]();
        },
        getXCallID: function() {
            var fo = document.getElementById("zmxcall-obj");
            if (fo) {
                return fo.getChannelID();
            }
            ;

        },
        setXCallID: function(id) {
            xcallId = id;
        },
        register: function(name, callback, remove) {
            callbacks[name] = callback;
            if (remove)
                removeFlags[name] = true;
            else if (removeFlags[name])
                delete removeFlags[name];
        },
        callByFlash: function(message) {
            try {
                var o = eval('(' + message + ')');
                if (o.name)
                    zmXCall.call(o.name, o.params, window);
            } catch (e) {
            }
        },
        call: function(name, params, wnd, source) {
            if (!callbacks[name])
                return;
            try {
                var rs = callbacks[name].call(wnd, params, source);
                if (rs)
                    this.callParent(rs.callback, rs.params, rs.options, rs.window, true);
            } catch (e) {
            }
            if (removeFlags[name]) {
                delete removeFlags[name];
                delete callbacks[name];
            }
        },
        callParent: function(funcName, params, options, wnd, postBack) {
            if (!wnd)
            {
                wnd = window;
            }
            try {
                if (html5 && (wnd.parent == window || !postBack || window.opener == wnd)) {
                    if (!postBack && window.opener != wnd) {

                        wnd = wnd.parent;
                    }
                    wnd.postMessage(serialize({xcallAction: funcName, xcallParams: params}), '*');
                    return;
                }
            } catch (e) {
                alert(e.message);
            }
            if (flash) {
                if (options && options.xcallId)
                    xcallId = options.xcallId;
                if (!xcallId) {
                    var uri = window.location.href,
                            qs = {};
                    uri.replace(
                            new RegExp("([^?=&]+)(=([^&]*))?", "g"),
                            function($0, $1, $2, $3) {
                                qs[$1] = $3;
                            }
                    );
                    xcallId = qs.zmxcid;

                }
                if (xcallId) {
                    try {

                        var fo = document.getElementById("zmxcall-obj"),
                                msg = serialize({name: funcName, params: params});
                        fo.callParentViaFlash(xcallId, msg);
                        return;
                    } catch (e) {
                    }
                }
            }
            options = options || {};
            options.host = options.host || zmXCall.DEFAULT_HOST;
            options.version = options.version || zmXCall.DEFAULT_PROXY_VERSION;
            var ifid = "xcall-if-" + Math.floor(Math.random() * 100),
                    url = "http://static.me.zing.vn/xcall.proxy-" + options.version + ".html#" + encodeURIComponent(funcName + "," + serialize(params)),
                    tried = 0;
            function doCall() {
                var e = wnd.document.createElement("IFRAME");
                e.style.visibility = "hidden";
                e.style.display = "none";
                e.width = "0";
                e.height = "0";
                e.src = url;
                e.sandbox = "allow-scripts allow-forms allow-popups allow-same-origin allow-top-navigation";
                e.id = ifid;
                try {
                    wnd.document.body.appendChild(e);
                } catch (e) {
                    tried++;
                    if (tried < 3)
                        setTimeout(doCall, 200);
                    return;
                }
                try {
                    setTimeout(function() {
                        try {
                            var e = wnd.document.getElementById(ifid);
                            wnd.document.body.removeChild(e);
                        } catch (e) {
                        }
                    }, 10000);
                } catch (e) {
                }
            }
            doCall();
        },
        resizeParent: function(params, options) {
            if (typeof params == "string" || params.constructor.toString().match(/string/i) != null) {
                params = {id: params};
            }
            if (!params.height) {
                var D = document;
                params.height = Math.max(
                        Math.max(D.body.scrollHeight, D.documentElement.scrollHeight),
                        Math.max(D.body.offsetHeight, D.documentElement.offsetHeight),
                        Math.max(D.body.clientHeight, D.documentElement.clientHeight)
                        );
            }
            this.callParent('resize', params, options);
        },
        setHashParent: function(hash, options) {
            this.callParent('setHash', hash, options);
        },
        getTop: function(callback, options) {
            var cbname = 'getTop' + Math.floor(Math.random() * 100);
            this.register(cbname, callback, true);
            var params = {host: window.location.host, cb: cbname};
            this.callParent('getTop', params, options);
        },
        getTopSelf: function() {
            var top, height, wnd = zmXCall.window,
                    B = wnd.document.body,
                    D = wnd.document.documentElement;
            if (typeof wnd.pageYOffset != 'undefined') {
                top = wnd.pageYOffset;
            }
            else {
                top = ((D && D.scrollTop) ? D : B).scrollTop;
            }
            if (typeof wnd.innerHeight != 'undefined') {
                height = wnd.innerHeight;
            }
            else {
                height = ((D && D.clientHeight) ? D : B).clientHeight;
            }
            return {top: top, height: height, docHeight: Math.max(0, document.body.offsetHeight)};
        },
        getViewport: function(callback, options) {
            var cbname = 'getViewport' + Math.floor(Math.random() * 100);
            this.register(cbname, callback, true);
            var params = {host: window.location.host, cb: cbname};
            this.callParent('getViewport', params, options);
        },
        getViewportSelf: function() {
            var result = {}, wnd = zmXCall.window,
                    docElem = wnd.document.documentElement, body = wnd.document.body;
            if (window.innerWidth) {
                result.width = window.innerWidth;
                result.height = window.innerHeight;
            } else {
                if (docElem && docElem.offsetWidth) {
                    result.width = docElem.offsetWidth;
                    result.height = docElem.offsetHeight;
                } else {
                    result.width = body.offsetWidth;
                    result.height = body.offsetHeight;
                }
            }
            if (typeof window.pageYOffset == 'number') {
                result.offsetY = window.pageYOffset;
                result.offsetX = window.pageXOffset;
            } else if (docElem && (docElem.scrollLeft || docElem.scrollTop)) {
                result.offsetY = docElem.scrollTop;
                result.offsetX = docElem.scrollLeft;
            } else if (body && (typeof body.scrollLeft == 'number')) {
                result.offsetY = body.scrollTop;
                result.offsetX = body.scrollLeft;
            }
            return result;
        },
        addScrollHook: function(cb) {
            if (!html5)
                return;
            scrollCallbacks.push(cb);
            window.parent.postMessage('{xcallAction:"registerScrollHandler"}', '*');
        },
        openFullFrame: function(params, options) {
            this.callParent('openFullFrame', params, options);
        },
        closeFullFrame: function(params, options) {
            this.callParent('closeFullFrame', params, options);
        },
        openBoxy: function(title, url, width, height, options, proxyOptions) {
            this.callParent('openBoxy', zm.extend({title: title, url: url, width: width, height: height}, options), proxyOptions);
        },
        closeBoxy: function(options) {
            this.callParent('closeBoxy', null, options);
        }
    };
})(window);
zmXCall.register('resize', function(data) {
    if (!data.height)
        return;
    var z = zm(data.id ? '#' + data.id : document);
    z.css('height', data.height + 'px');
    zmXCall.onresize();
});
zmXCall.register('getTop', function(data, source) {
    var rs = zmXCall.getTopSelf(), options = {host: data.host};
    options.version = data.version || zmXCall.DEFAULT_PROXY_VERSION;
    return {callback: data.cb, params: rs, options: options, window: source || this};
});
zmXCall.register('setHash', function(data) {
    window.location.hash = data;
});
zmXCall.register('getViewport', function(data, source) {
    var options = {host: data.host, version: data.version || zmXCall.DEFAULT_PROXY_VERSION};
    return {callback: data.cb, params: zmXCall.getViewportSelf(), options: options, window: source || this};
});

zmXCall.register('openFullFrame', function(data) {
    var HEADER_SIZE = data['headerSize'] ? data['headerSize'] : 33,
            header = zm('#header'),
            z = zm('#fullsized-frame'),
            vp = zm.getViewport(),
            styleEl,
            sbWidth = vp.width - zm(document.body).width(),
            updateSizing = function() {
                if (zm.browser.msie && zm.browser.version < '7') {
                    vp = zm.getViewport();
                    z = zm('#fullsized-frame');
                    z.css('height', (vp.height - HEADER_SIZE) + 'px');
                    var h = zm(z.children()[1]).height();
                    if (h + 2 < vp.height - HEADER_SIZE)
                        h = vp.height - HEADER_SIZE;
                    else
                        h += 2;
                    zm(z.children()[0]).css('height', h + 'px');
                    zm('#fullsized-closebtn').css('left', (vp.width - 32) + 'px');
                }
            },
            pressKey = function(e) {
                if (e.keyCode == 27)
                    zm('#fullsized-closebtn').click();
            };
    if (header.css('position') == 'fixed')
        HEADER_SIZE = header.outerHeight();
    else if (header.size() > 0)
        HEADER_SIZE = 0;
    if (zm.browser.msie && zm.browser.version < '8') {
        sbWidth = 0;
        styleEl = document.createElement('STYLE');
        styleEl.setAttribute("type", "text/css");
        styleEl.styleSheet.cssText = 'html {overflow: hidden} #fullsized-frame{overflow-y: auto !important}';
        document.getElementsByTagName('head')[0].appendChild(styleEl);
    } else {
        zm(document.body).css({'margin-right': sbWidth + 'px', overflow: 'hidden'});
    }
    if (z.size() == 0) {
        var h = parseInt(data['height'] ? data['height'] : 500),
                w = data['width'] ? data['width'] : 980,
                e = zm.createElement('DIV', {id: 'fullsized-frame'}, {left: '0', width: '100%'}),
                ec = zm.createElement('DIV', {}, {position: 'relative', border: '1px #000 solid', width: w + 'px', height: h + 'px', margin: 'auto'}),
                f = zm.createElement('IFRAME', {sandbox: 'allow-scripts allow-forms allow-popups allow-same-origin allow-top-navigation',src: data['url'], border: 0}, {border: '0px none', height: h + 'px', width: w + 'px'}),
                closebtn = zm.createElement('DIV', {id: 'fullsized-closebtn', title: 'Đóng'}, {cursor: 'pointer', top: '7px', left: (vp.width - 42) + 'px', width: '20px', height: '20px', position: 'fixed', zIndex: 899, background: 'transparent url(https://stc.ugc.zdn.vn/photo_v4/zme/images/imgsprtpho_1.06.gif) 0 -149px no-repeat'});
        if (data['onload'])
            f.onload = data['onload'];
        ec.appendChild(f);
        e.appendChild(ec);
        if (zm.browser.msie && zm.browser.version < '7') {
            zm(e).css({height: (vp.height - HEADER_SIZE) + 'px', position: 'absolute', top: (vp.offsetY + HEADER_SIZE) + 'px', width: '100%'});
        }
        else {
            zm(e).css({position: 'fixed', top: HEADER_SIZE + 'px', bottom: 0});
        }
        var ctncss = {'z-index': 700, 'background-color': '#fff'};
        if (HEADER_SIZE == 0)
            ctncss.top = '33px';
        zm(ec).css(ctncss);
        document.body.appendChild(e);
        z = zm(e);
        z.css({'z-index': 699, 'overflow-x': 'hidden', 'overflow-y': 'auto'});
        if (zm.browser.msie && zm.browser.version < '9')
            z.css('filter', 'progid:DXImageTransform.Microsoft.gradient(startColorstr=#B2000000, endColorstr=#B2000000)');
        else
            z.css('background-color', 'rgba(0, 0, 0, 0.7)');
        z.click(function() {
            if (this.id == 'fullsized-frame')
                zm('#fullsized-closebtn').attr('data-from', 'background').click();
        });
        zm(window).bind('resize', updateSizing);
        document.body.appendChild(closebtn);
        zm(document).keydown(pressKey);
        zm(closebtn).click(function() {
            var btn = zm('#fullsized-closebtn'),
                    hidetype = btn.attr('data-from') || 'button';
            try {
                if (eval(data.beforeHide + '("' + hidetype + '");') === false)
                    return;
            } catch (ex) {
            }
            zm(window).unbind('resize', updateSizing);
            zm(document).unbind('keydown', pressKey);
            btn.remove();
            zm('#fullsized-frame').remove();
            zm(document.body).css({'margin-right': 'auto', overflow: 'auto'});
            if (zm.browser.msie && zm.browser.version < '8') {
                zm(styleEl).remove();
            }
            typeof zmChat != 'undefined' && zmChat.displayTicker('revert');
            try {
                eval(data.onclose + '();');
            } catch (ex) {
            }
        });
        typeof zmChat != 'undefined' && zmChat.displayTicker(false);
    } else
        zm('#fullsized-frame iframe').bind('load', data.onload);
    z.show();
});
zmXCall.register('resizeFullFrame', function(data) {
    for (var k in data) {
        if (k != 'width' && k != 'height')
            delete data[k];
        else
            data[k] += 'px';
    }
    if (zm.objectLength(data) == 0)
        return;
    zm('#fullsized-frame').children().css(data);
    zm('#fullsized-frame iframe').css(data);
});
zmXCall.register('closeFullFrame', function() {
    zm('#fullsized-closebtn').attr('data-from', 'call').click();
});
zmXCall.register('openBoxy', function(data) {
    if (!zmXCall.boxy) {
        zmXCall.boxy = new zm.Boxy({
            title: '',
            content: '<iframe id="xcallBoxyFrame" frameborder="0" sandbox = "allow-scripts allow-forms allow-popups allow-same-origin allow-top-navigation"></iframe>',
            footer: false
        });
    }
    data.footer = !!data.okButton;
    zmXCall.boxy.changeSettings(data);
    var iframe = zm('#xcallBoxyFrame');
    data.url && iframe.attr('src', data.url);
    if (!iframe.attr('src'))
        return;
    data.width && iframe.css('width', data.width + 'px');
    data.height && iframe.css('height', data.height + 'px');
    if (!zmXCall.boxy.isShowing())
        zmXCall.boxy.show();
    else
        zmXCall.boxy.center();
});
zmXCall.register('closeBoxy', function() {
    zmXCall.boxy && zmXCall.boxy.hide();
});
