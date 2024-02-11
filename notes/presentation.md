## Look and feel

Designing the look of the game is important.
While it doesn't have any practical impact on project
and actually slows down developing the actual game,
having the project look good will make you want to work
on it more.

## Technologies used

### TypeScript

I think you should absolutely use TypeScript or something better.

Typescript itself seems like a mixed bad.
It is useful, but if you want to follow Typescript through and through,
you often seem to get bogged down in esoteric type problems that have
absolutely nothing to do with whether your code actually works or not.

You're just fighting the typing either because the language itself
cannot cover the uses of different libraries or because the authors
typed it incorrectly.

### Jotai

The original project idea was something different from how it turned out,
and I had chosen Jotai for the original idea. Nonetheless, as there were
already many new technologies for me, I decided to keep it.

Still, I find it convenient to use for holding some global state.
I didn't do anything too crazy with it.

I have to say, though, with Jotai especially I had a lot of typing problems, and eventually many things were just nevers all around.

### MUI

I hadn't used MUI much before this project. When I started using it, I
was actually surprised how low-level it ultimately was.

For example I wanted to use the component Tabs. I read the docs again and
again, but I was just really confused about how you're supposed to use it.
Until I realized the reason I was so confused was because I was expecting
the component to do something for me.

Don't get me wrong, the Tabs component does provide value, but it's mainly styling-related. The actual functionality you have to do almost completely
yourself.

### React Three Fiber

It is convenient to use, and with Drei makes many things faster than with
three.js.

I simply found it oftentimes confusing how things are done with the React
component model. In the React model, something changes and the changes
are reflected in the rendering. So I cannot, for example, simply tell
a mesh to turn. I have to set the turning state somewhere and then the mesh
reflects that state.

So, it was probably a lot easier to start out with it, but I'm not sure if you should just use three.js directly for a game project.

### Zod

I would recommend bringing in Zod or something like it immediately for any project.

Zod's feature of defining the schemas and deriving the TypeScript types from them automatically saves a lot of typing time.
Setting default values gets rid of a lot of annoying "might be number or undefined" TypeScript errors/warnings.
