import {Helmet,HelmetProvider} from "react-helmet-async"
const MetaComponent=({title="Burger Cottage",description="Order Yummiest Fast Food at your Doorstep"})=>{
    return (
        <HelmetProvider>
            <Helmet>
                <title>{title}</title>
                <meta name="description" content={description}></meta>
            </Helmet>
        </HelmetProvider>
    )
}
export default MetaComponent