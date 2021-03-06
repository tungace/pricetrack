const { regexProcess } = require('../utils/parser/utils')
const chrome = require('chrome-aws-lambda')
const puppeteer = require('puppeteer-core')
const { initDataJajum } = require('../utils/fetch')

let browser = null

const adayroiSnippetData = async (params) => {
  browser = browser || await puppeteer.launch({
    args: chrome.args,
    executablePath: await chrome.executablePath,
    headless: chrome.headless,
  })

  const url = `https://www.adayroi.com/abc-p-${params.product_id}`
  const page = await browser.newPage()
  await page.goto(url)

  // Get the "viewport" of the page, as reported by the page.
  const json = await page.evaluate(() => {
    return JSON.parse(document.getElementById('detailSnippet').innerText)
  })

  json['product_id'] = params.product_id

  delete json.review
  console.info(json)

  return json
  
}

module.exports = {
  website: 'Adayroi',
  domain: 'adayroi.com',
  color: '#189eff',
  logo: 'https://i.imgur.com/e6AX9Lb.png',
  time_check: 15,
  active: true,

  // Get {productId} and {shopId}
  // https://www.adayroi.com/vsmart-active-1-6gb-64gb-den-p-2087332
  productId: u => regexProcess(u, /-p-([A-Z]*([0-9]+))/, 1),
  shopId: u => null,
  required: ['productId'],

  product_api: adayroiSnippetData,
  format_func: json => {
    let offers = json.offers || {}
    let price = offers.price || 0
    let is_deal = false
    let qty = 0
    let product_id = json.product_id
    let inventory_status = price > 0 ? true : false
    return { price, is_deal, qty, product_id, inventory_status }
  },

  // TODO: rename this attr
  product_info_api: adayroiSnippetData,
  format_product_info: json => {
    let offers = json.offers || {}
    let { name, description, image } = json
    let priceCurrency = offers.priceCurrency || ''
    return { name, description, currency: priceCurrency, image }
  },

  init_data: async params => initDataJajum('adayroi.com', params)
}