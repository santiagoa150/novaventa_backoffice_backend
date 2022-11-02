import { DomainRoot } from '../../shared/domain/DomainRoot';
import { UserDto } from './UserDto';
import { UserId } from './UserId';
import { Email } from './Email';
import { Password } from './Password';

export class User implements DomainRoot {

    private readonly UserId: UserId;
    private readonly Email: Email;
    private readonly password: Password;
    private readonly name: string;
    private readonly active: boolean;

    constructor(userId: UserId, email: Email, password: Password, name: string, active: boolean) {
        this.UserId = userId;
        this.Email = email;
        this.password = password;
        this.name = name;
        this.active = active;
    }


    toPrimitives(): UserDto {
        return {
            userId: this.UserId.toString(),
            email: this.Email.toString(),
            password: this.password.toString(),
            name: this.name,
            active: this.active
        };
    }

    static fromPrimitives(user: UserDto): User {
        return new User(
            new UserId(user.userId),
            new Email(user.email),
            new Password(user.password),
            user.name,
            user.active
        );
    }
}