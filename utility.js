//搜索闽南语发音
function getHokkienPron(root){
  var res = '' 
  let prons = root.querySelectorAll('.zhpron')
  //对于每个中文发音，处理不同地方的方音
  for(let i = 0; i < prons.length; i++){
  /*
    let dialect = prons[i].querySelector('.vsSwitcher').querySelector('ul').querySelectorAll('li')
    //对于每个方音，搜索闽南语发音所在的位置
    for(let j = 0; j< dialect.length; j++){
      let t = dialect[j].querySelector('a').getAttribute('title')
      if(t==='w:Min Nan'){
        const minNan = dialect[j].querySelector('dl')
        console.log('Pronounciation'+(i+1)+'\n'+minNan.text)
      }
    }
    */
    let dialect = prons[i].querySelector('.vsSwitcher').querySelector('ul').toString()
    res+='<div style = "border-bottom:1px solid lightgrey;"><h3>發音'+(i+1)+'</h3>'+dialect+'</div>'
  }
  return res
}

//搜索中古汉语发音
function getMiddlePron(root){
  var res = ''
  let prons = root.querySelectorAll('.zhpron')
  //对于每个中文发音，找到中古音所在的dom元素
  for(let i = 0; i < prons.length; i++){
    let d = prons[i].querySelectorAll('div')
    for(let j = 0; j<d.length; j++){
      //找到中古音所在的栏目
      if(d[j].getAttribute('class') === undefined){
        let m = d[j].querySelector('.vsSwitcher').querySelector('.vsHide').toString()
        /*        
        let m = d[j].querySelector('.vsSwitcher').querySelector('.vsHide').querySelector('tbody').querySelectorAll('tr')
        for(let k = 0; k<m.length;k++){
          if(m[k].querySelector('td')==null){
            console.log(m[k])
          }
          else{
            console.log(m[k].querySelector('th')+' '+m[k].querySelector('td'))
          }
        }
        */
        res+=m
      }
    }
  }
  return '<p style = "color:red">術語說明： 平聲: Level (Ø); 上聲: Rising(X); 去聲: Departing (H); 入聲: Checked (Ø) </p>'+res
}

module.exports={
    getHokkienPron:getHokkienPron,
    getMiddlePron:getMiddlePron
}