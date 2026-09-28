const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Usuario = require('../models/usuario')

async function cadastrarUsuario(dados) {
    const { nome, email, senha } = dados

    // 1. Validação de campos obrigatórios
    if (!nome || !email || !senha) {
        return res.status(400).json({ mensagem: 'Nome, e-mail e senha são obrigatórios.' })
    }

    // 2. Verificar se o e-mail já está cadastrado
    const usuarioExistente = await Usuario.findOne({ where: { email } })
    if (usuarioExistente) {
        return res.status(400).json({ mensagem: 'E-mail já cadastrado.' })
    }

    // 3. Criptografar a senha
    const senhaHash = await bcrypt.hash(senha, 10)

    // 4. Criar o usuário no banco de dados
    const usuario = await Usuario.create({
        nome,
        email,
        senha: senhaHash
    })

    return {
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email
    }
}


