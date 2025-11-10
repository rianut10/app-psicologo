import { supabase } from './supabase'

// 👤 Tipos para o sistema de usuários
export interface User {
  id: string
  nome: string
  email: string
  data_cadastro: string
  created_at: string
  updated_at: string
}

export interface PremiumPlan {
  id: string
  user_id: string
  ativo: boolean
  data_inicio: string | null
  data_fim: string | null
  valor_mensal: number
  created_at: string
  updated_at: string
}

export interface PremiumBenefit {
  id: string
  titulo: string
  descricao: string
  icone: string
  ativo: boolean
  created_at: string
}

export interface DiaryEntry {
  id: string
  user_id: string
  titulo: string | null
  conteudo: string
  humor: string | null
  tags: string[]
  data_entrada: string
  created_at: string
  updated_at: string
}

export interface UserFavorite {
  id: string
  user_id: string
  item_type: 'book' | 'music'
  item_id: string
  item_title: string
  created_at: string
}

// 🔐 Funções de Autenticação
export const authService = {
  // Registrar novo usuário
  async signUp(email: string, password: string, nome: string) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          nome
        }
      }
    })
    
    if (error) throw error
    return data
  },

  // Login
  async signIn(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    })
    
    if (error) throw error
    return data
  },

  // Logout
  async signOut() {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
  },

  // Obter usuário atual
  async getCurrentUser() {
    const { data: { user } } = await supabase.auth.getUser()
    return user
  }
}

// 💎 Funções do Plano Premium
export const premiumService = {
  // Verificar se usuário tem plano premium ativo
  async checkPremiumStatus(userId: string): Promise<boolean> {
    const { data, error } = await supabase
      .from('premium_plan')
      .select('*')
      .eq('user_id', userId)
      .eq('ativo', true)
      .gte('data_fim', new Date().toISOString())
      .single()

    if (error && error.code !== 'PGRST116') throw error
    return !!data
  },

  // Obter plano premium do usuário
  async getUserPlan(userId: string): Promise<PremiumPlan | null> {
    const { data, error } = await supabase
      .from('premium_plan')
      .select('*')
      .eq('user_id', userId)
      .single()

    if (error && error.code !== 'PGRST116') throw error
    return data
  },

  // Ativar plano premium
  async activatePremium(userId: string, months: number = 1) {
    const dataInicio = new Date()
    const dataFim = new Date()
    dataFim.setMonth(dataFim.getMonth() + months)

    const { data, error } = await supabase
      .from('premium_plan')
      .upsert({
        user_id: userId,
        ativo: true,
        data_inicio: dataInicio.toISOString(),
        data_fim: dataFim.toISOString(),
        valor_mensal: 9.90
      })
      .select()
      .single()

    if (error) throw error
    return data
  },

  // Obter todas as vantagens premium
  async getPremiumBenefits(): Promise<PremiumBenefit[]> {
    const { data, error } = await supabase
      .from('premium_benefits')
      .select('*')
      .eq('ativo', true)
      .order('created_at')

    if (error) throw error
    return data || []
  }
}

// 📔 Funções do Diário
export const diaryService = {
  // Criar nova entrada no diário
  async createEntry(userId: string, entry: Omit<DiaryEntry, 'id' | 'user_id' | 'created_at' | 'updated_at'>) {
    const { data, error } = await supabase
      .from('diary_entries')
      .insert({
        user_id: userId,
        ...entry
      })
      .select()
      .single()

    if (error) throw error
    return data
  },

  // Obter entradas do diário do usuário
  async getUserEntries(userId: string, limit: number = 50): Promise<DiaryEntry[]> {
    const { data, error } = await supabase
      .from('diary_entries')
      .select('*')
      .eq('user_id', userId)
      .order('data_entrada', { ascending: false })
      .limit(limit)

    if (error) throw error
    return data || []
  },

  // Atualizar entrada do diário
  async updateEntry(entryId: string, updates: Partial<DiaryEntry>) {
    const { data, error } = await supabase
      .from('diary_entries')
      .update({
        ...updates,
        updated_at: new Date().toISOString()
      })
      .eq('id', entryId)
      .select()
      .single()

    if (error) throw error
    return data
  },

  // Deletar entrada do diário
  async deleteEntry(entryId: string) {
    const { error } = await supabase
      .from('diary_entries')
      .delete()
      .eq('id', entryId)

    if (error) throw error
  }
}

// ⭐ Funções de Favoritos
export const favoritesService = {
  // Adicionar aos favoritos
  async addFavorite(userId: string, itemType: 'book' | 'music', itemId: string, itemTitle: string) {
    const { data, error } = await supabase
      .from('user_favorites')
      .insert({
        user_id: userId,
        item_type: itemType,
        item_id: itemId,
        item_title: itemTitle
      })
      .select()
      .single()

    if (error) throw error
    return data
  },

  // Remover dos favoritos
  async removeFavorite(userId: string, itemType: 'book' | 'music', itemId: string) {
    const { error } = await supabase
      .from('user_favorites')
      .delete()
      .eq('user_id', userId)
      .eq('item_type', itemType)
      .eq('item_id', itemId)

    if (error) throw error
  },

  // Obter favoritos do usuário
  async getUserFavorites(userId: string, itemType?: 'book' | 'music'): Promise<UserFavorite[]> {
    let query = supabase
      .from('user_favorites')
      .select('*')
      .eq('user_id', userId)

    if (itemType) {
      query = query.eq('item_type', itemType)
    }

    const { data, error } = await query.order('created_at', { ascending: false })

    if (error) throw error
    return data || []
  },

  // Verificar se item está nos favoritos
  async isFavorite(userId: string, itemType: 'book' | 'music', itemId: string): Promise<boolean> {
    const { data, error } = await supabase
      .from('user_favorites')
      .select('id')
      .eq('user_id', userId)
      .eq('item_type', itemType)
      .eq('item_id', itemId)
      .single()

    if (error && error.code !== 'PGRST116') throw error
    return !!data
  }
}

// 📊 Funções de Analytics (para usuários premium)
export const analyticsService = {
  // Obter estatísticas do diário
  async getDiaryStats(userId: string, days: number = 30) {
    const startDate = new Date()
    startDate.setDate(startDate.getDate() - days)

    const { data, error } = await supabase
      .from('diary_entries')
      .select('humor, data_entrada')
      .eq('user_id', userId)
      .gte('data_entrada', startDate.toISOString().split('T')[0])

    if (error) throw error
    return data || []
  },

  // Contar entradas por mês
  async getMonthlyEntryCount(userId: string) {
    const { data, error } = await supabase
      .from('diary_entries')
      .select('data_entrada')
      .eq('user_id', userId)

    if (error) throw error
    
    // Agrupar por mês
    const monthCounts: { [key: string]: number } = {}
    data?.forEach(entry => {
      const month = entry.data_entrada.substring(0, 7) // YYYY-MM
      monthCounts[month] = (monthCounts[month] || 0) + 1
    })

    return monthCounts
  }
}