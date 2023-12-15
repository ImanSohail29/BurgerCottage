import { Button } from "react-bootstrap"

const RemoveFromCartComponent=({productId,orderCreated,quantity,size,instructions,removeFromCartHandler})=>{
    return (
        <Button type="button" variant="secondary" disabled={orderCreated} onClick={removeFromCartHandler?() => removeFromCartHandler(productId,quantity,size,instructions):undefined}>
                            <i className="bi bi-trash"></i>
                        </Button>
    )
}
export default RemoveFromCartComponent