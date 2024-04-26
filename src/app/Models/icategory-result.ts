export interface ICategoryResult {
    category: {
        id: number,
        name: string
    },
    specificationsDtos: 
        {
            id: number,
            name: string , 
            isChecked:boolean,
        }[ ]
}
