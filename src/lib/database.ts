import { supabase } from './supabase'
import type { User, Workout, NutritionPlan, Meal, Progress } from './supabase'

// Funções de autenticação
export const authService = {
  // Cadastro de usuário
  async signUp(email: string, password: string, userData: Partial<User>) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    })

    if (error) throw error

    // Criar perfil do usuário
    if (data.user) {
      const { error: profileError } = await supabase
        .from('users')
        .insert({
          id: data.user.id,
          email,
          ...userData,
        })

      if (profileError) throw profileError
    }

    return data
  },

  // Login
  async signIn(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
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
  },

  // Obter perfil completo do usuário
  async getUserProfile(userId: string) {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .single()

    if (error) throw error
    return data
  },

  // Atualizar perfil do usuário
  async updateUserProfile(userId: string, updates: Partial<User>) {
    const { data, error } = await supabase
      .from('users')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', userId)
      .select()
      .single()

    if (error) throw error
    return data
  }
}

// Funções para treinos
export const workoutService = {
  // Criar treino
  async createWorkout(workout: Omit<Workout, 'id' | 'created_at'>) {
    const { data, error } = await supabase
      .from('workouts')
      .insert(workout)
      .select()
      .single()

    if (error) throw error
    return data
  },

  // Obter treinos do usuário
  async getUserWorkouts(userId: string) {
    const { data, error } = await supabase
      .from('workouts')
      .select('*')
      .eq('user_id', userId)
      .order('date', { ascending: false })

    if (error) throw error
    return data
  },

  // Atualizar treino
  async updateWorkout(workoutId: string, updates: Partial<Workout>) {
    const { data, error } = await supabase
      .from('workouts')
      .update(updates)
      .eq('id', workoutId)
      .select()
      .single()

    if (error) throw error
    return data
  },

  // Deletar treino
  async deleteWorkout(workoutId: string) {
    const { error } = await supabase
      .from('workouts')
      .delete()
      .eq('id', workoutId)

    if (error) throw error
  }
}

// Funções para planos de nutrição
export const nutritionService = {
  // Criar plano de nutrição
  async createNutritionPlan(plan: Omit<NutritionPlan, 'id' | 'created_at'>) {
    const { data, error } = await supabase
      .from('nutrition_plans')
      .insert(plan)
      .select()
      .single()

    if (error) throw error
    return data
  },

  // Obter planos do usuário
  async getUserNutritionPlans(userId: string) {
    const { data, error } = await supabase
      .from('nutrition_plans')
      .select(`
        *,
        meals (*)
      `)
      .eq('user_id', userId)
      .order('created_at', { ascending: false })

    if (error) throw error
    return data
  },

  // Adicionar refeição ao plano
  async addMealToPlan(meal: Omit<Meal, 'id'>) {
    const { data, error } = await supabase
      .from('meals')
      .insert(meal)
      .select()
      .single()

    if (error) throw error
    return data
  },

  // Obter refeições de um plano
  async getPlanMeals(planId: string) {
    const { data, error } = await supabase
      .from('meals')
      .select('*')
      .eq('nutrition_plan_id', planId)
      .order('time', { ascending: true })

    if (error) throw error
    return data
  },

  // Atualizar refeição
  async updateMeal(mealId: string, updates: Partial<Meal>) {
    const { data, error } = await supabase
      .from('meals')
      .update(updates)
      .eq('id', mealId)
      .select()
      .single()

    if (error) throw error
    return data
  },

  // Deletar refeição
  async deleteMeal(mealId: string) {
    const { error } = await supabase
      .from('meals')
      .delete()
      .eq('id', mealId)

    if (error) throw error
  }
}

// Funções para progresso (preparado para futuras funcionalidades)
export const progressService = {
  // Registrar progresso
  async recordProgress(progress: Omit<Progress, 'id' | 'created_at'>) {
    const { data, error } = await supabase
      .from('progress')
      .insert(progress)
      .select()
      .single()

    if (error) throw error
    return data
  },

  // Obter histórico de progresso
  async getUserProgress(userId: string) {
    const { data, error } = await supabase
      .from('progress')
      .select('*')
      .eq('user_id', userId)
      .order('date', { ascending: false })

    if (error) throw error
    return data
  }
}