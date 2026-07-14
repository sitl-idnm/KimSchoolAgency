-- KIM AI School — Gamification schema
-- Run in Supabase SQL Editor AFTER schema.sql
-- Adds: XP/coins/levels, reward ledger, badges, quests, projects, roadmap graph,
--       skills radar, mentor feedback, events/agenda.

-- ── Helper: is current user admin ────────────────────────────────────────────
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean LANGUAGE sql SECURITY DEFINER STABLE AS $$
  SELECT EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin');
$$;

-- ── User stats (1:1 profiles) ────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.user_stats (
  user_id        UUID PRIMARY KEY REFERENCES public.profiles(id) ON DELETE CASCADE,
  xp             INTEGER NOT NULL DEFAULT 0,
  coins          INTEGER NOT NULL DEFAULT 0,
  level          INTEGER NOT NULL DEFAULT 1,   -- denormalized from xp, updated by app/trigger
  streak_days    INTEGER NOT NULL DEFAULT 0,
  longest_streak INTEGER NOT NULL DEFAULT 0,
  last_active_at DATE,
  updated_at     TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
ALTER TABLE public.user_stats ENABLE ROW LEVEL SECURITY;
CREATE POLICY "own stats read"  ON public.user_stats FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "own stats write" ON public.user_stats FOR ALL    USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE POLICY "admin stats"     ON public.user_stats FOR ALL    USING (public.is_admin());

-- Auto-create a stats row for every new profile
CREATE OR REPLACE FUNCTION public.handle_new_profile_stats()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER AS $$
BEGIN
  INSERT INTO public.user_stats (user_id) VALUES (NEW.id) ON CONFLICT DO NOTHING;
  RETURN NEW;
END; $$;
CREATE OR REPLACE TRIGGER on_profile_created_stats
  AFTER INSERT ON public.profiles
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_profile_stats();

-- ── Reward ledger (XP / coin events) — audit + analytics ─────────────────────
CREATE TABLE IF NOT EXISTS public.reward_events (
  id          UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id     UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  kind        TEXT NOT NULL CHECK (kind IN ('xp', 'coin')),
  amount      INTEGER NOT NULL,
  reason      TEXT NOT NULL,                    -- 'lesson_complete' | 'project_reviewed' | 'quest_claim' | 'streak' | ...
  source_type TEXT,                             -- 'lesson' | 'project' | 'quest' | 'badge'
  source_id   UUID,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS reward_events_user_idx ON public.reward_events (user_id, created_at DESC);
ALTER TABLE public.reward_events ENABLE ROW LEVEL SECURITY;
CREATE POLICY "own rewards read" ON public.reward_events FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "admin rewards"    ON public.reward_events FOR ALL    USING (public.is_admin());

-- ── Badges (catalog) + user unlocks ──────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.badges (
  id          UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slug        TEXT UNIQUE NOT NULL,
  title       TEXT NOT NULL,
  description TEXT,
  category    TEXT NOT NULL DEFAULT 'edu' CHECK (category IN ('edu', 'activity', 'projects', 'community')),
  icon        TEXT,                             -- icon key / url
  max_rank    INTEGER NOT NULL DEFAULT 1,       -- 1..5 (bronze..platinum)
  xp_reward   INTEGER NOT NULL DEFAULT 0,
  coin_reward INTEGER NOT NULL DEFAULT 0,
  is_active   BOOLEAN NOT NULL DEFAULT TRUE,
  sort_order  INTEGER NOT NULL DEFAULT 0
);
ALTER TABLE public.badges ENABLE ROW LEVEL SECURITY;
CREATE POLICY "badges readable"  ON public.badges FOR SELECT USING (is_active OR public.is_admin());
CREATE POLICY "admin badges"     ON public.badges FOR ALL    USING (public.is_admin());

CREATE TABLE IF NOT EXISTS public.user_badges (
  id          UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id     UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  badge_id    UUID REFERENCES public.badges(id) ON DELETE CASCADE NOT NULL,
  rank        INTEGER NOT NULL DEFAULT 1,
  progress    INTEGER NOT NULL DEFAULT 0,       -- toward next rank, 0..100
  unlocked_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (user_id, badge_id)
);
ALTER TABLE public.user_badges ENABLE ROW LEVEL SECURITY;
CREATE POLICY "own badges read" ON public.user_badges FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "admin user_badges" ON public.user_badges FOR ALL USING (public.is_admin());

-- ── Quests (catalog) + user progress ─────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.quests (
  id          UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slug        TEXT UNIQUE NOT NULL,
  title       TEXT NOT NULL,
  description TEXT,
  xp_reward   INTEGER NOT NULL DEFAULT 0,
  coin_reward INTEGER NOT NULL DEFAULT 0,
  target      INTEGER NOT NULL DEFAULT 1,       -- steps to complete
  starts_at   TIMESTAMPTZ,
  ends_at     TIMESTAMPTZ,
  is_active   BOOLEAN NOT NULL DEFAULT TRUE
);
ALTER TABLE public.quests ENABLE ROW LEVEL SECURITY;
CREATE POLICY "quests readable" ON public.quests FOR SELECT USING (is_active OR public.is_admin());
CREATE POLICY "admin quests"    ON public.quests FOR ALL    USING (public.is_admin());

CREATE TABLE IF NOT EXISTS public.user_quests (
  id           UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id      UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  quest_id     UUID REFERENCES public.quests(id) ON DELETE CASCADE NOT NULL,
  progress     INTEGER NOT NULL DEFAULT 0,
  status       TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'completed', 'claimed')),
  completed_at TIMESTAMPTZ,
  UNIQUE (user_id, quest_id)
);
ALTER TABLE public.user_quests ENABLE ROW LEVEL SECURITY;
CREATE POLICY "own quests read"  ON public.user_quests FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "own quests write" ON public.user_quests FOR ALL    USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE POLICY "admin user_quests" ON public.user_quests FOR ALL   USING (public.is_admin());

