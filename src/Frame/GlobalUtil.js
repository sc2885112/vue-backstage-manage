import Vue from 'vue';
import axios from "axios";
Vue.prototype.$http = axios;
Vue.prototype.$api = window.location.origin + '/myProject';

if (!String.prototype.endsWith) {
  String.prototype.endsWith = function(search, this_len) {
    if (this_len === undefined || this_len > this.length) {
      this_len = this.length;
    }
    return this.substring(this_len - search.length, this_len) === search;
  };
};

if (!String.prototype.startsWith) {
    Object.defineProperty(String.prototype, 'startsWith', {
        value: function(search, pos) {
          pos = !pos || pos < 0 ? 0 : +pos;
          return this.substring(pos, pos + search.length) === search;
        }
    });
};

