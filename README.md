# Landing de Grimorio Labs — grimoriolabs.com

Página institucional de la empresa. Se despliega en la **raíz** del dominio
(`grimoriolabs.com`), separada de la app Maese, que vive en
`maese.grimoriolabs.com`.

Este repo es la **única fuente de verdad** de la landing: no hay copia en
ningún otro lado y no hay nada que sincronizar a mano.

## Contenido

Un solo archivo, `index.html`, con el CSS y el JS embebidos. Sin
dependencias, sin build, sin framework. Lo único externo son las tipografías
(Cinzel e Inter, desde Google Fonts) y las imágenes de `assets/`.

La paleta y las tipografías son las mismas que usa la app, a propósito, para
que la marca se vea igual en los dos lados. Dos desvíos deliberados, no
descuidos:

- El cuerpo de texto usa **Inter**, no EB Garamond. La serif de la marca
  cuesta leerla a tamaño de párrafo.
- **Nada en cursiva**, en ninguna parte.

Los logos vienen de los packs de marca de Grimorio Labs y de Maese, copiados
acá para que este repo se despliegue solo, sin depender del repo de la app.

## Por qué es un proyecto de Cloudflare aparte

La app se sirve desde el worker `dmproject` con `[assets] directory = "."`, y
su ruteo lo hace un `_redirects` estático que manda `/` a
`/index_final.html`. Un `_redirects` no puede decidir según el hostname, así
que si se le colgara el dominio raíz a ese worker, la raíz serviría la app en
lugar de esta página.

Servir las dos cosas desde un solo worker requeriría agregarle un script con
ruteo por hostname y cambiarle la configuración de assets — es decir, tocar
el deploy de la app que hoy funciona. No se justifica: esta landing es un
único archivo estático y no comparte nada con la app salvo la marca.

Tampoco vive dentro del repo de la app: ese repo se sirve completo como
estático, así que la landing quedaría accesible también en
`maese.grimoriolabs.com/...`, duplicando el sitio en dos URLs.

**El worker de la app no se toca.** `maese.grimoriolabs.com` sigue igual.

## Despliegue

Conectado a Cloudflare Pages: cada push a `main` publica una versión nueva.

Para configurarlo la primera vez, en el panel de Cloudflare:

1. **Workers & Pages → Create → Pages → Connect to Git**.
2. Elegir este repo (`angelsek/grimorio-labs-landing`), rama `main`.
3. Sin comando de build y sin directorio de salida: es HTML estático en la
   raíz del repo. Si el panel exige un directorio, poner `/`.
4. **Save and Deploy**.
5. En el proyecto recién creado: **Custom domains → Set up a custom
   domain** → `grimoriolabs.com`. El DNS y el certificado se provisionan
   solos, porque el dominio ya está en la cuenta.

Conviene agregar también `www.grimoriolabs.com` como segundo dominio custom.

## El formulario de novedades

Escribe en la tabla `suscriptores` del proyecto de Supabase que ya usa la
app, por la API REST (sin cargar la librería de Supabase: es un solo
`fetch`). El SQL que crea la tabla está en `suscriptores.sql`.

Detalles del diseño que importan si se toca:

- La tabla es **solo INSERT**. No tiene política de `SELECT`, así que la
  lista de correos no se puede leer con la clave publicable — solo desde el
  panel de Supabase. Por eso el `fetch` manda `Prefer: return=minimal`: si
  pidiera la fila de vuelta, el insert fallaría al no poder leerla.
- Un correo repetido devuelve 409 y la página lo muestra **como éxito**, a
  propósito: decir "ese correo ya está en la lista" le confirmaría a un
  tercero quién está suscrito.
- Hay un campo trampa oculto para robots simples, fuera del árbol de
  accesibilidad para que un lector de pantalla no lo anuncie.
- **No hay rate limiting.** Si aparece spam real, el paso siguiente es poner
  Cloudflare Turnstile delante del formulario, no cambiar la tabla.

La clave de Supabase que está en el HTML es la **publicable** (`anon`), la
misma que ya viaja al navegador de cualquiera que abra la app. No es un
secreto y no hay que rotarla por tenerla en un repo público.

## Pendiente

El pie de página muestra `hola@grimoriolabs.com`, que **todavía no existe**.
Para que funcione hay que crear la redirección en Cloudflare: **Email →
Email Routing**, y apuntar esa dirección al correo personal. Es gratis con
el dominio en la cuenta. Hasta entonces, ese enlace no llega a ningún lado.

## Desarrollo

Cualquier servidor estático sirve. Desde la raíz del repo:

```bash
python -m http.server 8788
```

Los chequeos automatizados (jsdom, 87 chequeos sobre el selector de idioma,
el formulario y dos reglas de CSS que ya causaron un bug real) se escribieron
en el scratchpad de la sesión que armó la página y no se commitearon acá.
Los bugs que encontraron están documentados en los comentarios del propio
`index.html`, justo arriba de las reglas que los causaron.
