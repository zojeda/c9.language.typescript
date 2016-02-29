// Compiled using typings@0.6.8
// Source: node_modules/rxjs/Subject.d.ts
declare module 'rxjs/Subject' {
import { Operator } from 'rxjs/Operator';
import { Observer } from 'rxjs/Observer';
import { Observable } from 'rxjs/Observable';
import { Subscriber } from 'rxjs/Subscriber';
import { Subscription } from 'rxjs/Subscription';
export class Subject<T> extends Observable<T> implements Observer<T>, Subscription {
    protected destination: Observer<T>;
    protected source: Observable<T>;
    static create: Function;
    constructor(destination?: Observer<T>, source?: Observable<T>);
    observers: Observer<T>[];
    isUnsubscribed: boolean;
    protected isStopped: boolean;
    protected hasErrored: boolean;
    protected errorValue: any;
    protected dispatching: boolean;
    protected hasCompleted: boolean;
    lift<T, R>(operator: Operator<T, R>): Observable<T>;
    add(subscription: Subscription | Function | void): void;
    remove(subscription: Subscription): void;
    unsubscribe(): void;
    protected _subscribe(subscriber: Subscriber<T>): Subscription | Function | void;
    protected _unsubscribe(): void;
    next(value: T): void;
    error(err?: any): void;
    complete(): void;
    asObservable(): Observable<T>;
    protected _next(value: T): void;
    protected _finalNext(value: T): void;
    protected _error(err: any): void;
    protected _finalError(err: any): void;
    protected _complete(): void;
    protected _finalComplete(): void;
    private throwIfUnsubscribed();
}
}

// Compiled using typings@0.6.8
// Source: node_modules/rxjs/Scheduler.d.ts
declare module 'rxjs/Scheduler' {
import { Subscription } from 'rxjs/Subscription';
import { Action } from 'rxjs/scheduler/Action';
export interface Scheduler {
    now(): number;
    schedule<T>(work: (state?: any) => Subscription | void, delay?: number, state?: any): Subscription;
    flush(): void;
    active: boolean;
    actions: Action[];
    scheduledId: number;
}
}

// Compiled using typings@0.6.8
// Source: node_modules/rxjs/CoreOperators.d.ts
declare module 'rxjs/CoreOperators' {
import { Observable } from 'rxjs/Observable';
import { Scheduler } from 'rxjs/Scheduler';
import { ConnectableObservable } from 'rxjs/observable/ConnectableObservable';
import { Subject } from 'rxjs/Subject';
import { GroupedObservable } from 'rxjs/operator/groupBy';
import { Notification } from 'rxjs/Notification';
import { CombineLatestSignature } from 'rxjs/operator/combineLatest';
import { WithLatestFromSignature } from 'rxjs/operator/withLatestFrom';
import { ZipSignature } from 'rxjs/operator/zip';
import { BufferSignature } from 'rxjs/operator/buffer';
import { BufferCountSignature } from 'rxjs/operator/bufferCount';
import { BufferTimeSignature } from 'rxjs/operator/bufferTime';
import { BufferToggleSignature } from 'rxjs/operator/bufferToggle';
import { BufferWhenSignature } from 'rxjs/operator/bufferWhen';
import { WindowSignature } from 'rxjs/operator/window';
import { WindowCountSignature } from 'rxjs/operator/windowCount';
import { WindowTimeSignature } from 'rxjs/operator/windowTime';
import { WindowToggleSignature } from 'rxjs/operator/windowToggle';
import { WindowWhenSignature } from 'rxjs/operator/windowWhen';
export interface CoreOperators<T> {
    buffer: BufferSignature<T>;
    bufferCount: BufferCountSignature<T>;
    bufferTime: BufferTimeSignature<T>;
    bufferToggle: BufferToggleSignature<T>;
    bufferWhen: BufferWhenSignature<T>;
    catch?: (selector: (err: any, source: Observable<T>, caught: Observable<any>) => Observable<any>) => Observable<T>;
    combineAll?: <R>(project?: (...values: Array<any>) => R) => Observable<R>;
    combineLatest: CombineLatestSignature<T>;
    concat?: <R>(...observables: (Observable<any> | Scheduler)[]) => Observable<R>;
    concatAll?: () => Observable<T>;
    concatMap?: <R>(project: ((x: T, ix: number) => Observable<any>), projectResult?: (x: T, y: any, ix: number, iy: number) => R) => Observable<R>;
    concatMapTo?: <R>(observable: Observable<any>, projectResult?: (x: T, y: any, ix: number, iy: number) => R) => Observable<R>;
    count?: (predicate?: (value: T, index: number, source: Observable<T>) => boolean) => Observable<number>;
    dematerialize?: () => Observable<any>;
    debounce?: (durationSelector: (value: T) => Observable<any> | Promise<any>) => Observable<T>;
    debounceTime?: <R>(dueTime: number, scheduler?: Scheduler) => Observable<R>;
    defaultIfEmpty?: <R>(defaultValue?: T | R) => Observable<T> | Observable<R>;
    delay?: (delay: number, scheduler?: Scheduler) => Observable<T>;
    delayWhen?: (delayDurationSelector: (value: T) => Observable<any>, subscriptionDelay?: Observable<any>) => Observable<T>;
    distinctUntilChanged?: (compare?: (x: T, y: T) => boolean) => Observable<T>;
    do?: (next?: (x: T) => void, error?: (e: any) => void, complete?: () => void) => Observable<T>;
    expand?: <R>(project: (x: T, ix: number) => Observable<R>, concurrent: number, scheduler: Scheduler) => Observable<R>;
    filter?: (predicate: (x: T) => boolean, ix?: number, thisArg?: any) => Observable<T>;
    finally?: (finallySelector: () => void) => Observable<T>;
    first?: <R>(predicate?: (value: T, index: number, source: Observable<T>) => boolean, resultSelector?: (value: T, index: number) => R, defaultValue?: any) => Observable<T> | Observable<R>;
    flatMap?: <R>(project: ((x: T, ix: number) => Observable<any>), projectResult?: (x: T, y: any, ix: number, iy: number) => R, concurrent?: number) => Observable<R>;
    flatMapTo?: <R>(observable: Observable<any>, projectResult?: (x: T, y: any, ix: number, iy: number) => R, concurrent?: number) => Observable<R>;
    groupBy?: <K, R>(keySelector: (value: T) => string, elementSelector?: (value: T) => R, durationSelector?: (group: GroupedObservable<K, R>) => Observable<any>) => Observable<GroupedObservable<K, R>>;
    ignoreElements?: () => Observable<T>;
    inspect?: (durationSelector: (value: T) => Observable<any> | Promise<any>) => Observable<T>;
    inspectTime?: (delay: number, scheduler?: Scheduler) => Observable<T>;
    last?: <R>(predicate?: (value: T, index: number) => boolean, resultSelector?: (value: T, index: number) => R, defaultValue?: any) => Observable<T> | Observable<R>;
    every?: (predicate: (value: T, index: number) => boolean, thisArg?: any) => Observable<T>;
    map?: <R>(project: (x: T, ix?: number) => R, thisArg?: any) => Observable<R>;
    mapTo?: <R>(value: R) => Observable<R>;
    materialize?: () => Observable<Notification<T>>;
    merge?: (...observables: any[]) => Observable<any>;
    mergeAll?: (concurrent?: number) => Observable<T>;
    mergeMap?: <R>(project: ((x: T, ix: number) => Observable<any>), projectResult?: (x: T, y: any, ix: number, iy: number) => R, concurrent?: number) => Observable<R>;
    mergeMapTo?: <R>(observable: Observable<any>, projectResult?: (x: T, y: any, ix: number, iy: number) => R, concurrent?: number) => Observable<R>;
    multicast?: (subjectOrSubjectFactory: Subject<T> | (() => Subject<T>)) => ConnectableObservable<T>;
    observeOn?: (scheduler: Scheduler, delay?: number) => Observable<T>;
    partition?: (predicate: (x: T) => boolean) => Observable<T>[];
    publish?: () => ConnectableObservable<T>;
    publishBehavior?: (value: any) => ConnectableObservable<T>;
    publishReplay?: (bufferSize?: number, windowTime?: number, scheduler?: Scheduler) => ConnectableObservable<T>;
    publishLast?: () => ConnectableObservable<T>;
    reduce?: <R>(project: (acc: R, x: T) => R, seed?: R) => Observable<R>;
    repeat?: (count?: number) => Observable<T>;
    retry?: (count?: number) => Observable<T>;
    retryWhen?: (notifier: (errors: Observable<any>) => Observable<any>) => Observable<T>;
    sample?: (notifier: Observable<any>) => Observable<T>;
    sampleTime?: (delay: number, scheduler?: Scheduler) => Observable<T>;
    scan?: <R>(project: (acc: R, x: T) => R, acc?: R) => Observable<R>;
    share?: () => Observable<T>;
    single?: (predicate?: (value: T, index: number) => boolean) => Observable<T>;
    skip?: (count: number) => Observable<T>;
    skipUntil?: (notifier: Observable<any>) => Observable<T>;
    skipWhile?: (predicate: (x: T, index: number) => boolean) => Observable<T>;
    startWith?: (x: T) => Observable<T>;
    subscribeOn?: (scheduler: Scheduler, delay?: number) => Observable<T>;
    switch?: () => Observable<T>;
    switchMap?: <R>(project: ((x: T, ix: number) => Observable<any>), projectResult?: (x: T, y: any, ix: number, iy: number) => R) => Observable<R>;
    switchMapTo?: <R>(observable: Observable<any>, projectResult?: (x: T, y: any, ix: number, iy: number) => R) => Observable<R>;
    take?: (count: number) => Observable<T>;
    takeLast?: (count: number) => Observable<T>;
    takeUntil?: (notifier: Observable<any>) => Observable<T>;
    takeWhile?: (predicate: (value: T, index: number) => boolean) => Observable<T>;
    throttle?: (durationSelector: (value: T) => Observable<any> | Promise<any>) => Observable<T>;
    throttleTime?: (delay: number, scheduler?: Scheduler) => Observable<T>;
    timeout?: (due: number | Date, errorToSend?: any, scheduler?: Scheduler) => Observable<T>;
    timeoutWith?: <R>(due: number | Date, withObservable: Observable<R>, scheduler?: Scheduler) => Observable<T> | Observable<R>;
    toArray?: () => Observable<T[]>;
    toPromise?: (PromiseCtor: typeof Promise) => Promise<T>;
    window: WindowSignature<T>;
    windowCount: WindowCountSignature<T>;
    windowTime: WindowTimeSignature<T>;
    windowToggle: WindowToggleSignature<T>;
    windowWhen: WindowWhenSignature<T>;
    withLatestFrom: WithLatestFromSignature<T>;
    zip: ZipSignature<T>;
    zipAll?: <R>(project?: (...values: Array<any>) => R) => Observable<R>;
}
}

// Compiled using typings@0.6.8
// Source: node_modules/rxjs/operator/groupBy.d.ts
declare module 'rxjs/operator/groupBy' {
import { Subscriber } from 'rxjs/Subscriber';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
/**
 * Groups the items emitted by an Observable according to a specified criterion,
 * and emits these grouped items as `GroupedObservables`, one `GroupedObservable` per group.
 *
 * <img src="./img/groupBy.png" width="100%">
 *
 * @param {Function} keySelector - a function that extracts the key for each item
 * @param {Function} elementSelector - a function that extracts the return element for each item
 * @returns {Observable} an Observable that emits GroupedObservables, each of which corresponds
 * to a unique key value and each of which emits those items from the source Observable that share
 * that key value.
 */
export function groupBy<T, K, R>(keySelector: (value: T) => K, elementSelector?: (value: T) => R, durationSelector?: (grouped: GroupedObservable<K, R>) => Observable<any>): Observable<GroupedObservable<K, R>>;
export interface RefCountSubscription {
    count: number;
    unsubscribe: () => void;
    isUnsubscribed: boolean;
    attemptedToUnsubscribe: boolean;
}
export class GroupedObservable<K, T> extends Observable<T> {
    key: K;
    private groupSubject;
    private refCountSubscription;
    constructor(key: K, groupSubject: Subject<T>, refCountSubscription?: RefCountSubscription);
    protected _subscribe(subscriber: Subscriber<T>): Subscription;
}
}

