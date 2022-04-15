// you need node +14
// I added this so moving the folder will work on any OS
import { rename, rmdir } from 'fs/promises'
import { fileURLToPath } from 'url'
import { dirname } from 'path'
import ora from 'ora'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const spinner = ora('moving build to docs').start()

try {
  await rmdir(`${__dirname}/docs`, { recursive: true })
  await rename(`${__dirname}/build`, `${__dirname}/docs`)
  spinner.succeed()
} catch (error) {
  spinner.fail()
  console.error(error)
}
