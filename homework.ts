// EX 1 -----------------------------------

interface Entity {
  readonly id?: string;
  readonly name?: string;
  readonly age?: number;
  readonly ethnicity?: string;
}

// Given following interface do the following operations:
// Remove - 1. readonly, 2. optional type and 3. id property & ethnicity property
// do this as 3 separate mutation types
// create a mapper function that maps response type of all keys to boolean

// expected:
// type newType = A<B<C<D<Type>>>>
/*
  {
    name: boolean;  
    age: boolean;
  }
 */

// 1. Remove readonly

type A<T> = {
  -readonly [P in keyof T]: T[P];
};

// 2. Remove optional type

type B<T> = {
  [P in keyof T]-?: T[P];
};

// 3. Remove id property & ethnicity property

type C<T> = Omit<T, "id" | "ethnicity">;

// 4. Mapper function that maps response type of all keys to boolean

type D<T> = {
  [P in keyof T]: boolean;
};

type newType = A<B<C<D<Entity>>>>;

// EX 2 ------------------------------------------------
/*
/*HW
1. Create an interface Id that has property id of type number
2. Create an interface Name that has property name of type string
3. Create a new type IdOrName and pass in a generic type
* If passed in type extends Id, IdOrName - will be of type number
* Else If passed in type extends Name, IdOrName - will be of type string
* Else passed in type extends Anything Else, IdOrName - will be of type {age: boolean}
*/

interface Id {
  id: number;
}

interface Name {
  name: string;
}

type IdOrName<T> = T extends Id
  ? number
  : T extends Name
  ? string
  : { age: boolean };

type newTypeSecond = IdOrName<Name>;

// EX 3 ------------------------------------------------
/*
Write a detailed explanation with images  steps  words how ex 5 withLet function works and why did we get the expected result
*/

// var app = () => {

//   var withVar = () => {
//     for (var index: number = 0; index < 10; index += 1) {
//       setTimeout(() => console.log(var idx = ${index}), 0);
//       console.log(var index withOutSetTimeOut = ${index});
//     }
//   }

//   var withLet = () => {
//     for (let index: number = 0; index < 10; index += 1) {
//       setTimeout(() => console.log(let index = ${index}), 0);
//       console.log(let index withOutSetTimeOut = ${index});
//     }
//   }

//   withVar();
//   withLet();

// }

// setTimeout(app, 0);

// Each function creates a new scope. While 'for' is working, SetTimeout function calls are stored in
// callback queue. After finishing loop 'for', it returns the first thing in the queue stack - function, which do
// console log of the value of index.

// While we are using 'var' to declare our variables, it has functional scope, and we can acces it outside the loop 'for' and we
// do it. Due to the fact that 'var' has a functional scope, the output will be the same final value.

// While we are using 'let' to declare our variables, it has block scope, and we can't acces it outside the loop 'for'.
// Due to the fact that 'let' has a block scope, the output will be the specific index in each iteration

// with var
// {
//     {
//         var index  // final will be 10
//         for(index < 10)
//         //first iteration
//         {
//             setTimeout(console.log(index)) // prints 10
//             index++
//         }
//         //second iteration
//         {
//             setTimeout(console.log(index)) // prints 10
//             index++
//         }
//         //third iteration
//         {
//             setTimeout(console.log(index)) // prints 10
//             index++
//         }
//         ...
//         //tenth iteration
//          {
//             setTimeout(console.log(index)) // prints 10
//             index++ // index = 10
//          }
//     }
// }

// with let
// {
//     {
//
//         for(let i = 0; index < 10; index += 1)
//         //first iteration
//         {
//             let index = 0
//             setTimeout(console.log(index)) // prints 0
//             index++
//
//         }
//         //second iteration
//         {
//             let index = 1
//             setTimeout(console.log(index)) // prints 1
//             index++
//         }
//         //third iteration (index++)
//         {
//             let index = 2
//             setTimeout(console.log(index)) // prints 2
//             index++
//         }
//         ...
//         //tenth iteration (index++)
//          {
//             let index = 9
//             setTimeout(console.log(index)) // prints 9
//             index++
//          }
//     }
// }

