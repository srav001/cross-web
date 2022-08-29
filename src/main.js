import { execute, executeWithSync } from "./utils.js";
import { renameSync } from 'node:fs'

const init = () => {

  const currPath = "./cross-web"
  const newPath = "./new-directory-name"

  try {
    // mkdirSync(currPath, { recursive: true })
    executeWithSync('git clone https://github.com/srav001/cross-web.git')
    renameSync(currPath, newPath)
    executeWithSync(`cd ${newPath} && pnpm project-setup`)
    console.log("Successfully renamed the directory.")
  } catch(err) {
    console.error(err)
  }

  console.log('done')
}

init();

export {
  init
}