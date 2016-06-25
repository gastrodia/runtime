import {Injector, THROW_IF_NOT_FOUND} from './Injector';

/**
 * A ReflectiveDependency injection container used for instantiating objects and resolving
 * dependencies.
 *
 * An `Injector` is a replacement for a `new` operator, which can automatically resolve the
 * constructor dependencies.
 *
 * In typical use, application code asks for the dependencies in the constructor and they are
 * resolved by the `Injector`.
 *
 * ### Example ([live demo](http://plnkr.co/edit/jzjec0?p=preview))
 *
 * The following example creates an `Injector` configured to create `Engine` and `Car`.
 *
 * ```typescript
 * @Injectable()
 * class Engine {
 * }
 *
 * @Injectable()
 * class Car {
 *   constructor(public engine:Engine) {}
 * }
 *
 * var injector = ReflectiveInjector.resolveAndCreate([Car, Engine]);
 * var car = injector.get(Car);
 * expect(car instanceof Car).toBe(true);
 * expect(car.engine instanceof Engine).toBe(true);
 * ```
 *
 * Notice, we don't use the `new` operator because we explicitly want to have the `Injector`
 * resolve all of the object's dependencies automatically.
 */
export abstract class ReflectiveInjector implements Injector {
  /**
   * Turns an array of provider definitions into an array of resolved providers.
   *
   * A resolution is a process of flattening multiple nested arrays and converting individual
   * providers into an array of {@link ResolvedReflectiveProvider}s.
   *
   * ### Example ([live demo](http://plnkr.co/edit/AiXTHi?p=preview))
   *
   * ```typescript
   * @Injectable()
   * class Engine {
   * }
   *
   * @Injectable()
   * class Car {
   *   constructor(public engine:Engine) {}
   * }
   *
   * var providers = ReflectiveInjector.resolve([Car, [[Engine]]]);
   *
   * expect(providers.length).toEqual(2);
   *
   * expect(providers[0] instanceof ResolvedReflectiveProvider).toBe(true);
   * expect(providers[0].key.displayName).toBe("Car");
   * expect(providers[0].dependencies.length).toEqual(1);
   * expect(providers[0].factory).toBeDefined();
   *
   * expect(providers[1].key.displayName).toBe("Engine");
   * });
   * ```
   *
   * See {@link ReflectiveInjector#fromResolvedProviders} for more info.
   */
  static resolve(providers: Array<Type | Provider | {[k: string]: any} | any[]>):
      ResolvedReflectiveProvider[] {
    return resolveReflectiveProviders(providers);
  }

  /**
   * Resolves an array of providers and creates an injector from those providers.
   *
   * The passed-in providers can be an array of `Type`, {@link Provider},
   * or a recursive array of more providers.
   *
   * ### Example ([live demo](http://plnkr.co/edit/ePOccA?p=preview))
   *
   * ```typescript
   * @Injectable()
   * class Engine {
   * }
   *
   * @Injectable()
   * class Car {
   *   constructor(public engine:Engine) {}
   * }
   *
   * var injector = ReflectiveInjector.resolveAndCreate([Car, Engine]);
   * expect(injector.get(Car) instanceof Car).toBe(true);
   * ```
   *
   * This function is slower than the corresponding `fromResolvedProviders`
   * because it needs to resolve the passed-in providers first.
   * See {@link Injector#resolve} and {@link Injector#fromResolvedProviders}.
   */
  static resolveAndCreate(providers: Array<Type | Provider | {[k: string]: any} | any[]>,
                          parent: Injector = null): ReflectiveInjector {
    var ResolvedReflectiveProviders = ReflectiveInjector.resolve(providers);
    return ReflectiveInjector.fromResolvedProviders(ResolvedReflectiveProviders, parent);
  }

  /**
   * Creates an injector from previously resolved providers.
   *
   * This API is the recommended way to construct injectors in performance-sensitive parts.
   *
   * ### Example ([live demo](http://plnkr.co/edit/KrSMci?p=preview))
   *
   * ```typescript
   * @Injectable()
   * class Engine {
   * }
   *
   * @Injectable()
   * class Car {
   *   constructor(public engine:Engine) {}
   * }
   *
   * var providers = ReflectiveInjector.resolve([Car, Engine]);
   * var injector = ReflectiveInjector.fromResolvedProviders(providers);
   * expect(injector.get(Car) instanceof Car).toBe(true);
   * ```
   */
  static fromResolvedProviders(providers: ResolvedReflectiveProvider[],
                               parent: Injector = null): ReflectiveInjector {
    return new ReflectiveInjector_(ReflectiveProtoInjector.fromResolvedProviders(providers),
                                   parent);
  }

  /**
   * @deprecated
   */
  static fromResolvedBindings(providers: ResolvedReflectiveProvider[]): ReflectiveInjector {
    return ReflectiveInjector.fromResolvedProviders(providers);
  }