// Compiled using typings@0.6.8
// Source: node_modules/rxjs/OuterSubscriber.d.ts
declare module 'rxjs/OuterSubscriber' {
import { Subscriber } from 'rxjs/Subscriber';
import { InnerSubscriber } from 'rxjs/InnerSubscriber';
export class OuterSubscriber<T, R> extends Subscriber<T> {
    notifyNext(outerValue: T, innerValue: R, outerIndex: number, innerIndex: number, innerSub: InnerSubscriber<T, R>): void;
    notifyError(error: any, innerSub: InnerSubscriber<T, R>): void;
    notifyComplete(innerSub: InnerSubscriber<T, R>): void;
}
}

// Compiled using typings@0.6.8
// Source: node_modules/rxjs/InnerSubscriber.d.ts
declare module 'rxjs/InnerSubscriber' {
import { Subscriber } from 'rxjs/Subscriber';
import { OuterSubscriber } from 'rxjs/OuterSubscriber';
export class InnerSubscriber<T, R> extends Subscriber<R> {
    private parent;
    private outerValue;
    private outerIndex;
    private index;
    constructor(parent: OuterSubscriber<T, R>, outerValue: T, outerIndex: number);
    protected _next(value: R): void;
    protected _error(error: any): void;
    protected _complete(): void;
}
}

// Compiled using typings@0.6.8
// Source: node_modules/rxjs/operator/combineLatest.d.ts
declare module 'rxjs/operator/combineLatest' {
import { Observable, ObservableInput } from 'rxjs/Observable';
import { Operator } from 'rxjs/Operator';
import { Subscriber } from 'rxjs/Subscriber';
import { OuterSubscriber } from 'rxjs/OuterSubscriber';
import { InnerSubscriber } from 'rxjs/InnerSubscriber';
/**
 * Combines the values from this observable with values from observables passed as arguments. This is done by subscribing
 * to each observable, in order, and collecting an array of each of the most recent values any time any of the observables
 * emits, then either taking that array and passing it as arguments to an option `project` function and emitting the return
 * value of that, or just emitting the array of recent values directly if there is no `project` function.
 * @param {...Observable} observables the observables to combine the source with
 * @param {function} [project] an optional function to project the values from the combined recent values into a new value for emission.
 * @returns {Observable} an observable of other projected values from the most recent values from each observable, or an array of each of
 * the most recent values from each observable.
 */
export function combineLatest<T, R>(...observables: Array<ObservableInput<any> | Array<ObservableInput<any>> | ((...values: Array<any>) => R)>): Observable<R>;
export interface CombineLatestSignature<T> {
    <R>(project: (v1: T) => R): Observable<R>;
    <T2, R>(v2: ObservableInput<T2>, project: (v1: T, v2: T2) => R): Observable<R>;
    <T2, T3, R>(v2: ObservableInput<T2>, v3: ObservableInput<T3>, project: (v1: T, v2: T2, v3: T3) => R): Observable<R>;
    <T2, T3, T4, R>(v2: ObservableInput<T2>, v3: ObservableInput<T3>, v4: ObservableInput<T4>, project: (v1: T, v2: T2, v3: T3, v4: T4) => R): Observable<R>;
    <T2, T3, T4, T5, R>(v2: ObservableInput<T2>, v3: ObservableInput<T3>, v4: ObservableInput<T4>, v5: ObservableInput<T5>, project: (v1: T, v2: T2, v3: T3, v4: T4, v5: T5) => R): Observable<R>;
    <T2, T3, T4, T5, T6, R>(v2: ObservableInput<T2>, v3: ObservableInput<T3>, v4: ObservableInput<T4>, v5: ObservableInput<T5>, v6: ObservableInput<T6>, project: (v1: T, v2: T2, v3: T3, v4: T4, v5: T5, v6: T6) => R): Observable<R>;
    <T2>(v2: ObservableInput<T2>): Observable<[T, T2]>;
    <T2, T3>(v2: ObservableInput<T2>, v3: ObservableInput<T3>): Observable<[T, T2, T3]>;
    <T2, T3, T4>(v2: ObservableInput<T2>, v3: ObservableInput<T3>, v4: ObservableInput<T4>): Observable<[T, T2, T3, T4]>;
    <T2, T3, T4, T5>(v2: ObservableInput<T2>, v3: ObservableInput<T3>, v4: ObservableInput<T4>, v5: ObservableInput<T5>): Observable<[T, T2, T3, T4, T5]>;
    <T2, T3, T4, T5, T6>(v2: ObservableInput<T2>, v3: ObservableInput<T3>, v4: ObservableInput<T4>, v5: ObservableInput<T5>, v6: ObservableInput<T6>): Observable<[T, T2, T3, T4, T5, T6]>;
    <R>(...observables: Array<ObservableInput<any> | ((...values: Array<any>) => R)>): Observable<R>;
    <R>(array: ObservableInput<any>[]): Observable<R>;
    <R>(array: ObservableInput<any>[], project: (...values: Array<any>) => R): Observable<R>;
}
/**
 * Combines the values from observables passed as arguments. This is done by subscribing
 * to each observable, in order, and collecting an array of each of the most recent values any time any of the observables
 * emits, then either taking that array and passing it as arguments to an option `project` function and emitting the return
 * value of that, or just emitting the array of recent values directly if there is no `project` function.
 * @param {...Observable} observables the observables to combine
 * @param {function} [project] an optional function to project the values from the combined recent values into a new value for emission.
 * @returns {Observable} an observable of other projected values from the most recent values from each observable, or an array of each of
 * the most recent values from each observable.
 */
export function combineLatestStatic<T>(v1: ObservableInput<T>): Observable<[T]>;
export function combineLatestStatic<T, T2>(v1: ObservableInput<T>, v2: ObservableInput<T2>): Observable<[T, T2]>;
export function combineLatestStatic<T, T2, T3>(v1: ObservableInput<T>, v2: ObservableInput<T2>, v3: ObservableInput<T3>): Observable<[T, T2, T3]>;
export function combineLatestStatic<T, T2, T3, T4>(v1: ObservableInput<T>, v2: ObservableInput<T2>, v3: ObservableInput<T3>, v4: ObservableInput<T4>): Observable<[T, T2, T3, T4]>;
export function combineLatestStatic<T, T2, T3, T4, T5>(v1: ObservableInput<T>, v2: ObservableInput<T2>, v3: ObservableInput<T3>, v4: ObservableInput<T4>, v5: ObservableInput<T5>): Observable<[T, T2, T3, T4, T5]>;
export function combineLatestStatic<T, T2, T3, T4, T5, T6>(v1: ObservableInput<T>, v2: ObservableInput<T2>, v3: ObservableInput<T3>, v4: ObservableInput<T4>, v5: ObservableInput<T5>, v6: ObservableInput<T6>): Observable<[T, T2, T3, T4, T5, T6]>;
export function combineLatestStatic<T, R>(v1: ObservableInput<T>, project: (v1: T) => R): Observable<R>;
export function combineLatestStatic<T, T2, R>(v1: ObservableInput<T>, v2: ObservableInput<T2>, project: (v1: T, v2: T2) => R): Observable<R>;
export function combineLatestStatic<T, T2, T3, R>(v1: ObservableInput<T>, v2: ObservableInput<T2>, v3: ObservableInput<T3>, project: (v1: T, v2: T2, v3: T3) => R): Observable<R>;
export function combineLatestStatic<T, T2, T3, T4, R>(v1: ObservableInput<T>, v2: ObservableInput<T2>, v3: ObservableInput<T3>, v4: ObservableInput<T4>, project: (v1: T, v2: T2, v3: T3, v4: T4) => R): Observable<R>;
export function combineLatestStatic<T, T2, T3, T4, T5, R>(v1: ObservableInput<T>, v2: ObservableInput<T2>, v3: ObservableInput<T3>, v4: ObservableInput<T4>, v5: ObservableInput<T5>, project: (v1: T, v2: T2, v3: T3, v4: T4, v5: T5) => R): Observable<R>;
export function combineLatestStatic<T, T2, T3, T4, T5, T6, R>(v1: ObservableInput<T>, v2: ObservableInput<T2>, v3: ObservableInput<T3>, v4: ObservableInput<T4>, v5: ObservableInput<T5>, v6: ObservableInput<T6>, project: (v1: T, v2: T2, v3: T3, v4: T4, v5: T5, v6: T6) => R): Observable<R>;
export function combineLatestStatic<R>(...observables: Array<ObservableInput<any> | ((...values: Array<any>) => R)>): Observable<R>;
export function combineLatestStatic<R>(array: ObservableInput<any>[]): Observable<R>;
export function combineLatestStatic<R>(array: ObservableInput<any>[], project: (...values: Array<any>) => R): Observable<R>;
export class CombineLatestOperator<T, R> implements Operator<T, R> {
    private project;
    constructor(project?: (...values: Array<any>) => R);
    call(subscriber: Subscriber<R>): Subscriber<T>;
}
export class CombineLatestSubscriber<T, R> extends OuterSubscriber<T, R> {
    private project;
    private active;
    private values;
    private observables;
    private toRespond;
    constructor(destination: Subscriber<R>, project?: (...values: Array<any>) => R);
    protected _next(observable: any): void;
    protected _complete(): void;
    notifyComplete(unused: Subscriber<R>): void;
    notifyNext(outerValue: T, innerValue: R, outerIndex: number, innerIndex: number, innerSub: InnerSubscriber<T, R>): void;
    private _tryProject(values);
}
}

// Compiled using typings@0.6.8
// Source: node_modules/rxjs/operator/concat.d.ts
declare module 'rxjs/operator/concat' {
import { Observable } from 'rxjs/Observable';
import { Scheduler } from 'rxjs/Scheduler';
/**
 * Joins this observable with multiple other observables by subscribing to them one at a time, starting with the source,
 * and merging their results into the returned observable. Will wait for each observable to complete before moving
 * on to the next.
 * @params {...Observable} the observables to concatenate
 * @params {Scheduler} [scheduler] an optional scheduler to schedule each observable subscription on.
 * @returns {Observable} All values of each passed observable merged into a single observable, in order, in serial fashion.
 */
export function concat<T, R>(...observables: Array<Observable<any> | Scheduler>): Observable<R>;
/**
 * Joins multiple observables together by subscribing to them one at a time and merging their results
 * into the returned observable. Will wait for each observable to complete before moving on to the next.
 * @params {...Observable} the observables to concatenate
 * @params {Scheduler} [scheduler] an optional scheduler to schedule each observable subscription on.
 * @returns {Observable} All values of each passed observable merged into a single observable, in order, in serial fashion.
 */
export function concatStatic<T, R>(...observables: Array<Observable<any> | Scheduler>): Observable<R>;
}

