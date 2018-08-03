class FileController {
  static checkFileSize(obj) {
    var { file, sizeLimit = 0 } = obj
    return sizeLimit > 0 && file.size < sizeLimit
  }
}

export { FileController as default }