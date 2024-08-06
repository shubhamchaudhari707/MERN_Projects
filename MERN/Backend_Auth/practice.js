// let friends = ['arjun', 'shubham', 'vaibhav', 'dhanjay'];

// console.log(friends[3])
// console.log(friends.length)
// console.log(friends.sort())
// console.log(friends.push("chaudhari"))
// console.log(friends.pop())
// console.log(friends.shift())
// console.log(friends.unshift("Rajendra"))
// console.log(friends.reverse())
// console.log(Array.isArray(friends))
// console.log(friends.indexOf('shubham'))

/////////////////////////////////////////////////////////////////

let student = {
    name:"shubham",
    age:67,
    rollno:121,
    gender:"Male",
    address:{
        pincode:424101,
        state:"Maharashtra"
    }
}

student.fashion = 'DSA';
student.fashion = 'Algo';
delete student.fashion;
// console.log(student)

// console.log(student.name)
// console.log(student['name'])

// console.log(student.address)
// console.log(student['address'])

// console.log(student.address.state)
// console.log(student.address['state'])
// console.log(student['address']['state'])
// console.log(student['address'].state)

///////////////////////////////////////////////////

// let data = [10,20,30,40]

// let mapdata = data.filter((cvalue)=>{
//     return cvalue > 12;
// })

// console.log(mapdata)

/////////////////////////////////////////////////////
let data = [10,20,30,40]

let data1 = data.filter((cvalue)=>{
    return cvalue > 12;
})

console.log(data1)
