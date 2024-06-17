//^ Selectors
const ausgabenFormular = document.querySelector("#ausgaben-input-container");
const saveDate = document.getElementById("save-date");
const saveSpentArea = document.getElementById("save-spent-area");
const saveSpent = document.getElementById("save-spent");
const process = document.getElementById("process");
const ausgabenTable = document.getElementById("ausgaben-table");
const einkommenInput=document.getElementById('input-salary')
const deleteAll=document.getElementById('delete-all-btn')

//Augaben Formular-Selectors
const dateInput = document.getElementById("input-date");
const spentInput = document.getElementById("input-spent");
const spentAreaInput = document.getElementById("input-spent-area");

// Ausgaben Table
const ausgabenBody = document.getElementById("ausgaben-body")
const ausgabenTd = document.getElementById("ausgaben")
const einkommen = document.getElementById("einkommen-2")
const restTd = document.getElementById("rest")



//^ Variables
let gelirler =0
let harcamaListesi = [];

//^ Einkommen Form

const salary=document.getElementById("einkommen-1")

salary.addEventListener('submit', (e)=>{

    e.preventDefault()

    gelirler = gelirler + Number(einkommenInput.value)

    salary.reset()

    localStorage.setItem("gelirler", gelirler)
    einkommen.textContent= new Intl.NumberFormat().format(gelirler)

    hesapla()

})


//^ window loading

window.addEventListener("load", () => {

  gelirler = Number(localStorage.getItem("gelirler")) || 0
  dateInput.valueAsDate = new Date()
  harcamaListesi = JSON.parse(localStorage.getItem("harcamalar")) || []
  harcamaListesi.forEach((harcama) => harcamaYaz(harcama));
  hesapla()

})


//^ Ausgabenformular Eingeben

ausgabenFormular.addEventListener("submit", (e) => {
  e.preventDefault();

  const yeniHarcama ={
    id: new Date().getTime(),
    datum: new Date(dateInput.value).toLocaleDateString(),
    menge:spentInput.value,
    bereich:spentAreaInput.value

  }

  harcamaListesi.push(yeniHarcama)
  ausgabenFormular.reset()
  dateInput.valueAsDate = new Date()
  localStorage.setItem("harcamalar", JSON.stringify(harcamaListesi))
  harcamaYaz(yeniHarcama)
  hesapla()

})


const harcamaYaz = ({id,datum,menge,bereich}) => {

  const tr = document.createElement("tr")

  const appendTd = (content) => {
    const td = document.createElement("td")
    td.textContent = content
    return td
  }

  const createLastTd = () =>{
    const td = document.createElement("td")
    const i = document.createElement("i")
    i.id= id,
    i.className= "fa-solid fa-trash-can text-danger"
    i.type = "button"
    td.appendChild(i)
    return td
  }

  tr.append(
    appendTd(datum),
    appendTd(bereich),
    appendTd(menge),
    createLastTd()
  )

  ausgabenBody.prepend(tr)
}

  

const hesapla = () => {
  const giderler = harcamaListesi.reduce((toplam,harcama) => toplam + Number(harcama.menge),0)

  console.log(giderler)



  ausgabenTd.textContent = new Intl.NumberFormat().format(giderler)
  einkommen.textContent = new Intl.NumberFormat().format(gelirler)
  restTd.textContent = new Intl.NumberFormat().format(gelirler - giderler)

  const borclu = gelirler - giderler < 0

  restTd.classList.toggle('text-danger', borclu)
document.getElementById("resteinkommen").classList.toggle('text-danger', borclu )

}


ausgabenBody.addEventListener("click", (e) => {

  if(e.target.classList.contains("fa-trash-can")){
    e.target.parentElement.parentElement.remove()

    const id = e.target.id

    harcamaListesi = harcamaListesi.filter((harcama) => harcama.id != id)

    localStorage.setItem("harcamalar", JSON.stringify(harcamaListesi))

    hesapla()
  }
})

deleteAll.addEventListener("click", ()=>{
  if(confirm("Sind Sie sicher alle Information löschen?")){
    harcamaListesi=[]
    gelirler=0
    ausgabenBody.innerHTML=""
    localStorage.removeItem("gelirler")
    localStorage.removeItem("harcamalar")
    hesapla()
  }
})