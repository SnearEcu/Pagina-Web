# Estructura de Productos — Macroequipos

## Jerarquía de navegación

```
productos.html                          ← Nivel 1: Catálogo general (lista TODAS las categorías)
  └── productos/{categoria}/
        ├── {categoria}.html            ← Nivel 2: Categoría (lista TODOS los tipos de producto)
        └── {tipo-producto}/
              └── {producto}.html       ← Nivel 3: Detalle de producto individual
```

### Ejemplo real (Cocina Industrial — modelo a seguir)

```
productos.html                          ← Catálogo: muestra tarjetas de Agro, Cocina, Veterinaria
  └── productos/cocina/
        ├── cocina.html                 ← Categoría: muestra tarjetas de Ahumador, Fermentadores, Torres, etc.
        ├── kitchen_hero.png            ← Imagen hero de la categoría
        ├── ahumador/
        │     ├── ahumador.html         ← Detalle: descripción, galería, specs, botón cotizar, PDF
        │     ├── vista_frontal cerrado.jpg
        │     ├── frontal_abierto.png
        │     ├── detalles.png
        │     └── Ahumador Multifunción.pdf
        ├── cerveceros/
        │     ├── fermentadores.html    ← Detalle
        │     ├── fermentador_hero.png
        │     ├── torres.html           ← Detalle
        │     └── torre_hero.png
        ├── industria alimentaria/
        │     └── extractores.html      ← Detalle
        ├── mesas/
        │     └── mobiliario.html       ← Detalle
        ├── muebles/
        │     ├── casilleros.html       ← Detalle
        │     └── casilleros_hero.png
        └── procesamiento-termico/
              └── procesamiento-termico.html  ← Detalle
  └── productos/agropecuario/
        ├── agro.html                   ← Categoría
        ├── tanques/
        │     └── tanques.html          ← Detalle
        └── ordeno/
              └── ordeno.html           ← Detalle
  └── productos/veterinaria/
        ├── veterinaria.html            ← Categoría
        ├── mesas-operacion/
        │     └── mesas-operacion.html  ← Detalle
        └── hospitalizacion/
              └── hospitalizacion.html  ← Detalle
```

---

## Niveles y sus páginas

### Nivel 1 — `productos.html` (Catálogo General)

**Propósito:** Mostrar TODAS las categorías principales de productos.

**Contenido:**
- Hero section con título "Nuestros Productos"
- Grid de tarjetas (una por categoría)
- Cada tarjeta es clickeable y navega a la página de categoría

**Tarjeta de categoría:**
```html
<a href="productos/{categoria}/{categoria}.html" class="product-card-link">
  <div class="product-card">
    <div class="product-image">
      <img src="{imagen_hero_categoria}" alt="{Nombre Categoría}">
    </div>
    <div class="product-info">
      <h3>{Nombre Categoría}</h3>
      <p>{Descripción breve de la categoría}</p>
      <span class="btn btn-primary">Ver Variedades</span>
    </div>
  </div>
</a>
```

**Categorías actuales:**
| Categoría         | Carpeta                    | Estado    |
|-------------------|---------------------------|-----------|
| Cocina Industrial | `productos/cocina/`        | ✅ Completa |
| Agro-Industria    | `productos/agropecuario/`  | ✅ Páginas creadas, faltan assets |
| Veterinaria       | `productos/veterinaria/`   | ✅ Páginas creadas, faltan assets |

---

### Nivel 2 — `productos/{categoria}/{categoria}.html` (Página de Categoría)

**Propósito:** Mostrar TODOS los tipos de producto dentro de una categoría.

**Estructura obligatoria:**
1. **Header** con navegación global
2. **Hero de categoría** — imagen de fondo grande con título y subtítulo
3. **Breadcrumb** — navegación jerárquica (Productos › Categoría)
4. **Grid de tarjetas** — una tarjeta por cada tipo/línea de producto
5. **Footer**

