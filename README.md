# STUDIO — Premium landing page за изработка на уебсайтове

Модерен, premium dark/tech сайт за човек/агенция, която прави уебсайтове за бизнеси.
Изграден така, че **всяка част да е отделен, ясно надписан „рафт“** — лесно и за теб, и за клиента.

> Стек: **Next.js 14 (App Router) · TypeScript · Tailwind CSS · Framer Motion**

---

## 🚀 Стартиране

```bash
npm install
npm run dev      # отваря на http://localhost:3000
```

Production:

```bash
npm run build
npm start
```

---

## 🗂️ Рафтът с етикети — какво / къде / как / защо

| # | Секция | Файл | Какво прави |
|---|--------|------|-------------|
| 1 | **Hero** | `components/sections/Hero.tsx` + `BrowserMockup.tsx` | Първо впечатление, CTA, анимиран browser монитор |
| 2 | **Проблем / Решение** | `components/sections/ProblemSolution.tsx` | Болка vs лекарство — задържа вниманието |
| 3 | **Услуги** | `components/sections/Services.tsx` | 4 нива сайтове в карти с glow & hover |
| 4 | **Портфолио** | `components/sections/Portfolio.tsx` | Доказателство + интерактивен hover preview |
| 5 | **Процес** | `components/sections/Process.tsx` | Timeline със scroll-анимирана линия |
| 6 | **Защо аз** | `components/sections/WhyMe.tsx` | Доверие (bento grid) |
| 7 | **Резултати** | `components/sections/Results.tsx` | Осезаема бизнес стойност |
| 8 | **Контакт** | `components/sections/Contact.tsx` | Финален CTA + форма |

Подредбата (в `app/page.tsx`) следва UX логиката: **проблем → решение → доказателство → контакт.**

### Помощни „инструменти“ (reusable)

| Файл | Роля |
|------|------|
| `components/ui/Section.tsx` | Обвивка на секция: id, етикет, заглавие, ритъм |
| `components/ui/Reveal.tsx` | Scroll-reveal анимация |
| `components/ui/MagneticButton.tsx` | Магнитен бутон (primary / ghost) |
| `components/ui/CursorGlow.tsx` | Светлинен ореол след курсора |
| `components/ui/ScrollProgress.tsx` | Лента за прогрес на скрола |
| `components/ui/Icons.tsx` | SVG икони (без emoji) |
| `components/layout/Navbar.tsx` | Плаващ стъклен navbar + mobile меню |
| `components/layout/Footer.tsx` | Footer + social линкове |

---

## ✏️ Какво да попълниш (търси `PLACEHOLDER`)

Почти всичко се сменя на **едно място** — `lib/content.ts`:

- **`brand`** — име, имейл, телефон, social линкове.
- **`projects`** — име, описание, категория, `link` (`[PROJECT_1_LINK]` …) и `image`.
- Текстовете на всички секции (hero, услуги, процес, контакт …).

Други места:
- `app/layout.tsx` → `siteUrl` (реалния домейн за SEO/OpenGraph).
- `public/projects/` → сложи screenshot-и (виж README.txt вътре).
- `components/sections/Contact.tsx` → свържи формата с реален бекенд
  (Resend / Formspree / собствено `/api/contact`). Сега симулира успех.

---

## 🎨 Дизайн система

- **Цветове** (`tailwind.config.ts`): `ink` (тъмен фон), `accent` (violet) + `accent-cyan`.
- **Шрифтове**: Space Grotesk (заглавия) + Inter (текст, с кирилица).
- **Ефекти**: glassmorphism, glow, grid фон, градиентен текст.

## ⚡ Производителност & достъпност

- Респектира `prefers-reduced-motion` (анимациите спират).
- Semantic HTML (`header`, `main`, `section`, `footer`), `h1`→`h3` йерархия.
- `alt`/`aria-label` по иконите и формите; видими focus states.
- Анимации само през `transform`/`opacity`; lazy чрез scroll-reveal.
- SEO метаданни + OpenGraph в `app/layout.tsx`.

---

## 🌐 Deploy

Препоръчано на **Vercel**: качи repo-то → автоматичен build (`next build`).
Не забравяй да смениш `siteUrl` и да добавиш реалните контакти преди публикуване.
