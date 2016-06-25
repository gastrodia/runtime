import * as runtime from './index';

export {runtime as runtime}

var sk = (window as any).sk;
if(!sk){
   sk = new Object();
   (window as any).sk = sk;
}
sk.runtime = runtime;
