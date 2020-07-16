import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[horDailyAnimation]'
})
export class DailyAnimationDirective implements OnInit {

  private static readonly SVG_NAMESPACE = 'http://www.w3.org/2000/svg';

  @Input()
  public animationId: string;

  @Input()
  public animationAttribute: string;

  @Input()
  public dailyOffset: string;

  @Input()
  public dailyValues: string;

  constructor(
    private readonly element: ElementRef<SVGAElement>,
    private readonly renderer: Renderer2) {
  }

  public ngOnInit(): void {
    // Create the daily animation.
    const dailyAnimation: SVGAnimateElement = this.renderer.createElement('animate', DailyAnimationDirective.SVG_NAMESPACE);
    dailyAnimation.id = this.animationId + 'daily';
    this.renderer.setAttribute(dailyAnimation, 'begin', `${this.dailyOffset}; ${dailyAnimation.id}.end + 28s`);
    this.renderer.setAttribute(dailyAnimation, 'values', this.dailyValues);
    this.renderer.setAttribute(dailyAnimation, 'attributeName', this.animationAttribute);
    this.renderer.setAttribute(dailyAnimation, 'dur', '12s');
    this.renderer.setAttribute(dailyAnimation, 'attributeType', 'XML');

    // Append the animation.
    this.renderer.appendChild(this.element.nativeElement, dailyAnimation);
  }
}
