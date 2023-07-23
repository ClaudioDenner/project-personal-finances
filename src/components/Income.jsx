import { useState} from "react";
import './css/Income.css';

function Income(props){
    
    const [ income, setIncome] = useState(JSON.parse(localStorage.getItem("FinancesAppIncome")))
    let item = localStorage.getItem("FinancesAppIncome")
    
    
    if(item == null)
    {localStorage.setItem("FinancesAppIncome","[]")}
        else 
    {item = JSON.parse(item)}

    

    function saveIncome(e){
        e.preventDefault();

        let inputIncome = document.getElementById('income')
        let inputClass = document.getElementById('class')
        let inputValue = document.getElementById('value')



        let newObj = {
            income: inputIncome.value,
            class: inputClass.value,
            value: inputValue.value
        }

        item.push(newObj)
        localStorage.setItem("FinancesAppIncome",JSON.stringify(item))

        inputIncome.value = ""
        inputClass.value = ""
        inputValue.value = ""

        setIncome(item)
        props.updatesubtotalIncome(item.reduce((accumulator, currentValue)=> accumulator + 1*currentValue.value,0))
        props.updateIncomeFull(item)
        

    }

    function removeIncome(index){
        item.splice(index,1)
        localStorage.setItem("FinancesAppIncome",JSON.stringify(item))
        
        setIncome(JSON.parse(localStorage.getItem("FinancesAppIncome")))
        props.updatesubtotalIncome(item.reduce((accumulator, currentValue)=> accumulator + 1*currentValue.value,0))
        props.updateIncomeFull(item)
        
        


    }

    return(
        <>
            <table className="table table-primary table-hover">
            <thead>
                <tr>
                <th scope="col">Nº</th>
                <th scope="col">Receitas</th>
                <th scope="col">Classificação</th>
                <th scope="col">Valor</th>
                <th></th>
                </tr>
            </thead>
            <tbody>
                
                {   
                    
                    income.map((e, index)=> 
                        
                        <tr key={index}>
                            <th scope="row">{index+1}</th>
                            <td>{e.income}</td>
                            <td>{e.class}</td>
                            <td id="valorItem"><b>{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(e.value)}</b></td>
                            <td className="Delete"><i className="bi bi-trash3" onClick={()=>{removeIncome(index)}}></i></td>
                            
                        </tr>
                    )
                }
                <tr>
                    <th colSpan="3" className="table-active">Subtotal Receitas:</th>
                    <th className="table-active">{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(income.reduce((accumulator, currentValue)=> accumulator + 1*currentValue.value,0))}</th>
                    <th className="table-active">{}</th>
                </tr>
                <tr>
                    <th className="table-active"><button type="button" data-bs-toggle="modal" data-bs-target="#myModal" className="btn btn-primary">+</button></th>
                    
                </tr>

            </tbody>
            </table>


            <div className="modal fade" tabIndex="-1" id="myModal"  aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Adicione uma Receita</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                    <form onSubmit={saveIncome} className="col-auto">
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Receita</label>
                        <input className="form-control" type="text" id="income" placeholder="Ex: salário" required/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Classificação</label>
                        <input className="form-control" type="text" id="class" placeholder="Ex: alimentação" required/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Valor</label>
                    <input className="form-control" type="number" min="0" max="1000000" step=".01" id="value" placeholder="R$" required/>
                    </div>
                    <input className="btn btn-primary" type="submit" value="Salvar"/>

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
export default Income;