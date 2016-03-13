/*
 Kailash Nadh (http://nadh.in)

 localStorageDB v 2.3.1
 A simple database layer for localStorage

 v 2.3.1 Mar 2015
 v 2.3 Feb 2014 Contribution: Christian Kellner (http://orange-coding.net)
 v 2.2 Jan 2014 Contribution: Andy Hawkins (http://a904guy.com)
 v 2.1 Nov 2013
 v 2.0 June 2013
 v 1.9 Nov 2012

 License	:	MIT License
 */

!function(t,e){function n(t,n){function r(){E.hasOwnProperty(_)&&delete E[_],x=null}function a(){var t=0;for(var e in x.tables)x.tables.hasOwnProperty(e)&&t++;return t}function i(t){return x.tables[t].fields}function o(t){return x.tables[t]?!0:!1}function f(t){o(t)||D("The table '"+t+"' does not exist")}function u(t,e){var n=!1,r=x.tables[t].fields;for(var a in r)if(r[a]==e){n=!0;break}return n}function l(t,e){x.tables[t]={fields:e,auto_increment:1},x.data[t]={}}function s(t){delete x.tables[t],delete x.data[t]}function c(t){x.tables[t].auto_increment=1,x.data[t]={}}function d(t,e,n){if(x.tables[t].fields=x.tables[t].fields.concat(e),"undefined"!=typeof n)for(var r in x.data[t])if(x.data[t].hasOwnProperty(r))for(var a in e)x.data[t][r][e[a]]="object"==typeof n?n[e[a]]:n}function h(t){var e=0;for(var n in x.data[t])x.data[t].hasOwnProperty(n)&&e++;return e}function v(t,e){return e.ID=x.tables[t].auto_increment,x.data[t][x.tables[t].auto_increment]=e,x.tables[t].auto_increment++,e.ID}function p(t,n,r,a,i,o){for(var f=null,u=[],l=null,s=0;s<n.length;s++)f=n[s],l=x.data[t][f],u.push(k(l));if(i&&i instanceof Array)for(var s=0;s<i.length;s++)u.sort(y(i[s][0],i[s].length>1?i[s][1]:null));if(o&&o instanceof Array){for(var c=0;c<o.length;c++)for(var d={},h=o[c],s=0;s<u.length;s++)u[s]!==e&&(u[s].hasOwnProperty(h)&&d.hasOwnProperty(u[s][h])?delete u[s]:d[u[s][h]]=1);for(var v=[],s=0;s<u.length;s++)u[s]!==e&&v.push(u[s]);u=v}return r=r&&"number"==typeof r?r:null,a=a&&"number"==typeof a?a:null,r&&a?u=u.slice(r,r+a):r?u=u.slice(r):a&&(u=u.slice(r,a)),u}function y(t,e){return function(n,r){var a="string"==typeof n[t]?n[t].toLowerCase():n[t],i="string"==typeof r[t]?r[t].toLowerCase():r[t];return"DESC"===e?a==i?0:i>a?1:-1:a==i?0:a>i?1:-1}}function b(t,e){var n=[],r=!1,a=null;for(var i in x.data[t])if(x.data[t].hasOwnProperty(i)){a=x.data[t][i],r=!0;for(var o in e)if(e.hasOwnProperty(o))if("string"==typeof e[o]){if(a[o].toString().toLowerCase()!=e[o].toString().toLowerCase()){r=!1;break}}else if(a[o]!=e[o]){r=!1;break}r&&n.push(i)}return n}function g(t,e){var n=[],r=null;for(var a in x.data[t])x.data[t].hasOwnProperty(a)&&(r=x.data[t][a],1==e(k(r))&&n.push(a));return n}function m(t){var e=[];for(var n in x.data[t])x.data[t].hasOwnProperty(n)&&e.push(n);return e}function w(t,e){for(var n=0;n<e.length;n++)x.data[t].hasOwnProperty(e[n])&&delete x.data[t][e[n]];return e.length}function O(t,e,n){for(var r="",a=0,i=0;i<e.length;i++){r=e[i];var o=n(k(x.data[t][r]));if(o){delete o.ID;var f=x.data[t][r];for(var u in o)o.hasOwnProperty(u)&&(f[u]=o[u]);x.data[t][r]=j(t,f),a++}}return a}function P(){try{return E.setItem(_,JSON.stringify(x)),!0}catch(t){return!1}}function S(){return JSON.stringify(x)}function D(t){throw new Error(t)}function k(t){var e={};for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n]);return e}function T(t){return t.toString().match(/[^a-z_0-9]/gi)?!1:!0}function j(t,n){for(var r="",a={},i=0;i<x.tables[t].fields.length;i++)r=x.tables[t].fields[i],n[r]!==e&&(a[r]=n[r]);return a}function I(t,n){for(var r="",a={},i=0;i<x.tables[t].fields.length;i++)r=x.tables[t].fields[i],a[r]=null===n[r]||n[r]===e?null:n[r];return a}var C="db_",_=C+t,q=!1,x=null;try{var E=n==sessionStorage?sessionStorage:localStorage}catch(N){var E=n}return x=E[_],x&&(x=JSON.parse(x))&&x.tables&&x.data||(T(t)?(x={tables:{},data:{}},P(),q=!0):D("The name '"+t+"' contains invalid characters")),{commit:function(){return P()},isNew:function(){return q},drop:function(){r()},serialize:function(){return S()},tableExists:function(t){return o(t)},tableFields:function(t){return i(t)},tableCount:function(){return a()},columnExists:function(t,e){return u(t,e)},createTable:function(t,e){var n=!1;if(T(t))if(this.tableExists(t))D("The table name '"+t+"' already exists.");else{for(var r=!0,a=0;a<e.length;a++)if(!T(e[a])){r=!1;break}if(r){for(var i={},a=0;a<e.length;a++)i[e[a]]=!0;delete i.ID,e=["ID"];for(var o in i)i.hasOwnProperty(o)&&e.push(o);l(t,e),n=!0}else D("One or more field names in the table definition contains invalid characters")}else D("The database name '"+t+"' contains invalid characters.");return n},createTableWithData:function(t,e){("object"!=typeof e||!e.length||e.length<1)&&D("Data supplied isn't in object form. Example: [{k:v,k:v},{k:v,k:v} ..]");var n=Object.keys(e[0]);if(this.createTable(t,n)){this.commit();for(var r=0;r<e.length;r++)v(t,e[r])||D("Failed to insert record: ["+JSON.stringify(e[r])+"]");this.commit()}return!0},dropTable:function(t){f(t),s(t)},truncate:function(t){f(t),c(t)},alterTable:function(t,e,n){var r=!1;if(T(t)){if("object"==typeof e){for(var a=!0,i=0;i<e.length;i++)if(!T(e[i])){a=!1;break}if(a){for(var o={},i=0;i<e.length;i++)o[e[i]]=!0;delete o.ID,e=[];for(var f in o)o.hasOwnProperty(f)&&e.push(f);d(t,e,n),r=!0}else D("One or more field names in the table definition contains invalid characters")}else if("string"==typeof e)if(T(e)){var u=[];u.push(e),d(t,u,n),r=!0}else D("One or more field names in the table definition contains invalid characters")}else D("The database name '"+t+"' contains invalid characters");return r},rowCount:function(t){return f(t),h(t)},insert:function(t,e){return f(t),v(t,I(t,e))},insertOrUpdate:function(t,e,n){f(t);var r=[];if(e?"object"==typeof e?r=b(t,j(t,e)):"function"==typeof e&&(r=g(t,e)):r=m(t),0==r.length)return v(t,I(t,n));for(var a=[],i=0;i<r.length;i++)O(t,r,function(t){return a.push(t.ID),n});return a},update:function(t,e,n){f(t);var r=[];return e?"object"==typeof e?r=b(t,j(t,e)):"function"==typeof e&&(r=g(t,e)):r=m(t),O(t,r,n)},query:function(t,e,n,r,a,i){f(t);var o=[];return e?"object"==typeof e?o=b(t,j(t,e),n,r):"function"==typeof e&&(o=g(t,e,n,r)):o=m(t,n,r),p(t,o,r,n,a,i)},queryAll:function(t,e){return e?this.query(t,e.hasOwnProperty("query")?e.query:null,e.hasOwnProperty("limit")?e.limit:null,e.hasOwnProperty("start")?e.start:null,e.hasOwnProperty("sort")?e.sort:null,e.hasOwnProperty("distinct")?e.distinct:null):this.query(t)},deleteRows:function(t,e){f(t);var n=[];return e?"object"==typeof e?n=b(t,j(t,e)):"function"==typeof e&&(n=g(t,e)):n=m(t),w(t,n)}}}"function"==typeof define&&define.amd?define(function(){return n}):t.localStorageDB=n}(window);