import { fileOpen, fileSave } from "browser-fs-access"

export const readFile = async ()=> {
  const blob = await fileOpen({
    mimeTypes: ['application/json'],
  });
  return JSON.parse(await blob.text())
}

export const writeFile = async ( data, name )=> {
  const blob = new Blob([JSON.stringify(data, null, 2)], {
    type: 'application/json'
  });
  await fileSave(blob, {
    fileName: `${name}.json`,
    extensions: ['.json'],
  });
}