-- ── Projects / artifacts (catalog) + user kanban state ───────────────────────
CREATE TABLE IF NOT EXISTS public.projects (
  id           UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  course_id    UUID REFERENCES public.courses(id) ON DELETE SET NULL,
  title        TEXT NOT NULL,
  description  TEXT,
  kind         TEXT NOT NULL DEFAULT 'individual' CHECK (kind IN ('individual', 'module', 'team')),
  xp_reward    INTEGER NOT NULL DEFAULT 100,
  est_hours    INTEGER,
  is_published BOOLEAN NOT NULL DEFAULT TRUE,
  sort_order   INTEGER NOT NULL DEFAULT 0
);
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
CREATE POLICY "projects readable" ON public.projects FOR SELECT USING (is_published OR public.is_admin());
CREATE POLICY "admin projects"    ON public.projects FOR ALL    USING (public.is_admin());

CREATE TABLE IF NOT EXISTS public.user_projects (
  id           UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id      UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  project_id   UUID REFERENCES public.projects(id) ON DELETE CASCADE NOT NULL,
  status       TEXT NOT NULL DEFAULT 'registered'
               CHECK (status IN ('registered', 'in_progress', 'submitted', 'reviewed', 'done')),
  submission_url TEXT,
  grade        INTEGER,                         -- 0..100, set on review
  submitted_at TIMESTAMPTZ,
  reviewed_at  TIMESTAMPTZ,
  UNIQUE (user_id, project_id)
);
ALTER TABLE public.user_projects ENABLE ROW LEVEL SECURITY;
CREATE POLICY "own projects read"  ON public.user_projects FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "own projects write" ON public.user_projects FOR ALL    USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE POLICY "admin user_projects" ON public.user_projects FOR ALL   USING (public.is_admin());

-- ── Roadmap graph: nodes + edges + per-user status ───────────────────────────
CREATE TABLE IF NOT EXISTS public.roadmap_nodes (
  id         UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  course_id  UUID REFERENCES public.courses(id) ON DELETE CASCADE,
  kind       TEXT NOT NULL CHECK (kind IN ('lesson', 'module', 'project', 'milestone')),
  ref_id     UUID,                              -- lesson/project id when applicable
  title      TEXT NOT NULL,
  xp_reward  INTEGER NOT NULL DEFAULT 0,
  pos_x      REAL NOT NULL DEFAULT 0,
  pos_y      REAL NOT NULL DEFAULT 0
);
ALTER TABLE public.roadmap_nodes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "roadmap nodes readable" ON public.roadmap_nodes FOR SELECT USING (TRUE);
CREATE POLICY "admin roadmap nodes"    ON public.roadmap_nodes FOR ALL    USING (public.is_admin());

CREATE TABLE IF NOT EXISTS public.roadmap_edges (
  id        UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  from_node UUID REFERENCES public.roadmap_nodes(id) ON DELETE CASCADE NOT NULL,
  to_node   UUID REFERENCES public.roadmap_nodes(id) ON DELETE CASCADE NOT NULL,
  UNIQUE (from_node, to_node)
);
ALTER TABLE public.roadmap_edges ENABLE ROW LEVEL SECURITY;
CREATE POLICY "roadmap edges readable" ON public.roadmap_edges FOR SELECT USING (TRUE);
CREATE POLICY "admin roadmap edges"    ON public.roadmap_edges FOR ALL    USING (public.is_admin());

CREATE TABLE IF NOT EXISTS public.user_node_status (
  user_id      UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  node_id      UUID REFERENCES public.roadmap_nodes(id) ON DELETE CASCADE NOT NULL,
  status       TEXT NOT NULL DEFAULT 'locked'
               CHECK (status IN ('locked', 'available', 'in_progress', 'completed')),
  completed_at TIMESTAMPTZ,
  PRIMARY KEY (user_id, node_id)
);
ALTER TABLE public.user_node_status ENABLE ROW LEVEL SECURITY;
CREATE POLICY "own node status read"  ON public.user_node_status FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "own node status write" ON public.user_node_status FOR ALL    USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE POLICY "admin node status"     ON public.user_node_status FOR ALL    USING (public.is_admin());

