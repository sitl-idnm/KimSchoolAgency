-- Fix: бесконечная рекурсия в RLS политиках profiles
-- Проблема: политика на profiles проверяла profiles → рекурсия

-- Удаляем проблемные политики
DROP POLICY IF EXISTS "Admins can view all profiles" ON public.profiles;
DROP POLICY IF EXISTS "Admins manage all courses" ON public.courses;
DROP POLICY IF EXISTS "Admins view all enrollments" ON public.enrollments;
DROP POLICY IF EXISTS "Admins manage lessons" ON public.lessons;
DROP POLICY IF EXISTS "Admins view all progress" ON public.lesson_progress;
DROP POLICY IF EXISTS "Admins manage all payments" ON public.payments;
DROP POLICY IF EXISTS "Admins view all leads" ON public.leads;

-- Создаём security-definer функцию — она обходит RLS при проверке роли
CREATE OR REPLACE FUNCTION public.get_my_role()
RETURNS TEXT AS $$
  SELECT role FROM public.profiles WHERE id = auth.uid()
$$ LANGUAGE SQL SECURITY DEFINER STABLE;

-- Пересоздаём политики через функцию (без рекурсии)
CREATE POLICY "Admins can view all profiles"
  ON public.profiles FOR SELECT
  USING (public.get_my_role() = 'admin');

CREATE POLICY "Admins manage all courses"
  ON public.courses FOR ALL
  USING (public.get_my_role() = 'admin');

CREATE POLICY "Admins view all enrollments"
  ON public.enrollments FOR ALL
  USING (public.get_my_role() = 'admin');

CREATE POLICY "Admins manage lessons"
  ON public.lessons FOR ALL
  USING (public.get_my_role() = 'admin');

CREATE POLICY "Admins view all progress"
  ON public.lesson_progress FOR SELECT
  USING (public.get_my_role() = 'admin');

CREATE POLICY "Admins manage all payments"
  ON public.payments FOR ALL
  USING (public.get_my_role() = 'admin');

CREATE POLICY "Admins view all leads"
  ON public.leads FOR SELECT
  USING (public.get_my_role() = 'admin');
