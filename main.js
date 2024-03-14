const path = require("path")
const fs = require("fs")
const { post } = require("jquery")

const dirPathEN = path.join(__dirname, "../src/assets/posts/en")
const dirPathES = path.join(__dirname, "../src/assets/posts/es")

let postlistES = []
let postlistEN = []

let sizeEn;
let sizeEs;

let urlsEn;
let urlsEs;

//--------------------------Articulos en Ingles--------------------------//

const getPostsEN = (callback) => {
    fs.readdir(dirPathEN, (err, files) => {
        if (err) {
            return console.log("Failed to list contents of directory: " + err)
        }

const archivos = files.filter(file => fs.statSync(path.join(dirPathEN, file)).isFile());
    // Cuenta el número de archivos
    const cantidadArchivos = archivos.length;
    console.log('archivos EN: ',cantidadArchivos);

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

                post = {
                    id: timestamp,
                    title: metadata.title ? metadata.title : "No title given",
                    metaTitle: metadata.metaTitle ? metadata.metaTitle : "No metaTitle given",
                    meta_description: metadata.meta_description ? metadata.meta_description : "No meta_description given",
                    read: metadata.read ? metadata.read : "No read given",
                    date: metadata.date ? metadata.date : "No date given",
                    url: metadata.url ? metadata.url : "No url given",
                    imglink: metadata.imglink ? metadata.imglink : "No imglink given",
                    category: metadata.category ? metadata.category : "No category given",
                    content: content ? content : "No content given",
                }

    //console.log("<url><loc>http://www.dreamcodesoft.com/blog/" + post.url + "</loc><lastmod>2022-06-28T09:41:04+01:00</lastmod><priority>0.6</priority></url>")
    //console.log("<url><loc>http://www.dreamcodesoft.com/blog/" + post.url + "</loc><lastmod>2022-06-28T09:41:04+01:00</lastmod><priority>0.6</priority></url>")        
    //console.log("EN - fecha: " + post.date + " Id: " + post.id  +  " Url: " + post.url)


/*
console.log( "<url><loc>https://www.dreamcodesoft.com/blog/" + 
post.url + "</loc><xhtml:link rel='alternate' hreflang='en' href='https://www.dreamcodesoft.com/en/blog/" + 
post.url + "' /><xhtml:link rel='alternate' hreflang='es' href='https://www.dreamcodesoft.com/es/blog/" + 
post.url + "' /><xhtml:link rel='alternate' hreflang='es' href='https://www.dreamcodesoft.com/blog/" + 
post.url + "' /></url><url><loc>https://www.dreamcodesoft.com/es/blog/" + 
post.url + "</loc><xhtml:link rel='alternate' hreflang='en' href='https://www.dreamcodesoft.com/en/blog/" + 
post.url + "' /><xhtml:link rel='alternate' hreflang='es' href='https://www.dreamcodesoft.com/es/blog/" + 
post.url + "' /><xhtml:link rel='alternate' hreflang='es' href='https://www.dreamcodesoft.com/blog/" + 
post.url + "' /></url><url><loc>https://www.dreamcodesoft.com/en/blog/" + 
post.url + "</loc><xhtml:link rel='alternate' hreflang='en' href='https://www.dreamcodesoft.com/en/blog/" + 
post.url + "' /><xhtml:link rel='alternate' hreflang='es' href='https://www.dreamcodesoft.com/es/blog/" + 
post.url + "' /><xhtml:link rel='alternate' hreflang='es' href='https://www.dreamcodesoft.com/blog/" + 
post.url + "' /></url>")*/


                postlistEN.push(post)
                if (i === files.length - 1) {
                    //Orden de los post segun la fecha de creación
                    const sortedList = postlistEN.sort ((a, b) => {
                        return a.id < b.id ? 1 : -1
                    })

                    sizeEn = sortedList.length; // Guarda el tamaño de sortedList en la variable sizeEs

                    urlsEn = sortedList.map(post => post.url); // Guarda las urls de la lista
                    
                    
                    //Crea el archivo json
                    let data = JSON.stringify(sortedList)
                    fs.writeFileSync("src/assets/posts/postsEn.json", data)
   
                    console.log('Post EN: ', sizeEn);
                    callback();
                }   
                
            })
        })
    })
    return 
}


//--------------------------Articulos en Español--------------------------//

const getPostsES = (callback) => {

   
    fs.readdir(dirPathES, (error, files) => {
        if (error) {
            return console.log("Failed to list contents of directory: " + error)
        }

        const archivos = files.filter(file => fs.statSync(path.join(dirPathES, file)).isFile());
    // Cuenta el número de archivos
    const cantidadArchivos = archivos.length;
    console.log('archivos ES: ',cantidadArchivos);

        files.forEach((file, i) => {

            let obj = {}
            let post;
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
                    id: timestamp,
                    title: metadata.title ? metadata.title : "No title given",
                    metaTitle: metadata.metaTitle ? metadata.metaTitle : "No metaTitle given",
                    meta_description: metadata.meta_description ? metadata.meta_description : "No meta_description given",
                    read: metadata.read ? metadata.read : "No read given",
                    date: metadata.date ? metadata.date : "No date given",
                    url: metadata.url ? metadata.url : "No url given",
                    imglink: metadata.imglink ? metadata.imglink : "No imglink given",
                    category: metadata.category ? metadata.category : "No category given",
                    content: content ? content : "No content given",
                }
    
                //console.log("ES - Id: " + post.id  +  " Url: " + post.url)
                
                //console.log("<url><loc>http://www.dreamcodesoft.com/" + post.url + "/</loc><lastmod>2021-12-24T09:41:04+01:00</lastmod><priority>0.6</priority></url>")

                postlistES.push(post)
                if (i === files.length - 1) {
                    //Orden de los post segun la fecha de creación
                    const sortedList = postlistES.sort ((a, b) => {
                        return a.id < b.id ? 1 : -1
                    })

                    sizeEs = sortedList.length; // Guarda el tamaño de sortedList en la variable sizeEs
                    urlsEs = sortedList.map(post => post.url); // Guarda las urls de la lista
                    
                    //Crea el archivo json
                    let data = JSON.stringify(sortedList)

                    fs.writeFileSync("src/assets/posts/postsEs.json", data)

                    console.log('Post ES: ', sizeEs);
                    callback();
                }
     
            })
        })
    })



    return 
}



getPostsES(() => {
    getPostsEN(() => {

        const resultado = sizeEn === sizeEs ? 'Bien' : 'Error';
        console.log('Coinciden: ', resultado);


    });
});
