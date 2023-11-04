# FiveM Svetle Template
(Svelte + TypeScript + Vite)

## Installation:
This template should help get you started developing with Svelte and TypeScript in Vite.

1. copy repo to a folder (e.g. ts_srcipt/svelte/)
2. run `npm i`
3. run `npm run dev` or `npm run build`

## Usage of NUI events:
The communication between Lua and TypeScript / Svelte is achieved through NUI Events.
```lua
---@param name string (the name of the event)
---@param any any (any paran you whould like to pass on) 
function Svelte:SendNuiEvent(name, ...)
    SendNUIMessage({
        action = name,
        data = ...
    })
end   
```

```ts
useNuiEvent("someEventName", function(data: any) {
    console.log(data?.someParam)
});
```

## Recomended usage of UI Libs:
- [Flowbite](https://flowbite-svelte.com)
- [Shadcn Svelte](https://www.shadcn-svelte.com)

