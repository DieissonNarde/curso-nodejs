/*
  0 Obter um usuario
  1 Obter o numero de telefone de um usuario a partir do seu ID
  2 Obter o endereco do usuario pelo ID
*/

// importamos um modulo interno do node.js
const util = require('util')

const obterEnderecoAsync = util.promisify(obterEndereco)

function obterUsuario() {
  // quando der algum problema -> reject(ERRO)
  return new Promise(function resolvePromise(resolve, reject) {
    setTimeout(function () {
      // return reject(new Error('Deu ruim de verdade!'))

      return resolve({
        id: 1,
        nome: 'Miranha',
        dataNascimento: new Date()
      })
    }, 1000)
  })
}

function obterTelefone(idUsuario) {
  return new Promise(function resolvePromise(resolve, reject) {
    setTimeout(() => {
      return resolve({
        telefone: '1199999',
        ddd: '11'
      })
    }, 2000)
  })
}

function obterEndereco(idUsuario, callback) {
  setTimeout(() => {
    return callback(null, {
      rua: 'ipanema',
      numero: 0
    })
  }, 2000)
}

// 1- Adicionar a palavra async -> automaticamente ele retornara uma Promise
main()
async function main() {
  try {
    console.time('medida-promise')
    const usuario = await obterUsuario()
    // const telefone = await obterTelefone(usuario.id)
    // const endereco = await obterEnderecoAsync(usuario.id)

    const resultado = await Promise.all([
      obterTelefone(usuario.id),
      obterEnderecoAsync(usuario.id)
    ])
    const endereco = resultado[1]
    const telefone = resultado[0]

    console.log(`
      Nome: ${usuario.nome}
      Telefone: (${telefone.ddd}) ${telefone.telefone}
      Endereco: ${endereco.rua}, ${endereco.numero}
    `)
    console.timeEnd('medida-promise')
  } catch (error) {
    console.error('DEU RUIM', error)
  }
}

// const usuarioPromise = obterUsuario()
// para manipular o sucesso usamos a funcao .then
// para manipular erros, usamos o .catch
// usuario -> telefone -> telefone
// usuarioPromise
//   .then(function (usuario) {
//     return obterTelefone(usuario.id).then(function resolverTelefone(result) {
//       return {
//         usuario: {
//           nome: usuario.nome,
//           id: usuario.id
//         },
//         telefone: result
//       }
//     })
//   })
//   .then(function (resultado) {
//     const endereco = obterEnderecoAsync(resultado.usuario.id)
//     return endereco.then(function resolverEndereco(result) {
//       return {
//         usuario: resultado.usuario,
//         telefone: resultado.telefone,
//         endereco: result
//       }
//     })
//   })
//   .then(function (resultado) {
//     console.log(`
//       Nome: ${resultado.usuario.nome}
//       Endereco: ${resultado.endereco.rua}, ${resultado.endereco.numero}
//       Telefone: (${resultado.telefone.ddd}) ${resultado.telefone.telefone}
//     `)
//   })
//   .catch(function (error) {
//     console.error('Deu ruim', error)
//   })

// obterUsuario(function resolverUsuario(error) {
//   // null || "" || 0 === false
//   if (error) {
//     console.error('Deu ruim em usuario', error)
//     return
//   }

//   obterTelefone(usuario.id, function resolverUsuario(error, telefone) {
//     if (error) {
//       console.error('Deu ruim em telefone', error)
//       return
//     }

//     obterEndereco(usuario.id, function resolverEndereco(error2, endereco) {
//       if (error2) {
//         console.error('Deu ruim em endereco', error2)
//         return
//       }

//       console.log(`
//         Nome: ${usuario.nome},
//         Endereco: ${endereco.rua}, ${endereco.numero},
//         Telefone: (${telefone.ddd}) ${telefone.telefone}
//       `)
//     })
//   })
// })
