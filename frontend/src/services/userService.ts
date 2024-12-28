import { api } from './api'

export const userService = {
    async criarTabela() {
        return await api.get('/')
    },
    
    async criarUsuario(nome: string, email: string, senha: string) {
        return await api.post('/create', { nome, email, senha })
    },
    
    async deletarUsuario(id: number) {
        return await api.delete(`/delete/${id}`)
    }
}