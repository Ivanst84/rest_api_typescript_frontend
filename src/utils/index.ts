
export function formatCurrency(amount:number){

    return new Intl.NumberFormat('es-ES',{
        style: 'currency',
        currency: 'MXN',
        minimumFractionDigits: 2
    }).format(amount)
}
export function toBoolean(str:string){
    return str.toLocaleLowerCase() === 'true'
}