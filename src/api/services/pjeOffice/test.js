const PjeClient = (function () {
    function t() {}
    t.ajax = function (t) {
        (t = t || { url: "" }),
            (t.type = (t.type && t.type.toUpperCase()) || "GET"),
            (t.headers = t.headers || {}),
            (t.timeout = parseInt(t.timeout) || 0),
            (t.success = t.success || function () {}),
            (t.error = t.error || function () {}),
            (t.async = "undefined" == typeof t.async ? !0 : t.async);
        var e = new XMLHttpRequest();
        t.timeout > 0 &&
            ((e.timeout = t.timeout),
            (e.ontimeout = function () {
                t.error("timeout", "timeout", e);
            })),
            e.open(t.type, t.url, t.async);
        for (var s in t.headers)
            t.headers.hasOwnProperty(s) && e.setRequestHeader(s, t.headers[s]);
        return (
            e.send(t.data),
            (e.onreadystatechange = function () {
                if (
                    4 == this.readyState &&
                    ((this.status >= 200 && this.status < 300) ||
                        304 == this.status)
                ) {
                    var e = this.responseText,
                        s = this.getResponseHeader("Content-Type");
                    s && s.match(/json/) && (e = JSON.parse(this.responseText)),
                        t.success(e, this.statusText, this);
                } else
                    4 == this.readyState &&
                        t.error(this.status, this.statusText, this);
            }),
            0 == t.async &&
                (4 == e.readyState &&
                ((e.status >= 200 && e.status < 300) || 304 == e.status)
                    ? t.success(e.responseText, e)
                    : 4 == e.readyState && t.error(e.status, e.statusText, e)),
            e
        );
    };
    var e = function (e, s, n, r) {
        return (
            "function" == typeof n && ((r = n), (n = void 0)),
            t.ajax({ url: s, data: n, type: e, success: r })
        );
    };
    return (
        (t.get = function (t, s, n) {
            return e("GET", t, s, n);
        }),
        (t.head = function (t, s, n) {
            return e("HEAD", t, s, n);
        }),
        (t.post = function (t, s, n) {
            return e("POST", t, s, n);
        }),
        (t.patch = function (t, s, n) {
            return e("PATCH", t, s, n);
        }),
        (t.put = function (t, s, n) {
            return e("PUT", t, s, n);
        }),
        (t["delete"] = function (t, s, n) {
            return e("DELETE", t, s, n);
        }),
        (t.options = function (t, s, n) {
            return e("OPTIONS", t, s, n);
        }),
        t
    );
})();
__ = PjeClient;
