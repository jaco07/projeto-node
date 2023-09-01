const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const mysql = require('mysql2')
const port = 2222

//RECEBER DADOS DO FRONT-END - JSON
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

//Configurar a TEMPLATE ENGINE  - handlebars
app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')

// Middleware para utilizar os arquivos estáticos
app.use(express.static('public'))

app.get('/', (req, res) => {
    return res.render('home')
})


app.post('/books/insertbook', (req, res) => {
    const { title, nm_paginas } = req.body
    console.log(title, nm_paginas)
    const sql = `INSERT INTO books(title,nm_paginas) VALUES ('${title}','${nm_paginas}')`

    conn.query(sql, function (err) {
        if (err) {
            console.log(err)
            return
        }
        return res.redirect('/')
    })

})

//Listar um LIVRO
app.get('/books/:id', (req,res)=>{
    const id = req.params.id
    // console.log(id)

    const sql = `SELECT * FROM books WHERE id = ${id}`
    conn.query(sql, (err,data)=>{
        if(err){
            console.log(err)
            return
        }
        const book = data[0]
        return res.render('book',{book})
    })
})


//1
app.get('/books/edit/:id', (req,res)=>{
    const id = req.params.id
    // console.log(id)
    const sql = `SELECT * FROM books WHERE id = ${id}`
    conn.query(sql, function (err, data) {
        if (err) {
            console.log(err)
            return
        }
        // console.log(book)
        const book = data[0]
        return res.render('editbook',{book})
})
})

//2
app.post('/books/updatebook', (req,res)=>{
    const {id, title, nm_paginas} = req.body
    // console.log(id,title,nm_paginas)
    
    const sql = `UPDATE books SET title='${title}', nm_paginas = '${nm_paginas}'WHERE id = ${id}`

    conn.query(sql,(err)=>{

        if(err){
            console.log(err)
            return
        }
        return res.redirect('/books')

    })

})

//DELETE
app.get('/books/delete',(req,res)=>{
    const id = req.params.id
    const sql = `DELETE FROM books WHERE id = ${id}`
    conn.query(sql,(err)=>{
        if(err){
            return
        }
    })

    // const sql = `DELETE FROM books WHERE id=${id}`
    // conn.query(sql,[id])
    // console.log('DELETE FROM books ')
})

    




//Rota listar livros
app.get('/books', (req, res) => {
    const sql = 'SELECT * FROM books'
    conn.query(sql, function (err, data) {
        if (err) {
            console.log(err)
            return
        }
        const books = data
        // console.log(books)
       return res.render('books', { books })
    })

})




//Criar conexão com o banco
const conn = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'aluno_medio',
    password: '@lunoSenai23.',
    database: 'banco2'

})
conn.connect(function (err) {
    if (err) {
        console.log(err)
        return
    }
    app.listen(port, () => {
        console.log(`http://localhost:${port}`)
    })
})

