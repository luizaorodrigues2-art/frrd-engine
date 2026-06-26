declare module "scrollreveal" {
  interface ScrollRevealObject {
    reveal(
      selector: string,
      config?: Record<string, unknown>
    ): ScrollRevealObject;
    destroy(): void;
  }

  function ScrollReveal(config?: Record<string, unknown>): ScrollRevealObject;
  export default ScrollReveal;
}
