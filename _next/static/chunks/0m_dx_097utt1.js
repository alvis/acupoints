(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,18514,e=>{"use strict";var s=e.i(19125),a=e.i(56499),r=e.i(85812),t=e.i(52497);let l=({entry:e,shown:r,expanded:l,zh:i,onToggle:d})=>{let c=`${e.id}-answer`;return(0,s.jsxs)("div",{className:"border-t border-rule",hidden:!r,children:[(0,s.jsx)("h3",{className:"m-0 font-normal",children:(0,s.jsxs)("button",{"aria-controls":c,"aria-expanded":l,className:(0,t.f)(`
              grid w-full scroll-mt-24 grid-cols-[52px_minmax(0,1fr)_28px]
              items-center gap-3 py-5 pr-2 pl-1 text-left text-[1.2rem]
              leading-[1.3] text-ink
              sm:grid-cols-[64px_minmax(0,1fr)_28px_30px] sm:gap-3.5
              sm:text-[1.44rem]
            `,l?"bg-paper-raised shadow-[inset_4px_0_0_var(--color-cinnabar)]":`
                bg-transparent
                hover:bg-paper-raised
              `),id:e.id,type:"button",onClick:d,children:[(0,s.jsx)("span",{className:"\n              tc red pl-2.5 text-[1rem] font-bold\n              sm:pl-3.5 sm:text-[1.06rem]\n            ",lang:"zh-Hant",children:e.ordinal}),(0,s.jsx)("span",{className:(0,t.f)(i&&"tc"),children:e.question}),(0,s.jsx)("span",{"aria-hidden":"true",className:"\n              tc hidden size-7 place-items-center text-[0.88rem] font-bold\n              shadow-rest\n              sm:grid\n            ",children:e.groupHan}),(0,s.jsx)("span",{"aria-hidden":"true",className:"pm text-center text-2xl",children:l?"−":"+"})]})}),(0,s.jsxs)("div",{"aria-labelledby":e.id,className:(0,t.f)(`
            flex-col gap-3 bg-paper-raised pt-1 pr-5 pb-[26px] pl-[64px]
            sm:pr-10 sm:pl-[82px]
          `,l?"flex":"hidden"),hidden:!l,id:c,role:"region",children:[(0,s.jsx)("p",{className:(0,t.f)(`
              m-0 text-[1.1rem] leading-[1.55]
              sm:text-[1.19rem]
            `,i&&"tc"),children:(0,s.jsx)(n,{segments:e.answer})}),e.followThrough?(0,s.jsx)("p",{className:(0,t.f)(`
                m-0 text-[1.02rem] leading-[1.55] text-ink-soft
                sm:text-[1.06rem]
              `,i&&"tc"),children:(0,s.jsx)(n,{segments:e.followThrough})}):null,(0,s.jsxs)(a.default,{className:(0,t.f)(`
              self-start text-[1rem] font-medium
              sm:text-[1.06rem]
            `,i&&"tc"),href:e.more.href,children:[e.more.label," →"]})]})]})},n=({segments:e})=>(0,s.jsx)(s.Fragment,{children:e.map(e=>"link"===e.kind?(0,s.jsx)(a.default,{href:e.href,children:e.text},e.at):(0,s.jsx)("span",{children:e.text},e.at))});e.s(["FaqAccordion",0,({entries:e,labels:a,zh:n})=>{let[i,d]=(0,r.useState)(e[0]?.id??null),[c,m]=(0,r.useState)("all"),x=a.groups.find(e=>e.key===c)??a.groups.at(0);return(({entries:e,setGroup:s,setOpen:a})=>{(0,r.useEffect)(()=>{let r=()=>{let r=window.location.hash.slice(1);e.some(e=>e.id===r)&&(s("all"),a(r))};return r(),window.addEventListener("hashchange",r),()=>window.removeEventListener("hashchange",r)},[e])})({entries:e,setGroup:m,setOpen:d}),(0,s.jsxs)(s.Fragment,{children:[(0,s.jsxs)("div",{className:"flex flex-col gap-2.5",children:[(0,s.jsx)("span",{className:(0,t.f)("cap",n&&"tc"),id:"faq-rail",children:a.railCap}),(0,s.jsx)("div",{"aria-labelledby":"faq-rail",className:"\n            r1 grid grid-cols-2 p-[1.5px]\n            sm:grid-cols-4\n            lg:flex lg:flex-col\n          ",role:"group",children:a.groups.map(a=>{let r=a.key===x?.key,l="all"===a.key?e.length:e.filter(e=>e.group===a.key).length;return(0,s.jsxs)("button",{"aria-pressed":r,className:(0,t.f)(`
                    grid grid-cols-[30px_minmax(0,1fr)_auto] items-center
                    gap-2.5 px-3.5 py-3 text-left text-[1.06rem]
                    lg:grid-cols-[34px_minmax(0,1fr)_auto] lg:text-[1.13rem]
                  `,r?`
                      bg-ink text-paper
                      shadow-[inset_4px_0_0_var(--color-cinnabar)]
                    `:`
                      bg-transparent text-ink
                      shadow-[inset_0_-1px_0_var(--color-rule)]
                      hover:bg-paper-raised
                    `),type:"button",onClick:()=>{var s;m(s=a.key),d(e.find(e=>"all"===s||e.group===s)?.id??null)},children:[(0,s.jsx)("span",{"aria-hidden":"true",className:"\n                  tc text-[1.25rem] font-black\n                ",children:a.han}),(0,s.jsx)("span",{className:(0,t.f)(n&&"tc"),children:a.label}),(0,s.jsx)("span",{className:"pm text-[0.75rem]",children:l})]},a.key)})}),(0,s.jsx)("span",{className:(0,t.f)("pt-1.5 text-[0.88rem] leading-[1.45] text-ink-soft",n&&"tc"),children:a.railNote})]}),(0,s.jsxs)("div",{className:"min-w-0",children:[(0,s.jsxs)("div",{className:"\n            flex items-baseline gap-3.5 border-b-[2.5px] border-ink pb-3\n          ",children:[(0,s.jsx)("h2",{"aria-live":"polite",className:(0,t.f)(`
                m-0 text-[1.6rem] font-medium
                sm:text-[1.9rem]
              `,n&&"tc"),children:x?.title}),(0,s.jsx)("span",{className:"flex-1"}),(0,s.jsx)("span",{className:(0,t.f)("text-[0.94rem] text-ink-soft",n&&"tc"),children:x?.count})]}),(0,s.jsx)("div",{className:"border-b border-ink",children:e.map(e=>(0,s.jsx)(l,{entry:e,expanded:i===e.id,shown:"all"===c||e.group===c,zh:n,onToggle:()=>d(s=>s===e.id?null:e.id)},e.id))})]})]})}],18514)}]);