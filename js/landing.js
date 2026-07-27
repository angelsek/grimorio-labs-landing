/* ====================================================================
   Landing de Grimorio Labs. Dos comportamientos, nada más: el selector
   de idioma y el formulario de novedades.

   El selector sigue el mismo patrón que `idiomaUi.js` en la app: el
   español vive en el DOM como única fuente de verdad y se cachea la
   primera vez que se traduce, así que pasar ES → EN → ES devuelve el
   texto original exacto en vez de una retraducción aproximada.
   ==================================================================== */
(function(){
  "use strict";

  var CLAVE_IDIOMA = "gl_idioma";

  /* Diccionario español → inglés, con la frase completa como clave (mismo
     criterio que el diccionario de la app: sin claves inventadas que haya
     que mantener sincronizadas con el HTML). */
  var EN = {
    "Idioma del sitio":"Site language",

    "Soluciones para juegos de mesa y rol":"Tools for tabletop games and roleplaying",
    "Construimos herramientas para quienes dirigen y juegan en una mesa real. Menos administración, más partida.":"We build tools for the people who run and play games around a real table. Less bookkeeping, more playing.",

    "Quiénes somos":"Who we are",
    "Grimorio Labs es un estudio pequeño con una idea simple detrás: el juego de rol de mesa se disfruta en persona, con dados de verdad y gente alrededor.":"Grimorio Labs is a small studio built on a simple idea: tabletop roleplaying is best enjoyed in person, with real dice and real people around the table.",
    "Nuestras herramientas no reemplazan esa mesa, la acompañan. Se encargan de la preparación, la referencia y el papeleo para que nadie tenga que frenar la partida a buscar un dato.":"Our tools don't replace that table, they support it. They handle the prep, the lookups and the paperwork so nobody has to stop the game to hunt for a number.",

    "Nuestros productos":"Our products",
    "Compendio del Director de Juego":"The Game Master's compendium",
    "Disponible":"Available now",
    "El primero de la casa. Un compañero de mesa para quien dirige: prepara la sesión antes de que empiece y, durante la partida, deja todo a mano sin sacarte del juego.":"Our first release. A table companion for whoever runs the game: it gets the session ready beforehand and, once you're playing, keeps everything within reach without pulling you out of the game.",

    "Bestiario de 450 criaturas":"A bestiary of 450 creatures",
    "Fichas completas y buscables al instante, con más manuales que se suman por campaña.":"Full stat blocks, searchable instantly, with extra rulebooks you can add per campaign.",
    "Generador de encuentros":"Encounter generator",
    "Arma encuentros equilibrados por presupuesto de experiencia, filtrados por entorno y por los manuales que uses.":"Build balanced encounters against an experience budget, filtered by environment and by the rulebooks you actually use.",
    "Seguimiento de combate":"Combat tracker",
    "Orden de iniciativa, puntos de golpe, condiciones y bitácora del combate, sin planillas sueltas.":"Initiative order, hit points, conditions and a combat log, with no loose spreadsheets.",
    "Hojas de personaje":"Character sheets",
    "Especie, clase, subclase, trasfondo y conjuros que se autocompletan. La defensa se calcula sola según la armadura equipada.":"Species, class, subclass, background and spells that fill themselves in. Defense is calculated from the armor you have equipped.",
    "Tus propias tablas":"Your own tables",
    "Carga tus listas de botín, rumores o pifias y tira sobre ellas el dado que quieras, con sus rangos.":"Load your own loot, rumor or fumble lists and roll whatever die you like against them, ranges included.",
    "Kit de mesa imprimible":"Printable table kit",
    "Tarjetas de iniciativa y marcadores de condición para cortar y usar sobre la mesa física.":"Initiative cards and condition markers to cut out and use on the physical table.",

    "Pensado para la mesa, no para la pantalla":"Built for the table, not for the screen",
    "Maese no es una mesa virtual y no intenta serlo. No tira los dados por ti ni resuelve el combate solo: justamente eso es lo que hace divertido jugar en persona.":"Maese is not a virtual tabletop and doesn't try to be one. It won't roll the dice for you or resolve combat on its own — that part is exactly what makes playing in person fun.",

    "Entrar a Maese":"Open Maese",
    "Gratis para empezar. Solo necesitas una cuenta.":"Free to start. All you need is an account.",

    "Novedades":"What's next",
    "Estamos trabajando en más herramientas para la mesa. Deja tu correo y te avisamos cuando haya algo nuevo.":"We're working on more tools for the table. Leave your email and we'll let you know when something new is ready.",
    "tu@correo.com":"you@email.com",
    "Tu dirección de correo":"Your email address",
    "Avisarme":"Notify me",
    "Solo para anunciar productos propios. No compartimos tu correo con nadie ni te mandamos publicidad de terceros, y puedes pedir que lo borremos cuando quieras.":"Only to announce our own products. We don't share your email with anyone or send you third-party ads, and you can ask us to delete it whenever you want.",

    "Grimorio Labs es un estudio independiente, sin relación ni respaldo de Wizards of the Coast. Maese es una herramienta de apoyo para quien dirige la partida: no reemplaza ningún manual de reglas ni los incluye.":"Grimorio Labs is an independent studio, not affiliated with or endorsed by Wizards of the Coast. Maese is a support tool for whoever runs the game: it neither replaces nor includes any rulebook.",

    /* Título de la pestaña del navegador. */
    "Grimorio Labs — Soluciones para juegos de mesa y rol":"Grimorio Labs — Tools for tabletop games and roleplaying",

    /* ---- Navegación compartida con las páginas de privacidad y términos --
       Este diccionario lo usan las tres páginas: el mismo landing.js se
       carga en todas, y sus funciones se saltan solas lo que no encuentran
       en el DOM (el formulario de novedades, por ejemplo). */
    "‹ Volver al inicio":"‹ Back to home",
    "Inicio":"Home",
    "Política de privacidad":"Privacy policy",
    "Términos de servicio":"Terms of service",
    "Última actualización":"Last updated",
    "26 de julio de 2026":"July 26, 2026",

    /* ---- Política de privacidad ---- */
    "Grimorio Labs es un proyecto independiente de desarrollo de herramientas para juegos de rol de mesa. Esta política cubre el sitio grimoriolabs.com y la aplicación Maese, en maese.grimoriolabs.com.":"Grimorio Labs is an independent project building tools for tabletop roleplaying games. This policy covers the grimoriolabs.com site and the Maese app at maese.grimoriolabs.com.",
    "El principio es corto: recogemos lo mínimo para que las cosas funcionen, y nada más. No vivimos de tus datos.":"The principle is short: we collect the minimum needed to make things work, and nothing else. Your data is not our business model.",

    "Qué datos recogemos":"What data we collect",
    "Si dejas tu correo en Novedades":"If you leave your email under What's next",
    "Guardamos la dirección que escribes, la fecha y de qué formulario vino. Se usa solo para avisarte cuando publicamos algo nuevo. No la compartimos con nadie, no mandamos publicidad de terceros y no la usamos para ninguna otra cosa.":"We store the address you type, the date, and which form it came from. It is used only to let you know when we release something new. We don't share it with anyone, we don't send third-party ads, and we don't use it for anything else.",
    "Si creas una cuenta en Maese":"If you create a Maese account",
    "Guardamos tu correo, tu nombre de usuario y tu plan. La contraseña no la guardamos: la almacena cifrada nuestro proveedor de autenticación, y nadie de Grimorio Labs puede leerla ni recuperarla.":"We store your email, your username and your plan. We do not store your password: our authentication provider keeps it encrypted, and nobody at Grimorio Labs can read or recover it.",
    "Si entras con Google":"If you sign in with Google",
    "Recibimos de Google tu correo y los datos básicos de tu perfil, únicamente para identificar tu cuenta. No pedimos acceso a tus contactos, a tu calendario ni a nada más, y no publicamos nada en tu nombre.":"Google gives us your email and basic profile details, only to identify your account. We don't request access to your contacts, your calendar or anything else, and we never post on your behalf.",
    "Lo que escribes dentro de Maese":"What you write inside Maese",
    "Tus campañas, personajes, encuentros, bitácora, tablas y notas se guardan asociados a tu cuenta para que los tengas disponibles al volver. Están aislados por cuenta a nivel de base de datos: otras personas no pueden leerlos. No los miramos, no los analizamos y no los usamos para entrenar nada.":"Your campaigns, characters, encounters, journal, tables and notes are stored against your account so they are there when you come back. They are isolated per account at the database level: other people cannot read them. We don't look at them, we don't analyse them, and we don't use them to train anything.",
    "Lo que se queda en tu navegador":"What stays in your browser",
    "El tema visual y el idioma que elijas quedan guardados en el almacenamiento local de tu navegador, no en nuestros servidores. La sesión abierta se guarda por el mismo mecanismo. No usamos cookies de rastreo.":"The visual theme and the language you pick are kept in your browser's local storage, not on our servers. Your open session is kept the same way. We don't use tracking cookies.",

    "Qué no hacemos":"What we don't do",
    "No vendemos ni alquilamos tus datos a nadie.":"We don't sell or rent your data to anyone.",
    "No usamos analítica, perfilado ni rastreadores publicitarios.":"We don't use analytics, profiling or advertising trackers.",
    "No mostramos publicidad.":"We don't show ads.",
    "No cruzamos tu actividad con otras fuentes para construir un perfil tuyo.":"We don't combine your activity with other sources to build a profile of you.",

    "Quiénes procesan datos por nosotros":"Who processes data on our behalf",
    "Para que el servicio funcione dependemos de estos terceros, cada uno con su propia política de privacidad:":"To keep the service running we rely on these third parties, each with its own privacy policy:",
    "guarda la base de datos y maneja el inicio de sesión.":"stores the database and handles sign-in.",
    "sirve el sitio y la aplicación.":"serves the site and the app.",
    "solo si eliges entrar con Google.":"only if you choose to sign in with Google.",
    "las tipografías se cargan desde los servidores de Google, lo que implica que tu navegador les envía su dirección IP al abrir cualquier página. Lo decimos porque pasa de verdad, aunque no sea una decisión de seguimiento por nuestra parte.":"the typefaces load from Google's servers, which means your browser sends them its IP address whenever you open any page. We mention it because it genuinely happens, even though it is not a tracking decision on our part.",
    "si activas un manual adicional en una campaña, tu navegador descarga esos datos de criaturas desde su servidor.":"if you enable an extra rulebook in a campaign, your browser downloads that creature data from their server.",

    "Cuánto tiempo lo guardamos":"How long we keep it",
    "Los datos de tu cuenta y tu contenido se conservan mientras la cuenta exista. Si pides que la borremos, se eliminan junto con sus campañas, personajes y notas. Los correos de la lista de novedades se conservan hasta que pidas darte de baja.":"Your account data and your content are kept as long as the account exists. If you ask us to delete it, they go along with its campaigns, characters and notes. Addresses on the announcement list are kept until you ask to be removed.",

    "Tus derechos":"Your rights",
    "Puedes pedirnos en cualquier momento que te digamos qué datos tenemos tuyos, que corrijamos algo que esté mal, o que borremos tu cuenta y todo su contenido. Escríbenos y lo resolvemos; no hace falta que expliques por qué.":"You can ask us at any time what data we hold about you, to correct anything that is wrong, or to delete your account and everything in it. Write to us and we'll sort it out; you don't need to explain why.",

    "Cambios en esta política":"Changes to this policy",
    "Si cambia algo relevante, actualizamos esta página y su fecha. Si el cambio afecta de forma significativa a las cuentas existentes, lo avisaremos por correo antes de aplicarlo.":"If something meaningful changes, we update this page and its date. If a change significantly affects existing accounts, we will say so by email before it takes effect.",

    /* ---- Términos de servicio ---- */
    "Estos términos cubren el uso del sitio grimoriolabs.com y de la aplicación Maese. Al crear una cuenta o usar el servicio, aceptas lo que sigue.":"These terms cover use of the grimoriolabs.com site and the Maese app. By creating an account or using the service, you accept what follows.",

    "Qué es este servicio":"What this service is",
    "Maese es una herramienta de apoyo para quien dirige partidas de rol de mesa: sirve para preparar sesiones, consultar criaturas, llevar el combate y guardar notas. No es un juego, no reemplaza ningún manual de reglas y no incluye ninguno.":"Maese is a support tool for whoever runs tabletop roleplaying sessions: it helps you prepare, look up creatures, run combat and keep notes. It is not a game, it does not replace any rulebook, and it does not include one.",
    "Hoy el servicio es gratuito. Si en el futuro aparecen funciones de pago, las condiciones se avisarán con claridad antes de cobrar nada, y lo que ya usabas gratis no se convertirá en pago de un día para otro sin aviso.":"Today the service is free. If paid features appear in future, the terms will be stated clearly before anything is charged, and what you already use for free will not turn into a paid feature overnight without notice.",

    "Tu cuenta":"Your account",
    "Eres responsable de mantener tu contraseña en privado y de lo que ocurra desde tu cuenta. Si crees que alguien más entró, cámbiala y avísanos.":"You are responsible for keeping your password private and for what happens from your account. If you think someone else got in, change it and let us know.",
    "Necesitas una dirección de correo válida para registrarte, porque es el único camino para recuperar el acceso si olvidas la contraseña.":"You need a valid email address to register, because it is the only way to recover access if you forget your password.",

    "Uso aceptable":"Acceptable use",
    "Pedimos algo simple: no uses el servicio para dañarlo ni para perjudicar a otras personas. En concreto, no:":"We ask something simple: don't use the service to damage it or to harm other people. Specifically, don't:",
    "Intentes acceder a cuentas o datos que no sean tuyos.":"Try to access accounts or data that are not yours.",
    "Automatices peticiones a un volumen que degrade el servicio para el resto.":"Automate requests at a volume that degrades the service for everyone else.",
    "Subas contenido ilegal, ni material del que no tengas derecho a disponer.":"Upload illegal content, or material you have no right to use.",
    "Revendas el servicio ni lo presentes como propio.":"Resell the service or present it as your own.",
    "Podemos suspender una cuenta que haga algo de lo anterior. Si pasa por error, escríbenos y lo revisamos.":"We may suspend an account that does any of the above. If it happens by mistake, write to us and we'll review it.",

    "Tu contenido es tuyo":"Your content is yours",
    "Las campañas, personajes, notas, bitácoras y tablas que escribes siguen siendo tuyos. No reclamamos ninguna propiedad sobre ellos, no los publicamos y no los usamos para nada más que mostrártelos a ti. Puedes exportar tus personajes cuando quieras, y borrar tu cuenta con todo su contenido si lo prefieres.":"The campaigns, characters, notes, journals and tables you write remain yours. We claim no ownership over them, we don't publish them, and we don't use them for anything beyond showing them back to you. You can export your characters whenever you like, and delete your account with everything in it if you prefer.",

    "Contenido de terceros y propiedad intelectual":"Third-party content and intellectual property",
    "Grimorio Labs es un proyecto independiente, sin relación ni respaldo de Wizards of the Coast.":"Grimorio Labs is an independent project, not affiliated with or endorsed by Wizards of the Coast.",
    "Dungeons & Dragons y sus marcas pertenecen a sus respectivos titulares.":"Dungeons & Dragons and its trademarks belong to their respective owners.",
    "El contenido de reglas y criaturas que la aplicación muestra proviene de material publicado bajo licencias abiertas, o se acoge a la política de contenido para aficionados de Wizards of the Coast. La aplicación no reproduce los manuales ni sustituye su compra.":"The rules and creature content the app displays comes from material published under open licences, or relies on the Wizards of the Coast fan content policy. The app does not reproduce the rulebooks and is no substitute for buying them.",

    "Sin garantías":"No warranties",
    "El servicio se ofrece tal como está. Lo mantiene una sola persona y puede tener errores, quedar temporalmente fuera de servicio o cambiar. No podemos garantizar que esté disponible siempre ni que no se pierdan datos por un fallo de un proveedor.":"The service is offered as is. One person maintains it, so it may have bugs, go temporarily offline, or change. We cannot guarantee it will always be available, nor that no data will be lost through a provider failure.",
    "Por eso, si algo de tu mesa te importa de verdad, guarda una copia propia. La aplicación permite exportar tus personajes en un archivo, y conviene usarla.":"So if something from your table really matters to you, keep your own copy. The app can export your characters to a file, and it is worth using.",
    "Hasta donde la ley lo permita, no asumimos responsabilidad por daños derivados del uso o de la imposibilidad de usar el servicio.":"To the extent the law allows, we accept no liability for damages arising from using, or being unable to use, the service.",

    "Interrupción del servicio":"Discontinuing the service",
    "Si algún día tuviéramos que cerrar el servicio, lo avisaríamos con antelación razonable por correo y dejaríamos una forma de exportar tu contenido antes de que se apague.":"If we ever had to shut the service down, we would give reasonable notice by email and leave a way to export your content before it goes dark.",

    "Cambios en estos términos":"Changes to these terms",
    "Podemos actualizarlos. Si el cambio es relevante, actualizamos la fecha de arriba y lo avisamos por correo a las cuentas existentes. Seguir usando el servicio después de un cambio significa que lo aceptas.":"We may update them. If a change is meaningful, we update the date above and tell existing accounts by email. Continuing to use the service after a change means you accept it.",

    "Contacto y ley aplicable":"Contact and governing law",
    "Grimorio Labs opera desde Chile, y estos términos se rigen por la legislación chilena. Para cualquier duda, reclamo o solicitud sobre tu cuenta:":"Grimorio Labs operates from Chile, and these terms are governed by Chilean law. For any question, complaint or request about your account:",

    /* Mensajes del formulario (no viven en el HTML, se escriben por JS). */
    "Listo. Te escribiremos cuando haya novedades.":"You're in. We'll write when there's news.",
    "Ya estabas en la lista. No hace falta hacer nada más.":"You were already on the list. Nothing else to do.",
    "Revisa el correo, parece incompleto.":"Check the address, it looks incomplete.",
    "No se pudo guardar. Intenta de nuevo en un momento.":"We couldn't save it. Please try again in a moment.",
    "Guardando…":"Saving…"
  };

  /* --------------------------------------------------------------- idioma */

  var idiomaActual = "es";
  /* El título en español se guarda al cargar, misma idea que cachear el
     texto del DOM: la fuente de verdad es el HTML, no el diccionario. */
  var tituloEs = document.title;

  function t(texto){
    if(idiomaActual === "es") return texto;
    var trad = EN[texto];
    return (typeof trad === "string" && trad) ? trad : texto;
  }

  /* Cachea el español original del DOM la primera vez, para que volver a
     español no dependa de un diccionario inverso. */
  function original(el, attr, leer){
    var guardado = el.getAttribute(attr);
    if(guardado === null){
      guardado = leer();
      el.setAttribute(attr, guardado);
    }
    return guardado;
  }

  function aplicarIdioma(id){
    idiomaActual = (id === "en") ? "en" : "es";
    document.documentElement.lang = idiomaActual;
    document.title = t(tituloEs);

    var i, els;

    els = document.querySelectorAll("[data-i18n]");
    for(i = 0; i < els.length; i++){
      (function(el){
        el.textContent = t(original(el, "data-i18n-es", function(){ return el.textContent; }));
      })(els[i]);
    }

    els = document.querySelectorAll("[data-i18n-placeholder]");
    for(i = 0; i < els.length; i++){
      (function(el){
        el.placeholder = t(original(el, "data-i18n-ph-es", function(){ return el.placeholder; }));
      })(els[i]);
    }

    els = document.querySelectorAll("[data-i18n-aria-label]");
    for(i = 0; i < els.length; i++){
      (function(el){
        el.setAttribute("aria-label", t(original(el, "data-i18n-aria-es", function(){
          return el.getAttribute("aria-label") || "";
        })));
      })(els[i]);
    }

    var bEs = document.getElementById("idioma-es");
    var bEn = document.getElementById("idioma-en");
    if(bEs) bEs.setAttribute("aria-pressed", String(idiomaActual === "es"));
    if(bEn) bEn.setAttribute("aria-pressed", String(idiomaActual === "en"));

    /* Repinta el mensaje del formulario, si hay uno visible, para que no
       quede en el idioma anterior. */
    var estado = document.getElementById("aviso-estado");
    if(estado && estado.getAttribute("data-clave")){
      estado.textContent = t(estado.getAttribute("data-clave"));
    }

    try{ localStorage.setItem(CLAVE_IDIOMA, idiomaActual); }catch(e){}
  }

  function idiomaGuardado(){
    var guardado = null;
    try{ guardado = localStorage.getItem(CLAVE_IDIOMA); }catch(e){}
    if(guardado === "es" || guardado === "en") return guardado;
    /* Sin preferencia previa: seguir el idioma del navegador, con español
       como red de contención. */
    var nav = (navigator.language || "").toLowerCase();
    return nav.indexOf("es") === 0 ? "es" : (nav ? "en" : "es");
  }

  /* ------------------------------------------------------------ novedades */

  var SUPABASE_URL = "https://ggkzfljhqufwwulfjudy.supabase.co";
  var SUPABASE_ANON_KEY = "sb_publishable_1gM1rDKMDW4ntNd5nMpbeQ_QoDevR7s";

  function correoValido(valor){
    /* Validación deliberadamente laxa: alcanza para atajar un dedazo, y la
       comprobación real la hace la base con su propio constraint. */
    return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(valor);
  }

  function mostrarEstado(clave, tono){
    var estado = document.getElementById("aviso-estado");
    if(!estado) return;
    estado.setAttribute("data-clave", clave);
    estado.setAttribute("data-tono", tono);
    estado.textContent = t(clave);
  }

  function enviarCorreo(correo){
    return fetch(SUPABASE_URL + "/rest/v1/suscriptores", {
      method:"POST",
      headers:{
        "apikey":SUPABASE_ANON_KEY,
        "Authorization":"Bearer " + SUPABASE_ANON_KEY,
        "Content-Type":"application/json",
        "Prefer":"return=minimal"
      },
      body:JSON.stringify({correo:correo, origen:"landing"})
    });
  }

  function initNovedades(){
    var form = document.getElementById("aviso-form");
    if(!form) return;

    form.addEventListener("submit", function(ev){
      ev.preventDefault();

      var trampa = document.getElementById("aviso-trampa");
      if(trampa && trampa.value){
        /* Un robot llenó el campo oculto. Se finge éxito y no se envía nada. */
        mostrarEstado("Listo. Te escribiremos cuando haya novedades.", "ok");
        return;
      }

      var campo = document.getElementById("aviso-correo");
      var boton = document.getElementById("aviso-enviar");
      var correo = (campo.value || "").trim().toLowerCase();

      if(!correoValido(correo)){
        mostrarEstado("Revisa el correo, parece incompleto.", "error");
        campo.focus();
        return;
      }

      boton.disabled = true;
      mostrarEstado("Guardando…", "");

      enviarCorreo(correo).then(function(res){
        if(res.ok){
          mostrarEstado("Listo. Te escribiremos cuando haya novedades.", "ok");
          form.reset();
        }else if(res.status === 409){
          /* Choque de clave única: ya estaba suscrito. Se trata como éxito
             para no confirmarle a un tercero que ese correo está en la lista. */
          mostrarEstado("Ya estabas en la lista. No hace falta hacer nada más.", "ok");
          form.reset();
        }else{
          mostrarEstado("No se pudo guardar. Intenta de nuevo en un momento.", "error");
        }
      }).catch(function(){
        mostrarEstado("No se pudo guardar. Intenta de nuevo en un momento.", "error");
      }).then(function(){
        boton.disabled = false;
      });
    });
  }

  /* ----------------------------------------------------------------- init */

  function init(){
    var anio = document.getElementById("anio");
    if(anio) anio.textContent = String(new Date().getFullYear());

    var bEs = document.getElementById("idioma-es");
    var bEn = document.getElementById("idioma-en");
    if(bEs) bEs.addEventListener("click", function(){ aplicarIdioma("es"); });
    if(bEn) bEn.addEventListener("click", function(){ aplicarIdioma("en"); });

    initNovedades();
    aplicarIdioma(idiomaGuardado());
  }

  if(document.readyState === "loading"){
    document.addEventListener("DOMContentLoaded", init);
  }else{
    init();
  }

  /* Expuesto solo para los chequeos automatizados. */
  window.GL = {aplicarIdioma:aplicarIdioma, t:t, correoValido:correoValido,
               getIdioma:function(){ return idiomaActual; }};
})();
