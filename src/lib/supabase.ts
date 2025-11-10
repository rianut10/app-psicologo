import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Tipos para o banco de dados
export interface User {
  id: string
  email: string
  name: string
  age?: number
  weight?: number
  height?: number
  objectives?: string
  created_at: string
  updated_at: string
}

export interface Workout {
  id: string
  user_id: string
  name: string
  type: string
  duration: number // em minutos
  intensity: 'baixa' | 'moderada' | 'alta'
  date: string
  notes?: string
  created_at: string
}

export interface NutritionPlan {
  id: string
  user_id: string
  name: string
  total_calories: number
  created_at: string
}

export interface Meal {
  id: string
  nutrition_plan_id: string
  name: string
  calories: number
  proteins: number // em gramas
  carbs: number // em gramas
  fats: number // em gramas
  time: string // formato HH:MM
  description?: string
}

export interface Progress {
  id: string
  user_id: string
  date: string
  weight?: number
  body_fat?: number
  muscle_mass?: number
  notes?: string
  created_at: string
}