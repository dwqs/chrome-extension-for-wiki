/**
 * Created by pomy on 10/07/2017.
 */

export default function awaitTo (promise) {
    return promise.then((data) => [null, data]).catch((err) => [err]);
}
