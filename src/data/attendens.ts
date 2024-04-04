import { faker } from '@faker-js/faker'


export const attendees = Array.from({length: 200}).map(() =>{
    return{
        id: faker.number.int({ min: 10000, max: 20000}),
        name: faker.person.fullName(),
        email : faker.internet.email(),
        createAt: faker.date.recent({days: 30}),
        checkInAt: faker.date.recent({days: 7})
    }
})