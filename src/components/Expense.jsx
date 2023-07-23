import { useState} from "react";

function Expense(props){

    const [ expense, setExpense] = useState(JSON.parse(localStorage.getItem("FinancesAppExpense")))
    let item = localStorage.getItem("FinancesAppExpense")

    
    if(item == null)
    {localStorage.setItem("FinancesAppExpense","[]")}
        else 
    {item = JSON.parse(item)}

    let [subtotal, setSubTotal] = useState(0);
    

    function saveExpense(e){
        e.preventDefault();

        let inputExpense = document.getElementById('expense')
        let inputClass = document.getElementById('class')
        let inputValue = document.getElementById('value')



        let newObj = {
            expense: inputExpense.value,
            class: inputClass.value,
            value: inputValue.value
        }

        item.push(newObj)
        localStorage.setItem("FinancesAppExpense",JSON.stringify(item))

        inputExpense.value = ""
        inputClass.value = ""
        inputValue.value = ""
        setExpense(item)
        props.updatesubtotalExpense(item.reduce((accumulator, currentValue)=> accumulator + 1*currentValue.value,0))
        props.updateExpenseFull(item)


    }

    function removeExpense(index){
        item.splice(index,1)
        localStorage.setItem("FinancesAppExpense",JSON.stringify(item))
        setExpense(item)
        props.updatesubtotalExpense(item.reduce((accumulator, currentValue)=> accumulator + 1*currentValue.value,0))
        props.updateExpenseFull(item)
        


    }

    return(
        <>
            <table className="table table-light table-hover">
            <thead>
                <tr>
                <th scope="col">Nº</th>
                <th scope="col">Despesas</th>
                <th scope="col">Classificação</th>
                <th scope="col">Valor</th>
                <th></th>
                </tr>
            </thead>
            <tbody>
                
                {   
                    
                    expense.map((e, index)=> 
                        
                        <tr key={index}>
                            <th scope="row">{index+1}</th>
                            <td>{e.expense}</td>
                            <td>{e.class}</td>
                            <td id="valorItem"><b>{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(e.value)}</b></td>
                            <td className="Delete"><i className="bi bi-trash3" onClick={()=>{removeExpense(index)}}></i></td>
                            
                        </tr>
                    )
                }
                <tr>
                    <th colSpan="3" className="table-active">Subtotal Despesas:</th>
                    <th className="table-active">{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(expense.reduce((accumulator, currentValue)=> accumulator + 1*currentValue.value,0))}</th>
                    <th className="table-active">{}</th>
                </tr>
                <tr>
                    <th className="table-active"><button type="button" data-bs-toggle="modal" data-bs-target="#myModal" className="btn btn-danger">+</button></th>
                    
                </tr>

            </tbody>
            </table>


            <div className="modal fade" tabIndex="-1" id="myModal"  aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Adicione uma Despesa</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                    <form onSubmit={saveExpense} className="col-auto">
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Despesa</label>
                        <input className="form-control" type="text" id="expense" placeholder="Ex: mercado" required/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Classificação</label>
                        <input className="form-control" type="text" id="class" placeholder="Ex: alimentação" required/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Valor</label>
                    <input className="form-control" type="number" min="0" max="1000000" step=".01" id="value" placeholder="R$" required/>
                    </div>
                    <input className="btn btn-danger" type="submit" value="Salvar"/>

                </form>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
                    </div>
                    </div>
                </div>
            </div>


        </>

    )

}
export default Expense;