/** Stylesheets imported as unprocessed text by Vite. */
declare module '*.css?raw' {
  const css: string;
  export default css;
}
