// Generated by CoffeeScript 1.10.0
(function() {
  window.maju = function() {};

}).call(this);
// Generated by CoffeeScript 1.10.0
(function() {
  window.maju.prototype.ajax = function(opts) {
    var formatParams, getTimestamp, header, params, xhr;
    opts = opts || {};
    opts.method = opts.method.toUpperCase() || 'GET';
    opts.cb = opts.cb || function() {};
    opts.params = opts.params || {};
    getTimestamp = function() {
      return Math.floor(Date.now() / 1000);
    };
    formatParams = function(params) {
      var arr, key;
      arr = [];
      for (key in params) {
        arr.push(encodeURIComponent(key) + '=' + encodeURIComponent(params[key]));
      }
      return arr;
    };
    params = formatParams(opts.params);
    xhr = new XMLHttpRequest();
    if (opts.method === 'GET' && params.length) {
      opts.url = opts.url + '?' + params.join('&');
    }
    if (opts.method === 'GET' && opts.cache === false) {
      if (opts.url.indexOf('?') === -1) {
        opts.url = opts.url + '?_nocache=' + getTimestamp();
      } else {
        opts.url = opts.url + '&_nocache=' + getTimestamp();
      }
    }
    xhr.open(opts.method, opts.url);
    if (opts.headers) {
      for (header in opts.headers) {
        xhr.setRequestHeader(header.key, header.value);
      }
    }
    if (opts.method === 'GET') {
      xhr.send(null);
    } else {
      if (params.length) {
        xhr.send('?' + params.join('&'));
      } else {
        xhr.send(null);
      }
    }
    xhr.onreadystatechange = function() {
      var DONE, OK, err;
      DONE = 4;
      OK = 200;
      err = false;
      if (xhr.readyState === DONE) {
        if (xhr.status !== OK) {
          err = xhr.status;
        }
        opts.cb(err, xhr.responseText);
      }
    };
  };

}).call(this);
// Generated by CoffeeScript 1.10.0
(function() {
  window.maju.prototype.append = function(el, appendEl) {
    el.appendChild(appendEl);
    return el;
  };

}).call(this);
// Generated by CoffeeScript 1.10.0
(function() {
  window.maju.prototype.attr = function(el, key, value) {
    var returnvalue;
    returnvalue = el;
    if (value) {
      el.setAttribute(key, value);
    } else {
      returnvalue = el.getAttribute(key);
    }
    return returnvalue;
  };

}).call(this);
// Generated by CoffeeScript 1.10.0
(function() {
  window.maju.prototype.create = function(name) {
    var el;
    el = document.createElement(name);
    return window.maju.find(el).get(0);
  };

}).call(this);
// Generated by CoffeeScript 1.10.0
(function() {
  window.maju.prototype.domready = function(cb) {
    if (document.readyState === 'complete') {
      return window.setTimeout(cb, 1);
    } else {
      document.addEventListener('DOMContentLoaded', function() {
        cb();
      });
    }
  };

}).call(this);
// Generated by CoffeeScript 1.10.0
(function() {
  window.maju.prototype.find = function(sel, ref) {
    var el, el_arr, els, i, len;
    el_arr = [];
    if (sel) {
      if (typeof sel !== 'object') {
        if (ref) {
          els = ref.querySelectorAll(sel);
        } else {
          els = document.querySelectorAll(sel);
        }
      } else {
        if (sel.length) {
          els = sel;
        } else {
          els = [sel];
        }
      }
      for (i = 0, len = els.length; i < len; i++) {
        el = els[i];
        el.find = function(sel) {
          return window.maju.find(sel, this);
        };
        el.on = function(eventName, cb) {
          return window.maju.on(this, eventName, cb);
        };
        el.attr = function(key, value) {
          return window.maju.attr(this, key, value);
        };
        el.html = function(value) {
          return window.maju.html(this, value);
        };
        el.prepend = function(prependEl) {
          return window.maju.prepend(this, prependEl);
        };
        el.append = function(appendEl) {
          console.log(this);
          return window.maju.append(this, appendEl);
        };
        el_arr.push(el);
      }
      el_arr.get = function(index) {
        return this[index];
      };
    }
    return el_arr;
  };

}).call(this);
// Generated by CoffeeScript 1.10.0
(function() {
  window.maju.prototype.html = function(el, value) {
    var returnvalue;
    returnvalue = el;
    if (value) {
      el.innerHTML = value;
    } else {
      return el.innerHTML;
    }
    return returnvalue;
  };

}).call(this);
// Generated by CoffeeScript 1.10.0
(function() {
  var LocalStorage;

  LocalStorage = function() {
    var ApplyBackup, GetBackup, localStorage;
    localStorage = window.localStorage;
    ApplyBackup = function(backup, fClear, fOverwriteExisting) {
      var i, key, len, value;
      fClear = fClear || false;
      fOverwriteExisting = fOverwriteExisting || false;
      if (fClear === true) {
        localStorage.clear();
      }
      for (value = i = 0, len = backup.length; i < len; value = ++i) {
        key = backup[value];
        if (fOverwriteExisting === false && backup[key] !== void 0) {
          continue;
        }
        localStorage.setItem(key, value);
      }
    };
    GetBackup = function() {
      var backup, key, value;
      backup = {};
      for (key in localStorage) {
        value = localStorage[key];
        backup[key] = value;
      }
      return backup;
    };
    this.GetRemainingSpace = function(cb) {
      var data, e, error, increase, itemBackup, totalData, trytotalData;
      itemBackup = localStorage.getItem('');
      increase = true;
      data = '1';
      totalData = '';
      trytotalData = '';
      while (true) {
        try {
          trytotalData = totalData + data;
          localStorage.setItem('', trytotalData);
          totalData = trytotalData;
          if (increase) {
            data += data;
          }
        } catch (error) {
          e = error;
          if (data.length < 2) {
            break;
          }
          increase = false;
          data = data.substr(data.length / 2);
        }
      }
      if (itemBackup === null) {
        localStorage.removeItem('');
      } else {
        localStorage.setItem('', itemBackup);
      }
      cb(totalData.length);
    };
    return this.GetMaximumSize = function(cb) {
      var backup, max;
      backup = localStorage_getBackup();
      localStorage.clear();
      max = this.GetRemainingSpace(function(max) {
        ApplyBackup(backup);
        cb(max);
      });
    };
  };

}).call(this);
// Generated by CoffeeScript 1.10.0
(function() {
  window.maju.prototype.on = function(el, eventName, cb) {
    el.addEventListener(eventName, cb, false);
    return el;
  };

}).call(this);
// Generated by CoffeeScript 1.10.0
(function() {
  window.maju.prototype.prepend = function(el, prependEl) {
    el.parentNode.insertBefore(prependEl, el);
    return el;
  };

}).call(this);
window.maju = new window.maju();