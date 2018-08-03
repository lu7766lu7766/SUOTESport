import store from 'src/store'

class SEOController {

  static proccess() {
    var branch = store.state.Login.branch
    if (!branch) return
    var data = branch.p32_bch_other_data
    var seoMeta = {
      keywords: data.bch_keywords,
      description: data.bch_description,
      content: data.bch_content
    }
    this.addScript(_.pickBy(seoMeta))
    $('title').prependTo('head')
  }

  static addScript(meta) {
    var head = ""
    _.forEach(meta, (val, key) => {
      head += `<meta name="${key}" content="${meta[key]}" />`
    })
    $("head").prepend(head)
  }
}

export { SEOController as default }