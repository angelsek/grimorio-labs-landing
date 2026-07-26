-- =====================================================================
-- Tabla que alimenta el formulario "Novedades" de esta landing.
--
-- Correr una sola vez en el SQL Editor del proyecto de Supabase que ya
-- usa la app Maese (es la misma base: la landing no tiene backend propio).
-- Este bloque también está incluido al final de `supabase_schema.sql` en
-- el repo de la app, que es el esquema completo y canónico; acá se repite
-- solo lo que esta página necesita para no dejarla dependiendo de otro
-- repo para entenderse.
--
-- Es la primera tabla del proyecto que acepta escrituras de visitantes
-- SIN cuenta (rol `anon`), así que el diseño es deliberadamente estrecho:
--   * Solo INSERT. No hay política de SELECT/UPDATE/DELETE, así que la
--     lista no se puede leer ni modificar con la clave publicable — solo
--     desde el Table Editor o con la service_role key, que nunca sale del
--     panel de Supabase. Esto importa: sin política de SELECT, nadie
--     puede cosechar los correos ya suscritos.
--   * El cliente manda `Prefer: return=minimal` justamente porque no hay
--     política de SELECT: pedir `return=representation` fallaría, ya que
--     PostgREST tendría que leer la fila que acaba de insertar.
--   * `unique` en correo: un correo repetido devuelve 409, que la landing
--     muestra como éxito a propósito (confirmar "ese correo ya está en la
--     lista" le filtraría a un tercero quién está suscrito).
--   * El formato y el largo se validan acá además de en el navegador: la
--     validación del cliente es comodidad, no una defensa.
--
-- Límite conocido: no hay rate limiting, así que alguien decidido puede
-- llenar la tabla de correos basura. La landing tiene un campo trampa
-- que atrapa robots simples. Si aparece spam real, el paso siguiente es
-- Cloudflare Turnstile delante del formulario, no cambiar esta tabla.
-- =====================================================================

create table public.suscriptores (
  id         uuid primary key default gen_random_uuid(),
  correo     text not null unique
               check (length(correo) <= 254)
               check (correo ~ '^[^[:space:]@]+@[^[:space:]@]+\.[^[:space:]@]{2,}$'),
  origen     text not null default 'landing' check (length(origen) <= 40),
  creado_en  timestamptz not null default now()
);

alter table public.suscriptores enable row level security;

create policy "suscriptores: cualquier visitante puede suscribirse"
  on public.suscriptores for insert
  to anon, authenticated
  with check (true);

-- A proposito NO hay politica de select/update/delete: la lista se lee y
-- se administra solo desde el panel de Supabase.

-- Para ver los suscriptores acumulados (desde el SQL Editor, que corre
-- con permisos de administrador y no pasa por RLS):
-- select correo, origen, creado_en from public.suscriptores order by creado_en desc;