// Compiled using typings@0.6.8
// Source: node_modules/rxjs/operator/merge.d.ts
declare module 'rxjs/operator/merge' {
import { Observable } from 'rxjs/Observable';
import { Scheduler } from 'rxjs/Scheduler';
/**
 * Creates a result Observable which emits values from every given input Observable.
 *
 * <img src="./img/merge.png" width="100%">
 *
 * @param {Observable} input Observables
 * @returns {Observable} an Observable that emits items that are the result of every input Observable.
 */
export function merge<T, R>(...observables: Array<Observable<any> | Scheduler | number>): Observable<R>;
export function mergeStatic<T, R>(...observables: Array<Observable<any> | Scheduler | number>): Observable<R>;
}

// Compiled using typings@0.6.8
// Source: node_modules/rxjs/operator/zip.d.ts
declare module 'rxjs/operator/zip' {
import { Observable, ObservableInput } from 'rxjs/Observable';
import { Operator } from 'rxjs/Operator';
import { Subscriber } from 'rxjs/Subscriber';
export function zipProto<R>(...observables: Array<ObservableInput<any> | ((...values: Array<any>) => R)>): Observable<R>;
export interface ZipSignature<T> {
    <R>(project: (v1: T) => R): Observable<R>;
    <T2, R>(v2: ObservableInput<T2>, project: (v1: T, v2: T2) => R): Observable<R>;
    <T2, T3, R>(v2: ObservableInput<T2>, v3: ObservableInput<T3>, project: (v1: T, v2: T2, v3: T3) => R): Observable<R>;
    <T2, T3, T4, R>(v2: ObservableInput<T2>, v3: ObservableInput<T3>, v4: ObservableInput<T4>, project: (v1: T, v2: T2, v3: T3, v4: T4) => R): Observable<R>;
    <T2, T3, T4, T5, R>(v2: ObservableInput<T2>, v3: ObservableInput<T3>, v4: ObservableInput<T4>, v5: ObservableInput<T5>, project: (v1: T, v2: T2, v3: T3, v4: T4, v5: T5) => R): Observable<R>;
    <T2, T3, T4, T5, T6, R>(v2: ObservableInput<T2>, v3: ObservableInput<T3>, v4: ObservableInput<T4>, v5: ObservableInput<T5>, v6: ObservableInput<T6>, project: (v1: T, v2: T2, v3: T3, v4: T4, v5: T5, v6: T6) => R): Observable<R>;
    <T2>(v2: ObservableInput<T2>): Observable<[T, T2]>;
    <T2, T3>(v2: ObservableInput<T2>, v3: ObservableInput<T3>): Observable<[T, T2, T3]>;
    <T2, T3, T4>(v2: ObservableInput<T2>, v3: ObservableInput<T3>, v4: ObservableInput<T4>): Observable<[T, T2, T3, T4]>;
    <T2, T3, T4, T5>(v2: ObservableInput<T2>, v3: ObservableInput<T3>, v4: ObservableInput<T4>, v5: ObservableInput<T5>): Observable<[T, T2, T3, T4, T5]>;
    <T2, T3, T4, T5, T6>(v2: ObservableInput<T2>, v3: ObservableInput<T3>, v4: ObservableInput<T4>, v5: ObservableInput<T5>, v6: ObservableInput<T6>): Observable<[T, T2, T3, T4, T5, T6]>;
    <R>(...observables: Array<ObservableInput<any> | ((...values: Array<any>) => R)>): Observable<R>;
    <R>(array: ObservableInput<any>[]): Observable<R>;
    <R>(array: ObservableInput<any>[], project: (...values: Array<any>) => R): Observable<R>;
}
export function zipStatic<T>(v1: ObservableInput<T>): Observable<[T]>;
export function zipStatic<T, T2>(v1: ObservableInput<T>, v2: ObservableInput<T2>): Observable<[T, T2]>;
export function zipStatic<T, T2, T3>(v1: ObservableInput<T>, v2: ObservableInput<T2>, v3: ObservableInput<T3>): Observable<[T, T2, T3]>;
export function zipStatic<T, T2, T3, T4>(v1: ObservableInput<T>, v2: ObservableInput<T2>, v3: ObservableInput<T3>, v4: ObservableInput<T4>): Observable<[T, T2, T3, T4]>;
export function zipStatic<T, T2, T3, T4, T5>(v1: ObservableInput<T>, v2: ObservableInput<T2>, v3: ObservableInput<T3>, v4: ObservableInput<T4>, v5: ObservableInput<T5>): Observable<[T, T2, T3, T4, T5]>;
export function zipStatic<T, T2, T3, T4, T5, T6>(v1: ObservableInput<T>, v2: ObservableInput<T2>, v3: ObservableInput<T3>, v4: ObservableInput<T4>, v5: ObservableInput<T5>, v6: ObservableInput<T6>): Observable<[T, T2, T3, T4, T5, T6]>;
export function zipStatic<T, R>(v1: ObservableInput<T>, project: (v1: T) => R): Observable<R>;
export function zipStatic<T, T2, R>(v1: ObservableInput<T>, v2: ObservableInput<T2>, project: (v1: T, v2: T2) => R): Observable<R>;
export function zipStatic<T, T2, T3, R>(v1: ObservableInput<T>, v2: ObservableInput<T2>, v3: ObservableInput<T3>, project: (v1: T, v2: T2, v3: T3) => R): Observable<R>;
export function zipStatic<T, T2, T3, T4, R>(v1: ObservableInput<T>, v2: ObservableInput<T2>, v3: ObservableInput<T3>, v4: ObservableInput<T4>, project: (v1: T, v2: T2, v3: T3, v4: T4) => R): Observable<R>;
export function zipStatic<T, T2, T3, T4, T5, R>(v1: ObservableInput<T>, v2: ObservableInput<T2>, v3: ObservableInput<T3>, v4: ObservableInput<T4>, v5: ObservableInput<T5>, project: (v1: T, v2: T2, v3: T3, v4: T4, v5: T5) => R): Observable<R>;
export function zipStatic<T, T2, T3, T4, T5, T6, R>(v1: ObservableInput<T>, v2: ObservableInput<T2>, v3: ObservableInput<T3>, v4: ObservableInput<T4>, v5: ObservableInput<T5>, v6: ObservableInput<T6>, project: (v1: T, v2: T2, v3: T3, v4: T4, v5: T5, v6: T6) => R): Observable<R>;
export function zipStatic<R>(...observables: Array<ObservableInput<any> | ((...values: Array<any>) => R)>): Observable<R>;
export function zipStatic<R>(array: ObservableInput<any>[]): Observable<R>;
export function zipStatic<R>(array: ObservableInput<any>[], project: (...values: Array<any>) => R): Observable<R>;
export class ZipOperator<T, R> implements Operator<T, R> {
    project: (...values: Array<any>) => R;
    constructor(project?: (...values: Array<any>) => R);
    call(subscriber: Subscriber<R>): Subscriber<T>;
}
export class ZipSubscriber<T, R> extends Subscriber<T> {
    private index;
    private values;
    private project;
    private iterators;
    private active;
    constructor(destination: Subscriber<R>, project?: (...values: Array<any>) => R, values?: any);
    protected _next(value: any): void;
    protected _complete(): void;
    notifyInactive(): void;
    checkIterators(): void;
    protected _tryProject(args: any[]): void;
}
}

// Compiled using typings@0.6.8
// Source: node_modules/rxjs/observable/BoundCallbackObservable.d.ts
declare module 'rxjs/observable/BoundCallbackObservable' {
import { Observable } from 'rxjs/Observable';
import { Subscriber } from 'rxjs/Subscriber';
import { Subscription } from 'rxjs/Subscription';
import { Scheduler } from 'rxjs/Scheduler';
import { AsyncSubject } from 'rxjs/subject/AsyncSubject';
export class BoundCallbackObservable<T> extends Observable<T> {
    private callbackFunc;
    private selector;
    private args;
    scheduler: Scheduler;
    subject: AsyncSubject<T>;
    static create<R>(callbackFunc: (callback: (result: R) => any) => any, selector?: void, scheduler?: Scheduler): () => Observable<R>;
    static create<T, R>(callbackFunc: (v1: T, callback: (result: R) => any) => any, selector?: void, scheduler?: Scheduler): (v1: T) => Observable<R>;
    static create<T, T2, R>(callbackFunc: (v1: T, v2: T2, callback: (result: R) => any) => any, selector?: void, scheduler?: Scheduler): (v1: T, v2: T2) => Observable<R>;
    static create<T, T2, T3, R>(callbackFunc: (v1: T, v2: T2, v3: T3, callback: (result: R) => any) => any, selector?: void, scheduler?: Scheduler): (v1: T, v2: T2, v3: T3) => Observable<R>;
    static create<T, T2, T3, T4, R>(callbackFunc: (v1: T, v2: T2, v3: T3, v4: T4, callback: (result: R) => any) => any, selector?: void, scheduler?: Scheduler): (v1: T, v2: T2, v3: T3, v4: T4) => Observable<R>;
    static create<T, T2, T3, T4, T5, R>(callbackFunc: (v1: T, v2: T2, v3: T3, v4: T4, v5: T5, callback: (result: R) => any) => any, selector?: void, scheduler?: Scheduler): (v1: T, v2: T2, v3: T3, v4: T4, v5: T5) => Observable<R>;
    static create<T, T2, T3, T4, T5, T6, R>(callbackFunc: (v1: T, v2: T2, v3: T3, v4: T4, v5: T5, v6: T6, callback: (result: R) => any) => any, selector?: void, scheduler?: Scheduler): (v1: T, v2: T2, v3: T3, v4: T4, v5: T5, v6: T6) => Observable<R>;
    static create<R>(callbackFunc: (callback: (...args: any[]) => any) => any, selector: (...args: any[]) => R, scheduler?: Scheduler): () => Observable<R>;
    static create<T, R>(callbackFunc: (v1: T, callback: (...args: any[]) => any) => any, selector: (...args: any[]) => R, scheduler?: Scheduler): (v1: T) => Observable<R>;
    static create<T, T2, R>(callbackFunc: (v1: T, v2: T2, callback: (...args: any[]) => any) => any, selector: (...args: any[]) => R, scheduler?: Scheduler): (v1: T, v2: T2) => Observable<R>;
    static create<T, T2, T3, R>(callbackFunc: (v1: T, v2: T2, v3: T3, callback: (...args: any[]) => any) => any, selector: (...args: any[]) => R, scheduler?: Scheduler): (v1: T, v2: T2, v3: T3) => Observable<R>;
    static create<T, T2, T3, T4, R>(callbackFunc: (v1: T, v2: T2, v3: T3, v4: T4, callback: (...args: any[]) => any) => any, selector: (...args: any[]) => R, scheduler?: Scheduler): (v1: T, v2: T2, v3: T3, v4: T4) => Observable<R>;
    static create<T, T2, T3, T4, T5, R>(callbackFunc: (v1: T, v2: T2, v3: T3, v4: T4, v5: T5, callback: (...args: any[]) => any) => any, selector: (...args: any[]) => R, scheduler?: Scheduler): (v1: T, v2: T2, v3: T3, v4: T4, v5: T5) => Observable<R>;
    static create<T, T2, T3, T4, T5, T6, R>(callbackFunc: (v1: T, v2: T2, v3: T3, v4: T4, v5: T5, v6: T6, callback: (...args: any[]) => any) => any, selector: (...args: any[]) => R, scheduler?: Scheduler): (v1: T, v2: T2, v3: T3, v4: T4, v5: T5, v6: T6) => Observable<R>;
    static create<T>(callbackFunc: Function, selector?: void, scheduler?: Scheduler): (...args: any[]) => Observable<T>;
    static create<T>(callbackFunc: Function, selector?: (...args: any[]) => T, scheduler?: Scheduler): (...args: any[]) => Observable<T>;
    constructor(callbackFunc: Function, selector: Function, args: any[], scheduler: Scheduler);
    protected _subscribe(subscriber: Subscriber<T | T[]>): Subscription;
}
}

