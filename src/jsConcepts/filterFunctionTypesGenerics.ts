// const filterHemant = <T> (array: Array<T>, callback: (item: T) => boolean) => {
//     const filteredArray: T[] = []
//     array.forEach(element => {
//         if (callback(element)) {
//             filteredArray.push(element)
//         }
//     });
//     return filteredArray
// }

// type User = {
//     name: string,
//     age: number,
// }


// const array: string[] = ['Hemant', 'Mouli', 'Bharma'];
// const array1: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
// const array2: boolean[] = [true, false, true, false, true, false, true, false, true, false];
// const array3: Array<User> = [{ name: 'Hemant', age: 21 }, { name: 'Mouli', age: 31 }, { name: 'Bharma', age: 26 }]; 
// // const filteredArray = array.filter((item) => item % 2)
// const filteredArray = filterHemant(array, (item) => item === 'Hemant')
// filterHemant(array1, (item) => item % 2 == 0)
// filterHemant(array2, (item) => item == true)
// filterHemant(array3, (item) => item.age > 25)
// console.log(filteredArray)

