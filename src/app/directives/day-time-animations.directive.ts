import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';
import { environment } from '../../environments/environment';
import { DayTimeAnimationModel } from '../models/day-time-animation-model';

@Directive({
  selector: '[appDayTimeAnimations]'
})
export class DayTimeAnimationsDirective implements OnInit {

  private static readonly SVG_NAMESPACE = 'http://www.w3.org/2000/svg';

  private static readonly SUN_CYCLE_RATIO = environment.sunCycleInSeconds / new Date('1970-01-02T00:00Z').valueOf();

  @Input()
  public appDayTimeAnimations: Array<DayTimeAnimationModel>;

  constructor(
    private readonly element: ElementRef<SVGAElement>,
    private readonly renderer: Renderer2) {
  }

  private static convertToSeconds(dayTime: string): number {
    return new Date(`1970-01-01T${dayTime}Z`).valueOf() * DayTimeAnimationsDirective.SUN_CYCLE_RATIO;
  }

  public ngOnInit(): void {
    const elementId = this.element.nativeElement.id;
    if (elementId === undefined || elementId === null || elementId.trim().length < 1) {
      throw new Error(`Please specify an ID for the animation's parent!`);
    }
    this.setInitialValues();
    this.appDayTimeAnimations.forEach((model, index) => this.addAnimation(model, `${elementId}_${index}`));
  }

  private addAnimation(model: DayTimeAnimationModel, animationId: string): void {
    // Create the animation.
    const animation: SVGAnimateElement = this.renderer.createElement('animate', DayTimeAnimationsDirective.SVG_NAMESPACE);
    animation.id = animationId;
    const durationInSeconds = DayTimeAnimationsDirective.convertToSeconds(model.duration);
    if (model.onceADay) {
      const delayInSeconds = environment.sunCycleInSeconds - durationInSeconds;
      if (delayInSeconds < 0) {
        throw new Error(
          `The duration '${model.duration}' of the animation with the Id '${animationId}' is too long! It should be within 24h.`);
      }
      this.renderer.setAttribute(
        animation,
        'begin',
        `${DayTimeAnimationsDirective.convertToSeconds(model.dayTime)}s; ${animation.id}.end + ${delayInSeconds}s`);
    } else {
      this.renderer.setAttribute(
        animation,
        'begin',
        `${DayTimeAnimationsDirective.convertToSeconds(model.dayTime)}s`);
      this.renderer.setAttribute(animation, 'repeatCount', 'indefinite');
    }
    this.renderer.setAttribute(animation, 'values', model.values);
    this.renderer.setAttribute(animation, 'attributeName', model.attribute);
    this.renderer.setAttribute(animation, 'dur', `${durationInSeconds}s`);
    this.renderer.setAttribute(animation, 'attributeType', 'XML');
    if (model.freeze) {
      this.renderer.setAttribute(animation, 'fill', 'freeze');
    }

    // Append the animation.
    this.renderer.appendChild(this.element.nativeElement, animation);
  }

  private setInitialValues(): void {
    // Get a distinct list of all attribute names.
    const initialValuePerAttributes = {};
    this.appDayTimeAnimations.map(model => initialValuePerAttributes[model.attribute] = null);

    // Determin the first value for each attribute
    for (const attribute in initialValuePerAttributes) {
      if (initialValuePerAttributes.hasOwnProperty(attribute)) {
        initialValuePerAttributes[attribute] = this.appDayTimeAnimations
          .filter(model => model.attribute === attribute)
          .sort((modelA, modelB) => modelA.dayTime.localeCompare(modelB.dayTime))[0].values
          .split(';')[0];

        // Set the attribute value on the element.
        this.renderer.setAttribute(this.element.nativeElement, attribute, initialValuePerAttributes[attribute]);
      }
    }
  }
}
