import {normalizeBool, Type, isType, isBlank, isFunction, stringify} from '../../../runtime/facade/lang';

export class Provider {
  /**
   * Token used when retrieving this provider. Usually, it is a type {@link Type}.
   */
  token;

  /**
   * Binds a DI token to an implementation class.
   *
   * ### Example ([live demo](http://plnkr.co/edit/RSTG86qgmoxCyj9SWPwY?p=preview))
   *
   * Because `useExisting` and `useClass` are often confused, the example contains
   * both use cases for easy comparison.
   *
   * ```typescript
   * class Vehicle {}
   *
   * class Car extends Vehicle {}
   *
   * var injectorClass = Injector.resolveAndCreate([
   *   Car,
   *   {provide: Vehicle,  useClass: Car }
   * ]);
   * var injectorAlias = Injector.resolveAndCreate([
   *   Car,
   *   {provide: Vehicle,  useExisting: Car }
   * ]);
   *
   * expect(injectorClass.get(Vehicle)).not.toBe(injectorClass.get(Car));
   * expect(injectorClass.get(Vehicle) instanceof Car).toBe(true);
   *
   * expect(injectorAlias.get(Vehicle)).toBe(injectorAlias.get(Car));
   * expect(injectorAlias.get(Vehicle) instanceof Car).toBe(true);
   * ```
   */
  useClass: Type;

  /**
   * Binds a DI token to a value.
   *
   * ### Example ([live demo](http://plnkr.co/edit/UFVsMVQIDe7l4waWziES?p=preview))
   *
   * ```javascript
   * var injector = Injector.resolveAndCreate([
   *   new Provider("message", { useValue: 'Hello' })
   * ]);
   *
   * expect(injector.get("message")).toEqual('Hello');
   * ```
   */
  useValue;

  /**
   * Binds a DI token to an existing token.
   *
   * {@link Injector} returns the same instance as if the provided token was used.
   * This is in contrast to `useClass` where a separate instance of `useClass` is returned.
   *
   * ### Example ([live demo](http://plnkr.co/edit/QsatsOJJ6P8T2fMe9gr8?p=preview))
   *
   * Because `useExisting` and `useClass` are often confused the example contains
   * both use cases for easy comparison.
   *
   * ```typescript
   * class Vehicle {}
   *
   * class Car extends Vehicle {}
   *
   * var injectorAlias = Injector.resolveAndCreate([
   *   Car,
   *   {provide: Vehicle,  useExisting: Car }
   * ]);
   * var injectorClass = Injector.resolveAndCreate([
   *   Car,
   *   {provide: Vehicle,  useClass: Car }
   * ]);
   *
   * expect(injectorAlias.get(Vehicle)).toBe(injectorAlias.get(Car));
   * expect(injectorAlias.get(Vehicle) instanceof Car).toBe(true);
   *
   * expect(injectorClass.get(Vehicle)).not.toBe(injectorClass.get(Car));
   * expect(injectorClass.get(Vehicle) instanceof Car).toBe(true);
   * ```
   */
  useExisting;

  /**
   * Binds a DI token to a function which computes the value.
   *
   * ### Example ([live demo](http://plnkr.co/edit/Scoxy0pJNqKGAPZY1VVC?p=preview))
   *
   * ```typescript
   * var injector = Injector.resolveAndCreate([
   *   {provide: Number,  useFactory: () => { return 1+2; }},
   *   new Provider(String, { useFactory: (value) => { return "Value: " + value; },
   *                       deps: [Number] })
   * ]);
   *
   * expect(injector.get(Number)).toEqual(3);
   * expect(injector.get(String)).toEqual('Value: 3');
   * ```
   *
   * Used in conjunction with dependencies.
   */
  useFactory: Function;

  /**
   * Specifies a set of dependencies
   * (as `token`s) which should be injected into the factory function.
   *
   * ### Example ([live demo](http://plnkr.co/edit/Scoxy0pJNqKGAPZY1VVC?p=preview))
   *
   * ```typescript
   * var injector = Injector.resolveAndCreate([
   *   {provide: Number,  useFactory: () => { return 1+2; }},
   *   new Provider(String, { useFactory: (value) => { return "Value: " + value; },
   *                       deps: [Number] })
   * ]);
   *
   * expect(injector.get(Number)).toEqual(3);
   * expect(injector.get(String)).toEqual('Value: 3');
   * ```
   *
   * Used in conjunction with `useFactory`.
   */
  dependencies: Object[];

  /** @internal */
  _multi: boolean;

  constructor(token, {useClass, useValue, useExisting, useFactory, deps, multi}: {
    useClass?: Type,
    useValue?: any,
    useExisting?: any,
    useFactory?: Function,
    deps?: Object[],
    multi?: boolean
  }) {
    this.token = token;
    this.useClass = useClass;
    this.useValue = useValue;
    this.useExisting = useExisting;
    this.useFactory = useFactory;
    this.dependencies = deps;
    this._multi = multi;
  }

  // TODO: Provide a full working example after alpha38 is released.
  /**
   * Creates multiple providers matching the same token (a multi-provider).
   *
   * Multi-providers are used for creating pluggable service, where the system comes
   * with some default providers, and the user can register additional providers.
   * The combination of the default providers and the additional providers will be
   * used to drive the behavior of the system.
   *
   * ### Example
   *
   * ```typescript
   * var injector = Injector.resolveAndCreate([
   *   new Provider("Strings", { useValue: "String1", multi: true}),
   *   new Provider("Strings", { useValue: "String2", multi: true})
   * ]);
   *
   * expect(injector.get("Strings")).toEqual(["String1", "String2"]);
   * ```
   *
   * Multi-providers and regular providers cannot be mixed. The following
   * will throw an exception:
   *
   * ```typescript
   * var injector = Injector.resolveAndCreate([
   *   new Provider("Strings", { useValue: "String1", multi: true }),
   *   new Provider("Strings", { useValue: "String2"})
   * ]);
   * ```
   */
  get multi(): boolean { return normalizeBool(this._multi); }
}
