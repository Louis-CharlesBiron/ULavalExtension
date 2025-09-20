#!/usr/bin/env node
import {copyFileSync, mkdirSync, readdirSync, readFileSync, statSync, writeFileSync} from "fs"
import {extname, join} from "path"
import {cwd} from "process"

function copyFolder(src, dest, excludedExtensions) {
    const filepaths = readdirSync(src, {recursive:true}), f_ll = filepaths.length
    for (let i=0;i<f_ll;i++) {
        const filepath = join(src, filepaths[i]), destPath = join(dest, filepaths[i])
        if (statSync(filepath).isDirectory()) {
            mkdirSync(destPath, {recursive:true})
            copyFolder(filepath, destPath, excludedExtensions)
        } else if (!excludedExtensions.includes(extname(filepath).replace(".",""))) copyFileSync(filepath, destPath)
    }
}

// Add user medias
const defaultFolders = ["dist", "buildBin", "node_modules"], includeFolders = ["content"],
      exludeFolderExt = ["jsx", "css", "html", "js"], exludeFileExt = [],
      distRoot = cwd(),
      source = join(distRoot, "src")

readdirSync(source).filter(filepath=>{
    const fullPath = join(source, filepath)
    return statSync(fullPath).isDirectory() && !defaultFolders.includes(filepath) && (readdirSync(fullPath).every(file=>!exludeFolderExt.includes(extname(file).replace(".",""))) || includeFolders.includes(filepath))
}).forEach(folder=>{
    const destination = join(distRoot, "dist", folder)
    mkdirSync(destination, {recursive:true})
    copyFolder(join(source, folder), destination, exludeFileExt)
})

// Add manifest
writeFileSync(join(distRoot, "dist", "manifest.json"), readFileSync(join(cwd(), "manifest.json"), "utf8"))

// Add background
writeFileSync(join(distRoot, "dist", "background.js"), readFileSync(join(source, "background.js"), "utf8"))


console.log("Build completed!")