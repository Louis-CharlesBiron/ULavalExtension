// GLOBALS
const intervalId = setInterval(()=>{
    if (document.getElementById("_mpoCadreBootstrapId_")) {
        clearInterval(intervalId)
        const nomCours = document.querySelector(".TitreCours").textContent, notes = getNotes()

        console.log("LOADING FINISHED", nomCours, notes)

        chrome.storage.sync.set({[nomCours]:notes, date:Date.now()})

    }
},250)

chrome.storage.sync.get(r=>console.log("STORAGE", r))


// FUNCTIONS DEFINITIONS
const invalidNote = -999
function getNotes() {
    let section = 0, notes = [...document.querySelectorAll(".Tableau_Evaluations table .ul_table_body-row, .Tableau_SommaireDesResultats_Etudiant table .ul_table_body-row")].reduce((a,b)=>{
        if (b.childElementCount==4) a.notes.push({
            name:b.childNodes[0].textContent.trim(),
            note:+b.childNodes[1].textContent.trim().match(/[0-9]*[,]?[0-9]*[-]*/g)[0].replace(",",".").replace("---",invalidNote),
            pond:+b.childNodes[2].textContent.trim().match(/[0-9]*[,]?[0-9]*[-]*/g)[0].replace(",",".").replace("---",invalidNote), section})
        else if (b.childElementCount==3) a.seps.push({section:++section, pond:+b.childNodes[1].textContent.trim().match(/[0-9]*[,]?[0-9]*/g)[0].replace(",",".")})
        return a
    }, {notes:[],seps:[]})
    
    notes.seps.forEach(s=>{
        const errNotes = notes.notes.filter(x=>x.section==s.section), corrPond = s.pond/errNotes.length
        if (errNotes.reduce((a,b)=>a+b.pond,0) != s.pond) errNotes.forEach(x=>x.pond=corrPond)
    })

    return notes.notes.map(x=>(delete x.section,x))
}

function getNotesAndMoys() {
    const S = {NAMES:-1, SKIP:0, NOTES:1, MOYS:2}
    let state = -1, skipProg = 0, iter = 0, notes = getNotes(), moys = [...document.querySelectorAll("[id*=barGraphEval_svg] g g g text")].reduce((a,b,i)=>{
        const txt = b.textContent.trim()
            console.log(txt, iter, state, notes)
    
        if (state == S.NAMES) a.push({name:txt})
        else if (state==S.NOTES && iter < a.length) {
            if (notes[iter]?.note != invalidNote) a[iter].note = +txt.match(/[0-9]*[,]?[0-9]*[-]*/g)[0].replace(",",".").replace("---",invalidNote)
            iter++
        } else if (state==S.NOTES && iter==a.length) {iter = 0;state = S.MOYS}
        if (state==S.MOYS && iter < a.length) {
            if (notes[iter]?.note != invalidNote) a[iter].moy = +txt.match(/[0-9]*[,]?[0-9]*[-]*/g)[0].replace(",",".").replace("---",invalidNote)
            iter++
        } 
    
    
        if (state==S.SKIP && skipProg<4) {
            skipProg++
            return a
        } else if (state==S.SKIP && skipProg==4) state = S.NOTES
        if (txt=="Note finale") state = S.SKIP
        
        return a
    }, [])

    return moys
} getNotesAndMoys()