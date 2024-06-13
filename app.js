const ausgabenFormular = document.querySelector("#ausgaben-input-container");
const saveDate = document.getElementById("save-date");
const saveSpentArea = document.getElementById("save-spent-area");
const saveSpent = document.getElementById("save-spent");
const process = document.getElementById("process");
const ausgabenTable = document.getElementById("ausgaben-table");

console.log(ausgabenFormular);



//^ Events

ausgabenFormular.addEventListener("submit", (e) => {
  e.preventDefault();

  const dateInput = document.getElementById("input-date");
  const spentInput = document.getElementById("input-spent");
  const spentAreaInput = document.getElementById("input-spent-area");

  const harcamalar = [];

  const harcama = {
    datum: dateInput.value,
    betrag: spentInput.value,
    bereich: spentAreaInput.value,
  };

  harcamalar.push(harcama);

//   console.log(harcamalar);
 localStorage.setItem('harcamalar', JSON.stringify(harcamalar))
 let harcamalarJSON = localStorage.getItem('harcamalar')
 let harcamalarArray = JSON.parse(harcamalarJSON)

 console.log(harcamalarArray)

  saveDate.textContent = harcama.datum
  saveSpentArea.textContent = harcama.bereich
  saveSpent.textContent = harcama.betrag;
  process.style.display="block"

  
  
  
});



const deleteButton = process.firstElementChild

deleteButton.addEventListener("click", () => {
  
  ausgabenTable.remove();
  
});


const salary=document.getElementById("einkommen")

salary.addEventListener('submit', (e)=>{

    e.preventDefault()


    const einkommen=document.getElementById('input-salary').value
    const einkommen2=document.getElementById('einkommen-2')

    einkommen2.textContent=einkommen
})


function ausgabenTotal(){

}
