const path = require("path")
const fs = require("fs")

const dirPathEN = path.join(__dirname, "../src/contentEN")
const dirPathES = path.join(__dirname, "../src/contentES")

let postlistES = []
let postlistEN = []


const getPostsEN = () => {
    fs.readdir(dirPathEN, (err, files) => {
        if (err) {
            return console.log("Failed to list contents of directory: " + err)
        }
        files.forEach((file, i) => {

            let obj = {}
            let post
            fs.readFile(`${dirPathEN}/${file}`, "utf8", (err, contents) => {
                const getMetadataIndices = (acc, elem, i) => {
                    if (/^---/.test(elem)) {
                        acc.push(i)
                    }
                    return acc
                }
                const parseMetadata = ({lines, metadataIndices}) => {
                    if (metadataIndices.length > 0) {
                        let metadata = lines.slice(metadataIndices[0] + 1, metadataIndices[1])
                        metadata.forEach(line => {
                            obj[line.split(": ")[0]] = line.split(": ")[1]
                        })
                        return obj
                    }
                }
                const parseContent = ({lines, metadataIndices}) => {
                    if (metadataIndices.length > 0) {
                        lines = lines.slice(metadataIndices[1] + 1, lines.length)
                    }
                    return lines.join("\n")
                }
                const lines = contents.split("\n")
                const metadataIndices = lines.reduce(getMetadataIndices, [])
                const metadata = parseMetadata({lines, metadataIndices})
                const content = parseContent({lines, metadataIndices})
                const date = new Date(metadata.date)
                const timestamp = date.getTime() / 1000

//console.log("Articulos en English: " + postlistEN.length)

                post = {
                    id: i + 1,
                    title: metadata.title ? metadata.title : "No title given",
                    metaTitle: metadata.metaTitle ? metadata.metaTitle : "No metaTitle given",
                    metaDescription: metadata.metaDescription ? metadata.metaDescription : "No metaDescription given",
                    read: metadata.read ? metadata.read : "No read given",
                    date: metadata.date ? metadata.date : "No date given",
                    url: metadata.url ? metadata.url : "No url given",
                    imglink: metadata.imglink ? metadata.imglink : "No imglink given",
                    category: metadata.category ? metadata.category : "No category given",
                    content: content ? content : "No content given",
                }

                console.log("Articulos metaTitulo: " + post.metaTitle)

                postlistEN.push(post)
                if (i === files.length - 1) {
                    //Orden de los post segun la fecha de creación
                    const sortedList = postlistEN.sort ((a, b) => {
                        return a.id > b.id ? 1 : -1
                    })

                    //Crea el archivo json
                    //
                    let data = JSON.stringify(sortedList)
                    fs.writeFileSync("src/posts.json", data)
   
                }   
                
            })
        })
    })



    return 
}


//--------------------------Articulos en Español--------------------------

const getPostsES = () => {
    fs.readdir(dirPathES, (err, files) => {
        if (err) {
            return console.log("Failed to list contents of directory: " + err)
        }
        files.forEach((file, i) => {

//console.log("name Archivo: " + file)

            let obj = {}
            let post
            fs.readFile(`${dirPathES}/${file}`, "utf8", (err, contents) => {
                const getMetadataIndices = (acc, elem, i) => {
                    if (/^---/.test(elem)) {
                        acc.push(i)
                    }
                    return acc
                }
                const parseMetadata = ({lines, metadataIndices}) => {
                    if (metadataIndices.length > 0) {
                        let metadata = lines.slice(metadataIndices[0] + 1, metadataIndices[1])
                        metadata.forEach(line => {
                            obj[line.split(": ")[0]] = line.split(": ")[1]
                        })
                        return obj
                    }
                }
                const parseContent = ({lines, metadataIndices}) => {
                    if (metadataIndices.length > 0) {
                        lines = lines.slice(metadataIndices[1] + 1, lines.length)
                    }
                    return lines.join("\n")
                }
                const lines = contents.split("\n")
                const metadataIndices = lines.reduce(getMetadataIndices, [])
                const metadata = parseMetadata({lines, metadataIndices})
                const content = parseContent({lines, metadataIndices})
                const date = new Date(metadata.date)
                const timestamp = date.getTime() / 1000

                

                post = {
                    id: i + 1,
                    title: metadata.title ? metadata.title : "No title given",
                    metaTitle: metadata.metaTitle ? metadata.metaTitle : "No metaTitle given",
                    metaDescription: metadata.metaDescription ? metadata.metaDescription : "No metaDescription given",
                    read: metadata.read ? metadata.read : "No read given",
                    date: metadata.date ? metadata.date : "No date given",
                    url: metadata.url ? metadata.url : "No url given",
                    imglink: metadata.imglink ? metadata.imglink : "No imglink given",
                    category: metadata.category ? metadata.category : "No category given",
                    content: content ? content : "No content given",
                }

//console.log("id: " + post.id + " name: " + post.title + " url: " + post.url + " Fecha: " + post.date + " category: " + post.category )
console.log("Articulos metaTituloES: " + post.metaTitle)

                postlistES.push(post)
                if (i === files.length - 1) {
                    //Orden de los post segun la fecha de creación
                    const sortedList = postlistES.sort ((a, b) => {
                        return a.id < b.id ? 1 : -1
                    })
                    //Crea el archivo json
                    let data = JSON.stringify(sortedList)

                    //console.log("Que es: " + data)
                    //fs.writeFileSync("src/assets/translations/fr.json", data)
                    fs.writeFileSync("src/postsES.json", data)
                }
                
            })
        })
    })



    return 
}

getPostsES()
getPostsEN()

