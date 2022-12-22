import Default from "../../Layouts/Default";
import DemoPie from "../../components/Statistic/DemoPie";
import {useProductContext} from "../../contexts/ProductContext";

function Statistic() {
    const {
        productState: { listProduct },
      } = useProductContext();
    var sumProduct = 0;
    const data = listProduct.map(product => {
      return product.productLine.code;
    })
    var c = data.reduce((count, value) => {
      return count[value] ? count[value]++ : count[value] = 1, count
    }, {});
    var sumProduct = 0;
    var dataSource = Object.keys(c).map(key => { 
        sumProduct += c[key];
        return { type: key, sales: c[key]}
    })

    return(
        <Default tagName="stt">
            <div className="w-11/12 mx-auto mt-5 text-left text-5xl text-blue-600">Thống kê toàn quốc</div>
            <div className="w-5/6 mx-auto mt-20">
            <DemoPie data={dataSource}></DemoPie>
            <div className="mt-5 text-xl text-blue-900 font-bold">Tổng số lượng: {sumProduct}</div>
            </div>
        </Default>
    );

}

export default Statistic;