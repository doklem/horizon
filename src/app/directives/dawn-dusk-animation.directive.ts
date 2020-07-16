import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[horDawnDuskAnimation]'
})
export class DawnDuskAnimationDirective implements OnInit {

  private static readonly SVG_NAMESPACE = 'http://www.w3.org/2000/svg';

  @Input()
  public animationId: string;

  @Input()
  public animationAttribute: string;

  @Input()
  public dawnOffset: string;

  @Input()
  public dawnValue: string;

  @Input()
  public duskOffset: string;

  @Input()
  public duskValue: string;

  constructor(
    private readonly element: ElementRef<SVGAElement>,
    private readonly renderer: Renderer2) {
  }

  public ngOnInit(): void {
    // Create the dawn animation.
    const dawnAnimation: SVGAnimateElement = this.renderer.createElement('animate', DawnDuskAnimationDirective.SVG_NAMESPACE);
    dawnAnimation.id = this.animationId + 'dawn';
    this.renderer.setAttribute(dawnAnimation, 'begin', `${this.dawnOffset}; ${dawnAnimation.id}.end + 36s`);
    this.renderer.setAttribute(dawnAnimation, 'values', `${this.duskValue};${this.dawnValue}`);
    this.renderer.setAttribute(dawnAnimation, 'attributeName', this.animationAttribute);
    this.renderer.setAttribute(dawnAnimation, 'dur', '4s');
    this.renderer.setAttribute(dawnAnimation, 'attributeType', 'XML');
    this.renderer.setAttribute(dawnAnimation, 'fill', 'freeze');

    // Create the dusk animation.
    const duskAnimation: SVGAnimateElement = this.renderer.createElement('animate', DawnDuskAnimationDirective.SVG_NAMESPACE);
    duskAnimation.id = this.animationId + 'dusk';
    this.renderer.setAttribute(duskAnimation, 'begin', `${this.duskOffset}; ${duskAnimation.id}.end + 36s`);
    this.renderer.setAttribute(duskAnimation, 'values', `${this.dawnValue};${this.duskValue}`);
    this.renderer.setAttribute(duskAnimation, 'attributeName', this.animationAttribute);
    this.renderer.setAttribute(duskAnimation, 'dur', '4s');
    this.renderer.setAttribute(duskAnimation, 'attributeType', 'XML');
    this.renderer.setAttribute(duskAnimation, 'fill', 'freeze');

    // Append the animations.
    this.renderer.appendChild(this.element.nativeElement, dawnAnimation);
    this.renderer.appendChild(this.element.nativeElement, duskAnimation);
  }
}
