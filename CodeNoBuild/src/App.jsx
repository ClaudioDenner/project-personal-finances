import { useState, useEffect } from 'react'

import './App.css'
import Income from './components/Income.jsx'
import Expense from './components/Expense.jsx'
import Balance from './components/Balance.jsx'
import DetailsExpense from './components/DetailsExpense.jsx'
import DetailsIncome from './components/DetailsIncome.jsx'





function App() {

  if(localStorage.getItem("FinancesAppIncome") === null)
  {localStorage.setItem("FinancesAppIncome","[]")}

  if(localStorage.getItem("FinancesAppExpense") === null)
  {localStorage.setItem("FinancesAppExpense","[]")}


  const [incomeFull, setIncomeFull] = useState(JSON.parse(localStorage.getItem("FinancesAppIncome")))
  const updateIncomeFull = a => {
    setIncomeFull(a)
  }

  const [expenseFull, setExpenseFull] = useState(JSON.parse(localStorage.getItem("FinancesAppExpense")))
  const updateExpenseFull = a => {
    setExpenseFull(a)
  }

  const [subtotalIncome, setSubtotalIncome ] = useState(JSON.parse(localStorage.getItem("FinancesAppIncome")).reduce((accumulator, currentValue)=> accumulator + 1*currentValue.value,0))
  const updatesubtotalIncome = i =>{
    setSubtotalIncome(i)
  }

  const [subtotalExpense, setSubtotalExpense ] = useState(JSON.parse(localStorage.getItem("FinancesAppExpense")).reduce((accumulator, currentValue)=> accumulator + 1*currentValue.value,0))
  const updatesubtotalExpense = e =>{
    setSubtotalExpense(e)
  }
  

  const [statusIncome, setShowIncome] = useState(false)
  const [statusExpense, setShowExpense] = useState(true)

  const showIncome = ()=> {setShowIncome(true); setShowExpense(false)}
  const showExpense = ()=> {setShowExpense(true); setShowIncome(false)}


  return (
    <>
     <div className="dashboard"> 

     <Balance subtotalIncome={subtotalIncome} subtotalExpense={subtotalExpense}   />

     <div className='dashboard_details'>
     <button className="btn btn-outline-info btn-light btn-sm" type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample" style={{margin: '5px'}}>Exibir/ocultar detalhes</button>

      <div className="collapse" id="collapseExample">
     {statusExpense? <h4>Despesas por categoria</h4> : <h4>Receitas por categoria</h4>}
     {statusExpense ? <DetailsExpense expenseFull={expenseFull} subtotalExpense={subtotalExpense} /> : '' }
     {statusIncome ? <DetailsIncome incomeFull={incomeFull} subtotalIncome={subtotalIncome} /> : '' }
     </div>
     </div>
     </div>

     <div className='buttons'>
      <button onClick={showExpense} className={ statusExpense ? 'btn btn-danger' : 'btn btn-secondary' }>Despesas</button>
      <button onClick={showIncome} className={ statusIncome ? 'btn btn-primary' : 'btn btn-secondary' }>Receitas</button>
     </div>


     <div className='container_components_items'>
        {statusExpense ? <Expense updatesubtotalExpense={updatesubtotalExpense} updateExpenseFull={updateExpenseFull} /> : '' }
        {statusIncome ? <Income updatesubtotalIncome={updatesubtotalIncome} updateIncomeFull={updateIncomeFull} /> : '' }


     </div>
    


    </>
  )
}

export default App
