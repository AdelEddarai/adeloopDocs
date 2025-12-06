Here’s what I found about Fumadocs (the Next.js-based docs framework) — and whether you can import a custom TSX/React component inside an MDX doc (yes — and how).

---

## ✅ What is Fumadocs — quick overview

* Fumadocs is open-source, built for documentation sites using React/Next.js. It supports Markdown and MDX as content sources. ([Fumadocs][1])
* It’s modular: there is `fumadocs-mdx` (to handle MDX content), `fumadocs-core`, `fumadocs-ui` for UI components, plus optional extensions like OpenAPI, Obsidian-style markdown, etc. ([Fumadocs][1])
* It uses MDX under the hood: MDX lets you write JSX inside `.mdx` files — so you can embed React components directly. ([Fumadocs][2])

---

## ✅ Yes — you *can* import a component in MDX with Fumadocs

Because Fumadocs supports MDX, and MDX supports JSX + imports, you can import custom React/TSX components inside your `.mdx` docs. ([Fumadocs][2])

For example in MDX you could do:

```mdx
import MyIllustration from '../components/MyIllustration';

<MyIllustration someProp="value" />
```

This works the same way as in plain MDX + React setups.

---

## ⚠️ A catch: Async Mode changes how imports work

If you enable “Async Mode” for your docs collection in Fumadocs, by default:

* MDX files cannot contain `import` or `export` statements. ([Fumadocs][3])
* Instead, MDX components should be passed via the `components` prop when rendering. ([Fumadocs][3])

This means: if you want to embed custom TSX components inside MDX while using Async Mode, you need to register them in your MDX components mapping — and not rely on inline `import (...)` inside MDX.

---

## 🛠️ How to do it (both modes)

### Traditional (synchronous) mode — direct import in MDX

1. Ensure `fumadocs-mdx` + config installed and configured per docs. ([Fumadocs][4])

2. Create your React/TSX component in your project, e.g. `components/SkeletonIllustration.tsx`.

3. In your `.mdx` file:

   ```mdx
   import SkeletonIllustration from '../components/SkeletonIllustration'

   # My docs

   Here is an illustration:

   <SkeletonIllustration width={200} height={200} />
   ```

4. That component will render as usual when the MDX is compiled and rendered.

### Async Mode — inject components instead of import

If you use Async Mode (configured in your `defineDocs`), you cannot `import` inside the MDX:

1. In your `source.config.ts`:

   ```ts
   export const docs = defineDocs({
     dir: 'content/docs',
     docs: { async: true },
   })
   ```

2. In your rendering page (e.g. `app/docs/[[...slug]]/page.tsx`) you get the MDX content via `.load()`:

   ```ts
   const { body: MdxContent } = await page.data.load();
   ```

3. Pass a `components` prop containing your custom components:

   ```tsx
   import SkeletonIllustration from '@/components/SkeletonIllustration';
   import defaultMdxComponents from 'fumadocs-ui/mdx';

   return (
     <MdxContent components={{ ...defaultMdxComponents, SkeletonIllustration }} />
   );
   ```

4. In your `.mdx` you can then simply use `<SkeletonIllustration />` (no import).

This approach works if you prefer central registration of MDX components and avoid writing imports in every MDX doc. ([Fumadocs][3])

---

## 💡 Recommendation (given you have a TSX illustration skeleton component)

Given that you have a TSX component that displays an illustration skeleton — if you want the simplest developer experience and easy reuse across docs — I’d go with **synchronous MDX + direct import** (first method). That way each doc can import what it needs, no extra registration.

If you foresee many docs using shared custom components (or want stricter consistency), use **Async Mode + components injection**.

Because you are a full-stack dev — both approaches are maintainable.

---

If you like — I can draft a **minimal example project structure** (folder layout + config + MDX + TSX) showing how to integrate your skeleton component in Fumadocs. Do you want me to build it for you now?

[1]: https://fumadocs.dev/?utm_source=chatgpt.com "Fumadocs"
[2]: https://v14.fumadocs.dev/docs/ui/markdown?utm_source=chatgpt.com "Markdown | Fumadocs"
[3]: https://preview.fumadocs.dev/docs/mdx/async?utm_source=chatgpt.com "Async Mode | Fumadocs"
[4]: https://fumadocs.dev/docs/mdx/next?utm_source=chatgpt.com "Next.js | Fumadocs"
