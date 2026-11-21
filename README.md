# Detective Academy 🔍

An interactive, scene-by-scene detective game for running a physical in-person game with 6-year-olds.

**Stack:** Vite · React · TypeScript · Tailwind CSS v4 · Motion (animations)

## Develop

```sh
npm install
npm run dev      # local dev server
npm run build    # type-check + production build into dist/
npm run lint
```

## Adding a scene

1. Create `src/scenes/MyScene.tsx` — a component receiving `{ next, back }`.
2. Register it in order in `src/scenes/index.ts`.

Transitions between scenes are handled in `src/components/SceneTransition.tsx`.