// Compiled using typings@0.6.8
// Source: node_modules/rxjs/observable/BoundNodeCallbackObservable.d.ts
declare module 'rxjs/observable/BoundNodeCallbackObservable' {
import { Observable } from 'rxjs/Observable';
import { Subscriber } from 'rxjs/Subscriber';
import { Subscription } from 'rxjs/Subscription';
import { Scheduler } from 'rxjs/Scheduler';
import { AsyncSubject } from 'rxjs/subject/AsyncSubject';
export class BoundNodeCallbackObservable<T> extends Observable<T> {
    private callbackFunc;
    private selector;
    private args;
    scheduler: Scheduler;
    subject: AsyncSubject<T>;
    static create<R>(callbackFunc: (callback: (err: any, result: R) => any) => any, selector?: void, scheduler?: Scheduler): () => Observable<R>;
    static create<T, R>(callbackFunc: (v1: T, callback: (err: any, result: R) => any) => any, selector?: void, scheduler?: Scheduler): (v1: T) => Observable<R>;
    static create<T, T2, R>(callbackFunc: (v1: T, v2: T2, callback: (err: any, result: R) => any) => any, selector?: void, scheduler?: Scheduler): (v1: T, v2: T2) => Observable<R>;
    static create<T, T2, T3, R>(callbackFunc: (v1: T, v2: T2, v3: T3, callback: (err: any, result: R) => any) => any, selector?: void, scheduler?: Scheduler): (v1: T, v2: T2, v3: T3) => Observable<R>;
    static create<T, T2, T3, T4, R>(callbackFunc: (v1: T, v2: T2, v3: T3, v4: T4, callback: (err: any, result: R) => any) => any, selector?: void, scheduler?: Scheduler): (v1: T, v2: T2, v3: T3, v4: T4) => Observable<R>;
    static create<T, T2, T3, T4, T5, R>(callbackFunc: (v1: T, v2: T2, v3: T3, v4: T4, v5: T5, callback: (err: any, result: R) => any) => any, selector?: void, scheduler?: Scheduler): (v1: T, v2: T2, v3: T3, v4: T4, v5: T5) => Observable<R>;
    static create<T, T2, T3, T4, T5, T6, R>(callbackFunc: (v1: T, v2: T2, v3: T3, v4: T4, v5: T5, v6: T6, callback: (err: any, result: R) => any) => any, selector?: void, scheduler?: Scheduler): (v1: T, v2: T2, v3: T3, v4: T4, v5: T5, v6: T6) => Observable<R>;
    static create<T>(callbackFunc: Function, selector?: void, scheduler?: Scheduler): (...args: any[]) => Observable<T>;
    static create<T>(callbackFunc: Function, selector?: (...args: any[]) => T, scheduler?: Scheduler): (...args: any[]) => Observable<T>;
    constructor(callbackFunc: Function, selector: Function, args: any[], scheduler: Scheduler);
    protected _subscribe(subscriber: Subscriber<T | T[]>): Subscription;
}
}

// Compiled using typings@0.6.8
// Source: node_modules/rxjs/observable/DeferObservable.d.ts
declare module 'rxjs/observable/DeferObservable' {
import { Observable } from 'rxjs/Observable';
import { Subscriber } from 'rxjs/Subscriber';
export class DeferObservable<T> extends Observable<T> {
    private observableFactory;
    static create<T>(observableFactory: () => Observable<T>): Observable<T>;
    constructor(observableFactory: () => Observable<T>);
    protected _subscribe(subscriber: Subscriber<T>): void;
}
}

// Compiled using typings@0.6.8
// Source: node_modules/rxjs/observable/EmptyObservable.d.ts
declare module 'rxjs/observable/EmptyObservable' {
import { Scheduler } from 'rxjs/Scheduler';
import { Subscriber } from 'rxjs/Subscriber';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
export class EmptyObservable<T> extends Observable<T> {
    private scheduler;
    static create<T>(scheduler?: Scheduler): Observable<T>;
    static dispatch({subscriber}: {
        subscriber: any;
    }): void;
    constructor(scheduler?: Scheduler);
    protected _subscribe(subscriber: Subscriber<T>): Subscription | Function | void;
}
}

// Compiled using typings@0.6.8
// Source: node_modules/rxjs/observable/ForkJoinObservable.d.ts
declare module 'rxjs/observable/ForkJoinObservable' {
import { Observable } from 'rxjs/Observable';
import { Subscriber } from 'rxjs/Subscriber';
export class ForkJoinObservable<T> extends Observable<T> {
    private sources;
    private resultSelector;
    constructor(sources: Array<Observable<any> | Promise<any>>, resultSelector?: (...values: Array<any>) => T);
    static create<T>(...sources: Array<Observable<any> | Promise<any> | Array<Observable<any>> | ((...values: Array<any>) => any)>): Observable<T>;
    protected _subscribe(subscriber: Subscriber<any>): void;
}
}

// Compiled using typings@0.6.8
// Source: node_modules/rxjs/observable/FromObservable.d.ts
declare module 'rxjs/observable/FromObservable' {
import { Scheduler } from 'rxjs/Scheduler';
import { Observable } from 'rxjs/Observable';
import { Subscriber } from 'rxjs/Subscriber';
export class FromObservable<T> extends Observable<T> {
    private ish;
    private scheduler;
    constructor(ish: Observable<T> | Promise<T> | Iterator<T> | ArrayLike<T>, scheduler: Scheduler);
    static create<T>(ish: any, mapFnOrScheduler: Scheduler | ((x: any, y: number) => T), thisArg?: any, lastScheduler?: Scheduler): Observable<T>;
    protected _subscribe(subscriber: Subscriber<T>): any;
}
}

// Compiled using typings@0.6.8
// Source: node_modules/rxjs/observable/ArrayObservable.d.ts
declare module 'rxjs/observable/ArrayObservable' {
import { Scheduler } from 'rxjs/Scheduler';
import { Observable } from 'rxjs/Observable';
import { Subscriber } from 'rxjs/Subscriber';
import { Subscription } from 'rxjs/Subscription';
export class ArrayObservable<T> extends Observable<T> {
    array: T[];
    scheduler: Scheduler;
    static create<T>(array: T[], scheduler?: Scheduler): ArrayObservable<T>;
    static of<T>(...array: Array<T | Scheduler>): Observable<T>;
    static dispatch(state: any): void;
    value: any;
    constructor(array: T[], scheduler?: Scheduler);
    protected _subscribe(subscriber: Subscriber<T>): Subscription | Function | void;
}
}

// Compiled using typings@0.6.8
// Source: node_modules/rxjs/observable/FromEventObservable.d.ts
declare module 'rxjs/observable/FromEventObservable' {
import { Observable } from 'rxjs/Observable';
import { Subscriber } from 'rxjs/Subscriber';
export type NodeStyleEventEmmitter = {
    addListener: (eventName: string, handler: Function) => void;
    removeListener: (eventName: string, handler: Function) => void;
};
export type JQueryStyleEventEmitter = {
    on: (eventName: string, handler: Function) => void;
    off: (eventName: string, handler: Function) => void;
};
export type EventTargetLike = EventTarget | NodeStyleEventEmmitter | JQueryStyleEventEmitter | NodeList | HTMLCollection;
export class FromEventObservable<T, R> extends Observable<T> {
    private sourceObj;
    private eventName;
    private selector;
    static create<T>(sourceObj: EventTargetLike, eventName: string, selector?: (...args: Array<any>) => T): Observable<T>;
    constructor(sourceObj: EventTargetLike, eventName: string, selector?: (...args: Array<any>) => T);
    private static setupSubscription<T>(sourceObj, eventName, handler, subscriber);
    protected _subscribe(subscriber: Subscriber<T>): void;
}
}

// Compiled using typings@0.6.8
// Source: node_modules/rxjs/observable/FromEventPatternObservable.d.ts
declare module 'rxjs/observable/FromEventPatternObservable' {
import { Observable } from 'rxjs/Observable';
import { Subscriber } from 'rxjs/Subscriber';
export class FromEventPatternObservable<T, R> extends Observable<T> {
    private addHandler;
    private removeHandler;
    private selector;
    static create<T>(addHandler: (handler: Function) => any, removeHandler: (handler: Function) => void, selector?: (...args: Array<any>) => T): FromEventPatternObservable<T, {}>;
    constructor(addHandler: (handler: Function) => any, removeHandler: (handler: Function) => void, selector?: (...args: Array<any>) => T);
    protected _subscribe(subscriber: Subscriber<T>): void;
}
}

// Compiled using typings@0.6.8
// Source: node_modules/rxjs/observable/PromiseObservable.d.ts
declare module 'rxjs/observable/PromiseObservable' {
import { Scheduler } from 'rxjs/Scheduler';
import { Observable } from 'rxjs/Observable';
import { Subscriber } from 'rxjs/Subscriber';
import { Subscription } from 'rxjs/Subscription';
export class PromiseObservable<T> extends Observable<T> {
    private promise;
    scheduler: Scheduler;
    value: T;
    static create<T>(promise: Promise<T>, scheduler?: Scheduler): Observable<T>;
    constructor(promise: Promise<T>, scheduler?: Scheduler);
    protected _subscribe(subscriber: Subscriber<T>): Subscription | Function | void;
}
}

// Compiled using typings@0.6.8
// Source: node_modules/rxjs/observable/IntervalObservable.d.ts
declare module 'rxjs/observable/IntervalObservable' {
import { Subscriber } from 'rxjs/Subscriber';
import { Scheduler } from 'rxjs/Scheduler';
import { Observable } from 'rxjs/Observable';
export class IntervalObservable extends Observable<number> {
    private period;
    private scheduler;
    static create(period?: number, scheduler?: Scheduler): Observable<number>;
    static dispatch(state: any): void;
    constructor(period?: number, scheduler?: Scheduler);
    protected _subscribe(subscriber: Subscriber<number>): void;
}
}

// Compiled using typings@0.6.8
// Source: node_modules/rxjs/observable/TimerObservable.d.ts
declare module 'rxjs/observable/TimerObservable' {
import { Scheduler } from 'rxjs/Scheduler';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Subscriber } from 'rxjs/Subscriber';
export class TimerObservable extends Observable<number> {
    static create(dueTime?: number | Date, period?: number | Scheduler, scheduler?: Scheduler): Observable<number>;
    static dispatch(state: any): any;
    private period;
    private dueTime;
    private scheduler;
    constructor(dueTime?: number | Date, period?: number | Scheduler, scheduler?: Scheduler);
    protected _subscribe(subscriber: Subscriber<number>): Subscription | Function | void;
}
}

// Compiled using typings@0.6.8
// Source: node_modules/rxjs/operator/race.d.ts
declare module 'rxjs/operator/race' {
import { Observable } from 'rxjs/Observable';
import { Operator } from 'rxjs/Operator';
import { Subscriber } from 'rxjs/Subscriber';
import { OuterSubscriber } from 'rxjs/OuterSubscriber';
import { InnerSubscriber } from 'rxjs/InnerSubscriber';
/**
 * Returns an Observable that mirrors the first source Observable to emit an item
 * from the combination of this Observable and supplied Observables
 * @param {...Observables} ...observables sources used to race for which Observable emits first.
 * @returns {Observable} an Observable that mirrors the output of the first Observable to emit an item.
 */
export function race<T>(...observables: Array<Observable<T> | Array<Observable<T>>>): Observable<T>;
/**
 * Returns an Observable that mirrors the first source Observable to emit an item.
 * @param {...Observables} ...observables sources used to race for which Observable emits first.
 * @returns {Observable} an Observable that mirrors the output of the first Observable to emit an item.
 */
export function raceStatic<T>(...observables: Array<Observable<T> | Array<Observable<T>>>): Observable<T>;
export class RaceOperator<T> implements Operator<T, T> {
    call(subscriber: Subscriber<T>): Subscriber<T>;
}
export class RaceSubscriber<T, R> extends OuterSubscriber<T, R> {
    private hasFirst;
    private observables;
    private subscriptions;
    constructor(destination: Subscriber<T>);
    protected _next(observable: any): void;
    protected _complete(): void;
    notifyNext(outerValue: T, innerValue: R, outerIndex: number, innerIndex: number, innerSub: InnerSubscriber<T, R>): void;
}
}

