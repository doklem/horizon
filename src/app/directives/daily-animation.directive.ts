import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';
import { AnimationBase } from './animation-base';

@Directive({
  selector: '[horDailyAnimation]'
})
export class DailyAnimationDirective extends AnimationBase implements OnInit {

  @Input()
  public animationId: string;

  @Input()
  public animationAttribute: string;

  @Input()
  public dayTime: string;

  @Input()
  public dailyValues: string;

  @Input()
  public duration: string;

  constructor(
    private readonly element: ElementRef<SVGAElement>,
    private readonly renderer: Renderer2) {
    super();
  }

  public ngOnInit(): void {
    // Create the daily animation.
    const dailyAnimation: SVGAnimateElement = this.renderer.createElement('animate', AnimationBase.SVG_NAMESPACE);
    dailyAnimation.id = this.animationId + 'daily';
    const durationInRealSeconds = this.convertToRealSeconds(this.duration);
    const delayInRealSeconds = AnimationBase.SUN_CYLCE_IN_REAL_SECONDS - durationInRealSeconds;
    this.renderer.setAttribute(
      dailyAnimation, 'begin', `${this.convertToRealSeconds(this.dayTime)}s; ${dailyAnimation.id}.end + ${delayInRealSeconds}s`);
    this.renderer.setAttribute(dailyAnimation, 'values', this.dailyValues);
    this.renderer.setAttribute(dailyAnimation, 'attributeName', this.animationAttribute);
    this.renderer.setAttribute(dailyAnimation, 'dur', `${durationInRealSeconds}s`);
    this.renderer.setAttribute(dailyAnimation, 'attributeType', 'XML');

    // Append the animation.
    this.renderer.appendChild(this.element.nativeElement, dailyAnimation);
  }
}
