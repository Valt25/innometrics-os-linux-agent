const ioHook = require('iohook');
const Observable = require('rxjs').Observable;

module.exports = function IOActions() {
    return new Observable((observer) => {
        console.log(observer.next);
            ioHook.on('keydown', (event) => observer.next(event));
            ioHook.on('keyup', (event) => observer.next(event));
            ioHook.on('mouseclick', (event) => observer.next(event));
            ioHook.on('mousedown', (event) => observer.next(event));
            ioHook.on('mouseup', (event) => observer.next(event));
            ioHook.on('mousemove', (event) => observer.next(event));
            ioHook.on('mousedrag', (event) => observer.next(event));
            ioHook.on('mousewheel', (event) => observer.next(event));
            ioHook.start();

            return () => {
                ioHook.unload();
                ioHook.stop();

            }
        }
    );
}