// Compiled using typings@0.6.8
// Source: node_modules/rxjs/observable/RangeObservable.d.ts
declare module 'rxjs/observable/RangeObservable' {
import { Scheduler } from 'rxjs/Scheduler';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Subscriber } from 'rxjs/Subscriber';
export class RangeObservable extends Observable<number> {
    static create(start?: number, end?: number, scheduler?: Scheduler): Observable<number>;
    static dispatch(state: any): void;
    private start;
    private end;
    private scheduler;
    constructor(start: number, end: number, scheduler?: Scheduler);
    protected _subscribe(subscriber: Subscriber<number>): Subscription | Function | void;
}
}

// Compiled using typings@0.6.8
// Source: node_modules/rxjs/observable/NeverObservable.d.ts
declare module 'rxjs/observable/NeverObservable' {
import { Observable } from 'rxjs/Observable';
import { Subscriber } from 'rxjs/Subscriber';
export class NeverObservable<T> extends Observable<T> {
    static create<T>(): NeverObservable<T>;
    constructor();
    protected _subscribe(subscriber: Subscriber<T>): void;
}
}

// Compiled using typings@0.6.8
// Source: node_modules/rxjs/observable/ErrorObservable.d.ts
declare module 'rxjs/observable/ErrorObservable' {
import { Scheduler } from 'rxjs/Scheduler';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
export class ErrorObservable extends Observable<any> {
    error: any;
    private scheduler;
    static create<T>(error: any, scheduler?: Scheduler): ErrorObservable;
    static dispatch({error, subscriber}: {
        error: any;
        subscriber: any;
    }): void;
    constructor(error: any, scheduler?: Scheduler);
    protected _subscribe(subscriber: any): Subscription | Function | void;
}
}

// Compiled using typings@0.6.8
// Source: node_modules/rxjs/observable/dom/AjaxObservable.d.ts
declare module 'rxjs/observable/dom/AjaxObservable' {
import { Observable } from 'rxjs/Observable';
import { Subscriber } from 'rxjs/Subscriber';
import { Subscription } from 'rxjs/Subscription';
export interface AjaxRequest {
    url?: string;
    body?: any;
    user?: string;
    async?: boolean;
    method: string;
    headers?: Object;
    timeout?: number;
    password?: string;
    hasContent?: boolean;
    crossDomain?: boolean;
    createXHR?: () => XMLHttpRequest;
    progressSubscriber?: Subscriber<any>;
    resultSelector?: <T>(response: AjaxResponse) => T;
    responseType?: string;
}
export interface AjaxCreationMethod {
    (): <T>(urlOrRequest: string | AjaxRequest) => Observable<T>;
    get: <T>(url: string, resultSelector?: (response: AjaxResponse) => T, headers?: Object) => Observable<T>;
    post: <T>(url: string, body?: any, headers?: Object) => Observable<T>;
    put: <T>(url: string, body?: any, headers?: Object) => Observable<T>;
    delete: <T>(url: string, headers?: Object) => Observable<T>;
    getJSON: <T, R>(url: string, resultSelector?: (data: T) => R, headers?: Object) => Observable<R>;
}
export function ajaxGet<T>(url: string, resultSelector?: (response: AjaxResponse) => T, headers?: Object): AjaxObservable<T>;
export function ajaxPost<T>(url: string, body?: any, headers?: Object): Observable<T>;
export function ajaxDelete<T>(url: string, headers?: Object): Observable<T>;
export function ajaxPut<T>(url: string, body?: any, headers?: Object): Observable<T>;
export function ajaxGetJSON<T, R>(url: string, resultSelector?: (data: T) => R, headers?: Object): Observable<R>;
/**
 * Creates an observable for an Ajax request with either a request object with url, headers, etc or a string for a URL.
 *
 * @example
 *   source = Rx.Observable.ajax('/products');
 *   source = Rx.Observable.ajax( url: 'products', method: 'GET' });
 *
 * @param {Object} request Can be one of the following:
 *
 *  A string of the URL to make the Ajax call.
 *  An object with the following properties
 *   - url: URL of the request
 *   - body: The body of the request
 *   - method: Method of the request, such as GET, POST, PUT, PATCH, DELETE
 *   - async: Whether the request is async
 *   - headers: Optional headers
 *   - crossDomain: true if a cross domain request, else false
 *   - createXHR: a function to override if you need to use an alternate XMLHttpRequest implementation.
 *   - resultSelector: a function to use to alter the output value type of the Observable. Gets {AjaxResponse} as an argument
 * @returns {Observable} An observable sequence containing the XMLHttpRequest.
*/
export class AjaxObservable<T> extends Observable<T> {
    static create: AjaxCreationMethod;
    private request;
    constructor(urlOrRequest: string | AjaxRequest);
    protected _subscribe(subscriber: Subscriber<T>): Subscription | Function | void;
}
export class AjaxSubscriber<T> extends Subscriber<Event> {
    request: AjaxRequest;
    private xhr;
    private resultSelector;
    private done;
    constructor(destination: Subscriber<T>, request: AjaxRequest);
    next(e: Event): void;
    private send();
    private serializeBody(body, contentType);
    private setHeaders(xhr, headers);
    private setupEvents(xhr, request);
    unsubscribe(): void;
}
/** A normalized AJAX response */
export class AjaxResponse {
    originalEvent: Event;
    xhr: XMLHttpRequest;
    request: AjaxRequest;
    /** {number} the HTTP status code */
    status: number;
    /** {string|ArrayBuffer|Document|object|any} the response data */
    response: any;
    /** {string} the raw responseText */
    responseText: string;
    /** {string} the responsType (e.g. 'json', 'arraybuffer', or 'xml') */
    responseType: string;
    constructor(originalEvent: Event, xhr: XMLHttpRequest, request: AjaxRequest);
}
/** A normalized AJAX error */
export class AjaxError extends Error {
    /** {XMLHttpRequest} the XHR instance associated with the error */
    xhr: XMLHttpRequest;
    /** {AjaxRequest} the AjaxRequest associated with the error */
    request: AjaxRequest;
    /** {number} the HTTP status code */
    status: number;
    constructor(message: string, xhr: XMLHttpRequest, request: AjaxRequest);
}
export class AjaxTimeoutError extends AjaxError {
    constructor(xhr: XMLHttpRequest, request: AjaxRequest);
}
}

// Compiled using typings@0.6.8
// Source: node_modules/rxjs/observable/dom/WebSocketSubject.d.ts
declare module 'rxjs/observable/dom/WebSocketSubject' {
import { Subject } from 'rxjs/Subject';
import { Subscriber } from 'rxjs/Subscriber';
import { Observable } from 'rxjs/Observable';
import { Operator } from 'rxjs/Operator';
import { Subscription } from 'rxjs/Subscription';
import { Observer } from 'rxjs/Observer';
export interface WebSocketSubjectConfig {
    url: string;
    protocol?: string | Array<string>;
    resultSelector?: <T>(e: MessageEvent) => T;
    openObserver?: Observer<Event>;
    closeObserver?: Observer<CloseEvent>;
    closingObserver?: Observer<void>;
    WebSocketCtor?: {
        new (url: string, protocol?: string | Array<string>): WebSocket;
    };
}
export class WebSocketSubject<T> extends Subject<T> {
    url: string;
    protocol: string | Array<string>;
    socket: WebSocket;
    openObserver: Observer<Event>;
    closeObserver: Observer<CloseEvent>;
    closingObserver: Observer<void>;
    WebSocketCtor: {
        new (url: string, protocol?: string | Array<string>): WebSocket;
    };
    resultSelector(e: MessageEvent): any;
    static create<T>(urlConfigOrSource: string | WebSocketSubjectConfig): WebSocketSubject<T>;
    constructor(urlConfigOrSource: string | WebSocketSubjectConfig | Observable<T>, destination?: Observer<T>);
    lift<R>(operator: Operator<T, R>): WebSocketSubject<T>;
    multiplex(subMsg: () => any, unsubMsg: () => any, messageFilter: (value: T) => boolean): Observable<{}>;
    protected _unsubscribe(): void;
    protected _subscribe(subscriber: Subscriber<T>): Subscription;
}
}

// Compiled using typings@0.6.8
// Source: node_modules/rxjs/operator/withLatestFrom.d.ts
declare module 'rxjs/operator/withLatestFrom' {
import { Observable, ObservableInput } from 'rxjs/Observable';
/**
 * @param {Observable} observables the observables to get the latest values from.
 * @param {Function} [project] optional projection function for merging values together. Receives all values in order
 *  of observables passed. (e.g. `a.withLatestFrom(b, c, (a1, b1, c1) => a1 + b1 + c1)`). If this is not passed, arrays
 *  will be returned.
 * @description merges each value from an observable with the latest values from the other passed observables.
 * All observables must emit at least one value before the resulting observable will emit
 *
 * #### example
 * ```
 * A.withLatestFrom(B, C)
 *
 *  A:     ----a-----------------b---------------c-----------|
 *  B:     ---d----------------e--------------f---------|
 *  C:     --x----------------y-------------z-------------|
 * result: ---([a,d,x])---------([b,e,y])--------([c,f,z])---|
 * ```
 */
export function withLatestFrom<T, R>(...args: Array<ObservableInput<any> | ((...values: Array<any>) => R)>): Observable<R>;
export interface WithLatestFromSignature<T> {
    <R>(project: (v1: T) => R): Observable<R>;
    <T2, R>(v2: ObservableInput<T2>, project: (v1: T, v2: T2) => R): Observable<R>;
    <T2, T3, R>(v2: ObservableInput<T2>, v3: ObservableInput<T3>, project: (v1: T, v2: T2, v3: T3) => R): Observable<R>;
    <T2, T3, T4, R>(v2: ObservableInput<T2>, v3: ObservableInput<T3>, v4: ObservableInput<T4>, project: (v1: T, v2: T2, v3: T3, v4: T4) => R): Observable<R>;
    <T2, T3, T4, T5, R>(v2: ObservableInput<T2>, v3: ObservableInput<T3>, v4: ObservableInput<T4>, v5: ObservableInput<T5>, project: (v1: T, v2: T2, v3: T3, v4: T4, v5: T5) => R): Observable<R>;
    <T2, T3, T4, T5, T6, R>(v2: ObservableInput<T2>, v3: ObservableInput<T3>, v4: ObservableInput<T4>, v5: ObservableInput<T5>, v6: ObservableInput<T6>, project: (v1: T, v2: T2, v3: T3, v4: T4, v5: T5, v6: T6) => R): Observable<R>;
    <T2>(v2: ObservableInput<T2>): Observable<[T, T2]>;
    <T2, T3>(v2: ObservableInput<T2>, v3: ObservableInput<T3>): Observable<[T, T2, T3]>;
    <T2, T3, T4>(v2: ObservableInput<T2>, v3: ObservableInput<T3>, v4: ObservableInput<T4>): Observable<[T, T2, T3, T4]>;
    <T2, T3, T4, T5>(v2: ObservableInput<T2>, v3: ObservableInput<T3>, v4: ObservableInput<T4>, v5: ObservableInput<T5>): Observable<[T, T2, T3, T4, T5]>;
    <T2, T3, T4, T5, T6>(v2: ObservableInput<T2>, v3: ObservableInput<T3>, v4: ObservableInput<T4>, v5: ObservableInput<T5>, v6: ObservableInput<T6>): Observable<[T, T2, T3, T4, T5, T6]>;
    <R>(...observables: Array<ObservableInput<any> | ((...values: Array<any>) => R)>): Observable<R>;
    <R>(array: ObservableInput<any>[]): Observable<R>;
    <R>(array: ObservableInput<any>[], project: (...values: Array<any>) => R): Observable<R>;
}
}

