import './css/Balance.css';

function Balance(props){

    let percentIncome = (props.subtotalIncome*100/(props.subtotalIncome + props.subtotalExpense))
    let percentExpense = (props.subtotalExpense*100/(props.subtotalIncome + props.subtotalExpense))
    let balance = (props.subtotalIncome - props.subtotalExpense)
    return(
        <div className="balance_container">
            <div className='overall_balance'>
                <h2>Saldo Geral:</h2>
                <span className={ balance >= 0 ? 'balance_positive' : 'balance_negative'}>{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(props.subtotalIncome - props.subtotalExpense) }</span>
            </div>
            <div className='overall_balance'>
                <h3>Total Receitas:</h3>
                {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(props.subtotalIncome)}
                <div className="progress" style={{height: "4px"}}>
                <div className="progress-bar bg-primary" role="progressbar" aria-label="Info example" style={{width:`${percentIncome}%`}} aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
                </div>
            
            </div>
            <div className='overall_balance'>
                <h3>Total Despesas:</h3>
                <span>{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(props.subtotalExpense)}</span>
                <div className="progress" style={{height: "4px"}}>
                <div className="progress-bar bg-danger" role="progressbar" aria-label="Info example" style={{width:`${percentExpense}%`}} aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
                </div>
            </div>
            
            
        </div>
    )
}
export default Balance;