# PDT 360 · Physical Duty Training 360 — puesta en marcha

App instalable en Android (PWA) que planifica tu semana alrededor de lo que impone la unidad, te guía en el gimnasio y guarda todo en tu propia base de datos de Firebase. Gratis: Firebase (plan Spark) y GitHub Pages no tienen coste con este uso.

Tiempo estimado: 30 minutos, una sola vez. Mejor hacerlo desde el ordenador.

## 1. Crear el proyecto de Firebase

1. Entra en https://console.firebase.google.com con tu cuenta de Google.
2. **Añadir proyecto** → nombre `pdt360` → desactiva Google Analytics → **Crear proyecto**.

## 2. Activar el inicio de sesión

1. Menú izquierdo → **Compilación → Authentication** → **Comenzar**.
2. Pestaña **Método de acceso** → **Correo electrónico/contraseña** → activa el primer interruptor → **Guardar**.

## 3. Crear la base de datos

1. **Compilación → Firestore Database** → **Crear base de datos**.
2. Ubicación: **europe-southwest1 (Madrid)** → **Modo de producción** → **Crear**.
3. Cuando se cree la base de datos, entra en la pestaña **Reglas** (arriba, junto a "Datos"). Verás un recuadro con un texto que Firebase pone por defecto.
4. Selecciona **todo** ese texto del recuadro y bórralo, de forma que quede vacío.
5. Copia exactamente este bloque y pégalo en el recuadro vacío:

   ```
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       match /users/{uid}/{document=**} {
         allow read, write: if request.auth != null && request.auth.uid == uid;
       }
     }
   }
   ```

   Es el mismo contenido del archivo `firestore.rules` que va en la carpeta; no tienes que escribir nada a mano ni subir ese archivo a Firebase.
6. Pulsa **Publicar**.

Estas reglas hacen que solo tu cuenta pueda leer y escribir tus datos. Sin ellas, la base de datos rechaza todo y la app no podría guardar nada.

## 4. Conectar la app con tu proyecto

1. Rueda dentada (arriba a la izquierda) → **Configuración del proyecto**.
2. Abajo, en **Tus apps**, pulsa el icono web `</>` → apodo `PDT 360` → **sin** marcar Hosting → **Registrar app**.
3. Copia los valores de `firebaseConfig` (apiKey, authDomain, projectId…) y pégalos en `firebase-config.js`, sustituyendo los de ejemplo. Guarda el archivo.

La `apiKey` de Firebase no es secreta: identifica el proyecto. Lo que protege tus datos son las reglas del paso 3.

## 5. Publicar la app en GitHub Pages

1. Crea una cuenta en https://github.com si no tienes.
2. **New repository** → nombre `pdt360` → **Public** → **Create repository**.
3. **uploading an existing file** → arrastra **todos** los archivos de esta carpeta, incluida la carpeta `icons` (no hace falta subir `datos-iniciales.json`) → **Commit changes**.
4. **Settings → Pages** → *Source*: **Deploy from a branch** → rama **main**, carpeta **/(root)** → **Save**.
5. En 1-2 minutos la app estará en `https://TU_USUARIO.github.io/pdt360/`.
6. En Firebase → **Authentication → Configuración → Dominios autorizados** → **Añadir dominio** → `TU_USUARIO.github.io`.

## 6. Instalar en el móvil

1. Abre la dirección del paso 5 en **Chrome** en tu Android.
2. Menú ⋮ → **Instalar aplicación** (o **Añadir a pantalla de inicio**).
3. Abre PDT 360 desde el icono → **Crear cuenta** con tu correo y una contraseña.

## 7. Traer tus datos actuales

1. Pasa `datos-iniciales.json` al móvil (correo, Drive…) o hazlo desde el navegador del ordenador entrando con la misma cuenta.
2. En la app: **Progreso → Ajustes y datos → Importar datos** → elige el archivo.
   Trae la semana 43 y 44, tus marcas (banca 4×5×90, dominada 4×6×+20, hombro 4×7×27,5, hack 4×6×60), ritmos y peso corporal.

## Uso diario

- **Semana**: toca un día para marcar trabajo/libre y qué puedes hacer en cada hueco; el plan se recalcula solo. En días pasados, "Registrar lo que hice".
- **Entrenar**: la sesión que toca, con pesos propuestos, check por serie y descansos automáticos (vibra al terminar). "He hecho otra cosa" para registrar cambios, con o sin series.
- **Calendario**: mes completo y gráfica de sesiones por semana.
- **Progreso**: 2 km y 1RM estimados, marcas, test de 2 km, historial, reportes y copia de seguridad.
- **⚑ (arriba a la derecha)**: reporta un fallo o una mejora en cualquier momento. Se guarda con la pantalla, la semana y el plan.

Funciona sin cobertura: lo que registres se sincroniza al volver la conexión.

## Mejoras y correcciones

1. Ve anotando con ⚑ todo lo que detectes.
2. Cada 1-2 semanas: **Progreso → Copiar pendientes para Claude** y pégalo en un chat del proyecto *Salud, Fitness y Alimentación*.
3. Las correcciones se publican sustituyendo los archivos en GitHub (*Add file → Upload files*) o, si conectas el repositorio a Claude, directamente desde allí. La app se actualiza sola al abrirla; tus datos no se tocan porque viven en Firebase.
4. Exporta una copia (**Progreso → Exportar mis datos**) de vez en cuando.

La lógica del planificador está documentada en el proyecto: `planificador-ifm-especificacion.md` (especificación de PDT 360).