// Compiled using typings@0.6.8
// Source: node_modules/rxjs/operator/buffer.d.ts
declare module 'rxjs/operator/buffer' {
import { Observable } from 'rxjs/Observable';
/**
 * Buffers the incoming observable values until the passed `closingNotifier`
 * emits a value, at which point it emits the buffer on the returned observable
 * and starts a new buffer internally, awaiting the next time `closingNotifier`
 * emits.
 *
 * <img src="./img/buffer.png" width="100%">
 *
 * @param {Observable<any>} closingNotifier an Observable that signals the
 * buffer to be emitted} from the returned observable.
 * @returns {Observable<T[]>} an Observable of buffers, which are arrays of
 * values.
 */
export function buffer<T>(closingNotifier: Observable<any>): Observable<T[]>;
export interface BufferSignature<T> {
    (closingNotifier: Observable<any>): Observable<T[]>;
}
}

// Compiled using typings@0.6.8
// Source: node_modules/rxjs/operator/bufferCount.d.ts
declare module 'rxjs/operator/bufferCount' {
import { Observable } from 'rxjs/Observable';
/**
 * Buffers a number of values from the source observable by `bufferSize` then
 * emits the buffer and clears it, and starts a new buffer each
 * `startBufferEvery` values. If `startBufferEvery` is not provided or is
 * `null`, then new buffers are started immediately at the start of the source
 * and when each buffer closes and is emitted.
 *
 * <img src="./img/bufferCount.png" width="100%">
 *
 * @param {number} bufferSize the maximum size of the buffer emitted.
 * @param {number} [startBufferEvery] optional interval at which to start a new
 * buffer. (e.g. if `startBufferEvery` is `2`, then a new buffer will be started
 * on every other value from the source.) A new buffer is started at the
 * beginning of the source by default.
 * @returns {Observable<T[]>} an Observable of arrays of buffered values.
 */
export function bufferCount<T>(bufferSize: number, startBufferEvery?: number): Observable<T[]>;
export interface BufferCountSignature<T> {
    (bufferSize: number, startBufferEvery?: number): Observable<T[]>;
}
}

// Compiled using typings@0.6.8
// Source: node_modules/rxjs/operator/bufferTime.d.ts
declare module 'rxjs/operator/bufferTime' {
import { Observable } from 'rxjs/Observable';
import { Scheduler } from 'rxjs/Scheduler';
/**
 * Buffers values from the source for a specific time period. Optionally allows
 * new buffers to be set up at an interval.
 *
 * <img src="./img/bufferTime.png" width="100%">
 *
 * @param {number} bufferTimeSpan the amount of time to fill each buffer for
 * before emitting them and clearing them.
 * @param {number} [bufferCreationInterval] the interval at which to start new
 * buffers.
 * @param {Scheduler} [scheduler] (optional, defaults to `asap` scheduler) The
 * scheduler on which to schedule the intervals that determine buffer
 * boundaries.
 * @returns {Observable<T[]>} an observable of arrays of buffered values.
 */
export function bufferTime<T>(bufferTimeSpan: number, bufferCreationInterval?: number, scheduler?: Scheduler): Observable<T[]>;
export interface BufferTimeSignature<T> {
    (bufferTimeSpan: number, bufferCreationInterval?: number, scheduler?: Scheduler): Observable<T[]>;
}
}

// Compiled using typings@0.6.8
// Source: node_modules/rxjs/operator/bufferToggle.d.ts
declare module 'rxjs/operator/bufferToggle' {
import { Observable } from 'rxjs/Observable';
/**
 * Buffers values from the source by opening the buffer via signals from an
 * Observable provided to `openings`, and closing and sending the buffers when
 * an Observable returned by the `closingSelector` emits.
 *
 * <img src="./img/bufferToggle.png" width="100%">
 *
 * @param {Observable<O>} openings An observable of notifications to start new
 * buffers.
 * @param {Function} closingSelector a function that takes the value emitted by
 * the `openings` observable and returns an Observable, which, when it emits,
 * signals that the associated buffer should be emitted and cleared.
 * @returns {Observable<T[]>} an observable of arrays of buffered values.
 */
export function bufferToggle<T, O>(openings: Observable<O>, closingSelector: (value: O) => Observable<any>): Observable<T[]>;
export interface BufferToggleSignature<T> {
    <O>(openings: Observable<O>, closingSelector: (value: O) => Observable<any>): Observable<T[]>;
}
}

// Compiled using typings@0.6.8
// Source: node_modules/rxjs/operator/bufferWhen.d.ts
declare module 'rxjs/operator/bufferWhen' {
import { Observable } from 'rxjs/Observable';
/**
 * Opens a buffer immediately, then closes the buffer when the observable
 * returned by calling `closingSelector` emits a value. It that immediately
 * opens a new buffer and repeats the process.
 *
 * <img src="./img/bufferWhen.png" width="100%">
 *
 * @param {function} closingSelector a function that takes no arguments and
 * returns an Observable that signals buffer closure.
 * @returns {Observable<T[]>} an observable of arrays of buffered values.
 */
export function bufferWhen<T>(closingSelector: () => Observable<any>): Observable<T[]>;
export interface BufferWhenSignature<T> {
    (closingSelector: () => Observable<any>): Observable<T[]>;
}
}

// Compiled using typings@0.6.8
// Source: node_modules/rxjs/operator/window.d.ts
declare module 'rxjs/operator/window' {
import { Observable } from 'rxjs/Observable';
export function window<T>(closingNotifier: Observable<any>): Observable<Observable<T>>;
export interface WindowSignature<T> {
    (closingNotifier: Observable<any>): Observable<Observable<T>>;
}
}

// Compiled using typings@0.6.8
// Source: node_modules/rxjs/operator/windowCount.d.ts
declare module 'rxjs/operator/windowCount' {
import { Observable } from 'rxjs/Observable';
export function windowCount<T>(windowSize: number, startWindowEvery?: number): Observable<Observable<T>>;
export interface WindowCountSignature<T> {
    (windowSize: number, startWindowEvery?: number): Observable<Observable<T>>;
}
}

// Compiled using typings@0.6.8
// Source: node_modules/rxjs/operator/windowTime.d.ts
declare module 'rxjs/operator/windowTime' {
import { Observable } from 'rxjs/Observable';
import { Scheduler } from 'rxjs/Scheduler';
export function windowTime<T>(windowTimeSpan: number, windowCreationInterval?: number, scheduler?: Scheduler): Observable<Observable<T>>;
export interface WindowTimeSignature<T> {
    (windowTimeSpan: number, windowCreationInterval?: number, scheduler?: Scheduler): Observable<Observable<T>>;
}
}

// Compiled using typings@0.6.8
// Source: node_modules/rxjs/operator/windowToggle.d.ts
declare module 'rxjs/operator/windowToggle' {
import { Observable } from 'rxjs/Observable';
export function windowToggle<T, O>(openings: Observable<O>, closingSelector: (openValue: O) => Observable<any>): Observable<Observable<T>>;
export interface WindowToggleSignature<T> {
    <O>(openings: Observable<O>, closingSelector: (openValue: O) => Observable<any>): Observable<Observable<T>>;
}
}

// Compiled using typings@0.6.8
// Source: node_modules/rxjs/operator/windowWhen.d.ts
declare module 'rxjs/operator/windowWhen' {
import { Observable } from 'rxjs/Observable';
export function windowWhen<T>(closingSelector: () => Observable<any>): Observable<Observable<T>>;
export interface WindowWhenSignature<T> {
    (closingSelector: () => Observable<any>): Observable<Observable<T>>;
}
}

