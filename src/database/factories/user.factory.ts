import { setSeederFactory } from 'typeorm-extension';
import { User } from '../../models/user';

export default setSeederFactory(User, (faker) => {
    const user = new User();
    user.name = faker.person.fullName();
    user.email = faker.internet.email();
    user.password = faker.internet.password();

    return user;
})