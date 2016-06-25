import {App} from './App';

declare var process;

/**
 * 平台。
 */
export class Platform {
    // 应用实例
    public static _application: App;

    /**
     * 获得应用。
     */
    public static initialize(clazz: Function) {
        var application = this._application = new (clazz as any)();
        return application;
    }

    /**
     * 获得应用。
     */
    public static get application() {
        return this._application;
    }

    public static isRunningOnNode() {
        if (typeof process === 'object' && process + '' === '[object process]' && typeof window === 'undefined') {
            return true;
        }else {
            return false;
        }
    }

}
