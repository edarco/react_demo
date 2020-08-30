

/*
export default function hello(){
    console.log("hello from module");
}
*/

function hello(){
    console.log("hello from module");
}

export default hello;

/*
export function sum(a,b) {
    console.log(a+b);
}
*/

function sum(a,b) {
    console.log(a+b);
}

// export {sum};

// export const name = "John";

const name = "John";

let mult = function(a,b){ return a*b; };


export {sum, name, mult};



