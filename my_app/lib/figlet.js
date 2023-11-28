import figlet from 'figlet';

export const start =  function (text) {
    figlet(text, function (err, data) {
        if (err) {
            console.log("Something went wrong...");
            console.dir(err);
            return;
        }
        console.log(data);
    });
}