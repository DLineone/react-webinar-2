import StateModule from "../module";

const QS_OPTIONS = {
  stringify: {
    addQueryPrefix: true,
    arrayFormat: 'comma',
    encode: false
  },
  parse: {
    ignoreQueryPrefix: true,
    comma: true
  }
}

/**
 * Состояние каталога
 */
class CatalogState extends StateModule{

  /**
   * Начальное состояние
   * @return {Object}
   */
  initState() {
    return {
      categoris: []
    };
  }

  /**
   * Инициализация параметров.
   * Восстановление из query string адреса
   * @param params
   * @return {Promise<void>}
   */

  async init(){
    const respons = await fetch(`/api/v1/categories?limit=*`)
    const json = await respons.json();
    let data =  json.result.items.map((categori)=>{
      return {title: categori.title, id: categori._id, key: categori._key, parentKey: categori?.parent?._key}
    });
    let data2 = [];
    for(;data.length > 0;)
    {
      if(data.find((elem)=>elem.parentKey === undefined))
      {
        data2.push(...data.splice(data.findIndex((elem) => elem.parentKey === undefined), 1));
      }
      else
      {
        let elem = data.shift();
        data2.splice(
          data2.findIndex((elem1)=> elem1.key === elem.parentKey) + 1,
          0,
          elem);
      }
    }

    function predicatFunc (dataArr, predicat, item)
    {if(item.parentKey === undefined) return predicat;
      
      return predicatFunc(dataArr, predicat + '- ', dataArr[dataArr.findIndex((elem)=> elem.key === item.parentKey)])
    }
    
    let data3 = data2.map((elem) => {

      return {...elem, title: predicatFunc(data2, '', elem) + elem.title}
    });
    let data4 = data3.map((elem) => {return{value: elem.id, title: elem.title}})
    data4.unshift({value: '', title: 'Все'});
    console.log(json.result);
    this.setState({
      ...this.getState(),
      categoris: data4
    });
  }

  

}

export default CatalogState;