  /**
   * Parent of this injector.
   *
   * <!-- TODO: Add a link to the section of the user guide talking about hierarchical injection.
   * -->
   *
   * ### Example ([live demo](http://plnkr.co/edit/eosMGo?p=preview))
   *
   * ```typescript
   * var parent = ReflectiveInjector.resolveAndCreate([]);
   * var child = parent.resolveAndCreateChild([]);
   * expect(child.parent).toBe(parent);
   * ```
   */
  get parent(): Injector { return unimplemented(); }


  /**
   * @internal
   */
  debugContext(): any { return null; }

  /**
   * Resolves an array of providers and creates a child injector from those providers.
   *
   * <!-- TODO: Add a link to the section of the user guide talking about hierarchical injection.
   * -->
   *
   * The passed-in providers can be an array of `Type`, {@link Provider},
   * or a recursive array of more providers.
   *
   * ### Example ([live demo](http://plnkr.co/edit/opB3T4?p=preview))
   *
   * ```typescript
   * class ParentProvider {}
   * class ChildProvider {}
   *
   * var parent = ReflectiveInjector.resolveAndCreate([ParentProvider]);
   * var child = parent.resolveAndCreateChild([ChildProvider]);
   *
   * expect(child.get(ParentProvider) instanceof ParentProvider).toBe(true);
   * expect(child.get(ChildProvider) instanceof ChildProvider).toBe(true);
   * expect(child.get(ParentProvider)).toBe(parent.get(ParentProvider));
   * ```
   *
   * This function is slower than the corresponding `createChildFromResolved`
   * because it needs to resolve the passed-in providers first.
   * See {@link Injector#resolve} and {@link Injector#createChildFromResolved}.
   */
  resolveAndCreateChild(
      providers: Array<Type | Provider | {[k: string]: any} | any[]>): ReflectiveInjector {
    return unimplemented();
  }

  /**
   * Creates a child injector from previously resolved providers.
   *
   * <!-- TODO: Add a link to the section of the user guide talking about hierarchical injection.
   * -->
   *
   * This API is the recommended way to construct injectors in performance-sensitive parts.
   *
   * ### Example ([live demo](http://plnkr.co/edit/VhyfjN?p=preview))
   *
   * ```typescript
   * class ParentProvider {}
   * class ChildProvider {}
   *
   * var parentProviders = ReflectiveInjector.resolve([ParentProvider]);
   * var childProviders = ReflectiveInjector.resolve([ChildProvider]);
   *
   * var parent = ReflectiveInjector.fromResolvedProviders(parentProviders);
   * var child = parent.createChildFromResolved(childProviders);
   *
   * expect(child.get(ParentProvider) instanceof ParentProvider).toBe(true);
   * expect(child.get(ChildProvider) instanceof ChildProvider).toBe(true);
   * expect(child.get(ParentProvider)).toBe(parent.get(ParentProvider));
   * ```
   */
  createChildFromResolved(providers: ResolvedReflectiveProvider[]): ReflectiveInjector {
    return unimplemented();
  }

  /**
   * Resolves a provider and instantiates an object in the context of the injector.
   *
   * The created object does not get cached by the injector.
   *
   * ### Example ([live demo](http://plnkr.co/edit/yvVXoB?p=preview))
   *
   * ```typescript
   * @Injectable()
   * class Engine {
   * }
   *
   * @Injectable()
   * class Car {
   *   constructor(public engine:Engine) {}
   * }
   *
   * var injector = ReflectiveInjector.resolveAndCreate([Engine]);
   *
   * var car = injector.resolveAndInstantiate(Car);
   * expect(car.engine).toBe(injector.get(Engine));
   * expect(car).not.toBe(injector.resolveAndInstantiate(Car));
   * ```
   */
  resolveAndInstantiate(provider: Type | Provider): any { return unimplemented(); }

  /**
   * Instantiates an object using a resolved provider in the context of the injector.
   *
   * The created object does not get cached by the injector.
   *
   * ### Example ([live demo](http://plnkr.co/edit/ptCImQ?p=preview))
   *
   * ```typescript
   * @Injectable()
   * class Engine {
   * }
   *
   * @Injectable()
   * class Car {
   *   constructor(public engine:Engine) {}
   * }
   *
   * var injector = ReflectiveInjector.resolveAndCreate([Engine]);
   * var carProvider = ReflectiveInjector.resolve([Car])[0];
   * var car = injector.instantiateResolved(carProvider);
   * expect(car.engine).toBe(injector.get(Engine));
   * expect(car).not.toBe(injector.instantiateResolved(carProvider));
   * ```
   */
  instantiateResolved(provider: ResolvedReflectiveProvider): any { return unimplemented(); }

  abstract get(token: any, notFoundValue?: any): any;
}