// Compiled using typings@0.6.8
// Source: node_modules/rxjs/Observable.d.ts
declare module 'rxjs/Observable' {
import { PartialObserver } from 'rxjs/Observer';
import { Operator } from 'rxjs/Operator';
import { Scheduler } from 'rxjs/Scheduler';
import { Subscriber } from 'rxjs/Subscriber';
import { Subscription } from 'rxjs/Subscription';
import { CoreOperators } from 'rxjs/CoreOperators';
import { GroupedObservable } from 'rxjs/operator/groupBy';
import { ConnectableObservable } from 'rxjs/observable/ConnectableObservable';
import { Subject } from 'rxjs/Subject';
import { Notification } from 'rxjs/Notification';
import { combineLatestStatic } from 'rxjs/operator/combineLatest';
import { concatStatic } from 'rxjs/operator/concat';
import { mergeStatic } from 'rxjs/operator/merge';
import { zipStatic } from 'rxjs/operator/zip';
import { BoundCallbackObservable } from 'rxjs/observable/BoundCallbackObservable';
import { BoundNodeCallbackObservable } from 'rxjs/observable/BoundNodeCallbackObservable';
import { DeferObservable } from 'rxjs/observable/DeferObservable';
import { EmptyObservable } from 'rxjs/observable/EmptyObservable';
import { ForkJoinObservable } from 'rxjs/observable/ForkJoinObservable';
import { FromObservable } from 'rxjs/observable/FromObservable';
import { ArrayObservable } from 'rxjs/observable/ArrayObservable';
import { FromEventObservable } from 'rxjs/observable/FromEventObservable';
import { FromEventPatternObservable } from 'rxjs/observable/FromEventPatternObservable';
import { PromiseObservable } from 'rxjs/observable/PromiseObservable';
import { IntervalObservable } from 'rxjs/observable/IntervalObservable';
import { TimerObservable } from 'rxjs/observable/TimerObservable';
import { raceStatic } from 'rxjs/operator/race';
import { RangeObservable } from 'rxjs/observable/RangeObservable';
import { NeverObservable } from 'rxjs/observable/NeverObservable';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { AjaxCreationMethod } from 'rxjs/observable/dom/AjaxObservable';
import { WebSocketSubject } from 'rxjs/observable/dom/WebSocketSubject';
import { CombineLatestSignature } from 'rxjs/operator/combineLatest';
import { WithLatestFromSignature } from 'rxjs/operator/withLatestFrom';
import { ZipSignature } from 'rxjs/operator/zip';
import { BufferSignature } from 'rxjs/operator/buffer';
import { BufferCountSignature } from 'rxjs/operator/bufferCount';
import { BufferTimeSignature } from 'rxjs/operator/bufferTime';
import { BufferToggleSignature } from 'rxjs/operator/bufferToggle';
import { BufferWhenSignature } from 'rxjs/operator/bufferWhen';
import { WindowSignature } from 'rxjs/operator/window';
import { WindowCountSignature } from 'rxjs/operator/windowCount';
import { WindowTimeSignature } from 'rxjs/operator/windowTime';
import { WindowToggleSignature } from 'rxjs/operator/windowToggle';
import { WindowWhenSignature } from 'rxjs/operator/windowWhen';
export type ObservableOrPromise<T> = Observable<T> | Promise<T>;
export type ArrayOrIterator<T> = Iterator<T> | ArrayLike<T>;
export type ObservableInput<T> = ObservableOrPromise<T> | ArrayOrIterator<T>;
/**
 * A representation of any set of values over any amount of time. This the most basic building block
 * of RxJS.
 *
 * @class Observable<T>
 */
export class Observable<T> implements CoreOperators<T> {
    _isScalar: boolean;
    protected source: Observable<any>;
    protected operator: Operator<any, T>;
    /**
     * @constructor
     * @param {Function} subscribe the function that is
     * called when the Observable is initially subscribed to. This function is given a Subscriber, to which new values
     * can be `next`ed, or an `error` method can be called to raise an error, or `complete` can be called to notify
     * of a successful completion.
     */
    constructor(subscribe?: <R>(subscriber: Subscriber<R>) => Subscription | Function | void);
    /**
     * @static
     * @method create
     * @param {Function} subscribe? the subscriber function to be passed to the Observable constructor
     * @returns {Observable} a new cold observable
     * @description creates a new cold Observable by calling the Observable constructor
     */
    static create: Function;
    /**
     * @method lift
     * @param {Operator} operator the operator defining the operation to take on the observable
     * @returns {Observable} a new observable with the Operator applied
     * @description creates a new Observable, with this Observable as the source, and the passed
     * operator defined as the new observable's operator.
     */
    lift<R>(operator: Operator<T, R>): Observable<R>;
    /**
     * @method subscribe
     * @param {PartialObserver|Function} observerOrNext (optional) either an observer defining all functions to be called,
     *  or the first of three possible handlers, which is the handler for each value emitted from the observable.
     * @param {Function} error (optional) a handler for a terminal event resulting from an error. If no error handler is provided,
     *  the error will be thrown as unhandled
     * @param {Function} complete (optional) a handler for a terminal event resulting from successful completion.
     * @returns {Subscription} a subscription reference to the registered handlers
     * @description registers handlers for handling emitted values, error and completions from the observable, and
     *  executes the observable's subscriber function, which will take action to set up the underlying data stream
     */
    subscribe(observerOrNext?: PartialObserver<T> | ((value: T) => void), error?: (error: any) => void, complete?: () => void): Subscription;
    /**
     * @method forEach
     * @param {Function} next a handler for each value emitted by the observable
     * @param {any} [thisArg] a `this` context for the `next` handler function
     * @param {PromiseConstructor} [PromiseCtor] a constructor function used to instantiate the Promise
     * @returns {Promise} a promise that either resolves on observable completion or
     *  rejects with the handled error
     */
    forEach(next: (value: T) => void, thisArg: any, PromiseCtor?: typeof Promise): Promise<void>;
    protected _subscribe(subscriber: Subscriber<any>): Subscription | Function | void;
    static ajax: AjaxCreationMethod;
    static bindCallback: typeof BoundCallbackObservable.create;
    static bindNodeCallback: typeof BoundNodeCallbackObservable.create;
    static combineLatest: typeof combineLatestStatic;
    static concat: typeof concatStatic;
    static defer: typeof DeferObservable.create;
    static empty: typeof EmptyObservable.create;
    static forkJoin: typeof ForkJoinObservable.create;
    static from: typeof FromObservable.create;
    static fromArray: typeof ArrayObservable.create;
    static fromEvent: typeof FromEventObservable.create;
    static fromEventPattern: typeof FromEventPatternObservable.create;
    static fromPromise: typeof PromiseObservable.create;
    static interval: typeof IntervalObservable.create;
    static merge: typeof mergeStatic;
    static never: typeof NeverObservable.create;
    static of: typeof ArrayObservable.of;
    static race: typeof raceStatic;
    static range: typeof RangeObservable.create;
    static throw: typeof ErrorObservable.create;
    static timer: typeof TimerObservable.create;
    static webSocket: typeof WebSocketSubject.create;
    static zip: typeof zipStatic;
    buffer: BufferSignature<T>;
    bufferCount: BufferCountSignature<T>;
    bufferTime: BufferTimeSignature<T>;
    bufferToggle: BufferToggleSignature<T>;
    bufferWhen: BufferWhenSignature<T>;
    cache: (bufferSize?: number, windowTime?: number, scheduler?: Scheduler) => Observable<T>;
    catch: (selector: (err: any, source: Observable<T>, caught: Observable<any>) => Observable<any>) => Observable<T>;
    combineAll: <R>(project?: (...values: Array<any>) => R) => Observable<R>;
    combineLatest: CombineLatestSignature<T>;
    concat: <R>(...observables: (Observable<any> | Scheduler)[]) => Observable<R>;
    concatAll: () => Observable<any>;
    concatMap: <R>(project: ((x: T, ix: number) => Observable<any>), projectResult?: (x: T, y: any, ix: number, iy: number) => R) => Observable<R>;
    concatMapTo: <R>(observable: Observable<any>, projectResult?: (x: T, y: any, ix: number, iy: number) => R) => Observable<R>;
    count: (predicate?: (value: T, index: number, source: Observable<T>) => boolean) => Observable<number>;
    dematerialize: () => Observable<any>;
    debounce: (durationSelector: (value: T) => Observable<any> | Promise<any>) => Observable<T>;
    debounceTime: <R>(dueTime: number, scheduler?: Scheduler) => Observable<R>;
    defaultIfEmpty: <R>(defaultValue?: T | R) => Observable<T> | Observable<R>;
    delay: (delay: number, scheduler?: Scheduler) => Observable<T>;
    delayWhen: (delayDurationSelector: (value: T) => Observable<any>, subscriptionDelay?: Observable<any>) => Observable<T>;
    distinctUntilChanged: (compare?: (x: T, y: T) => boolean) => Observable<T>;
    do: (next?: (x: T) => void, error?: (e: any) => void, complete?: () => void) => Observable<T>;
    expand: <R>(project: (x: T, ix: number) => Observable<R>, concurrent: number, scheduler: Scheduler) => Observable<R>;
    filter: (predicate: (x: T) => boolean, ix?: number, thisArg?: any) => Observable<T>;
    finally: (finallySelector: () => void) => Observable<T>;
    first: <R>(predicate?: (value: T, index: number, source: Observable<T>) => boolean, resultSelector?: (value: T, index: number) => R, defaultValue?: any) => Observable<T> | Observable<R>;
    flatMap: <R>(project: ((x: T, ix: number) => Observable<any>), projectResult?: (x: T, y: any, ix: number, iy: number) => R, concurrent?: number) => Observable<R>;
    flatMapTo: <R>(observable: Observable<any>, projectResult?: (x: T, y: any, ix: number, iy: number) => R, concurrent?: number) => Observable<R>;
    groupBy: <K, R>(keySelector: (value: T) => K, elementSelector?: (value: T) => R, durationSelector?: (group: GroupedObservable<K, R>) => Observable<any>) => Observable<GroupedObservable<K, R>>;
    ignoreElements: () => Observable<T>;
    inspect: (durationSelector: (value: T) => Observable<any> | Promise<any>) => Observable<T>;
    inspectTime: (delay: number, scheduler?: Scheduler) => Observable<T>;
    last: <R>(predicate?: (value: T, index: number) => boolean, resultSelector?: (value: T, index: number) => R, defaultValue?: any) => Observable<T> | Observable<R>;
    let: <T, R>(func: (selector: Observable<T>) => Observable<R>) => Observable<R>;
    letBind: <T, R>(func: (selector: Observable<T>) => Observable<R>) => Observable<R>;
    every: (predicate: (value: T, index: number) => boolean, thisArg?: any) => Observable<T>;
    map: <R>(project: (x: T, ix?: number) => R, thisArg?: any) => Observable<R>;
    mapTo: <R>(value: R) => Observable<R>;
    materialize: () => Observable<Notification<T>>;
    merge: (...observables: any[]) => Observable<any>;
    mergeAll: (concurrent?: any) => Observable<any>;
    mergeMap: <R>(project: ((x: T, ix: number) => Observable<any>), projectResult?: (x: T, y: any, ix: number, iy: number) => R, concurrent?: number) => Observable<R>;
    mergeMapTo: <R>(observable: Observable<any>, projectResult?: (x: T, y: any, ix: number, iy: number) => R, concurrent?: number) => Observable<R>;
    multicast: (subjectOrSubjectFactory: Subject<T> | (() => Subject<T>)) => ConnectableObservable<T>;
    observeOn: (scheduler: Scheduler, delay?: number) => Observable<T>;
    partition: (predicate: (x: T) => boolean) => Observable<T>[];
    pluck: (...properties: string[]) => Observable<any>;
    publish: () => ConnectableObservable<T>;
    publishBehavior: (value: any) => ConnectableObservable<T>;
    publishReplay: (bufferSize?: number, windowTime?: number, scheduler?: Scheduler) => ConnectableObservable<T>;
    publishLast: () => ConnectableObservable<T>;
    race: (...observables: Array<Observable<T>>) => Observable<T>;
    reduce: <R>(project: (acc: R, x: T) => R, seed?: R) => Observable<R>;
    repeat: (count?: number) => Observable<T>;
    retry: (count?: number) => Observable<T>;
    retryWhen: (notifier: (errors: Observable<any>) => Observable<any>) => Observable<T>;
    sample: (notifier: Observable<any>) => Observable<T>;
    sampleTime: (delay: number, scheduler?: Scheduler) => Observable<T>;
    scan: <R>(accumulator: (acc: R, x: T) => R, seed?: T | R) => Observable<R>;
    share: () => Observable<T>;
    single: (predicate?: (value: T, index: number) => boolean) => Observable<T>;
    skip: (count: number) => Observable<T>;
    skipUntil: (notifier: Observable<any>) => Observable<T>;
    skipWhile: (predicate: (x: T, index: number) => boolean) => Observable<T>;
    startWith: (x: T) => Observable<T>;
    subscribeOn: (scheduler: Scheduler, delay?: number) => Observable<T>;
    switch: <R>() => Observable<R>;
    switchMap: <R>(project: ((x: T, ix: number) => Observable<any>), projectResult?: (x: T, y: any, ix: number, iy: number) => R) => Observable<R>;
    switchMapTo: <R>(observable: Observable<any>, projectResult?: (x: T, y: any, ix: number, iy: number) => R) => Observable<R>;
    take: (count: number) => Observable<T>;
    takeLast: (count: number) => Observable<T>;
    takeUntil: (notifier: Observable<any>) => Observable<T>;
    takeWhile: (predicate: (value: T, index: number) => boolean) => Observable<T>;
    throttle: (durationSelector: (value: T) => Observable<any> | Promise<any>) => Observable<T>;
    throttleTime: (delay: number, scheduler?: Scheduler) => Observable<T>;
    timeout: (due: number | Date, errorToSend?: any, scheduler?: Scheduler) => Observable<T>;
    timeoutWith: <R>(due: number | Date, withObservable: Observable<R>, scheduler?: Scheduler) => Observable<T> | Observable<R>;
    toArray: () => Observable<T[]>;
    toPromise: (PromiseCtor?: typeof Promise) => Promise<T>;
    window: WindowSignature<T>;
    windowCount: WindowCountSignature<T>;
    windowTime: WindowTimeSignature<T>;
    windowToggle: WindowToggleSignature<T>;
    windowWhen: WindowWhenSignature<T>;
    withLatestFrom: WithLatestFromSignature<T>;
    zip: ZipSignature<T>;
    zipAll: <R>(project?: (...values: Array<any>) => R) => Observable<R>;
}
}

// Compiled using typings@0.6.8
// Source: node_modules/rxjs/Operator.d.ts
declare module 'rxjs/Operator' {
import { Subscriber } from 'rxjs/Subscriber';
export class Operator<T, R> {
    call(subscriber: Subscriber<R>): Subscriber<T>;
}
}

