export const chrome = import.meta.env.DEV ? {
    downloads:{
        download:e=>console.log("DOWNLOADING FILE ",e)
    },
    windows:{
        create:e=>console.log("NEW WINDOW CREATED AT ",e)
    },
    storage:{
        syncv:{d:"TEST"},
        localv:{},
        sync:{
            get:(e,o)=>{setTimeout((()=>"function"!=typeof e?o(chrome.storage.syncv):e(chrome.storage.syncv)),100)},
            set:e=>{setTimeout((()=>Object.keys(e).forEach((o=>chrome.storage.syncv[o]=e[o]))),100)},
            remove:e=>{setTimeout((()=>delete chrome.storage.syncv[e]),100)},
            clear:()=>chrome.storage.syncv={},
            QUOTA_BYTES:102400,
            getBytesInUse:e=>{setTimeout((()=>e(random(100,9e4))),100)}
        },
        local:{
            get:(e,o)=>{setTimeout((()=>"function"!=typeof e?o(chrome.storage.localv):e(chrome.storage.localv)),100)},
            set:e=>{setTimeout((()=>Object.keys(e).forEach((o=>chrome.storage.localv[o]=e[o]))),100)},
            remove:e=>{setTimeout((()=>delete chrome.storage.localv[e]),100)},
            clear:()=>chrome.storage.localv={},
            getBytesInUse:e=>{setTimeout((()=>e(random(100,1e5))),100)},
            QUOTA_BYTES:10485760}
        },
        management:{
            getSelf:e=>setTimeout((()=>e({versionName:"2.003"})),100)
        },
        tabs:{
            query:()=>console.log("QUERY TABS"),
        }
    }
: window.chrome
 