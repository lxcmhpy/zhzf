const btoa = (window && window.btoa) || window.encodeURIComponent;
const caches = [];
export function loadScript(src, opts, cb) {
  var head = document.head || document.getElementsByTagName("head")[0];
  var key = btoa(src);
  var i = caches.indexOf(key);
  var script = document.createElement("script");
  if (typeof opts === "function") {
    cb = opts;
    opts = {};
  }
  opts = opts || {};
  cb = cb || function() {};
  if (~i) {
    i = null;
    head = null;
    i = null;
    script = null;
    return;
  } else {
    script.setAttribute("id", key);
  }
  script.type = opts.type || "text/javascript";
  script.charset = opts.charset || "utf8";
  script.async = "async" in opts ? !!opts.async : true;
  script.src = src;

  if (opts.attrs) {
    setAttributes(script, opts.attrs);
  }

  if (opts.text) {
    script.text = "" + opts.text;
  }

  var onend = "onload" in script ? stdOnEnd : ieOnEnd;
  onend(script, cb);

  // some good legacy browsers (firefox) fail the 'in' detection above
  // so as a fallback we always set onload
  // old IE will ignore this and new IE will set onload
  if (!script.onload) {
    stdOnEnd(script, cb);
  }

  head.appendChild(script);
}

function setAttributes(script, attrs) {
  for (var attr in attrs) {
    script.setAttribute(attr, attrs[attr]);
  }
}

function stdOnEnd(script, cb) {
  script.onload = function() {
    this.onerror = this.onload = null;
    cb(null);
  };
  script.onerror = function() {
    // this.onload = null here is necessary
    // because even IE9 works not like others
    this.onerror = this.onload = null;
    cb(new Error("Failed to load " + this.src));
  };
}

function ieOnEnd(script, cb) {
  script.onreadystatechange = function() {
    if (this.readyState != "complete" && this.readyState != "loaded") return;
    this.onreadystatechange = null;
    cb(null, script); // there is no way to catch loading errors in IE8
  };
}

function _load(src, opts) {
  let key = btoa(src);
  let i = caches.indexOf(key);
  if (~i) {
    return caches[i + 1];
  } else {
    let script = new Promise((resolve, reject) => {
      loadScript(src, undefined, function(error) {
        if (error) {
          reject(error);
        } else {
          resolve(true);
        }
      });
    });
    caches.push(key);
    caches.push(script);
    return script;
  }
}

export default function(src, opts) {
  if (Array.isArray(src)) {
    return Promise.all(
      src.map(url => {
        return _load(url, opts);
      })
    );
  } else {
    return _load(src, opts);
  }
}