import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';
import { AnimationBase } from './animation-base';

@Directive({
  selector: '[horDawnDuskAnimation]'
})
export class DawnDuskAnimationDirective extends AnimationBase implements OnInit {

  @Input()
  public animationId: string;

  @Input()
  public animationAttribute: string;

  @Input()
  public dawnDayTime: string;

  @Input()
  public dawnDuration: string;

  @Input()
  public dawnValue: string;

  @Input()
  public duskDayTime: string;

  @Input()
  public duskDuration: string;

  @Input()
  public duskValue: string;

  constructor(
    private readonly element: ElementRef<SVGAElement>,
    private readonly renderer: Renderer2) {
    super();
  }

  public ngOnInit(): void {
    // Create the dawn animation.
    const dawnAnimation: SVGAnimateElement = this.renderer.createElement('animate', AnimationBase.SVG_NAMESPACE);
    dawnAnimation.id = this.animationId + 'dawn';
    const dawnDurationInRealSeconds = this.convertToRealSeconds(this.dawnDuration);
    const dawnDelayInRealSeconds = AnimationBase.SUN_CYLCE_IN_REAL_SECONDS - dawnDurationInRealSeconds;
    this.renderer.setAttribute(
      dawnAnimation, 'begin', `${this.convertToRealSeconds(this.dawnDayTime)}s; ${dawnAnimation.id}.end + ${dawnDelayInRealSeconds}s`);
    this.renderer.setAttribute(dawnAnimation, 'values', `${this.duskValue};${this.dawnValue}`);
    this.renderer.setAttribute(dawnAnimation, 'attributeName', this.animationAttribute);
    this.renderer.setAttribute(dawnAnimation, 'dur', `${dawnDurationInRealSeconds}s`);
    this.renderer.setAttribute(dawnAnimation, 'attributeType', 'XML');
    this.renderer.setAttribute(dawnAnimation, 'fill', 'freeze');

    // Create the dusk animation.
    const duskAnimation: SVGAnimateElement = this.renderer.createElement('animate', AnimationBase.SVG_NAMESPACE);
    duskAnimation.id = this.animationId + 'dusk';
    const duskDurationInRealSeconds = this.convertToRealSeconds(this.duskDuration);
    const duskDelayInRealSeconds = AnimationBase.SUN_CYLCE_IN_REAL_SECONDS - duskDurationInRealSeconds;
    this.renderer.setAttribute(
      duskAnimation, 'begin', `${this.convertToRealSeconds(this.duskDayTime)}s; ${duskAnimation.id}.end + ${duskDelayInRealSeconds}s`);
    this.renderer.setAttribute(duskAnimation, 'values', `${this.dawnValue};${this.duskValue}`);
    this.renderer.setAttribute(duskAnimation, 'attributeName', this.animationAttribute);
    this.renderer.setAttribute(duskAnimation, 'dur', `${duskDurationInRealSeconds}s`);
    this.renderer.setAttribute(duskAnimation, 'attributeType', 'XML');
    this.renderer.setAttribute(duskAnimation, 'fill', 'freeze');

    // Append the animations.
    this.renderer.appendChild(this.element.nativeElement, dawnAnimation);
    this.renderer.appendChild(this.element.nativeElement, duskAnimation);
  }
}