// EX 4 ------------------------------------------------
//Having two interfaces:

interface User {
  id: number;
  name: string;
  age: number;
}
interface Car {
  id: number;
  color: string;
  numberOfDoors: number;
}

// Replicate an API response that will have the following structure:
// {
//   data: {
//     [any keys of string type]: Generic type;
//     pagination: number;
//   }
//   errors: string[]
// }

type ApiResponse<T> = {
  data: {
    [key: string]: T | number;
    pagination: number;
  };
  errors: string[];
};

//-------------Checks

let objUser: ApiResponse<User> = {
  data: {
    user: {
      id: 23,
      age: 23,
      name: "Max",
    },
    pagination: 23,
  },
  errors: [],
};

let objCar: ApiResponse<Car> = {
  data: {
    user: {
      id: 23,
      color: "black",
      numberOfDoors: 4,
    },
    pagination: 23,
  },
  errors: ["yes", "no"],
};

//------------------------------------

// EX 5 ------------------------------
// Write a class decorator, method decorator and parameter decorator functions for any Class the logic inside each decorator is up to you e.g.:
/*
@ClassDecorator
class SomeClass {
  @PropertyDecorator
  property1: string;
  @MethodDecorator(PASS_SOME_ENUM)
  someMethod(@ParameterDecorator someParameter: number) {
    // If PASS_SOME_ENUM value === 0 => Print parameter decorator value + some text from @ParameterDecorator
    // Else Print parameter decorator value * 50 + some text from @ParameterDecorator
    console.log('this is our message');
  }
}
 */

enum PassedEnum {
  first,
  second,
  third,
  fourth,
}

function ClassDecorator(target: Function) {
  //  console.log("I'm Class decorator!", "My target is " + target)
  target.prototype.created = new Date().toLocaleString("es-ES");
  console.log("Assignment checked : " + target.prototype.created);
}

function MethodDecorator(EnumExample: {
  first: number;
  second: number;
  third: number;
  fourth: number;
}) {
  return function (
    _target: Object,
    propertyName: string,
    propertyDescriptor: PropertyDescriptor
  ) {
    //    console.log("I'm Method Decorator!","My target is " + target,
    //    "My Property is " + propertyName, "My propertyDescriptor is " + propertyDescriptor)
    const originalMethod = propertyDescriptor.value;

    propertyDescriptor.value = function (...args: any[]) {
      const result = originalMethod.apply(this, args);

      Object.keys(EnumExample)
        .filter(key => !isNaN(Number(key)))
        .forEach(key => {
          if (Number(key) === 0) {
            console.log(
              ParameterDecorator.call(this, this, propertyName, result)
            );
          } else {
            console.log(
              ParameterDecorator.call(this, this, propertyName, result * 50)
            );
          }
        });
    };
  };
}

function PropertyDecorator(property: number | string) {
  //  console.log("I'm Property Decorator!", "My target is " + target, "My Property is " + propertyName)
  return function (target: Object, propertyName: string): void {
    const getter = () => {
      return property;
    };
    const setter = () => {
      console.log(`Setting value to ${property}`);
      return property;
    };

    Object.defineProperty(target, propertyName, {
      get: getter,
      set: setter,
    });
  };
}

function ParameterDecorator(
  _target: Object,
  _propertyName: string,
  index: number
): any {
  //  console.log("I'm Parameter Decorator!","My target is " + target, "My Property is " + propertyName, "My index is " + index);
  return index + " is the result";
}

@ClassDecorator
class TestClass {
  @PropertyDecorator(22)
  id: number = 20;

  @PropertyDecorator("Daniil")
  name: string = "Danik";

  @MethodDecorator(PassedEnum)
  returnValue(@ParameterDecorator someValue: number) {
    console.log("this is our message");
    return someValue;
  }
}

const ts = new TestClass();

ts.returnValue(7);

console.log(ts.id);
console.log(ts.name);