-- ── Skills radar: catalog + per-user values ──────────────────────────────────
CREATE TABLE IF NOT EXISTS public.skills (
  id         UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slug       TEXT UNIQUE NOT NULL,
  title      TEXT NOT NULL,
  sort_order INTEGER NOT NULL DEFAULT 0
);
ALTER TABLE public.skills ENABLE ROW LEVEL SECURITY;
CREATE POLICY "skills readable" ON public.skills FOR SELECT USING (TRUE);
CREATE POLICY "admin skills"    ON public.skills FOR ALL    USING (public.is_admin());

CREATE TABLE IF NOT EXISTS public.user_skills (
  user_id  UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  skill_id UUID REFERENCES public.skills(id) ON DELETE CASCADE NOT NULL,
  value    INTEGER NOT NULL DEFAULT 0 CHECK (value BETWEEN 0 AND 100),
  PRIMARY KEY (user_id, skill_id)
);
ALTER TABLE public.user_skills ENABLE ROW LEVEL SECURITY;
CREATE POLICY "own skills read"   ON public.user_skills FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "admin user_skills" ON public.user_skills FOR ALL    USING (public.is_admin());

-- ── Mentor feedback (4 axes) ─────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.mentor_feedback (
  id          UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id     UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,     -- the student
  mentor_id   UUID REFERENCES public.profiles(id) ON DELETE SET NULL,             -- the mentor
  project_id  UUID REFERENCES public.projects(id) ON DELETE SET NULL,
  curiosity   SMALLINT CHECK (curiosity   BETWEEN 0 AND 4),   -- Любознательность
  accuracy    SMALLINT CHECK (accuracy    BETWEEN 0 AND 4),   -- Аккуратность
  autonomy    SMALLINT CHECK (autonomy    BETWEEN 0 AND 4),   -- Самостоятельность
  creativity  SMALLINT CHECK (creativity  BETWEEN 0 AND 4),   -- Креатив
  comment     TEXT,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
ALTER TABLE public.mentor_feedback ENABLE ROW LEVEL SECURITY;
CREATE POLICY "own feedback read" ON public.mentor_feedback FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "admin feedback"    ON public.mentor_feedback FOR ALL    USING (public.is_admin());

-- ── Events / agenda (calendar) ───────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.events (
  id          UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title       TEXT NOT NULL,
  description TEXT,
  kind        TEXT NOT NULL DEFAULT 'event' CHECK (kind IN ('event', 'lesson', 'deadline', 'webinar')),
  starts_at   TIMESTAMPTZ NOT NULL,
  ends_at     TIMESTAMPTZ,
  url         TEXT,
  is_published BOOLEAN NOT NULL DEFAULT TRUE
);
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
CREATE POLICY "events readable" ON public.events FOR SELECT USING (is_published OR public.is_admin());
CREATE POLICY "admin events"    ON public.events FOR ALL    USING (public.is_admin());

CREATE TABLE IF NOT EXISTS public.user_events (
  user_id  UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  event_id UUID REFERENCES public.events(id) ON DELETE CASCADE NOT NULL,
  status   TEXT NOT NULL DEFAULT 'registered' CHECK (status IN ('registered', 'attended', 'skipped')),
  PRIMARY KEY (user_id, event_id)
);
ALTER TABLE public.user_events ENABLE ROW LEVEL SECURITY;
CREATE POLICY "own events read"  ON public.user_events FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "own events write" ON public.user_events FOR ALL    USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE POLICY "admin user_events" ON public.user_events FOR ALL   USING (public.is_admin());

-- ── Seed: skills catalog (AI-навыки KIM) ─────────────────────────────────────
INSERT INTO public.skills (slug, title, sort_order) VALUES
  ('prompting',    'Промптинг',                1),
  ('image_gen',    'Генерация изображений',    2),
  ('text_work',    'Работа с текстом',         3),
  ('agents',       'Агенты и автоматизация',   4),
  ('data',         'Данные',                   5),
  ('ethics',       'Этика и безопасность',     6),
  ('project_think','Проектное мышление',       7),
  ('presentation', 'Презентация',              8)
ON CONFLICT (slug) DO NOTHING;

-- ── Seed: starter badges ─────────────────────────────────────────────────────
INSERT INTO public.badges (slug, title, description, category, max_rank, xp_reward, coin_reward, sort_order) VALUES
  ('welcome',        'Добро пожаловать',   'Первый вход в личный кабинет',              'edu',       1, 20,  5,  1),
  ('first_lesson',   'Первый урок',        'Пройден первый урок',                       'edu',       1, 30,  10, 2),
  ('first_project',  'Первый проект',      'Успешно сдан первый проект',                'projects',  1, 100, 25, 3),
  ('streak_7',       'Неделя в потоке',    'Серия активности 7 дней подряд',            'activity',  5, 50,  20, 4),
  ('perfectionist',  'Перфекционист',      'Проект принят с максимальной оценкой',      'projects',  5, 80,  30, 5)
ON CONFLICT (slug) DO NOTHING;