**Hero de categoría:**
```html
<section class="hero-category"
    style="background-image: url('{hero_imagen}'); position: relative; height: 350px;
           background-size: cover; background-position: center; display: flex;
           align-items: center; justify-content: center; color: white; text-align: center;
           margin-bottom: 50px;">
  <div style="position: absolute; top:0; left:0; width:100%; height:100%; background: rgba(0,0,0,0.5);"></div>
  <div class="container" style="position: relative; z-index: 2;">
    <h1 style="font-size: 3.5rem; text-shadow: 2px 2px 10px rgba(0,0,0,0.5);">{Nombre Categoría}</h1>
    <p style="font-size: 1.2rem; opacity: 0.9;">{Subtítulo}</p>
  </div>
</section>
```

**Tarjeta de tipo de producto (con página de detalle):**
```html
<a href="{subcarpeta}/{producto}.html" class="product-card-link">
  <div class="product-card">
    <div class="product-image">
      <img src="{subcarpeta}/{imagen_hero}" alt="{Nombre Producto}">
    </div>
    <div class="product-info">
      <h3>{Nombre Producto}</h3>
      <p>{Descripción corta}</p>
      <ul>
        <li>• {Característica 1}</li>
        <li>• {Característica 2}</li>
        <li>• {Característica 3}</li>
      </ul>
      <div style="display: flex; gap: 10px; margin-top: auto;">
        <span class="btn btn-primary">Saber más</span>
      </div>
    </div>
  </div>
</a>
```

> **Regla:** Toda tarjeta de producto DEBE ser clickeable (`<a class="product-card-link">` envolviendo todo el `<div class="product-card">`).
> Si el producto tiene página de detalle → enlaza a ella.
> Si NO tiene página de detalle aún → enlaza a WhatsApp como fallback temporal.

---

### Nivel 3 — `productos/{categoria}/{tipo}/{producto}.html` (Detalle de Producto)

**Propósito:** Información completa de UN producto específico.

**Estructura obligatoria:**
1. **Header** con navegación global + botón "Volver"
2. **Hero de producto** — imagen de fondo con nombre del producto
3. **Sección de descripción** — dos columnas: texto + especificaciones técnicas
4. **Galería** — imágenes del producto (vista frontal, interior, detalles)
5. **Botones de acción** — "Cotizar por WhatsApp" + "Ver Catálogo PDF" (si existe)
6. **Breadcrumb** — navegación jerárquica debajo del hero (Productos › Categoría › Producto)
7. **Footer**

**Hero de producto:**
```html
<section class="hero-product" style="background-image: url('{imagen_principal}');">
  <div class="container">
    <h1>{Nombre del Producto}</h1>
    <p>{Subtítulo}</p>
  </div>
</section>
```

**Sección de specs (dos columnas):**
```html
<section class="container" style="padding: 60px 0;">
  <nav class="breadcrumb">
    <a href="../../../productos.html">Productos</a>
    <span class="separator">›</span>
    <a href="../{categoria}.html">{Nombre Categoría}</a>
    <span class="separator">›</span>
    <span class="current">{Nombre Producto}</span>
  </nav>
  <div class="product-specs">
    <div>
      <h2>Descripción</h2>
      <p>{Descripción extendida del producto}</p>
      <div class="action-btns">
        <button class="btn btn-primary" onclick="document.getElementById('waBtn').click()">
          Cotizar por WhatsApp
        </button>
        <!-- Si hay PDF: -->
        <a href="{archivo}.pdf" target="_blank" class="btn pdf-viewer-btn">Ver Catálogo PDF</a>
      </div>
    </div>
    <div>
      <h2>Características Principales</h2>
      <ul class="spec-list">
        <li><strong>{Label}:</strong> {Valor}</li>
        ...
      </ul>
    </div>
  </div>
</section>
```

**Galería:**
```html
<div style="margin-top: 80px;">
  <h2 style="text-align: center;">Detalles del {Producto}</h2>
  <div class="gallery-grid">
    <div class="gallery-item">
      <img src="{imagen}" alt="{descripción}">
      <p>{Pie de foto}</p>
    </div>
    <!-- Repetir por cada imagen -->
  </div>
</div>
```

