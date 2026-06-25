-- KIM AI School — Supabase Schema
-- Run this in the Supabase SQL Editor

-- ── Profiles (extends auth.users) ──────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.profiles (
  id          UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  full_name   TEXT,
  email       TEXT,
  role        TEXT NOT NULL DEFAULT 'student' CHECK (role IN ('student', 'parent', 'admin')),
  avatar_url  TEXT,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own profile" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Admins can view all profiles" ON public.profiles FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
);

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, email)
  VALUES (
    NEW.id,
    NEW.raw_user_meta_data->>'full_name',
    NEW.email
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- ── Courses ─────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.courses (
  id           UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title        TEXT NOT NULL,
  description  TEXT,
  slug         TEXT UNIQUE,
  type         TEXT NOT NULL DEFAULT 'starter' CHECK (type IN ('starter', 'full', 'personal')),
  price_rub    INTEGER,
  modules      INTEGER NOT NULL DEFAULT 4,
  is_published BOOLEAN NOT NULL DEFAULT FALSE,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Published courses visible to all" ON public.courses FOR SELECT USING (is_published = TRUE);
CREATE POLICY "Admins manage all courses" ON public.courses USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
);

-- ── Enrollments ──────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.enrollments (
  id          UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id     UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  course_id   UUID REFERENCES public.courses(id) ON DELETE CASCADE NOT NULL,
  status      TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'completed', 'paused')),
  payment_id  TEXT,
  enrolled_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (user_id, course_id)
);

ALTER TABLE public.enrollments ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users view own enrollments" ON public.enrollments FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Admins view all enrollments" ON public.enrollments FOR ALL USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
);

-- ── Lessons ──────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.lessons (
  id               UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  course_id        UUID REFERENCES public.courses(id) ON DELETE CASCADE NOT NULL,
  module_num       INTEGER NOT NULL,
  lesson_num       INTEGER NOT NULL,
  title            TEXT NOT NULL,
  description      TEXT,
  content_url      TEXT,
  duration_minutes INTEGER,
  is_free          BOOLEAN NOT NULL DEFAULT FALSE,
  created_at       TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.lessons ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Free lessons visible to all" ON public.lessons FOR SELECT USING (is_free = TRUE);
CREATE POLICY "Enrolled users see course lessons" ON public.lessons FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM public.enrollments
    WHERE user_id = auth.uid() AND course_id = lessons.course_id AND status = 'active'
  )
);
CREATE POLICY "Admins manage lessons" ON public.lessons FOR ALL USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
);

-- ── Lesson progress ──────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.lesson_progress (
  id              UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id         UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  lesson_id       UUID REFERENCES public.lessons(id) ON DELETE CASCADE NOT NULL,
  completed_at    TIMESTAMPTZ,
  watched_seconds INTEGER NOT NULL DEFAULT 0,
  UNIQUE (user_id, lesson_id)
);

ALTER TABLE public.lesson_progress ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users manage own progress" ON public.lesson_progress FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Admins view all progress" ON public.lesson_progress FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
);

-- ── Payments ─────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.payments (
  id                  UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id             UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  course_id           UUID REFERENCES public.courses(id) ON DELETE SET NULL,
  amount              INTEGER NOT NULL,       -- in kopecks / cents
  currency            TEXT NOT NULL DEFAULT 'RUB',
  provider            TEXT NOT NULL CHECK (provider IN ('yokassa', 'stripe')),
  provider_payment_id TEXT,
  status              TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'succeeded', 'cancelled', 'refunded')),
  created_at          TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users view own payments" ON public.payments FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Admins manage all payments" ON public.payments FOR ALL USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
);

-- ── Leads (landing form submissions) ────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.leads (
  id         UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name       TEXT,
  phone      TEXT,
  email      TEXT,
  child_age  INTEGER,
  message    TEXT,
  source     TEXT NOT NULL DEFAULT 'landing',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
-- Public insert (anon users can submit)
CREATE POLICY "Anyone can submit lead" ON public.leads FOR INSERT WITH CHECK (TRUE);
CREATE POLICY "Admins view all leads" ON public.leads FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
);

-- ── Seed: default courses ────────────────────────────────────────────────────
INSERT INTO public.courses (title, description, slug, type, price_rub, modules, is_published)
VALUES
  ('Стартовый курс: AI-мышление', 'Базовая AI-грамотность и первые навыки работы с нейросетями', 'starter', 'starter', 19900, 4, TRUE),
  ('Полный курс: AI-проект', 'Полный навык + собственный AI-проект с финальной защитой', 'full', 'full', 35900, 8, TRUE)
ON CONFLICT (slug) DO NOTHING;
