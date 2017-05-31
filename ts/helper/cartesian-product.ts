export function cartesianProduct(xArr: Array<any>, yArr: Array<any>): Array<{x: any, y: any}> {
    let cartesianProduct: Array<{x: any, y: any}> = [];
    for (let x = 0; x < xArr.length; x++) {
        let currElX = xArr[x];
        for (let y = 0; y < yArr.length; y++) {
            let currElY = yArr[y];
            cartesianProduct.push({
                x: currElX,
                y: currElY
            });
        }
    }
    return cartesianProduct;
}