// Compiled using typings@0.6.8
// Source: node_modules/rxjs/Observer.d.ts
declare module 'rxjs/Observer' {
export interface NextObserver<T> {
    isUnsubscribed?: boolean;
    next: (value: T) => void;
    error?: (err: any) => void;
    complete?: () => void;
}
export interface ErrorObserver<T> {
    isUnsubscribed?: boolean;
    next?: (value: T) => void;
    error: (err: any) => void;
    complete?: () => void;
}
export interface CompletionObserver<T> {
    isUnsubscribed?: boolean;
    next?: (value: T) => void;
    error?: (err: any) => void;
    complete: () => void;
}
export type PartialObserver<T> = NextObserver<T> | ErrorObserver<T> | CompletionObserver<T>;
export interface Observer<T> {
    isUnsubscribed?: boolean;
    next: (value: T) => void;
    error: (err: any) => void;
    complete: () => void;
}
export const empty: Observer<any>;
}

// Compiled using typings@0.6.8
// Source: node_modules/rxjs/Subscription.d.ts
declare module 'rxjs/Subscription' {
export class Subscription {
    static EMPTY: Subscription;
    isUnsubscribed: boolean;
    constructor(_unsubscribe?: () => void);
    unsubscribe(): void;
    add(subscription: Subscription | Function | void): void;
    remove(subscription: Subscription): void;
}
export class UnsubscriptionError extends Error {
    errors: any[];
    constructor(errors: any[]);
}
}

// Compiled using typings@0.6.8
// Source: node_modules/rxjs/Subscriber.d.ts
declare module 'rxjs/Subscriber' {
import { Observer, PartialObserver } from 'rxjs/Observer';
import { Subscription } from 'rxjs/Subscription';
export class Subscriber<T> extends Subscription implements Observer<T> {
    static create<T>(next?: (x?: T) => void, error?: (e?: any) => void, complete?: () => void): Subscriber<T>;
    syncErrorValue: any;
    syncErrorThrown: boolean;
    syncErrorThrowable: boolean;
    protected isStopped: boolean;
    protected destination: PartialObserver<any>;
    constructor(destinationOrNext?: PartialObserver<any> | ((value: T) => void), error?: (e?: any) => void, complete?: () => void);
    next(value?: T): void;
    error(err?: any): void;
    complete(): void;
    unsubscribe(): void;
    protected _next(value: T): void;
    protected _error(err: any): void;
    protected _complete(): void;
}
}

// Compiled using typings@0.6.8
// Source: node_modules/rxjs/subject/AsyncSubject.d.ts
declare module 'rxjs/subject/AsyncSubject' {
import { Subject } from 'rxjs/Subject';
import { Subscriber } from 'rxjs/Subscriber';
import { Subscription } from 'rxjs/Subscription';
export class AsyncSubject<T> extends Subject<T> {
    value: T;
    hasNext: boolean;
    protected _subscribe(subscriber: Subscriber<any>): Subscription | Function | void;
    protected _next(value: T): void;
    protected _complete(): void;
}
}

// Compiled using typings@0.6.8
// Source: node_modules/rxjs/subject/ReplaySubject.d.ts
declare module 'rxjs/subject/ReplaySubject' {
import { Subject } from 'rxjs/Subject';
import { Scheduler } from 'rxjs/Scheduler';
import { Subscriber } from 'rxjs/Subscriber';
import { Subscription } from 'rxjs/Subscription';
export class ReplaySubject<T> extends Subject<T> {
    private events;
    private scheduler;
    private bufferSize;
    private _windowTime;
    constructor(bufferSize?: number, windowTime?: number, scheduler?: Scheduler);
    protected _next(value: T): void;
    protected _subscribe(subscriber: Subscriber<T>): Subscription | Function | void;
    private _getNow();
    private _trimBufferThenGetEvents(now);
}
}

// Compiled using typings@0.6.8
// Source: node_modules/rxjs/subject/BehaviorSubject.d.ts
declare module 'rxjs/subject/BehaviorSubject' {
import { Subject } from 'rxjs/Subject';
import { Subscriber } from 'rxjs/Subscriber';
import { Subscription } from 'rxjs/Subscription';
export class BehaviorSubject<T> extends Subject<T> {
    private _value;
    constructor(_value: T);
    getValue(): T;
    value: T;
    protected _subscribe(subscriber: Subscriber<T>): Subscription | Function | void;
    protected _next(value: T): void;
    protected _error(err: any): void;
}
}

// Compiled using typings@0.6.8
// Source: node_modules/rxjs/observable/ConnectableObservable.d.ts
declare module 'rxjs/observable/ConnectableObservable' {
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { Subscriber } from 'rxjs/Subscriber';
import { Subscription } from 'rxjs/Subscription';
export class ConnectableObservable<T> extends Observable<T> {
    protected source: Observable<T>;
    protected subjectFactory: () => Subject<T>;
    protected subject: Subject<T>;
    protected subscription: Subscription;
    constructor(source: Observable<T>, subjectFactory: () => Subject<T>);
    protected _subscribe(subscriber: Subscriber<T>): Subscription;
    protected getSubject(): Subject<T>;
    connect(): Subscription;
    refCount(): Observable<T>;
    /**
     * This method is opened for `ConnectableSubscription`.
     * Not to call from others.
     */
    _closeSubscription(): void;
}
}

// Compiled using typings@0.6.8
// Source: node_modules/rxjs/Notification.d.ts
declare module 'rxjs/Notification' {
import { PartialObserver } from 'rxjs/Observer';
import { Observable } from 'rxjs/Observable';
export class Notification<T> {
    kind: string;
    value: T;
    exception: any;
    hasValue: boolean;
    constructor(kind: string, value?: T, exception?: any);
    observe(observer: PartialObserver<T>): any;
    do(next: (value: T) => void, error?: (err: any) => void, complete?: () => void): any;
    accept(nextOrObserver: PartialObserver<T> | ((value: T) => void), error?: (err: any) => void, complete?: () => void): any;
    toObservable(): Observable<T>;
    private static completeNotification;
    private static undefinedValueNotification;
    static createNext<T>(value: T): Notification<T>;
    static createError<T>(err?: any): Notification<T>;
    static createComplete(): Notification<any>;
}
}

// Compiled using typings@0.6.8
// Source: node_modules/rxjs/util/EmptyError.d.ts
declare module 'rxjs/util/EmptyError' {
export class EmptyError extends Error {
    constructor();
}
}

// Compiled using typings@0.6.8
// Source: node_modules/rxjs/util/ArgumentOutOfRangeError.d.ts
declare module 'rxjs/util/ArgumentOutOfRangeError' {
export class ArgumentOutOfRangeError extends Error {
    constructor();
}
}

// Compiled using typings@0.6.8
// Source: node_modules/rxjs/util/ObjectUnsubscribedError.d.ts
declare module 'rxjs/util/ObjectUnsubscribedError' {
/**
 * an error thrown when an action is invalid because the object
 * has been unsubscribed
 */
export class ObjectUnsubscribedError extends Error {
    constructor();
}
}

// Compiled using typings@0.6.8
// Source: node_modules/rxjs/scheduler/Action.d.ts
declare module 'rxjs/scheduler/Action' {
import { Subscription } from 'rxjs/Subscription';
import { Scheduler } from 'rxjs/Scheduler';
export interface Action extends Subscription {
    work: (state?: any) => void | Subscription;
    state?: any;
    delay?: number;
    schedule(state?: any, delay?: number): void;
    execute(): void;
    scheduler: Scheduler;
}
}

// Compiled using typings@0.6.8
// Source: node_modules/rxjs/scheduler/AsapScheduler.d.ts
declare module 'rxjs/scheduler/AsapScheduler' {
import { Action } from 'rxjs/scheduler/Action';
import { Subscription } from 'rxjs/Subscription';
import { QueueScheduler } from 'rxjs/scheduler/QueueScheduler';
export class AsapScheduler extends QueueScheduler {
    scheduleNow<T>(work: (x?: any) => Subscription, state?: any): Action;
}
}

// Compiled using typings@0.6.8
// Source: node_modules/rxjs/scheduler/FutureAction.d.ts
declare module 'rxjs/scheduler/FutureAction' {
import { Action } from 'rxjs/scheduler/Action';
import { Scheduler } from 'rxjs/Scheduler';
import { Subscription } from 'rxjs/Subscription';
export class FutureAction<T> extends Subscription implements Action {
    scheduler: Scheduler;
    work: (x?: any) => Subscription | void;
    id: any;
    state: any;
    delay: number;
    constructor(scheduler: Scheduler, work: (x?: any) => Subscription | void);
    execute(): void;
    schedule(state?: any, delay?: number): Action;
    protected _schedule(state?: any, delay?: number): Action;
    protected _unsubscribe(): void;
}
}

// Compiled using typings@0.6.8
// Source: node_modules/rxjs/scheduler/QueueAction.d.ts
declare module 'rxjs/scheduler/QueueAction' {
import { Action } from 'rxjs/scheduler/Action';
import { FutureAction } from 'rxjs/scheduler/FutureAction';
export class QueueAction<T> extends FutureAction<T> {
    protected _schedule(state?: any, delay?: number): Action;
}
}

// Compiled using typings@0.6.8
// Source: node_modules/rxjs/scheduler/QueueScheduler.d.ts
declare module 'rxjs/scheduler/QueueScheduler' {
import { Scheduler } from 'rxjs/Scheduler';
import { QueueAction } from 'rxjs/scheduler/QueueAction';
import { Subscription } from 'rxjs/Subscription';
import { Action } from 'rxjs/scheduler/Action';
export class QueueScheduler implements Scheduler {
    active: boolean;
    actions: QueueAction<any>[];
    scheduledId: number;
    now(): number;
    flush(): void;
    schedule<T>(work: (x?: any) => Subscription | void, delay?: number, state?: any): Subscription;
    scheduleNow<T>(work: (x?: any) => Subscription | void, state?: any): Action;
    scheduleLater<T>(work: (x?: any) => Subscription | void, delay: number, state?: any): Action;
}
}

// Compiled using typings@0.6.8
// Source: node_modules/rxjs/Rx.d.ts
declare module 'rxjs' {
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { Operator } from 'rxjs/Operator';
import { Observer } from 'rxjs/Observer';
import { Subscription, UnsubscriptionError } from 'rxjs/Subscription';
import { Subscriber } from 'rxjs/Subscriber';
import { AsyncSubject } from 'rxjs/subject/AsyncSubject';
import { ReplaySubject } from 'rxjs/subject/ReplaySubject';
import { BehaviorSubject } from 'rxjs/subject/BehaviorSubject';
import { ConnectableObservable } from 'rxjs/observable/ConnectableObservable';
import { Notification } from 'rxjs/Notification';
import { EmptyError } from 'rxjs/util/EmptyError';
import { ArgumentOutOfRangeError } from 'rxjs/util/ArgumentOutOfRangeError';
import { ObjectUnsubscribedError } from 'rxjs/util/ObjectUnsubscribedError';
import { AsapScheduler } from 'rxjs/scheduler/AsapScheduler';
import { QueueScheduler } from 'rxjs/scheduler/QueueScheduler';
var Scheduler: {
    asap: AsapScheduler;
    queue: QueueScheduler;
};
var Symbol: {
    rxSubscriber: any;
};
export { Subject, Scheduler, Observable, Observer, Operator, Subscriber, Subscription, Symbol, AsyncSubject, ReplaySubject, BehaviorSubject, ConnectableObservable, Notification, EmptyError, ArgumentOutOfRangeError, ObjectUnsubscribedError, UnsubscriptionError };
}