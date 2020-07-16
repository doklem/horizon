import { Directive, ElementRef, OnInit, Renderer2, Input } from '@angular/core';

@Directive({
  selector: '[horCelestialBodiesAnimation]'
})
export class CelestialBodiesAnimationDirective implements OnInit {

  private static readonly SVG_NAMESPACE = 'http://www.w3.org/2000/svg';

  @Input()
  public dailyOffset: string;

  constructor(
    private readonly element: ElementRef<SVGAElement>,
    private readonly renderer: Renderer2) { }

  public ngOnInit(): void {
    // Create the daily animation.
    const dailyAnimation: SVGAnimateMotionElement = this.renderer.createElement(
      'animateMotion', CelestialBodiesAnimationDirective.SVG_NAMESPACE);
    this.renderer.setAttribute(dailyAnimation, 'begin', `${this.dailyOffset}`);
    this.renderer.setAttribute(dailyAnimation, 'repeatCount', 'indefinite');
    this.renderer.setAttribute(dailyAnimation, 'dur', '40s');
    this.renderer.setAttribute(dailyAnimation, 'path', 'M-800,400 V300 C-800 -50, 800 -50, 800 300 V400');

    // Append the animation.
    this.renderer.appendChild(this.element.nativeElement, dailyAnimation);
  }
}
