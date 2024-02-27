/**
 * Interface used to describe implemented interfaces on classes
 */
export interface HasInterfaces {
    /**
     * List of all implemented interfaces on this object
     */
    get interfaces(): string[];
}

/**
 * Checks if the given instance of a class implements the given interface
 *
 * @param instance Instance of a class to check
 * @param type Alias of the interface to check
 *
 * @returns `true` if the class implements the interface, otherwise `false`.
 */
export function implementsInterface(instance: unknown, type: string): boolean {
    const hasInterfaces: HasInterfaces = instance as HasInterfaces;

    if (hasInterfaces.interfaces === undefined) {
        return false;
    }

    return hasInterfaces.interfaces.includes(type);
}

/**
 * Cast the given instance of a class to T
 *
 * @param instance Instance of a class to cast
 *
 * @returns Casted instance
 */
export function castTo<T>(instance: unknown): T {
    return instance as T;
}
