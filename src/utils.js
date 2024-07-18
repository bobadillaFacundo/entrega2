import path from "path"
import { fileURLToPath } from "url"
import fs from 'fs'
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export default __dirname

export function saveToFile(element, path) {
    fs.writeFileSync(path, JSON.stringify(element), 'utf8')
}

export function getFromFile(path) {
    try {
        const data = fs.readFileSync(path, 'utf8')
        return JSON.parse(data)
    } catch (error) {
        return []
    }
}