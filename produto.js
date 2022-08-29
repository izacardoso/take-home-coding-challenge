const cheerio = require('cheerio')
const request = require('request')
const fs = require('fs')

const url = 'https://storage.googleapis.com/infosimples-public/commercia/case/product.html'

const respostaFinal = {}

request(url, function(error, response, body){
    const parsedHtml = cheerio.load(body)

    respostaFinal['title'] = parsedHtml('h2#product_title').text()

    const infosBrand = parsedHtml('div#product_S0002201').text().split('\n').map(element => {
        return element.trim()
      }).filter(e =>  e)

    
        respostaFinal['brand']= infosBrand[0]

    respostaFinal['categories'] = parsedHtml('.current-category').text().split('\n').map(element => {
        return element.trim()
       }).filter(e =>  e)

    const infosDescription = parsedHtml('p').text().split('\n').map(element => {
        return element.trim()
       }).filter(e =>  e)
    
        respostaFinal['Description']= infosDescription[1]

    const infoReviews = parsedHtml('#comments').text().split('\n').map(element => {
        return element.trim()
      }).filter(e =>  e)
    
        respostaFinal['reviews']= infoReviews[1]

    respostaFinal['url'] = url


    const jsonRespostaFinal = JSON.stringify(respostaFinal)

    fs.writeFile('produto.json', jsonRespostaFinal, function(erro){
        if(erro){
            console.log(erro)
        } else{
            console.log('Arquivo salvo com sucesso')
        }
    })
})