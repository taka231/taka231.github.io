import lume from "lume/mod.ts";
import jsx from "lume/plugins/jsx.ts";
import katex from "lume/plugins/katex.ts";
import mdx from "lume/plugins/mdx.ts";
import tailwindcss from "lume/plugins/tailwindcss.ts";
import postcss from "lume/plugins/postcss.ts";
import codeHighlight from "lume/plugins/code_highlight.ts";

const site = lume();

site.ignore("CLAUDE.md");

site.use(jsx());
site.use(katex());
site.use(mdx());
site.use(codeHighlight({
  theme: {
    name: "atom-one-dark",
    cssFile: "/styles.css",
    placeholder: "/* code-highlight-theme */"
  }
}));
site.use(tailwindcss());
site.use(postcss());

export default site;
