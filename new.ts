

// Using TypeScript. Create a class that has 2 properties.
// - name & age
// The class should also have a member method
// - attendClass()
// The member method should  print out a message stating that 
//the <student's name> has attended class on a date that is 
//provided as a parameter in the member method

class Student {
    public name: string;
    private age: number;
    private accNum: string;
    public grades: { subject: string, grade: number}[] = [ 
        {"subject": "Math", "grade": 85},
        { "subject": "English", "grade": 92},
        {"subject": "Science", "grade": 88}
    ]

constructor (cName: string, cAge: number, cAccNum: string) {
    this.name = cName;
    this.age = cAge;
    this.accNum = cAccNum;
    this.grades = this.grades;
}

    addGrades() {
        console.log(`${this.grades}`)
    }

    attendClass():void {
        console.log(`Student ${this.name} with account number '${this.accNum}' who is ${this.age} is in class`);
    }
}

let x = new Student('Tom Hibbert', 12, 'numbo234224');
x.name = 'Rackeel Brooks'

x.attendClass();
