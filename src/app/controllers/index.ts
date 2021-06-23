import * as fs from 'fs'

function transformFileNameIntoClass(filename: String) {
  return removeExtension(filename).split('.').map(s => {
     return s.charAt(0).toUpperCase() + s.slice(1)
  }).join('')
}

function removeExtension(filename: String) {
  return filename.substring(0, (filename.length - 3))
}

export const Controllers = async () => {
  const controllersFiles = fs.readdirSync(__dirname)
  const controllersArray = []

  for (const controllerFile of controllersFiles) {
    if (controllerFile.search('controller') > 0 && controllerFile.search('base') < 0) {
      const importController = await import(`./${removeExtension(controllerFile)}`)
      const className = transformFileNameIntoClass(controllerFile)

      controllersArray.push(importController[className])
    }
  }

  return controllersArray
}
