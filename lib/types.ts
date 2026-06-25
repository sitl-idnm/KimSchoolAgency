export type UserRole = 'student' | 'parent' | 'admin'
export type CourseType = 'starter' | 'full' | 'personal'
export type EnrollmentStatus = 'active' | 'completed' | 'paused'
export type PaymentStatus = 'pending' | 'succeeded' | 'cancelled' | 'refunded'
export type PaymentProvider = 'yokassa' | 'stripe'

// ── Row types ────────────────────────────────────────────────────────────────

export interface ProfileRow {
  id: string
  full_name: string | null
  email: string | null
  role: UserRole
  avatar_url: string | null
  created_at: string
}

export interface CourseRow {
  id: string
  title: string
  description: string | null
  slug: string | null
  type: CourseType
  price_rub: number | null
  modules: number
  is_published: boolean
  created_at: string
}

export interface EnrollmentRow {
  id: string
  user_id: string
  course_id: string
  status: EnrollmentStatus
  payment_id: string | null
  enrolled_at: string
}

export interface LessonRow {
  id: string
  course_id: string
  module_num: number
  lesson_num: number
  title: string
  description: string | null
  content_url: string | null
  duration_minutes: number | null
  is_free: boolean
  created_at: string
}

export interface LessonProgressRow {
  id: string
  user_id: string
  lesson_id: string
  completed_at: string | null
  watched_seconds: number
}

export interface PaymentRow {
  id: string
  user_id: string
  course_id: string
  amount: number
  currency: string
  provider: PaymentProvider
  provider_payment_id: string | null
  status: PaymentStatus
  created_at: string
}

export interface LeadRow {
  id: string
  name: string | null
  phone: string | null
  email: string | null
  child_age: number | null
  message: string | null
  source: string
  created_at: string
}

// ── Supabase Database type ───────────────────────────────────────────────────

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: ProfileRow
        Insert: {
          id: string
          full_name?: string | null
          email?: string | null
          role?: UserRole
          avatar_url?: string | null
        }
        Update: {
          full_name?: string | null
          email?: string | null
          role?: UserRole
          avatar_url?: string | null
        }
        Relationships: []
      }
      courses: {
        Row: CourseRow
        Insert: {
          title: string
          description?: string | null
          slug?: string | null
          type?: CourseType
          price_rub?: number | null
          modules?: number
          is_published?: boolean
        }
        Update: {
          title?: string
          description?: string | null
          slug?: string | null
          type?: CourseType
          price_rub?: number | null
          modules?: number
          is_published?: boolean
        }
        Relationships: []
      }
      enrollments: {
        Row: EnrollmentRow
        Insert: {
          user_id: string
          course_id: string
          status?: EnrollmentStatus
          payment_id?: string | null
        }
        Update: {
          status?: EnrollmentStatus
          payment_id?: string | null
        }
        Relationships: [
          { foreignKeyName: 'enrollments_user_id_fkey'; columns: ['user_id']; referencedRelation: 'profiles'; referencedColumns: ['id'] },
          { foreignKeyName: 'enrollments_course_id_fkey'; columns: ['course_id']; referencedRelation: 'courses'; referencedColumns: ['id'] },
        ]
      }
      lessons: {
        Row: LessonRow
        Insert: {
          course_id: string
          module_num: number
          lesson_num: number
          title: string
          description?: string | null
          content_url?: string | null
          duration_minutes?: number | null
          is_free?: boolean
        }
        Update: {
          title?: string
          description?: string | null
          content_url?: string | null
          duration_minutes?: number | null
          is_free?: boolean
        }
        Relationships: [
          { foreignKeyName: 'lessons_course_id_fkey'; columns: ['course_id']; referencedRelation: 'courses'; referencedColumns: ['id'] },
        ]
      }
      lesson_progress: {
        Row: LessonProgressRow
        Insert: {
          user_id: string
          lesson_id: string
          completed_at?: string | null
          watched_seconds?: number
        }
        Update: {
          completed_at?: string | null
          watched_seconds?: number
        }
        Relationships: []
      }
      payments: {
        Row: PaymentRow
        Insert: {
          user_id: string
          course_id: string
          amount: number
          currency?: string
          provider: PaymentProvider
          provider_payment_id?: string | null
          status?: PaymentStatus
        }
        Update: {
          provider_payment_id?: string | null
          status?: PaymentStatus
        }
        Relationships: []
      }
      leads: {
        Row: LeadRow
        Insert: {
          name?: string | null
          phone?: string | null
          email?: string | null
          child_age?: number | null
          message?: string | null
          source?: string
        }
        Update: {
          name?: string | null
          phone?: string | null
          email?: string | null
        }
        Relationships: []
      }
    }
    Views: Record<string, never>
    Functions: Record<string, never>
    Enums: Record<string, never>
  }
}
