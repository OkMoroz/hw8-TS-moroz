// 1. Напишіть функцію isString, яка перевірятиме, чи є передане значення рядком. Потім використовуйте її для звуження типу змінної.

// 2. У вас є масив з елементами різних типів. Напишіть функцію, яка приймає цей масив і фільтрує його так, щоб у підсумку в ньому залишилися тільки рядки. Використовуйте захисника типу для цього завдання.

// 3. У вас є об'єкт, який може містити довільні властивості. Напишіть функцію, яка приймає цей об'єкт і повертає значення однієї з властивостей, якщо воно існує і має певний тип.

// 4. Створіть кілька захисників типу, кожен з яких перевіряє певний аспект об'єкта (наприклад, наявність певної властивості або її тип). Потім напишіть функцію, яка використовує цих захисників у комбінації для звуження типу об'єкта до більш конкретного типу.

// 5. У вас є змінна, яка може бути одного з декількох типів (наприклад, рядок або число). Напишіть функцію, яка приймає цю змінну і виконує довільні операції, специфічні для кожного з типів.

// 6. Створіть захисник типу, який перевірятиме, чи є передане значення функцією. Потім напишіть функцію, яка використовує цей гард для звуження типу змінної і викликає передану функцію, якщо вона існує.

// 7. Створіть класи з ієрархією успадкування і потім напишіть функцію, яка використовує захисник типу для звуження типу об'єктів, що базуються на цій ієрархії.

/*1*/
function stringLength(value: unknown): void {
  if (isString(value)) {
    const stringValue: string = value;
    const length = stringValue.length;

    console.log(`Довжина рядка: ${length}`);
  } else {
    console.log("Змінна не є рядком.");
  }
}

function isString(value: unknown): value is string {
  return typeof value === "string";
}

/*2*/
function filterStrings(arr: unknown[]): string[] {
  return arr.filter((item): item is string => typeof item === "string");
}

/*3*/
type MyObject = {
  name: string;
  age: number;
  isActive: boolean;
};

function getProperty(
  obj: MyObject,
  property: string,
  expectedType: string
): unknown | undefined {
  const propertyValue = obj[property];

  if (propertyValue !== undefined && typeof propertyValue === expectedType) {
    return propertyValue;
  } else {
    console.log(
      `Властивість "${property}" не існує або не має типу "${expectedType}".`
    );
    return undefined;
  }
}

/*4*/
type Car = {
  type: "Car";
  brand: string;
  speed: number;
  drive: () => void;
};

type Bicycle = {
  type: "Bicycle";
  brand: string;
  speed: number;
  ride: () => void;
};

type Boat = {
  type: "Boat";
  brand: string;
  speed: number;
  sail: () => void;
};

type Vehicle = Car | Bicycle | Boat;

function isCar(vehicle: Vehicle): vehicle is Car {
  return vehicle.type === "Car";
}

function isBicycle(vehicle: Vehicle): vehicle is Bicycle {
  return vehicle.type === "Bicycle";
}

function isBoat(vehicle: Vehicle): vehicle is Boat {
  return vehicle.type === "Boat";
}

function driveVehicle(vehicle: Vehicle): void {
  if (isCar(vehicle)) {
    vehicle.drive();
  } else if (isBicycle(vehicle)) {
    vehicle.ride();
  } else if (isBoat(vehicle)) {
    vehicle.sail();
  }
}

/*5*/
function myVariable(value: string | number): void {
  if (typeof value === "string") {
    const stringValue: string = value;
    const length = stringValue.length;

    console.log(`Довжина рядка: ${length}`);
  } else if (typeof value === "number") {
    console.log(value * 10);
  } else {
    console.log("Тип ні рядок, ні число");
  }
}

/*6*/
function isFunction(value: unknown): value is Function {
  return typeof value === "function";
}

function runIfFunction(valueToRun: unknown): void {
  if (isFunction(valueToRun)) {
    const func = valueToRun;
    func();
  } else {
    console.log("Не функція.");
  }
}

/*7*/
class VehicleClass {
  constructor(
    public brand: string,
    public speed: number
  ) {}
}

class MyCar extends VehicleClass {
  constructor(
    brand: string,
    speed: number,
    public fuelType: string
  ) {
    super(brand, speed);
  }
  drive() {
    console.log("Автомобілем");
  }
}

class MyBicycle extends VehicleClass {
  constructor(
    brand: string,
    speed: number,
    public bicycleType: string
  ) {
    super(brand, speed);
  }
  ride() {
    console.log("Велосипедом");
  }
}

class MyBoat extends VehicleClass {
  constructor(
    brand: string,
    speed: number,
    public boatType: string
  ) {
    super(brand, speed);
  }
  sail() {
    console.log("На чові");
  }
}

type VehicleType = MyCar | MyBicycle | MyBoat;

function isMyCar(vehicle: VehicleType): vehicle is MyCar {
  return "drive" in vehicle;
}

function isMyBicycle(vehicle: VehicleType): vehicle is MyBicycle {
  return "ride" in vehicle;
}

function isMyBoat(vehicle: VehicleType): vehicle is MyBoat {
  return "sail" in vehicle;
}

function operateVehicle(vehicle: VehicleType): void {
  if (isMyCar(vehicle)) {
    vehicle.drive();
  } else if (isMyBicycle(vehicle)) {
    vehicle.ride();
  } else if (isMyBoat(vehicle)) {
    vehicle.sail();
  } else {
    console.log("Не вдалося визначити тип транспортного засобу.");
  }
}
