import conn from "../config/conn.js"

const tabelaProdutos = /*sql*/`
CREATE TABLE IF NOT EXISTS produtos(
 produto_id VARCHAR(60) PRIMARY KEY,
 usuario_id VARCHAR(60) NOT NULL,
 titulo VARCHAR(255) NOT NULL,
 genero VARCHAR(255) NOT NULL,
 desenvolvedor VARCHAR(50) NOT NULL,
 data_lancamento DATE NOT NULL,
 created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
 updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
 FOREIGN KEY(usuario_id) REFERENCES usuarios(usuario_id)
)
`
conn.query(tabelaProdutos, (err, results, fields) => {
 if (err) {
  console.log(err)
  return
 }
 console.log("Tabela [produtos] criada")
})
