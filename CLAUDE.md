# Instrucciones para Claude Code — grimorio-labs-landing

## Regla del equipo de agentes (obligatoria)

Todo desarrollo nuevo (funcionalidad, corrección o refactor) pasa por el equipo de agentes del plugin `equipo-dev`:

- Usa `/equipo-dev:desarrollar <tarea>`: plan del arquitecto (aprobado por el usuario antes de programar),
  implementación en una rama propia, tests, revisión de calidad y seguridad, documentación y PR.
- Nunca hagas commit ni push directo a la rama principal. Todo entra por PR.
- Antes de cada push, el hook global del equipo (instalado en el PC con `core.hooksPath`) ejecuta la revisión y
  bloquea si hay hallazgos críticos o altos. Si bloquea, corrige y vuelve a intentarlo (`/equipo-dev:revisar`
  muestra el detalle). No uses `--no-verify` ni `EQUIPO_OMITIR=1` salvo que el usuario lo pida explícitamente.
- Cada PR tiene además la revisión «Revisión del equipo» en GitHub; no se fusiona con ese check en rojo.
- Cambios triviales (erratas, textos, formato) pueden saltarse el plan del arquitecto, pero no la revisión.
- Caso especial: la Action de Claude solo se ejecuta si `.github/workflows/equipo-revision.yml` es idéntico al de
  la rama principal. Un PR que modifique ese workflow no puede revisarse a sí mismo: pasa por la puerta local y, si la
  rama está protegida, se quita temporalmente el check obligatorio para fusionarlo y se vuelve a exigir justo después.
