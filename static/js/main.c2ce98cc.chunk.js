(this["webpackJsonpsakura-face-front"]=this["webpackJsonpsakura-face-front"]||[]).push([[0],{52:function(e,t,n){},77:function(e,t,n){"use strict";n.r(t);var c=n(0),a=n.n(c),r=n(13),i=n.n(r),s=(n(52),n(96)),o=n(106),j=n(46),u=n(100),d=n(101),l=n(102),b=n(79),h=n(103),f=n(80),p=n(98),x=n(104),O=n(12),m=n.n(O),g=n(15),v=n(17),w=n(99),y=n(105),k=n(26),R=n.n(k);R.a.defaults.baseURL="https://jzzezp7bhc.execute-api.ap-northeast-1.amazonaws.com/dev/";var C=function(){var e=Object(g.a)(m.a.mark((function e(t){var n,c;return m.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n={"content-type":"application/octet-stream"},e.next=3,R.a.post("/detect",t,{headers:n});case 3:return c=e.sent,e.abrupt("return",c.data);case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),F=function(){var e=Object(g.a)(m.a.mark((function e(t){var n;return m.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,R.a.post("/findSimilar",{faceId:t});case 2:return n=e.sent,e.abrupt("return",n.data);case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),I=n(2),N=Object(s.a)((function(){return Object(o.a)({tweet:{color:"white",fontWeight:700,textTransform:"none"}})})),S=function(e){var t=e.students,n=N();return Object(I.jsx)(y.a,{className:n.tweet,variant:"contained",color:"secondary",onClick:function(){var e=t.reduce((function(e,t){return"".concat(e).concat(t.name," ... \u985e\u4f3c\u5ea6 ").concat((100*t.confidence).toFixed(1),"%\n")}),""),n="\u3055\u304f\u3089\u5b66\u9662\u306e\u8ab0\u306b\u4f3c\u3066\u308b\u304b\u5224\u5b9a\u3057\u307e\u3057\u305f\uff01\n\n".concat(e,"\nryochansq.github.io/sakura-face/\n\n#\u3055\u304f\u3089\u5b66\u9662\u306e\u8ab0\u306b\u4f3c\u3066\u308b\u304b\u306a\n#\u3055\u304f\u3089\u5b66\u9662 #\u3055\u304f\u3089\u5b66\u9662\u7236\u5144\u30d1\u30bd\u30b3\u30f3\u90e8"),c=encodeURIComponent(n),a="https://twitter.com/intent/tweet?text=".concat(c);window.open(a)},children:"Twitter\u3067\u5171\u6709"})},_=Object(s.a)((function(){return Object(o.a)({pictureContainer:{position:"relative"},loaded:{width:"100%",objectFit:"contain"},rightGrid:{aspectRatio:"500 / 634"},studentPicture:{width:"100%",height:"100%",objectFit:"scale-down"},tweet:{color:"white",fontWeight:700,textTransform:"none"}})})),z=function(){var e=_(),t=Object(c.useState)(void 0),n=Object(v.a)(t,2),a=n[0],r=n[1],i=Object(c.useRef)(null),s=Object(c.useState)([]),o=Object(v.a)(s,2),j=o[0],u=o[1],d=Object(c.useState)([]),l=Object(v.a)(d,2),h=l[0],f=l[1],x=Object(c.useState)(!1),O=Object(v.a)(x,2),k=O[0],R=O[1],N=Object(c.useState)(-1),z=Object(v.a)(N,2),W=z[0],G=z[1],T=i.current?100/i.current.naturalWidth:0,U=i.current?100/i.current.naturalHeight:0,J=function(){var e=Object(g.a)(m.a.mark((function e(t,n){var c;return m.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return G(n),R(!0),e.next=4,F(t);case 4:c=e.sent,f(c),R(!1);case 7:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}(),L=function(){var e=Object(g.a)(m.a.mark((function e(t){var n,c,a,i,s;return m.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(n=t.target,c=n.files,a=c&&c.length?c[0]:null){e.next=5;break}return e.abrupt("return");case 5:return R(!0),u([]),f([]),G(-1),(i=new FileReader).readAsDataURL(a),i.onload=function(){var e=i.result;r(e)},e.next=14,C(a);case 14:if(s=e.sent,u(s),R(!1),1!==s.length){e.next=20;break}return e.next=20,J(s[0].faceId,0);case 20:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();return Object(I.jsxs)(I.Fragment,{children:[a&&Object(I.jsx)(p.a,{item:!0,container:!0,children:Object(I.jsxs)(p.a,{item:!0,container:!0,direction:"row",children:[Object(I.jsx)(p.a,{item:!0,container:!0,xs:6,justify:"center",alignItems:"center",children:Object(I.jsxs)(p.a,{className:e.pictureContainer,item:!0,container:!0,children:[Object(I.jsx)("img",{ref:i,src:a,alt:"\u9078\u629e\u753b\u50cf",className:e.loaded}),j.map((function(e,t){return Object(I.jsx)("button",{onClick:function(){return J(e.faceId,t)},type:"button",style:{backgroundColor:"transparent",border:"2px solid ".concat((n=t,-1===W?"blue":n===W?"red":"white")),color:"transparent",cursor:"pointer",position:"absolute",left:"".concat(e.faceRectangle.left*T,"%"),top:"".concat(e.faceRectangle.top*U,"%"),width:"".concat(e.faceRectangle.width*T,"%"),height:"".concat(e.faceRectangle.height*U,"%")},children:":"},e.faceId);var n}))]})}),Object(I.jsx)(p.a,{item:!0,container:!0,xs:6,justify:"center",alignItems:"center",className:e.rightGrid,children:k?Object(I.jsx)(w.a,{}):h.length>0?Object(I.jsx)("img",{className:e.studentPicture,src:"students/".concat(h[0].name,".jpg"),alt:"".concat(h[0].name)}):Object(I.jsxs)(b.a,{children:["\u5224\u5b9a\u3057\u305f\u3044\u9854\u3092",Object(I.jsx)("br",{}),"\u30bf\u30c3\u30d7\u3057\u3066\u304f\u3060\u3055\u3044"]})})]})}),!a&&Object(I.jsx)(p.a,{item:!0,container:!0,justify:"center",children:Object(I.jsx)("img",{src:"camera_kao_ninshiki.png",alt:"\u9854\u8a8d\u8b58"})}),!h.length&&Object(I.jsx)(p.a,{item:!0,container:!0,justify:"center",children:Object(I.jsxs)(y.a,{variant:"contained",color:"primary",component:"label",disabled:k,children:[a?"\u5225\u306e\u753b\u50cf\u3092\u9078\u629e":"\u5224\u5b9a\u3057\u305f\u3044\u753b\u50cf\u3092\u9078\u629e",Object(I.jsx)("input",{type:"file",accept:"image/*",hidden:!0,onChange:L})]})}),h.length>0&&!k&&Object(I.jsxs)(I.Fragment,{children:[Object(I.jsx)(p.a,{item:!0,container:!0,justify:"center",children:Object(I.jsxs)(b.a,{children:["\u3053\u306e\u4eba\u7269\u306f ",Object(I.jsx)("b",{children:h[0].name})," ",h[0].confidence>=.7?"\u3067\u3059\uff01":"\u306b\u4f3c\u3066\u3044\u307e\u3059\uff01"]})}),Object(I.jsx)(p.a,{item:!0,container:!0,children:h.map((function(e){return Object(I.jsx)(p.a,{item:!0,container:!0,justify:"center",children:Object(I.jsxs)(b.a,{children:[e.name," ... \u985e\u4f3c\u5ea6"," ",(100*e.confidence).toFixed(1),"%"]})},e.name)}))}),Object(I.jsxs)(p.a,{item:!0,container:!0,direction:"row",justify:"center",spacing:2,children:[Object(I.jsx)(p.a,{item:!0,children:Object(I.jsxs)(y.a,{variant:"contained",color:"primary",component:"label",disabled:k,children:["\u5225\u306e\u753b\u50cf\u3067\u8a66\u3059",Object(I.jsx)("input",{type:"file",accept:"image/*",hidden:!0,onChange:L})]})}),Object(I.jsx)(p.a,{item:!0,children:Object(I.jsx)(S,{students:h})})]})]})]})},W=Object(j.a)({palette:{secondary:{main:"#00acee"}}}),G=Object(s.a)((function(){return Object(o.a)({title:{flexGrow:1},container:{padding:0},body:{padding:8}})})),T=function(){var e=G();return Object(I.jsx)(I.Fragment,{children:Object(I.jsxs)(u.a,{theme:W,children:[Object(I.jsx)(d.a,{position:"static",children:Object(I.jsx)(l.a,{variant:"dense",children:Object(I.jsx)(b.a,{variant:"h6",className:e.title,children:"\u3055\u304f\u3089\u5b66\u9662\u306e\u8ab0\u306b\u4f3c\u3066\u308b\u304b\u306a\uff08\u958b\u767a\u4e2d\uff09"})})}),Object(I.jsx)(h.a,{maxWidth:"md",className:e.container,children:Object(I.jsx)(f.a,{className:e.body,children:Object(I.jsxs)(p.a,{container:!0,spacing:2,children:[Object(I.jsxs)(p.a,{item:!0,children:[Object(I.jsxs)(b.a,{children:["\u753b\u50cf\u306b\u5199\u3063\u3066\u3044\u308b\u4eba\u304c\u3001\u3055\u304f\u3089\u5b66\u9662\u306e\u4e2d\u3067",Object(I.jsx)("b",{children:"\u3069\u306e\u751f\u5f92\u306b\u3069\u306e\u304f\u3089\u3044\u4f3c\u3066\u3044\u308b\u304b"}),"\u5224\u5b9a\u3059\u308b\u3088\uff01"]}),Object(I.jsxs)(b.a,{variant:"caption",children:["\u203b\u753b\u50cf\u306f\u5224\u5b9a\u306e\u305f\u3081",Object(I.jsx)(x.a,{href:"https://azure.microsoft.com/ja-jp/services/cognitive-services/face/#demo",target:"_blank",children:"Microsoft"}),"\u3078\u9001\u4fe1\u3055\u308c\u307e\u3059\u3001\u305d\u308c\u4ee5\u5916\u306b\u306f\u4f7f\u7528\u3055\u308c\u307e\u305b\u3093"]})]}),Object(I.jsx)(z,{}),Object(I.jsx)(p.a,{item:!0,container:!0,justify:"flex-end",children:Object(I.jsxs)(b.a,{variant:"caption",children:["\u958b\u767a\uff1a"," ",Object(I.jsx)(x.a,{href:"https://twitter.com/ryochan_metal",target:"_blank",children:"@ryochan_metal"})]})})]})})})]})})};i.a.render(Object(I.jsx)(a.a.StrictMode,{children:Object(I.jsx)(T,{})}),document.getElementById("root"))}},[[77,1,2]]]);
//# sourceMappingURL=main.c2ce98cc.chunk.js.map