---

## Estructura de archivos por categoría

Cada tipo de producto vive en su propia subcarpeta con todos sus assets:

```
productos/{categoria}/{tipo-producto}/
  ├── {producto}.html          ← Página de detalle (obligatorio)
  ├── {imagen}_hero.png        ← Imagen principal / hero (obligatorio)
  ├── {vista_1}.jpg            ← Fotos adicionales para galería
  ├── {vista_2}.png
  ├── {detalles}.png
  └── {Nombre Producto}.pdf    ← Catálogo PDF (opcional)
```

---

## Convenciones de nombres

| Elemento            | Formato                        | Ejemplo                         |
|---------------------|-------------------------------|---------------------------------|
| Carpeta categoría   | minúsculas, sin tildes        | `cocina/`, `agropecuario/`      |
| Carpeta producto    | minúsculas, descriptivo       | `ahumador/`, `cerveceros/`      |
| HTML                | minúsculas, guiones bajos ok  | `ahumador.html`, `torres.html`  |
| Imagen hero         | `{nombre}_hero.png`           | `fermentador_hero.png`          |
| PDF                 | Nombre legible con mayúsculas | `Ahumador Multifunción.pdf`     |

---

## CSS compartido

Todas las páginas usan **el mismo** `style.css` desde la raíz. Referenciarlo según la profundidad:

| Nivel | Ruta al CSS                  |
|-------|------------------------------|
| 1     | `style.css`                  |
| 2     | `../../style.css`            |
| 3     | `../../../style.css`         |

**Clases CSS clave:**
- `.product-card-link` — wrapper `<a>` que hace toda la tarjeta clickeable
- `.product-card` — contenedor visual de la tarjeta
- `.product-image` — contenedor de imagen (250px alto)
- `.product-info` — contenido textual (padding 30px)
- `.product-grid` — grid de 3 columnas responsive
- `.hero-product` — hero de página de detalle
- `.product-specs` — layout de 2 columnas para specs
- `.gallery-grid` — grid de galería de imágenes
- `.spec-list` — lista de especificaciones técnicas
- `.breadcrumb` — navegación jerárquica (Productos › Categoría › Producto)
- `.breadcrumb a` — enlaces clickeables del breadcrumb
- `.breadcrumb .separator` — separador › entre niveles
- `.breadcrumb .current` — página actual (no clickeable, gris)

---

## Estado actual y pendientes

### Cocina Industrial ✅
- [x] `cocina.html` — Página de categoría con hero + breadcrumb
- [x] `ahumador/ahumador.html` — Detalle completo con galería, PDF y breadcrumb
- [x] `cerveceros/fermentadores.html` — Detalle con breadcrumb
- [x] `cerveceros/torres.html` — Detalle con breadcrumb
- [x] `industria alimentaria/extractores.html` — Detalle con breadcrumb
- [x] `muebles/casilleros.html` — Detalle con breadcrumb
- [x] `mesas/mobiliario.html` — Detalle con breadcrumb
- [x] `procesamiento-termico/procesamiento-termico.html` — Detalle con breadcrumb

### Agro-Industria ✅
- [x] `agro.html` — Página de categoría con breadcrumb (sin hero, pendiente)
- [x] `tanques/tanques.html` — Detalle con breadcrumb
- [x] `ordeno/ordeno.html` — Detalle con breadcrumb
- [ ] Agregar hero de categoría a `agro.html`
- [ ] Agregar imágenes de galería propias y PDFs

### Veterinaria ✅
- [x] `veterinaria.html` — Página de categoría con breadcrumb (sin hero, pendiente)
- [x] `mesas-operacion/mesas-operacion.html` — Detalle con breadcrumb
- [x] `hospitalizacion/hospitalizacion.html` — Detalle con breadcrumb
- [ ] Agregar hero de categoría a `veterinaria.html`
- [ ] Agregar imágenes de galería propias y PDFs
