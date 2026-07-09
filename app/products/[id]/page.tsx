interface Params {
    id: string;
}

const ProductsDetailsPage = ({params: {id}}: {params: Params}) => {
    return ( <h1>Products ID: {id}</h1> );
}
 
export default ProductsDetailsPage;