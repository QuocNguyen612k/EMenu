(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[161],{2167:function(e,t,n){"use strict";var r=n(3848),a=n(9448);t.default=void 0;var o=a(n(7294)),c=n(9414),u=n(4651),i=n(7426),s={};function l(e,t,n,r){if(e&&(0,c.isLocalURL)(t)){e.prefetch(t,n,r).catch((function(e){0}));var a=r&&"undefined"!==typeof r.locale?r.locale:e&&e.locale;s[t+"%"+n+(a?"%"+a:"")]=!0}}var f=function(e){var t,n=!1!==e.prefetch,a=(0,u.useRouter)(),f=o.default.useMemo((function(){var t=(0,c.resolveHref)(a,e.href,!0),n=r(t,2),o=n[0],u=n[1];return{href:o,as:e.as?(0,c.resolveHref)(a,e.as):u||o}}),[a,e.href,e.as]),p=f.href,d=f.as,v=e.children,y=e.replace,h=e.shallow,m=e.scroll,g=e.locale;"string"===typeof v&&(v=o.default.createElement("a",null,v));var b=(t=o.Children.only(v))&&"object"===typeof t&&t.ref,_=(0,i.useIntersection)({rootMargin:"200px"}),x=r(_,2),E=x[0],w=x[1],k=o.default.useCallback((function(e){E(e),b&&("function"===typeof b?b(e):"object"===typeof b&&(b.current=e))}),[b,E]);(0,o.useEffect)((function(){var e=w&&n&&(0,c.isLocalURL)(p),t="undefined"!==typeof g?g:a&&a.locale,r=s[p+"%"+d+(t?"%"+t:"")];e&&!r&&l(a,p,d,{locale:t})}),[d,p,w,g,n,a]);var L={ref:k,onClick:function(e){t.props&&"function"===typeof t.props.onClick&&t.props.onClick(e),e.defaultPrevented||function(e,t,n,r,a,o,u,i){("A"!==e.currentTarget.nodeName||!function(e){var t=e.currentTarget.target;return t&&"_self"!==t||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey||e.nativeEvent&&2===e.nativeEvent.which}(e)&&(0,c.isLocalURL)(n))&&(e.preventDefault(),null==u&&r.indexOf("#")>=0&&(u=!1),t[a?"replace":"push"](n,r,{shallow:o,locale:i,scroll:u}))}(e,a,p,d,y,h,m,g)},onMouseEnter:function(e){(0,c.isLocalURL)(p)&&(t.props&&"function"===typeof t.props.onMouseEnter&&t.props.onMouseEnter(e),l(a,p,d,{priority:!0}))}};if(e.passHref||"a"===t.type&&!("href"in t.props)){var C="undefined"!==typeof g?g:a&&a.locale,M=a&&a.isLocaleDomain&&(0,c.getDomainLocale)(d,C,a&&a.locales,a&&a.domainLocales);L.href=M||(0,c.addBasePath)((0,c.addLocale)(d,C,a&&a.defaultLocale))}return o.default.cloneElement(t,L)};t.default=f},7426:function(e,t,n){"use strict";var r=n(3848);t.__esModule=!0,t.useIntersection=function(e){var t=e.rootMargin,n=e.disabled||!c,i=(0,a.useRef)(),s=(0,a.useState)(!1),l=r(s,2),f=l[0],p=l[1],d=(0,a.useCallback)((function(e){i.current&&(i.current(),i.current=void 0),n||f||e&&e.tagName&&(i.current=function(e,t,n){var r=function(e){var t=e.rootMargin||"",n=u.get(t);if(n)return n;var r=new Map,a=new IntersectionObserver((function(e){e.forEach((function(e){var t=r.get(e.target),n=e.isIntersecting||e.intersectionRatio>0;t&&n&&t(n)}))}),e);return u.set(t,n={id:t,observer:a,elements:r}),n}(n),a=r.id,o=r.observer,c=r.elements;return c.set(e,t),o.observe(e),function(){c.delete(e),o.unobserve(e),0===c.size&&(o.disconnect(),u.delete(a))}}(e,(function(e){return e&&p(e)}),{rootMargin:t}))}),[n,t,f]);return(0,a.useEffect)((function(){if(!c&&!f){var e=(0,o.requestIdleCallback)((function(){return p(!0)}));return function(){return(0,o.cancelIdleCallback)(e)}}}),[f]),[d,f]};var a=n(7294),o=n(3447),c="undefined"!==typeof IntersectionObserver;var u=new Map},8070:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return l}});var r=n(5893),a=n(1163),o=n(1664),c=n(46),u=n(7294),i=n(5503),s=(n(332),function(){var e=(0,u.useRef)(null),t=(0,u.useState)(0),n=t[0],a=t[1];return(0,r.jsxs)("div",{style:{margin:"5px 0"},children:[(0,r.jsx)("progress",{value:n,max:"100",style:{width:"100%"}}),(0,r.jsx)("br",{}),(0,r.jsx)("input",{type:"file",onChange:function(){var t=e.current.files[0];i.Z.storage().ref("user_uploads/"+t.name).put(t).on("state_change",(function(e){a(e.bytesTransferred/e.totalBytes*100)}),(function(e){alert(e)}),(function(){alert("Uploaded to firebase storage successfully!")}))},ref:e})]})});function l(){var e=(0,a.useRouter)();return(0,r.jsxs)(c.Z,{display:"flex",flexDirection:"column",children:[f.map((function(t){return(0,r.jsx)(o.default,{as:"/".concat(e.query.city,"/").concat(t.name),href:"/[city]/[place]",children:(0,r.jsx)("a",{children:t.name})},t.name)})),(0,r.jsx)(s,{})]})}var f=[{category:"meatttttttttttttttttttttttttttttttttttttttttt",name:"beef",price:"7$"},{category:"meat",name:"steak",price:"8$"},{category:"meat",name:"goat",price:"9$"},{category:"fruit",name:"apple",price:"10$"},{category:"fruit",name:"weed",price:"11$"},{category:"cake",name:"pipe",price:"12$"}]},4039:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/[city]",function(){return n(8070)}])},1664:function(e,t,n){e.exports=n(2167)}},function(e){e.O(0,[774,888,179],(function(){return t=4039,e(e.s=t);var t}));var t=e.O();_N_E=t}]);