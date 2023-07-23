import './css/Details.css';


function DetailsExpense(props){
    let classificationExpense = []



    props.expenseFull.forEach((e)=> classificationExpense.push(e.class))
    let classificationExpenseUnique = [... new Set(classificationExpense)]

    let arrCategoy = []

    classificationExpenseUnique.map((e, index)=> {
        


        let item = {   

            category: e,
            value: props.expenseFull.reduce((accumulator, currentValue)=> currentValue.class == e ? parseInt(accumulator) + parseInt(currentValue.value) : accumulator, 0),
            percent: (props.expenseFull.reduce((accumulator, currentValue)=> currentValue.class == e ? parseInt(accumulator) + parseInt(currentValue.value) : accumulator, 0))*100/props.subtotalExpense

        }


        arrCategoy.push(item)
    })



 

    return(
        <>

        <div className="expense_details_container">
            
        {
            arrCategoy.map((e, index)=>
            
            <div key={index} className='expense_details_item'>
                <h4>{e.category + ' - ' + e.percent.toFixed(2)+"%" }</h4>
                <span>
                    {
                        new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(e.value)
                        
                    }
                    
                </span>
                <div className="progress" style={{height: '4px', maxWidth:'100%', minWidth: '200px'}}>
                        <div className="progress-bar bg-danger" role="progressbar" aria-label="Basic example"   aria-valuenow="25" aria-valuemin="0" aria-valuemax="100" style={{width: e.percent}} ></div>
                    </div>
            </div>
            )
        }
        </div>

        
       
        </>
    )
}
export default DetailsExpense;
