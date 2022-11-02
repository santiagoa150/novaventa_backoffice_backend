import { DomainRoot } from '../../shared/domain/DomainRoot';
import { UserDto } from './UserDto';
import { UserId } from './UserId';
import { Email } from './Email';

export class User implements DomainRoot {

    private readonly UserId: UserId;
    private readonly Email: Email;
    private readonly name: string;
    private readonly password: string;
    private readonly active: boolean;

    constructor(userId: UserId, email: Email, name: string, password: string, active: boolean) {
        this.UserId = userId;
        this.Email = email;
        this.name = name;
        this.password = password;
        this.active = active;
    }


    toPrimitives(): UserDto {
        return {
            userId: this.UserId.toString(),
            email: this.Email.toString(),
            name: this.name,
            password: this.password,
            active: this.active
        };
    }
    
    static fromPrimitives(user: UserDto): User{
        return new User(
            new UserId(user.userId),
            new Email(user.email),
            user.name,
            user.password,
            user.active,
        );
    }
}