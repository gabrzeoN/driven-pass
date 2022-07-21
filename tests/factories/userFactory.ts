import { faker } from "@faker-js/faker";


const login = {
    email: faker.internet.email(),
    password: faker.internet.password(10)
};

const passwordWronglogin = {
    email: faker.internet.email(),
    password: faker.internet.password(9)
};


const userFactory = {
    login,
    passwordWronglogin
};

export default userFactory;