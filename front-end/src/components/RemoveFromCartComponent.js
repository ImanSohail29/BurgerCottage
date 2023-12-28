import { Button } from "react-bootstrap"

const RemoveFromCartComponent=({productId,orderCreated,quantity,size,instructions,selectedAddOns,removeFromCartHandler,index})=>{
    return (
        <Button type="button" variant="secondary" disabled={orderCreated} onClick={removeFromCartHandler?() => removeFromCartHandler(productId,quantity,size,instructions,selectedAddOns,index):undefined}>
                            <i className="bi bi-trash"></i>
                        </Button>
    )
}
export default RemoveFromCartComponent